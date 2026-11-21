import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  Megaphone,
  Target,
  Calendar,
  Layers,
  DollarSign,
  TrendingUp,
  Save,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Users,
  Compass,
  Film,
} from "lucide-react";

export const Route = createFileRoute("/campaign")({
  head: () => ({
    meta: [
      { title: "Campaign Studio — The Creative War Room | CineVerse" },
      {
        name: "description",
        content:
          "Professional release war room for marketing strategists: GTM roadmaps, audience persona targeting, promotional asset matrix, and multi-channel budget allocation.",
      },
    ],
  }),
  component: CampaignStudioPage,
});

interface CampaignPreset {
  id: string;
  filmName: string;
  genre: string;
  theatricalBudget: string;
  marketingBudgetCr: number;
  releaseWindow: string;
  primaryTarget: string;
  strategySummary: string;
}

const CAMPAIGN_PRESETS: CampaignPreset[] = [
  {
    id: "pushpa-2-war",
    filmName: "Pushpa 2: The Rule",
    genre: "Pan-India Mass Action",
    theatricalBudget: "₹350 Cr",
    marketingBudgetCr: 45,
    releaseWindow: "Dec Theatrical → Feb Netflix (8 Weeks)",
    primaryTarget: "Mass Single-Screen Fandom + North Hindi Belt",
    strategySummary: "Aggressive multi-city trailer rally blitz across Patna, Hyderabad, Mumbai, and Chennai coupled with high-tempo single drops.",
  },
  {
    id: "devara-war",
    filmName: "Devara: Part 1",
    genre: "Coastal Action Epic",
    theatricalBudget: "₹250 Cr",
    marketingBudgetCr: 30,
    releaseWindow: "Oct Theatrical → Dec Netflix (7 Weeks)",
    primaryTarget: "Young Tiger NTR Fandom + Overseas Telugu Diaspora",
    strategySummary: "Fear Song musical drop into Dallas & California midnight premiere pre-sales surge.",
  },
  {
    id: "kalki-war",
    filmName: "Kalki 2898 AD",
    genre: "Mythological Sci-Fi",
    theatricalBudget: "₹600 Cr",
    marketingBudgetCr: 55,
    releaseWindow: "June Theatrical → August Prime Video (7 Weeks)",
    primaryTarget: "Global Sci-Fi Fans + Family Demographics",
    strategySummary: "Physical Bujji car tour across universities and San Diego Comic-Con global showcase.",
  },
];

