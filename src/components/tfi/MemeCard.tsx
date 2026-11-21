import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare } from "lucide-react";
import { MemeCard as MemeCardType, heroes } from "@/data/banisa";

interface MemeCardProps {
  meme: MemeCardType;
}

export function MemeCard({ meme }: MemeCardProps) {
  const [upvotes, setUpvotes] = useState(meme.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`upvote_${meme.id}`);
    if (saved === "true") {
      setIsUpvoted(true);
      setUpvotes(meme.upvotes + 1);
    }
  }, [meme.id, meme.upvotes]);

  const handleUpvote = () => {
    if (isUpvoted) {
      setIsUpvoted(false);
      setUpvotes(prev => prev - 1);
      localStorage.removeItem(`upvote_${meme.id}`);
    } else {
      setIsUpvoted(true);
      setUpvotes(prev => prev + 1);
      localStorage.setItem(`upvote_${meme.id}`, "true");
      
      // Dispatch XP event
      const event = new CustomEvent("banisa-xp", { detail: { xp: 10 } });
      window.dispatchEvent(event);
    }
  };

  const hero = heroes.find(h => h.id === meme.heroId);
  const heroColor = hero?.fandomColor || "var(--ember)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative mb-4 rounded-xl overflow-hidden shadow-lg border border-[var(--border)] glass-panel group"
      style={{ background: meme.bgGradient }}
    >
      {/* Hero color accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ backgroundColor: heroColor }}
      />
      
      <div className="p-6 flex flex-col items-center justify-center min-h-[220px] relative">
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
        <div className="text-7xl mb-4 transform transition-transform group-hover:scale-110 relative z-10">{meme.emoji}</div>
        <h3 className="text-xl font-display font-bold text-center text-white mb-2 relative z-10 drop-shadow-lg" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>{meme.caption}</h3>
        {meme.subCaption && (
          <p className="text-sm text-white/90 text-center font-medium relative z-10 drop-shadow-md" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>{meme.subCaption}</p>
        )}
      </div>

      <div className="p-3 bg-black/60 backdrop-blur-md flex items-center justify-between border-t border-white/10 relative z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 transition-colors ${isUpvoted ? 'text-[var(--crimson)] drop-shadow-[0_0_8px_var(--crimson)]' : 'text-white/70 hover:text-white'}`}
          >
            <Heart size={18} className={isUpvoted ? "fill-current" : ""} />
            <span className="text-xs font-semibold">{upvotes}</span>
          </button>
          
          <div className="flex items-center gap-1.5 text-white/50">
            <MessageSquare size={16} />
            <span className="text-xs">{meme.comments}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-white/90">@{meme.author}</span>
          <span className="text-[10px] text-white/50">{meme.postedAgo}</span>
        </div>
      </div>
    </motion.div>
  );
}
