import type { BannerConfig, FanNote, UserBallot } from "../core/types";

/**
 * The theatre remembers a visitor between visits: their poll ballot, the notes
 * they pinned to the fan wall and the banner they built. Everything is small
 * and JSON-shaped, so localStorage is enough — there is no server in this
 * prototype, and a failed write must never break the scene.
 */

const PREFIX = "cineverse.banisa";

export const STORAGE_KEYS = {
  ballot: `${PREFIX}.ballot`,
  notes: `${PREFIX}.notes`,
  banner: `${PREFIX}.banner`,
  muted: `${PREFIX}.muted`,
  visited: `${PREFIX}.visited`,
} as const;

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private mode — the session simply will not persist.
  }
}

export function loadBallot(): UserBallot {
  const value = read<unknown>(STORAGE_KEYS.ballot);
  return isRecord(value) ? (value as UserBallot) : {};
}

export function saveBallot(ballot: UserBallot): void {
  write(STORAGE_KEYS.ballot, ballot);
}

export function loadNotes(): FanNote[] {
  const value = read<unknown>(STORAGE_KEYS.notes);
  if (!Array.isArray(value)) return [];
  return value.filter(isFanNote);
}

export function saveNotes(notes: FanNote[]): void {
  write(STORAGE_KEYS.notes, notes);
}

export function loadBanner(): Partial<BannerConfig> | null {
  const value = read<unknown>(STORAGE_KEYS.banner);
  return isRecord(value) ? (value as Partial<BannerConfig>) : null;
}

export function saveBanner(banner: BannerConfig): void {
  write(STORAGE_KEYS.banner, banner);
}

export function loadMuted(): boolean | null {
  const value = read<unknown>(STORAGE_KEYS.muted);
  return typeof value === "boolean" ? value : null;
}

export function saveMuted(muted: boolean): void {
  write(STORAGE_KEYS.muted, muted);
}

export function loadVisited(): string[] {
  const value = read<unknown>(STORAGE_KEYS.visited);
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string");
}

export function saveVisited(scenes: string[]): void {
  write(STORAGE_KEYS.visited, scenes);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFanNote(value: unknown): value is FanNote {
  if (!isRecord(value)) return false;
  return (
    typeof value["id"] === "string" &&
    typeof value["text"] === "string" &&
    typeof value["author"] === "string"
  );
}
