import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Compass,
  Film,
  Megaphone,
  BarChart3,
  Sliders,
  BookOpen,
  Sparkles,
  Briefcase,
  Menu,
  X,
  Search,
} from "lucide-react";
import logo from "@/assets/cineverse-logo.png";

export const NAV_ITEMS = [
  { label: "Explore", to: "/explore", icon: Compass, badge: "01", desc: "Films, people & studios" },
  { label: "Craft Studio", to: "/craft", icon: Film, badge: "02", desc: "24+ filmmaking disciplines" },
  { label: "Campaign Studio", to: "/campaign", icon: Megaphone, badge: "03", desc: "Creative War Room & GTM" },
  { label: "Intelligence", to: "/intelligence", icon: BarChart3, badge: "04", desc: "Box office & OTT data" },
  { label: "Strategy Lab", to: "/strategy", icon: Sliders, badge: "05", desc: "Simulators & Greenlight" },
  { label: "Cinema Journal", to: "/journal", icon: BookOpen, badge: "06", desc: "Editorial & research" },
  { label: "Banisa Wall", to: "/banisa", icon: Sparkles, badge: "07", desc: "Superstar arena (Preserved)" },
  { label: "Workspace", to: "/workspace", icon: Briefcase, badge: "08", desc: "Your saved projects" },
];

export function CineVerseNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="CineVerse"
              width={34}
              height={34}
              className="h-8.5 w-8.5 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-wider leading-none text-foreground">
                CINE<span className="text-ember">VERSE</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Entertainment OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.to || currentPath.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                    isActive
                      ? "bg-ember/15 text-ember border border-ember/40 shadow-[0_0_15px_rgba(224,103,30,0.25)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-ember" : "text-muted-foreground"}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-ember rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Quick Search & Launch Desk */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground hover:border-ember/40 hover:text-foreground transition-all"
              title="Quick Search OS"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden md:inline text-[11px]">Search OS...</span>
              <kbd className="hidden lg:inline-flex rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground border border-border/40">
                ⌘K
              </kbd>
            </button>

            <Link
              to="/workspace"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ember/90 px-3.5 py-1.5 text-xs font-semibold text-ink hover:bg-ember hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(224,103,30,0.35)]"
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Desk</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/40 bg-black/95 px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-ember/15 text-ember font-semibold border border-ember/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground/60">
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Spotlight Command Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl animate-fade-in"
          >
            <div className="flex items-center border-b border-border/40 px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Jump to Explore, Craft Lab, Campaign Studio, Simulators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                ESC
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              <p className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                CineVerse Destinations ({filteredItems.length})
              </p>
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5 hover:text-ember transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 border border-border/40">
                        <Icon className="h-3.5 w-3.5 text-ember" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{item.badge}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
