import { SourceManager } from '@/components/boxoffice/SourceManager';
import '@/components/boxoffice/boxoffice.css';
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  Layers,
  PieChart,
  Eye,
  Tv,
  Film,
  Building,
  CheckCircle,
} from "lucide-react";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "Intelligence — The Projection Lab | CineVerse" },
      {
        name: "description",
        content:
          "Sophisticated research dashboard: box office vs OTT windowing decay, revenue stream distribution, audience sentiment radars and studio benchmarks.",
      },
    ],
  }),
  component: IntelligencePage,
});

export function IntelligencePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"2024" | "2025" | "2026">("2024");
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
  const [activeMetricView, setActiveMetricView] = useState<"decay" | "revenue" | "sentiment" | "studios">("decay");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <CineVerseNav /><div className="mx-auto w-full max-w-7xl px-6"><SourceManager /></div>

      {/* Header */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <BarChart3 className="w-4 h-4" />
            <span>04 · INTELLIGENCE — THE PROJECTION LAB</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
                Audience Intelligence <span className="text-ember italic">& Industry Benchmarks</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
                Empirical data modeling tracking theatrical box office erosion curves, 8-week streaming
                license valuation, sentiment radars, and top studio ROI ratios.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-foreground hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4 text-ember" />
                <span>{downloadSuccess ? "Dossier Exported!" : "Export CSV Dossier"}</span>
              </button>
            </div>
          </div>

          {/* Timeframe & View Toggles */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              {[
                { id: "decay", label: "Box Office vs OTT Curve" },
                { id: "revenue", label: "Revenue Stream Split" },
                { id: "sentiment", label: "Audience Sentiment Radar" },
                { id: "studios", label: "Studio Benchmarks" },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveMetricView(view.id as any)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMetricView === view.id
                      ? "bg-ember text-ink shadow-[0_0_15px_rgba(224,103,30,0.3)]"
                      : "border border-border/40 bg-black/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {["2024", "2025", "2026"].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedTimeframe(yr as any)}
                  className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                    selectedTimeframe === yr ? "bg-white/20 text-foreground font-bold" : "text-muted-foreground"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Analysis Stage */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* VIEW 1: BOX OFFICE DECAY VS OTT WINDOW */}
        {activeMetricView === "decay" && (
          <div className="rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-4">
              <div>
                <h3 className="font-display text-3xl text-foreground">Theatrical Decay vs OTT Lift Velocity</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Historical tracking of week-by-week theatrical collections and subsequent digital stream surge post 8-week drop.
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ember" /> Theatrical Net</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-cyan-400" /> OTT Digital Streams</span>
              </div>
            </div>

            {/* Theatrical vs OTT Curve Visual */}
            <div className="rounded-2xl border border-border/40 bg-black/60 p-6">
              <div className="h-56 flex items-end gap-3 pt-6 border-b border-border/40 pb-2">
                {[
                  { wk: "W1", theat: 100, ott: 0 },
                  { wk: "W2", theat: 68, ott: 0 },
                  { wk: "W3", theat: 44, ott: 0 },
                  { wk: "W4", theat: 28, ott: 0 },
                  { wk: "W5", theat: 18, ott: 0 },
                  { wk: "W6", theat: 11, ott: 0 },
                  { wk: "W7", theat: 6, ott: 0 },
                  { wk: "W8 (OTT DROP)", theat: 4, ott: 95 },
                  { wk: "W9", theat: 2, ott: 82 },
                  { wk: "W10", theat: 1, ott: 64 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end gap-1 h-full">
                      {/* Theatrical Bar */}
                      <div
                        style={{ height: `${item.theat}%` }}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-ember to-amber-400 transition-all hover:brightness-125"
                        title={`Theatrical: ${item.theat}% of Day-1`}
                      />
                      {/* OTT Stream Bar */}
                      {item.ott > 0 && (
                        <div
                          style={{ height: `${item.ott}%` }}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-600 to-cyan-300 transition-all hover:brightness-125"
                          title={`OTT Streams: ${item.ott}% of Launch Peak`}
                        />
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground truncate w-full text-center">
                      {item.wk}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-border/30 bg-card/40">
                  <span className="text-muted-foreground">Theatrical Window Cliff:</span>
                  <p className="font-display text-2xl text-foreground mt-0.5">Week 4 (~78% Captured)</p>
                  <p className="text-[11px] text-muted-foreground mt-1">78% of total lifetime domestic theatre revenue is realized by day 28.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/30 bg-card/40">
                  <span className="text-muted-foreground">Optimal OTT Exclusivity Gap:</span>
                  <p className="font-display text-2xl text-ember mt-0.5">56 Days (8 Weeks)</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Maximizes single-screen repeat viewings without diluting digital rights pricing.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/30 bg-card/40">
                  <span className="text-muted-foreground">Digital Window Multiplier:</span>
                  <p className="font-display text-2xl text-cyan-400 mt-0.5">3.8x Global Reach</p>
                  <p className="text-[11px] text-muted-foreground mt-1">OTT release captures audiences across 190+ countries within 72 hours.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: REVENUE STREAM SPLIT */}
        {activeMetricView === "revenue" && (
          <div className="rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <h3 className="font-display text-3xl text-foreground">Pan-India Tentpole Revenue Share Model</h3>
            <p className="text-xs text-muted-foreground">
              Average capital recovery breakdown for films with ₹300 Cr+ theatrical production budget.
            </p>

            <div className="grid gap-4 sm:grid-cols-5">
              {[
                { channel: "Domestic Theatrical Net", share: "48%", cr: "₹450 Cr", desc: "Ticket sales across single screens & multiplexes" },
                { channel: "OTT Streaming Rights", share: "24%", cr: "₹220 Cr", desc: "Non-theatrical digital license (Netflix / Prime)" },
                { channel: "Overseas Theatrical", share: "16%", cr: "₹150 Cr", desc: "USA, UK, Middle East, Australia distributor sales" },
                { channel: "Satellite Television", share: "8%", cr: "₹75 Cr", desc: "Linear TV broadcast premiere rights" },
                { channel: "Music & Audio Stems", share: "4%", cr: "₹38 Cr", desc: "T-Series, Aditya Music, Spotify streaming royalties" },
              ].map((rev) => (
                <div key={rev.channel} className="p-4 rounded-2xl border border-border/40 bg-black/50 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">{rev.channel}</span>
                  <p className="font-display text-3xl text-gold-gradient">{rev.share}</p>
                  <p className="text-xs font-bold text-foreground">{rev.cr}</p>
                  <p className="text-[11px] text-muted-foreground">{rev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: AUDIENCE SENTIMENT RADAR */}
        {activeMetricView === "sentiment" && (
          <div className="rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <h3 className="font-display text-3xl text-foreground">Pan-India Fandom Sentiment Radar</h3>
            <div className="grid gap-4 sm:grid-cols-5">
              {[
                { factor: "Star Mass Elevation", score: 96, desc: "Hero introduction frames, whistle-worthy one-liners, slow-motion swagger" },
                { factor: "Music & Background Score", score: 94, desc: "Interval theme crescendos, dance hooks, stadium chant energy" },
                { factor: "Visual Scale & Worldbuilding", score: 91, desc: "CGI environment fidelity, period sets, stunt impact physics" },
                { factor: "Repeat Viewing Desire", score: 88, desc: "Propensity of fans to watch 3+ times in theatres before OTT launch" },
                { factor: "Screenplay Coherence", score: 82, desc: "Three-act narrative discipline, emotional stakes vs spectacle balance" },
              ].map((s) => (
                <div key={s.factor} className="p-4 rounded-2xl border border-border/40 bg-black/60 space-y-2">
                  <span className="text-xs font-bold text-foreground block">{s.factor}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl text-ember">{s.score}</span>
                    <span className="text-[10px] text-muted-foreground">/ 100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div style={{ width: `${s.score}%` }} className="h-full bg-ember rounded-full" />
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: STUDIO BENCHMARKS */}
        {activeMetricView === "studios" && (
          <div className="rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <h3 className="font-display text-3xl text-foreground">Studio Commercial Benchmarks</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/40 text-muted-foreground font-mono">
                    <th className="pb-3">STUDIO</th>
                    <th className="pb-3">AVG BUDGET</th>
                    <th className="pb-3">HIT RATIO</th>
                    <th className="pb-3">AVG THEATRICAL GROSS</th>
                    <th className="pb-3">DIGITAL WINDOW</th>
                    <th className="pb-3">COMMERCIAL RATING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    { studio: "Mythri Movie Makers", budget: "₹280 Cr", hitRate: "86%", gross: "₹720 Cr", window: "8 Weeks", rating: "AAA (Market Leader)" },
                    { studio: "Hombale Films", budget: "₹220 Cr", hitRate: "88%", gross: "₹680 Cr", window: "6-8 Weeks", rating: "AAA (Franchise King)" },
                    { studio: "Vyjayanthi Movies", budget: "₹350 Cr", hitRate: "80%", gross: "₹600 Cr", window: "7 Weeks", rating: "AA+ (Scale Pioneer)" },
                    { studio: "DVV Entertainment", budget: "₹300 Cr", hitRate: "82%", gross: "₹750 Cr", window: "10 Weeks", rating: "AAA (Global Pan-India)" },
                    { studio: "Dharma Productions", budget: "₹140 Cr", hitRate: "72%", gross: "₹260 Cr", window: "6 Weeks", rating: "AA (Urban Multiplex)" },
                  ].map((row) => (
                    <tr key={row.studio} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 font-bold text-foreground">{row.studio}</td>
                      <td className="py-3.5 font-mono">{row.budget}</td>
                      <td className="py-3.5 font-mono text-emerald-400 font-bold">{row.hitRate}</td>
                      <td className="py-3.5 font-display text-base text-gold-gradient">{row.gross}</td>
                      <td className="py-3.5 text-ember font-semibold">{row.window}</td>
                      <td className="py-3.5 text-muted-foreground">{row.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

