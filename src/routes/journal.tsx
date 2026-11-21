import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Bookmark,
  Share2,
  ChevronRight,
  Compass,
  Film,
  Layers,
  X,
} from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Cinema Journal — The Editorial Room | CineVerse" },
      {
        name: "description",
        content:
          "Cinematic magazine interface featuring deep-dive essays, box-office post-mortems, craft breakdowns and industry research reports.",
      },
    ],
  }),
  component: CinemaJournalPage,
});

interface Article {
  id: string;
  category: "Strategy & Windows" | "Craft Breakdown" | "Box Office Post-Mortem" | "Fandom Sociology";
  title: string;
  subtitle: string;
  readTime: string;
  author: string;
  date: string;
  summary: string;
  keyTakeaway: string;
  relatedFilm: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: "eight-week-window",
    category: "Strategy & Windows",
    title: "The Economics of the 8-Week OTT Window",
    subtitle: "Why Theatrical Exclusivity Still Dictates Streaming Valuation Across Pan-India Cinema",
    readTime: "7 min read",
    author: "CineVerse Research Desk",
    date: "October 2026",
    summary: "An investigation into why collapsing the theatrical window damages both box office recovery and subsequent digital license streaming metrics.",
    keyTakeaway: "Films that hold a strict 56-day theatrical exclusivity window command 28% higher streaming completion rates on Netflix and Prime Video.",
    relatedFilm: "Pushpa 2: The Rule",
    content: [
      "When the global pandemic forced studios to experiment with direct-to-digital premieres and shortened 4-week theatrical windows, industry consensus briefly predicted the demise of the traditional cinematic lifecycle. Five years later, the data tells the exact opposite story.",
      "Theatrical exclusivity is not merely a revenue channel—it is the primary marketing engine that creates cultural value. A film that runs in single screens for 8 weeks generates organic social discourse, fan meme waves, and word-of-mouth momentum that no digital algorithmic push can replicate.",
      "Our analysis of 45 tentpole releases across 2024–2026 reveals a stark economic reality: shortening the window to 4 weeks cannibalizes up to 35% of domestic theatrical gross while yielding zero measurable increase in lifetime streaming subscribers for the acquiring platform.",
    ],
  },
  {
    id: "sound-architecture",
    category: "Craft Breakdown",
    title: "The Acoustic Violence of Indian Mass Cinema",
    subtitle: "How DSP, Anirudh & Ravi Basrur Mastered the Physics of Auditorium Euphoria",
    readTime: "9 min read",
    author: "Sound & Craft Lab",
    date: "September 2026",
    summary: "Dissecting how sub-bass frequencies and interval staccato brass chords trigger communal dopamine spikes in single-screen theatres.",
    keyTakeaway: "The modern Indian interval theme is engineered with a sudden 15dB dynamic drop before a 105dB sub-bass release, triggering physical adrenaline.",
    relatedFilm: "Salaar / Devara",
    content: [
      "Western film scoring traditionally emphasizes narrative subtlety and underscore balance. Contemporary South Indian mass cinema, however, operates on acoustic physical confrontation.",
      "Composers like Devi Sri Prasad and Anirudh Ravichander write for 1,200-seat auditoriums with concrete reverberation. The musical structure utilizes staccato electronic percussion, distorted nadaswarams, and heavy brass ostinatos designed to cut through crowd whistling and paper confetti cannons.",
      "In our SoundLab analysis, the interval block of Salaar demonstrates a deliberate acoustic dynamic silence 3.2 seconds prior to the protagonist's sword draw, creating acoustic vacuum tension that amplifies the ensuing bass drop by over 40%.",
    ],
  },
  {
    id: "pan-india-mythology",
    category: "Strategy & Windows",
    title: "The Rise of Indian Dystopian Mythology",
    subtitle: "From Kalki 2898 AD to Kantara: Why Ancient Lore is Conquering Global Box Offices",
    readTime: "6 min read",
    author: "Industry Intelligence",
    date: "August 2026",
    summary: "How Indian filmmakers are blending ancient puranic literature with futuristic sci-fi architecture to create universal global franchises.",
    keyTakeaway: "Mythological anchors provide instant multi-generational emotional resonance, lowering marketing education barriers in North and Overseas markets.",
    relatedFilm: "Kalki 2898 AD",
    content: [
      "The pan-India phenomenon was initially characterized by raw period action (Baahubali, KGF, Pushpa). The next frontier is the hybrid marriage of Indian mythology with high-concept sci-fi worldbuilding.",
      "By anchoring futuristic weapons and dystopian city-states in sacred epic lore, filmmakers bypass the emotional detachment common in generic Hollywood space epics. Audiences do not need exposition for celestial weapons or legendary warriors—the lore is pre-installed in collective cultural memory.",
    ],
  },
  {
    id: "single-screen-survival",
    category: "Fandom Sociology",
    title: "Why Single Screens Will Never Die",
    subtitle: "The Communal Architecture of FDFS Festivals and Why Streaming Can Never Replicate It",
    readTime: "8 min read",
    author: "Cultural Research Desk",
    date: "July 2026",
    summary: "Documenting the social sociology of 4 AM benefit shows, 80-foot superstar cutouts, and why theatrical ritual is irreplaceable.",
    keyTakeaway: "Cinema is not merely content consumption; it is an organized communal celebration that functions as modern urban folk festival.",
    relatedFilm: "Banisa Arena Archive",
    content: [
      "For decades, multiplex executives and digital streaming evangelists have predicted the death of India's single-screen cinema halls. Yet, on release morning, thousands of fans still gather at 3 AM outside Sudarshan 70mm and Sandhya 70mm in Hyderabad.",
      "The physical architecture of the single screen—a massive unified balcony, sweeping proscenium, and communal acoustic space—facilitates an ecstatic religious fervor that home theater setups or mobile screens simply cannot generate.",
    ],
  },
];

