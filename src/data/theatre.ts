// ─── Living Theatre Experience — scene data ───────────────────────────────────
// Six gigantic hero cutouts standing in front of a single-screen theatre facade.
// Each cutout doubles as a navigation portal into that hero's dedicated space.

export interface CutoutHero {
  id: string;
  name: string;
  shortName: string;
  title: string;
  film: string;
  pose: string;
  emoji: string;
  /** Primary fandom colour — drives LED borders, spotlight tint, banner cloth. */
  color: string;
  /** Secondary colour used for gradients + tube-light accents. */
  color2: string;
  /** Fan association board text, the kind painted on real cutout scaffolding. */
  fanBoard: string;
  /** Signature line revealed on hover. */
  tagline: string;
  /** Height of the cutout in feet, as claimed by the fan association. */
  heightFt: number;
  /** Floating radial menu shown while a cutout is focused. */
  menu: { label: string; icon: string }[];
  /** Optional real cutout art dropped into /public/cutouts/<id>.png */
  photo: string;
  /** Silhouette pose key — see CutoutFigure. */
  figure: "salaar" | "og" | "rangasthalam" | "pushpa" | "devara" | "pokiri";
}

export const cutoutHeroes: CutoutHero[] = [
  {
    id: "prabhas",
    name: "Prabhas",
    shortName: "Prabhas",
    title: "Rebel Star",
    film: "Salaar",
    pose: "Deva stance — chain in hand, coat in the wind",
    emoji: "🪓",
    color: "oklch(0.62 0.19 30)",
    color2: "oklch(0.30 0.12 25)",
    fanBoard: "REBEL STAR FANS ASSN · KHAMMAM DIST",
    tagline: "Aagi povali… lekapothe agipovali.",
    heightFt: 78,
    figure: "salaar",
    photo: "/cutouts/prabhas.png",
    menu: [
      { label: "Filmography", icon: "🎬" },
      { label: "Box Office", icon: "📈" },
      { label: "Fan Wall", icon: "🧡" },
      { label: "Trailers", icon: "▶" },
    ],
  },
  {
    id: "pawan",
    name: "Pawan Kalyan",
    shortName: "PK",
    title: "Power Star",
    film: "OG",
    pose: "Ojas Gambheera walk — smoke trailing, coat flaring",
    emoji: "⚡",
    color: "oklch(0.75 0.18 48)",
    color2: "oklch(0.35 0.14 45)",
    fanBoard: "POWER STAR YUVA SENA · VIJAYAWADA",
    tagline: "They call him Ojas Gambheera.",
    heightFt: 80,
    figure: "og",
    photo: "/cutouts/pawan.png",
    menu: [
      { label: "Filmography", icon: "🎬" },
      { label: "Box Office", icon: "📈" },
      { label: "Fan Wall", icon: "⚡" },
      { label: "Trailers", icon: "▶" },
    ],
  },
  {
    id: "charan",
    name: "Ram Charan",
    shortName: "RC",
    title: "Mega Power Star",
    film: "Rangasthalam",
    pose: "Chitti Babu — hand cupped at the ear, lungi folded",
    emoji: "🔥",
    color: "oklch(0.58 0.21 22)",
    color2: "oklch(0.28 0.14 20)",
    fanBoard: "MEGA POWER FANS · RANGASTHALAM 1985",
    tagline: "Emantundhi? Konchem gattiga cheppu.",
    heightFt: 72,
    figure: "rangasthalam",
    photo: "/cutouts/charan.png",
    menu: [
      { label: "Filmography", icon: "🎬" },
      { label: "Box Office", icon: "📈" },
      { label: "Fan Wall", icon: "🔥" },
      { label: "Trailers", icon: "▶" },
    ],
  },
  {
    id: "allu",
    name: "Allu Arjun",
    shortName: "AA",
    title: "Stylish Star",
    film: "Pushpa",
    pose: "Thaggede le — beard tilt, hand under the chin",
    emoji: "🕺",
    color: "oklch(0.72 0.14 145)",
    color2: "oklch(0.30 0.10 150)",
    fanBoard: "ICON STAR AA FANS · SEETHAMPETA",
    tagline: "Pushpa raj… thaggede le.",
    heightFt: 76,
    figure: "pushpa",
    photo: "/cutouts/allu.png",
    menu: [
      { label: "Filmography", icon: "🎬" },
      { label: "Box Office", icon: "📈" },
      { label: "Fan Wall", icon: "🌿" },
      { label: "Trailers", icon: "▶" },
    ],
  },
  {
    id: "ntr",
    name: "NTR Jr.",
    shortName: "NTR",
    title: "Young Tiger",
    film: "Devara",
    pose: "Devara — arms wide, dhoti soaked, sea behind",
    emoji: "🐯",
    color: "oklch(0.72 0.19 55)",
    color2: "oklch(0.32 0.13 50)",
    fanBoard: "NANDAMURI YOUNG TIGER SENA · GODAVARI",
    tagline: "Fear has a name.",
    heightFt: 80,
    figure: "devara",
    photo: "/cutouts/ntr.png",
    menu: [
      { label: "Filmography", icon: "🎬" },
      { label: "Box Office", icon: "📈" },
      { label: "Fan Wall", icon: "🐯" },
      { label: "Trailers", icon: "▶" },
    ],
  },
  {
    id: "mahesh",
    name: "Mahesh Babu",
    shortName: "MB",
    title: "Super Star",
    film: "Pokiri · Guntur Kaaram",
    pose: "Stylish walk — smoke curling, collar up",
    emoji: "👑",
    color: "oklch(0.60 0.19 250)",
    color2: "oklch(0.26 0.12 255)",
    fanBoard: "SUPER STAR SSMB FANS · BURRIPALEM",
    tagline: "Oka sari commit ayithe, na maata nenu vinanu.",
    heightFt: 74,
    figure: "pokiri",
    photo: "/cutouts/mahesh.png",
    menu: [
      { label: "Filmography", icon: "🎬" },
      { label: "Box Office", icon: "📈" },
      { label: "Fan Wall", icon: "👑" },
      { label: "Trailers", icon: "▶" },
    ],
  },
];

