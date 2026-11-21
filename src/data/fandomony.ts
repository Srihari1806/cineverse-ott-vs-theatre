// ─── Fandomony Data ──────────────────────────────────────────────────────────

export interface FandomonyProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  heroFandom: string; // hero id
  directorFav: string;
  dialogueBio: string;
  dialogueSource: string;
  firstMeetScenario: string;
  trailerTagline: string;
  screenTestScore: number; // 0-100
  compatibilityTags: string[];
  bgmChoice: string;
  avatarGradient: string;
  initials: string;
}

export const fandomonyProfiles: FandomonyProfile[] = [
  {
    id: "p1", name: "Ananya Reddy", age: 26, city: "Hyderabad",
    heroFandom: "allu", directorFav: "Sukumar",
    dialogueBio: "\"Jhukega nahi sala\" — that's my response to every Monday morning.",
    dialogueSource: "Pushpa: The Rise",
    firstMeetScenario: "Interval Bang", screenTestScore: 88,
    compatibilityTags: ["Pushpa stan", "Single screens", "Midnight bookings", "SLV Filter coffee"],
    bgmChoice: "Srivalli BGM",
    trailerTagline: "Oo antava? Yes antava. 💃",
    avatarGradient: "from-slate-500 to-slate-700", initials: "AR",
  },
  {
    id: "p2", name: "Karthik Sharma", age: 28, city: "Vizag",
    heroFandom: "pawan", directorFav: "Trivikram",
    dialogueBio: "\"Atmahatya chesukovalani undadu, chesiyaledemo anipistundi\" hits every deadline.",
    dialogueSource: "Gabbar Singh",
    firstMeetScenario: "Rain Fight Sequence", screenTestScore: 92,
    compatibilityTags: ["Power Star devotee", "Dialogue memorizer", "Fan club president", "Biryani connoisseur"],
    bgmChoice: "Cameraman Gangatho Rambabu intro BGM",
    trailerTagline: "Oka Power Star fan. Aalochinchadam manesadu. ⚡",
    avatarGradient: "from-amber-600 to-orange-700", initials: "KS",
  },
  {
    id: "p3", name: "Sravya Nair", age: 24, city: "Bangalore",
    heroFandom: "mahesh", directorFav: "SS Rajamouli",
    dialogueBio: "\"Style ante naakeya\" — my entire fashion philosophy explained in four words.",
    dialogueSource: "Pokiri",
    firstMeetScenario: "Train Station Entry", screenTestScore: 79,
    compatibilityTags: ["SSMB Army", "Multiplex royalty", "RRR 17 times", "Coffee addict"],
    bgmChoice: "Maharshi BGM",
    trailerTagline: "If you can't handle Super Star heat, get out of the theatre 👑",
    avatarGradient: "from-blue-600 to-indigo-700", initials: "SN",
  },
  {
    id: "p4", name: "Rahul Goud", age: 30, city: "Warangal",
    heroFandom: "ntr", directorFav: "SS Rajamouli",
    dialogueBio: "\"Raju gari intlo chor untadu\" – every audit season at my company.",
    dialogueSource: "RRR",
    firstMeetScenario: "FDFS 4AM Show", screenTestScore: 95,
    compatibilityTags: ["Young Tiger tribe", "RRR FDFS survivor", "Telugu pride", "Theeyani kalidaasulu"],
    bgmChoice: "Naatu Naatu full version",
    trailerTagline: "Bheem-level loyalty. NTR-level intensity. 🐯",
    avatarGradient: "from-orange-500 to-yellow-600", initials: "RG",
  },
  {
    id: "p5", name: "Divya Krishnan", age: 27, city: "Chennai",
    heroFandom: "chiran", directorFav: "Boyapati Srinu",
    dialogueBio: "\"Ee ooru meeru vadileyandi\" — my polite request to people who dislike Megastar.",
    dialogueSource: "Khaidi No 150",
    firstMeetScenario: "Audio Launch", screenTestScore: 83,
    compatibilityTags: ["Megastar legend", "Vintage TFI fan", "Khaidi 1983 defender", "Jai Chiranjeeva era"],
    bgmChoice: "Indra intro theme",
    trailerTagline: "He invented the mass hero. Every comparison is flattery. 🌟",
    avatarGradient: "from-purple-600 to-violet-800", initials: "DK",
  },
  {
    id: "p6", name: "Venkat Rao", age: 32, city: "Guntur",
    heroFandom: "charan", directorFav: "Shankar",
    dialogueBio: "\"Yedo okkaadu untaadu... avadi nenu\" - how I enter every zoom meeting.",
    dialogueSource: "Magadheera",
    firstMeetScenario: "Rain Fight Sequence", screenTestScore: 87,
    compatibilityTags: ["Mega Power clan", "Game Changer hype", "FDFS Guntur crew", "RRR Oscar party host"],
    bgmChoice: "Magadheera war theme",
    trailerTagline: "Warrior in every past life. Ram Charan fan in this one. 🔥",
    avatarGradient: "from-red-700 to-rose-800", initials: "VR",
  },
  {
    id: "p7", name: "Madhuri Bolla", age: 25, city: "Tirupati",
    heroFandom: "bala", directorFav: "Boyapati Srinu",
    compatibilityTags: ["NBK Lion fandom", "Akhanda re-watch champion", "Mass whistle giver", "Single-screen veteran"],
    dialogueBio: "\"Emi chestav ra nee babu\" — my auto-reply when relatives ask about career plans.",
    dialogueSource: "Akhanda",
    firstMeetScenario: "Interval Bang", screenTestScore: 74,
    bgmChoice: "Akhanda title card BGM",
    trailerTagline: "Nandamuri pride. Akhanda faith. Zero doubts. 🦁",
    avatarGradient: "from-cyan-500 to-teal-700", initials: "MB",
  },
  {
    id: "p8", name: "Arjun Mehta", age: 29, city: "Mumbai",
    heroFandom: "vijay", directorFav: "Sandeep Reddy Vanga",
    dialogueBio: "\"Nenu rowdy ni. Rowdyna love cheyataniki permit undi\" — my Tinder bio.",
    dialogueSource: "Arjun Reddy",
    firstMeetScenario: "Train Station Entry", screenTestScore: 81,
    compatibilityTags: ["Rowdy Star cult", "Animal screening date", "Arjun Reddy monologue memorizer", "Outsider but insider"],
    bgmChoice: "Arjun Reddy theme",
    trailerTagline: "Born in Mumbai. Heart in Hyderabad. Soul in every VD film. 💥",
    avatarGradient: "from-red-500 to-orange-600", initials: "AM",
  },
  {
    id: "p9", name: "Priya Lakshmi", age: 23, city: "Rajahmundry",
    heroFandom: "nani", directorFav: "Sekhar Kammula",
    dialogueBio: "\"Oka kiss esthava?\" — how I ask the waiter if there's a dessert menu.",
    dialogueSource: "Gang Leader",
    firstMeetScenario: "Re-release Screening", screenTestScore: 77,
    compatibilityTags: ["Natural Star fan", "Jersey cried 4 times", "HIT trilogy follower", "Small-town cinema lover"],
    bgmChoice: "Jersey title track",
    trailerTagline: "Simple. Real. Natural. Just like the films I love. 🌿",
    avatarGradient: "from-green-500 to-emerald-700", initials: "PL",
  },
  {
    id: "p10", name: "Srikanth Yadav", age: 31, city: "Karimnagar",
    heroFandom: "pawan", directorFav: "Puri Jagannadh",
    dialogueBio: "\"Bangaru thalli\" — what my mom calls me when I pay for her movie ticket.",
    dialogueSource: "Badrinath",
    firstMeetScenario: "FDFS 4AM Show", screenTestScore: 96,
    compatibilityTags: ["FDFS Karimnagar squad", "Khushi rewatch king", "Attarintiki Daredi anniversary viewer", "Power Star defense lawyer"],
    bgmChoice: "Jalsa intro BGM",
    trailerTagline: "Mood: Power Star in slow motion 🎬 walking toward haters. ⚡",
    avatarGradient: "from-amber-700 to-orange-800", initials: "SY",
  },
  {
    id: "p11", name: "Kavitha Murthy", age: 28, city: "Vijayawada",
    heroFandom: "mahesh", directorFav: "Vamshi Paidipally",
    dialogueBio: "\"Bullet\" — my one-word reply to unnecessary drama.",
    dialogueSource: "Pokiri",
    firstMeetScenario: "Audio Launch", screenTestScore: 85,
    compatibilityTags: ["Pokiri cult classic gang", "SSMB appreciation society", "Maharshi emotional damage", "Bharat Ane Nenu policy wonk"],
    bgmChoice: "Pokiri theme",
    trailerTagline: "Collector by day. Super Star fan forever. 👑",
    avatarGradient: "from-blue-700 to-blue-900", initials: "KM",
  },
  {
    id: "p12", name: "Tejesh Babu", age: 27, city: "Nellore",
    heroFandom: "ntr", directorFav: "SS Rajamouli",
    dialogueBio: "\"Naa ishtam vacchindi naakudu\" — my life philosophy after watching Temper.",
    dialogueSource: "Temper",
    firstMeetScenario: "Rain Fight Sequence", screenTestScore: 90,
    compatibilityTags: ["Tiger Nageswara Rao real fan", "NTR JR worship mode", "Devara theatre 3 times", "Aravinda Sametha tears club"],
    bgmChoice: "Aravinda Sametha BGM",
    trailerTagline: "Jai NTR. Jai Telugu Cinema. 🐯",
    avatarGradient: "from-orange-600 to-amber-700", initials: "TB",
  },
];

