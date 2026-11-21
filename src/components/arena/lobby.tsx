import lobby from "@/assets/lobby.jpg";

export function Lobby() {
  return (
    <section id="lobby" className="relative isolate min-h-screen overflow-hidden py-24">
      {/* Grand Lobby Backdrop Image */}
      <img
        src={lobby}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/60 to-background" />

      <div className="mx-auto flex min-h-[75vh] max-w-6xl flex-col items-center justify-center px-6">
        {/* Big screen gateway in the lobby */}
        <div className="w-full max-w-4xl overflow-hidden rounded-sm border border-primary/30 bg-card/60 backdrop-blur-sm">
          <div className="relative aspect-[21/9] bg-black">
            <div className="animate-pulse-glow absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_28%,transparent),transparent_70%)]" />
            <div className="bulb-strip animate-flicker absolute inset-x-0 bottom-0 h-4 opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
}