// ─── Lobby interior zones ─────────────────────────────────────────────────────

export interface LobbyZone {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  /** Wall the zone sits on — drives the parallax column it renders into. */
  wall: "left" | "center" | "right";
  accent: string;
}

export const lobbyZones: LobbyZone[] = [
  {
    id: "posters",
    name: "Poster Gallery",
    icon: "🖼️",
    wall: "left",
    accent: "var(--ember)",
    blurb: "Hand-painted six-sheets from the single-screen era, backlit and framed.",
  },
  {
    id: "stills",
    name: "Vintage Film Stills",
    icon: "🎞️",
    wall: "left",
    accent: "var(--gold-foil)",
    blurb: "Silver-gelatin frames from the 70MM projection days.",
  },
  {
    id: "ledwall",
    name: "Digital LED Wall",
    icon: "📺",
    wall: "center",
    accent: "var(--screen)",
    blurb: "A 40-foot live wall cycling trailers, teasers and title reveals.",
  },
  {
    id: "showcase",
    name: "Collectible Showcase",
    icon: "🏺",
    wall: "right",
    accent: "var(--ember)",
    blurb: "Props, costumes and prop-gun replicas under museum glass.",
  },
  {
    id: "tickets",
    name: "Ticket Counter",
    icon: "🎟️",
    wall: "left",
    accent: "var(--gold-foil)",
    blurb: "Brass grille, paper rolls, and the eternal FDFS queue.",
  },
  {
    id: "popcorn",
    name: "Popcorn Bay",
    icon: "🍿",
    wall: "right",
    accent: "var(--ember)",
    blurb: "Caramel, cheese and the illegal masala corn nobody admits to.",
  },
  {
    id: "merch",
    name: "Merchandise Shop",
    icon: "🧢",
    wall: "right",
    accent: "var(--gold-foil)",
    blurb: "Tees, keychains and fan-association flags by the bundle.",
  },
  {
    id: "fanwall",
    name: "Fan Wall",
    icon: "🧡",
    wall: "center",
    accent: "var(--ember)",
    blurb: "Ten thousand handwritten notes, stapled over each other since 1996.",
  },
  {
    id: "selfie",
    name: "Selfie Zone",
    icon: "🤳",
    wall: "right",
    accent: "var(--screen)",
    blurb: "Ring lights, a cutout backdrop, and a permanent queue.",
  },
  {
    id: "timeline",
    name: "Movie Timeline Corridor",
    icon: "🕰️",
    wall: "center",
    accent: "var(--gold-foil)",
    blurb: "Walk a hundred years of Telugu cinema, one arch at a time.",
  },
  {
    id: "halloffame",
    name: "Hall of Fame",
    icon: "🏛️",
    wall: "center",
    accent: "var(--gold-foil)",
    blurb: "Busts, handprints and the names that filled these seats.",
  },
  {
    id: "awards",
    name: "Award Gallery",
    icon: "🏆",
    wall: "left",
    accent: "var(--gold-foil)",
    blurb: "Nandi, Filmfare, National — polished nightly.",
  },
  {
    id: "jukebox",
    name: "Soundtrack Jukebox",
    icon: "🎶",
    wall: "right",
    accent: "var(--ember)",
    blurb: "Pick a BGM. The lobby speakers obey.",
  },
  {
    id: "memories",
    name: "Photo Memories Wall",
    icon: "📷",
    wall: "left",
    accent: "var(--ember)",
    blurb: "Polaroids of first-day crowds, sorted by decade.",
  },
  {
    id: "qr",
    name: "QR Scan Area",
    icon: "🔳",
    wall: "right",
    accent: "var(--screen)",
    blurb: "Scan to carry the lobby home — AR cutouts on your street.",
  },
  {
    id: "events",
    name: "Event Announcements",
    icon: "📣",
    wall: "center",
    accent: "var(--ember)",
    blurb: "Pre-release business, audio launch, benefit show timings.",
  },
  {
    id: "kiosks",
    name: "Interactive Kiosks",
    icon: "🕹️",
    wall: "left",
    accent: "var(--screen)",
    blurb: "Trivia, dialogue-matching and the fan-rank leaderboard.",
  },
  {
    id: "lounge",
    name: "Premium Lounge",
    icon: "🥂",
    wall: "right",
    accent: "var(--gold-foil)",
    blurb: "Recliners, filter coffee, and silence between shows.",
  },
];

// ─── Crowd chants cycling through the plaza ───────────────────────────────────

export const crowdChants: string[] = [
  "JAI BALAYYA!",
  "POWER STAR ANTE MASS!",
  "PUSHPA RAJ… THAGGEDE LE!",
  "NTR ARMY IN THE HOUSE",
  "MEGA POWER STAR RAAAA!",
  "SSMB FOR LIFE 👑",
  "REBEL STAR PRABHAS!",
  "FIRST DAY FIRST SHOW!",
  "MILK ABHISHEKAM AT 4 AM SHARP",
  "WHISTLE PODU 🎵",
];

export const marqueeNow = {
  theatre: "SUDARSHAN",
  format: "70MM",
  established: "EST. 1976",
  nowShowing: "BENEFIT SHOW · 4:00 AM · HOUSEFULL",
};
