// ─── TFI Heroes ──────────────────────────────────────────────────────────────

export interface Hero {
  id: string;
  name: string;
  title: string;
  emoji: string;
  fandomColor: string;
  gradient: string;
  shortName: string;
}

export const heroes: Hero[] = [
  { id: "pawan", name: "Pawan Kalyan", title: "Power Star", emoji: "⚡", shortName: "PK", fandomColor: "oklch(0.75 0.18 48)", gradient: "from-amber-600 to-orange-700" },
  { id: "mahesh", name: "Mahesh Babu", title: "Super Star", emoji: "👑", shortName: "MB", fandomColor: "oklch(0.55 0.20 250)", gradient: "from-blue-600 to-indigo-700" },
  { id: "allu", name: "Allu Arjun", title: "Stylish Star", emoji: "🕺", shortName: "AA", fandomColor: "oklch(0.76 0.06 260)", gradient: "from-slate-400 to-slate-600" },
  { id: "ntr", name: "Jr NTR", title: "Young Tiger", emoji: "🐯", shortName: "NTR", fandomColor: "oklch(0.72 0.19 55)", gradient: "from-orange-500 to-yellow-600" },
  { id: "charan", name: "Ram Charan", title: "Mega Power Star", emoji: "🔥", shortName: "RC", fandomColor: "oklch(0.50 0.22 22)", gradient: "from-red-700 to-rose-800" },
  { id: "chiru", name: "Chiranjeevi", title: "Megastar", emoji: "🌟", shortName: "CJ", fandomColor: "oklch(0.58 0.22 300)", gradient: "from-purple-600 to-violet-800" },
  { id: "bala", name: "Balakrishna", title: "Nandamuri Tiger", emoji: "🦁", shortName: "NBK", fandomColor: "oklch(0.65 0.18 200)", gradient: "from-cyan-500 to-teal-700" },
  { id: "vijay", name: "Vijay Deverakonda", title: "Rowdy Star", emoji: "💥", shortName: "VD", fandomColor: "oklch(0.62 0.22 30)", gradient: "from-red-500 to-orange-600" },
  { id: "nani", name: "Nani", title: "Natural Star", emoji: "🌿", shortName: "NAni", fandomColor: "oklch(0.65 0.17 145)", gradient: "from-green-500 to-emerald-700" },
];

// ─── Banisa Titles (XP tiers) ─────────────────────────────────────────────────

export interface BanisaTitle {
  id: string;        // same as title slugified
  xp: number;
  minXp: number;     // alias for xp (used by components)
  title: string;
  name: string;      // alias for title (used by components)
  badge: string;
  emoji: string;     // alias for badge (used by components)
  description: string;
}

export const banisaTitles: BanisaTitle[] = [
  { id: "interval-samosa", xp: 0, minXp: 0, title: "Interval Samosa", name: "Interval Samosa", badge: "🥟", emoji: "🥟", description: "Just arrived at the theatre. Still finding your seat." },
  { id: "balcony-regular", xp: 50, minXp: 50, title: "Balcony Regular", name: "Balcony Regular", badge: "🎟️", emoji: "🎟️", description: "You know the second-row advantage. Old school." },
  { id: "fdfs-aspirant", xp: 150, minXp: 150, title: "FDFS Aspirant", name: "FDFS Aspirant", badge: "⏰", emoji: "⏰", description: "You set alarms for 4AM bookings. Respect." },
  { id: "fan-page-admin", xp: 350, minXp: 350, title: "Fan Page Admin", name: "Fan Page Admin", badge: "📢", emoji: "📢", description: "You run 3 WhatsApp groups dedicated to one hero." },
  { id: "fdfs-veteran", xp: 700, minXp: 700, title: "First Day First Show Veteran", name: "First Day First Show Veteran", badge: "🏆", emoji: "🏆", description: "Benefit shows, midnight releases, 6AM shows — you've done them all." },
  { id: "dialogue-king", xp: 1200, minXp: 1200, title: "Dialogue King/Queen", name: "Dialogue King/Queen", badge: "🎙️", emoji: "🎙️", description: "You quote dialogues at appropriate life moments. Effortlessly." },
  { id: "decade-banisa", xp: 2000, minXp: 2000, title: "Decade Banisa", name: "Decade Banisa", badge: "⚔️", emoji: "⚔️", description: "You have defended your hero in 10,000 comment wars. Unbeaten." },
  { id: "mass-maharaja", xp: 5000, minXp: 5000, title: "Mass Maharaja", name: "Mass Maharaja", badge: "👑", emoji: "👑", description: "Legendary. They name premiere rows after you." },
];

