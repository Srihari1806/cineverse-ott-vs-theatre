import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv,
  Search,
  Sparkles,
  Calendar,
  Bookmark,
  ShieldCheck,
  Flame,
  Globe,
  Bell,
  Star
} from "lucide-react";
import { WatchBar } from "@/components/streamhub/WatchBar";
import { ArrivalAlertsBanner } from "@/components/streamhub/ArrivalAlertsBanner";
import { StreamSearchDirectory } from "@/components/streamhub/StreamSearchDirectory";
import { WhatToWatchQuiz } from "@/components/streamhub/WhatToWatchQuiz";
import { ReleaseCalendarMatrix } from "@/components/streamhub/ReleaseCalendarMatrix";
import { UnifiedWatchlist } from "@/components/streamhub/UnifiedWatchlist";
import { curatedStreamCatalog, StreamItem } from "@/data/streamhub";

export const Route = createFileRoute("/streamhub")({
  component: StreamHubPage,
});

function StreamHubPage() {
  const [activePlatforms, setActivePlatforms] = useState<string[]>([
    "aha",
    "netflix",
    "prime",
    "hotstar",
  ]);
  const [onlyMySubscriptions, setOnlyMySubscriptions] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"directory" | "quiz" | "matrix">("directory");
  const [watchlist, setWatchlist] = useState<StreamItem[]>([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Load saved watchlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cineverse_watchlist");
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleTogglePlatform = (id: string) => {
    setActivePlatforms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddToWatchlist = (item: StreamItem) => {
    setWatchlist((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      const next = exists ? prev.filter((x) => x.id !== item.id) : [...prev, item];
      try {
        localStorage.setItem("cineverse_watchlist", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleRemoveFromWatchlist = (id: string) => {
    setWatchlist((prev) => {
      const next = prev.filter((x) => x.id !== id);
      try {
        localStorage.setItem("cineverse_watchlist", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const watchlistIds = watchlist.map((x) => x.id);

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24 text-[var(--foreground)] selection:bg-[var(--ember)] selection:text-white font-sans">
      {/* Mass Entry Flash Effect */}
      <div className="fixed inset-0 bg-white z-[100] animate-[mass-entry_0.6s_ease-out_forwards] pointer-events-none mix-blend-overlay" />

      {/* Top Banner & Header */}
      <div className="container mx-auto px-4 pt-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-foil)] font-bold border border-[var(--gold-foil)]/40 px-3 py-0.5 rounded-full bg-[var(--gold-foil)]/10">
                STREAMING AGGREGATOR & DISCOVERY
              </span>
              <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                JustWatch × OTTplay Powered
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
              Stream<span className="italic text-[var(--gold-foil)] text-glow-gold">Hub</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Universal streaming directory for Telugu, regional & global cinema. Track active subscriptions, price drops, dual release dates & direct watch links.
            </p>
          </div>

          <button
            onClick={() => setIsWatchlistOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600/30 to-[var(--gold-foil)]/30 border border-[var(--gold-foil)]/50 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg self-start md:self-auto"
          >
            <Bookmark className="w-4 h-4 text-[var(--gold-foil)]" />
            <span>My Watchlist ({watchlist.length})</span>
          </button>
        </div>

        {/* Arrival Alerts Feed */}
        <ArrivalAlertsBanner />

        {/* Interactive WatchBar (Active Subscriptions Filter) */}
        <WatchBar
          activePlatforms={activePlatforms}
          onTogglePlatform={handleTogglePlatform}
          onlyMySubscriptions={onlyMySubscriptions}
          onToggleMySubscriptions={setOnlyMySubscriptions}
        />

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "directory"
                ? "bg-[var(--gold-foil)] text-[var(--ink)] shadow-[0_0_12px_var(--gold-foil)]"
                : "text-muted-foreground hover:text-white bg-white/5"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Streaming Directory</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "quiz"
                ? "bg-[var(--gold-foil)] text-[var(--ink)] shadow-[0_0_12px_var(--gold-foil)]"
                : "text-muted-foreground hover:text-white bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>What to Watch Engine</span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "matrix"
                ? "bg-[var(--gold-foil)] text-[var(--ink)] shadow-[0_0_12px_var(--gold-foil)]"
                : "text-muted-foreground hover:text-white bg-white/5"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Dual Release Matrix</span>
          </button>
        </div>

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "directory" && (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <StreamSearchDirectory
                activePlatforms={activePlatforms}
                onlyMySubscriptions={onlyMySubscriptions}
                onAddToWatchlist={handleAddToWatchlist}
                watchlistIds={watchlistIds}
              />
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <WhatToWatchQuiz activePlatforms={activePlatforms} />
            </motion.div>
          )}

          {activeTab === "matrix" && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <ReleaseCalendarMatrix />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Unified Watchlist Drawer */}
      <UnifiedWatchlist
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={handleRemoveFromWatchlist}
      />
    </main>
  );
}
