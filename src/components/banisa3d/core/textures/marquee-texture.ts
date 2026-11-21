import * as THREE from "three";
import { createSurface, drawBulbStrip, goldGradient } from "../canvas-utils";
import { PALETTE } from "../palette";

export interface MarqueePainterOptions {
  lines: string[];
  accent: string;
  width: number;
  height: number;
  speed: number;
  mode?: "scroll" | "fade";
}

/**
 * The scrolling fascia painter. The marquee is a long horizontal canvas that
 * repaints every frame — the lettering walks past, the bulb strip pulses, and
 * the whole plate is distressed so it reads as a vintage tin sign rather than
 * a flat digital strip.
 */
export function createMarqueePainter(options: MarqueePainterOptions) {
  const { lines, accent, width, height, speed, mode = "scroll" } = options;
  const surface = createSurface(width, height);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  // ── Static plate: dark field, gold hairline, bulb strip along the bottom ──
  const field = ctx.createLinearGradient(0, 0, 0, height);
  field.addColorStop(0, "#1a1109");
  field.addColorStop(0.5, "#140d08");
  field.addColorStop(1, "#0c0705");
  ctx.fillStyle = field;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = PALETTE.goldDeep;
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, width - 8, height - 8);

  ctx.strokeStyle = PALETTE.crimsonBright;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(14, 14, width - 28, height - 28);

  // ── Text metrics ──
  const fontSize = Math.round(height * 0.42);
  ctx.font = `400 ${fontSize}px "Bebas Neue", system-ui, sans-serif`;
  ctx.textBaseline = "middle";

  const fullText = lines.join("  ✦  ");
  const measured = ctx.measureText(fullText);
  const textWidth = measured.width;

  // ── Build a single repaintable text layer ──
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  let offset = 0;

  const paint = (elapsed: number) => {
    ctx.clearRect(0, 0, width, height);

    // Re-paint the static field
    ctx.fillStyle = field;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = PALETTE.goldDeep;
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, width - 8, height - 8);
    ctx.strokeStyle = PALETTE.crimsonBright;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Scrolling text
    if (mode === "scroll") {
      offset = (offset + speed * elapsed) % textWidth;
    } else {
      offset = 0;
    }

    ctx.save();
    ctx.fillStyle = goldGradient(ctx, height * 0.18, height * 0.82, "#ffeec0", "#b8862c");
    ctx.shadowColor = accent;
    ctx.shadowBlur = 18;

    const drawAt = (x: number) => {
      ctx.fillText(fullText, x, height / 2);
    };

    if (mode === "scroll") {
      let x = width - offset;
      while (x < width + textWidth) {
        drawAt(x);
        x += textWidth;
      }
      // Also draw once to the left so the wrap is seamless
      drawAt(width - offset - textWidth);
    } else {
      drawAt((width - textWidth) / 2);
    }
    ctx.restore();

    // Pulsing bulb strip along the bottom
    drawBulbStrip(ctx, 0, height - 10, width, 26, 5, "#3a2410", "#ffd9a0", elapsed * 4);

    // Light distressing
    ctx.save();
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 120; i++) {
      const x = (i * 97) % width;
      const y = (i * 61) % height;
      ctx.fillStyle = i % 3 === 0 ? "#000" : PALETTE.cream;
      ctx.fillRect(x, y, 1 + (i % 3), 1);
    }
    ctx.restore();

    texture.needsUpdate = true;
  };

  return { texture, paint, dispose: () => texture.dispose() };
}