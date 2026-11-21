import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import facade from "@/assets/theatre-facade.jpg";
import crowd from "@/assets/crowd.jpg";
import lobbyImg from "@/assets/lobby.jpg";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import hero6 from "@/assets/hero-6.png";

const HERO_CUTOUTS = [
  { id: "prabhas", image: hero1, x: 10, depth: 0.72 },
  { id: "pawan", image: hero2, x: 25, depth: 0.78 },
  { id: "charan", image: hero3, x: 40, depth: 0.85 },
  { id: "allu", image: hero4, x: 58, depth: 0.85 },
  { id: "ntr", image: hero5, x: 73, depth: 0.78 },
  { id: "mahesh", image: hero6, x: 88, depth: 0.72 },
];

export function BanisaVRTheatre() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [view, setView] = useState<"plaza" | "lobby">("plaza");
  const [isDollying, setIsDollying] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointer = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setPointer({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const layerStyle = (depth: number) => ({
    transform: `translate3d(${-pointer.x * 42 * depth}px, ${-pointer.y * 20 * depth}px, 0)`,
    transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)",
  });

  const enterLobby = () => {
    setIsDollying(true);
    setTimeout(() => {
      setView("lobby");
      setIsDollying(false);
    }, 750);
  };

  const exitLobby = () => {
    setIsDollying(true);
    setTimeout(() => {
      setView("plaza");
      setIsDollying(false);
    }, 750);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointer}
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-[oklch(0.06_0.01_40)] font-sans"
      style={{ perspective: "1400px" }}
    >
      <AnimatePresence mode="wait">
        {view === "plaza" ? (
          <motion.div
            key="plaza"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: isDollying ? 0 : 1,
              scale: isDollying ? 2.3 : 1,
            }}
            exit={{ opacity: 0, scale: 2.3 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="relative h-full w-full overflow-hidden"
          >
            {/* ── Night Sky, Sweeping Searchlights & Fireworks ── */}
            <SkyFireworksLayer />

            {/* ── Multi-Tier Grand Theatre Architecture & Facade ── */}
            <div className="absolute inset-0 z-10" style={layerStyle(0.35)}>
              <img
                src={facade}
                alt=""
                aria-hidden
                width={1920}
                height={1088}
                className="h-full w-full object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_72%,transparent_20%,rgba(0,0,0,0.85))]" />

              {/* Text-free Vertical Hoardings on Side Pillars */}
              <g className="pointer-events-none">
                <div
                  className="absolute left-[3%] top-[22%] h-[32%] w-[12%] rounded-sm border-2 border-[oklch(0.72_0.19_30)] bg-black/60 shadow-[0_0_30px_oklch(0.72_0.19_30_/_0.5)]"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.24 0.09 28), oklch(0.12 0.02 40))",
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-2 border-[oklch(0.9_0.16_80)] bg-[oklch(0.72_0.2_30)] filter blur-xs animate-pulse" />
                  </div>
                </div>
                <div
                  className="absolute right-[3%] top-[22%] h-[32%] w-[12%] rounded-sm border-2 border-[oklch(0.85_0.17_82)] bg-black/60 shadow-[0_0_30px_oklch(0.85_0.17_82_/_0.5)]"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.2 0.08 265), oklch(0.12 0.02 40))",
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-2 border-[oklch(0.92_0.16_85)] bg-[oklch(0.62_0.2_300)] filter blur-xs animate-pulse" />
                  </div>
                </div>
              </g>

              {/* ── Central Marquee Canopy & Middle Entrance Portal ── */}
              <div
                className="group absolute bottom-[22%] left-1/2 z-30 h-[20%] w-[22%] -translate-x-1/2 cursor-pointer"
                onClick={enterLobby}
                title="Walk into Theatre Lobby"
              >
                {/* Entrance door warm glowing aura */}
                <div className="absolute inset-0 rounded-t-full bg-[radial-gradient(ellipse_at_center,oklch(0.94_0.16_78_/_0.9)_0%,oklch(0.65_0.15_60_/_0.5)_50%,transparent_85%)] transition-all duration-500 group-hover:scale-125 filter blur-xs" />
                
                {/* Light beam spilling out onto the red carpet */}
                <div className="absolute inset-x-[-40%] bottom-0 h-full bg-gradient-to-t from-[oklch(0.95_0.16_78_/_0.7)] via-[oklch(0.7_0.15_60_/_0.25)] to-transparent opacity-70 transition-opacity group-hover:opacity-100 animate-pulse" />
              </div>
            </div>

            {/* ── The 6 Superstar Cutout Standees (Standing on Marquee Ledge) ── */}
            <div className="absolute inset-0 z-20 pointer-events-auto" style={layerStyle(0.72)}>
              <div className="relative h-full w-full">
                {HERO_CUTOUTS.map((h, i) => (
                  <div
                    key={h.id}
                    className="absolute bottom-[28%] origin-bottom transition-all duration-500 ease-out"
                    style={{
                      left: `${h.x}%`,
                      transform: `translateX(-50%) scale(${focusedId === h.id ? 1.09 : 1})`,
                      zIndex: focusedId === h.id ? 35 : 20,
                      filter:
                        focusedId !== null && focusedId !== h.id
                          ? "brightness(0.5) saturate(0.6)"
                          : "none",
                    }}
                    onMouseEnter={() => setFocusedId(h.id)}
                    onMouseLeave={() => setFocusedId(null)}
                  >
                    {/* Golden Spotlight Cone behind cutout */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[140%] w-[240%] -translate-x-1/2 transition-opacity duration-500"
                      style={{
                        opacity: focusedId === h.id ? 0.95 : 0.3,
                        background:
                          "conic-gradient(from 180deg at 50% 0%, transparent 155deg, color-mix(in oklab, var(--gold) 50%, transparent) 180deg, transparent 205deg)",
                        filter: "blur(12px)",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setFocusedId(h.id)}
                      className="group relative block cursor-pointer bg-transparent focus:outline-none"
                    >
                      {/* Scaffolding structure behind cutout */}
                      <div
                        aria-hidden
                        className="absolute inset-x-[-8%] bottom-0 top-[4%] -z-10 opacity-45"
                        style={{
                          background:
                            "linear-gradient(90deg, color-mix(in oklab, var(--gold-deep) 60%, transparent) 0 3px, transparent 3px calc(100% - 3px), color-mix(in oklab, var(--gold-deep) 60%, transparent) calc(100% - 3px) 100%), repeating-linear-gradient(0deg, transparent 0 48px, color-mix(in oklab, var(--gold-deep) 35%, transparent) 48px 50px)",
                        }}
                      />

                      {/* Standee Cutout PNG Image */}
                      <img
                        src={h.image}
                        alt=""
                        aria-hidden
                        width={640}
                        height={1280}
                        loading="lazy"
                        className="animate-sway w-auto max-w-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
                        style={{
                          height: "clamp(220px, 32vw, 440px)",
                          filter:
                            focusedId === h.id
                              ? "drop-shadow(0 0 34px color-mix(in oklab, var(--gold) 90%, transparent))"
                              : "drop-shadow(0 0 14px rgba(0,0,0,0.65))",
                        }}
                      />

                      {/* LED Bulb Strip at Cutout Base */}
                      <span
                        aria-hidden
                        className="bulb-strip animate-flicker pointer-events-none absolute inset-x-[-10%] bottom-[-8px] h-3.5 opacity-90"
                      />

                      {/* Marigold Garland Drape across base */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-[-6%] bottom-0 h-2.5 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, oklch(0.78 0.19 65), oklch(0.62 0.2 30), oklch(0.78 0.19 65))",
                          boxShadow: "0 0 10px oklch(0.78 0.19 65 / 0.6)",
                        }}
                      />

                      {/* Mahesh Babu Special Garland Accent */}
                      {h.id === "mahesh" && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute top-[28%] left-[20%] w-[60%] h-[35%] border-4 border-[oklch(0.78_0.19_65)] rounded-full opacity-90"
                          style={{
                            boxShadow: "0 0 14px oklch(0.78 0.19 65 / 0.8)",
                          }}
                        />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Intense Paper Confetti & Sparks Hungama Field ── */}
            <HungamaCanvas />

            {/* ── Cheering Crowd & Central Red Carpet Way to Lobby ── */}
            <div className="absolute inset-x-0 bottom-0 z-40 h-[38%] pointer-events-none" style={layerStyle(1.2)}>
              {/* Dense Crowd Image with Glowing Phone Flashlights */}
              <img
                src={crowd}
                alt=""
                aria-hidden
                width={1920}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover object-bottom mix-blend-screen"
              />
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />

              {/* Central Glowing Red Carpet Pathway leading straight into middle entrance */}
              <div
                className="pointer-events-auto absolute bottom-0 left-1/2 h-[86%] w-[24%] -translate-x-1/2 cursor-pointer shadow-[0_0_80px_oklch(0.68_0.22_30_/_0.9)]"
                style={{
                  clipPath: "polygon(36% 0%, 64% 0%, 92% 100%, 8% 100%)",
                  background:
                    "linear-gradient(180deg, oklch(0.72 0.22 30 / 0.95) 0%, oklch(0.48 0.2 25 / 0.98) 100%)",
                }}
                onClick={enterLobby}
                title="Walk into Theatre Lobby"
              >
                {/* Gold trim borders */}
                <div className="absolute inset-y-0 left-0 w-[4%] bg-[var(--gold-foil)] opacity-90" />
                <div className="absolute inset-y-0 right-0 w-[4%] bg-[var(--gold-foil)] opacity-90" />

                {/* Pulsating direction chevrons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-90 animate-pulse">
                  <div className="h-0 w-0 border-x-8 border-b-12 border-x-transparent border-b-[var(--gold-foil)]" />
                  <div className="h-0 w-0 border-x-8 border-b-12 border-x-transparent border-b-[var(--gold-foil)]" />
                </div>
              </div>
            </div>

            {/* ── Ambient Gold Glow ── */}
            <div
              aria-hidden
              className="animate-pulse-glow pointer-events-none absolute inset-0 z-50"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--ember) 22%, transparent), transparent 55%)",
              }}
            />
          </motion.div>
        ) : (
          /* ── Theatre Lobby Foyer View (Entered Through Middle Pathway) ── */
          <motion.div
            key="lobby"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="relative h-full w-full overflow-hidden"
          >
            {/* Grand Lobby Backdrop Image */}
            <img
              src={lobbyImg}
              alt=""
              aria-hidden
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/80" />

            {/* VR Lobby Foyer Environment */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
              {/* Big Screen Frame Portal in Lobby */}
              <div className="w-full max-w-4xl overflow-hidden rounded-sm border border-primary/30 bg-card/60 backdrop-blur-sm shadow-[0_30px_100px_-10px_oklch(0.85_0.16_75_/_0.4)]">
                <div className="relative aspect-[21/9] bg-black">
                  <div className="animate-pulse-glow absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_28%,transparent),transparent_70%)]" />
                  <div className="bulb-strip animate-flicker absolute inset-x-0 bottom-0 h-4 opacity-70" />
                </div>
              </div>

              {/* Exit Door Icon to walk back outside */}
              <button
                type="button"
                onClick={exitLobby}
                title="Walk back outside"
                className="absolute bottom-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-black/60 text-primary backdrop-blur-md transition-all hover:scale-110 hover:border-primary hover:bg-primary/20"
              >
                <span className="text-xl">🚪</span>
              </button>
            </div>

            <div className="film-grain pointer-events-none absolute inset-0 z-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** SVG Night Sky, Searchlights and Fireworks */
function SkyFireworksLayer() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-background overflow-hidden">
      {/* Night Sky Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.03 285) 0%, oklch(0.12 0.04 300) 30%, oklch(0.18 0.06 40) 65%, oklch(0.32 0.11 58) 100%)",
        }}
      />

      {/* 4 Sweeping Volumetric Laser Searchlights */}
      {[
        { left: "10%", dur: 12, delay: 0 },
        { left: "32%", dur: 16, delay: 2 },
        { left: "68%", dur: 14, delay: 1 },
        { left: "90%", dur: 18, delay: 3 },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 origin-bottom"
          style={{
            left: b.left,
            width: "clamp(70px, 8vw, 140px)",
            height: "130%",
            marginLeft: "-4vw",
            background:
              "linear-gradient(to top, oklch(0.92 0.16 80 / 0.28) 0%, transparent 80%)",
            filter: "blur(12px)",
            clipPath: "polygon(35% 100%, 65% 100%, 100% 0, 0 0)",
            animation: `searchlight-sweep ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Particle Canvas: Flying Papers, Confetti, Embers and Sparklers */
function HungamaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rot: number;
      vrot: number;
      kind: 0 | 1 | 2; // 0: confetti, 1: paper, 2: ember
      hue: number;
    };

    const particles: P[] = [];
    const spawn = (initial: boolean): P => {
      const kind = Math.random() < 0.45 ? 0 : Math.random() < 0.75 ? 1 : 2;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -30,
        vx: (Math.random() - 0.5) * 0.7,
        vy: kind === 2 ? -0.3 - Math.random() * 0.6 : 0.45 + Math.random() * 1.2,
        size: kind === 0 ? 4 + Math.random() * 6 : kind === 1 ? 6 + Math.random() * 8 : 1.5 + Math.random() * 2.5,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.08,
        kind,
        hue: [42, 18, 350, 200, 120, 55][Math.floor(Math.random() * 6)],
      };
    };

    for (let i = 0; i < 220; i++) particles.push(spawn(true));

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx + Math.sin((p.y + p.rot * 30) / 80) * 0.5;
        p.y += p.vy;
        p.rot += p.vrot;

        if (p.y > height + 40 || p.y < -60 || p.x < -50 || p.x > width + 50) {
          Object.assign(p, spawn(false));
          if (p.kind === 2) p.y = height + 10;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        if (p.kind === 0) {
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = `hsl(${p.hue}, 95%, 60%)`;
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        } else if (p.kind === 1) {
          ctx.globalAlpha = 0.7;
          ctx.fillStyle = `hsl(42, 40%, 88%)`;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
        } else {
          ctx.globalAlpha = 0.9;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${p.hue}, 100%, 60%)`;
          ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
}