export function getBanisaTitle(xp: number): BanisaTitle {
  let current = banisaTitles[0];
  for (const t of banisaTitles) {
    if (xp >= t.xp) current = t;
  }
  return current;
}

export function getNextTitle(xp: number): BanisaTitle | null {
  for (const t of banisaTitles) {
    if (xp < t.xp) return t;
  }
  return null;
}

// ─── Meme Templates ───────────────────────────────────────────────────────────

export interface MemeTemplate {
  id: string;
  name: string;
  heroId: string;
  bgColor: string;
  bgGradient: string;       // CSS gradient string for preview
  textColor: string;
  captionTop: string;
  captionBottom: string;
  defaultTopText: string;   // alias for captionTop (used by MemeStudio)
  defaultBottomText: string; // alias for captionBottom (used by MemeStudio)
  emoji: string;
}

export const memeTemplates: MemeTemplate[] = [
  { id: "t1", name: "Interval Bang", heroId: "allu", bgColor: "#1a1a2e", bgGradient: "linear-gradient(135deg,#1a1a2e,#16213e)", textColor: "#f59e0b", captionTop: "BEFORE INTERVAL", captionBottom: "AFTER INTERVAL 💥", defaultTopText: "BEFORE INTERVAL", defaultBottomText: "AFTER INTERVAL 💥", emoji: "🎬" },
  { id: "t2", name: "SSR Reaction", heroId: "pawan", bgColor: "#2d1b00", bgGradient: "linear-gradient(135deg,#2d1b00,#1a0f00)", textColor: "#f97316", captionTop: "Me watching SSR", captionBottom: "My brain cells: 💀", defaultTopText: "Me watching SSR", defaultBottomText: "My brain cells: 💀", emoji: "⚡" },
  { id: "t3", name: "Oo Antava Entry", heroId: "allu", bgColor: "#111827", bgGradient: "linear-gradient(135deg,#111827,#0a0f1e)", textColor: "#94a3b8", captionTop: "Boss entry BGM starts", captionBottom: "Fans in theatre:", defaultTopText: "Boss entry BGM starts", defaultBottomText: "Fans in theatre:", emoji: "🕺" },
  { id: "t4", name: "Dialogue Drop", heroId: "mahesh", bgColor: "#1e1b4b", bgGradient: "linear-gradient(135deg,#1e1b4b,#13114a)", textColor: "#818cf8", captionTop: "When someone says", captionBottom: "Mahesh isn't top-class", defaultTopText: "When someone says", defaultBottomText: "Mahesh isn't top-class", emoji: "👑" },
  { id: "t5", name: "NTR Tiger Mode", heroId: "ntr", bgColor: "#1c0a00", bgGradient: "linear-gradient(135deg,#1c0a00,#0f0500)", textColor: "#fb923c", captionTop: "Exam pressure:", captionBottom: "NTR in action:", defaultTopText: "Exam pressure:", defaultBottomText: "NTR in action:", emoji: "🐯" },
  { id: "t6", name: "Mega Power", heroId: "charan", bgColor: "#1f0000", bgGradient: "linear-gradient(135deg,#1f0000,#110000)", textColor: "#f87171", captionTop: "Me to my bank account", captionBottom: "RC to the box office", defaultTopText: "Me to my bank account", defaultBottomText: "RC to the box office", emoji: "🔥" },
  { id: "t7", name: "NBK Lion Mode", heroId: "bala", bgColor: "#001a1a", bgGradient: "linear-gradient(135deg,#001a1a,#000d0d)", textColor: "#22d3ee", captionTop: "Ninna chusina", captionBottom: "Nee face ni chusana?", defaultTopText: "Ninna chusina", defaultBottomText: "Nee face ni chusana?", emoji: "🦁" },
  { id: "t8", name: "Rowdy Entry", heroId: "vijay", bgColor: "#1a0000", bgGradient: "linear-gradient(135deg,#1a0000,#0d0000)", textColor: "#ef4444", captionTop: "When VD walks in", captionBottom: "Girls be like:", defaultTopText: "When VD walks in", defaultBottomText: "Girls be like:", emoji: "💥" },
];

