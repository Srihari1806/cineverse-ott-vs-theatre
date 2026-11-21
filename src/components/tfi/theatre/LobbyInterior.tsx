/**
 * The Theatre Lobby Foyer. Past the entrance doors.
 * A 3D perspective corridor with polished marble floor reflections, illuminated golden pilasters,
 * crimson velvet drapery, and warm cinematic lighting.
 * Completely cleared of previous placeholder text/data, ready for next instructions.
 */
export function LobbyInterior() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--background)] py-20">
      {/* ── 3D Corridor Architecture ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Ambient radial glow from auditorium entrance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 42%, oklch(0.32 0.10 65 / 0.65) 0%, oklch(0.14 0.03 45 / 0.7) 45%, oklch(0.07 0.01 40) 85%)",
          }}
        />

        {/* Polished marble floor with reflected light bands */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%]"
          style={{
            background:
              "linear-gradient(to top, oklch(0.16 0.03 45) 0%, oklch(0.11 0.02 42) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[44%] opacity-35"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0 60px, oklch(0.85 0.16 75 / 0.4) 60px 62px)",
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
            transform: "perspective(500px) rotateX(62deg)",
            transformOrigin: "50% 100%",
          }}
        />

        {/* Illuminated golden pilasters along the foyer walls */}
        {[6, 20, 80, 94].map((x, i) => (
          <div
            key={x}
            className="absolute top-0 h-full w-[3.8%]"
            style={{
              left: `${x}%`,
              background:
                "linear-gradient(90deg, oklch(0.13 0.02 45), oklch(0.26 0.06 60) 30%, oklch(0.32 0.08 65) 50%, oklch(0.22 0.05 58) 72%, oklch(0.11 0.018 42))",
              boxShadow: "0 0 50px oklch(0.75 0.16 68 / 0.3)",
            }}
          >
            <div
              className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, oklch(0.92 0.16 78), transparent)",
                animation: `pillar-glow ${5 + i}s ease-in-out ${i * 0.7}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4">
        {/* ── Main Gateway Portal to Auditorium ── */}
        <div className="w-full max-w-3xl">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-md border-4 border-[oklch(0.25_0.05_55)] shadow-[0_30px_100px_-10px_oklch(0.85_0.16_75_/_0.4)]"
            style={{
              background: "linear-gradient(180deg, oklch(0.16 0.03 45), oklch(0.09 0.015 40))",
            }}
          >
            {/* Velvet curtains draped on sides */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[12%] bg-gradient-to-r from-[oklch(0.35_0.15_25)] to-transparent opacity-90"
              style={{ clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[12%] bg-gradient-to-l from-[oklch(0.35_0.15_25)] to-transparent opacity-90"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)" }}
            />

            {/* Warm cinematic light screen glow */}
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,oklch(0.9_0.16_78_/_0.3)_0%,oklch(0.12_0.02_40)_80%)]">
              <div className="h-32 w-32 rounded-full border-2 border-[oklch(0.85_0.16_78)] opacity-25 filter blur-sm animate-pulse" />
            </div>

            {/* Projector beam scanlines */}
            <div
              className="pointer-events-none absolute inset-0 animate-[flicker_5s_infinite]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, transparent 40%, oklch(0 0 0 / 0.5) 100%)",
              }}
            />
            <div className="film-grain pointer-events-none absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
