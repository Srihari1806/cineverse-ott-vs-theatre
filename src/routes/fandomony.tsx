import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FandomonyCard } from "@/components/tfi/FandomonyCard";
import { CompatibilityModal } from "@/components/tfi/CompatibilityModal";
import { fandomonyProfiles, type FandomonyProfile } from "@/data/fandomony";
import { heroes } from "@/data/banisa";

export const Route = createFileRoute("/fandomony")({
  component: FandomonyPage,
});

function FandomonyPage() {
  const [showEntry, setShowEntry] = useState(true);
  const [activeHero, setActiveHero] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"compatibility" | "score">("compatibility");
  const [selectedProfile, setSelectedProfile] = useState<FandomonyProfile | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowEntry(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getCompatibility = (profile: FandomonyProfile) => 
    Math.round((profile.screenTestScore + profile.id.length * 3) / 2);

  const filteredProfiles = fandomonyProfiles
    .filter(p => activeHero === "all" || p.heroFandom === activeHero)
    .sort((a, b) => {
      if (sortBy === "compatibility") {
        return getCompatibility(b) - getCompatibility(a);
      }
      return b.screenTestScore - a.screenTestScore;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pb-20 text-[var(--foreground)] selection:bg-[var(--ember)] selection:text-white">
      {/* Dramatic Entry Screen */}
      <AnimatePresence>
        {showEntry && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl mb-6"
            >
              🎬
            </motion.div>
            <div className="font-display text-2xl md:text-4xl text-[var(--gold-foil)] tracking-wider">
              Loading your soulmate's reel
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }}
              >.</motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay: 0.2 }}
              >.</motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay: 0.4 }}
              >.</motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[var(--gold-foil)]">
            FANDOMONY · TFI MATRIMONY
          </div>
          <h1 className="mb-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Find Your <span className="italic text-[var(--ember)] glow-ember">Filmy</span> Soulmate
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--muted-foreground)]">
            Match by fandom. Connect by dialogue. Meet at FDFS.
          </p>
          {/* Decorative Film Strip Dots */}
          <div className="mx-auto mt-8 flex max-w-xs justify-center gap-2 overflow-hidden opacity-30">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-2 w-2 shrink-0 rounded-sm bg-white" />
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="glass-panel sticky top-20 z-30 mb-8 flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveHero("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeHero === "all"
                  ? "bg-[var(--gold-foil)] text-[var(--ink)]"
                  : "bg-white/5 text-[var(--muted-foreground)] hover:bg-white/10"
              }`}
            >
              All Heroes
            </button>
            {heroes.map(hero => (
              <button
                key={hero.id}
                onClick={() => setActiveHero(hero.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                  activeHero === hero.id
                    ? "bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "bg-white/5 text-[var(--muted-foreground)] hover:bg-white/10"
                }`}
              >
                <span>{hero.emoji}</span>
                <span className="hidden sm:inline">{hero.shortName}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "compatibility" | "score")}
              className="rounded-md border border-[var(--border)] bg-black px-3 py-1.5 text-sm font-medium text-white outline-none focus:border-[var(--gold-foil)]"
            >
              <option value="compatibility">Compatibility</option>
              <option value="score">Screen Test Score</option>
            </select>
          </div>
        </div>

        {/* Profile Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeHero + sortBy} // Re-trigger animation on filter/sort change
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProfiles.map(profile => (
            <motion.div key={profile.id} variants={itemVariants}>
              <FandomonyCard
                profile={profile}
                onClick={() => setSelectedProfile(profile)}
              />
            </motion.div>
          ))}
          {filteredProfiles.length === 0 && (
            <div className="col-span-full py-20 text-center text-[var(--muted-foreground)]">
              No profiles found for this fandom. They're probably at an audio launch.
            </div>
          )}
        </motion.div>

        {/* Bottom FDFS Rally Section */}
        <div className="glass-panel-gold mt-24 overflow-hidden rounded-3xl border border-[var(--gold-foil)]/30 bg-[var(--gold-foil)]/5 p-8 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="mb-8 text-center font-display text-4xl font-bold text-[var(--gold-foil)]">
              Upcoming FDFS Rallies
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Pushpa 3: The Rampage", date: "Summer 2026", hero: "Allu Arjun" },
                { title: "Devara Part 2", date: "TBA 2026", hero: "Jr NTR" },
                { title: "Kalki 2898 AD Part 2", date: "2027", hero: "Prabhas" },
                { title: "Game Changer OTT", date: "Next Month", hero: "Ram Charan" },
              ].map((film, i) => (
                <div key={i} className="group relative flex flex-col items-center rounded-2xl border border-[var(--gold-foil)]/20 bg-black/60 p-6 text-center transition-all hover:border-[var(--gold-foil)] hover:bg-black/80 hover:shadow-[0_0_30px_rgba(224,181,113,0.15)]">
                  <div className="mb-2 text-sm font-bold tracking-widest text-[var(--ember)] uppercase">{film.date}</div>
                  <h3 className="mb-4 font-display text-xl text-white">{film.title}</h3>
                  <div className="mb-4 rounded bg-white/5 px-2 py-1 text-xs text-[var(--muted-foreground)] border border-[var(--border)]">{film.hero}</div>
                  <button className="mt-auto w-full rounded-full border-2 border-[var(--gold-foil)] px-4 py-2 text-sm font-bold text-[var(--gold-foil)] transition-colors group-hover:bg-[var(--gold-foil)] group-hover:text-[var(--ink)]">
                    Find Partner
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <CompatibilityModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </main>
  );
}
