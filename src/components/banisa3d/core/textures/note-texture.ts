import * as THREE from "three";
import { createSurface, drawStar, hexToRgba, roundRect, wrapText } from "../canvas-utils";
import { PALETTE } from "../palette";

export interface NoteTextureOptions {
  text: string;
  author: string;
  /** Paper tint — the fan wall mixes amber, cream, rose and teal slips. */
  paper: string;
  /** Fandom accent for the signature underline and corner star. */
  accent: string;
  /** Stamped "approved by moderation" tick, drawn top-right. */
  verified?: boolean;
  width?: number;
  height?: number;
}

/**
 * One handwritten note stapled to the lobby Fan Wall. The wall is built from
 * dozens of these, layered at slightly different depths and angles.
 */
export function makeNoteTexture(options: NoteTextureOptions): THREE.CanvasTexture | null {
  const {
    text,
    author,
    paper,
    accent,
    verified = true,
    width = 420,
    height = 420,
  } = options;

  const surface = createSurface(width, height);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  // ── Paper ──
  const plate = ctx.createLinearGradient(0, 0, width, height);
  plate.addColorStop(0, paper);
  plate.addColorStop(1, hexToRgba(paper, 0.82));
  ctx.fillStyle = plate;
  ctx.fillRect(0, 0, width, height);

  // ── Fibre grain ──
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  for (let y = 3; y < height; y += 7) {
    ctx.beginPath();
    ctx.moveTo(0, y + ((y * 13) % 3));
    ctx.lineTo(width, y - ((y * 7) % 3));
    ctx.stroke();
  }
  ctx.restore();

  // ── Corner star so the sheet reads as fan merchandise, not office paper ──
  ctx.save();
  ctx.globalAlpha = 0.22;
  drawStar(ctx, width * 0.84, height * 0.86, width * 0.17, width * 0.07);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.restore();

  // ── Handwriting ──
  const margin = width * 0.1;
  const bodyWidth = width - margin * 2;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  let size = Math.round(width * 0.085);
  ctx.font = `600 ${size}px "Barlow", system-ui, sans-serif`;
  while (wrapText(ctx, text, bodyWidth).length > 7 && size > 13) {
    size -= 1;
    ctx.font = `600 ${size}px "Barlow", system-ui, sans-serif`;
  }

  ctx.fillStyle = "#2a1c10";
  const lines = wrapText(ctx, text, bodyWidth).slice(0, 7);
  let y = margin;
  for (const line of lines) {
    ctx.fillText(line, margin, y);
    y += size * 1.34;
  }

  // ── Signature ──
  const sigY = height - margin - size * 1.6;
  ctx.strokeStyle = hexToRgba(accent, 0.85);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(margin, sigY);
  ctx.lineTo(Math.min(width - margin, margin + size * 5.2), sigY);
  ctx.stroke();

  ctx.fillStyle = "#3a2818";
  ctx.font = `700 ${Math.round(size * 0.92)}px "Barlow", system-ui, sans-serif`;
  ctx.fillText(`— ${author}`.slice(0, 30), margin, sigY + 8);

  // ── Moderation stamp ──
  if (verified) {
    ctx.save();
    const stampW = width * 0.3;
    const stampH = height * 0.085;
    const sx = width - margin - stampW;
    roundRect(ctx, sx, margin * 0.55, stampW, stampH, stampH / 2);
    ctx.strokeStyle = hexToRgba("#2f6b34", 0.7);
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = hexToRgba("#2f6b34", 0.8);
    ctx.font = `700 ${Math.round(stampH * 0.6)}px "Barlow", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("APPROVED", sx + stampW / 2, margin * 0.55 + stampH / 2);
    ctx.restore();
  }

  // ── Tape strip across the top ──
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = PALETTE.cream;
  ctx.translate(width * 0.3, -height * 0.01);
  ctx.rotate(-0.04);
  ctx.fillRect(0, 0, width * 0.4, height * 0.075);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Fixed paper palette the Fan Wall cycles through, in order. */
export const NOTE_PAPERS = [
  "#f0d8a4",
  "#e9cfa2",
  "#f2e2c0",
  "#e2b98c",
  "#efe0b8",
  "#dcb894",
] as const;

export function notePaperFor(index: number): string {
  const paper = NOTE_PAPERS[Math.abs(index) % NOTE_PAPERS.length];
  return paper ?? NOTE_PAPERS[0];
}
