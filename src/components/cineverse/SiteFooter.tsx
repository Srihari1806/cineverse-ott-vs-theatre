import { Link } from "@tanstack/react-router";
import logo from "@/assets/cineverse-logo.png";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-ink py-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} width={36} height={36} alt="CineVerse" className="h-9 w-9" />
            <span className="font-display text-lg">
              Cine<span className="text-ember">Verse</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A production about the modern movie industry — how content, audience and business
            move between the two screens that matter.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ember/70">
            Directed by a movie buff · A CineVerse presentation
          </p>
        </div>
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-ember font-semibold">CineVerse OS</p>
          <ul className="space-y-2 text-xs">
            <li><Link to="/explore" className="text-muted-foreground hover:text-ember transition-colors">01 Explore Film Universe</Link></li>
            <li><Link to="/craft" className="text-muted-foreground hover:text-ember transition-colors">02 Craft Studio & Labs</Link></li>
            <li><Link to="/campaign" className="text-muted-foreground hover:text-ember transition-colors">03 Campaign War Room</Link></li>
            <li><Link to="/intelligence" className="text-muted-foreground hover:text-ember transition-colors">04 Box Office Intelligence</Link></li>
            <li><Link to="/strategy" className="text-muted-foreground hover:text-ember transition-colors">05 Strategy Decision Lab</Link></li>
            <li><Link to="/journal" className="text-muted-foreground hover:text-ember transition-colors">06 Cinema Journal</Link></li>
            <li><Link to="/banisa" className="text-muted-foreground hover:text-gold transition-colors">07 Banisa Wall (Preserved)</Link></li>
            <li><Link to="/workspace" className="text-muted-foreground hover:text-foreground transition-colors">08 My Creative Desk</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Intelligence & Research</p>
          <ul className="space-y-2 text-xs">
            <li><Link to="/case-study/pushpa-2" className="text-muted-foreground hover:text-ember transition-colors">Case Study: Pushpa 2</Link></li>
            <li><Link to="/reports/theatres-survive" className="text-muted-foreground hover:text-ember transition-colors">Why Theatres Survive OTT</Link></li>
            <li><Link to="/reports/reviews-impact" className="text-muted-foreground hover:text-ember transition-colors">Impact of Review Aggregators</Link></li>
            <li><Link to="/reports/covid-reshaped" className="text-muted-foreground hover:text-ember transition-colors">COVID Consumption Shifts</Link></li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        End of reel · © CineVerse
      </p>
    </footer>
  );
}