import { useMemo } from "react";

/** Deterministic PRNG so server and client render the identical sky. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Trim float noise so SSR and client markup match exactly. */
const round3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Warm cinematic night: haze-gradient sky, stars dulled by city glow, four
 * searchlights sweeping the clouds, and fireworks going off behind the theatre.
 */
export function SkyLayer() {
  const stars = useMemo(() => {
    const rnd = mulberry32(20260807);
    return Array.from({ length: 110 }, () => ({
      x: rnd() * 100,
      y: rnd() * 62,
      r: 0.5 + rnd() * 1.4,
      o: 0.2 + rnd() * 0.6,
      d: 2 + rnd() * 5,
      delay: rnd() * 6,
    }));
  }, []);

  const fireworks = useMemo(() => {
    const rnd = mulberry32(77712);
    return Array.from({ length: 7 }, (_, i) => ({
      x: 6 + rnd() * 88,
      y: 8 + rnd() * 34,
      scale: 0.6 + rnd() * 0.9,
      delay: i * 2.3 + rnd() * 2,
      dur: 5 + rnd() * 3,
      hue: [42, 20, 320, 200, 130, 55, 280][i % 7],
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Night gradient — sodium-vapour orange sitting on the horizon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.09 0.03 285) 0%, oklch(0.12 0.035 300) 26%, oklch(0.16 0.05 40) 58%, oklch(0.26 0.09 52) 82%, oklch(0.34 0.11 58) 100%)",
        }}
      />

      {/* Stars */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="oklch(0.96 0.02 90)"
            opacity={s.o}
          >
            <animate
              attributeName="opacity"
              values={`${s.o};${s.o * 0.25};${s.o}`}
              dur={`${s.d}s`}
              begin={`${s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Fireworks bursting behind the building */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {fireworks.map((f, i) => (
          <g key={i}>
            <g style={{ transformOrigin: "center" }}>
              {Array.from({ length: 18 }).map((_, k) => {
                const ang = (k / 18) * Math.PI * 2;
                // Math.cos/sin are not required to be bit-identical across JS
                // engines, so the raw values serialise differently on the Node
                // render than in the browser and React reports a hydration
                // mismatch. Rounding makes both sides agree.
                const x2 = round3(f.x + Math.cos(ang) * 4.2 * f.scale);
                const y2 = round3(f.y + Math.sin(ang) * 5.6 * f.scale);
                return (
                  <line
                    key={k}
                    x1={`${round3(f.x)}%`}
                    y1={`${round3(f.y)}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={`hsl(${f.hue} 100% 68%)`}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0"
                  >
                    <animate
                      attributeName="opacity"
                      values="0;1;0.85;0"
                      keyTimes="0;0.04;0.16;0.4"
                      dur={`${f.dur}s`}
                      begin={`${f.delay}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      values="3;1.6;0.4"
                      keyTimes="0;0.16;0.4"
                      dur={`${f.dur}s`}
                      begin={`${f.delay}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
              <circle
                cx={`${f.x}%`}
                cy={`${f.y}%`}
                r="2"
                fill={`hsl(${f.hue} 100% 82%)`}
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  keyTimes="0;0.03;0.2"
                  dur={`${f.dur}s`}
                  begin={`${f.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>

      {/* Searchlights raking the sky */}
      {[
        { left: "8%", dur: 13, delay: 0, hue: "oklch(0.9 0.06 90)" },
        { left: "31%", dur: 17, delay: 2.5, hue: "oklch(0.85 0.1 60)" },
        { left: "69%", dur: 15, delay: 1.2, hue: "oklch(0.88 0.08 200)" },
        { left: "92%", dur: 19, delay: 3.6, hue: "oklch(0.9 0.06 300)" },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 origin-bottom"
          style={{
            left: b.left,
            width: "clamp(60px, 7vw, 130px)",
            height: "125%",
            marginLeft: "-3.5vw",
            background: `linear-gradient(to top, ${b.hue} 0%, transparent 78%)`,
            opacity: 0.13,
            filter: "blur(10px)",
            clipPath: "polygon(38% 100%, 62% 100%, 100% 0, 0 0)",
            animation: `searchlight-sweep ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}

      {/* Volumetric haze band where the light hits the dust */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to top, oklch(0.62 0.14 58 / 0.22), oklch(0.5 0.12 55 / 0.08) 45%, transparent 85%)",
        }}
      />
    </div>
  );
}
