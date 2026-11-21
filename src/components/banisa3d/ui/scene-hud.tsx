/**
 * SceneHud — DOM overlay HUD for the Banisa 3D theatre experience.
 *
 * Pure HTML/CSS — no WebGL. Absolutely positioned over the <Canvas>.
 * All z-indices stay above the canvas (which sits at z-0).
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Building, DoorOpen, Clapperboard, ChevronLeft, Volume2, VolumeX } from "lucide-react";
import {
  useTheatre,
  goToScene,
  goToViewpoint,
  enterTheatre,
  stepBack,
  toggleMuted,
} from "../state/theatre-store";
import { SCENE_META, SCENE_ORDER, CROWD_CHANTS } from "../core/scene-config";
import type { SceneId } from "../core/scene-config";

const SCENE_ICONS: Record<SceneId, React.ReactNode> = {
  exterior: <Building size={14} />,
  lobby: <DoorOpen size={14} />,
  auditorium: <Clapperboard size={14} />,
};

const GLASS_PANEL = "bg-black/70 backdrop-blur-md border border-amber-600/30 rounded-lg";

/** Cycling crowd chant ticker. */
function ChantTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % CROWD_CHANTS.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className={`${GLASS_PANEL} px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-amber-400`}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="block"
          >
            {CROWD_CHANTS[idx]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SceneHud() {
  const scene = useTheatre((s) => s.scene);
  const viewpoint = useTheatre((s) => s.viewpoint);
  const visited = useTheatre((s) => s.visited);
  const muted = useTheatre((s) => s.muted);

  const sceneMeta = SCENE_META[scene];
  const currentViewpoints = sceneMeta.viewpoints;

  function isSceneLocked(id: SceneId): boolean {
    if (id === "exterior") return false;
    if (id === "lobby") return !visited.includes("exterior");
    if (id === "auditorium") return !visited.includes("lobby");
    return true;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-40 select-none">

      {/* ── Top bar ── */}
      <div className="pointer-events-auto absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-50">
        {/* Left: logo + back button */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-200 tracking-wide text-sm">
            Cine<span className="text-amber-500">Verse</span>
          </span>
          <AnimatePresence>
            {scene !== "exterior" && (
              <motion.button
                key="back"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                onClick={stepBack}
                className={`${GLASS_PANEL} flex items-center gap-1 px-2 py-1 text-amber-200 text-xs hover:text-amber-400 transition-colors cursor-pointer`}
              >
                <ChevronLeft size={13} />
                Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Right: mute + home */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMuted}
            className={`${GLASS_PANEL} flex items-center justify-center w-8 h-8 text-amber-300 hover:text-amber-100 transition-colors cursor-pointer`}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <Link
            to="/"
            className={`${GLASS_PANEL} px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-400 hover:text-amber-200 transition-colors`}
          >
            ← Home
          </Link>
        </div>
      </div>

      {/* ── Scene switcher ── */}
      <div className="pointer-events-auto absolute top-14 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {SCENE_ORDER.map((id) => {
          const meta = SCENE_META[id];
          const locked = isSceneLocked(id);
          const active = scene === id;
          const hasVisited = visited.includes(id);

          return (
            <button
              key={id}
              onClick={() => { if (!locked) goToScene(id); }}
              disabled={locked}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                "border backdrop-blur-md",
                active
                  ? "bg-amber-500 border-amber-400 text-black shadow-lg shadow-amber-900/40"
                  : locked
                    ? "bg-black/50 border-amber-600/20 text-white/30 cursor-not-allowed opacity-40"
                    : "bg-black/60 border-amber-600/30 text-amber-200 hover:bg-amber-900/40 hover:border-amber-500/50",
              ].join(" ")}
            >
              {SCENE_ICONS[id]}
              <span>{meta.label}</span>
              {locked && <span>🔒</span>}
              {!locked && hasVisited && !active && <span className="text-green-400">✓</span>}
            </button>
          );
        })}
      </div>

      {/* ── Viewpoint pills ── */}
      <div className="pointer-events-auto absolute top-[5.5rem] left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
        {currentViewpoints.map((vp) => {
          const active = viewpoint === vp.id;
          return (
            <button
              key={vp.id}
              onClick={() => goToViewpoint(vp.id)}
              className={[
                "px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer",
                "border backdrop-blur-sm",
                active
                  ? "bg-amber-600/80 border-amber-400/60 text-amber-100"
                  : "bg-black/50 border-amber-700/30 text-amber-400/70 hover:text-amber-300",
              ].join(" ")}
            >
              {vp.label}
            </button>
          );
        })}
      </div>

      {/* ── Enter Theatre CTA ── */}
      <AnimatePresence>
        {scene === "exterior" && (
          <motion.button
            key="enter-cta"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={enterTheatre}
            className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer
              bg-amber-600 hover:bg-amber-500 active:scale-95 transition-all
              text-black font-bold text-sm tracking-[0.15em] uppercase
              px-8 py-3 rounded-full shadow-lg shadow-amber-900/50
              border border-amber-400/60 hover:shadow-amber-600/40"
          >
            Enter The Theatre →
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Scene kicker (bottom-left) ── */}
      <div className={`pointer-events-none absolute bottom-8 left-4 z-40 ${GLASS_PANEL} px-4 py-3 max-w-[240px]`}>
        <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 mb-0.5">
          {sceneMeta.kicker} — {sceneMeta.label}
        </p>
        <p className="text-[11px] text-amber-200/70 leading-relaxed">
          {sceneMeta.blurb}
        </p>
      </div>

      {/* ── Crowd chant ticker (bottom-right) ── */}
      <div className="pointer-events-none absolute bottom-8 right-4 z-40">
        <ChantTicker />
      </div>
    </div>
  );
}
