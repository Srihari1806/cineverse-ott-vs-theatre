import { Link } from "@tanstack/react-router";
import {
  Compass,
  Film,
  Megaphone,
  BarChart3,
  Sliders,
  BookOpen,
  Sparkles,
  Briefcase,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";

export const PILLARS_DATA = [
  {
    num: "01",
    id: "explore",
    title: "Explore",
    tagline: "The Film Universe",
    desc: "Interactive encyclopedia of cinema: films, star collaborators, directors, composers, and production houses with commercial & creative lineage.",
    icon: Compass,
    link: "/explore",
    badge: "Cinema Encyclopedia",
    stats: "1,200+ Films · 480 Studios",
    accent: "from-amber-500/20 to-transparent",
    border: "border-amber-500/30 hover:border-amber-500/70",
    buttonText: "Browse Film Universe",
  },
  {
    num: "02",
    id: "craft",
    title: "Craft Studio",
    tagline: "The Filmmaking Laboratory",
    desc: "Catalogue of 24+ crafts with live workspaces: StoryDNA (tension curves), FrameLab (aspect ratios), CutLab (pacing rhythm), and SoundLab (Atmos vs OTT).",
    icon: Film,
    link: "/craft",
    badge: "Interactive Lab",
    stats: "24 Disciplines · 4 Workspaces",
    accent: "from-orange-500/20 to-transparent",
    border: "border-orange-500/30 hover:border-orange-500/70",
    buttonText: "Launch Craft Lab",
  },
  {
    num: "03",
    id: "campaign",
    title: "Campaign Studio",
    tagline: "The Creative War Room",
    desc: "Professional release war room for marketing strategists: GTM roadmaps, audience persona targeting, promotional asset matrix, and multi-channel budget allocation.",
    icon: Megaphone,
    link: "/campaign",
    badge: "War Room & GTM",
    stats: "GTM Plans · Budget Simulator",
    accent: "from-red-500/20 to-transparent",
    border: "border-red-500/30 hover:border-red-500/70",
    buttonText: "Open War Room",
  },
  {
    num: "04",
    id: "intelligence",
    title: "Intelligence",
    tagline: "The Projection Lab",
    desc: "Analytical research engine tracking theatrical decay vs streaming lift, 8-week window revenue splits, audience sentiment radars, and studio valuations.",
    icon: BarChart3,
    link: "/intelligence",
    badge: "Research & Benchmarks",
    stats: "Box Office · OTT Analytics",
    accent: "from-blue-500/20 to-transparent",
    border: "border-blue-500/30 hover:border-blue-500/70",
    buttonText: "View Industry Data",
  },
  {
    num: "05",
    id: "strategy",
    title: "Strategy Lab",
    tagline: "The Producer's Office",
    desc: "Interactive business simulation tools: Greenlight Risk Score, Release Clash Chess, Window Wars (4 vs 8 vs 12 weeks), and Screen Economics.",
    icon: Sliders,
    link: "/strategy",
    badge: "Business Simulators",
    stats: "5 Decision Engines",
    accent: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-500/70",
    buttonText: "Run Simulations",
  },
  {
    num: "06",
    id: "journal",
    title: "Cinema Journal",
    tagline: "The Editorial Room",
    desc: "Cinematic magazine interface featuring deep-dive essays, box-office post-mortems, craft breakdowns, reading progress, and links to live experiments.",
    icon: BookOpen,
    link: "/journal",
    badge: "Editorial & Essays",
    stats: "100+ Research Articles",
    accent: "from-purple-500/20 to-transparent",
    border: "border-purple-500/30 hover:border-purple-500/70",
    buttonText: "Read Journal",
  },
  {
    num: "07",
    id: "banisa",
    title: "Banisa Wall",
    tagline: "The Superstar Arena",
    desc: "The iconic festive Indian cinema experience preserved: towering superstar cutouts, celebration confetti, crowd cheering, and marquee energy.",
    icon: Sparkles,
    link: "/banisa",
    badge: "Preserved Fan Arena",
    stats: "6 Superstars · 2.5D Parallax",
    accent: "from-yellow-500/20 to-transparent",
    border: "border-yellow-500/30 hover:border-yellow-500/70",
    buttonText: "Step into Arena",
  },
  {
    num: "08",
    id: "workspace",
    title: "My Workspace",
    tagline: "The Creative Desk",
    desc: "Central repository for your saved campaigns, film experiments, research bookmarks, simulation runs, and exportable pitch-ready executive dossiers.",
    icon: Briefcase,
    link: "/workspace",
    badge: "Personal Creative Hub",
    stats: "Saved Projects & Reports",
    accent: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-500/70",
    buttonText: "Access Your Desk",
  },
];

export function PillarsShowcase() {
  return (
    <section className="relative bg-background py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-border/40 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ember/10 border border-ember/30 px-3.5 py-1 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>CineVerse Architecture</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-foreground tracking-tight">
              Entertainment Innovation <span className="text-ember italic">& Intelligence OS</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
              Beyond OTT vs Theatre — explore the 8 interconnected pillars unifying storytelling craft,
              marketing war rooms, audience intelligence, and industry decision modeling.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">8 LIVE ENVIRONMENTS</span>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* 8 Pillar Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS_DATA.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${pillar.border} bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black`}
              >
                {/* Top Subtle Glow */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${pillar.accent} opacity-40 group-hover:opacity-100 transition-opacity`}
                />

                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-muted-foreground/60 tracking-wider">
                      {pillar.num}
                    </span>
                    <span className="rounded-full bg-white/5 border border-border/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-border/40 group-hover:scale-110 group-hover:border-ember transition-all">
                      <Icon className="h-5 w-5 text-ember" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-foreground group-hover:text-ember transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                    {pillar.desc}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground/80">
                    {pillar.stats}
                  </span>
                  <Link
                    to={pillar.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ember group-hover:translate-x-1 transition-transform"
                  >
                    <span>{pillar.buttonText}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Strategic Deep-Dive Banner */}
        <div className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-r from-card via-black/80 to-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(224,103,30,0.15),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.35em] text-ember font-bold">
                ⭐ SIGNATURE CASE STUDY
              </span>
              <h3 className="font-display text-3xl sm:text-5xl text-foreground mt-2">
                Pushpa 2: The Rule — Anatomy of a Pan-India Phenomenon
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                How ₹165 Cr Day-1 Theatrical Mania transitioned into a 42M-stream Netflix digital
                afterlife across 5 regional languages.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/case-study/pushpa-2"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-widest font-bold text-ink hover:bg-ember/90 transition-all shadow-[0_0_20px_rgba(224,103,30,0.35)]"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/campaign"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-5 py-3 text-xs uppercase tracking-widest font-semibold text-foreground hover:bg-white/10 transition-all"
              >
                <span>Simulate Pushpa GTM</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
