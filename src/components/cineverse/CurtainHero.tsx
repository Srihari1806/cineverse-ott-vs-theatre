import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/cineverse-logo.png";
import curtain from "@/assets/curtain.jpg";
import auditorium from "@/assets/auditorium.jpg";

/**
 * Two-act curtain rig:
 *  Act 1: curtains part on scroll → reveal glowing cinema screen (auditorium)
 *  Act 2: on scroll the screen shrinks + rounds corners into a phone/OTT frame
 */
export function CurtainHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Screen morph — from full auditorium screen to phone-sized bright rectangle
  const screenScale = useTransform(scrollYProgress, [0, 1], [1, 0.28]);
  const screenRadius = useTransform(scrollYProgress, [0, 1], [8, 44]);
  const screenAspect = useTransform(scrollYProgress, [0, 1], [2.35, 0.5]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const bezel = useTransform(scrollYProgress, [0.4, 1], [0, 14]);
  const auditoriumOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  // Scroll-driven curtain parting (curtain is closed at top scroll=0, parts as user scrolls down)
  const curtainLeftX = useTransform(scrollYProgress, [0, 0.25], ["0%", "-105%"]);
  const curtainRightX = useTransform(scrollYProgress, [0, 0.25], ["0%", "105%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);

  // Closed curtain text overlay: Disappears INSTANTLY at 0.0001 scroll progress and sets display: none
  const closedPromptOpacity = useTransform(scrollYProgress, [0, 0.0001], [1, 0]);
  const closedPromptDisplay = useTransform(scrollYProgress, (v) => (v > 0.0001 ? "none" : "flex"));

  // Hero text scroll opacity to prevent overlap with dashboard
  const heroTextScrollOpacity = useTransform(scrollYProgress, [0, 0.65, 0.85], [1, 1, 0]);

  const handleOpenCurtains = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background film-grain">
        {/* Auditorium backdrop */}
        <motion.img
          src={auditorium}
          alt="Grand cinema auditorium"
          width={1920}
          height={1200}
          style={{ opacity: auditoriumOpacity, filter: bgBlur.get() ? `blur(${bgBlur.get()}px)` : undefined }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        {/* Dust particles */}
        <Dust />

        {/* Cinema screen → phone morph */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{
              scale: screenScale,
              borderRadius: screenRadius,
              aspectRatio: screenAspect,
              padding: bezel,
            }}
            className="relative w-[64vw] max-w-[1100px] bg-background/80"
          >
            <div
              className="relative h-full w-full overflow-hidden bg-gradient-screen"
              style={{ borderRadius: 4 }}
            >
              <div className="absolute inset-0 bg-gradient-screen animate-[flicker_6s_ease-in-out_infinite]" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2.5 p-6 md:p-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-ember/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ember">
                  <span>Entertainment OS</span>
                </div>
                <p className="font-display text-3xl text-ink md:text-5xl lg:text-6xl tracking-tight leading-none">
                  CINE<span className="text-ember">VERSE</span>
                </p>
                <p className="text-xs text-ink/80 md:text-sm max-w-md font-medium">
                  Content · Audience · Business · Fandom. Connected.
                </p>
                <div className="mt-1 flex flex-wrap justify-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-wider text-ink/75 font-semibold">
                  <span className="bg-ink/10 px-2 py-0.5 rounded border border-ink/20">01 Explore</span>
                  <span className="bg-ink/10 px-2 py-0.5 rounded border border-ink/20">02 Craft Lab</span>
                  <span className="bg-ink/10 px-2 py-0.5 rounded border border-ink/20">03 War Room</span>
                  <span className="bg-ink/10 px-2 py-0.5 rounded border border-ink/20">04 Intelligence</span>
                  <span className="bg-ink/10 px-2 py-0.5 rounded border border-ink/20">05 Strategy</span>
                </div>
              </div>
            </div>
            {/* Ambient bloom */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-24 -z-10 bg-gradient-screen opacity-70 blur-3xl"
            />
          </motion.div>
        </div>

        {/* Closed curtain text overlay (vanishes completely on scroll with display: none) - EXACT MATCH TO USER'S SCREENSHOT */}
        <motion.div
          style={{ opacity: closedPromptOpacity, display: closedPromptDisplay }}
          className="pointer-events-none absolute inset-0 z-40 flex-col items-center justify-center text-center px-4"
        >
          <div className="rounded-full bg-black/75 border border-ember/40 backdrop-blur-md px-6 py-2 mb-4 shadow-xl">
            <span className="text-xs uppercase tracking-[0.35em] text-ember font-semibold">
              🎭 THEATRICAL EXPERIENCE
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-8xl text-foreground tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            OTT VS THEATRE
          </h2>
          <p className="mt-3 text-sm md:text-xl text-muted-foreground max-w-md font-light">
            The Grand Shift in Cinema & Streaming
          </p>
          <button
            type="button"
            onClick={handleOpenCurtains}
            className="pointer-events-auto mt-8 flex flex-col items-center gap-3 text-ember hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none group"
            aria-label="Open Curtains"
          >
            <span className="text-xs uppercase tracking-[0.35em] font-medium bg-black/80 px-5 py-2 rounded-full border border-ember/50 backdrop-blur-md shadow-lg group-hover:border-ember group-hover:bg-ember/20 transition-all text-foreground">
              ✨ CLICK OR SCROLL TO OPEN CURTAINS
            </span>
            <div className="w-7 h-11 rounded-full border-2 border-ember/70 flex items-center justify-center p-1 bg-black/40 backdrop-blur-sm group-hover:border-ember">
              <div className="w-1.5 h-3 bg-ember rounded-full animate-bounce" />
            </div>
          </button>
        </motion.div>

        {/* Curtain panels (scroll-driven extra overlay) */}
        <motion.div style={{ opacity: curtainOpacity }} className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          <motion.div
            style={{ x: curtainLeftX }}
            className="absolute inset-y-0 left-0 w-[52%] origin-left will-change-transform shadow-2xl"
          >
            <img
              src={curtain}
              alt=""
              className="h-full w-full object-cover object-right shadow-[20px_0_40px_rgba(0,0,0,0.9)]"
              style={{ transform: "scaleX(-1)" }}
            />
          </motion.div>
          <motion.div
            style={{ x: curtainRightX }}
            className="absolute inset-y-0 right-0 w-[52%] origin-right will-change-transform shadow-2xl"
          >
            <img
              src={curtain}
              alt=""
              className="h-full w-full object-cover object-left shadow-[-20px_0_40px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </motion.div>

        {/* Hero content overlay (Redesigned Inside Part) */}
        <motion.div style={{ opacity: heroTextScrollOpacity }} className="relative z-20 flex h-full flex-col">
          <header className="flex items-center justify-between px-6 py-6 md:px-12">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="CineVerse" width={40} height={40} className="h-10 w-10 transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-wide leading-none">
                  Cine<span className="text-ember">Verse</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  Entertainment OS
                </span>
              </div>
            </Link>
            <nav className="hidden gap-5 text-xs uppercase tracking-[0.2em] text-muted-foreground xl:flex items-center">
              <Link to="/explore" className="hover:text-ember transition-colors">01 Explore</Link>
              <Link to="/craft" className="hover:text-ember transition-colors">02 Craft</Link>
              <Link to="/campaign" className="hover:text-ember transition-colors">03 Campaign</Link>
              <Link to="/intelligence" className="hover:text-ember transition-colors">04 Intelligence</Link>
              <Link to="/strategy" className="hover:text-ember transition-colors">05 Strategy</Link>
              <Link to="/journal" className="hover:text-ember transition-colors">06 Journal</Link>
              <Link to="/banisa" className="hover:text-gold transition-colors" style={{ color: "var(--gold-foil)" }}>07 Banisa Wall</Link>
              <Link to="/workspace" className="hover:text-foreground font-semibold bg-white/10 px-3 py-1 rounded-full border border-border/40">08 Workspace</Link>
            </nav>
          </header>

          <div className="flex flex-1 flex-col items-start justify-end px-6 pb-20 md:px-16 lg:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="max-w-2xl"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-ember/90 font-semibold">
                Entertainment Innovation & Intelligence OS
              </p>
              <h1 className="font-display text-6xl leading-[0.95] md:text-8xl">
                Two Screens.
                <br />
                <span className="italic text-ember text-glow-ember">One Story.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm text-muted-foreground md:text-base leading-relaxed">
                From the single-screen proscenium to global streaming algorithms — CineVerse unites
                filmmaking craft, marketing war rooms, audience intelligence, and industry economics.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#portals"
                  className="glow-ember inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-widest font-bold text-ink transition-transform hover:scale-[1.03]"
                >
                  Explore 8 Portals ↓
                </a>
                <Link
                  to="/campaign"
                  className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-black/60 backdrop-blur-md px-5 py-3 text-xs uppercase tracking-widest font-semibold text-foreground hover:bg-ember/20 transition-all"
                >
                  Campaign War Room →
                </Link>
                <Link
                  to="/case-study/pushpa-2"
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-ember transition-colors py-2"
                >
                  Watch Case Study
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            <div className="mx-auto mb-2 h-7 w-px animate-pulse bg-ember/60" />
            Scroll to explore the universe
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Dust() {
  const particles = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute block h-0.5 w-0.5 rounded-full bg-ember/70"
          style={{
            left: `${(i * 37) % 100}%`,
            bottom: `-${(i % 4) * 10}px`,
            animation: `float-dust ${8 + (i % 6)}s linear ${(i % 10) * 0.7}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}