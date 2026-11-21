import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import auditorium from "@/assets/auditorium.jpg";
import {
  lenses,
  type LensId,
  boxOfficeTrend,
  ottVsTheatre,
  sentimentGauge,
} from "@/data/cineverse";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  useTrendingMovies,
  useTopOTT,
  useLiveKpis,
  useGenreShare,
} from "@/hooks/useTmdb";


// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-white/8 ${className}`}
    />
  );
}

// ─── Live badge ───────────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ember/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-ember border border-ember/30">
      <span className="h-1 w-1 animate-pulse rounded-full bg-ember" />
      TMDB / fallback
    </span>
  );
}

// ─── Poster chip ─────────────────────────────────────────────────────────────

function PosterChip({ src, title }: { src: string | null; title: string }) {
  if (!src) {
    return (
      <span className="h-9 w-6 flex-shrink-0 rounded bg-white/10 flex items-center justify-center text-[8px] text-muted-foreground">
        ?
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={title}
      className="h-9 w-6 flex-shrink-0 rounded object-cover shadow ring-1 ring-white/10"
    />
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function AuditoriumDashboard() {
  const [active, setActive] = useState<LensId>("box-office");

  const { data: kpis, isLoading: kpisLoading } = useLiveKpis();
  const { data: trending, isLoading: trendingLoading } = useTrendingMovies();
  const { data: ottMovies, isLoading: ottLoading } = useTopOTT();

  return (
    <section id="dashboard" className="relative min-h-screen overflow-hidden bg-background film-grain">
      <img
        src={auditorium}
        alt=""
        width={1920}
        height={1200}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ember/80">Row A · Front Stalls</p>
            <h2 className="mt-2 font-display text-4xl md:text-6xl">
              Good Evening, <span className="italic text-ember">Cinephile.</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Movie metadata is mapped from TMDB, with preset fallback data when unavailable. Box-office, occupancy, OTT views and trend charts are illustrative, not verified live results.
            </p>
          </div>
          <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            TMDB / fallback · India · This Week
          </div>
        </div>

        {/* KPI strip — live TMDB data */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {kpisLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 space-y-2">
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="h-7 w-28" />
                  <Skeleton className="h-2 w-16" />
                </div>
              ))
            : (kpis ?? []).map((k) => (
                <div key={k.label} className="glass-panel rounded-xl p-4">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k.label}</p>
                    {k.live && <LiveBadge />}
                  </div>
                  <p className="mt-1 font-display text-2xl">{k.value}</p>
                  <p className="mt-1 text-xs text-ember">{k.delta}</p>
                </div>
              ))}
        </div>

        {/* Curved seat row of data lenses */}
        <div id="lenses" className="relative mt-14">
          <p className="mb-4 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Choose your seat — each one opens a different data lens
          </p>
          <div
            className="grid grid-flow-col auto-cols-[minmax(140px,1fr)] gap-3 overflow-x-auto pb-4 md:auto-cols-fr md:overflow-visible"
            style={{ perspective: "1200px" }}
          >
            {lenses.map((l, i) => {
              const isActive = active === l.id;
              const midpoint = (lenses.length - 1) / 2;
              const distance = i - midpoint;
              const tilt = distance * 4;
              const lift = Math.abs(distance) * 4;
              return (
                <button
                  key={l.id}
                  onClick={() => setActive(l.id)}
                  style={{
                    transform: `rotateY(${-tilt}deg) translateY(${lift}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  className={`group relative flex h-32 flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                    isActive
                      ? "glow-ember border-ember/50 bg-ember text-ink"
                      : "glass-panel border-white/10 hover:border-ember/40 hover:-translate-y-1"
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase tracking-[0.25em] ${
                      isActive ? "text-ink/70" : "text-muted-foreground"
                    }`}
                  >
                    Seat {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className={`font-display text-lg ${isActive ? "text-ink" : ""}`}>{l.label}</p>
                    <p
                      className={`text-xs ${
                        isActive ? "text-ink/70" : "text-ember/80"
                      }`}
                    >
                      {l.kicker}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Expanded panel */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="glass-panel min-h-[420px] rounded-2xl p-6"
            >
              <LensPanel id={active} />
            </motion.div>
          </AnimatePresence>

          <aside className="space-y-4">
            {/* Trending Theatres — live TMDB Now Playing */}
            <div className="glass-panel rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ember/80">Trending Theatres</p>
                <LiveBadge />
              </div>
              <ul className="space-y-2 text-sm">
                {trendingLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <li key={i} className="flex items-center gap-3 border-b border-white/5 pb-2">
                        <Skeleton className="h-9 w-6 flex-shrink-0 rounded" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-2 w-16" />
                        </div>
                      </li>
                    ))
                  : (trending ?? []).map((m) => (
                      <li key={m.rank} className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0">
                        <PosterChip src={m.posterUrl} title={m.title} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1">
                            <span className="truncate text-sm font-medium">
                              <span className="mr-1.5 text-ember">{m.rank}</span>
                              {m.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-ember">⭐ {m.rating}</span>
                            <span className="text-[10px] text-muted-foreground">{m.year}</span>
                          </div>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>

            {/* Top on OTT — live TMDB watch providers */}
            <div className="glass-panel rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ember/80">Top on OTT</p>
                <LiveBadge />
              </div>
              <ul className="space-y-2 text-sm">
                {ottLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <li key={i} className="flex items-center gap-3 border-b border-white/5 pb-2">
                        <Skeleton className="h-9 w-6 flex-shrink-0 rounded" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-3 w-28" />
                          <Skeleton className="h-2 w-16" />
                        </div>
                      </li>
                    ))
                  : (ottMovies ?? []).map((m) => (
                      <li key={m.rank} className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0">
                        <PosterChip src={m.posterUrl} title={m.title} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate text-sm font-medium">
                              <span className="mr-1.5 text-ember">{m.rank}</span>
                              {m.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {m.logo ? (
                              <img src={m.logo} alt={m.platform} className="h-3 w-3 rounded-sm object-contain" />
                            ) : null}
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.platform}</span>
                            <span className="text-[10px] text-ember">⭐ {m.rating}</span>
                          </div>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ─── Lens Panel ───────────────────────────────────────────────────────────────

function LensPanel({ id }: { id: LensId }) {
  const lens = lenses.find((l) => l.id === id)!;
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ember/80">Now showing</p>
          <h3 className="font-display text-3xl">{lens.label}</h3>
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{lens.kicker}</span>
      </div>
      <div className="min-h-0 flex-1">
        {id === "box-office" && <BoxOfficePanel />}
        {id === "ott" && <OttPanel />}
        {id === "audience" && <AudiencePanel />}
        {id === "genres" && <GenrePanel />}
        {id === "reviews" && <ReviewsPanel />}
        {id !== "box-office" && id !== "ott" && id !== "audience" && id !== "genres" && id !== "reviews" && (
          <ScrollHint id={id} />
        )}
      </div>
    </div>
  );
}

// ─── Panel impls ──────────────────────────────────────────────────────────────

function BoxOfficePanel() {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={boxOfficeTrend}>
          <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line type="monotone" dataKey="theatre" stroke="var(--color-ember)" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="ott" stroke="var(--color-crimson)" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-xs text-muted-foreground">
        Theatre spikes Fri–Sun (release effect); OTT climbs steadily through the week.
      </p>
    </div>
  );
}

function OttPanel() {
  return (
    <div className="grid h-full grid-cols-2 items-center gap-6">
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={ottVsTheatre} innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
              {ottVsTheatre.map((s) => (
                <Cell key={s.name} fill={s.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="font-display text-4xl">42%</p>
        <p className="text-sm text-muted-foreground">Revenue share now flows through OTT — up from 18% pre-COVID.</p>
        <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
          <li>• 128.7 Mn monthly OTT views</li>
          <li>• 18,640+ titles tracked</li>
          <li>• 62% completion on niche films</li>
        </ul>
      </div>
    </div>
  );
}

function AudiencePanel() {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Urban watches content. Rural celebrates cinema. Same movie, two rituals.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StatCard title="Urban Multiplex" occ="63%" price="₹320" note="Story-driven, mixed language" />
        <StatCard title="Rural Single-Screen" occ="78%" price="₹110" note="Mass, mostly regional" />
      </div>
    </div>
  );
}
function StatCard({ title, occ, price, note }: { title: string; occ: string; price: string; note: string }) {
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-ember/80">{title}</p>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="font-display text-3xl">{occ}</span>
        <span className="text-xs text-muted-foreground">occupancy</span>
      </div>
      <p className="mt-1 text-sm">Avg ticket {price}</p>
      <p className="mt-2 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function GenrePanel() {
  const { data: liveGenres, isLoading } = useGenreShare();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 items-center gap-4">
        <Skeleton className="h-[280px] rounded-xl" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const genres = liveGenres ?? [];

  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={genres} innerRadius={55} outerRadius={100} dataKey="value" paddingAngle={3}>
              {genres.map((g) => (
                <Cell key={g.name} fill={g.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Genre share · trending</p>
          <LiveBadge />
        </div>
        <ul className="space-y-2 text-sm">
          {genres.map((g) => (
            <li key={g.name} className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: g.fill }} />
                {g.name}
              </span>
              <span className="text-muted-foreground">{g.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReviewsPanel() {
  const pct = sentimentGauge;
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-64">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--color-muted)" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 251} 251`}
        />
      </svg>
      <p className="-mt-8 font-display text-5xl text-ember">{pct}%</p>
      <p className="mt-1 text-sm text-muted-foreground">Positive sentiment · Day 3 sustaining</p>
      <p className="mt-4 max-w-md text-center text-xs text-muted-foreground">
        Hype opens a film. Reviews sustain it. A 1-point IMDb bump correlates to a 32% higher second-weekend hold.
      </p>
    </div>
  );
}

function ScrollHint({ id }: { id: LensId }) {
  const map: Record<string, string> = {
    marketing: "Scroll to the Marketing act below — meme waves and fan events out-earn TV ads 2×.",
    demographics: "Scroll to the Demographics act — 15–25 open the weekend, 40+ decide the OTT hit.",
    lifecycle: "Scroll to the Lifecycle act — theatres capture the peak, OTT captures the memory.",
    covid: "Scroll to the COVID act — a five-year rewrite of the movie industry.",
    business: "Scroll to the Business Model act — moment value vs lifetime value.",
  };
  return (
    <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center">
      <p className="max-w-sm text-sm text-muted-foreground">{map[id]}</p>
    </div>
  );
}
