import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Film, BookOpen, Activity, TrendingUp, ChevronRight } from "lucide-react";
import { wikiEntries, fictionaryEntries } from "@/data/cinepedia";
import { CinepediaCard } from "@/components/tfi/CinepediaCard";
import { FictionaryCard } from "@/components/tfi/FictionaryCard";
import { SocialPipeline } from "@/components/tfi/SocialPipeline";
import { useTrendingMovies, useNowPlaying } from "@/hooks/useTmdb";
import { posterUrl } from "@/lib/tmdb";

export const Route = createFileRoute("/cinepedia")({
  component: CinepediaPage,
});

type TabType = "wiki" | "fictionary" | "live" | "boxoffice";

function CinepediaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("wiki");
  
  // Wiki State
  const [wikiSearch, setWikiSearch] = useState("");
  const filteredWiki = wikiEntries.filter(
    (e) =>
      e.title.toLowerCase().includes(wikiSearch.toLowerCase()) ||
      e.director.toLowerCase().includes(wikiSearch.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(wikiSearch.toLowerCase()))
  );

  // Fictionary State
  const [fictionaryCategory, setFictionaryCategory] = useState<string>("All");
  const fictionaryCategories = ["All", "mass-slang", "fandom", "trade", "cinema", "emotion"];
  const filteredFictionary = fictionaryEntries.filter(
    (e) => fictionaryCategory === "All" || e.category === fictionaryCategory
  );

  // TMDB Data
  const trendingQuery = useTrendingMovies();
  const nowPlayingQuery = useNowPlaying();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-24 pb-20 px-4 sm:px-6 md:px-12 lg:px-24 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-purple-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-[var(--ember)]/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 film-grain opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center sm:text-left flex flex-col gap-2"
        >
          <span className="text-[var(--gold-foil)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            TFI Knowledge Universe
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--foreground)] tracking-tight">
            Cine<span className="text-[var(--gold-foil)] text-glow-gold">pedia</span>
          </h1>
          <p className="text-[var(--muted-foreground)] text-sm md:text-base max-w-2xl mt-2">
            The living encyclopedia of Telugu Film Industry. From legendary lore to real-time mass trends, decoding the DNA of Indian cinema's most passionate ecosystem.
          </p>
        </motion.div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-1 mt-4">
          {[
            { id: "wiki", label: "📚 Wiki" },
            { id: "fictionary", label: "📖 Fictionary" },
            { id: "live", label: "📡 Live Feed" },
            { id: "boxoffice", label: "💰 Box Office" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2.5 text-sm md:text-base font-medium rounded-t-lg transition-all relative ${
                activeTab === tab.id
                  ? "text-[var(--gold-foil)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gold-foil)] glow-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {/* WIKI TAB */}
            {activeTab === "wiki" && (
              <motion.div
                key="wiki"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search lore, heroes, tags..."
                    value={wikiSearch}
                    onChange={(e) => setWikiSearch(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--gold-foil)] focus:ring-1 focus:ring-[var(--gold-foil)] transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredWiki.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CinepediaCard entry={entry} />
                    </motion.div>
                  ))}
                  
                  {filteredWiki.length === 0 && (
                    <div className="col-span-full py-12 text-center text-white/40">
                      No legends found matching your search.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* FICTIONARY TAB */}
            {activeTab === "fictionary" && (
              <motion.div
                key="fictionary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-wrap gap-2">
                  {fictionaryCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFictionaryCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        fictionaryCategory === cat
                          ? "bg-[var(--gold-foil)]/10 border-[var(--gold-foil)] text-[var(--gold-foil)]"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat === "All" ? "All Terms" : cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredFictionary.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FictionaryCard entry={entry} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* LIVE FEED TAB */}
            {activeTab === "live" && (
              <motion.div
                key="live"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="glass-panel p-4 rounded-xl border border-white/10 mb-2 flex items-center justify-between">
                  <p className="text-sm text-white/70">
                    Real-time TFI social content is being ingested, classified, and routed automatically.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-green-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    PIPELINE LIVE
                  </div>
                </div>
                
                <SocialPipeline />
              </motion.div>
            )}

            {/* BOX OFFICE TAB */}
            {activeTab === "boxoffice" && (
              <motion.div
                key="boxoffice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl sm:text-3xl text-white">Live Trend Index</h2>
                  <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Activity className="w-3.5 h-3.5 text-[var(--gold-foil)]" />
                    Powered by TMDB · Live Data
                  </div>
                </div>

                <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-white/50">
                          <th className="px-6 py-4 font-medium">Rank</th>
                          <th className="px-6 py-4 font-medium">Poster</th>
                          <th className="px-6 py-4 font-medium">Title</th>
                          <th className="px-6 py-4 font-medium">Rating</th>
                          <th className="px-6 py-4 font-medium">Popularity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {trendingQuery.isLoading ? (
                          Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="animate-pulse">
                              <td className="px-6 py-4"><div className="h-4 w-4 bg-white/10 rounded" /></td>
                              <td className="px-6 py-4"><div className="h-16 w-12 bg-white/10 rounded" /></td>
                              <td className="px-6 py-4"><div className="h-4 w-32 bg-white/10 rounded" /></td>
                              <td className="px-6 py-4"><div className="h-4 w-8 bg-white/10 rounded" /></td>
                              <td className="px-6 py-4"><div className="h-4 w-16 bg-white/10 rounded" /></td>
                            </tr>
                          ))
                        ) : trendingQuery.data ? (
                          trendingQuery.data.slice(0, 10).map((movie, index) => (
                            <tr 
                              key={movie.id} 
                              className={`group hover:bg-white/5 transition-colors ${
                                index === 0 ? "bg-[var(--gold-foil)]/5" : ""
                              }`}
                            >
                              <td className="px-6 py-4">
                                <span className={`font-display text-2xl ${
                                  index === 0 ? "text-[var(--gold-foil)]" : "text-white/40 group-hover:text-white/80"
                                }`}>
                                  #{index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className={`w-12 h-16 rounded overflow-hidden ${index === 0 ? "glow-gold border border-[var(--gold-foil)]/50" : "border border-white/10"}`}>
                                  {movie.posterUrl ? (
                                    <img 
                                      src={posterUrl(movie.posterUrl, "w92") ?? undefined} 
                                      alt={movie.title}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                      <Film className="w-4 h-4 text-white/20" />
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 font-medium text-white/90">
                                <div className="flex flex-col gap-1">
                                  <span className={index === 0 ? "text-[var(--gold-foil)]" : ""}>
                                    {movie.title}
                                  </span>
                                  <span className="text-xs text-white/40">{movie.year}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-[var(--ember)] font-medium">
                                  ⭐ {movie.rating}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-white/70">
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                  {parseFloat(movie.popularity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-white/40">
                              Failed to load trend data.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
