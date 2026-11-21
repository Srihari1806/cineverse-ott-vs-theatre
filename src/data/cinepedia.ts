// ─── Cinepedia Wiki Entries ───────────────────────────────────────────────────

export interface WikiEntry {
  id: string;
  title: string;
  year: number;
  director: string;
  hero: string;
  heroine: string;
  grossing: string;
  genre: string[];
  description: string;
  legacy: string;
  trivia: string;
  tags: string[];
}

export const wikiEntries: WikiEntry[] = [
  {
    id: "w1", title: "Baahubali: The Beginning", year: 2015, director: "SS Rajamouli",
    hero: "Prabhas", heroine: "Tamannaah", grossing: "₹600 Cr+ worldwide",
    genre: ["Epic", "Fantasy", "Action"],
    description: "A saga of war, betrayal, and the mystery of why Kattappa killed Baahubali. Revolutionized Indian cinema with its scale and VFX budget.",
    legacy: "First South Indian film to gross ₹600 Cr worldwide. Sparked a pan-India movement. No film was the same after this.",
    trivia: "The question 'Why did Kattappa kill Baahubali?' trended for 730 days until the sequel released.",
    tags: ["pan-india", "rajamouli", "landmark", "epic scale"],
  },
  {
    id: "w2", title: "Pokiri", year: 2006, director: "Puri Jagannadh",
    hero: "Mahesh Babu", heroine: "Ileana D'Cruz", grossing: "₹45 Cr (2006 blockbuster)",
    genre: ["Mass Action", "Thriller"],
    description: "Prabhakar, an underworld mole, navigates gang wars with his signature swagger. Redefined mass entertainers for a generation.",
    legacy: "Ran 365 days in single screens. Made Mahesh Babu the undisputed commercial hero of his generation. Puri's magnum opus.",
    trivia: "\"Bullet\" became the most iconic single-word dialogue in Telugu film history.",
    tags: ["mahesh", "mass", "cult", "puri"],
  },
  {
    id: "w3", title: "Pushpa: The Rise", year: 2021, director: "Sukumar",
    hero: "Allu Arjun", heroine: "Rashmika Mandanna", grossing: "₹365 Cr+ worldwide",
    genre: ["Mass Action", "Drama"],
    description: "A coolie who rises to become the king of red sandalwood smuggling. Raw, rustic, and revolutionarily mass.",
    legacy: "Allu Arjun's first pan-India blockbuster. 'Jhukega nahi sala' became a national catchphrase. Part 2 crossed ₹1800 Cr.",
    trivia: "Sukumar rewrote the script 12 times before settling on this version. The flower/thorn motif was Allu Arjun's suggestion.",
    tags: ["allu arjun", "sukumar", "pan-india", "mass"],
  },
  {
    id: "w4", title: "RRR", year: 2022, director: "SS Rajamouli",
    hero: "Jr NTR & Ram Charan", heroine: "Alia Bhatt & Olivia Morris", grossing: "₹1,200 Cr+ worldwide",
    genre: ["Epic Action", "Historical Fiction"],
    description: "Two legendary Telugu freedom fighters — Alluri Sitarama Raju and Komaram Bheem — meet in colonial Delhi. A bromance for the ages.",
    legacy: "First Telugu film to win an Oscar. 'Naatu Naatu' performed at the Oscars ceremony. Changed global perception of Indian cinema.",
    trivia: "The film took 3 years to make. The bridge fight sequence took 35 days to shoot with 1200+ crew members.",
    tags: ["ntr", "charan", "rajamouli", "oscar", "landmark"],
  },
  {
    id: "w5", title: "Khaidi", year: 1983, director: "A. Kodandarami Reddy",
    hero: "Chiranjeevi", heroine: "Madhavi", grossing: "Silver Jubilee",
    genre: ["Mass Action"],
    description: "Chiranjeevi's breakthrough role that defined the mass action hero archetype in Telugu cinema for decades to come.",
    legacy: "This film invented the formula that every mass Telugu hero has followed since. Chiranjeevi became a phenomenon, not just an actor.",
    trivia: "The fight choreography was revolutionary for 1983. Chiranjeevi did most stunts himself — a decade before it became trendy.",
    tags: ["chiru", "vintage", "mass", "landmark", "1980s"],
  },
  {
    id: "w6", title: "Kalki 2898 AD", year: 2024, director: "Nag Ashwin",
    hero: "Prabhas", heroine: "Deepika Padukone", grossing: "₹650 Cr+ worldwide",
    genre: ["Sci-Fi Epic", "Mythology"],
    description: "A post-apocalyptic sci-fi retelling of the Kalki avatar mythology. Amitabh Bachchan, Kamal Haasan, and Deepika Padukone in an unprecedented ensemble.",
    legacy: "Most expensive Indian film ever made. Merged Indian mythology with Hollywood-scale sci-fi. Part 2 is the most anticipated sequel of the decade.",
    trivia: "The world-building research took 4 years. Director Nag Ashwin read 200+ books on mythology and dystopian fiction before writing a single word.",
    tags: ["prabhas", "sci-fi", "nag ashwin", "2024", "landmark"],
  },
  {
    id: "w7", title: "Magadheera", year: 2009, director: "SS Rajamouli",
    hero: "Ram Charan", heroine: "Kajal Aggarwal", grossing: "₹140 Cr (2009 record)",
    genre: ["Fantasy Action", "Historical"],
    description: "A warrior from 400 years ago is reincarnated in present-day to complete a love story left unfinished. RAM CHARAN's defining debut as a commercial star.",
    legacy: "India's highest-grossing film at the time of release. Set a new benchmark for VFX and scale in Indian cinema. Ram Charan became a star overnight.",
    trivia: "Rajamouli called it 'a warm-up for Baahubali'. The climax horse battle involved 2000+ junior artists.",
    tags: ["charan", "rajamouli", "fantasy", "landmark"],
  },
  {
    id: "w8", title: "Akhanda", year: 2021, director: "Boyapati Srinu",
    hero: "Balakrishna", heroine: "Pragya Jaiswal", grossing: "₹130 Cr worldwide",
    genre: ["Mass Action", "Devotional"],
    description: "A village guardian saint takes on a powerful don in a high-octane mass entertainer. Boyapati's signature style meets NBK's raw energy.",
    legacy: "Revived NBK's mass stardom completely. 'Emi chestav ra nee babu' became a cultural moment. Single screens ran houseful for 12 consecutive weeks.",
    trivia: "Boyapati Srinu designed the mass intervals specifically to trigger the whistle pattern that became the film's trademark.",
    tags: ["bala", "boyapati", "mass", "2021"],
  },
];

