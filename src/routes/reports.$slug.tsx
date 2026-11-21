import { createFileRoute, Link, notFound } from "@tanstack/react-router";

const REPORTS: Record<string, { title: string; kicker: string; body: string[]; takeaway: string }> = {
  "theatres-survive": {
    title: "Why theatres still survive the OTT era",
    kicker: "Report 01 · Distribution",
    body: [
      "The obituary was premature. Five years after streaming's compressed decade of growth, theatres are back — but not as habits. They're back as events.",
      "The multiplex has quietly reinvented itself around three product lines: the tentpole opening, the premium format (IMAX / 4DX), and the F&B-first family outing. Together they defend 58% of national revenue against an OTT flywheel that already owns lifetime value.",
      "The signal to watch isn't ticket count — it's average revenue per admit. When ARPA is climbing while footfalls dip, the industry is trading volume for occasion. That's not decline. That's segmentation.",
    ],
    takeaway: "Theatres won't out-scale streaming. They'll out-occasion it.",
  },
  "reviews-impact": {
    title: "Impact of reviews on movie success",
    kicker: "Report 02 · Reviews & WOM",
    body: [
      "Opening weekend is bought. Second weekend is earned. The clearest signal in our dataset is a 32% higher day-8-to-day-3 hold for every full point of audience rating above 7.",
      "Critic scores barely correlate with revenue below the 6.5 line — the audience simply outvotes the critics. Above 7.5 the two align sharply, and the film enters the word-of-mouth compounding zone.",
      "Sentiment moves faster than ratings. Track first-24-hour social velocity as a leading indicator for the second-weekend hold; ratings sites confirm the signal a week later.",
    ],
    takeaway: "Hype opens a film. Reviews decide whether it has a second act.",
  },
  "covid-reshaped": {
    title: "How COVID reshaped consumption",
    kicker: "Report 03 · Behavioural shift",
    body: [
      "COVID compressed a decade of OTT adoption into eighteen months. The behavioural change is now durable — the average household has 2.4 OTT subscriptions and watches 11.6 hours of long-form content per week.",
      "The theatre business didn't die; it de-risked. Wide, multi-language releases give distributors optionality: a soft opening in one region can be rescued by another. That optionality didn't exist pre-2020.",
      "The most interesting effect is on production itself. Mid-budget films (₹15–40 Cr) have almost disappeared from theatres and moved to platforms as originals. The middle collapsed; the poles thrive.",
    ],
    takeaway: "COVID didn't kill theatres. It hollowed out the middle and made the ends sharper.",
  },
};

export const Route = createFileRoute("/reports/$slug")({
  loader: ({ params }) => {
    const r = REPORTS[params.slug];
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} · CineVerse` },
          { name: "description", content: loaderData.takeaway },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.takeaway },
        ]
      : [{ title: "Report not found · CineVerse" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background p-16 text-center">
      <p className="font-display text-4xl">This report isn't in the archive.</p>
      <Link to="/" className="mt-6 inline-block text-ember">← Back to CineVerse</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen bg-background p-16 text-center">
      <p className="font-display text-4xl">The projector jammed.</p>
      <button onClick={reset} className="mt-6 rounded-full bg-ember px-6 py-2 text-ink">Try again</button>
    </div>
  ),
  component: Report,
});

function Report() {
  const r = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-10">
        <Link to="/" className="text-[10px] uppercase tracking-[0.4em] text-ember/80 hover:text-ember">
          ← Back to CineVerse
        </Link>
        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-ember/80">{r.kicker}</p>
        <h1 className="mt-2 font-display text-5xl leading-tight md:text-7xl">{r.title}</h1>
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          {r.body.map((p: string) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-16 rounded-2xl border border-ember/40 bg-ember/5 p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ember/80">Takeaway</p>
          <p className="mt-3 font-display text-2xl italic">{r.takeaway}</p>
        </div>
      </div>
    </main>
  );
}