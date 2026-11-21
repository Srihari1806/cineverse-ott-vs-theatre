import React from "react";
import { motion } from "framer-motion";
import { Calendar, Film, Tv, ArrowRight, Clock } from "lucide-react";
import { releaseMatrixData, ReleaseMatrixEntry } from "@/data/streamhub";

export const ReleaseCalendarMatrix: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[var(--gold-foil)] text-xs font-semibold uppercase tracking-[0.3em] mb-1">
            <Calendar className="w-4 h-4" />
            Release Calendar Matrix
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Dual Timeline <span className="italic text-[var(--ember)]">FDFS vs Digital Premiere</span>
          </h2>
        </div>
        <div className="text-[11px] text-muted-foreground bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[var(--gold-foil)]" />
          <span>Tracking 4-to-8 week digital release windows</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {releaseMatrixData.map((entry: ReleaseMatrixEntry) => (
          <motion.div
            key={entry.id}
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[var(--gold-foil)]/30 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--ember)] tracking-wider">
                  {entry.heroName}
                </span>
                <h3 className="text-base font-bold text-white leading-tight mt-0.5">
                  {entry.title}
                </h3>
              </div>
              <span
                className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border flex-shrink-0 ${
                  entry.status === "Streaming Now"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : entry.status === "In Theatres"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-sky-500/20 text-sky-300 border-sky-500/30"
                }`}
              >
                {entry.status}
              </span>
            </div>

            {/* Timeline Bar */}
            <div className="space-y-2 bg-black/60 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-white">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-medium">Theatrical FDFS:</span>
                </div>
                <span className="font-mono text-muted-foreground">{entry.theatricalDate}</span>
              </div>

              <div className="relative py-1">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-[var(--gold-foil)] w-full" />
                </div>
                <div className="text-[10px] text-center text-[var(--gold-foil)] font-mono font-bold mt-1">
                  ⚡ {entry.windowDays}-Day Window Gap
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-white">
                  <img src={entry.ottPlatformLogo} alt={entry.ottPlatform} className="w-4 h-4 rounded object-contain" />
                  <span className="font-medium">{entry.ottPlatform}:</span>
                </div>
                <span className="font-mono text-[var(--ember)] font-semibold">{entry.ottDate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
