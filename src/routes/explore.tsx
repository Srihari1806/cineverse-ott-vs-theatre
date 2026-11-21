import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  Search,
  Filter,
  Compass,
  Film,
  Users,
  Building2,
  Tv,
  Star,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Clapperboard,
  X,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — The Film Universe | CineVerse" },
      {
        name: "description",
        content:
          "Search and explore films, directors, actors, composers, cinematographers and production houses with commercial & creative lineage.",
      },
    ],
  }),
  component: ExplorePage,
});

export interface FilmEntry {
  id: string;
  title: string;
  year: number;
  language: string;
  genre: string;
  director: string;
  cast: string[];
  composer: string;
  cinematographer: string;
  studio: string;
  theatricalGross: string;
  ottPlatform: string;
  ottWindowWeeks: number;
  fandomScore: number;
  status: "THEATRICAL RECORD" | "OTT HIT" | "HYBRID PHENOMENON";
  synopsis: string;
  craftHighlights: string[];
  campaignStrategy: string;
}

const FEATURED_FILMS: FilmEntry[] = [
  {
    id: "pushpa-2",
    title: "Pushpa 2: The Rule",
    year: 2024,
    language: "Telugu (Pan-India)",
    genre: "Action / Mass Drama",
    director: "Sukumar",
    cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
    composer: "Devi Sri Prasad",
    cinematographer: "Miroslaw Brozek",
    studio: "Mythri Movie Makers",
    theatricalGross: "₹1,840 Cr Worldwide",
    ottPlatform: "Netflix",
    ottWindowWeeks: 8,
    fandomScore: 98,
    status: "THEATRICAL RECORD",
    synopsis: "The escalation of Pushpa Raj's syndicate across state borders, clashing with Bhanwar Singh Shekhawat in a battle of supremacy.",
    craftHighlights: ["Anamorphic lens flares in Red Sanders forest", "High-cadence interval editing pattern", "Srivalli leitmotif variations"],
    campaignStrategy: "Multi-city trailer rally blitz (Patna, Hyderabad, Mumbai, Chennai) before the December worldwide drop.",
  },
  {
    id: "rrr",
    title: "RRR",
    year: 2022,
    language: "Telugu (Global)",
    genre: "Period Action Epic",
    director: "S.S. Rajamouli",
    cast: ["NTR Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"],
    composer: "M.M. Keeravani",
    cinematographer: "K.K. Senthil Kumar",
    studio: "DVV Entertainment",
    theatricalGross: "₹1,387 Cr Worldwide",
    ottPlatform: "Netflix / ZEE5",
    ottWindowWeeks: 10,
    fandomScore: 99,
    status: "HYBRID PHENOMENON",
    synopsis: "A fictionalized tale of two legendary revolutionaries and their brotherhood against British colonial oppression in 1920s India.",
    craftHighlights: ["Academy Award winning Naatu Naatu choreography", "Interval tiger-truck collision sequence", "Dual protagonist cross-lighting"],
    campaignStrategy: "Pan-world Oscar campaign bridging Indian mass fervor with Western arthouse acclaim.",
  },
  {
    id: "kalki-2898-ad",
    title: "Kalki 2898 AD",
    year: 2024,
    language: "Telugu (Pan-India)",
    genre: "Mythological Sci-Fi",
    director: "Nag Ashwin",
    cast: ["Prabhas", "Amitabh Bachchan", "Kamal Haasan", "Deepika Padukone"],
    composer: "Santhosh Narayanan",
    cinematographer: "Djordje Stojiljkovic",
    studio: "Vyjayanthi Movies",
    theatricalGross: "₹1,100 Cr Worldwide",
    ottPlatform: "Prime Video / Netflix",
    ottWindowWeeks: 7,
    fandomScore: 94,
    status: "THEATRICAL RECORD",
    synopsis: "In a dystopian post-apocalyptic Kasi of 2898 AD, an ancient warrior awakens to protect the unborn avatar of Kalki.",
    craftHighlights: ["Complex cyber-Kasi worldbuilding & Bujji vehicle engineering", "Ashwatthama de-aging and scale contrast", "Indian folk-electronic hybrid score"],
    campaignStrategy: "Physical Bujji car tour across 20+ Indian universities and San Diego Comic-Con global debut.",
  },
  {
    id: "salaar",
    title: "Salaar: Part 1 – Ceasefire",
    year: 2023,
    language: "Telugu (Pan-India)",
    genre: "Dystopian Action",
    director: "Prashanth Neel",
    cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan"],
    composer: "Ravi Basrur",
    cinematographer: "Bhuvan Gowda",
    studio: "Hombale Films",
    theatricalGross: "₹715 Cr Worldwide",
    ottPlatform: "Netflix",
    ottWindowWeeks: 6,
    fandomScore: 95,
    status: "HYBRID PHENOMENON",
    synopsis: "Two sworn childhood friends become deadly rivals in the brutal city-state of Khansaar during a royal power struggle.",
    craftHighlights: ["High-contrast monochrome black grade", "Bass-heavy hydraulic sound mixing", "Slow-motion silhouette elevation frames"],
    campaignStrategy: "A-rated mass action positioning targeting single-screen midnight shows and FDFS rallies.",
  },
  {
    id: "devara",
    title: "Devara: Part 1",
    year: 2024,
    language: "Telugu (Pan-India)",
    genre: "Coastal Action Drama",
    director: "Koratala Siva",
    cast: ["NTR Jr.", "Janhvi Kapoor", "Saif Ali Khan"],
    composer: "Anirudh Ravichander",
    cinematographer: "R. Rathnavelu",
    studio: "Yuvasudha Arts / NTR Arts",
    theatricalGross: "₹510 Cr Worldwide",
    ottPlatform: "Netflix",
    ottWindowWeeks: 7,
    fandomScore: 92,
    status: "THEATRICAL RECORD",
    synopsis: "A fearless coastal chieftain sacrifices his legacy to instill fear of wrongdoing among his ruthless smuggling brethren.",
    craftHighlights: ["Night sea storm aquatic camera rigs", "Anirudh's high-tempo electronic percussion", "Shark sequence choreography"],
    campaignStrategy: "Fear Song musical drop leading into North American premiere pre-sales surge.",
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    language: "English (Global)",
    genre: "Historical Biopic / Thriller",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Robert Downey Jr.", "Emily Blunt"],
    composer: "Ludwig Göransson",
    cinematographer: "Hoyte van Hoytema",
    studio: "Syncopy / Universal Pictures",
    theatricalGross: "$975M Worldwide",
    ottPlatform: "Peacock / JioCinema",
    ottWindowWeeks: 16,
    fandomScore: 96,
    status: "THEATRICAL RECORD",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the Manhattan Project's creation of the atomic bomb.",
    craftHighlights: ["IMAX 70mm black-and-white analog chemical stock", "Can You Hear The Music violin build-up", "Soundless shockwave delay in Trinity test"],
    campaignStrategy: "Pure theatrical IMAX exclusivity window with zero digital talk for 120 days.",
  },
];

