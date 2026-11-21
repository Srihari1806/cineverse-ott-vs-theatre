import { useEffect, useRef } from "react";

export function CheerControls({
  onPaperBlast,
  onFireworksLaunch,
  onWhistleCheer,
}: {
  onPaperBlast: () => void;
  onFireworksLaunch: () => void;
  onWhistleCheer: () => void;
}) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize Whistle Sound Effect using Web Audio API
  const playWhistleSound = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (err) {
      console.warn("Audio synthesis disabled:", err);
    }
  };

  // Synthesize Fireworks Boom Sound Effect
  const playFireworksBoom = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (err) {
      console.warn("Audio synthesis disabled:", err);
    }
  };

  return (
    <div className="absolute bottom-4 right-6 z-50 flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => {
          onPaperBlast();
          playWhistleSound();
        }}
        className="flex items-center gap-1.5 rounded-full border border-yellow-500/50 bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow-400 backdrop-blur-md transition-all hover:scale-105 hover:bg-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
      >
        <span>🎉 PAPER BLAST</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onFireworksLaunch();
          playFireworksBoom();
        }}
        className="flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-400 backdrop-blur-md transition-all hover:scale-105 hover:bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
      >
        <span>🎆 FIREWORKS</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onWhistleCheer();
          playWhistleSound();
        }}
        className="flex items-center gap-1.5 rounded-full border border-primary/50 bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md transition-all hover:scale-105 hover:bg-primary/20 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
      >
        <span>🎺 CHEER</span>
      </button>
    </div>
  );
}
