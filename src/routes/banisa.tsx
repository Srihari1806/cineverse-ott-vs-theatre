import { createFileRoute } from "@tanstack/react-router";
import { ArenaScene } from "@/components/arena/arena-scene";

const title = "Banisa Wall — Superstar Arena | CineVerse";
const description =
  "Walk into a cinematic Indian single-screen theatre at night: six giant hero cutouts, a roaring fan crowd and festive atmosphere.";

export const Route = createFileRoute("/banisa")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BanisaPage,
});

function BanisaPage() {
  return (
    <main className="h-dvh w-full overflow-hidden">
      <ArenaScene />
    </main>
  );
}
