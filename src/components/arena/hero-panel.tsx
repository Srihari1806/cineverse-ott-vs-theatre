import { useEffect, useState } from "react";
import type { HeroCutout } from "./heroes";

const TABS = ["MOVIES", "EVENTS", "MERCHANDISE", "FAN CLUB"] as const;

export function HeroPanel({ hero, onClose }: { hero: HeroCutout | null; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("MOVIES");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!hero) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${hero.name} experience`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl animate-fade-in p-4 md:p-8"
      onClick={onClose}
    >
      {/* Modal Dialog Card fitting 100% comfortably from header to bottom */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-5xl max-h-[90vh] flex-col md:flex-row overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-b from-black/95 via-background/95 to-black/95 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
      >
        {/* Left Hero Standee Cutout */}
        <div className="relative flex items-center justify-center bg-gradient-to-t from-black via-primary/10 to-transparent p-6 md:w-5/12">
          <img
            src={hero.imageUrl}
            alt={`${hero.name} cutout`}
            width={520}
            height={1040}
            className="animate-sway max-h-[45vh] md:max-h-[70vh] w-auto object-contain drop-shadow-[0_0_50px_rgba(234,179,8,0.35)]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        {/* Right Tabbed Content Panel */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-primary/20 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-primary/80">
                {hero.association}
              </p>
              <h2 className="display mt-1 text-4xl text-gold-gradient md:text-6xl">{hero.name}</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                {hero.title} — {hero.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-primary/30 bg-black/60 p-2 text-primary hover:bg-primary/20 transition-all"
            >
              ✕
            </button>
          </div>

          {/* Tabs Bar: MOVIES, EVENTS, MERCHANDISE, FAN CLUB */}
          <div className="mt-6 flex flex-wrap gap-2 border-b border-border/40 pb-4">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] font-bold transition-all ${
                    isActive
                      ? "border border-primary bg-primary text-black shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                      : "border border-primary/30 bg-black/40 text-primary hover:bg-primary/10"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Content Area */}
          <div className="mt-6 flex-1 overflow-y-auto space-y-4">
            {activeTab === "MOVIES" && (
              <div className="grid gap-3 sm:grid-cols-1">
                {hero.movies.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-primary/20 bg-black/40 p-4 transition-all hover:border-primary/50"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                      <p className="text-xs text-muted-foreground">Role: {m.role}</p>
                    </div>
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-semibold">
                      {m.year}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "EVENTS" && (
              <div className="grid gap-3 sm:grid-cols-1">
                {hero.events.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-primary/20 bg-black/40 p-4 transition-all hover:border-primary/50"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{e.name}</h3>
                      <p className="text-xs text-muted-foreground">Venue: {e.venue}</p>
                    </div>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary font-semibold">
                      {e.date}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "MERCHANDISE" && (
              <div className="grid gap-3 sm:grid-cols-1">
                {hero.merchandise.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-primary/20 bg-black/40 p-4 transition-all hover:border-primary/50"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{item.item}</h3>
                      <p className="text-xs text-emerald-400 font-semibold">{item.status}</p>
                    </div>
                    <span className="text-lg font-bold text-gold-gradient">{item.price}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "FAN CLUB" && (
              <div className="rounded-xl border border-primary/20 bg-black/40 p-6 text-center">
                <h3 className="text-xl font-bold text-gold-gradient">
                  Official {hero.association}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Join 2.4M+ registered die-hard fans across Telangana & Andhra Pradesh. Get
                  first-day first-show tickets, cutout rally passes & exclusive merchandise drops.
                </p>
                <button className="mt-4 rounded-full border border-primary bg-primary/20 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all">
                  Join Fan Club Now
                </button>
              </div>
            )}
          </div>

          {/* Footer Back Button */}
          <div className="mt-6 border-t border-primary/20 pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full border border-primary/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-black"
            >
              Back to the Plaza
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
