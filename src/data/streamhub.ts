// ─── StreamHub Data & Types ──────────────────────────────────────────────────

export interface StreamingOption {
  providerId: string;
  providerName: string;
  logo: string;
  accessType: "flatrate" | "rent" | "buy" | "free" | "theatre";
  price?: string; // e.g. "₹149"
  deepLink: string;
  quality: ("4K" | "HDR10+" | "Dolby Atmos" | "5.1" | "IMAX")[];
}

export interface StreamItem {
  id: string;
  title: string;
  originalTitle?: string;
  language: "Telugu" | "Tamil" | "Malayalam" | "Hindi" | "English";
  releaseYear: number;
  runtimeMinutes: number;
  posterUrl: string;
  heroId?: string; // e.g. "pawan", "allu", "ntr", "mahesh", "charan"
  synopsis: string;
  imdbRating: number;
  tmdbRating: number;
  rottenTomatoesScore: number;
  editorialRating: number; // out of 5
  audienceSentiment: number; // 0-100%
  sentimentLabel: string; // e.g. "Mass Rampage ⚡", "Mind-Bending 🧠"
  genres: string[];
  moods: ("Mass Rampage" | "Mind-Bending" | "High-Octane" | "Family Sentiment" | "Romantic Classic")[];
  theatricalReleaseDate?: string; // YYYY-MM-DD
  ottReleaseDate?: string; // YYYY-MM-DD
  windowDays?: number; // Days between theatre & OTT release
  status: "in-theatres" | "recently-added-ott" | "streaming-now" | "upcoming-ott" | "price-dropped";
  streamingOptions: StreamingOption[];
  priceDropAlert?: { oldPrice: string; newPrice: string; label: string };
  specs: ("4K" | "HDR10+" | "Dolby Atmos" | "5.1" | "IMAX")[];
}

export interface PlatformConfig {
  id: string;
  name: string;
  logo: string;
  color: string;
  bgGradient: string;
  popularInRegion: string;
}

