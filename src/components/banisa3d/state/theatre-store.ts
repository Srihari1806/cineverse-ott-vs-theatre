import { useCallback, useMemo, useSyncExternalStore } from "react";
import type {
  BannerConfig,
  FanNote,
  PollTally,
  SeatKey,
  ScreenMode,
  UserBallot,
} from "../core/types";
import { SCENE_META, type SceneId } from "../core/scene-config";
import { SEED_TALLIES } from "../data/polls";
import * as persist from "./theatre-persistence";

export type CelebrationKind = "confetti" | "fireworks" | "whistle";
export type KioskTab = "poll" | "banner" | "fanwall";

export const DEFAULT_BANNER: BannerConfig = {
  text: "SUPERSTAR ARENA",
  subtext: "CineVerse Fan Banner Studio",
  color: "#e8b44a",
  color2: "#8e1b1b",
  finish: "flex",
  glow: 0.6,
};

export interface TheatreState {
  /** Which of the three spaces the camera is standing in. */
  scene: SceneId;
  /** Named camera stop inside the current scene. */
  viewpoint: string;
  /** Scenes the visitor has entered, so the HUD can mark them explored. */
  visited: SceneId[];

  /** Cutout the pointer is currently over, in the plaza. */
  focusedCutoutId: string | null;
  /** Cutout whose profile panel is open. */
  openCutoutId: string | null;

  /** Full fan frenzy: more confetti, harder lights, louder crowd. */
  frenzy: boolean;
  /** Increments on every celebration so effects can re-trigger. */
  celebrationId: number;
  celebrationKind: CelebrationKind;

  /** Chosen seat in the house, as `${row}-${column}`. */
  seat: SeatKey | null;
  /** What the big screen is showing. */
  screenMode: ScreenMode;

  /** Which kiosk panel is open, if any. */
  kiosk: KioskTab | null;

  muted: boolean;

  ballot: UserBallot;
  notes: FanNote[];
  /** The banner currently hanging in the plaza. */
  banner: BannerConfig;
}

const INITIAL_STATE: TheatreState = {
  scene: "exterior",
  viewpoint: SCENE_META.exterior.defaultViewpoint,
  visited: ["exterior"],
  focusedCutoutId: null,
  openCutoutId: null,
  frenzy: false,
  celebrationId: 0,
  celebrationKind: "confetti",
  seat: null,
  screenMode: "title",
  kiosk: null,
  muted: false,
  ballot: {},
  notes: [],
  banner: DEFAULT_BANNER,
};

let state: TheatreState = INITIAL_STATE;

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getState(): TheatreState {
  return state;
}

/** Reads a slice of theatre state in both the DOM overlay and the WebGL scene. */
export function useTheatre<T>(selector: (snapshot: TheatreState) => T): T {
  const read = useCallback(() => selector(getState()), [selector]);
  const readServer = useCallback(() => selector(INITIAL_STATE), [selector]);
  return useSyncExternalStore(subscribe, read, readServer);
}

export function theatreState(): TheatreState {
  return state;
}

export function patchTheatre(update: Partial<TheatreState>): void {
  let changed = false;
  for (const key of Object.keys(update) as (keyof TheatreState)[]) {
    if (state[key] !== update[key]) {
      changed = true;
      break;
    }
  }
  if (!changed) return;
  state = { ...state, ...update };
  emit();
}

// ─── Scene navigation ─────────────────────────────────────────────────────────

export function goToScene(scene: SceneId, viewpoint?: string): void {
  const target = viewpoint ?? SCENE_META[scene].defaultViewpoint;
  const visited = state.visited.includes(scene) ? state.visited : [...state.visited, scene];
  patchTheatre({
    scene,
    viewpoint: target,
    visited,
    // Closing overlays on a scene change keeps the dolly shot unobstructed.
    kiosk: null,
    openCutoutId: null,
    focusedCutoutId: null,
    seat: null,
  });
  persist.saveVisited(visited);
}

export function goToViewpoint(viewpoint: string): void {
  patchTheatre({ viewpoint });
}

/** Steps forward through the building: plaza → lobby → auditorium. */
export function enterTheatre(): void {
  if (state.scene === "exterior") goToScene("lobby");
  else if (state.scene === "lobby") goToScene("auditorium");
}

export function stepBack(): void {
  if (state.scene === "auditorium") goToScene("lobby", "auditoriumDoors");
  else if (state.scene === "lobby") goToScene("exterior", "entrance");
}

// ─── Cutouts ──────────────────────────────────────────────────────────────────

export function focusCutout(id: string | null): void {
  patchTheatre({ focusedCutoutId: id });
}

