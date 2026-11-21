import { useEffect, useRef, useState } from "react";
import arenaHall from "@/assets/arena-hall.png";
import { INITIAL_HEROES, type HeroCutout } from "./heroes";
import { ParticleField } from "./particles";

export function ArenaScene({ onSelect }: { onSelect?: (hero: HeroCutout) => void }) {
  // Database Payloads
  const [heroes] = useState<HeroCutout[]>(INITIAL_HEROES);

  // Parallax & 2.5D Breathing Motion Clock
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number;
    let clock = 0;

    const tick = () => {
      clock += 0.02;
      setTime(clock);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 2.5D Mouse Cursor Shift Handler
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: nx, y: ny });
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="superstar-arena-container font-sans select-none flex items-center justify-center p-0 m-0 overflow-hidden bg-black relative"
      aria-label="Superstar Arena Theatre Engine"
    >
      {/* ── 1. LAYER A: SINGLE PURE ORIGINAL PNG PLATE (No Duplicate Tickers or Double Nav Bars) ── */}
      <div className="relative h-full w-full flex items-start justify-center overflow-hidden p-0 m-0">
        <div
          className="relative h-full w-full flex items-center justify-center"
          style={{
            transform: `translate3d(${-pointer.x * 8}px, ${-pointer.y * 4}px, 0)`,
            transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Main Pure Original Artwork Plate */}
          <img
            src={arenaHall}
            alt="Superstar Arena theatre hall at night"
            width={1536}
            height={1024}
            className="arena-background filter brightness-[1.04] contrast-[1.12] saturate-[1.15]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,rgba(0,0,0,0.35))]" />

          {/* ── 2. LAYER B: CHARACTER CUTOUT PARALLAX & 2.5D BREATHING ── */}
          {heroes.map((h, i) => {
            const phase = i * 1.05;
            // 2.5D Breathing & micro-tilt
            const breathingY = Math.sin(time * 1.8 + phase) * 4;
            const microRotY = Math.sin(pointer.x * 2 + phase) * 3;
            const microRotZ = Math.cos(time * 1.4 + phase) * 0.6;

            // Parallax offset based on depth index
            const parallaxX = pointer.x * (h.depthIndex * 12);
            const parallaxY = pointer.y * (h.depthIndex * 6);

            return (
              <div
                key={h.id}
                onClick={() => onSelect?.(h)}
                className="absolute cursor-pointer rounded-xs border border-transparent transition-transform duration-300 focus:outline-none z-10"
                style={{
                  left: `${h.leftPercent}%`,
                  width: `${h.widthPercent}%`,
                  top: `${h.topPercent}%`,
                  height: `${h.heightPercent}%`,
                  transform: `translate3d(${parallaxX}px, ${breathingY + parallaxY}px, 0) rotateY(${microRotY}deg) rotateZ(${microRotZ}deg)`,
                  transformStyle: "preserve-3d",
                }}
              />
            );
          })}

          {/* ── 3. LAYER D: SYNCHRONOUS MOBILE PHONE FLASHLIGHT FLARES ON CROWD ── */}
          {Array.from({ length: 32 }).map((_, i) => {
            const x = 8 + (i * 3.1 + (time * 8) % 84) % 84;
            const y = 72 + (Math.sin(i * 12 + time * 3) * 12 + 12);
            const opacity = Math.sin(time * 4 + i * 1.7) > 0.2 ? 0.95 : 0.05;
            return (
              <div
                key={i}
                className="pointer-events-none absolute h-2 w-2 rounded-full bg-white transition-opacity duration-300 z-20"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity,
                  boxShadow: "0 0 12px 3px rgba(255,255,255,0.95)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── 4. LAYER E: SEAMLESS FALLING PARTICLE SYSTEM ── */}
      <ParticleField />
    </section>
  );
}