// ─── Fictionary Entries ───────────────────────────────────────────────────────

export interface FictionaryEntry {
  id: string;
  term: string;
  pronunciation: string;
  category: "mass-slang" | "fandom" | "trade" | "cinema" | "emotion";
  definition: string;
  example: string;
  popularizedBy: string;
  relatedTerms: string[];
}

export const fictionaryEntries: FictionaryEntry[] = [
  {
    id: "f1", term: "Interval Bang", pronunciation: "In-ter-val Bang",
    category: "cinema",
    definition: "The high-voltage cliffhanger scene placed just before the interval break, designed to leave the audience gasping, screaming, or whistling. The quality of the interval bang determines how much samosa the interval crowds will sell.",
    example: "Devara's interval bang had the entire theatre screaming. Absolute chaos. My samosa fell down. Worth it.",
    popularizedBy: "TFI trade circles, popularized in mainstream fandom by Pushpa and Devara reviews",
    relatedTerms: ["Mass", "Pakka Commercial", "SSR"],
  },
  {
    id: "f2", term: "SSR", pronunciation: "Ess-Ess-Arr",
    category: "cinema",
    definition: "Single Screen Response. The gold standard of mass entertainment measurement. If single-screen audiences in districts are going berserk — whistling, throwing coins, dancing in the aisles — your film has SSR. Multiplexes don't count.",
    example: "Bheemla Nayak got insane SSR in Rajahmundry. The screen literally shook during the rain fight.",
    popularizedBy: "Trade analysts and TFI fan pages tracking district performance",
    relatedTerms: ["Mass", "FDFS", "District collections"],
  },
  {
    id: "f3", term: "FDFS", pronunciation: "Eff-Dee-Eff-Ess",
    category: "fandom",
    definition: "First Day First Show. The sacred ritual of watching a hero's film in the very first show on release day — often a 4AM benefit show. FDFS is not just a screening; it is a pilgrimage. A declaration of faith.",
    example: "Bro I took leave on Friday, traveled 3 hours to Hyderabad, and stood in queue from 2AM. FDFS is FDFS.",
    popularizedBy: "Telugu fan clubs across Andhra Pradesh and Telangana",
    relatedTerms: ["Benefit Show", "Mass", "Fan Army"],
  },
  {
    id: "f4", term: "Mass Kaadu", pronunciation: "Mass Kaa-du",
    category: "mass-slang",
    definition: "Literally 'not mass' — a devastating critical verdict used to dismiss a hero's film for failing to deliver the raw, populist energy that mass entertainers promise. If a film gets 'Mass kaadu' from single-screen audiences, no amount of multiplex appreciation saves it.",
    example: "Bro the first half was fine but second half mass kaadu. Crowd walked out at interval.",
    popularizedBy: "Telugu film discussions on X (Twitter) and district fan pages",
    relatedTerms: ["SSR", "Pakka Commercial", "Flop Formula"],
  },
  {
    id: "f5", term: "Pakka Commercial", pronunciation: "Puk-ka Com-mer-cial",
    category: "cinema",
    definition: "A film that delivers all the expected commercial elements — mass hero entry, punch dialogues, item number, emotional sentiment, comedy, and climax action — with no apologies. A compliment of the highest order in TFI.",
    example: "F3 is pakka commercial. Not trying to win awards, just trying to make you leave the theatre grinning. Mission accomplished.",
    popularizedBy: "Director Anil Ravipudi's self-description of his films; adopted widely by fans",
    relatedTerms: ["Mass", "Commercial Hit", "Full Paisa Vasool"],
  },
  {
    id: "f6", term: "NTR-Level Entry", pronunciation: "Enn-Tee-Arr Level Entry",
    category: "mass-slang",
    definition: "A reference standard for the most cinematically spectacular hero entry sequences in Telugu films. When a hero's first appearance involves maximum slow-motion, maximum BGM buildup, maximum reaction shots, and maximum whistle-triggering potential.",
    example: "Devara's entry scene was NTR-level entry. Goosebumps from second 1. Director understands mass cinema.",
    popularizedBy: "Fan pages after multiple iconic Jr NTR entries across his filmography",
    relatedTerms: ["Mass Entry", "BGM", "FDFS", "Whistling Moment"],
  },
  {
    id: "f7", term: "Paisa Vasool", pronunciation: "Pie-sa Vuh-sool",
    category: "fandom",
    definition: "Hindi for 'money's worth'. The universal TFI verdict for a film that delivered complete entertainment value for the ticket price, regardless of critical reception. Three whistle scenes, one emotional scene, two good songs = paisa vasool.",
    example: "Unstoppable With NBK ep with Allu Arjun was paisa vasool. Two superstars bonding live. TV gold.",
    popularizedBy: "Mass Telugu audiences rating films before social media reviews existed",
    relatedTerms: ["Pakka Commercial", "Houseful", "Mass"],
  },
  {
    id: "f8", term: "Banisa", pronunciation: "Baa-ni-sa",
    category: "fandom",
    definition: "A passionate, unconditional devotee of a Telugu film hero. A Banisa doesn't just watch films — they live them. They queue for FDFS, run fan pages, can quote every dialogue, know the background score by heart, and will defend their hero in any comment section, at any hour.",
    example: "That guy has watched Pushpa 2 eleven times. Pure banisa energy. Respect.",
    popularizedBy: "TFI fan culture; derived from 'devotee' in Telugu cultural context",
    relatedTerms: ["Fan Army", "FDFS", "Hero Worship"],
  },
  {
    id: "f9", term: "Heroism", pronunciation: "He-ro-ism",
    category: "cinema",
    definition: "In TFI context, the specific quality of a scene that elevates a hero beyond a normal character — making them appear invincible, magnetic, and larger than life. Heroism is not acting; it is the audience's feeling of awe watching the hero onscreen.",
    example: "That scene where Pawan walks through the crowd — pure heroism. No dialogue needed. Just presence.",
    popularizedBy: "Telugu film criticism circles dating back to the 80s",
    relatedTerms: ["Mass", "Entry", "BGM", "Star Power"],
  },
  {
    id: "f10", term: "District Collections", pronunciation: "Dis-trict Kuh-lek-shuns",
    category: "trade",
    definition: "Box office earnings broken down by geographic district in Andhra Pradesh and Telangana. District collections are the real pulse of a Telugu film's mass appeal — if Nellore, Vizag, and Guntur are all houseful, the film is a genuine mass hit.",
    example: "Nellore district gave ₹18 Cr in opening weekend alone. Charan's film has genuine district strength.",
    popularizedBy: "TFI trade analysts and film journalists tracking regional performance",
    relatedTerms: ["SSR", "Trade Report", "FDFS"],
  },
  {
    id: "f11", term: "Sankranti Clash", pronunciation: "Sun-kraan-ti Clash",
    category: "trade",
    definition: "The most prestigious and commercially important box office battle in Telugu cinema — when two or more major heroes release their films during the Makar Sankranti festival weekend. Legends are made and reputations are staked.",
    example: "The 2019 Sankranti clash between Vinaya Vidheya Rama and F2 defined the year. Trade was never the same.",
    popularizedBy: "Annually anticipated since the 1990s when multiple big films fought for Sankranti dates",
    relatedTerms: ["Trade", "FDFS", "Box Office"],
  },
  {
    id: "f12", term: "Climax Scene", pronunciation: "Clai-max Seen",
    category: "cinema",
    definition: "In TFI, the climax is not just the ending — it's the emotional and action crescendo the entire film has been building toward. A bad climax can destroy an otherwise good film. A great climax becomes legend. The hall rises as one.",
    example: "Magadheera climax war scene had the entire theatre standing. 3000 people on their feet. Cinema magic.",
    popularizedBy: "Universal Telugu film vocabulary",
    relatedTerms: ["Mass", "Interval Bang", "BGM"],
  },
];