export function openCutout(id: string): void {
  patchTheatre({ openCutoutId: id, kiosk: null });
}

export function closeCutout(): void {
  patchTheatre({ openCutoutId: null });
}

// ─── Celebration ──────────────────────────────────────────────────────────────

export function fireCelebration(kind: CelebrationKind): void {
  patchTheatre({ celebrationKind: kind, celebrationId: state.celebrationId + 1 });
}

export function setFrenzy(frenzy: boolean): void {
  patchTheatre({ frenzy });
}

export function toggleFrenzy(): void {
  patchTheatre({ frenzy: !state.frenzy });
}

// ─── Seating and the screen ───────────────────────────────────────────────────

export function selectSeat(seat: SeatKey | null): void {
  patchTheatre({ seat });
}

export function setScreenMode(screenMode: ScreenMode): void {
  patchTheatre({ screenMode });
}

// ─── Kiosk ────────────────────────────────────────────────────────────────────

export function openKiosk(kiosk: KioskTab): void {
  patchTheatre({ kiosk, openCutoutId: null });
}

export function closeKiosk(): void {
  patchTheatre({ kiosk: null });
}

// ─── Polls ────────────────────────────────────────────────────────────────────

export function castVote(pollId: string, optionId: string): void {
  const ballot: UserBallot = { ...state.ballot, [pollId]: optionId };
  patchTheatre({ ballot });
  persist.saveBallot(ballot);
}

/** Seed tallies plus the visitor's own single ballot. */
export function tallyFor(pollId: string): Record<string, number> {
  const seed = SEED_TALLIES[pollId] ?? {};
  const choice = state.ballot[pollId];
  if (!choice) return seed;
  return { ...seed, [choice]: (seed[choice] ?? 0) + 1 };
}

export function useTallies(): PollTally {
  const ballot = useTheatre((snapshot) => snapshot.ballot);
  return useMemo(() => {
    const merged: PollTally = {};
    for (const [pollId, seed] of Object.entries(SEED_TALLIES)) {
      const choice = ballot[pollId];
      merged[pollId] = choice ? { ...seed, [choice]: (seed[choice] ?? 0) + 1 } : { ...seed };
    }
    return merged;
  }, [ballot]);
}

// ─── Fan wall ─────────────────────────────────────────────────────────────────

export function addNote(input: {
  text: string;
  author: string;
  heroId: string;
  association: string;
}): FanNote {
  const note: FanNote = {
    id: `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    text: input.text.trim().slice(0, 220),
    author: input.author.trim().slice(0, 28) || "Visitor",
    heroId: input.heroId,
    association: input.association.trim().slice(0, 40) || "Independent Fan",
    createdAt: Date.now(),
  };
  const notes = [note, ...state.notes].slice(0, 24);
  patchTheatre({ notes });
  persist.saveNotes(notes);
  return note;
}

export function removeNote(id: string): void {
  const notes = state.notes.filter((note) => note.id !== id);
  patchTheatre({ notes });
  persist.saveNotes(notes);
}

// ─── Banner studio ────────────────────────────────────────────────────────────

export function hangBanner(banner: BannerConfig): void {
  patchTheatre({ banner: { ...banner } });
  persist.saveBanner(banner);
  patchTheatre({ screenMode: "banner" });
}

// ─── Sound ────────────────────────────────────────────────────────────────────

export function setMuted(muted: boolean): void {
  patchTheatre({ muted });
  persist.saveMuted(muted);
}

export function toggleMuted(): void {
  setMuted(!state.muted);
}

// ─── Hydration ────────────────────────────────────────────────────────────────

/** Called once from the experience on mount, after the first client paint. */
export function hydrateTheatre(): void {
  const persistedBanner = persist.loadBanner();
  const muted = persist.loadMuted();
  const visited = persist.loadVisited().filter((entry): entry is SceneId =>
    entry === "exterior" || entry === "lobby" || entry === "auditorium",
  );

  patchTheatre({
    ballot: persist.loadBallot(),
    notes: persist.loadNotes(),
    banner: persistedBanner ? { ...DEFAULT_BANNER, ...persistedBanner } : DEFAULT_BANNER,
    muted: muted ?? false,
    visited: visited.length > 0 ? visited : ["exterior"],
  });
}

/** Used by the overlay's reset control. */
export function resetVisit(): void {
  state = { ...INITIAL_STATE };
  emit();
  persist.saveBallot({});
  persist.saveNotes([]);
  persist.saveBanner(DEFAULT_BANNER);
  persist.saveVisited(["exterior"]);
}