// ─── Meme Cards (seed data + export alias) ─────────────────────────────────────

export interface MemeCard {
  id: string;
  heroId: string;
  caption: string;
  subCaption: string;
  emoji: string;
  bgGradient: string;
  upvotes: number;
  comments: number;
  category: "reaction" | "dialogue" | "entry" | "interval" | "war" | "nostalgia";
  postedAgo: string;
  author: string;
}

export const memeCards: MemeCard[] = [
  { id: "m1", heroId: "allu", caption: "Theatre fans when OTT release date drops in 2 weeks", subCaption: "Pushpa: I hate this 🌿", emoji: "😤", bgGradient: "from-slate-900 via-slate-800 to-slate-900", upvotes: 4821, comments: 312, category: "reaction", postedAgo: "2h ago", author: "PushpaRules" },
  { id: "m2", heroId: "pawan", caption: "When Power Star enters the frame after 20 minutes of BGM", subCaption: "Entire theatre: WHISTLE BLAST 🎵", emoji: "⚡", bgGradient: "from-amber-950 via-orange-950 to-amber-950", upvotes: 7234, comments: 891, category: "entry", postedAgo: "5h ago", author: "PowerStarFan01" },
  { id: "m3", heroId: "mahesh", caption: "Me explaining Guntur Kaaram to my parents", subCaption: "Plot twist after plot twist 🤯", emoji: "👑", bgGradient: "from-blue-950 via-indigo-950 to-blue-950", upvotes: 3102, comments: 244, category: "reaction", postedAgo: "1d ago", author: "MaheshArmy" },
  { id: "m4", heroId: "ntr", caption: "Devara interval scene be like:", subCaption: "My jaw: on the floor of the theatre 🎭", emoji: "🐯", bgGradient: "from-orange-950 via-amber-950 to-orange-950", upvotes: 9870, comments: 1203, category: "interval", postedAgo: "3h ago", author: "TigerFanatic" },
  { id: "m5", heroId: "charan", caption: "RRR flashback hitting different on rewatch", subCaption: "Ramaraju for Bheem - GOAT scene 💯", emoji: "🔥", bgGradient: "from-red-950 via-rose-950 to-red-950", upvotes: 11204, comments: 987, category: "nostalgia", postedAgo: "6h ago", author: "RRRForever" },
  { id: "m6", heroId: "chiru", caption: "Megastar walks on screen for the first time in the film", subCaption: "3 min standing ovation. Director crying 😭", emoji: "🌟", bgGradient: "from-purple-950 via-violet-950 to-purple-950", upvotes: 6543, comments: 456, category: "entry", postedAgo: "8h ago", author: "MegaFanatic" },
  { id: "m7", heroId: "bala", caption: "NBK's dialogue delivery in Akhanda", subCaption: "\"Emi chestav ra nee babu\" goes HARD 🦁", emoji: "🦁", bgGradient: "from-cyan-950 via-teal-950 to-cyan-950", upvotes: 5231, comments: 677, category: "dialogue", postedAgo: "12h ago", author: "NBKClan" },
  { id: "m8", heroId: "vijay", caption: "Arjun Reddy dialogue lands in 2024 differently", subCaption: "\"Tumhara kya hoga Kaliya\" energy 💥", emoji: "💥", bgGradient: "from-red-950 via-orange-950 to-red-950", upvotes: 8901, comments: 1122, category: "dialogue", postedAgo: "4h ago", author: "RowdyBoi" },
  { id: "m9", heroId: "nani", caption: "Nani in a family entertainer vs Nani in a dark film", subCaption: "TWO completely different modes 🌿", emoji: "🌿", bgGradient: "from-green-950 via-emerald-950 to-green-950", upvotes: 3456, comments: 198, category: "reaction", postedAgo: "1d ago", author: "NaturalNani" },
  { id: "m10", heroId: "allu", caption: "Pushpa 2 second half vs first half", subCaption: "The Samantha item number erasure from memory 💀", emoji: "🕺", bgGradient: "from-slate-900 via-zinc-900 to-slate-900", upvotes: 15670, comments: 2341, category: "war", postedAgo: "1h ago", author: "FlowerAllu" },
  { id: "m11", heroId: "pawan", caption: "Bro thinks he can debate Power Star's acting", subCaption: "Me: Say that again. I dare you ⚡", emoji: "😤", bgGradient: "from-amber-950 via-yellow-950 to-amber-950", upvotes: 6789, comments: 543, category: "war", postedAgo: "7h ago", author: "JanaSenaPK" },
  { id: "m12", heroId: "mahesh", caption: "Maharshi scene where Rishi meets his father", subCaption: "I was NOT ready. Not a single tissue in the theatre 😭", emoji: "👑", bgGradient: "from-blue-950 via-blue-900 to-indigo-950", upvotes: 5432, comments: 321, category: "nostalgia", postedAgo: "2d ago", author: "SSMBForever" },
  { id: "m13", heroId: "ntr", caption: "When NTR does a 180 degree neck turn in slow motion", subCaption: "Cinematographer got a raise that day 📸", emoji: "🎬", bgGradient: "from-orange-950 via-red-950 to-orange-950", upvotes: 4567, comments: 298, category: "entry", postedAgo: "9h ago", author: "YoungTigerArmy" },
  { id: "m14", heroId: "chiru", caption: "Chiru's Khaidi in 1983 vs today's action films", subCaption: "He invented the genre. Full stop 💯", emoji: "🌟", bgGradient: "from-purple-950 via-purple-900 to-violet-950", upvotes: 8123, comments: 712, category: "nostalgia", postedAgo: "3h ago", author: "MegaFan1983" },
  { id: "m15", heroId: "vijay", caption: "VD's hair game in Liger vs Arjun Reddy", subCaption: "Character arc be like 📉📈", emoji: "💇", bgGradient: "from-red-950 via-red-900 to-orange-950", upvotes: 3234, comments: 445, category: "reaction", postedAgo: "15h ago", author: "RowdyFanatics" },
  { id: "m16", heroId: "nani", caption: "Jersey scene where Nani picks up the bat again", subCaption: "My face: 😭 My heart: 💔 My soul: HEALED ✨", emoji: "🏏", bgGradient: "from-green-950 via-green-900 to-emerald-950", upvotes: 7654, comments: 567, category: "nostalgia", postedAgo: "4h ago", author: "NaniArmy" },
];