export function CampaignStudioPage() {
  const [selectedPreset, setSelectedPreset] = useState<CampaignPreset>(CAMPAIGN_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<"strategy" | "timeline" | "assets" | "budget">("budget");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Budget Allocation Sliders (in Crores)
  const [oohBudget, setOohBudget] = useState<number>(12); // Theatrical Hoardings / Standees
  const [digitalBudget, setDigitalBudget] = useState<number>(15); // YouTube, Instagram, Meta Ads
  const [influencerBudget, setInfluencerBudget] = useState<number>(6); // Creator & Meme Networks
  const [cityToursBudget, setCityToursBudget] = useState<number>(8); // Ground Events & Pre-Release
  const [fanClubGrants, setFanClubGrants] = useState<number>(4); // Fan Rally Cutout Grants

  const totalMarketingBudget = oohBudget + digitalBudget + influencerBudget + cityToursBudget + fanClubGrants;

  // Real-time calculated projections
  const estimatedImpressions = Math.round(totalMarketingBudget * 18.5); // Millions
  const projectedDay1Opening = Math.round(totalMarketingBudget * 3.4 + 40); // ₹ Cr
  const viralMultiplier = (1 + (digitalBudget + influencerBudget) * 0.08).toFixed(2);

  // Asset matrix checked state
  const [checkedAssets, setCheckedAssets] = useState<Record<string, boolean>>({
    a1: true, a2: true, a3: true, a4: false, a5: false, a6: false,
  });

  const toggleAsset = (id: string) => {
    setCheckedAssets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveToWorkspace = () => {
    try {
      const campaignToSave = {
        id: `campaign-${Date.now()}`,
        title: `${selectedPreset.filmName} — GTM Campaign Deck`,
        film: selectedPreset.filmName,
        budgetCr: totalMarketingBudget,
        impressions: `${estimatedImpressions}M`,
        day1Opening: `₹${projectedDay1Opening} Cr`,
        status: "Ready to Pitch",
        updatedAt: new Date().toLocaleDateString(),
      };
      const existing = JSON.parse(localStorage.getItem("cineverse_saved_campaigns") || "[]");
      localStorage.setItem("cineverse_saved_campaigns", JSON.stringify([campaignToSave, ...existing]));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <CineVerseNav />

      {/* Hero Header */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <Megaphone className="w-4 h-4" />
            <span>03 · CAMPAIGN STUDIO — THE CREATIVE WAR ROOM</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
                Release Strategy <span className="text-ember italic">& GTM War Room</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
                Architect film briefs, segment audience personas, manage promotional asset pipelines, and
                simulate multi-channel marketing budget allocation for maximum day-1 box office velocity.
              </p>
            </div>

            {/* Save to Workspace CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveToWorkspace}
                className="flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-widest font-bold text-ink hover:bg-ember/90 transition-all shadow-[0_0_25px_rgba(224,103,30,0.4)]"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved to Desk!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save to Workspace</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active Preset Campaign Selector */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1">Active Slate:</span>
            {CAMPAIGN_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedPreset.id === preset.id
                    ? "border border-ember bg-ember/15 text-foreground shadow-[0_0_15px_rgba(224,103,30,0.25)]"
                    : "border border-border/40 bg-black/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Film className="w-3.5 h-3.5 text-ember" />
                <span>{preset.filmName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Dashboard Navigation Tabs */}
      <section className="border-b border-border/40 bg-card/60 backdrop-blur-md px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center gap-4 overflow-x-auto py-3">
          {[
            { id: "budget", label: "Budget & ROI Simulator", icon: DollarSign },
            { id: "strategy", label: "Film Brief & Audiences", icon: Target },
            { id: "timeline", label: "6-Phase GTM Timeline", icon: Calendar },
            { id: "assets", label: "Promotional Asset Matrix", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-ember text-ink shadow-[0_0_15px_rgba(224,103,30,0.3)]"
                    : "border border-border/40 bg-black/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Campaign Work Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* TAB 1: BUDGET & ROI SIMULATOR */}
        {activeTab === "budget" && (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-7 rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div className="border-b border-border/40 pb-4">
                <h3 className="font-display text-3xl text-foreground">Multi-Channel Budget Allocation</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Adjust channel capital deployment to simulate day-1 theatrical footfall and social virality.
                </p>
              </div>

              {/* Slider 1: OOH & Theatrical */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Theatrical Hoardings & Standees (OOH)</span>
                  <span className="font-mono text-ember">₹{oohBudget} Cr</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  value={oohBudget}
                  onChange={(e) => setOohBudget(Number(e.target.value))}
                  className="mt-2 w-full accent-ember cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground">Skyline highway banners, single-screen cutouts, multiplex standees</span>
              </div>

              {/* Slider 2: Digital Ads */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Digital Media & Video Ads (YouTube, Meta)</span>
                  <span className="font-mono text-ember">₹{digitalBudget} Cr</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="35"
                  value={digitalBudget}
                  onChange={(e) => setDigitalBudget(Number(e.target.value))}
                  className="mt-2 w-full accent-ember cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground">Trailer YouTube Masthead, targeted Instagram reels, programmatic OTT ads</span>
              </div>

              {/* Slider 3: Influencer Network */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Creator & Meme Marketing Network</span>
                  <span className="font-mono text-ember">₹{influencerBudget} Cr</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={influencerBudget}
                  onChange={(e) => setInfluencerBudget(Number(e.target.value))}
                  className="mt-2 w-full accent-ember cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground">Dance hook challenges, fan meme pages, movie reviewer interviews</span>
              </div>

              {/* Slider 4: City Tours */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Ground Rallies & Pre-Release Stadium Events</span>
                  <span className="font-mono text-ember">₹{cityToursBudget} Cr</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={cityToursBudget}
                  onChange={(e) => setCityToursBudget(Number(e.target.value))}
                  className="mt-2 w-full accent-ember cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground">Patna, Hyderabad, Vizag, Chennai stadium events with 50,000+ attendance</span>
              </div>

              {/* Slider 5: Fan Club Grants */}
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Official Fan Club Community Grants</span>
                  <span className="font-mono text-ember">₹{fanClubGrants} Cr</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={fanClubGrants}
                  onChange={(e) => setFanClubGrants(Number(e.target.value))}
                  className="mt-2 w-full accent-ember cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground">Milk abhishekam rallies, confetti cannons, FDFS rally t-shirts</span>
              </div>
            </div>

            {/* Right Column: Calculated Impact War Board */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-ember/50 bg-gradient-to-b from-card via-black/80 to-card p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="border-b border-border/40 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ember font-bold">LIVE PROJECTIONS</span>
                  <h3 className="font-display text-4xl text-foreground mt-1">Campaign ROI Board</h3>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="p-4 rounded-2xl border border-border/40 bg-black/60">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Marketing Spend</span>
                    <p className="font-display text-3xl text-gold-gradient mt-0.5">₹{totalMarketingBudget} Crores</p>
                    <span className="text-[10px] text-muted-foreground">Benchmark: 12-15% of theatrical production budget</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-border/40 bg-black/60">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Projected Day-1 Worldwide Gross</span>
                    <p className="font-display text-3xl text-emerald-400 mt-0.5">₹{projectedDay1Opening} Cr</p>
                    <span className="text-[10px] text-muted-foreground">Estimated FDFS opening velocity based on current marketing allocation</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl border border-border/40 bg-black/60">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Est. Impressions</span>
                      <p className="font-display text-2xl text-foreground mt-0.5">{estimatedImpressions}M</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-border/40 bg-black/60">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Viral Multiplier</span>
                      <p className="font-display text-2xl text-ember mt-0.5">{viralMultiplier}x</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <button
                    onClick={handleSaveToWorkspace}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-border/60 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-white/20 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save This Strategy Snapshot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FILM BRIEF & AUDIENCE PERSONAS */}
        {activeTab === "strategy" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-ember font-bold">FILM BRIEF OVERVIEW</span>
              <h3 className="font-display text-3xl text-foreground">{selectedPreset.filmName}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedPreset.strategySummary}</p>

              <div className="space-y-2.5 pt-4 text-xs border-t border-border/30">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre Positioning:</span>
                  <span className="font-bold text-foreground">{selectedPreset.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Production:</span>
                  <span className="font-bold text-foreground">{selectedPreset.theatricalBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Window:</span>
                  <span className="font-bold text-ember">{selectedPreset.releaseWindow}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-ember font-bold">AUDIENCE PERSONA SEGMENTATION</span>
              <div className="space-y-3">
                {[
                  { name: "FDFS Mass Die-Hards", pct: "38%", focus: "First day first show midnight fever, cutout rallies, whistlers in single screens." },
                  { name: "Urban Multiplex Cinephiles", pct: "26%", focus: "Visual scale, technical craft, Dolby Atmos sound fidelity, repeat weekend viewings." },
                  { name: "Family & Holiday Crowds", pct: "22%", focus: "Festive holiday booking, clean emotional core, word-of-mouth sustainability." },
                  { name: "OTT Digital Streamers", pct: "14%", focus: "Awaiting 8-week streaming window, meme followers, multi-language dub consumers." },
                ].map((aud) => (
                  <div key={aud.name} className="p-3.5 rounded-xl border border-border/40 bg-black/40">
                    <div className="flex justify-between font-bold text-xs mb-1">
                      <span className="text-foreground">{aud.name}</span>
                      <span className="text-ember font-mono">{aud.pct}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{aud.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 6-PHASE GTM TIMELINE */}
        {activeTab === "timeline" && (
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-3xl text-foreground">6-Phase Theatrical-to-OTT GTM Roadmap</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { phase: "Phase 1: First Look", time: "Day -120", desc: "Title reveal poster + motion logo. Fan association cutout blueprint." },
                { phase: "Phase 2: Teaser Blitz", time: "Day -60", desc: "60-second teaser drop on YouTube. 5 regional language dubs. #PushpaMania trending." },
                { phase: "Phase 3: Musical Single 1", time: "Day -35", desc: "Mass chartbuster lyrical drop. TikTok & Reel dance hook campaign launched." },
                { phase: "Phase 4: Trailer Festival", time: "Day -15", desc: "Multi-city trailer launch stadium rally (Patna & Hyderabad). North belt ticket advance." },
                { phase: "Phase 5: Release Day FDFS", time: "Day 0", desc: "4 AM benefit shows across single screens. Milk abhishekam on superstar cutouts." },
                { phase: "Phase 6: OTT Drop", time: "Day +56", desc: "8-week post-theatrical streaming launch on Netflix with bonus deleted scenes." },
              ].map((step, i) => (
                <div key={step.phase} className="p-4 rounded-2xl border border-border/40 bg-black/40 relative">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ember font-bold">0{i + 1}</span>
                    <span className="text-muted-foreground">{step.time}</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{step.phase}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROMOTIONAL ASSET MATRIX */}
        {activeTab === "assets" && (
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-3xl text-foreground">Promotional Asset Checklist</h3>
                <p className="text-xs text-muted-foreground">Track completion status of core promotional deliverables.</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: "a1", name: "Main Theatrical Poster (4K Landscape & Portrait)", lead: "Graphic Team", format: "Print OOH + Digital" },
                { id: "a2", name: "60-Second Reveal Teaser", lead: "Edit Lab", format: "ProRes 422 + YouTube" },
                { id: "a3", name: "First Single Lyrical Video", lead: "Music Label", format: "Spatial Audio + Video" },
                { id: "a4", name: "Character Standee Artwork (6 Fandom Cutouts)", lead: "Banisa Agency", format: "Vector Print 80ft" },
                { id: "a5", name: "Main Theatrical Trailer (5 Languages)", lead: "Post Finish", format: "DCP Theatrical 5.1" },
                { id: "a6", name: "OTT Countdown Reels & Bonus Footage", lead: "Digital Team", format: "9:16 Vertical Mobile" },
              ].map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => toggleAsset(asset.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    checkedAssets[asset.id]
                      ? "border-emerald-500/50 bg-emerald-950/20"
                      : "border-border/40 bg-black/40 hover:border-border"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{asset.name}</h4>
                    <p className="text-[11px] text-muted-foreground">{asset.lead} · {asset.format}</p>
                  </div>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    checkedAssets[asset.id] ? "bg-emerald-500 text-black" : "border border-border/60"
                  }`}>
                    {checkedAssets[asset.id] && <CheckCircle2 className="w-4 h-4" />}
                  </div>
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
