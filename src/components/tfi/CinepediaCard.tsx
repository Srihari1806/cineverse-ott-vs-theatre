import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lightbulb, ChevronDown } from "lucide-react";
import { type WikiEntry } from "@/data/cinepedia";

export function CinepediaCard({ entry }: { entry: WikiEntry }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Derive gradient based on first genre
  const getGradient = (genre: string) => {
    switch (genre.toLowerCase()) {
      case "action":
      case "mass action":
        return "from-[var(--crimson)] to-red-900/20";
      case "epic":
      case "epic action":
        return "from-purple-600 to-purple-900/20";
      case "sci-fi":
      case "mythological sci-fi":
        return "from-cyan-600 to-cyan-900/20";
      case "drama":
        return "from-blue-600 to-blue-900/20";
      default:
        return "from-[var(--ember)] to-yellow-900/20";
    }
  };

  const mainGenre = entry.genre[0] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className="glass-panel group relative overflow-hidden rounded-xl border border-white/5 transition-colors hover:border-[var(--gold-foil)]/50"
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${getGradient(mainGenre)}`} />

      <div className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div>
          <h3 className="font-display text-2xl text-[var(--foreground)] tracking-wide mb-1 group-hover:text-[var(--gold-foil)] transition-colors">
            {entry.title}
          </h3>
          <div className="flex items-center text-sm text-[var(--muted-foreground)] gap-2">
            <span>{entry.year}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Dir. {entry.director}</span>
          </div>
        </div>

        {/* Badges / Grossing */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 flex-wrap">
            {entry.genre.map((g) => (
              <span
                key={g}
                className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                {g}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-[var(--gold-foil)] whitespace-nowrap">
            {entry.grossing}
          </span>
        </div>

        {/* Lead Actors */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/90 font-medium">{entry.hero}</span>
          <span className="text-white/30 text-xs">&times;</span>
          <span className="text-white/70">{entry.heroine}</span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/60 line-clamp-3">
          {entry.description}
        </p>

        {/* Legacy */}
        <div className="flex items-start gap-3 mt-2 bg-white/5 p-3 rounded-lg border border-white/5">
          <Trophy className="w-4 h-4 text-[var(--ember)] shrink-0 mt-0.5" />
          <p className="text-xs text-white/80 leading-relaxed italic">
            "{entry.legacy}"
          </p>
        </div>

        {/* Expandable Trivia */}
        <div className="mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-xs text-[var(--gold-foil)]/70 hover:text-[var(--gold-foil)] transition-colors py-1 group/btn"
          >
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
              <Lightbulb className="w-3.5 h-3.5" />
              TFI Trivia
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-white/70 pt-3 pb-1 border-t border-white/5 mt-2">
                  {entry.trivia}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