// ─── Social Pipeline Feed ─────────────────────────────────────────────────────

export type FeedBucket = "cinepedia" | "meme" | "boxoffice" | "fanwar" | "fictionary";

export interface SocialFeedItem {
  id: string;
  platform: "twitter" | "instagram" | "youtube";
  handle: string;
  content: string;
  timestamp: string;
  bucket: FeedBucket;
  confidence: number; // AI confidence 0-100
  hashtags: string[];
  likes: number;
  isProcessing?: boolean;
}

export const socialFeedSeed: SocialFeedItem[] = [
  {
    id: "sf1", platform: "twitter", handle: "@TFITradeGuru",
    content: "Pushpa 2 worldwide total crosses ₹1,834 Cr. New record for a Telugu film. All-time record. History made.",
    timestamp: "2m ago", bucket: "boxoffice", confidence: 98,
    hashtags: ["#Pushpa2", "#BoxOffice", "#AlluArjun"], likes: 14200,
  },
  {
    id: "sf2", platform: "instagram", handle: "@banisawall_official",
    content: "When the NTR entry BGM starts 🔊 Theatre crowd be like 👇 [video meme uploaded]",
    timestamp: "5m ago", bucket: "meme", confidence: 94,
    hashtags: ["#JrNTR", "#Devara", "#TFIMemes"], likes: 8900,
  },
  {
    id: "sf3", platform: "twitter", handle: "@CinemaClassicsHD",
    content: "Thread 🧵: 10 things you didn't know about Chiranjeevi's Khaidi (1983) — the film that invented the mass Telugu hero archetype. 1/10",
    timestamp: "8m ago", bucket: "cinepedia", confidence: 91,
    hashtags: ["#Chiranjeevi", "#Khaidi1983", "#TFIHistory"], likes: 5600,
  },
  {
    id: "sf4", platform: "twitter", handle: "@RowdyFanatics",
    content: "VD fans and Mahesh fans arguing in my comments. Meanwhile VD and SSMB are friends IRL 😂 The irony. Bro fans more extreme than heroes.",
    timestamp: "3m ago", bucket: "fanwar", confidence: 89,
    hashtags: ["#FanWar", "#TFI", "#VijayDeverakonda", "#MaheshBabu"], likes: 22100,
  },
  {
    id: "sf5", platform: "youtube", handle: "TFI Gyaan Channel",
    content: "What does 'SSR' mean in Telugu film trade? Full explainer video — 12 minutes. Mass entertainment decoded.",
    timestamp: "15m ago", bucket: "fictionary", confidence: 87,
    hashtags: ["#SSR", "#TFISlang", "#FilmTrade"], likes: 3400,
  },
  {
    id: "sf6", platform: "twitter", handle: "@PavanKalyanFCHyd",
    content: "Power Star walks on screen after 20 mins of BGM building. Entire theatre erupts. This is why we do FDFS 🙏⚡ Never gets old.",
    timestamp: "1m ago", bucket: "meme", confidence: 92,
    hashtags: ["#PawanKalyan", "#PowerStar", "#FDFS"], likes: 18700,
  },
  {
    id: "sf7", platform: "instagram", handle: "@telugu_cinema_wiki",
    content: "RRR Box Office breakdown: ₹540 Cr India. ₹660 Cr overseas. ₹1,200 Cr total. Oscar winner. Changed everything. 🏆",
    timestamp: "20m ago", bucket: "boxoffice", confidence: 96,
    hashtags: ["#RRR", "#Rajamouli", "#Oscar", "#BoxOffice"], likes: 31400,
  },
  {
    id: "sf8", platform: "twitter", handle: "@MassDialogueClub",
    content: "\"Interval Bang\" explained in one tweet: It's not just a scene. It's the cinema contract. Director promises excellence. Audience pays with their hearts.",
    timestamp: "11m ago", bucket: "fictionary", confidence: 83,
    hashtags: ["#IntervalBang", "#TFISlang", "#MassEntertainment"], likes: 4200,
  },
  {
    id: "sf9", platform: "twitter", handle: "@TFITradeGuru",
    content: "Devara Part 2 budget confirmed at ₹400 Cr. Shooting begins Q1 2025. Jr NTR is in BEAST MODE preparing for this.",
    timestamp: "30m ago", bucket: "cinepedia", confidence: 79,
    hashtags: ["#Devara2", "#JrNTR", "#BoxOffice"], likes: 9800,
  },
  {
    id: "sf10", platform: "instagram", handle: "@banisawall_memes",
    content: "Me explaining Kalki 2898 AD's plot to my parents vs what actually happened in the film [meme template: two photos]",
    timestamp: "7m ago", bucket: "meme", confidence: 95,
    hashtags: ["#Kalki2898AD", "#Prabhas", "#TFIMemes"], likes: 12300,
  },
];
