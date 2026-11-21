/**
 * CutoutPanel — slide-in hero profile panel (right side).
 *
 * Triggered when a standee is clicked in the plaza. Reads `openCutoutId` from
 * the theatre store and maps it to the full `CutoutPlacement` data.
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Film, Users } from "lucide-react";
import {
  useTheatre,
  closeCutout,
  fireCelebration,
  openKiosk,
} from "../state/theatre-store";
import { cutoutById } from "../data/cutouts";

export function CutoutPanel() {
  const openCutoutId = useTheatre((s) => s.openCutoutId);
  const cutout = cutoutById(openCutoutId);

  return (
    <AnimatePresence>
      {cutout && (
        <motion.aside
          key={cutout.id}
          initial={{ x: 340 }}
          animate={{ x: 0 }}
          exit={{ x: 340 }}
          transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.9 }}
          className="fixed right-0 top-0 h-full w-80 z-[60] flex flex-col
            bg-black/90 backdrop-blur-xl border-l border-amber-700/30 shadow-2xl overflow-y-auto"
          style={{ borderTopColor: cutout.accent, borderTopWidth: 3 }}
        >
          {/* Close button */}
          <button
            onClick={closeCutout}
            aria-label="Close panel"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
              rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>

          {/* Header gradient banner */}
          <div
            className="flex flex-col items-start justify-end px-5 pt-10 pb-5 min-h-[140px]"
            style={{
              background: `linear-gradient(160deg, ${cutout.accent}55 0%, #0a070588 100%)`,
              borderBottom: `1px solid ${cutout.accent}44`,
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 mb-1">
              {cutout.heightFt} ft standee
            </p>
            <h2 className="text-2xl font-bold text-white leading-none mb-0.5">
              {cutout.name}
            </h2>
            <p className="text-sm font-medium" style={{ color: cutout.accent }}>
              {cutout.title}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 px-5 py-5">
            {/* Pose */}
            <p className="text-xs italic text-amber-200/60 leading-relaxed border-l-2 pl-3" style={{ borderColor: cutout.accent }}>
              {cutout.pose}
            </p>

            {/* Tagline */}
            <blockquote className="text-base font-semibold text-amber-300 leading-snug">
              "{cutout.tagline}"
            </blockquote>

            {/* Fan board */}
            <div className="flex items-start gap-2 text-xs text-amber-200/70">
              <Users size={12} className="mt-0.5 shrink-0 text-amber-500" />
              <span>{cutout.fanBoard}</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-amber-700/25" />

            {/* Filmography */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5 text-[10px] uppercase tracking-[0.3em] text-amber-500">
                <Film size={11} />
                <span>Filmography</span>
              </div>
              <ul className="space-y-2">
                {cutout.filmography.map((film) => (
                  <li key={film.title} className="text-[11px] text-amber-200/70 leading-snug">
                    <span className="text-white/80 font-medium">{film.title}</span>
                    <span className="text-white/30"> ({film.year})</span>
                    <br />
                    <span className="text-amber-400/60">as {film.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => fireCelebration("confetti")}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{ background: cutout.accent }}
              >
                🎉 Fire Celebration
              </button>
              <button
                onClick={() => { openKiosk("fanwall"); closeCutout(); }}
                className="w-full py-2.5 rounded-lg text-xs font-medium text-amber-300
                  border border-amber-600/30 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                📝 Leave a Note on the Fan Wall
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
