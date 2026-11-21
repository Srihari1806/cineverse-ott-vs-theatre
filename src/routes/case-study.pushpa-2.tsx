import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/casestudy-hero.jpg";

export const Route = createFileRoute("/case-study/pushpa-2")({
  head: () => ({
    meta: [
      { title: "Pushpa 2 — Anatomy of a Phenomenon · CineVerse" },
      { name: "description", content: "How a regional Telugu action franchise became a pan-India phenomenon: hype, opening, reviews, and the OTT afterlife." },
      { property: "og:title", content: "Pushpa 2 — Anatomy of a Phenomenon" },
      { property: "og:description", content: "A CineVerse case study on pan-India cinema, hype cycles, and box-office to OTT flow." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: CaseStudy,
});

const timeline = [
  { phase: "Pre-release hype", note: "12 M+ trailer views in 24h. Meme wave across Telugu, Hindi, Tamil timelines." },
  { phase: "Opening", note: "₹165 Cr worldwide day 1 — biggest Indian opening of the year." },
  { phase: "Reviews impact", note: "7.9 avg audience rating; critics split. Day-3 hold at 62%." },
  { phase: "OTT release", note: "Netflix drop 8 weeks post-theatrical. 42 M streams in week one." },
];

function CaseStudy() {
  return (
    <main className="bg-background text-foreground">
      <div className="relative h-[70vh] overflow-hidden">
        <img src={hero} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
          <Link to="/" className="mb-6 text-[10px] uppercase tracking-[0.4em] text-ember/80 hover:text-ember">
            ← Back to CineVerse
          </Link>
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember/80">Case Study · 01</p>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">
            The Rule of <span className="italic text-ember">Pushpa</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            How a regional Telugu action franchise crossed languages, states and screens to become a
            pan-India phenomenon — and what it says about the future of Indian cinema.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["₹1,243 Cr", "Worldwide gross"],
            ["67.3%", "Peak occupancy"],
            ["8.3 / 10", "Audience rating"],
            ["128.7 M", "OTT views"],
          ].map(([v, l]) => (
            <div key={l} className="glass-panel rounded-2xl p-5">
              <p className="font-display text-3xl text-ember">{v}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-10">
          {timeline.map((t, i) => (
            <div key={t.phase} className="grid gap-4 border-l-2 border-ember/40 pl-6 md:grid-cols-[160px_1fr]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ember/80">Reel {String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="font-display text-2xl">{t.phase}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.note}</p>
              </div>
            </div>
          ))}
        </div>

        <blockquote className="mt-16 border-l-4 border-ember pl-6 font-display text-3xl italic leading-snug md:text-4xl">
          "Pushpa didn't dub itself into other languages. It <span className="text-ember">translated</span> a subculture."
        </blockquote>

        <div className="mt-16 rounded-2xl border border-white/10 p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ember/80">Takeaway</p>
          <p className="mt-3 text-lg leading-relaxed">
            Pan-India isn't a language strategy — it's an <span className="italic text-ember">audience</span> strategy.
            The films that travel are the ones that build a fandom before they build a marketing plan.
          </p>
        </div>
      </section>
    </main>
  );
}