// ─── First Meet Scenarios ─────────────────────────────────────────────────────

export const firstMeetScenarios = [
  { id: "interval", label: "Interval Bang", emoji: "🎬", description: "Meet at the interval rush. Fight for samosa. Fall in love." },
  { id: "fdfs", label: "FDFS 4AM Show", emoji: "⏰", description: "Both in the same 4AM benefit show queue. Instant bond." },
  { id: "rain", label: "Rain Fight Sequence", emoji: "🌧️", description: "Dramatic slow-mo meeting in rain. Very filmy. Very us." },
  { id: "train", label: "Train Station Entry", emoji: "🚂", description: "You enter late. I'm already seated. Eye contact. Music starts." },
  { id: "audio", label: "Audio Launch", emoji: "🎵", description: "You sang along. I noticed. Hero blessed this moment." },
  { id: "rerelease", label: "Re-release Screening", emoji: "📽️", description: "Watching our childhood film together on the big screen again." },
];

// ─── Screen Test Quiz ─────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  points: number;
}

export const screenTestQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which film had the iconic 'Naatu Naatu' Oscar-winning song?",
    options: ["Baahubali 2", "RRR", "Kalki 2898 AD", "Magadheera"],
    correct: 1, points: 20,
  },
  {
    id: "q2",
    question: "\"Pokiri\" was directed by whom?",
    options: ["Trivikram", "Sukumar", "Puri Jagannadh", "Boyapati Srinu"],
    correct: 2, points: 20,
  },
  {
    id: "q3",
    question: "Allu Arjun's 'Pushpa: The Rise' was produced on a budget of approximately?",
    options: ["₹50 Cr", "₹200 Cr", "₹250 Cr", "₹150 Cr"],
    correct: 3, points: 20,
  },
  {
    id: "q4",
    question: "Which Pawan Kalyan film had the famous 'Power Star walk' entry?",
    options: ["Jalsa", "Gabbar Singh", "Cameraman Gangatho Rambabu", "Bheemla Nayak"],
    correct: 0, points: 20,
  },
  {
    id: "q5",
    question: "Jr NTR's character name in RRR?",
    options: ["Alluri Sitarama Raju", "Bheem", "Komaram Bheem", "Ramaraju"],
    correct: 2, points: 20,
  },
];

// ─── Directors List ───────────────────────────────────────────────────────────

export const directorsList = [
  "SS Rajamouli", "Sukumar", "Trivikram", "Boyapati Srinu",
  "Vamshi Paidipally", "Shankar", "Puri Jagannadh", "Sandeep Reddy Vanga",
  "Sekhar Kammula", "Nag Ashwin", "Harish Shankar", "Anil Ravipudi",
];
