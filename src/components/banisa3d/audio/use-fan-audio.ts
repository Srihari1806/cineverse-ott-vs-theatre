import { useCallback, useEffect, useRef } from "react";

export type FanSound = "whistle" | "boom" | "crowd" | "applause" | "seat";

/**
 * Every sound in the theatre is synthesised with the Web Audio API rather than
 * shipped as an audio file: no assets to download, nothing to licence, and the
 * crowd can be layered to whatever size the scene needs.
 *
 * A single AudioContext is created lazily on the first user gesture, because
 * browsers refuse to start audio otherwise.
 */
export function useFanAudio(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const crowdRef = useRef<{ gain: GainNode; source: AudioBufferSourceNode } | null>(null);

  const context = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    if (!ctxRef.current) ctxRef.current = new Ctor();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (
      shape: OscillatorType,
      from: number,
      to: number,
      duration: number,
      peak: number,
      startAt = 0,
    ) => {
      const ctx = context();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t0 = ctx.currentTime + startAt;

      osc.type = shape;
      osc.frequency.setValueAtTime(from, t0);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t0 + duration);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(peak, t0 + duration * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.05);
    },
    [context],
  );

  /** Filtered white noise — the base of every crowd and cymbal sound. */
  const playNoise = useCallback(
    (duration: number, peak: number, filterHz: number, q = 1, startAt = 0) => {
      const ctx = context();
      if (!ctx) return;
      const frames = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frames; i++) {
        // Decaying noise so the tail does not click when the buffer ends.
        data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = filterHz;
      filter.Q.value = q;

      const gain = ctx.createGain();
      const t0 = ctx.currentTime + startAt;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(peak, t0 + duration * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(t0);
      source.stop(t0 + duration + 0.05);
    },
    [context],
  );

  const play = useCallback(
    (sound: FanSound) => {
      if (muted) return;
      switch (sound) {
        case "whistle":
          playTone("sine", 2400, 3200, 0.18, 0.22);
          playTone("sine", 3200, 2700, 0.26, 0.18, 0.16);
          break;
        case "boom":
          playTone("sawtooth", 160, 32, 0.7, 0.32);
          playNoise(0.5, 0.16, 220, 0.8);
          break;
        case "applause":
          playNoise(1.4, 0.16, 2400, 0.6);
          playNoise(1.1, 0.12, 5200, 0.5, 0.1);
          break;
        case "crowd":
          playNoise(1.8, 0.14, 900, 0.4);
          playNoise(1.6, 0.1, 1800, 0.4, 0.15);
          break;
        case "seat":
          playNoise(0.22, 0.1, 1200, 1.4);
          break;
      }
    },
    [muted, playNoise, playTone],
  );

  /**
   * A continuous crowd bed. Stays silent until `start()` is called, and mutes
   * instantly when the visitor flips the sound switch.
   */
  const startCrowd = useCallback(
    (intensity: number) => {
      const ctx = context();
      if (!ctx || muted) return;
      if (crowdRef.current) {
        crowdRef.current.gain.gain.setTargetAtTime(intensity * 0.05, ctx.currentTime, 0.4);
        return;
      }

      const duration = 4;
      const frames = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 780;
      filter.Q.value = 0.35;

      const gain = ctx.createGain();
      gain.gain.value = 0.0001;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
      gain.gain.setTargetAtTime(intensity * 0.05, ctx.currentTime, 1.2);

      crowdRef.current = { gain, source };
    },
    [context, muted],
  );

  const stopCrowd = useCallback(() => {
    const ctx = ctxRef.current;
    const bed = crowdRef.current;
    if (!ctx || !bed) return;
    bed.gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3);
    const source = bed.source;
    window.setTimeout(() => {
      try {
        source.stop();
      } catch {
        // Already stopped.
      }
    }, 900);
    crowdRef.current = null;
  }, []);

  // The mute switch must cut the running bed immediately.
  useEffect(() => {
    const ctx = ctxRef.current;
    const bed = crowdRef.current;
    if (!ctx || !bed) return;
    bed.gain.gain.setTargetAtTime(muted ? 0.0001 : 0.05, ctx.currentTime, 0.15);
  }, [muted]);

  useEffect(() => {
    return () => {
      const bed = crowdRef.current;
      if (bed) {
        try {
          bed.source.stop();
        } catch {
          // Already stopped.
        }
      }
      ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
      crowdRef.current = null;
    };
  }, []);

  return { play, startCrowd, stopCrowd };
}
