import { motion } from "framer-motion";
import { type FictionaryEntry } from "@/data/cinepedia";

export function FictionaryCard({ entry }: { entry: FictionaryEntry }) {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "mass-slang":
        return "bg-[var(--ember)]/10 text-[var(--ember)] border-[var(--ember)]/20";
      case "fandom":
        return "bg-[var(--gold-foil)]/10 text-[var(--gold-foil)] border-[var(--gold-foil)]/20";
      case "trade":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "cinema":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "emotion":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:glow-gold transition-all duration-300"
    >
      {/* Category Badge */}
      <div className={`absolute top-6 right-6 px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryStyles(entry.category)}`}>
        {getCategoryLabel(entry.category)}
      </div>

      <div className="pr-20 mb-4">
        <h3 className="font-display text-3xl text-[var(--foreground)] mb-1">
          {entry.term}
        </h3>
        <p className="text-sm italic text-[var(--muted-foreground)]">
          [{entry.pronunciation}]
        </p>
      </div>

      <p className="text-[15px] leading-relaxed text-white/80 mb-5">
        {entry.definition}
      </p>

      <blockquote className="border-l-2 border-[var(--gold-foil)] pl-4 py-1 mb-5 bg-gradient-to-r from-[var(--gold-foil)]/5 to-transparent">
        <p className="text-sm italic text-white/70">"{entry.example}"</p>
      </blockquote>

      <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/5">
        <div className="flex items-start gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40 shrink-0 mt-0.5">
            Origin
          </span>
          <p className="text-xs text-white/60">
            {entry.popularizedBy}
          </p>
        </div>
        
        {entry.relatedTerms && entry.relatedTerms.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {entry.relatedTerms.map((term) => (
              <span
                key={term}
                className="text-[11px] px-2 py-1 rounded-md bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white/80 transition-colors cursor-pointer"
              >
                {term}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
