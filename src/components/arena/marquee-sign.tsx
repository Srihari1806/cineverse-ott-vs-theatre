import { useEffect, useState } from "react";
import { MARQUEE_TEXT_CYCLES } from "./heroes";

export function MarqueeSign() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MARQUEE_TEXT_CYCLES.length);
        setFade(true);
      }, 400);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black/85 py-1.5 border-y border-yellow-500/40 shadow-[0_0_35px_rgba(234,179,8,0.35)] backdrop-blur-md">
      <div
        className={`text-center transition-all duration-500 transform ${
          fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <span className="display text-xl sm:text-2xl md:text-3xl text-gold-gradient tracking-widest drop-shadow-[0_0_12px_rgba(234,179,8,0.8)]">
          {MARQUEE_TEXT_CYCLES[index]}
        </span>
      </div>
    </div>
  );
}