export const majorPlatforms: PlatformConfig[] = [
  { id: "aha", name: "aha Telugu", logo: "https://image.tmdb.org/t/p/w92/hH5Jk96wT2E5i5Xj6Zk8x8.png", color: "#FF5722", bgGradient: "from-orange-600 to-amber-700", popularInRegion: "Telugu 100% Regional" },
  { id: "netflix", name: "Netflix", logo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png", color: "#E50914", bgGradient: "from-red-700 to-black", popularInRegion: "Global & Pan-India" },
  { id: "prime", name: "Prime Video", logo: "https://image.tmdb.org/t/p/w92/dQeAjt5myrYYz9gK6kgOiVMvuWC.png", color: "#00A8E1", bgGradient: "from-sky-600 to-blue-900", popularInRegion: "Blockbuster Premieres" },
  { id: "hotstar", name: "Disney+ Hotstar", logo: "https://image.tmdb.org/t/p/w92/6v09fJ0XWfXz9VvWf5Y3.png", color: "#113CCF", bgGradient: "from-blue-700 to-indigo-950", popularInRegion: "Family & Spec Epics" },
  { id: "zee5", name: "Zee5", logo: "https://image.tmdb.org/t/p/w92/2E0ft262M1erM8gL21jG1tGf1.png", color: "#A82086", bgGradient: "from-purple-700 to-pink-950", popularInRegion: "Regional Classics" },
  { id: "jiocinema", name: "JioCinema", logo: "https://image.tmdb.org/t/p/w92/83Zg3H2u3J5mC7S6Z.png", color: "#D9008D", bgGradient: "from-pink-600 to-purple-900", popularInRegion: "Free & Mass Movies" },
  { id: "etvwin", name: "ETV Win", logo: "https://image.tmdb.org/t/p/w92/etvwin.png", color: "#E65100", bgGradient: "from-amber-600 to-yellow-800", popularInRegion: "Telugu Heritage" },
];

export const curatedStreamCatalog: StreamItem[] = [
  {
    id: "pushpa-2",
    title: "Pushpa 2: The Rule",
    originalTitle: "Pushpa 2: The Rule",
    language: "Telugu",
    releaseYear: 2024,
    runtimeMinutes: 198,
    posterUrl: "https://image.tmdb.org/t/p/w500/vTjg5bQfW9i68o2m1i.jpg",
    heroId: "allu",
    synopsis: "Pushparaj expands his red sandalwood empire globally while facing fierce conflict with Bhanwar Singh Shekhawat in an explosive showdown.",
    imdbRating: 8.4,
    tmdbRating: 8.6,
    rottenTomatoesScore: 88,
    editorialRating: 4.8,
    audienceSentiment: 96,
    sentimentLabel: "All-Time Mass Rampage ⚡",
    genres: ["Action", "Crime", "Drama"],
    moods: ["Mass Rampage", "High-Octane"],
    theatricalReleaseDate: "2024-12-05",
    ottReleaseDate: "2025-01-30",
    windowDays: 56,
    status: "streaming-now",
    priceDropAlert: { oldPrice: "₹199 Rent", newPrice: "Free on Netflix", label: "Flatrate Premiered" },
    specs: ["4K", "HDR10+", "Dolby Atmos", "5.1"],
    streamingOptions: [
      {
        providerId: "netflix",
        providerName: "Netflix",
        logo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
        accessType: "flatrate",
        deepLink: "https://www.netflix.com/search?q=Pushpa%202",
        quality: ["4K", "HDR10+", "Dolby Atmos"]
      }
    ]
  },
  {
    id: "devara",
    title: "Devara: Part 1",
    originalTitle: "Devara: Part 1",
    language: "Telugu",
    releaseYear: 2024,
    runtimeMinutes: 178,
    posterUrl: "https://image.tmdb.org/t/p/w500/A2W2ZqJqW3jFjW2yZ.jpg",
    heroId: "ntr",
    synopsis: "An epic coastal sea-action drama tracing fear, courage, and bloodline rivalry across treacherous waters.",
    imdbRating: 7.9,
    tmdbRating: 8.1,
    rottenTomatoesScore: 82,
    editorialRating: 4.5,
    audienceSentiment: 92,
    sentimentLabel: "Coastal Fury & High Energy 🌊",
    genres: ["Action", "Drama", "Thriller"],
    moods: ["Mass Rampage", "High-Octane"],
    theatricalReleaseDate: "2024-09-27",
    ottReleaseDate: "2024-11-08",
    windowDays: 42,
    status: "streaming-now",
    specs: ["4K", "Dolby Atmos", "5.1"],
    streamingOptions: [
      {
        providerId: "netflix",
        providerName: "Netflix",
        logo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
        accessType: "flatrate",
        deepLink: "https://www.netflix.com/search?q=Devara",
        quality: ["4K", "Dolby Atmos"]
      }
    ]
  },
  {
    id: "kalki-2898-ad",
    title: "Kalki 2898 AD",
    language: "Telugu",
    releaseYear: 2024,
    runtimeMinutes: 180,
    posterUrl: "https://image.tmdb.org/t/p/w500/kalki2898ad.jpg",
    synopsis: "In a dystopian post-apocalyptic 2898 AD, a bounty hunter named Bhairava navigates Complex city to protect a mother carrying the sacred child.",
    imdbRating: 8.1,
    tmdbRating: 8.3,
    rottenTomatoesScore: 85,
    editorialRating: 4.7,
    audienceSentiment: 94,
    sentimentLabel: "Sci-Fi Mythological Spectacle 🧠⚡",
    genres: ["Sci-Fi", "Action", "Mythology"],
    moods: ["Mind-Bending", "High-Octane"],
    theatricalReleaseDate: "2024-06-27",
    ottReleaseDate: "2024-08-22",
    windowDays: 56,
    status: "streaming-now",
    specs: ["4K", "HDR10+", "Dolby Atmos", "IMAX"],
    streamingOptions: [
      {
        providerId: "prime",
        providerName: "Prime Video (Telugu/South)",
        logo: "https://image.tmdb.org/t/p/w92/dQeAjt5myrYYz9gK6kgOiVMvuWC.png",
        accessType: "flatrate",
        deepLink: "https://www.primevideo.com/search?phrase=Kalki%202898%20AD",
        quality: ["4K", "HDR10+", "Dolby Atmos"]
      },
      {
        providerId: "netflix",
        providerName: "Netflix (Hindi)",
        logo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
        accessType: "flatrate",
        deepLink: "https://www.netflix.com/search?q=Kalki%202898",
        quality: ["4K", "Dolby Atmos"]
      }
    ]
  },
  {
    id: "guntur-kaaram",
    title: "Guntur Kaaram",
    language: "Telugu",
    releaseYear: 2024,
    runtimeMinutes: 159,
    posterUrl: "https://image.tmdb.org/t/p/w500/gunturkaaram.jpg",
    heroId: "mahesh",
    synopsis: "Ramana, an estranged son in Guntur, confronts political clout, family heritage, and fiery spicy mass confrontations.",
    imdbRating: 7.2,
    tmdbRating: 7.5,
    rottenTomatoesScore: 74,
    editorialRating: 4.1,
    audienceSentiment: 85,
    sentimentLabel: "Spicy Super Star Mass 👑🌶️",
    genres: ["Action", "Family", "Drama"],
    moods: ["Mass Rampage", "Family Sentiment"],
    theatricalReleaseDate: "2024-01-12",
    ottReleaseDate: "2024-02-09",
    windowDays: 28,
    status: "streaming-now",
    specs: ["4K", "5.1"],
    streamingOptions: [
      {
        providerId: "netflix",
        providerName: "Netflix",
        logo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
        accessType: "flatrate",
        deepLink: "https://www.netflix.com/search?q=Guntur%20Kaaram",
        quality: ["4K", "5.1"]
      }
    ]
  },
  {
    id: "game-changer",
    title: "Game Changer",
    language: "Telugu",
    releaseYear: 2025,
    runtimeMinutes: 165,
    posterUrl: "https://image.tmdb.org/t/p/w500/gamechanger.jpg",
    heroId: "charan",
    synopsis: "An honest IAS officer takes on electoral corruption and political syndicates to revolutionize governance.",
    imdbRating: 8.0,
    tmdbRating: 8.2,
    rottenTomatoesScore: 84,
    editorialRating: 4.6,
    audienceSentiment: 91,
    sentimentLabel: "High-Octane Political Thriller 🔥",
    genres: ["Action", "Political", "Drama"],
    moods: ["High-Octane", "Mind-Bending"],
    theatricalReleaseDate: "2025-01-10",
    ottReleaseDate: "2025-03-07",
    windowDays: 56,
    status: "upcoming-ott",
    priceDropAlert: { oldPrice: "Theatres Only", newPrice: "Coming to Prime", label: "Confirmed Premiere" },
    specs: ["4K", "HDR10+", "Dolby Atmos"],
    streamingOptions: [
      {
        providerId: "prime",
        providerName: "Prime Video",
        logo: "https://image.tmdb.org/t/p/w92/dQeAjt5myrYYz9gK6kgOiVMvuWC.png",
        accessType: "flatrate",
        deepLink: "https://www.primevideo.com/search?phrase=Game%20Changer",
        quality: ["4K", "Dolby Atmos"]
      }
    ]
  },
  {
    id: "bheemla-nayak",
    title: "Bheemla Nayak",
    language: "Telugu",
    releaseYear: 2022,
    runtimeMinutes: 145,
    posterUrl: "https://image.tmdb.org/t/p/w500/bheemlanayak.jpg",
    heroId: "pawan",
    synopsis: "An uncompromising sub-inspector and an arrogant ex-havildar clash in an intense ego battle in the forests.",
    imdbRating: 7.7,
    tmdbRating: 7.9,
    rottenTomatoesScore: 80,
    editorialRating: 4.4,
    audienceSentiment: 93,
    sentimentLabel: "Power Star Ego Rampage ⚡",
    genres: ["Action", "Thriller"],
    moods: ["Mass Rampage", "High-Octane"],
    theatricalReleaseDate: "2022-02-25",
    ottReleaseDate: "2022-03-24",
    windowDays: 27,
    status: "streaming-now",
    specs: ["4K", "Dolby Atmos"],
    streamingOptions: [
      {
        providerId: "aha",
        providerName: "aha Telugu",
        logo: "https://image.tmdb.org/t/p/w92/hH5Jk96wT2E5i5Xj6Zk8x8.png",
        accessType: "flatrate",
        deepLink: "https://www.aha.video/search?q=Bheemla%20Nayak",
        quality: ["4K", "Dolby Atmos"]
      },
      {
        providerId: "hotstar",
        providerName: "Disney+ Hotstar",
        logo: "https://image.tmdb.org/t/p/w92/6v09fJ0XWfXz9VvWf5Y3.png",
        accessType: "flatrate",
        deepLink: "https://www.hotstar.com/in/search?q=Bheemla%20Nayak",
        quality: ["4K", "5.1"]
      }
    ]
  },
  {
    id: "akhanda",
    title: "Akhanda",
    language: "Telugu",
    releaseYear: 2021,
    runtimeMinutes: 167,
    posterUrl: "https://image.tmdb.org/t/p/w500/akhanda.jpg",
    heroId: "bala",
    synopsis: "A fierce Aghora devoutly steps into the mortal world to unleash divine retribution upon corrupt mafia lords.",
    imdbRating: 7.6,
    tmdbRating: 7.8,
    rottenTomatoesScore: 78,
    editorialRating: 4.3,
    audienceSentiment: 95,
    sentimentLabel: "Unfiltered High Decibel Mass 🦁⚡",
    genres: ["Action", "Devotional"],
    moods: ["Mass Rampage"],
    theatricalReleaseDate: "2021-12-02",
    ottReleaseDate: "2022-01-21",
    windowDays: 50,
    status: "streaming-now",
    specs: ["5.1"],
    streamingOptions: [
      {
        providerId: "hotstar",
        providerName: "Disney+ Hotstar",
        logo: "https://image.tmdb.org/t/p/w92/6v09fJ0XWfXz9VvWf5Y3.png",
        accessType: "flatrate",
        deepLink: "https://www.hotstar.com/in/search?q=Akhanda",
        quality: ["5.1"]
      }
    ]
  },
  {
    id: "hanuman",
    title: "Hanu-Man",
    language: "Telugu",
    releaseYear: 2024,
    runtimeMinutes: 158,
    posterUrl: "https://image.tmdb.org/t/p/w500/hanuman.jpg",
    synopsis: "An ordinary young man in Anjanadri village gains the superhero powers of Lord Hanuman to fight an evil corporation.",
    imdbRating: 8.2,
    tmdbRating: 8.4,
    rottenTomatoesScore: 89,
    editorialRating: 4.7,
    audienceSentiment: 97,
    sentimentLabel: "Indigenous Superhero Wonder 🌟",
    genres: ["Fantasy", "Action", "Mythology"],
    moods: ["Mind-Bending", "Family Sentiment"],
    theatricalReleaseDate: "2024-01-12",
    ottReleaseDate: "2024-03-18",
    windowDays: 66,
    status: "streaming-now",
    priceDropAlert: { oldPrice: "₹149 Rent", newPrice: "Free on Zee5 / JioCinema", label: "Price Dropped" },
    specs: ["4K", "Dolby Atmos"],
    streamingOptions: [
      {
        providerId: "zee5",
        providerName: "Zee5 (Telugu)",
        logo: "https://image.tmdb.org/t/p/w92/2E0ft262M1erM8gL21jG1tGf1.png",
        accessType: "flatrate",
        deepLink: "https://www.zee5.com/search?q=Hanu-Man",
        quality: ["4K", "Dolby Atmos"]
      },
      {
        providerId: "jiocinema",
        providerName: "JioCinema (Hindi)",
        logo: "https://image.tmdb.org/t/p/w92/83Zg3H2u3J5mC7S6Z.png",
        accessType: "free",
        deepLink: "https://www.jiocinema.com/search/Hanu-Man",
        quality: ["4K"]
      }
    ]
  },
  {
    id: "hit-3",
    title: "HIT: The 3rd Case",
    language: "Telugu",
    releaseYear: 2025,
    runtimeMinutes: 150,
    posterUrl: "https://image.tmdb.org/t/p/w500/hit3.jpg",
    heroId: "nani",
    synopsis: "Officer Arjun Sarkaar delves into the darkest serial criminal case across the Himalayan frontiers.",
    imdbRating: 8.3,
    tmdbRating: 8.5,
    rottenTomatoesScore: 86,
    editorialRating: 4.6,
    audienceSentiment: 90,
    sentimentLabel: "Gripping Dark Investigation 🌿🔍",
    genres: ["Thriller", "Crime", "Mystery"],
    moods: ["Mind-Bending", "High-Octane"],
    theatricalReleaseDate: "2025-05-01",
    ottReleaseDate: "2025-06-20",
    windowDays: 50,
    status: "upcoming-ott",
    specs: ["4K", "Dolby Atmos"],
    streamingOptions: [
      {
        providerId: "netflix",
        providerName: "Netflix",
        logo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
        accessType: "flatrate",
        deepLink: "https://www.netflix.com/search?q=HIT%203",
        quality: ["4K", "Dolby Atmos"]
      }
    ]
  },
  {
    id: "arjun-reddy",
    title: "Arjun Reddy",
    language: "Telugu",
    releaseYear: 2017,
    runtimeMinutes: 182,
    posterUrl: "https://image.tmdb.org/t/p/w500/arjunreddy.jpg",
    heroId: "vijay",
    synopsis: "A high-functioning house surgeon plunges into self-destruction after his soulmate is forced to marry another.",
    imdbRating: 8.0,
    tmdbRating: 8.1,
    rottenTomatoesScore: 83,
    editorialRating: 4.6,
    audienceSentiment: 94,
    sentimentLabel: "Raw Cult Intensity 💥",
    genres: ["Romance", "Drama"],
    moods: ["Romantic Classic", "Mass Rampage"],
    theatricalReleaseDate: "2017-08-25",
    ottReleaseDate: "2017-10-15",
    windowDays: 51,
    status: "streaming-now",
    specs: ["5.1"],
    streamingOptions: [
      {
        providerId: "prime",
        providerName: "Prime Video",
        logo: "https://image.tmdb.org/t/p/w92/dQeAjt5myrYYz9gK6kgOiVMvuWC.png",
        accessType: "flatrate",
        deepLink: "https://www.primevideo.com/search?phrase=Arjun%20Reddy",
        quality: ["5.1"]
      },
      {
        providerId: "hotstar",
        providerName: "Disney+ Hotstar",
        logo: "https://image.tmdb.org/t/p/w92/6v09fJ0XWfXz9VvWf5Y3.png",
        accessType: "flatrate",
        deepLink: "https://www.hotstar.com/in/search?q=Arjun%20Reddy",
        quality: ["5.1"]
      }
    ]
  }
];

// ─── Dual Timeline Release Matrix Data ──────────────────────────────────────

export interface ReleaseMatrixEntry {
  id: string;
  title: string;
  heroName: string;
  theatricalDate: string; // FDFS
  ottPlatform: string;
  ottPlatformLogo: string;
  ottDate: string;
  windowDays: number;
  status: "FDFS Today" | "In Theatres" | "Streaming Now" | "Digital Premiere Soon";
}

export const releaseMatrixData: ReleaseMatrixEntry[] = [
  {
    id: "m1",
    title: "Pushpa 2: The Rule",
    heroName: "Allu Arjun",
    theatricalDate: "Dec 05, 2024",
    ottPlatform: "Netflix",
    ottPlatformLogo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
    ottDate: "Jan 30, 2025",
    windowDays: 56,
    status: "Streaming Now"
  },
  {
    id: "m2",
    title: "Devara: Part 1",
    heroName: "Jr NTR",
    theatricalDate: "Sep 27, 2024",
    ottPlatform: "Netflix",
    ottPlatformLogo: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXjW2tW1x.png",
    ottDate: "Nov 08, 2024",
    windowDays: 42,
    status: "Streaming Now"
  },
  {
    id: "m3",
    title: "Game Changer",
    heroName: "Ram Charan",
    theatricalDate: "Jan 10, 2025",
    ottPlatform: "Prime Video",
    ottPlatformLogo: "https://image.tmdb.org/t/p/w92/dQeAjt5myrYYz9gK6kgOiVMvuWC.png",
    ottDate: "Mar 07, 2025",
    windowDays: 56,
    status: "Digital Premiere Soon"
  },
  {
    id: "m4",
    title: "Sankranthiki Vasthunam",
    heroName: "Venkatesh",
    theatricalDate: "Jan 14, 2025",
    ottPlatform: "Zee5",
    ottPlatformLogo: "https://image.tmdb.org/t/p/w92/2E0ft262M1erM8gL21jG1tGf1.png",
    ottDate: "Feb 14, 2025",
    windowDays: 31,
    status: "In Theatres"
  },
  {
    id: "m5",
    title: "Daaku Maharaj",
    heroName: "Balakrishna",
    theatricalDate: "Jan 12, 2025",
    ottPlatform: "aha Telugu",
    ottPlatformLogo: "https://image.tmdb.org/t/p/w92/hH5Jk96wT2E5i5Xj6Zk8x8.png",
    ottDate: "Feb 21, 2025",
    windowDays: 40,
    status: "In Theatres"
  },
  {
    id: "m6",
    title: "Kalki 2898 AD Part 2",
    heroName: "Prabhas",
    theatricalDate: "Dec 18, 2025",
    ottPlatform: "Prime Video",
    ottPlatformLogo: "https://image.tmdb.org/t/p/w92/dQeAjt5myrYYz9gK6kgOiVMvuWC.png",
    ottDate: "Feb 12, 2026",
    windowDays: 56,
    status: "Digital Premiere Soon"
  }
];
