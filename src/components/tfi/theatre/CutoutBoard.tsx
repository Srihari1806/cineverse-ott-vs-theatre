import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CutoutHero } from "@/data/theatre";
import { CutoutFigure } from "./CutoutFigure";

interface CutoutBoardProps {
  hero: CutoutHero;
  /** -1 .. 1 across the arc — drives perspective rotation and scale. */
  arc: number;
  index: number;
  isFocused: boolean;
  isDimmed: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: () => void;
}

/**
 * One 60–80ft fan cutout: plywood board on bamboo-and-steel scaffolding, wrapped
 * in an LED border, garlanded, flanked by flex banners, lit from below by tube
 * lights, with milk-abhishekam stains and spent crackers piled at the base.
 *
 * Completely text-free, pure visual celebration!
 */
export function CutoutBoard({
  hero,
  arc,
  index,
  isFocused,
  isDimmed,
  onFocus,
  onBlur,
  onSelect,
}: CutoutBoardProps) {
  const [photoOk, setPhotoOk] = useState(true);

  // Boards toward the edge of the arc turn away from camera and sit further back.
  const rotateY = arc * -26;
  const depthScale = 1 - Math.abs(arc) * 0.16;
  const lift = Math.abs(arc) * 22;

  return (
    <motion.div
      className="relative shrink-0 origin-bottom"
      style={
        {
          width: `clamp(50px, 13vw, 208px)`,
          transformStyle: "preserve-3d",
          "--hero": hero.color,
          "--hero-2": hero.color2,
          "--cutout-lit": `color-mix(in oklab, ${hero.color} 62%, oklch(0.96 0.06 80))`,
          "--cutout-mid": `color-mix(in oklab, ${hero.color} 55%, oklch(0.16 0.02 40))`,
          "--cutout-dark": `color-mix(in oklab, ${hero.color2} 70%, oklch(0.08 0.01 40))`,
          "--cutout-rim": `color-mix(in oklab, ${hero.color} 40%, oklch(0.98 0.05 85))`,
          zIndex: isFocused ? 30 : 10,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 90 }}
      animate={{
        opacity: isDimmed ? 0.42 : 1,
        y: isFocused ? -26 - lift : -lift,
        scale: (isFocused ? 1.07 : 1) * depthScale,
        rotateY: isFocused ? rotateY * 0.35 : rotateY,
        filter: isDimmed ? "saturate(0.5) brightness(0.62)" : "saturate(1) brightness(1)",
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.07 }}
      onHoverStart={onFocus}
      onHoverEnd={onBlur}
    >
      {/* Wind sway — the whole board creaks on its scaffolding */}
      <div
        className="relative"
        style={{
          animation: `cutout-sway ${7 + index * 0.9}s ease-in-out ${index * 0.6}s infinite`,
          transformOrigin: "50% 100%",
        }}
      >
        {/* ── Spotlight cone thrown from the rig above ── */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.7 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.7 }}
              className="pointer-events-none absolute -inset-x-[70%] -top-[45%] bottom-0 origin-top"
              style={{
                background: `conic-gradient(from 180deg at 50% 0%, transparent 0deg, color-mix(in oklab, ${hero.color} 55%, white) 84deg, color-mix(in oklab, ${hero.color} 40%, white) 96deg, transparent 180deg)`,
                opacity: 0.22,
                maskImage: "linear-gradient(to bottom, black, transparent 88%)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent 88%)",
                filter: "blur(6px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Flex banner header (Text-Free Decorative Cloth) ── */}
        <div className="relative z-20 mx-auto -mb-1 w-[132%] -translate-x-[12%]">
          <div
            className="relative h-4 px-1 py-[3px] shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
            style={{
              background: `linear-gradient(180deg, ${hero.color}, ${hero.color2})`,
              clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)",
            }}
          />
          {/* torn cloth fringe under the banner */}
          <div
            className="h-[5px] w-full opacity-90"
            style={{
              background: `repeating-linear-gradient(90deg, ${hero.color} 0 4px, transparent 4px 8px)`,
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
              animation: `flag-wave ${2.4 + index * 0.2}s ease-in-out infinite`,
            }}
          />
        </div>

        {/* ── The cutout board itself ── */}
        <button
          type="button"
          onClick={onSelect}
          onFocus={onFocus}
          onBlur={onBlur}
          className="group relative block w-full cursor-pointer focus:outline-none"
        >
          {/* LED running border */}
          <div
            className="relative aspect-[200/460] w-full overflow-hidden rounded-[3px] p-[2px]"
            style={{
              background: `linear-gradient(180deg, ${hero.color}, ${hero.color2} 60%, ${hero.color})`,
              boxShadow: isFocused
                ? `0 0 24px color-mix(in oklab, ${hero.color} 70%, transparent), 0 0 70px color-mix(in oklab, ${hero.color} 40%, transparent)`
                : `0 0 10px color-mix(in oklab, ${hero.color} 30%, transparent)`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-20 opacity-80"
              style={{
                background: `repeating-linear-gradient(90deg, color-mix(in oklab, ${hero.color} 80%, white) 0 3px, transparent 3px 9px)`,
                maskImage: "linear-gradient(black,black) content-box, linear-gradient(black,black)",
                WebkitMaskImage:
                  "linear-gradient(black,black) content-box, linear-gradient(black,black)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "2px",
                animation: "led-chase 1.1s linear infinite",
              }}
            />

            {/* plywood board face */}
            <div
              className="relative h-full w-full overflow-hidden rounded-[2px]"
              style={{
                background: `radial-gradient(120% 80% at 50% 110%, color-mix(in oklab, ${hero.color} 40%, oklch(0.2 0.03 60)) 0%, oklch(0.1 0.015 40) 62%, oklch(0.07 0.01 40) 100%)`,
              }}
            >
              <CutoutFigure figure={hero.figure} />

              {/* Optional real cutout art layered over silhouette */}
              {photoOk && (
                <img
                  src={hero.photo}
                  alt=""
                  aria-hidden
                  onError={() => setPhotoOk(false)}
                  className="absolute inset-0 h-full w-full object-contain object-bottom"
                />
              )}

              {/* Tube-light uplight washing lower half of board */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background: `linear-gradient(to top, color-mix(in oklab, ${hero.color} 55%, white) 0%, transparent 76%)`,
                  opacity: 0.3,
                  mixBlendMode: "screen",
                  animation: `tube-flicker ${3 + index * 0.4}s ease-in-out infinite`,
                }}
              />
              <div className="film-grain pointer-events-none absolute inset-0" />
            </div>
          </div>

          {/* ── Garland draped across the board ── */}
          <svg
            viewBox="0 0 200 90"
            className="pointer-events-none absolute inset-x-[-10%] top-[16%] w-[120%]"
            style={{
              animation: `garland-sway ${5 + index * 0.5}s ease-in-out infinite`,
              transformOrigin: "50% 0%",
            }}
            aria-hidden
          >
            <path d="M8 6 Q100 96 192 6" fill="none" stroke="oklch(0.35 0.06 90)" strokeWidth="2" />
            {Array.from({ length: 21 }).map((_, i) => {
              const t = i / 20;
              const x = (1 - t) ** 2 * 8 + 2 * (1 - t) * t * 100 + t ** 2 * 192;
              const y = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 96 + t ** 2 * 6;
              const marigold = i % 3 === 0;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={marigold ? 6.5 : 5}
                  fill={marigold ? "oklch(0.78 0.19 65)" : "oklch(0.62 0.2 30)"}
                  stroke="oklch(0.2 0.04 60)"
                  strokeWidth="0.6"
                />
              );
            })}
          </svg>
        </button>

        {/* ── Tube lights across the base of the board ── */}
        <div className="relative z-20 -mt-[3px] flex w-full justify-between px-[6%]">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="h-[3px] w-[9%] rounded-full"
              style={{
                background: "oklch(0.97 0.05 90)",
                boxShadow: `0 0 6px oklch(0.95 0.1 85), 0 0 14px ${hero.color}`,
                animation: `bulb-blink ${1.4 + (i % 4) * 0.35}s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Fan association board (Text-Free Beam) ── */}
        <div
          className="relative z-20 mx-auto mt-[3px] h-3 w-[118%] -translate-x-[8%] border px-1 py-[2px]"
          style={{
            background: "linear-gradient(180deg, oklch(0.22 0.03 60), oklch(0.13 0.02 45))",
            borderColor: `color-mix(in oklab, ${hero.color} 60%, transparent)`,
          }}
        />

        {/* ── Bamboo + steel scaffolding ── */}
        <Scaffolding color={hero.color} seed={index} />

        {/* ── Base: milk stains, confetti heap ── */}
        <div className="pointer-events-none relative z-10 h-6 w-[150%] -translate-x-[16%]">
          <div
            className="absolute inset-x-[14%] top-1 h-4 rounded-[50%] opacity-45 blur-[2px]"
            style={{
              background: "radial-gradient(ellipse, oklch(0.92 0.02 90) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-2 h-3 rounded-[50%] opacity-60"
            style={{
              background: `repeating-linear-gradient(74deg, ${hero.color} 0 2px, oklch(0.8 0.18 60) 2px 4px, oklch(0.6 0.2 350) 4px 6px, transparent 6px 9px)`,
              maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/** Bamboo poles, steel clamps, guy-ropes and a lighting rig behind the board. */
function Scaffolding({ color, seed }: { color: string; seed: number }) {
  return (
    <svg
      viewBox="0 0 200 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-[-26%] bottom-0 top-[26%] -z-10 w-[152%]"
      aria-hidden
    >
      <g stroke="oklch(0.42 0.06 75)" strokeLinecap="round" fill="none">
        <path d="M46 0v298" strokeWidth="5" />
        <path d="M154 0v298" strokeWidth="5" />
        <path d="M74 10v288" strokeWidth="3.5" />
        <path d="M126 10v288" strokeWidth="3.5" />
        <path d="M40 60h120M40 130h120M40 200h120M40 262h120" strokeWidth="3" />
        <path
          d="M46 60l108 70M154 60L46 130M46 200l108 62M154 200L46 262"
          strokeWidth="2"
          opacity="0.75"
        />
        <path
          d="M46 40L2 292M154 40l44 252"
          strokeWidth="1.6"
          stroke="oklch(0.55 0.04 90)"
          opacity="0.7"
        />
      </g>
      <g fill="oklch(0.55 0.02 250)">
        {[60, 130, 200, 262].map((y) =>
          [46, 74, 126, 154].map((x) => (
            <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" rx="1.5" />
          )),
        )}
      </g>
      <g>
        <rect x="30" y="284" width="140" height="7" rx="3" fill="oklch(0.3 0.02 60)" />
        {[52, 84, 116, 148].map((x, i) => (
          <g key={x}>
            <rect x={x - 6} y="276" width="12" height="10" rx="2" fill="oklch(0.35 0.02 60)" />
            <circle
              cx={x}
              cy="277"
              r="4"
              fill={color}
              style={{
                animation: `bulb-blink ${1.6 + ((i + seed) % 3) * 0.4}s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
