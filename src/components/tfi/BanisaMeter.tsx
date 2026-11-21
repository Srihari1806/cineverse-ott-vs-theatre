import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBanisaTitle, getNextTitle, banisaTitles } from "@/data/banisa";

export function BanisaMeter() {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    // Load initial XP
    const savedXp = parseInt(localStorage.getItem("banisa_xp") || "0", 10);
    setXp(savedXp);

    // Listen for XP events
    const handleXpEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ xp: number }>;
      setXp(prev => {
        const newXp = prev + customEvent.detail.xp;
        localStorage.setItem("banisa_xp", newXp.toString());
        return newXp;
      });
    };

    window.addEventListener("banisa-xp", handleXpEvent);
    return () => window.removeEventListener("banisa-xp", handleXpEvent);
  }, []);

  const currentTitle = getBanisaTitle(xp);
  const nextTitleInfo = getNextTitle(xp);
  
  // Calculate progress percentage
  let progress = 100;
  let currentTierBase = 0;
  
  if (nextTitleInfo) {
    const currentTierIndex = banisaTitles.findIndex(t => t.id === currentTitle.id);
    currentTierBase = currentTierIndex >= 0 ? banisaTitles[currentTierIndex].minXp : 0;
    
    const xpInCurrentTier = xp - currentTierBase;
    const tierTotalXp = nextTitleInfo.minXp - currentTierBase;
    progress = Math.min(100, Math.max(0, (xpInCurrentTier / tierTotalXp) * 100));
  }

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel-gold rounded-2xl p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gold-foil)] opacity-5 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Current Title Badge */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[var(--background)] border-2 border-[var(--gold-foil)] flex items-center justify-center text-3xl shadow-[0_0_15px_var(--gold-foil)] shrink-0">
            {currentTitle.emoji}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold-foil)] font-bold mb-1">Current Status</div>
            <div className="text-2xl font-display text-[var(--foreground)] text-glow-gold">
              {currentTitle.name}
            </div>
            <div className="text-sm text-[var(--muted-foreground)]">
              {xp.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 w-full max-w-md">
          <div className="flex justify-between text-xs font-medium mb-2">
            <span className="text-[var(--foreground)]">{currentTitle.name}</span>
            {nextTitleInfo ? (
              <span className="text-[var(--gold-foil)]">{nextTitleInfo.minXp - xp} XP to {nextTitleInfo.name}</span>
            ) : (
              <span className="text-[var(--gold-foil)]">MAX LEVEL</span>
            )}
          </div>
          
          <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              layoutId="xp-progress"
              className="h-full bg-gradient-to-r from-[var(--ember)] to-[var(--gold-foil)] relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-[pulse-glow_2s_infinite]" />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
