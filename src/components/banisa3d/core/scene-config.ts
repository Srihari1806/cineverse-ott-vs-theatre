import type { Vec3 } from "./types";

export type SceneId = "exterior" | "lobby" | "auditorium";

export const SCENE_ORDER: SceneId[] = ["exterior", "lobby", "auditorium"];

export interface CameraWaypoint {
  /** World position the camera settles at. */
  position: Vec3;
  /** Point the camera looks at once settled. */
  target: Vec3;
  /** Orbit clamps applied while this waypoint is active. */
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  /** Seconds the dolly takes to travel here. */
  travel?: number;
}

export interface SceneMeta {
  id: SceneId;
  kicker: string;
  label: string;
  blurb: string;
  /** Lucide icon name rendered in the HUD scene switcher. */
  icon: "building" | "doorOpen" | "clapperboard";
  /** Named viewpoints offered inside the scene. */
  viewpoints: ViewpointMeta[];
  defaultViewpoint: string;
}

export interface ViewpointMeta {
  id: string;
  label: string;
}

export const SCENE_META: Record<SceneId, SceneMeta> = {
  exterior: {
    id: "exterior",
    kicker: "Scene I",
    label: "The Plaza",
    blurb: "Outside the single screen. Cutouts up, floodlights on, crowd already chanting.",
    icon: "building",
    defaultViewpoint: "plaza",
    viewpoints: [
      { id: "plaza", label: "The Plaza" },
      { id: "cutouts", label: "Cutout Row" },
      { id: "entrance", label: "Box Office" },
    ],
  },
  lobby: {
    id: "lobby",
    kicker: "Scene II",
    label: "The Lobby",
    blurb: "Past the doors. Posters, the LED wall, the fan wall, and the ticket grille.",
    icon: "doorOpen",
    defaultViewpoint: "foyer",
    viewpoints: [
      { id: "foyer", label: "Foyer" },
      { id: "posters", label: "Poster Gallery" },
      { id: "fanwall", label: "Fan Wall" },
      { id: "auditoriumDoors", label: "Auditorium Doors" },
    ],
  },
  auditorium: {
    id: "auditorium",
    kicker: "Scene III",
    label: "The Auditorium",
    blurb: "The house. Pick a seat, watch the screen, and light the place up.",
    icon: "clapperboard",
    defaultViewpoint: "balcony",
    viewpoints: [
      { id: "balcony", label: "Balcony" },
      { id: "stalls", label: "Front Stalls" },
      { id: "screen", label: "At the Screen" },
    ],
  },
};

/**
 * Camera stops. The plaza is a wide establishing shot; the lobby sits lower to
 * read as an interior; the house looks down its own rake from the balcony.
 */
export const WAYPOINTS: Record<SceneId, Record<string, CameraWaypoint>> = {
  exterior: {
    plaza: {
      position: [0, 7.4, 33],
      target: [0, 6.4, 0],
      minDistance: 16,
      maxDistance: 48,
      minPolarAngle: Math.PI * 0.22,
      maxPolarAngle: Math.PI * 0.5,
      travel: 1.5,
    },
    cutouts: {
      position: [-1.5, 5.2, 21],
      target: [0, 5.4, 8],
      minDistance: 10,
      maxDistance: 34,
      minPolarAngle: Math.PI * 0.26,
      maxPolarAngle: Math.PI * 0.49,
      travel: 1.2,
    },
    entrance: {
      position: [0, 3.1, 16.5],
      target: [0, 3.4, 0],
      minDistance: 7,
      maxDistance: 26,
      minPolarAngle: Math.PI * 0.3,
      maxPolarAngle: Math.PI * 0.49,
      travel: 1.4,
    },
  },
  lobby: {
    foyer: {
      position: [0, 3.4, 15],
      target: [0, 3.6, -6],
      minDistance: 6,
      maxDistance: 30,
      minPolarAngle: Math.PI * 0.28,
      maxPolarAngle: Math.PI * 0.52,
      travel: 1.4,
    },
    posters: {
      position: [-2.2, 3.2, 6],
      target: [-10.5, 3.4, -4],
      minDistance: 5,
      maxDistance: 22,
      minPolarAngle: Math.PI * 0.3,
      maxPolarAngle: Math.PI * 0.52,
      travel: 1.2,
    },
    fanwall: {
      position: [4.6, 3.2, 6],
      target: [10.6, 3.5, -1],
      minDistance: 5,
      maxDistance: 22,
      minPolarAngle: Math.PI * 0.3,
      maxPolarAngle: Math.PI * 0.52,
      travel: 1.2,
    },
    auditoriumDoors: {
      position: [0, 3.6, -6],
      target: [0, 4.2, -19],
      minDistance: 5,
      maxDistance: 24,
      minPolarAngle: Math.PI * 0.28,
      maxPolarAngle: Math.PI * 0.53,
      travel: 1.2,
    },
  },
  auditorium: {
    balcony: {
      position: [0, 10.5, 20],
      target: [0, 5.4, -22],
      minDistance: 10,
      maxDistance: 40,
      minPolarAngle: Math.PI * 0.24,
      maxPolarAngle: Math.PI * 0.5,
      travel: 1.6,
    },
    stalls: {
      position: [0, 4.2, 4],
      target: [0, 6, -24],
      minDistance: 6,
      maxDistance: 28,
      minPolarAngle: Math.PI * 0.3,
      maxPolarAngle: Math.PI * 0.52,
      travel: 1.3,
    },
    screen: {
      position: [0, 4.6, -9],
      target: [0, 6.4, -26],
      minDistance: 5,
      maxDistance: 22,
      minPolarAngle: Math.PI * 0.32,
      maxPolarAngle: Math.PI * 0.54,
      travel: 1.3,
    },
  },
};

/** Last-resort stop, used only if a scene is missing its own waypoints. */
const FALLBACK_WAYPOINT: CameraWaypoint = {
  position: [0, 7.4, 33],
  target: [0, 6.4, 0],
  minDistance: 16,
  maxDistance: 48,
  minPolarAngle: Math.PI * 0.22,
  maxPolarAngle: Math.PI * 0.5,
  travel: 1.5,
};

export function waypointFor(scene: SceneId, viewpoint: string): CameraWaypoint {
  const set = WAYPOINTS[scene];
  return set[viewpoint] ?? set[SCENE_META[scene].defaultViewpoint] ?? FALLBACK_WAYPOINT;
}

/** Marquee copy, kept here so the canopy and the HUD read from one source. */
export const MARQUEE_LINES = [
  "SUPERSTAR ARENA",
  "FIRST DAY FIRST SHOW",
  "BENEFIT SHOW 4 AM HOUSEFULL",
  "ONE MAN MILLIONS HEARTS",
  "MASS JATHARA TONIGHT",
];

export const CROWD_CHANTS = [
  "JAI BALAYYA!",
  "POWER STAR ANTE MASS!",
  "PUSHPA RAJ THAGGEDE LE!",
  "NTR ARMY IN THE HOUSE",
  "SSMB FOR LIFE",
  "REBEL STAR PRABHAS!",
];