// ─── Fan War Ticker ───────────────────────────────────────────────────────────

export const fanWarTicker: string[] = [
  "⚡ PowerStarFan01 just posted: 'Bheemla Nayak interval bang > any 2024 film' — 4.2K agrees",
  "🕺 FlowerAllu trending: Pushpa 2 crosses ₹1800Cr — still counting!",
  "🐯 YoungTigerArmy: 'Devara Part 2 is coming. The wait begins 🙏'",
  "👑 MaheshArmy: 'Guntur Kaaram rewatch hits different. Give it another chance.'",
  "🔥 RRRForever: 'Naatu Naatu Oscar 2 years ago. STILL gives goosebumps.'",
  "🌟 MegaFanatic: 'Bholaa Shankar is underrated. I said what I said.'",
  "🦁 NBKClan declares: 'Akhanda 2 trailer drops Friday. FDFS tickets sold out in 6 mins.'",
  "💥 RowdyBoi uploads: New VD dialogue reel. 12K views in 9 minutes.",
  "🌿 NaturalNani: 'HIT 3 title reveal tomorrow at midnight. Twitter will explode.'",
  "⚡ Fan War of the Hour: PK fans vs SSMB fans — whose BGM hits harder? Vote now!",
  "🎬 BREAKING: Kalki 2898 AD Part 2 officially confirmed! 8M reactions in 1 hour!",
  "🏆 Banisa Meter: 'PowerStarFan01' just achieved DECADE BANISA status. Respect! 👑",
];

// Export alias used by banisa route
export { memeCards as initialMemes };

