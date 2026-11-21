import { motion } from "framer-motion";
import { Hero } from "@/data/banisa";

interface HeroChipProps {
  hero: Hero | { id: string; shortName: string; title: string; emoji: string; fandomColor: string };
  isActive: boolean;
  onClick: () => void;
}

export function HeroChip({ hero, isActive, onClick }: HeroChipProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col items-center justify-center rounded-2xl h-20 w-28 transition-colors shrink-0 snap-start ${
        isActive
          ? "border-2 glow-gold"
          : "glass-panel border-transparent hover:border-[var(--muted-foreground)]"
      }`}
      style={{
        backgroundColor: isActive ? hero.fandomColor : "transparent",
        borderColor: isActive ? "var(--gold-foil)" : undefined,
      }}
    >
      <span className="text-2xl drop-shadow-md">{hero.emoji}</span>
      <span className={`text-sm font-bold mt-1 ${isActive ? "text-[var(--ink)]" : "text-[var(--foreground)]"}`}>
        {hero.shortName}
      </span>
      <span className={`text-[10px] uppercase tracking-wider ${isActive ? "text-[var(--ink)] opacity-80" : "text-[var(--muted-foreground)]"}`}>
        {hero.title}
      </span>
    </motion.button>
  );
}
