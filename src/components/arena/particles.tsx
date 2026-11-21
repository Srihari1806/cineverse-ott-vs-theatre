import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vrotX: number;
  vrotY: number;
  vrotZ: number;
  size: number;
  kind: 0 | 1 | 2 | 3; // 0: paper slip, 1: gold confetti, 2: spark ember, 3: petal
  hue: number;
  sat: number;
  light: number;
};

type FireworkSpark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
};

export function ParticleField({
  blastSignal = 0,
  fireworksSignal = 0,
}: {
  blastSignal?: number;
  fireworksSignal?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const blastCountRef = useRef(blastSignal);
  const fireworksCountRef = useRef(fireworksSignal);
  const particlesRef = useRef<Particle[]>([]);
  const fireworksSparksRef = useRef<FireworkSpark[]>([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnParticle = (initial: boolean, forceBlast = false): Particle => {
      const kind = Math.random() < 0.4 ? 0 : Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3;
      const hues = [42, 18, 355, 205, 120, 52, 280];
      return {
        x: forceBlast ? w * 0.5 + (Math.random() - 0.5) * w * 0.4 : Math.random() * w,
        y: forceBlast ? h * 0.7 : initial ? Math.random() * h : -30,
        z: Math.random() * 500,
        vx: forceBlast ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.9,
        vy: forceBlast ? -4 - Math.random() * 8 : kind === 2 ? -0.4 - Math.random() * 0.8 : 0.6 + Math.random() * 1.5,
        vz: (Math.random() - 0.5) * 0.5,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vrotX: (Math.random() - 0.5) * 0.15,
        vrotY: (Math.random() - 0.5) * 0.18,
        vrotZ: (Math.random() - 0.5) * 0.12,
        size: kind === 0 ? 6 + Math.random() * 8 : kind === 1 ? 4 + Math.random() * 5 : kind === 2 ? 2 + Math.random() * 3 : 5 + Math.random() * 6,
        kind,
        hue: hues[Math.floor(Math.random() * hues.length)],
        sat: 85 + Math.random() * 15,
        light: 50 + Math.random() * 25,
      };
    };

    const triggerFirework = (x: number, y: number) => {
      const count = 55 + Math.floor(Math.random() * 35);
      const color = `hsl(${Math.random() * 360}, 100%, 65%)`;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.0 + Math.random() * 5.5;
        fireworksSparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 2.5 + Math.random() * 3.5,
        });
      }
    };

    resize();
    const count = Math.round(Math.min(380, (w * h) / 5000));
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < count; i++) particlesRef.current.push(spawnParticle(true));
    }

    let time = 0;
    const tick = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Handle Instant Trigger Signals
      if (blastSignal > blastCountRef.current) {
        blastCountRef.current = blastSignal;
        for (let i = 0; i < 160; i++) {
          particlesRef.current.push(spawnParticle(false, true));
        }
      }

      if (fireworksSignal > fireworksCountRef.current) {
        fireworksCountRef.current = fireworksSignal;
        for (let i = 0; i < 6; i++) {
          triggerFirework(0.15 * w + Math.random() * 0.7 * w, 0.1 * h + Math.random() * 0.3 * h);
        }
      }

      // Render Firework Sparks
      for (let i = fireworksSparksRef.current.length - 1; i >= 0; i--) {
        const s = fireworksSparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy + 0.08;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.alpha -= 0.018;

        if (s.alpha <= 0) {
          fireworksSparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Organic Paper & Confetti Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        const windX = Math.sin(time * 1.5 + p.y * 0.01) * 0.8 + Math.cos(time * 0.8 + p.x * 0.01) * 0.4;
        p.x += p.vx + windX * 0.3;
        p.y += p.vy;
        p.rotX += p.vrotX;
        p.rotY += p.vrotY;
        p.rotZ += p.vrotZ;

        if (p.y > h + 40 || p.y < -50 || p.x < -60 || p.x > w + 60) {
          if (particlesRef.current.length > count) {
            particlesRef.current.splice(i, 1);
            continue;
          }
          Object.assign(p, spawnParticle(false));
          if (p.kind === 2) p.y = h + 10;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotZ);

        const scaleX = Math.cos(p.rotX);
        const scaleY = Math.sin(p.rotY);
        ctx.scale(Math.max(0.15, Math.abs(scaleX)), Math.max(0.15, Math.abs(scaleY)));

        if (p.kind === 0) {
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`;
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size * 1.4, p.size * 0.6);
        } else if (p.kind === 1) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = `hsl(42, 95%, ${60 + scaleX * 15}%)`;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.kind === 2) {
          ctx.globalAlpha = 0.95;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsl(30, 100%, 60%)`;
          ctx.fillStyle = `hsl(45, 100%, 75%)`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = `hsl(350, 90%, 65%)`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, p.rotX, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [blastSignal, fireworksSignal]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
}
