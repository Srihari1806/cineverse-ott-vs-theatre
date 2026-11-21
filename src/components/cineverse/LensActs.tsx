import { Fragment } from "react";
import { useRatingPopularity } from "@/hooks/useTmdb";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  bookingHeatmap,
  businessModel,
  covidImpact,
  day1Vs3,
  demographics,
  funnelData,
  lifecycleCurve,
  marketingImpact,
  platformByAge,
  urbanVsRural,
} from "@/data/cineverse";

function Act({
  kicker,
  title,
  insight,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  insight: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-ember/80">{kicker}</p>
            <h3 className="mt-2 font-display text-4xl leading-tight md:text-5xl">{title}</h3>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">{insight}</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">{children}</div>
      </div>
    </section>
  );
}

const tooltip = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 12,
};

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/8 ${className}`} />;
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ember/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-ember border border-ember/30">
      <span className="h-1 w-1 animate-pulse rounded-full bg-ember" />
      Live
    </span>
  );
}

// ─── Live TMDB Rating × Popularity scatter ────────────────────────────────────

function RatingScatterPanel() {
  const { data, isLoading } = useRatingPopularity();

  if (isLoading) {
    return (
      <div className="h-[300px] flex flex-col gap-2">
        <Skeleton className="flex-1 rounded-xl" />
        <Skeleton className="h-4 w-48" />
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <div className="mb-2 flex items-center gap-1.5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rating × Popularity</p>
        <LiveBadge />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart>
          <CartesianGrid stroke="var(--color-border)" />
          <XAxis
            type="number"
            dataKey="rating"
            name="TMDB Rating"
            domain={[6, 10]}
            stroke="var(--color-muted-foreground)"
            fontSize={11}
            label={{ value: "Rating", position: "insideBottom", offset: -5, fontSize: 10, fill: "var(--color-muted-foreground)" }}
          />
          <YAxis
            type="number"
            dataKey="popularity"
            name="Popularity"
            stroke="var(--color-muted-foreground)"
            fontSize={11}
          />
          <ZAxis range={[60, 200]} />
          <Tooltip
            contentStyle={tooltip}
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [value, name === "popularity" ? "Popularity" : "Rating"]}
          />
          <Scatter data={data ?? []} fill="var(--color-ember)" fillOpacity={0.8} />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-2 text-xs text-muted-foreground">
        TMDB Rating × Popularity — live top-rated films. Higher-rated films command outsized audience attention.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function LensActs() {
  return (
    <div id="acts">
      {/* Reviews */}
      <Act
        kicker="Act II · Reviews & Word of Mouth"
        title={<><span className="italic text-ember">Hype opens.</span> Reviews sustain.</>}
        insight="Opening day is a marketing outcome. Day-3 hold is a critical one — a small rating delta can double or halve a film's second weekend."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <RatingScatterPanel />
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={day1Vs3}>
                <XAxis dataKey="title" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltip} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="day1" name="Day 1" fill="var(--color-crimson)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="day3" name="Day 3" fill="var(--color-ember)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-2 text-xs text-muted-foreground">Day 1 vs Day 3 hold — Adipurush collapsed, Jawan grew.</p>
          </div>
        </div>
      </Act>

      {/* Distribution */}
      <Act
        kicker="Act III · Distribution"
        title={<><span className="italic text-ember">Urban</span> watches content. <span className="italic text-ember">Rural</span> celebrates cinema.</>}
        insight="Multiplex and single-screen aren't two price tiers — they're two entirely different products. Same movie, two rituals, two economies."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <th className="pb-3">Metric</th>
                <th className="pb-3">Urban Multiplex</th>
                <th className="pb-3">Rural Single-Screen</th>
              </tr>
            </thead>
            <tbody>
              {urbanVsRural.map((r) => (
                <tr key={r.metric} className="border-t border-white/5">
                  <td className="py-3 text-muted-foreground">{r.metric}</td>
                  <td className="py-3 font-display text-lg">{r.urban}</td>
                  <td className="py-3 font-display text-lg text-ember">{r.rural}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Act>

      {/* Booking */}
      <Act
        kicker="Act IV · Booking Behavior"
        title={<>Intent is high. <span className="italic text-ember">Timing</span> decides conversion.</>}
        insight="Weekend 7PM is a religion. The rest of the week is a funnel — impressions to seat select, seat select to paid."
      >
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Booking heatmap · demand index</p>
            <div className="inline-grid gap-1" style={{ gridTemplateColumns: `auto repeat(${bookingHeatmap.slots.length}, minmax(48px, 1fr))` }}>
              <div />
              {bookingHeatmap.slots.map((s) => (
                <div key={s} className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">{s}</div>
              ))}
              {bookingHeatmap.days.map((d) => (
                <Fragment key={d}>
                  <div className="pr-2 text-right text-[11px] uppercase tracking-widest text-muted-foreground">{d}</div>
                  {bookingHeatmap.slots.map((s) => {
                    const v = bookingHeatmap.values[d][s];
                    const alpha = v / 100;
                    return (
                      <div
                        key={`${d}-${s}`}
                        className="grid h-10 place-items-center rounded text-[10px]"
                        style={{ background: `oklch(0.82 0.17 75 / ${alpha})`, color: alpha > 0.55 ? "var(--color-ink)" : "var(--color-muted-foreground)" }}
                        title={`${d} ${s}: ${v}`}
                      >
                        {v}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Conversion funnel</p>
            <div className="space-y-2">
              {funnelData.map((f) => (
                <div key={f.stage}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{f.stage}</span>
                    <span>{f.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-ember" style={{ width: `${f.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Act>

      {/* Lifecycle */}
      <Act
        kicker="Act V · Content Lifecycle"
        title={<>Theatres capture the <span className="italic text-ember">peak</span>. OTT captures the <span className="italic text-ember">memory</span>.</>}
        insight="A film's life is now two curves stitched together. Weeks 1–3 belong to the box office; weeks 5+ belong to the algorithm."
      >
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lifecycleCurve}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="theatre" name="Theatre" stroke="var(--color-crimson)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="ott" name="OTT" stroke="var(--color-ember)" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* FDFS vs OTT Digital Window Gap Tracker (JustWatch Integration) */}
        <div className="mt-6 p-4 rounded-2xl glass-panel-gold border border-[var(--gold-foil)]/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--gold-foil)]">
              FDFS vs OTT Window Gap Tracker · Live Data
            </span>
            <span className="text-[10px] text-muted-foreground">Theatrical Exclusivity Period</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Pushpa 2: The Rule</span>
              <div className="text-lg font-bold text-white font-display mt-0.5">56-Day Window</div>
              <p className="text-[11px] text-[var(--ember)]">Theatrical: Dec 05 → OTT: Jan 30 (Netflix)</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Devara: Part 1</span>
              <div className="text-lg font-bold text-white font-display mt-0.5">42-Day Window</div>
              <p className="text-[11px] text-[var(--ember)]">Theatrical: Sep 27 → OTT: Nov 08 (Netflix)</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Guntur Kaaram</span>
              <div className="text-lg font-bold text-white font-display mt-0.5">28-Day Window</div>
              <p className="text-[11px] text-[var(--ember)]">Theatrical: Jan 12 → OTT: Feb 09 (Netflix)</p>
            </div>
          </div>
        </div>
      </Act>

      {/* Marketing */}
      <Act
        kicker="Act VI · Marketing & Promotion"
        title={<>Promotion doesn't <span className="italic text-ember">inform</span>. It builds a cultural moment.</>}
        insight="A trailer launch is table stakes. Meme waves, college tours, viral reels — that's what turns a release into an event."
      >
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketingImpact}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="campaign" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="engagement" name="Engagement" fill="var(--color-ember)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" name="Revenue lift" fill="var(--color-crimson)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Act>

      {/* Demographics */}
      <Act
        kicker="Act VII · Demographics"
        title={<>Same film. <span className="italic text-ember">Three</span> audiences.</>}
        insight="15–25 open the weekend on hype. 25–40 decide the OTT-vs-theatre call. 40+ turn a film into a family screening."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographics}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="age" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltip} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="action" fill="var(--color-chart-1)" />
                <Bar dataKey="drama" fill="var(--color-chart-2)" />
                <Bar dataKey="comedy" fill="var(--color-chart-3)" />
                <Bar dataKey="thriller" fill="var(--color-chart-4)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformByAge} layout="vertical">
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis type="category" dataKey="age" stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltip} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="theatre" fill="var(--color-crimson)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="ott" fill="var(--color-ember)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Act>

      {/* COVID */}
      <Act
        kicker="Act VIII · COVID Rewrite"
        title={<>COVID didn't kill theatres. It <span className="italic text-ember">forced</span> evolution.</>}
        insight="OTT compressed a decade of growth into eighteen months. Theatres came back — as event venues, not habits."
      >
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={covidImpact}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="theatre" stroke="var(--color-crimson)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="ott" stroke="var(--color-ember)" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Act>

      {/* Business */}
      <Act
        kicker="Act IX · Business Model"
        title={<>OTT optimises <span className="italic text-ember">lifetime value</span>. Theatres maximise the <span className="italic text-ember">moment</span>.</>}
        insight="Neither model wins outright — they optimise for different windows on the same content."
      >
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={businessModel}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={11} />
              <Radar name="OTT" dataKey="ott" stroke="var(--color-ember)" fill="var(--color-ember)" fillOpacity={0.3} />
              <Radar name="Theatre" dataKey="theatre" stroke="var(--color-crimson)" fill="var(--color-crimson)" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltip} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Act>
    </div>
  );
}