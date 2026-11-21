import * as THREE from "three";
import { createSurface, goldGradient, hexToRgba } from "../canvas-utils";

export interface TextTextureOptions {
  text: string;
  /** Font size in texture pixels. */
  fontSize: number;
  /** Optional body copy rendered smaller beneath the headline. */
  subtext?: string;
  subFontSize?: number;
  /** Behind-the-text plate. Omit for a transparent texture. */
  background?: string | null;
  backgroundGradient?: [string, string] | null;
  /** Gold two-tone fill, mirroring `.text-gold-gradient` in the stylesheet. */
  gold?: boolean;
  color?: string;
  glow?: number;
  glowColor?: string;
  borderColor?: string | null;
  borderWidth?: number;
  paddingX?: number;
  paddingY?: number;
  letterSpacing?: number;
  italic?: boolean;
  /** Font stack; override for signage that should not use the display face. */
  fontFamily?: string;
}

const DISPLAY = '"Bebas Neue", "Barlow", system-ui, sans-serif';
const BODY = '"Barlow", system-ui, sans-serif';

/**
 * Paints a text plate and hands back a texture sized to the measured text, so
 * marquee lettering and title cards never stretch or blur.
 */
export function makeTextTexture(options: TextTextureOptions): THREE.CanvasTexture | null {
  const {
    text,
    fontSize,
    subtext,
    subFontSize = fontSize * 0.34,
    background = null,
    backgroundGradient = null,
    gold = false,
    color = "#f6e9cd",
    glow = 0,
    glowColor = "#e8b44a",
    borderColor = null,
    borderWidth = 4,
    paddingX = fontSize * 0.5,
    paddingY = fontSize * 0.38,
    letterSpacing = 0,
    italic = false,
    fontFamily = DISPLAY,
  } = options;

  // Measure pass: a throwaway surface gives us the final plate dimensions.
  const probe = createSurface(8, 8);
  if (!probe) return null;

  const headlineFont = `${italic ? "italic " : ""}${fontSize}px ${fontFamily}`;
  const subFont = `500 ${subFontSize}px ${BODY}`;

  probe.ctx.font = headlineFont;
  const headlineWidth = probe.ctx.measureText(text).width + letterSpacing * text.length;

  probe.ctx.font = subFont;
  const subLines = subtext ? subtext.split("\n") : [];
  const subWidth = subLines.reduce(
    (max, line) => Math.max(max, probe.ctx.measureText(line).width),
    0,
  );

  const contentWidth = Math.max(headlineWidth, subWidth, fontSize * 2);
  const width = contentWidth + paddingX * 2;
  const height = fontSize * 1.24 + subLines.length * subFontSize * 1.35 + paddingY * 2;

  const surface = createSurface(width, height);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  if (backgroundGradient) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, backgroundGradient[0]);
    gradient.addColorStop(1, backgroundGradient[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  } else if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }

  if (borderColor) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const headlineBaseline = paddingY + fontSize * 0.62;

  ctx.save();
  ctx.font = headlineFont;
  ctx.fillStyle = gold
    ? goldGradient(ctx, paddingY, paddingY + fontSize, "#ffe9b0", "#b8862c")
    : color;

  if (glow > 0) {
    ctx.shadowColor = hexToRgba(glowColor, 0.95);
    ctx.shadowBlur = glow;
  }

  if (letterSpacing === 0) {
    ctx.fillText(text, width / 2, headlineBaseline);
  } else {
    // Manual tracking so marquee lettering keeps its spaced-out look.
    let cursor = width / 2 - headlineWidth / 2;
    for (const char of text) {
      const charWidth = ctx.measureText(char).width;
      ctx.fillText(char, cursor + charWidth / 2, headlineBaseline);
      cursor += charWidth + letterSpacing;
    }
  }
  ctx.restore();

  if (subLines.length > 0) {
    ctx.save();
    ctx.font = subFont;
    ctx.fillStyle = hexToRgba("#f6e9cd", 0.82);
    let y = headlineBaseline + fontSize * 0.66;
    for (const line of subLines) {
      ctx.fillText(line, width / 2, y);
      y += subFontSize * 1.35;
    }
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}
