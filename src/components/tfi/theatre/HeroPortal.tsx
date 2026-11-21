import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { CutoutHero } from "@/data/theatre";
import { CutoutFigure } from "./CutoutFigure";
import { CelebrationCanvas } from "./CelebrationCanvas";

interface HeroPortalProps {
  hero: CutoutHero;
  onClose: () => void;
}

/**
 * The dedicated experience behind a cutout. The camera has pushed all the way
 * in — the board fills the frame, the plaza noise drops away, and the hero's
 * own menu takes over the screen.
 */
export function HeroPortal({ hero, onClose }: HeroPortalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] overflow-y-auto"
      style={
        {
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${hero.color2} 0%, oklch(0.07 0.01 40) 62%, oklch(0.05 0.008 40) 100%)`,
          "--cutout-lit": `color-mix(in oklab, ${hero.color} 70%, oklch(0.97 0.06 82))`,
          "--cutout-mid": `color-mix(in oklab, ${hero.color} 60%, oklch(0.18 0.02 40))`,
          "--cutout-dark": `color-mix(in oklab, ${hero.color2} 75%, oklch(0.07 0.01 40))`,
          "--cutout-rim": `color-mix(in oklab, ${hero.color} 45%, oklch(0.99 0.04 85))`,
        } as React.CSSProperties
      }
    >
      <CelebrationCanvas intensity={0.7} />

      {/* Spotlight cone straight down onto the board */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-20"
        style={{
          background: `conic-gradient(from 180deg at 50% -10%, transparent 0deg, ${hero.color} 86deg, ${hero.color} 94deg, transparent 180deg)`,
          filter: "blur(30px)",
        }}
      />

      <button
        onClick={onClose}
        className="fixed right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-black/50 text-[var(--foreground)] backdrop-blur transition-colors hover:border-[var(--gold-foil)] hover:text-[var(--gold-foil)]"
        aria-label="Back to the plaza"
      >
        <X size={20} />
      </button>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* The board, up close */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="relative mx-auto w-full max-w-[300px]"
        >
          <div
            className="relative aspect-[200/460] w-full overflow-hidden rounded-sm p-[3px]"
            style={{
              background: `linear-gradient(180deg, ${hero.color}, ${hero.color2} 55%, ${hero.color})`,
              boxShadow: `0 0 60px color-mix(in oklab, ${hero.color} 60%, transparent), 0 0 160px color-mix(in oklab, ${hero.color} 30%, transparent)`,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                background: `radial-gradient(120% 80% at 50% 110%, color-mix(in oklab, ${hero.color} 45%, oklch(0.22 0.03 60)) 0%, oklch(0.1 0.015 40) 60%, oklch(0.07 0.01 40) 100%)`,
              }}
            >
              <CutoutFigure figure={hero.figure} />
              <div className="film-grain pointer-events-none absolute inset-0" />
            </div>
          </div>
          <div className="mt-3 flex justify-between px-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-1 w-4 rounded-full"
                style={{
                  background: "oklch(0.97 0.05 90)",
                  boxShadow: `0 0 8px oklch(0.95 0.1 85), 0 0 18px ${hero.color}`,
                  animation: `bulb-blink ${1.3 + (i % 4) * 0.3}s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Hero panel */}
        <div>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            <div
              className="inline-block rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-[0.4em]"
              style={{ borderColor: hero.color, color: hero.color }}
            >
              {hero.title}
            </div>
            <h2 className="font-display mt-4 text-5xl leading-[0.95] text-[var(--foreground)] sm:text-7xl">
              {hero.name}
            </h2>
            <p className="mt-3 text-lg text-[var(--muted-foreground)]">
              {hero.film} — {hero.pose}
            </p>
            <p className="font-display mt-6 text-2xl italic text-[var(--gold-foil)] sm:text-3xl">
              “{hero.tagline}”
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {hero.menu.map((m, i) => (
                <motion.button
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="glass-panel flex items-center gap-3 rounded-xl px-5 py-4 text-left transition-colors"
                  style={{ borderColor: `color-mix(in oklab, ${hero.color} 40%, transparent)` }}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="font-bold text-[var(--foreground)]">{m.label}</span>
                </motion.button>
              ))}
            </div>

            <dl className="mt-8 flex flex-wrap gap-8">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                  Cutout height
                </dt>
                <dd className="font-display text-3xl text-[var(--foreground)]">
                  {hero.heightFt} ft
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                  Erected by
                </dt>
                <dd className="text-sm font-semibold text-[var(--foreground)]">{hero.fanBoard}</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
