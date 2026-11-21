import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Tv,
  ExternalLink,
  Film,
  Sparkles,
  ShieldCheck,
  Star,
  Flame,
  Volume2,
  SlidersHorizontal,
  Bookmark,
  Check
} from "lucide-react";
import { curatedStreamCatalog, StreamItem, StreamingOption } from "@/data/streamhub";

interface StreamSearchDirectoryProps {
  activePlatforms: string[];
  onlyMySubscriptions: boolean;
  onAddToWatchlist?: (item: StreamItem) => void;
  watchlistIds?: string[];
}

export const StreamSearchDirectory: React.FC<StreamSearchDirectoryProps> = ({
  activePlatforms,
  onlyMySubscriptions,
  onAddToWatchlist,
  watchlistIds = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedAccessType, setSelectedAccessType] = useState<string>("all");
  const [selectedSpec, setSelectedSpec] = useState<string>("all");
  const [selectedMood, setSelectedMood] = useState<string>("all");

  const languages = ["All", "Telugu", "Tamil", "Malayalam", "Hindi", "English"];
  const accessTypes = [
    { id: "all", label: "All Access" },
    { id: "flatrate", label: "🟢 Subscription" },
    { id: "rent", label: "🟡 Rent (VOD)" },
    { id: "free", label: "🔵 Free with Ads" },
    { id: "theatre", label: "🎬 In Theatres" },
  ];
  const specsList = ["all", "4K", "HDR10+", "Dolby Atmos", "5.1", "IMAX"];
  const moodList = ["all", "Mass Rampage", "Mind-Bending", "High-Octane", "Family Sentiment", "Romantic Classic"];

  const filteredCatalog = useMemo(() => {
    return curatedStreamCatalog.filter((item: StreamItem) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchGenre = item.genres.some((g) => g.toLowerCase().includes(q));
        const matchSynopsis = item.synopsis.toLowerCase().includes(q);
        if (!matchTitle && !matchGenre && !matchSynopsis) return false;
      }

      // 2. Language Filter
      if (selectedLanguage !== "All" && item.language !== selectedLanguage) {
        return false;
      }

      // 3. Mood Filter
      if (selectedMood !== "all" && !item.moods.includes(selectedMood as any)) {
        return false;
      }

      // 4. Spec Filter
      if (selectedSpec !== "all" && !item.specs.includes(selectedSpec as any)) {
        return false;
      }

      // 5. Access Type Filter
      if (selectedAccessType !== "all") {
        const hasAccess = item.streamingOptions.some((opt) => opt.accessType === selectedAccessType);
        if (!hasAccess && selectedAccessType !== "theatre") return false;
        if (selectedAccessType === "theatre" && item.status !== "in-theatres") return false;
      }

      // 6. Active Subscriptions Filter (JustWatch style WatchBar integration)
      if (onlyMySubscriptions && activePlatforms.length > 0) {
        const isAvailableOnActiveSub = item.streamingOptions.some((opt) =>
          activePlatforms.includes(opt.providerId)
        );
        if (!isAvailableOnActiveSub) return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedLanguage,
    selectedAccessType,
    selectedSpec,
    selectedMood,
    onlyMySubscriptions,
    activePlatforms,
  ]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Control Panel */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4 shadow-xl">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gold-foil)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie title, actor, genre (e.g. Pushpa, Devara, Mass, Sci-Fi)..."
            className="w-full bg-black/60 text-white placeholder:text-muted-foreground pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-[var(--gold-foil)] focus:outline-none transition-all text-sm font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          {/* Language Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto">
            <span className="text-[10px] text-muted-foreground uppercase px-2 font-bold tracking-wider">Lang:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
                  selectedLanguage === lang
                    ? "bg-[var(--gold-foil)] text-[var(--ink)] font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Access Type Pills */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto">
            <span className="text-[10px] text-muted-foreground uppercase px-2 font-bold tracking-wider">Type:</span>
            {accessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedAccessType(type.id)}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
                  selectedAccessType === type.id
                    ? "bg-[var(--ember)] text-[var(--ink)] font-semibold"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Specs Dropdown/Pills */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            <span className="text-[10px] text-muted-foreground uppercase px-2 font-bold tracking-wider">Spec:</span>
            {specsList.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpec(spec)}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  selectedSpec === spec
                    ? "bg-white/20 text-white font-semibold"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {spec === "all" ? "All Specs" : spec}
              </button>
            ))}
          </div>

          {/* Mood Filter */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            <span className="text-[10px] text-muted-foreground uppercase px-2 font-bold tracking-wider">Mood:</span>
            {moodList.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  selectedMood === mood
                    ? "bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {mood === "all" ? "All Moods" : mood}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Results Grid */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong className="text-[var(--gold-foil)]">{filteredCatalog.length}</strong> title(s)
          {onlyMySubscriptions ? " (Filtered by your active subscriptions)" : ""}
        </span>
        {searchQuery && (
          <span className="text-amber-400">Filtered by query: "{searchQuery}"</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredCatalog.map((item: StreamItem) => {
            const isSaved = watchlistIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[var(--gold-foil)]/40 transition-all shadow-xl"
              >
                {/* Poster & Header Info */}
                <div className="relative p-4 flex gap-4">
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-1 left-1 text-[9px] bg-black/80 backdrop-blur text-white px-1.5 py-0.5 rounded font-mono">
                      {item.releaseYear}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-[var(--gold-foil)] transition-colors truncate">
                          {item.title}
                        </h3>
                        {onAddToWatchlist && (
                          <button
                            onClick={() => onAddToWatchlist(item)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              isSaved
                                ? "bg-[var(--gold-foil)] text-[var(--ink)] border-[var(--gold-foil)]"
                                : "bg-white/5 text-muted-foreground border-white/10 hover:text-white"
                            }`}
                            title={isSaved ? "In Watchlist" : "Add to Watchlist"}
                          >
                            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>

                      <p className="text-[11px] text-[var(--ember)] font-medium mt-0.5">
                        {item.sentimentLabel}
                      </p>

                      {/* Ratings Breakdown */}
                      <div className="flex items-center gap-2 mt-2 text-[10px] bg-black/40 p-1.5 rounded-lg border border-white/5">
                        <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-current" /> TMDB {item.tmdbRating}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-sky-300 font-medium">IMDb {item.imdbRating}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-emerald-400 font-medium">{item.audienceSentiment}% Audience</span>
                      </div>
                    </div>

                    {/* Technical Spec Badges */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.specs.map((spec) => (
                        <span
                          key={spec}
                          className="text-[9px] font-mono bg-white/10 text-white/90 px-1.5 py-0.5 rounded border border-white/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="px-4 pb-3">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.synopsis}
                  </p>
                </div>

                {/* Streaming Providers & Direct Deep Link (JustWatch Feature) */}
                <div className="p-3 bg-black/60 border-t border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      Where to Stream
                    </span>
                    <span className="text-[10px] text-[var(--gold-foil)] font-medium">
                      {item.runtimeMinutes} min · {item.language}
                    </span>
                  </div>

                  {item.streamingOptions.length > 0 ? (
                    <div className="space-y-1.5">
                      {item.streamingOptions.map((opt: StreamingOption, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/5 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={opt.logo}
                              alt={opt.providerName}
                              className="w-5 h-5 rounded object-contain"
                            />
                            <span className="text-xs text-white font-medium truncate max-w-[130px]">
                              {opt.providerName}
                            </span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              {opt.accessType === "flatrate" ? "Subscribed" : opt.accessType}
                            </span>
                          </div>

                          <a
                            href={opt.deepLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-[var(--gold-foil)] text-[var(--ink)] text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm hover:brightness-110 transition-all"
                          >
                            <span>Watch</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-amber-400/90 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 text-center">
                      🎬 Currently in Theatres Only (FDFS Window)
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCatalog.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center text-muted-foreground border border-white/10">
          <Film className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-40" />
          <h3 className="text-lg font-display text-white font-semibold mb-1">No movies match your filters</h3>
          <p className="text-xs max-w-sm mx-auto">
            Try unchecking "Active Subs Only" or clearing your search term to view the full directory.
          </p>
        </div>
      )}
    </div>
  );
};
