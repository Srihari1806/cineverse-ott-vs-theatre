import * as THREE from "three";
import {
  createSurface,
  drawStar,
  drawStarburst,
  goldGradient,
  hexToRgba,
  roundRect,
} from "../canvas-utils";
import { PALETTE } from "../palette";

export interface PosterTextureOptions {
  title: string;
  film: string;
  year: string;
  /** Fandom accent driving the poster's bleed, border and title plate. */
  accent: string;
  /** Optional standee art composited into the frame — a keyed cutout canvas. */
  artwork?: CanvasImageSource | null;
  width?: number;
  height?: number;
  /** "led" overlays a pixel grid so digital frames read as a later vintage. */
  style?: "six-sheet" | "led";
  /** Paints dust, scratches and streaks across the plate. */
  distressed?: boolean;
}

/**
 * Hand-painted single-screen era poster. These line the lobby walls, and the
 * same factory draws the digital frames on the LED wall so the two read as two
 * vintages of the same body of artwork.
 */
export function makePosterTexture(options: PosterTextureOptions): THREE.CanvasTexture | null {
  const {
    title,
    film,
    year,
    accent,
    artwork = null,
    width = 512,
    height = 768,
    style = "six-sheet",
    distressed = true,
  } = options;

  const surface = createSurface(width, height);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  // ── Base plate ──
  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, "#140c06");
  base.addColorStop(0.42, hexToRgba(accent, 0.28));
  base.addColorStop(0.68, hexToRgba(accent, 0.14));
  base.addColorStop(1, "#0a0705");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  // ── Starburst behind the figure ──
  ctx.save();
  ctx.globalAlpha = 0.16;
  drawStarburst(ctx, width / 2, height * 0.42, width * 0.95, 24, accent);
  ctx.restore();

  // ── Federation star watermarked behind everything ──
  ctx.save();
  ctx.globalAlpha = 0.09;
  drawStar(ctx, width / 2, height * 0.4, width * 0.4, width * 0.17);
  ctx.fillStyle = PALETTE.goldBright;
  ctx.fill();
  ctx.restore();

  // ── Composited standee art ──
  if (artwork) {
    const artWidth = width * 0.78;
    const artHeight = height * 0.66;
    ctx.save();
    ctx.globalAlpha = 0.96;
    ctx.drawImage(artwork, (width - artWidth) / 2, height * 0.16, artWidth, artHeight);
    ctx.restore();
  }

  // ── Vignette so the plate edges fall into the surrounding wall ──
  const vignette = ctx.createRadialGradient(
    width / 2,
    height * 0.42,
    width * 0.2,
    width / 2,
    height * 0.5,
    width * 0.95,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.86)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  // ── Title block ──
  const plateTop = height * 0.72;
  const plate = ctx.createLinearGradient(0, plateTop, 0, height);
  plate.addColorStop(0, "rgba(10,7,5,0.1)");
  plate.addColorStop(0.35, "rgba(10,7,5,0.92)");
  plate.addColorStop(1, "rgba(10,7,5,0.99)");
  ctx.fillStyle = plate;
  ctx.fillRect(0, plateTop, width, height - plateTop);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.save();
  const titleSize = Math.max(30, Math.round(width * 0.115));
  ctx.font = `400 ${titleSize}px "Bebas Neue", system-ui, sans-serif`;
  ctx.fillStyle = goldGradient(
    ctx,
    plateTop + height * 0.04,
    plateTop + height * 0.14,
    "#ffeec0",
    "#b8862c",
  );
  ctx.shadowColor = hexToRgba(accent, 0.8);
  ctx.shadowBlur = 18;
  ctx.fillText(title.toUpperCase(), width / 2, plateTop + height * 0.095);
  ctx.restore();

  ctx.save();
  ctx.font = `600 ${Math.max(12, Math.round(width * 0.042))}px "Barlow", system-ui, sans-serif`;
  ctx.fillStyle = hexToRgba(PALETTE.cream, 0.84);
  ctx.fillText(film, width / 2, plateTop + height * 0.155);
  ctx.restore();

  // ── Year chip ──
  ctx.save();
  const chipW = width * 0.3;
  const chipH = height * 0.048;
  roundRect(ctx, (width - chipW) / 2, height * 0.945, chipW, chipH, chipH / 2);
  ctx.fillStyle = hexToRgba(accent, 0.22);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(PALETTE.gold, 0.75);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = PALETTE.goldBright;
  ctx.font = `700 ${Math.max(11, Math.round(width * 0.036))}px "Barlow", system-ui, sans-serif`;
  ctx.fillText(year, width / 2, height * 0.945 + chipH / 2);
  ctx.restore();

  // ── LED era: scanlines and pixel grid ──
  if (style === "led") {
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "#000";
    for (let y = 0; y < height; y += 4) ctx.fillRect(0, y, width, 2);
    ctx.globalAlpha = 0.12;
    for (let x = 0; x < width; x += 4) ctx.fillRect(x, 0, 2, height);
    ctx.restore();
  }

  // ── Distressing: dust and scratches ──
  if (distressed) {
    ctx.save();
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 220; i++) {
      const x = (i * 97) % width;
      const y = (i * 61) % height;
      ctx.fillStyle = i % 3 === 0 ? "#000" : PALETTE.cream;
      ctx.fillRect(x, y, 1 + (i % 3), 1);
    }
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = PALETTE.cream;
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const x = ((i * 131) % width) + 10;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (i % 2 === 0 ? 24 : -24), height);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── Frame ──
  ctx.strokeStyle = hexToRgba(PALETTE.goldDeep, 0.55);
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}
