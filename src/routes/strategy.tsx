import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  Sliders,
  CheckCircle,
  AlertTriangle,
  Flame,
  Calendar,
  Clock,
  Building,
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/strategy")({
  head: () => ({
    meta: [
      { title: "Strategy Lab — The Producer's Office | CineVerse" },
      {
        name: "description",
        content:
          "Professional decision-making tools: Greenlight Simulator, Release Chess, Window Wars, Screen Economics, and Casting Chemistry.",
      },
    ],
  }),
  component: StrategyLabPage,
});

export function StrategyLabPage() {
  const [activeEngine, setActiveEngine] = useState<"greenlight" | "release" | "window" | "economics" | "casting">("greenlight");

  // 1. Greenlight Engine States
  const [budgetCr, setBudgetCr] = useState<number>(250);
  const [starTier, setStarTier] = useState<"tier1" | "tier2" | "ensemble">("tier1");
  const [genre, setGenre] = useState<"action" | "scifi" | "drama" | "mythology">("action");
  const [ottPreSalePct, setOttPreSalePct] = useState<number>(45);

  const starMultiple = starTier === "tier1" ? 2.8 : starTier === "tier2" ? 1.6 : 1.1;
  const genreBonus = genre === "mythology" ? 1.4 : genre === "action" ? 1.25 : genre === "scifi" ? 1.1 : 0.85;

  const preSalesCoveredCr = Math.round((budgetCr * ottPreSalePct) / 100);
  const remainingAtRiskCr = budgetCr - preSalesCoveredCr;
  const requiredBreakevenGrossCr = Math.round(remainingAtRiskCr * 2.2);
  const projectedGrossCr = Math.round(budgetCr * starMultiple * genreBonus * 0.95);
  const projectedProfitCr = projectedGrossCr - requiredBreakevenGrossCr;

  const riskScore =
    remainingAtRiskCr > 180 ? "HIGH RISK" : remainingAtRiskCr > 90 ? "MODERATE RISK" : "CONSERVATIVE / LOW RISK";

  // 2. Release Chess States
  const [festivalSlot, setFestivalSlot] = useState<"sankranti" | "diwali" | "eid" | "solo">("sankranti");
  const [clashCompetitors, setClashCompetitors] = useState<number>(2);

  const baseScreenCapacity = festivalSlot === "solo" ? 85 : festivalSlot === "sankranti" ? 130 : 110;
  const screenSharePct = Math.round(baseScreenCapacity / (clashCompetitors + 1));

  // 3. Window Wars States
  const [theatricalWindowWeeks, setTheatricalWindowWeeks] = useState<number>(8);
  const theatricalRetentionPct =
    theatricalWindowWeeks >= 10 ? 98 : theatricalWindowWeeks === 8 ? 92 : theatricalWindowWeeks === 6 ? 78 : 60;
  const ottValuationMultiplier =
    theatricalWindowWeeks <= 4 ? 1.35 : theatricalWindowWeeks === 6 ? 1.15 : theatricalWindowWeeks === 8 ? 1.0 : 0.85;

  // 5. Casting Chemistry States
  const [selectedPair, setSelectedPair] = useState<number>(0);
  const PAIRS = [
    { actor: "Allu Arjun", director: "Sukumar", chemistry: "98% (Blockbuster Guarantee)", historicalAvg: "₹1,250 Cr", factor: "Raw Character Dialect & Interval Punch" },
    { actor: "Prabhas", director: "Prashanth Neel", chemistry: "95% (Mass Euphoria)", historicalAvg: "₹715 Cr", factor: "Dystopian Silhouette Stature & Heavy Bass" },
    { actor: "NTR Jr.", director: "S.S. Rajamouli", chemistry: "99% (All-Time Record)", historicalAvg: "₹1,387 Cr", factor: "Visceral Acting Intensity & Global Footprint" },
    { actor: "Ram Charan", director: "Shankar", chemistry: "82% (High Spectacle Risk)", historicalAvg: "₹450 Cr", factor: "Social Vigilante Theme & High Budget Scaling" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <CineVerseNav />

      {/* Hero Header */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <Sliders className="w-4 h-4" />
            <span>05 · STRATEGY LAB — THE PRODUCER'S OFFICE</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
            Film Finance <span className="text-ember italic">& Simulation Engines</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
            Rigorous decision-making tools for studio heads, producers, and financiers. Evaluate
            greenlight risk coefficients, release date clashes, and 8-week window trade-offs.
          </p>

          {/* Engine Selector Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              { id: "greenlight", label: "Greenlight Decision Engine", icon: ShieldCheck },
              { id: "release", label: "Release Chess (Clash Planner)", icon: Calendar },
              { id: "window", label: "Window Wars (Theatrical vs OTT)", icon: Clock },
              { id: "economics", label: "Screen Economics (Single vs Multiplex)", icon: Building },
              { id: "casting", label: "Casting Chemistry Multiplier", icon: Users },
            ].map((eng) => {
              const Icon = eng.icon;
              const isActive = activeEngine === eng.id;
              return (
                <button
                  key={eng.id}
                  onClick={() => setActiveEngine(eng.id as any)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-wider font-bold transition-all ${
                    isActive
                      ? "bg-ember text-ink shadow-[0_0_20px_rgba(224,103,30,0.35)]"
                      : "border border-border/50 bg-black/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{eng.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Simulator Stage */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* ENGINE 1: GREENLIGHT DECISION ENGINE */}
        {activeEngine === "greenlight" && (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Input Controls */}
            <div className="lg:col-span-7 rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-border/40 pb-4">
                <h3 className="font-display text-3xl text-foreground">Slate Parameters</h3>
                <p className="text-xs text-muted-foreground mt-1">Configure project fundamentals to calculate greenlight viability.</p>
              </div>

              {/* Budget Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Total Production Budget (Negative Cost)</span>
                  <span className="font-mono text-ember font-bold">₹{budgetCr} Crores</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={budgetCr}
                  onChange={(e) => setBudgetCr(Number(e.target.value))}
                  className="mt-2 w-full accent-ember cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
                  <span>₹50 Cr (Mid-scale)</span>
                  <span>₹250 Cr (Pan-India Tentpole)</span>
                  <span>₹600 Cr (Mega Sci-Fi / Myth)</span>
                </div>
              </div>

              {/* Star Power Tier */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Star Power Tier</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { id: "tier1", label: "Tier 1 Megastar (Prabhas, Allu, NTR, SRK)" },
                    { id: "tier2", label: "Tier 2 Commercial Hero" },
                    { id: "ensemble", label: "Content Ensemble / Concept" },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setStarTier(tier.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        starTier === tier.id
                          ? "border-ember bg-ember/20 text-foreground"
                          : "border-border/40 bg-black/40 text-muted-foreground"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Genre Archetype</label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[
                    { id: "action", label: "Mass Action" },
                    { id: "mythology", label: "Mythological Epic" },
                    { id: "scifi", label: "Dystopian Sci-Fi" },
                    { id: "drama", label: "Social Drama" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGenre(g.id as any)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                        genre === g.id
                          ? "border-ember bg-ember text-ink"
                          : "border-border/40 bg-black/40 text-muted-foreground"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* OTT Pre-Sales Coverage */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>OTT & Non-Theatrical Pre-Sales Recovery</span>
                  <span className="font-mono text-cyan-400 font-bold">{ottPreSalePct}% (₹{preSalesCoveredCr} Cr)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={ottPreSalePct}
                  onChange={(e) => setOttPreSalePct(Number(e.target.value))}
                  className="mt-2 w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground">Secured via OTT streaming rights + Satellite TV + Audio rights before release.</span>
              </div>
            </div>

            {/* Decision Output Card */}
            <div className="lg:col-span-5 rounded-3xl border border-ember/60 bg-gradient-to-b from-card via-black/90 to-card p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-border/40 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-ember font-bold">ALGORITHMIC VERDICT</span>
                <h3 className="font-display text-4xl text-foreground mt-1">Greenlight Assessment</h3>
              </div>

              <div className="p-4 rounded-2xl border border-border/40 bg-black/60">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk Index</span>
                <p className={`font-display text-3xl mt-0.5 ${
                  riskScore.includes("LOW") ? "text-emerald-400" : riskScore.includes("MODERATE") ? "text-amber-400" : "text-red-400"
                }`}>
                  {riskScore}
                </p>
                <span className="text-[11px] text-muted-foreground">Unrecovered Capital at Risk: ₹{remainingAtRiskCr} Cr</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-border/30 bg-black/40">
                  <span className="text-muted-foreground text-[10px] uppercase">Breakeven Theatrical Target</span>
                  <p className="font-display text-2xl text-foreground mt-1">₹{requiredBreakevenGrossCr} Cr</p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/30 bg-black/40">
                  <span className="text-muted-foreground text-[10px] uppercase">Projected Net Gross</span>
                  <p className="font-display text-2xl text-gold-gradient mt-1">₹{projectedGrossCr} Cr</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>RECOMMENDATION: {projectedProfitCr > 0 ? "GREENLIGHT WITH CONFIDENCE" : "REVISE BUDGET CAPS"}</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {projectedProfitCr > 0
                    ? `Projected surplus of ~₹${projectedProfitCr} Cr provides safe cushion against negative critical reception.`
                    : "High capital exposure exceeds safe historical floor for this genre bracket without additional pre-sales."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 2: RELEASE CHESS */}
        {activeEngine === "release" && (
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-3xl text-foreground">Release Chess — Clash & Date Optimization</h3>
            <p className="text-xs text-muted-foreground">
              Simulate theatrical screen allocation share across major holiday windows vs uncontested solo runs.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Holiday Festival Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "sankranti", label: "Sankranti / Pongal (+30% Market Expansion)" },
                    { id: "diwali", label: "Diwali Weekend (+15% Holiday Surge)" },
                    { id: "eid", label: "Eid Holiday (+20% FDFS Peak)" },
                    { id: "solo", label: "Clean Solo Window (100% Screen Dominance)" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setFestivalSlot(s.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        festivalSlot === s.id
                          ? "border-ember bg-ember/20 text-foreground"
                          : "border-border/40 bg-black/40 text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="pt-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Competing Tier-1 Releases (Clash Depth)</span>
                    <span className="font-mono text-ember">{clashCompetitors} Competing Tentpoles</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={clashCompetitors}
                    onChange={(e) => setClashCompetitors(Number(e.target.value))}
                    className="mt-2 w-full accent-ember cursor-pointer"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border/40 bg-black/60 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Projected Screen Share</span>
                  <p className="font-display text-5xl text-gold-gradient mt-1">{screenSharePct}% of Available Screens</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {clashCompetitors === 0
                      ? "Uncontested solo release guarantees 85-90% multiplex and single-screen allocation on day 1."
                      : `A ${clashCompetitors}-way tentpole clash reduces showcase frequency to ${screenSharePct}%, requiring 90%+ occupancy to break even.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 3: WINDOW WARS */}
        {activeEngine === "window" && (
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-3xl text-foreground">Window Wars — Theatrical to OTT Timing Tradeoff</h3>
            <p className="text-xs text-muted-foreground">
              Calculate the mathematical tradeoff between extended theatrical run collections and streaming platform buyout premiums.
            </p>

            <div className="grid gap-6 sm:grid-cols-4">
              {[4, 6, 8, 12].map((wks) => (
                <div
                  key={wks}
                  onClick={() => setTheatricalWindowWeeks(wks)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    theatricalWindowWeeks === wks
                      ? "border-ember bg-ember/20 shadow-xl"
                      : "border-border/40 bg-black/40 hover:border-border"
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-ember">{wks} WEEKS EXCLUSIVE</span>
                  <p className="font-display text-2xl text-foreground mt-2">
                    {wks === 4 ? "Early Digital Drop" : wks === 8 ? "Standard Industry Norm" : wks === 12 ? "Extended Theatrical" : "Accelerated Window"}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/30 text-xs space-y-1">
                    <p><span className="text-muted-foreground">Theatrical Collection:</span> <strong className="text-foreground">{wks >= 10 ? "98%" : wks === 8 ? "92%" : wks === 6 ? "78%" : "60%"} captured</strong></p>
                    <p><span className="text-muted-foreground">OTT License Fee:</span> <strong className="text-cyan-400">{wks <= 4 ? "+35% Premium" : wks === 8 ? "1.0x Base Rate" : "-15% Discount"}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENGINE 4: SCREEN ECONOMICS */}
        {activeEngine === "economics" && (
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-3xl text-foreground">Screen Economics — Single Screen vs Multiplex Model</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="p-6 rounded-2xl border border-border/40 bg-black/50 space-y-3">
                <span className="text-xs font-mono text-ember font-bold">SINGLE SCREEN THEATRES</span>
                <h4 className="font-display text-3xl text-foreground">Mass Scale Model</h4>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• Capacity: 800 - 1,400 seats per show</li>
                  <li>• Ticket Cap: ₹150 - ₹250 (High affordability volume)</li>
                  <li>• Atmosphere: Whistles, paper confetti, communal hysteria</li>
                  <li>• Financial Driver: Pure footfall mass volume</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-border/40 bg-black/50 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold">URBAN MULTIPLEXES</span>
                <h4 className="font-display text-3xl text-foreground">Per-Capita Model</h4>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• Capacity: 150 - 350 seats per screen</li>
                  <li>• Dynamic Pricing: ₹400 - ₹900 (High margin weekend surges)</li>
                  <li>• Atmosphere: Dolby Atmos spatial fidelity, luxury recliners</li>
                  <li>• Financial Driver: Concession F&B spend (₹300+ per patron)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 5: CASTING CHEMISTRY */}
        {activeEngine === "casting" && (
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-3xl text-foreground">Casting Chemistry — Actor & Director Historical Multiplier</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {PAIRS.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPair(idx)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPair === idx
                      ? "border-ember bg-ember/20 shadow-xl"
                      : "border-border/40 bg-black/40 hover:border-border"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display text-3xl text-foreground">{p.actor} × {p.director}</h4>
                      <p className="text-xs text-ember font-semibold mt-0.5">{p.chemistry}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                      Avg {p.historicalAvg}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/30">
                    {p.factor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
