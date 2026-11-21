/**
 * Shared vocabulary for the Banisa 3D theatre: geometry primitives, the shapes
 * visitors generate (banners, notes, votes) and the derived view models the
 * scenes consume.
 */

export type Vec3 = [number, number, number];

/** One of the six superstar standees, ready to place in the plaza. */
export interface CutoutBoard {
  id: string;
  name: string;
  /** Fandom title, e.g. "Rebel Star". */
  title: string;
  film: string;
  pose: string;
  tagline: string;
  /** Text painted on the association board under the cutout. */
  fanBoard: string;
  /** Claimed height of the standee, in feet — shown in the hero panel. */
  heightFt: number;
  /** Fandom colour driving the glow, board trim, beam and poster bleed. */
  accent: string;
  /** Keyed standee texture source, white page already stripped at load. */
  image: string;
  /** Filmography shown in the hero panel. */
  filmography: { title: string; role: string; year: string }[];
}

export type BannerFinishKind = "flex" | "cloth" | "neon";

/** Whatever the Fan Banner Studio currently has on the loom. */
export interface BannerConfig {
  text: string;
  subtext: string;
  color: string;
  color2: string;
  finish: BannerFinishKind;
  glow: number;
}

/** A note posted to the lobby Fan Wall. */
export interface FanNote {
  id: string;
  text: string;
  author: string;
  /** Cutout the note is addressed to. */
  heroId: string;
  /** Fan association, or "Visitor". */
  association: string;
  createdAt: number;
}

export interface PollOption {
  id: string;
  label: string;
}

export interface PollDefinition {
  id: string;
  question: string;
  /** One line of framing shown under the question. */
  context: string;
  /** Accent used on the result bars. */
  accent: string;
  options: PollOption[];
}

/** Tallies seeded per poll, then incremented by visitor votes. */
export type PollTally = Record<string, Record<string, number>>;

/** pollId -> optionId, persisted so a visitor's ballot is remembered. */
export type UserBallot = Record<string, string>;

export interface SeatRef {
  /** 0 is the front row, nearest the screen. */
  row: number;
  /** 0 is the aisle-left column. */
  column: number;
}

/** Serialised as `${row}-${column}` so it can key records and markup. */
export type SeatKey = string;

export function seatKey(seat: SeatRef): SeatKey {
  return `${seat.row}-${seat.column}`;
}

export function parseSeatKey(key: SeatKey): SeatRef | null {
  const parts = key.split("-");
  const row = Number.parseInt(parts[0] ?? "", 10);
  const column = Number.parseInt(parts[1] ?? "", 10);
  if (!Number.isFinite(row) || !Number.isFinite(column)) return null;
  return { row, column };
}

/** What the big screen in the house is currently showing. */
export type ScreenMode = "title" | "polls" | "fanwall" | "banner";

export const SCREEN_MODES: { id: ScreenMode; label: string }[] = [
  { id: "title", label: "Title Card" },
  { id: "polls", label: "Live Polls" },
  { id: "fanwall", label: "Fan Wall" },
  { id: "banner", label: "Your Banner" },
];
