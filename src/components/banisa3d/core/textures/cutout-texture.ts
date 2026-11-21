import * as THREE from "three";
import { useEffect, useState } from "react";

/**
 * The six standee illustrations in `src/assets/hero-*.png` are painted onto a
 * flat white page rather than exported with an alpha channel. A fan cutout in
 * the plaza is a flat board, so before it can stand in the 3D crowd the page
 * has to go: we pull the white matte out at runtime and un-premultiply the
 * surviving pixels, which leaves a clean edge with no white fringe.
 */

const WHITE_OPAQUE = 246;
const WHITE_CLEAR = 205;
const MAX_EDGE = 640;

const cache = new Map<string, THREE.CanvasTexture>();
const inflight = new Map<string, Promise<THREE.CanvasTexture | null>>();

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

/** Strips the white page off a standee illustration. */
export async function buildCutoutTexture(src: string): Promise<THREE.CanvasTexture | null> {
  const cached = cache.get(src);
  if (cached) return cached;

  const pending = inflight.get(src);
  if (pending) return pending;

  const job = (async () => {
    if (typeof document === "undefined") return null;

    const image = await loadImage(src);
    if (!image) return null;

    const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(image, 0, 0, width, height);

    let pixels: ImageData;
    try {
      pixels = ctx.getImageData(0, 0, width, height);
    } catch {
      // A tainted canvas cannot be read; keep the raw illustration instead.
      const plain = new THREE.CanvasTexture(canvas);
      plain.colorSpace = THREE.SRGBColorSpace;
      cache.set(src, plain);
      return plain;
    }

    const data = pixels.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] ?? 255;
      const g = data[i + 1] ?? 255;
      const b = data[i + 2] ?? 255;
      const matte = Math.min(r, g, b);

      if (matte >= WHITE_OPAQUE) {
        data[i + 3] = 0;
        continue;
      }

      if (matte > WHITE_CLEAR) {
        const coverage = 1 - (matte - WHITE_CLEAR) / (WHITE_OPAQUE - WHITE_CLEAR);
        data[i + 3] = Math.round(255 * coverage);
        // Un-premultiply against the white page so edges do not glow grey.
        const alpha = Math.max(coverage, 0.004);
        data[i] = Math.max(0, Math.min(255, (r - (1 - alpha) * 255) / alpha));
        data[i + 1] = Math.max(0, Math.min(255, (g - (1 - alpha) * 255) / alpha));
        data[i + 2] = Math.max(0, Math.min(255, (b - (1 - alpha) * 255) / alpha));
      }
    }

    ctx.putImageData(pixels, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    cache.set(src, texture);
    return texture;
  })();

  inflight.set(src, job);
  return job;
}

/** Reactive wrapper used by the standee components. */
export function useCutoutTexture(src: string): THREE.CanvasTexture | null {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(() => cache.get(src) ?? null);

  useEffect(() => {
    let active = true;
    const existing = cache.get(src);
    if (existing) {
      setTexture(existing);
      return;
    }
    buildCutoutTexture(src).then((result) => {
      if (active) setTexture(result);
    });
    return () => {
      active = false;
    };
  }, [src]);

  return texture;
}

/** Aspect ratio (w / h) of a source illustration, needed to size its board. */
export function useCutoutAspect(src: string): number {
  const [aspect, setAspect] = useState(0.44);
  useEffect(() => {
    let active = true;
    loadImage(src).then((image) => {
      if (!active || !image) return;
      if (image.naturalHeight > 0) setAspect(image.naturalWidth / image.naturalHeight);
    });
    return () => {
      active = false;
    };
  }, [src]);
  return aspect;
}
