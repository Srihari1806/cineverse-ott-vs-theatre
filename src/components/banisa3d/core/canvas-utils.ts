/**
 * Low-level canvas painting helpers used to author every texture in the Banisa
 * 3D theatre at runtime. Nothing here touches three.js or the DOM directly —
 * these are pure 2D drawing primitives so the texture factories stay readable.
 */

export interface CanvasSurface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

/** Allocates an offscreen 2D canvas. Returns null when there is no DOM (SSR). */
export function createSurface(width: number, height: number): CanvasSurface | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  return { canvas, ctx };
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
): void {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Greedy word wrap. Returns the lines it laid out so callers can measure the
 * block height before committing to a vertical offset.
 */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Draws multi-line centred text and returns the y it finished at. */
export function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  topY: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = wrapText(ctx, text, maxWidth);
  let y = topY;
  for (const line of lines) {
    ctx.fillText(line, centerX, y);
    y += lineHeight;
  }
  return y;
}

/** Five-pointed star, used on cutout boards, shields and award niches. */
export function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points = 5,
  rotation = -Math.PI / 2,
): void {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = rotation + (i * Math.PI) / points;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/** Radial burst of rays — the marquee starburst behind a title card. */
export function drawStarburst(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rays: number,
  color: string,
): void {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < rays; i++) {
    const angle = (i * Math.PI * 2) / rays;
    const spread = Math.PI / rays / 1.7;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle - spread) * radius, cy + Math.sin(angle - spread) * radius);
    ctx.lineTo(cx + Math.cos(angle + spread) * radius, cy + Math.sin(angle + spread) * radius);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

/** A strip of chasing bulbs — every marquee in the building is trimmed with them. */
export function drawBulbStrip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  spacing: number,
  bulbRadius: number,
  color: string,
  litColor: string,
  phase: number,
): void {
  const count = Math.max(1, Math.floor(width / spacing));
  for (let i = 0; i < count; i++) {
    const cx = x + i * spacing + spacing / 2;
    const pulse = (Math.sin(phase + i * 0.7) + 1) / 2;
    ctx.beginPath();
    ctx.arc(cx, y, bulbRadius * (0.82 + pulse * 0.28), 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, y, bulbRadius * (0.5 + pulse * 0.45), 0, Math.PI * 2);
    ctx.fillStyle = litColor;
    ctx.globalAlpha = 0.55 + pulse * 0.45;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

/** Horizontal gold gradient used on marquee lettering and title plates. */
export function goldGradient(
  ctx: CanvasRenderingContext2D,
  y0: number,
  y1: number,
  light: string,
  dark: string,
): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, y0, 0, y1);
  gradient.addColorStop(0, light);
  gradient.addColorStop(0.48, "#f2c76a");
  gradient.addColorStop(0.52, dark);
  gradient.addColorStop(1, dark);
  return gradient;
}
