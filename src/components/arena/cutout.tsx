import { useState } from "react";
import type { HeroPortal } from "./heroes";

export function Cutout({
  hero,
  active,
  dimmed,
  onFocus,
  onBlur,
  onSelect,
}: {
  hero: HeroPortal;
  active: boolean;
  dimmed: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: () => void;
}) {
  const [burst, setBurst] = useState(0);
  const scale = 0.78 + hero.depth * 0.3;

  return (
    <div
      className="absolute bottom-[30%] origin-bottom transition-[transform,filter] duration-700 ease-out"
      style={{
        left: `${hero.x}%`,
        transform: `translateX(-50%) scale(${scale * (active ? 1.07 : 1)})`,
        zIndex: 10 + Math.round(hero.depth * 10),
        filter: dimmed ? "brightness(0.45) saturate(0.7)" : "none",
      }}
    >
      {/* spotlight cone */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[130%] w-[220%] -translate-x-1/2 transition-opacity duration-700"
        style={{
          opacity: active ? 0.85 : 0,
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 160deg, color-mix(in oklab, var(--gold) 40%, transparent) 180deg, transparent 200deg)",
          filter: "blur(14px)",
        }}
      />

      <button
        type="button"
        onMouseEnter={() => {
          onFocus();
          setBurst((b) => b + 1);
        }}
        onMouseLeave={onBlur}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onSelect}
        aria-label={`${hero.name} — ${hero.title}`}
        className="group relative block cursor-pointer bg-transparent focus:outline-none"
      >
        {/* scaffolding */}
        <div
          aria-hidden
          className="absolute inset-x-[-6%] bottom-0 top-[6%] -z-10"
          style={{
            opacity: 0.5,
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--gold-deep) 60%, transparent) 0 3px, transparent 3px calc(100% - 3px), color-mix(in oklab, var(--gold-deep) 60%, transparent) calc(100% - 3px) 100%), repeating-linear-gradient(0deg, transparent 0 56px, color-mix(in oklab, var(--gold-deep) 35%, transparent) 56px 58px)",
          }}
        />
        <img
          src={hero.image}
          alt={`${hero.name} fan cutout standee`}
          width={640}
          height={1280}
          loading="lazy"
          className="animate-sway w-auto max-w-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
          style={{
            height: "clamp(180px, 26vw, 420px)",
            filter: active
              ? "drop-shadow(0 0 28px color-mix(in oklab, var(--gold) 70%, transparent))"
              : undefined,
          }}
        />

        {/* LED border */}
        <span
          aria-hidden
          className="bulb-strip animate-flicker pointer-events-none absolute inset-x-[-8%] bottom-[-10px] h-4 opacity-80"
        />

        {/* particle burst on hover */}
        <span
          key={burst}
          aria-hidden
          className="pointer-events-none absolute bottom-[8%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--gold) 65%, transparent), transparent 70%)",
            animation: active ? "breathe 1.4s ease-out" : "none",
          }}
        />

        {/* fan association board */}
        <span className="absolute -bottom-9 left-1/2 w-max max-w-[180px] -translate-x-1/2 rounded-xs border border-border bg-card/80 px-2 py-1 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
          {hero.association}
        </span>

        {/* animated title reveal */}
        <span
          className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-500"
          style={{
            opacity: active ? 1 : 0,
            transform: `translate(-50%, ${active ? "0" : "10px"})`,
          }}
        >
          <span className="display block text-3xl text-gold-gradient">{hero.name}</span>
          <span className="block text-xs uppercase tracking-[0.3em] text-primary/80">
            {hero.tagline}
          </span>
        </span>
      </button>

      {/* floating menu */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 flex-col gap-1 transition-all duration-500"
        style={{ opacity: active ? 1 : 0, transform: `translate(-50%, ${active ? "-50%" : "-40%"})` }}
      >
        {hero.menu.map((m, i) => (
          <span
            key={m}
            className="rounded-xs border border-primary/40 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary backdrop-blur-sm"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
