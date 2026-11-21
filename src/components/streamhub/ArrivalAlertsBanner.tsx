import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Tag, Sparkles, X, ExternalLink } from "lucide-react";
import { curatedStreamCatalog, StreamItem } from "@/data/streamhub";

export const ArrivalAlertsBanner: React.FC = () => {
  const [closed, setClosed] = useState(false);
  const alertItems = curatedStreamCatalog.filter((item) => item.priceDropAlert || item.status === "price-dropped");

  if (closed || alertItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-6 glass-panel rounded-2xl p-4 border border-[var(--ember)]/30 bg-gradient-to-r from-amber-950/40 via-red-950/20 to-black relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--ember)]/20 text-[var(--ember)] animate-pulse">
              <Bell className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ember)]">
              Price Drop & Arrival Alerts
            </span>
            <span className="text-[10px] bg-[var(--crimson)] text-white px-2 py-0.5 rounded-full font-bold uppercase">
              Live Feed
            </span>
          </div>

          <button
            onClick={() => setClosed(true)}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {alertItems.map((item: StreamItem) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-[var(--ember)]/30 transition-all group"
            >
              <img
                src={item.posterUrl}
                alt={item.title}
                className="w-10 h-14 object-cover rounded-lg flex-shrink-0 shadow-md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-semibold text-white truncate group-hover:text-[var(--gold-foil)] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-amber-400 flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 flex-shrink-0">
                    <Tag className="w-3 h-3" />
                    {item.priceDropAlert?.newPrice ?? "Now Streaming"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                  {item.priceDropAlert?.label ?? "Newly added to digital streaming catalogue"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[var(--gold-foil)] font-medium">⭐ {item.tmdbRating}</span>
                  <span className="text-[10px] text-muted-foreground">· {item.language}</span>
                  {item.streamingOptions[0] && (
                    <a
                      href={item.streamingOptions[0].deepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-[10px] text-[var(--ember)] hover:underline flex items-center gap-0.5"
                    >
                      Watch <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
