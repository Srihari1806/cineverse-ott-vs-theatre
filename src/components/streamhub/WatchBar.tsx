import React from "react";
import { motion } from "framer-motion";
import { Check, Tv } from "lucide-react";
import { majorPlatforms, PlatformConfig } from "@/data/streamhub";

interface WatchBarProps {
  activePlatforms: string[];
  onTogglePlatform: (id: string) => void;
  onlyMySubscriptions: boolean;
  onToggleMySubscriptions: (val: boolean) => void;
}

export const WatchBar: React.FC<WatchBarProps> = ({
  activePlatforms,
  onTogglePlatform,
  onlyMySubscriptions,
  onToggleMySubscriptions,
}) => {
  return (
    <div className="glass-panel-gold rounded-2xl p-4 sm:p-5 mb-6 border border-[var(--gold-foil)]/20 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Tv className="w-5 h-5 text-[var(--gold-foil)]" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground)] font-sans">
            WatchBar <span className="text-[var(--ember)]">· My Subscriptions</span>
          </h3>
        </div>

        <button
          onClick={() => onToggleMySubscriptions(!onlyMySubscriptions)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            onlyMySubscriptions
              ? "bg-[var(--gold-foil)] text-[var(--ink)] border-[var(--gold-foil)] shadow-[0_0_12px_var(--gold-foil)]"
              : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:text-white"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${onlyMySubscriptions ? "bg-black animate-ping" : "bg-white/40"}`} />
          {onlyMySubscriptions ? "Filtering: Active Subs Only" : "Show All Services"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {majorPlatforms.map((platform: PlatformConfig) => {
          const isSelected = activePlatforms.includes(platform.id);
          return (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTogglePlatform(platform.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                isSelected
                  ? "bg-white/10 border-[var(--gold-foil)]/60 text-white shadow-[0_0_10px_rgba(230,180,60,0.2)]"
                  : "bg-white/5 border-white/10 text-muted-foreground opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-4 h-4 rounded-sm object-contain"
                onError={(e) => {
                  // Fallback for logo if blocked
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span>{platform.name}</span>
              {isSelected && <Check className="w-3 h-3 text-[var(--gold-foil)]" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
