import { useEffect, useRef } from "react";

type Kind = "confetti" | "paper" | "ember" | "smoke" | "spark";

interface Particle {
  kind: Kind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  life: number;
  maxLife: number;
  hue: number;
  wobble: number;
  wobbleSpeed: number;
}

const CONFETTI_HUES = [42, 18, 350, 200, 120, 55, 280];

interface CelebrationCanvasProps {
  /** 0 = calm drift, 1 = full fan frenzy. Drives spawn rate. */
  intensity?: number;
  className?: string;
}

/**
 * Full-bleed particle field: confetti, torn paper bits, floating embers,
 * firework smoke and spark fountains rising from the cutout bases.
 * Everything is drawn on one canvas for maximum visual frenzy and performance.
 */
export function CelebrationCanvas({ intensity = 1, className = "" }: CelebrationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const particles: Particle[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (kind: Kind): Particle => {
      switch (kind) {
        case "confetti":
          return {
            kind,
            x: rand(-40, width + 40),
            y: rand(-120, -10),
            vx: rand(-18, 18),
            vy: rand(32, 85),
            size: rand(6, 16),
            rot: rand(0, Math.PI * 2),
            vrot: rand(-4, 4),
            life: 0,
            maxLife: rand(7, 14),
            hue: CONFETTI_HUES[Math.floor(rand(0, CONFETTI_HUES.length))],
            wobble: rand(0, Math.PI * 2),
            wobbleSpeed: rand(2, 5),
          };
        case "paper":
          return {
            kind,
            x: rand(-40, width + 40),
            y: rand(-160, height * 0.5),
            vx: rand(-32, 32),
            vy: rand(15, 45),
            size: rand(4, 11),
            rot: rand(0, Math.PI * 2),
            vrot: rand(-2.5, 2.5),
            life: 0,
            maxLife: rand(9, 20),
            hue: 45,
            wobble: rand(0, Math.PI * 2),
            wobbleSpeed: rand(1, 3),
          };
        case "ember":
          return {
            kind,
            x: rand(0, width),
            y: rand(height * 0.4, height + 40),
            vx: rand(-12, 12),
            vy: rand(-50, -18),
            size: rand(1.2, 3.5),
            rot: 0,
            vrot: 0,
            life: 0,
            maxLife: rand(4, 10),
            hue: rand(28, 55),
            wobble: rand(0, Math.PI * 2),
            wobbleSpeed: rand(0.8, 2),
          };
        case "smoke":
          return {
            kind,
            x: rand(0, width),
            y: rand(height * 0.5, height * 0.95),
            vx: rand(-10, 10),
            vy: rand(-25, -10),
            size: rand(35, 110),
            rot: rand(0, Math.PI * 2),
            vrot: rand(-0.25, 0.25),
            life: 0,
            maxLife: rand(6, 13),
            hue: 40,
            wobble: rand(0, Math.PI * 2),
            wobbleSpeed: rand(0.2, 0.6),
          };
        case "spark":
        default:
          return {
            kind: "spark",
            x: rand(0, width),
            y: height * rand(0.7, 0.92),
            vx: rand(-35, 35),
            vy: rand(-220, -120),
            size: rand(1.5, 3),
            rot: 0,
            vrot: 0,
            life: 0,
            maxLife: rand(1.1, 2.3),
            hue: rand(38, 58),
            wobble: 0,
            wobbleSpeed: 0,
          };
      }
    };

    // Seed the field heavily so the scene is already in full celebration mode on first frame
    for (let i = 0; i < 180; i++) particles.push(spawn("confetti"));
    for (let i = 0; i < 140; i++) particles.push(spawn("paper"));
    for (let i = 0; i < 100; i++) particles.push(spawn("ember"));
    for (let i = 0; i < 20; i++) particles.push(spawn("smoke"));
    particles.forEach((p) => (p.life = Math.random() * p.maxLife));

    const budget = { confetti: 220, paper: 180, ember: 110, smoke: 24, spark: 160 };
    const counts: Record<Kind, number> = { confetti: 0, paper: 0, ember: 0, smoke: 0, spark: 0 };

    let raf = 0;
    let last = performance.now();
    let sparkTimer = 0;

    const draw = (p: Particle, alpha: number) => {
      switch (p.kind) {
        case "confetti": {
          const flip = Math.cos(p.wobble * 1.7);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(1, Math.max(0.15, Math.abs(flip)));
          ctx.fillStyle = `hsla(${p.hue}, 92%, ${58 + flip * 12}%, ${alpha})`;
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
          ctx.restore();
          break;
        }
        case "paper": {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = `hsla(${p.hue}, 40%, 88%, ${alpha * 0.85})`;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
          ctx.restore();
          break;
        }
        case "ember": {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 66%, ${alpha * 0.95})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }
        case "smoke": {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          g.addColorStop(0, `hsla(${p.hue}, 30%, 70%, ${alpha * 0.15})`);
          g.addColorStop(1, "hsla(40, 30%, 70%, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case "spark": {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03);
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 72%, ${alpha})`;
          ctx.lineWidth = p.size;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 62%, ${alpha})`;
          ctx.stroke();
          ctx.shadowBlur = 0;
          break;
        }
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, width, height);
      const power = intensityRef.current;

      counts.confetti = counts.paper = counts.ember = counts.smoke = counts.spark = 0;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;

        if (p.life > p.maxLife || p.y > height + 200 || p.x < -220 || p.x > width + 220) {
          particles.splice(i, 1);
          continue;
        }

        p.wobble += p.wobbleSpeed * dt;
        p.rot += p.vrot * dt;

        if (p.kind === "spark") {
          p.vy += 190 * dt;
        } else if (p.kind === "smoke") {
          p.size += 18 * dt;
        } else {
          p.vy += (p.kind === "ember" ? -6 : 9) * dt;
        }

        p.x += (p.vx + Math.sin(p.wobble) * (p.kind === "confetti" ? 28 : 16)) * dt;
        p.y += p.vy * dt;

        const t = p.life / p.maxLife;
        const alpha = Math.min(1, Math.min(t * 6, (1 - t) * 3.2));
        draw(p, alpha);

        counts[p.kind]++;
      }

      const topUp = (kind: Kind, rate: number) => {
        const target = Math.floor(budget[kind] * power);
        if (counts[kind] < target && Math.random() < rate * dt * 60) particles.push(spawn(kind));
      };
      topUp("confetti", 0.7);
      topUp("paper", 0.55);
      topUp("ember", 0.4);
      topUp("smoke", 0.08);

      sparkTimer -= dt;
      if (sparkTimer <= 0 && power > 0.2) {
        sparkTimer = rand(0.7, 2.2) / Math.max(power, 0.3);
        const bx = rand(0, width);
        const by = height * rand(0.74, 0.9);
        const burst = Math.floor(rand(18, 36) * power);
        for (let i = 0; i < burst; i++) {
          const s = spawn("spark");
          s.x = bx + rand(-14, 14);
          s.y = by;
          particles.push(s);
        }
      }
    };

    if (!reduceMotion) {
      raf = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => draw(p, 0.5));
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
