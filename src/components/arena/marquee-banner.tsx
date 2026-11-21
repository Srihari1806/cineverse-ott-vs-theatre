import { useEffect, useRef } from "react";
import type { MarqueePayload } from "./heroes";

export function MarqueeBanner({ payload }: { payload: MarqueePayload }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let offset = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Neon background glow strip
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `bold ${Math.floor(h * 0.58)}px 'Bebas Neue', system-ui, sans-serif`;
      ctx.textBaseline = "middle";

      // Neon Text Glowing Shadow Effect
      ctx.shadowColor = payload.colorHex;
      ctx.shadowBlur = 14 * payload.glowIntensity;
      ctx.fillStyle = payload.colorHex;

      const textMetrics = ctx.measureText(payload.text + "   ");
      const textWidth = textMetrics.width;

      offset -= payload.scrollSpeed * 0.035;
      if (Math.abs(offset) >= textWidth) {
        offset = 0;
      }

      // Draw repeating scrolling text seamlessly across the marquee strip
      let currentX = offset;
      while (currentX < w + textWidth) {
        ctx.fillText(payload.text, currentX, h / 2 + 2);
        currentX += textWidth;
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [payload]);

  return (
    <div className="relative w-full overflow-hidden border-y border-yellow-500/40 shadow-[0_0_30px_rgba(234,179,8,0.25)]">
      <canvas ref={canvasRef} className="h-10 w-full block" />
    </div>
  );
}
