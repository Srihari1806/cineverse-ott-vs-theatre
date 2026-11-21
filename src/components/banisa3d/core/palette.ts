/**
 * Banisa 3D — shared colour tokens.
 *
 * Mirrors the CSS custom properties in `src/styles.css` (gold / gold-deep /
 * ember / crimson on near-black ink) so the WebGL scenes and the 2D chrome
 * around them are unmistakably the same building.
 */

export const PALETTE = {
  /** Near-black ink the whole site is built on. */
  ink: "#0a0705",
  inkSoft: "#150d08",
  /** Interior plaster + woodwork. */
  wall: "#1e1510",
  wallLit: "#3d2818",
  plaster: "#4c3423",
  wood: "#2a1a10",

  gold: "#e8b44a",
  goldBright: "#ffd67d",
  goldDeep: "#b8862c",
  goldDim: "#6f4f1c",

  ember: "#e0671e",
  emberDeep: "#a1400f",

  crimson: "#8e1b1b",
  crimsonBright: "#c82626",
  velvet: "#5c0f14",

  cream: "#f6e9cd",
  screenGlow: "#fff1d0",

  /** Accents borrowed straight from the existing fandom palette. */
  neonPink: "#ff4d8d",
  neonTeal: "#38c8c0",
  neonViolet: "#7b5ccc",
} as const;

export type PaletteName = keyof typeof PALETTE;

/** Fandom accent colours keyed by cutout id — reused by boards, beams and glow. */
export const HERO_ACCENTS: Record<string, string> = {
  prabhas: "#c2501c",
  pawan: "#e08a2a",
  charan: "#b32a1f",
  allu: "#3f9c62",
  ntr: "#d4821f",
  mahesh: "#4a6cc4",
};

export function heroAccent(id: string): string {
  return HERO_ACCENTS[id] ?? PALETTE.gold;
}

/** Warm interior light rig shared by the lobby and auditorium scenes. */
export const LIGHTING = {
  ambient: 0.34,
  hemisphere: 0.42,
  keyColor: "#ffd79a",
  fillColor: "#c2521f",
  rimColor: "#8e5cc8",
} as const;
