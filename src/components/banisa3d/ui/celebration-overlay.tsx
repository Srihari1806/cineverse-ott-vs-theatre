/**
 * CelebrationOverlay — confetti + FAN FRENZY stamp overlay.
 *
 * Reacts to `celebrationId` increments in the theatre store. In frenzy mode,
 * continuously re-spawns particles every 3 s until frenzy is cleared.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheatre } from "../state/theatre-store";

interface Particle {
  id: number;
  x: number;
  hue: number;
  delay: number;
  duration: number;
  rotation: number;
}

function makeParticles(base: number): Particle[] {
  return Array.from({ length: 60 }, (_, i) => ({
    id: base + i,
    x: Math.random() * 100,
    hue: Math.floor(Math.random() * 360),
    delay: Math.random() * 0.8,
    duration: 1.8 + Math.random() * 0.8,
    rotation: Math.random() * 360,
  }));
}

export function CelebrationOverlay() {
  const celebrationId = useTheatre((s) => s.celebrationId);
  const frenzy = useTheatre((s) => s.frenzy);

  const [particles, setParticles] = useState<Particle[]>([]);
  const [showStamp, setShowStamp] = useState(false);
  const counterRef = useRef(0);
  const frenzyTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevCelebrationId = useRef(0);

  // Spawn burst on each celebrationId increment
  useEffect(() => {
    if (celebrationId === 0) return;
    if (celebrationId === prevCelebrationId.current) return;
    prevCelebrationId.current = celebrationId;

    counterRef.current += 60;
    setParticles(makeParticles(counterRef.current));
    setShowStamp(true);

    if (!frenzy) {
      const t = setTimeout(() => {
        setParticles([]);
        setShowStamp(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [celebrationId, frenzy]);

  // Frenzy: continuously re-spawn every 3s
  useEffect(() => {
    if (!frenzy) {
      if (frenzyTimerRef.current) {
        clearInterval(frenzyTimerRef.current);
        frenzyTimerRef.current = null;
      }
      return;
    }
    frenzyTimerRef.current = setInterval(() => {
      counterRef.current += 60;
      setParticles(makeParticles(counterRef.current));
    }, 3000);
    return () => {
      if (frenzyTimerRef.current) clearInterval(frenzyTimerRef.current);
    };
  }, [frenzy]);

  // When frenzy ends, clear after current burst finishes
  useEffect(() => {
    if (!frenzy && particles.length > 0) {
      const t = setTimeout(() => {
        setParticles([]);
        setShowStamp(false);
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [frenzy, particles.length]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {/* Confetti particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ top: "-5%", opacity: 1, rotate: p.rotation }}
          animate={{ top: "110%", opacity: 0.7, rotate: p.rotation + 180 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: 12,
            height: 6,
            backgroundColor: `hsl(${p.hue}, 90%, 60%)`,
            borderRadius: 2,
          }}
        />
      ))}

      {/* FAN FRENZY stamp */}
      <AnimatePresence>
        {showStamp && (
          <motion.div
            key={`stamp-${celebrationId}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [1, 1, 0] }}
              transition={{ duration: 2.5, times: [0, 0.7, 1], delay: 0.3 }}
              className="bg-black/75 border-2 border-amber-500 rounded-2xl
                px-10 py-6 text-center shadow-2xl shadow-amber-900/50"
            >
              <div className="text-5xl mb-2">🎉</div>
              <div className="text-2xl font-black tracking-[0.1em] text-amber-400 uppercase">
                Fan Frenzy!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
