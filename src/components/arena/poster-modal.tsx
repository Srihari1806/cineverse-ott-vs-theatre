import { useEffect } from "react";
import type { WallPoster } from "./heroes";

export function PosterModal({ poster, onClose }: { poster: WallPoster | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!poster) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-yellow-500/40 bg-gradient-to-b from-black via-zinc-900 to-black p-6 shadow-[0_0_80px_rgba(234,179,8,0.3)]"
      >
        <div className="flex items-center justify-between border-b border-yellow-500/20 pb-3">
          <div>
            <h3 className="display text-3xl text-gold-gradient">{poster.title}</h3>
            <p className="text-xs uppercase tracking-widest text-primary/80">Starring {poster.heroName} ({poster.year})</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-primary/40 bg-black/60 px-3 py-1 text-xs text-primary hover:bg-primary/20"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
          <img
            src={poster.posterUrl}
            alt={poster.title}
            className="h-64 w-auto rounded-lg border border-yellow-500/30 object-cover shadow-lg"
          />
          <div className="flex-1 space-y-3">
            <p className="text-sm text-muted-foreground">
              Official theatrical release poster for <strong className="text-white">{poster.title}</strong>. Experience first-day first-show mass celebrations across single-screen theatres.
            </p>
            <div className="pt-2 flex gap-3">
              <button className="rounded-full border border-primary bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-yellow-400">
                Watch Trailer
              </button>
              <button className="rounded-full border border-primary/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
