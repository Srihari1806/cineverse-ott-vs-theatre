import { useCallback, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { cutoutHeroes, type CutoutHero } from "@/data/theatre";
import { SkyLayer } from "./SkyLayer";
import { TheatreFacade } from "./TheatreFacade";
import { CrowdLayer } from "./CrowdLayer";
import { CelebrationCanvas } from "./CelebrationCanvas";
import { CutoutBoard } from "./CutoutBoard";
import { LobbyInterior } from "./LobbyInterior";

/**
 * The Banisa Wall Plaza. A single sticky viewport holding five parallax depth planes —
 * sky, facade, cutout row, crowd, particles — that the pointer pans and the
 * scroll dollies forward through the entrance and into the lobby foyer.
 * 100% text-free, live VR theatre experience.
 */
export function LivingTheatre() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<CutoutHero | null>(null);
  const [frenzy, setFrenzy] = useState(true);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // ── Camera dolly: push through the entrance as the track scrolls ──
  const dolly = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const camScale = useTransform(dolly, [0, 1], [1, 2.15]);
  const camY = useTransform(dolly, [0, 1], ["0%", "12%"]);
  const plazaFade = useTransform(dolly, [0.55, 0.95], [1, 0]);
  const cutoutsY = useTransform(dolly, [0, 1], [0, 180]);
  const cutoutsOpacity = useTransform(dolly, [0, 0.45, 0.72], [1, 1, 0]);
  const throatGlow = useTransform(dolly, [0.3, 1], [0, 1]);

  // ── Pointer pan: the camera looks around the plaza ──
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const panX = useSpring(px, { stiffness: 60, damping: 18, mass: 0.5 });
  const panY = useSpring(py, { stiffness: 60, damping: 18, mass: 0.5 });

  const handlePointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [px, py],
  );

  const resetPointer = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  // ── Layer parallax ──
  const skyX = useTransform(panX, [-1, 1], [14, -14]);
  const skyY = useTransform(panY, [-1, 1], [6, -6]);
  const skyRot = useTransform(panX, [-1, 1], [0.6, -0.6]);

  const facadeX = useTransform(panX, [-1, 1], [38, -38]);
  const facadeY = useTransform(panY, [-1, 1], [15, -15]);
  const facadeRot = useTransform(panX, [-1, 1], [2, -2]);

  const cutoutsX = useTransform(panX, [-1, 1], [78, -78]);
  const cutoutsPanY = useTransform(panY, [-1, 1], [31, -31]);
  const cutoutsRot = useTransform(panX, [-1, 1], [3.5, -3.5]);

  const crowdX = useTransform(panX, [-1, 1], [140, -140]);
  const crowdY = useTransform(panY, [-1, 1], [56, -56]);
  const crowdRot = useTransform(panX, [-1, 1], [5, -5]);

  return (
    <>
      <div ref={trackRef} className="relative h-[260vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[oklch(0.06_0.01_40)]">
          <div
            className="absolute inset-0"
            style={{ perspective: "1400px" }}
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
          >
            {/* Camera rig — dolly + cinematic breath */}
            <motion.div
              className="absolute inset-0 origin-bottom"
              style={{ y: camY, scale: camScale }}
            >
              <div
                className="absolute inset-0"
                style={{
                  animation: "camera-breathe 14s ease-in-out infinite",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ x: skyX, y: skyY, rotateY: skyRot }}
                >
                  <SkyLayer />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  style={{ x: facadeX, y: facadeY, rotateY: facadeRot, opacity: plazaFade }}
                >
                  <TheatreFacade />
                </motion.div>

                {/* ── Cutout boards ── */}
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{ x: cutoutsX, y: cutoutsPanY, rotateY: cutoutsRot }}
                >
                  <motion.div
                    className="absolute inset-x-0 bottom-[24%] flex items-end justify-center gap-[1.2vw] px-[3vw] sm:gap-[2vw]"
                    style={{
                      y: cutoutsY,
                      opacity: cutoutsOpacity,
                      transformStyle: "preserve-3d",
                    }}
                    onPointerLeave={() => setFocusedId(null)}
                  >
                    {cutoutHeroes.map((hero, i) => {
                      const arc =
                        (i - (cutoutHeroes.length - 1) / 2) / ((cutoutHeroes.length - 1) / 2);
                      return (
                        <CutoutBoard
                          key={hero.id}
                          hero={hero}
                          arc={arc}
                          index={i}
                          isFocused={focusedId === hero.id}
                          isDimmed={focusedId !== null && focusedId !== hero.id}
                          onFocus={() => setFocusedId(hero.id)}
                          onBlur={() => setFocusedId((cur) => (cur === hero.id ? null : cur))}
                          onSelect={() => setSelected(hero)}
                        />
                      );
                    })}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute inset-0 z-30"
                  style={{ x: crowdX, y: crowdY, rotateY: crowdRot, opacity: plazaFade }}
                >
                  <CrowdLayer />
                </motion.div>
              </div>
            </motion.div>

            {/* Confetti, flying paper bits, embers, smoke and spark fountains */}
            <div className="pointer-events-none absolute inset-0 z-40">
              <CelebrationCanvas intensity={frenzy ? 1 : 0.35} />
            </div>

            {/* Warm throat glow of entrance swallowing frame as we push in */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-50"
              style={{
                opacity: throatGlow,
                background:
                  "radial-gradient(ellipse 40% 55% at 50% 72%, oklch(0.9 0.16 76 / 0.55) 0%, oklch(0.55 0.14 60 / 0.35) 35%, oklch(0.07 0.01 40 / 0.92) 72%)",
              }}
            />

            {/* Lens vignette + grain */}
            <div
              className="pointer-events-none absolute inset-0 z-[55]"
              style={{
                background:
                  "radial-gradient(ellipse 78% 66% at 50% 50%, transparent 40%, oklch(0.03 0.005 40 / 0.72) 100%)",
              }}
            />
            <div className="film-grain pointer-events-none absolute inset-0 z-[56]" />
          </div>

          {/* ── Minimalist Text-Free Controls & Indicators ── */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[60]"
            style={{ opacity: plazaFade }}
          >
            {/* Scroll entrance indicator cue (Icon only) */}
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold-foil)]/40 bg-black/40 text-[var(--gold-foil)] backdrop-blur transition-transform hover:scale-110">
                <ChevronDown size={22} className="animate-bounce" />
              </div>
            </div>

            {/* Celebration toggle button (Icon only) */}
            <button
              onClick={() => setFrenzy((f) => !f)}
              className="pointer-events-auto absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-black/50 text-[var(--gold-foil)] backdrop-blur transition-all hover:border-[var(--gold-foil)] hover:scale-110"
              aria-pressed={frenzy}
            >
              <Sparkles size={18} className={frenzy ? "animate-spin-slow" : "opacity-50"} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Lobby Interior Foyer */}
      <LobbyInterior />
    </>
  );
}