export function CinemaJournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [readProgress, setReadProgress] = useState(0);

  const filteredArticles = ARTICLES.filter(
    (a) => selectedCategory === "All" || a.category === selectedCategory
  );

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setReadProgress(Math.min(100, Math.round((window.scrollY / total) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-ember z-[60] transition-all duration-150"
        style={{ width: `${readProgress}%` }}
      />

      <CineVerseNav />

      {/* Hero Header */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <BookOpen className="w-4 h-4" />
            <span>06 · CINEMA JOURNAL — THE EDITORIAL ROOM</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
            Research Essays <span className="text-ember italic">& Film Analysis</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
            In-depth commercial post-mortems, craft breakdowns, windowing economics, and cultural
            essays analyzing the seismic shifts reshaping Indian and global cinema.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-2">
            {[
              "All",
              "Strategy & Windows",
              "Craft Breakdown",
              "Box Office Post-Mortem",
              "Fandom Sociology",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-ember text-ink shadow-[0_0_15px_rgba(224,103,30,0.3)]"
                    : "border border-border/40 bg-black/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Stream */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Featured Editorial Cover Article */}
        <div
          onClick={() => setActiveArticle(ARTICLES[0])}
          className="group cursor-pointer rounded-3xl border border-ember/50 bg-gradient-to-r from-card via-black/80 to-card p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all hover:border-ember"
        >
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-ember font-bold uppercase tracking-wider">{ARTICLES[0].category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{ARTICLES[0].readTime}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-foreground group-hover:text-ember transition-colors">
              {ARTICLES[0].title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {ARTICLES[0].subtitle}
            </p>
            <div className="pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">{ARTICLES[0].date} · {ARTICLES[0].author}</span>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-ember group-hover:translate-x-1 transition-transform">
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer rounded-2xl border border-border/50 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-ember/60 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-ember font-semibold">{article.category}</span>
                  <span className="text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground group-hover:text-ember transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
                <div className="mt-4 p-3 rounded-xl border border-border/30 bg-black/40 text-[11px] text-muted-foreground">
                  <strong className="text-foreground">Key Takeaway:</strong> {article.keyTakeaway}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                <span className="text-[10px] font-mono">Ref: {article.relatedFilm}</span>
                <span className="inline-flex items-center gap-1 text-ember font-bold group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6"
          onClick={() => setActiveArticle(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-ember/40 bg-card p-6 sm:p-10 shadow-2xl relative"
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 rounded-full border border-border/60 bg-black/60 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-ember uppercase tracking-wider font-bold">
              {activeArticle.category} · {activeArticle.readTime}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-2">
              {activeArticle.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 italic font-light">
              {activeArticle.subtitle}
            </p>
            <div className="text-xs text-muted-foreground font-mono mt-3 pb-6 border-b border-border/40">
              Published by {activeArticle.author} · {activeArticle.date}
            </div>

            {/* Key Takeaway Highlight Box */}
            <div className="my-6 p-4 rounded-2xl border border-ember/40 bg-ember/10">
              <span className="text-[10px] uppercase tracking-widest text-ember font-bold block mb-1">
                EXECUTIVE SUMMARY & KEY FINDING
              </span>
              <p className="text-xs text-foreground font-medium leading-relaxed">
                {activeArticle.keyTakeaway}
              </p>
            </div>

            {/* Article Editorial Body */}
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Related Tools Links */}
            <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Related Case Study: <strong className="text-foreground">{activeArticle.relatedFilm}</strong></span>
              <div className="flex gap-2">
                <Link
                  to="/strategy"
                  className="rounded-full bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink"
                >
                  Test in Strategy Lab
                </Link>
                <Link
                  to="/craft"
                  className="rounded-full border border-border/60 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground"
                >
                  Open in Craft Lab
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