const DIRECTORS_VANGUARD = [
  { name: "S.S. Rajamouli", films: 12, avgGross: "₹1,150 Cr", specialty: "Pan-World Emotional Scale", iconic: "RRR, Baahubali 1 & 2" },
  { name: "Sukumar", films: 9, avgGross: "₹650 Cr", specialty: "Character Idiosyncrasies & Mass Flow", iconic: "Pushpa 1 & 2, Rangasthalam" },
  { name: "Prashanth Neel", films: 4, avgGross: "₹820 Cr", specialty: "Dystopian Worldbuilding & High Contrast", iconic: "KGF 1 & 2, Salaar" },
  { name: "Christopher Nolan", films: 12, avgGross: "$680M", specialty: "Non-Linear Time & IMAX Practicality", iconic: "Oppenheimer, Interstellar, Inception" },
  { name: "Nag Ashwin", films: 3, avgGross: "₹480 Cr", specialty: "Mythology Meets Dystopian Sci-Fi", iconic: "Kalki 2898 AD, Mahanati" },
];

export function ExplorePage() {
  const [activeTab, setActiveTab] = useState<"films" | "people" | "studios">("films");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilm, setSelectedFilm] = useState<FilmEntry | null>(null);

  const filteredFilms = FEATURED_FILMS.filter((film) => {
    const matchesLang = selectedLanguage === "All" || film.language.includes(selectedLanguage);
    const matchesSearch =
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <CineVerseNav />

      {/* Hero Header */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <Compass className="w-4 h-4" />
            <span>01 · EXPLORE THE FILM UNIVERSE</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
            The Living Cinema <span className="text-ember italic">Encyclopedia</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
            Cross-reference blockbuster epics, visionary directors, craft lineages, and production houses.
            Every film connects directly to its Craft breakdown, Campaign War Room, and Intelligence data.
          </p>

          {/* Search & Tabs Controls */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center rounded-xl border border-border/60 bg-black/60 px-4 py-2.5 w-full md:max-w-md focus-within:border-ember">
              <Search className="w-4 h-4 text-muted-foreground mr-3" />
              <input
                type="text"
                placeholder="Search films, stars, directors, composers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("films")}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all ${
                  activeTab === "films"
                    ? "bg-ember text-ink shadow-[0_0_20px_rgba(224,103,30,0.35)]"
                    : "border border-border/60 bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Films ({filteredFilms.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("people")}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all ${
                  activeTab === "people"
                    ? "bg-ember text-ink shadow-[0_0_20px_rgba(224,103,30,0.35)]"
                    : "border border-border/60 bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Vanguard Directors</span>
              </button>
              <button
                onClick={() => setActiveTab("studios")}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all ${
                  activeTab === "studios"
                    ? "bg-ember text-ink shadow-[0_0_20px_rgba(224,103,30,0.35)]"
                    : "border border-border/60 bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Production Houses</span>
              </button>
            </div>
          </div>

          {/* Language / Region Pills */}
          {activeTab === "films" && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1">Region:</span>
              {["All", "Telugu", "Hindi", "Tamil", "English"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                    selectedLanguage === lang
                      ? "bg-white/20 text-foreground border border-ember/60 font-semibold"
                      : "bg-white/5 text-muted-foreground border border-border/30 hover:text-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "films" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFilms.map((film) => (
              <div
                key={film.id}
                onClick={() => setSelectedFilm(film)}
                className="group cursor-pointer rounded-2xl border border-border/50 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-ember/60 hover:shadow-2xl hover:shadow-black flex flex-col justify-between"
              >
                <div>
                  {/* Status & Window Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-ember/15 border border-ember/40 px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold text-ember">
                      {film.status}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {film.year} · {film.language}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-3xl tracking-wide text-foreground group-hover:text-ember transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Directed by <span className="text-foreground font-semibold">{film.director}</span>
                  </p>

                  {/* Box Office & OTT Window Metric Row */}
                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-border/40 bg-black/40 p-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Theatrical Gross</span>
                      <p className="font-display text-lg text-gold-gradient leading-tight mt-0.5">{film.theatricalGross}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">OTT Window</span>
                      <p className="text-xs font-semibold text-foreground mt-1 flex items-center gap-1.5">
                        <Tv className="w-3.5 h-3.5 text-ember" />
                        <span>{film.ottPlatform} ({film.ottWindowWeeks} wks)</span>
                      </p>
                    </div>
                  </div>

                  {/* Lead Cast Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {film.cast.map((c) => (
                      <span key={c} className="rounded bg-white/5 border border-border/30 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inspect Link */}
                <div className="mt-6 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono text-[10px]">Fandom: {film.fandomScore}%</span>
                  <span className="inline-flex items-center gap-1 text-ember font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Inspect Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Directors Vanguard Tab */}
        {activeTab === "people" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIRECTORS_VANGUARD.map((dir) => (
              <div key={dir.name} className="rounded-2xl border border-border/50 bg-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-3xl text-foreground">{dir.name}</h3>
                    <p className="text-xs text-ember font-semibold tracking-wide mt-0.5">{dir.specialty}</p>
                  </div>
                  <span className="rounded-full bg-white/5 border border-border/40 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                    {dir.films} Films
                  </span>
                </div>
                <div className="mt-5 space-y-2 border-t border-border/30 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Global Gross:</span>
                    <span className="font-bold text-foreground">{dir.avgGross}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Benchmark Slate:</span>
                    <span className="font-semibold text-muted-foreground text-right">{dir.iconic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Studios Tab */}
        {activeTab === "studios" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Mythri Movie Makers", hq: "Hyderabad", focus: "Mega Pan-India Franchises", slates: "Pushpa 2, Waltair Veerayya", window: "8 Weeks" },
              { name: "Hombale Films", hq: "Bengaluru", focus: "Grounded Dystopian Myth", slates: "KGF 2, Salaar, Kantara", window: "6-8 Weeks" },
              { name: "Vyjayanthi Movies", hq: "Hyderabad", focus: "Golden Age Scale & Sci-Fi", slates: "Kalki 2898 AD, Mahanati", window: "7 Weeks" },
              { name: "Universal Pictures", hq: "Los Angeles", focus: "Auteur Tentpoles & IMAX", slates: "Oppenheimer, Jurassic World", window: "16 Weeks" },
              { name: "DVV Entertainment", hq: "Hyderabad", focus: "High-Octane Spectacles", slates: "RRR, OG", window: "10 Weeks" },
            ].map((s) => (
              <div key={s.name} className="rounded-2xl border border-border/50 bg-card p-6">
                <h3 className="font-display text-2xl text-foreground">{s.name}</h3>
                <p className="text-xs text-muted-foreground">HQ: {s.hq} · Focus: {s.focus}</p>
                <div className="mt-4 pt-3 border-t border-border/30 space-y-1.5 text-xs">
                  <p><span className="text-muted-foreground">Benchmark Titles:</span> {s.slates}</p>
                  <p><span className="text-muted-foreground">Average OTT Window:</span> <span className="font-bold text-ember">{s.window}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Film Detail Drawer / Modal */}
      {selectedFilm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedFilm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-ember/40 bg-card p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute top-6 right-6 rounded-full border border-border/60 bg-black/60 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-ember font-bold">
              {selectedFilm.language} · {selectedFilm.year}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-1">
              {selectedFilm.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              {selectedFilm.synopsis}
            </p>

            {/* Core Stats Bar */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-border/40 bg-black/40 p-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Theatrical</span>
                <p className="font-display text-xl text-gold-gradient">{selectedFilm.theatricalGross}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Streaming</span>
                <p className="text-xs font-semibold text-foreground mt-1">{selectedFilm.ottPlatform} ({selectedFilm.ottWindowWeeks} wks)</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Studio</span>
                <p className="text-xs font-semibold text-foreground mt-1">{selectedFilm.studio}</p>
              </div>
            </div>

            {/* Craft Highlights */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-widest text-ember font-bold mb-2">
                Filmmaking Craft Signatures
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {selectedFilm.craftHighlights.map((craft, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    <span>{craft}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campaign GTM Strategy */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-widest text-ember font-bold mb-1">
                Release Strategy & Marketing GTM
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedFilm.campaignStrategy}
              </p>
            </div>

            {/* Direct Tool Launch Actions */}
            <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap items-center gap-3">
              <Link
                to="/campaign"
                className="rounded-full bg-ember px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:bg-ember/90 transition-all"
              >
                Launch Campaign War Room
              </Link>
              <Link
                to="/craft"
                className="rounded-full border border-border/60 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-white/10 transition-all"
              >
                Inspect in Craft Lab
              </Link>
              <Link
                to="/intelligence"
                className="rounded-full border border-border/60 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-white/10 transition-all"
              >
                View Box Office Intelligence
              </Link>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
