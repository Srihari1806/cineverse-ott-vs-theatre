import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialFeedSeed, type SocialFeedItem, type FeedBucket } from "@/data/cinepedia";
import { Twitter, Instagram, Youtube, Bot, Zap } from "lucide-react";

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "twitter": return <Twitter className="w-4 h-4 text-blue-400" />;
    case "instagram": return <Instagram className="w-4 h-4 text-pink-500" />;
    case "youtube": return <Youtube className="w-4 h-4 text-red-500" />;
    default: return null;
  }
};

const BUCKETS = [
  { id: "cinepedia", label: "📚 Cinepedia", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5", glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]" },
  { id: "meme", label: "🎭 Meme/Banisa", color: "text-[var(--ember)]", border: "border-[var(--ember)]/20", bg: "bg-[var(--ember)]/5", glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
  { id: "boxoffice", label: "💰 Box Office", color: "text-[var(--gold-foil)]", border: "border-[var(--gold-foil)]/20", bg: "bg-[var(--gold-foil)]/5", glow: "shadow-[0_0_15px_rgba(252,211,77,0.15)]" },
  { id: "fanwar", label: "⚔️ Fan War & Slang", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/5", glow: "shadow-[0_0_15px_rgba(239,68,68,0.15)]" },
];

// Helper to map data bucket to UI bucket
const mapBucketToUi = (bucket: FeedBucket): string => {
  if (bucket === "fictionary") return "fanwar";
  return bucket;
};

export function SocialPipeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeItem, setActiveItem] = useState<SocialFeedItem | null>(null);
  const [isClassifying, setIsClassifying] = useState(true);
  const [routedItems, setRoutedItems] = useState<Record<string, SocialFeedItem[]>>({
    cinepedia: [],
    meme: [],
    boxoffice: [],
    fanwar: []
  });

  useEffect(() => {
    // Pipeline sequence
    // 0ms: New item appears (isClassifying = true)
    // 1500ms: Classification complete (isClassifying = false, shows AI label)
    // 2500ms: Item moves to bucket
    // 3000ms: Next item appears

    let isMounted = true;
    
    const runCycle = async () => {
      const item = socialFeedSeed[currentIndex % socialFeedSeed.length];
      
      // Step 1: Incoming
      setActiveItem({ ...item, id: `${item.id}-${Date.now()}` });
      setIsClassifying(true);
      
      // Step 2: Classified
      await new Promise(r => setTimeout(r, 1500));
      if (!isMounted) return;
      setIsClassifying(false);

      // Step 3: Route to bucket
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;
      
      setRoutedItems(prev => {
        const uiBucket = mapBucketToUi(item.bucket);
        const currentBucketItems = prev[uiBucket] || [];
        return {
          ...prev,
          [uiBucket]: [item, ...currentBucketItems].slice(0, 3) // Keep last 3
        };
      });
      setActiveItem(null);

      // Step 4: Next item
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;
      setCurrentIndex(prev => prev + 1);
    };

    if (activeItem === null) {
      runCycle();
    }

    return () => { isMounted = false; };
  }, [activeItem, currentIndex]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6 p-4 glass-panel rounded-xl border border-white/5">
        <div className="w-10 h-10 rounded-full bg-[var(--gold-foil)]/10 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-[var(--gold-foil)] animate-pulse" />
        </div>
        <div>
          <h2 className="font-display tracking-widest text-lg text-[var(--foreground)]">AI CONTENT SEGREGATOR</h2>
          <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ember)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ember)]"></span>
            </span>
            Live stream monitoring active
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Incoming Stream */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="text-sm font-semibold tracking-wider text-white/50 border-b border-white/10 pb-2 flex justify-between items-center">
            <span>INCOMING STREAM</span>
            <Zap className="w-4 h-4 text-yellow-500/50" />
          </div>
          
          <div className="h-[200px] lg:h-[400px] relative rounded-xl border border-dashed border-white/10 bg-black/20 overflow-hidden p-4 flex flex-col items-center justify-center">
            
            <AnimatePresence mode="popLayout">
              {activeItem && (
                <motion.div
                  key={activeItem.id}
                  layoutId={`card-${activeItem.id}`}
                  initial={{ opacity: 0, y: -50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="w-full max-w-sm glass-panel p-4 rounded-xl border border-white/10 shadow-2xl relative z-10 bg-black/60 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {getPlatformIcon(activeItem.platform)}
                    <span className="text-sm font-medium text-white/90">{activeItem.handle}</span>
                    <span className="text-xs text-white/40 ml-auto">{activeItem.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-white/80 leading-relaxed mb-3">
                    {activeItem.content.length > 100 
                      ? activeItem.content.substring(0, 100) + '...' 
                      : activeItem.content}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {activeItem.hashtags.map(tag => (
                      <span key={tag} className="text-[10px] text-blue-400/80 bg-blue-500/10 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* AI Label Animation */}
                  <div className="h-8 border-t border-white/5 pt-2 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isClassifying ? (
                        <motion.div
                          key="analyzing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-xs text-[var(--gold-foil)]/70"
                        >
                          <span className="w-3 h-3 border-2 border-[var(--gold-foil)]/30 border-t-[var(--gold-foil)] rounded-full animate-spin" />
                          Analyzing context...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="classified"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 text-xs font-semibold"
                        >
                          <span className="text-green-400">✓ AI: {activeItem.confidence}%</span>
                          <span className="text-white/30">→</span>
                          <span className={BUCKETS.find(b => b.id === mapBucketToUi(activeItem.bucket))?.color}>
                            {mapBucketToUi(activeItem.bucket).toUpperCase()}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!activeItem && (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                Listening for content...
              </div>
            )}
            
            {/* Background scanner effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent w-full h-[50%] animate-[slide-in-up_2s_linear_infinite]" />
          </div>
        </div>

        {/* Right: Buckets */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BUCKETS.map((bucket) => (
            <div key={bucket.id} className={`glass-panel rounded-xl border ${bucket.border} ${bucket.bg} p-4 flex flex-col min-h-[250px] transition-all duration-500 ${activeItem && !isClassifying && mapBucketToUi(activeItem.bucket) === bucket.id ? bucket.glow : ''}`}>
              <div className={`text-sm font-semibold tracking-wider ${bucket.color} border-b border-white/5 pb-2 mb-3`}>
                {bucket.label}
              </div>
              
              <div className="flex-1 flex flex-col gap-2 relative">
                <AnimatePresence>
                  {routedItems[bucket.id]?.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layoutId={`card-${item.id}`} // This connects to the incoming card!
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-black/40 border border-white/5 p-3 rounded-lg flex flex-col gap-2 relative overflow-hidden"
                      style={{ zIndex: 10 - idx }}
                    >
                      <div className="flex items-center gap-1.5 text-xs text-white/50">
                        {getPlatformIcon(item.platform)}
                        <span>{item.handle}</span>
                        <span className="ml-auto opacity-50">{item.confidence}%</span>
                      </div>
                      <p className="text-xs text-white/80 line-clamp-2">
                        {item.content}
                      </p>
                    </motion.div>
                  ))}
                  
                  {(!routedItems[bucket.id] || routedItems[bucket.id].length === 0) && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-xs text-white/20 italic"
                    >
                      Awaiting items...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
