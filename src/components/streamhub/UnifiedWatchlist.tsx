import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X, ExternalLink, Trash2, CheckCircle2, Film } from "lucide-react";
import { StreamItem } from "@/data/streamhub";

interface UnifiedWatchlistProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: StreamItem[];
  onRemove: (id: string) => void;
}

export const UnifiedWatchlist: React.FC<UnifiedWatchlistProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
}) => {
  const [filter, setFilter] = useState<"all" | "ott" | "theatre">("all");

  const filteredItems = watchlist.filter((item) => {
    if (filter === "ott") return item.streamingOptions.length > 0;
    if (filter === "theatre") return item.status === "in-theatres";
    return true;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[var(--background)] border-l border-white/10 h-full flex flex-col p-6 shadow-2xl text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[var(--gold-foil)]" />
                <h2 className="text-lg font-display font-bold">Unified Watchlist</h2>
                <span className="text-xs bg-[var(--gold-foil)]/20 text-[var(--gold-foil)] px-2 py-0.5 rounded-full font-mono">
                  {watchlist.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-muted-foreground hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filter === "all" ? "bg-[var(--gold-foil)] text-[var(--ink)]" : "bg-white/5 text-muted-foreground"
                }`}
              >
                All ({watchlist.length})
              </button>
              <button
                onClick={() => setFilter("ott")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filter === "ott" ? "bg-[var(--gold-foil)] text-[var(--ink)]" : "bg-white/5 text-muted-foreground"
                }`}
              >
                Streaming Now
              </button>
              <button
                onClick={() => setFilter("theatre")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filter === "theatre" ? "bg-[var(--gold-foil)] text-[var(--ink)]" : "bg-white/5 text-muted-foreground"
                }`}
              >
                In Theatres
              </button>
            </div>

            {/* Watchlist List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[var(--gold-foil)]/30 transition-all group"
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-[var(--gold-foil)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[var(--ember)] font-medium truncate mt-0.5">
                      ⭐ {item.tmdbRating} · {item.language}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.streamingOptions[0] ? (
                        <a
                          href={item.streamingOptions[0].deepLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-[var(--gold-foil)]/20 text-[var(--gold-foil)] px-2 py-0.5 rounded font-semibold flex items-center gap-1 hover:brightness-110"
                        >
                          Watch on {item.streamingOptions[0].providerName} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                          🎬 In Theatres Only
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-muted-foreground hover:text-red-400 p-1.5 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-muted-foreground space-y-2">
                  <Film className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-sm">Your watchlist is empty.</p>
                  <p className="text-xs">Click the bookmark icon on any movie in StreamHub to save it here.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
