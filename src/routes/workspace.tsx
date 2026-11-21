import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  Briefcase,
  Plus,
  Folder,
  FileText,
  Sliders,
  Sparkles,
  Download,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Workspace — The Creative Desk | CineVerse" },
      {
        name: "description",
        content:
          "Central repository for your saved campaigns, film experiments, research projects, simulations and exported executive dossiers.",
      },
    ],
  }),
  component: WorkspacePage,
});

interface SavedProject {
  id: string;
  title: string;
  film: string;
  budgetCr: number;
  impressions: string;
  day1Opening: string;
  status: "Draft" | "In Review" | "Ready to Pitch" | "Executed";
  updatedAt: string;
}

const DEFAULT_PROJECTS: SavedProject[] = [
  {
    id: "proj-1",
    title: "Pushpa 2: The Rule — 5-Language GTM War Deck",
    film: "Pushpa 2: The Rule",
    budgetCr: 45,
    impressions: "830M",
    day1Opening: "₹193 Cr",
    status: "Executed",
    updatedAt: "Oct 11, 2026",
  },
  {
    id: "proj-2",
    title: "Devara: Part 1 — North America Midnight Premiere Blitz",
    film: "Devara: Part 1",
    budgetCr: 30,
    impressions: "555M",
    day1Opening: "₹142 Cr",
    status: "Ready to Pitch",
    updatedAt: "Sep 28, 2026",
  },
  {
    id: "proj-3",
    title: "Kalki 2898 AD — Comic-Con & Bujji Tour Strategy",
    film: "Kalki 2898 AD",
    budgetCr: 55,
    impressions: "1,020M",
    day1Opening: "₹227 Cr",
    status: "Ready to Pitch",
    updatedAt: "Aug 15, 2026",
  },
];

const TEMPLATES = [
  {
    title: "Pan-India Release GTM Blueprint",
    category: "Campaign Strategy",
    desc: "Complete 120-day promotional roadmap across 5 regional languages with single-screen cutout rally schedule.",
    to: "/campaign",
  },
  {
    title: "Greenlight Risk & Financing Model",
    category: "Producer's Office",
    desc: "Input production budget and pre-sales to calculate breakeven theatrical footfall and unrecovered risk.",
    to: "/strategy",
  },
  {
    title: "8-Week Theatrical to OTT Valuation",
    category: "Industry Intelligence",
    desc: "Calculate revenue loss vs digital license valuation premium across 4, 6, 8, and 12-week windows.",
    to: "/intelligence",
  },
];

export function WorkspacePage() {
  const [projects, setProjects] = useState<SavedProject[]>(DEFAULT_PROJECTS);
  const [activeTab, setActiveTab] = useState<"projects" | "simulations" | "templates">("projects");
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cineverse_saved_campaigns");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects([...parsed, ...DEFAULT_PROJECTS]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem("cineverse_saved_campaigns", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportAll = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <CineVerseNav />

      {/* Hero Header */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <Briefcase className="w-4 h-4" />
            <span>08 · MY WORKSPACE — THE CREATIVE DESK</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
                Creative Desk <span className="text-ember italic">& Saved Projects</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
                Your organized command center for saved campaign decks, financial simulation models,
                and research intelligence briefs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/campaign"
                className="flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-xs uppercase tracking-widest font-bold text-ink hover:bg-ember/90 transition-all shadow-[0_0_20px_rgba(224,103,30,0.35)]"
              >
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </Link>
              <button
                onClick={handleExportAll}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-4 py-2.5 text-xs uppercase tracking-widest font-semibold text-foreground hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4 text-ember" />
                <span>{exportNotice ? "Dossier Exported!" : "Export All"}</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 flex items-center gap-2 pt-2">
            {[
              { id: "projects", label: `Campaign Decks (${projects.length})` },
              { id: "simulations", label: "Simulation Runs" },
              { id: "templates", label: "Executive Templates" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-ember text-ink shadow-[0_0_15px_rgba(224,103,30,0.3)] font-bold"
                    : "border border-border/40 bg-black/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Workspace Grid */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-border/50 bg-card/70 p-6 backdrop-blur-sm transition-all hover:border-ember/60 hover:shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                        proj.status === "Executed"
                          ? "bg-purple-950/60 text-purple-300 border border-purple-500/40"
                          : proj.status === "Ready to Pitch"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                          : "bg-amber-950/60 text-amber-300 border border-amber-500/40"
                      }`}>
                        {proj.status}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">Updated: {proj.updatedAt}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-foreground">{proj.title}</h3>
                    <p className="text-xs text-muted-foreground">Film Anchor: <strong className="text-foreground">{proj.film}</strong></p>
                  </div>

                  {/* Metrics Row */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground font-mono block">Marketing Budget</span>
                      <p className="font-display text-xl text-gold-gradient">₹{proj.budgetCr} Cr</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground font-mono block">Projected Day-1</span>
                      <p className="font-display text-xl text-emerald-400">{proj.day1Opening}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground font-mono block">Est. Impressions</span>
                      <p className="font-display text-xl text-foreground">{proj.impressions}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 md:pt-0">
                      <Link
                        to="/campaign"
                        className="rounded-xl border border-border/60 bg-white/5 px-3 py-2 text-xs font-semibold text-foreground hover:bg-white/10"
                      >
                        Edit in War Room
                      </Link>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="rounded-xl border border-border/40 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-950/20"
                        title="Delete Deck"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMULATIONS TAB */}
        {activeTab === "simulations" && (
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                engine: "Greenlight Decision Engine",
                title: "Pan-India Mythological Tentpole (₹350 Cr Negative Cost)",
                result: "GREENLIGHT RECOMMENDED",
                verdict: "Risk Score: Moderate Risk · Breakeven Target: ₹360 Cr Domestic Net",
                date: "Oct 10, 2026",
              },
              {
                engine: "Window Wars Model",
                title: "8-Week vs 4-Week Streaming Tradeoff",
                result: "+₹48 Cr Net Surplus on 8-Week Window",
                verdict: "Retention of repeat single-screen footfall outweighed 4-week OTT license premium by ₹48 Cr.",
                date: "Oct 08, 2026",
              },
            ].map((sim, i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
                <span className="text-xs font-mono text-ember font-bold">{sim.engine}</span>
                <h4 className="font-display text-2xl text-foreground">{sim.title}</h4>
                <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs font-bold text-emerald-400">
                  {sim.result}
                </div>
                <p className="text-xs text-muted-foreground">{sim.verdict}</p>
                <div className="pt-2 text-[10px] font-mono text-muted-foreground">Ran on {sim.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === "templates" && (
          <div className="grid gap-6 sm:grid-cols-3">
            {TEMPLATES.map((tmpl) => (
              <div key={tmpl.title} className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-ember font-bold">{tmpl.category}</span>
                  <h4 className="font-display text-2xl text-foreground mt-1">{tmpl.title}</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{tmpl.desc}</p>
                </div>
                <Link
                  to={tmpl.to}
                  className="mt-6 inline-flex items-center justify-between rounded-xl bg-white/5 border border-border/50 px-4 py-2.5 text-xs font-bold text-foreground hover:bg-white/10 hover:border-ember transition-colors"
                >
                  <span>Launch Template</span>
                  <ArrowUpRight className="w-4 h-4 text-ember" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
