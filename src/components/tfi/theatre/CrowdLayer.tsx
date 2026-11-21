import { useMemo } from "react";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type FanKind = "cheer" | "flag" | "phone" | "drum" | "banner" | "camera" | "shoulders" | "climb";

interface Fan {
  x: number;
  scale: number;
  kind: FanKind;
  phase: number;
  speed: number;
  hue: number;
}

const KIND_WEIGHTS: [FanKind, number][] = [
  ["cheer", 34],
  ["phone", 22],
  ["flag", 14],
  ["banner", 8],
  ["camera", 8],
  ["drum", 6],
  ["shoulders", 5],
  ["climb", 3],
];

function pickKind(r: number): FanKind {
  const total = KIND_WEIGHTS.reduce((s, [, w]) => s + w, 0);
  let acc = r * total;
  for (const [kind, w] of KIND_WEIGHTS) {
    acc -= w;
    if (acc <= 0) return kind;
  }
  return "cheer";
}

interface CrowdRowProps {
  seed: number;
  count: number;
  depth: number;
  widthPct: number;
  opacity?: number;
}

function CrowdRow({ seed, count, depth, widthPct, opacity = 1 }: CrowdRowProps) {
  const fans = useMemo<Fan[]>(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      x: (i / count) * 1640 - 20 + (rnd() - 0.5) * (1600 / count) * 1.4,
      scale: 0.82 + rnd() * 0.36,
      kind: pickKind(rnd()),
      phase: rnd() * 4,
      speed: 1.1 + rnd() * 1.5,
      hue: [42, 22, 200, 300, 130, 55][Math.floor(rnd() * 6)],
    }));
  }, [seed, count]);

  const body = `oklch(${0.16 - depth * 0.1} ${0.03 - depth * 0.015} 45)`;
  const rim = `oklch(${0.55 + depth * 0.12} ${0.14} ${62 - depth * 8})`;

  return (
    <svg
      viewBox="0 0 1600 130"
      preserveAspectRatio="xMidYMax meet"
      className="pointer-events-none absolute bottom-0 left-1/2 h-auto -translate-x-1/2"
      style={{ width: `${widthPct}%`, opacity }}
      aria-hidden
    >
      {fans.map((f, i) => (
        <g
          key={i}
          transform={`translate(${f.x} 130) scale(${f.scale})`}
          style={{
            animation: `crowd-bob ${f.speed + 0.6}s ease-in-out ${f.phase}s infinite`,
            transformBox: "fill-box",
            transformOrigin: "50% 100%",
          }}
        >
          <FanFigure
            kind={f.kind}
            body={body}
            rim={rim}
            hue={f.hue}
            phase={f.phase}
            speed={f.speed}
          />
        </g>
      ))}
    </svg>
  );
}

function FanFigure({
  kind,
  body,
  rim,
  hue,
  phase,
  speed,
}: {
  kind: FanKind;
  body: string;
  rim: string;
  hue: number;
  phase: number;
  speed: number;
}) {
  const torso = (
    <>
      <circle cx="0" cy="-84" r="10" fill={body} />
      <path d="M-13-72h26l6 34-8 40h-22l-8-40z" fill={body} />
      <path d="M-11 2h8l2 30h-9zM3 2h8l1 30h-9z" fill={body} />
      <path d="M-10-90a10 10 0 0 1 20 0 10 10 0 0 0-20 0z" fill={rim} opacity="0.55" />
    </>
  );

  switch (kind) {
    case "cheer":
      return (
        <>
          {torso}
          <g
            style={{
              animation: `arm-pump ${speed}s ease-in-out ${phase}s infinite`,
              transformOrigin: "0px -70px",
            }}
          >
            <path d="M-13-70l-14-34 7-4 18 32zM13-70l14-34-7-4-18 32z" fill={body} />
          </g>
        </>
      );

    case "phone":
      return (
        <>
          {torso}
          <path d="M-13-70l-8-40 8-3 10 38z" fill={body} />
          <path d="M13-70l6-42 8 3-6 41z" fill={body} />
          <rect x="15" y="-124" width="7" height="13" rx="1.5" fill={body} />
          <circle cx="18.5" cy="-124" r="5" fill={`hsl(${55} 100% 88%)`} opacity="0.95">
            <animate
              attributeName="opacity"
              values="0.95;0.35;0.95"
              dur={`${1.4 + phase * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="18.5" cy="-124" r="12" fill={`hsl(55 100% 80%)`} opacity="0.16">
            <animate
              attributeName="opacity"
              values="0.16;0.05;0.16"
              dur={`${1.4 + phase * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        </>
      );

    case "flag":
      return (
        <>
          {torso}
          <path d="M13-70l10-46 7 2-9 45z" fill={body} />
          <rect x="27" y="-176" width="3" height="66" fill={body} />
          <path
            d="M30-174c14 4 26-6 40-2v30c-14-4-26 6-40 2z"
            fill={`hsl(${hue} 82% 55%)`}
            opacity="0.92"
            style={{
              animation: `flag-wave ${1.8 + phase * 0.2}s ease-in-out infinite`,
              transformOrigin: "30px -160px",
            }}
          />
        </>
      );

    case "banner":
      return (
        <>
          {torso}
          <path d="M-13-70l-6-44 8-2 6 44zM13-70l6-44-8-2-6 44z" fill={body} />
          <rect
            x="-40"
            y="-152"
            width="80"
            height="36"
            rx="2"
            fill={`hsl(${hue} 70% 42%)`}
            opacity="0.9"
          />
          <rect
            x="-40"
            y="-152"
            width="80"
            height="36"
            rx="2"
            fill="none"
            stroke={rim}
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Text-free star motif on crowd banner */}
          <circle cx="0" cy="-134" r="7" fill={`hsl(${hue} 90% 88%)`} opacity="0.85" />
        </>
      );

    case "camera":
      return (
        <>
          {torso}
          <path d="M-13-70l-4-36 8-2 5 36zM13-70l4-36-8-2-5 36z" fill={body} />
          <rect x="-9" y="-124" width="18" height="12" rx="2" fill={body} />
          <rect
            x="-6"
            y="-121"
            width="12"
            height="6"
            rx="1"
            fill="oklch(0.75 0.13 200)"
            opacity="0.8"
          />
        </>
      );

    case "drum":
      return (
        <>
          {torso}
          <ellipse cx="0" cy="-30" rx="20" ry="13" fill={body} />
          <ellipse cx="0" cy="-34" rx="20" ry="8" fill={`hsl(40 40% 62%)`} opacity="0.5" />
          <g
            style={{
              animation: `arm-pump ${speed * 0.55}s ease-in-out ${phase}s infinite`,
              transformOrigin: "-14px -60px",
            }}
          >
            <path d="M-13-70l-12-16 6-5 12 15z" fill={body} />
          </g>
          <g
            style={{
              animation: `arm-pump ${speed * 0.55}s ease-in-out ${phase + 0.3}s infinite`,
              transformOrigin: "14px -60px",
            }}
          >
            <path d="M13-70l12-16-6-5-12 15z" fill={body} />
          </g>
        </>
      );

    case "shoulders":
      return (
        <>
          {torso}
          <path d="M-13-70l-8-14 6-6 10 14zM13-70l8-14-6-6-10 14z" fill={body} />
          <circle cx="0" cy="-128" r="7" fill={body} />
          <path d="M-9-119h18l4 22-6 16h-14l-6-16z" fill={body} />
          <g
            style={{
              animation: `arm-pump ${speed * 0.8}s ease-in-out ${phase}s infinite`,
              transformOrigin: "0px -116px",
            }}
          >
            <path d="M-9-117l-10-24 5-3 12 23zM9-117l10-24-5-3-12 23z" fill={body} />
          </g>
        </>
      );

    case "climb":
    default:
      return (
        <>
          <rect x="-34" y="-26" width="68" height="4" fill={body} opacity="0.9" />
          <rect x="-32" y="-26" width="4" height="26" fill={body} opacity="0.9" />
          <rect x="28" y="-26" width="4" height="26" fill={body} opacity="0.9" />
          <g transform="translate(0 -22)">
            {torso}
            <g
              style={{
                animation: `arm-pump ${speed}s ease-in-out ${phase}s infinite`,
                transformOrigin: "0px -70px",
              }}
            >
              <path d="M-13-70l-16-30 6-5 20 29zM13-70l16-30-6-5-20 29z" fill={body} />
            </g>
          </g>
        </>
      );
  }
}

export function CrowdLayer() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]">
      <div
        className="absolute inset-x-0 bottom-[46%] h-[26%] opacity-45"
        style={{
          background:
            "radial-gradient(circle at 6px 10px, oklch(0.13 0.02 45) 4px, transparent 5px) 0 0/13px 13px, radial-gradient(circle at 4px 8px, oklch(0.16 0.02 45) 3px, transparent 4px) 6px 4px/11px 11px",
          maskImage: "linear-gradient(to top, black 30%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent)",
        }}
      />

      <CrowdRow seed={101} count={104} depth={0.15} widthPct={100} opacity={0.72} />
      <CrowdRow seed={202} count={72} depth={0.42} widthPct={122} opacity={0.88} />
      <CrowdRow seed={303} count={46} depth={0.7} widthPct={152} />
      <CrowdRow seed={404} count={26} depth={1} widthPct={196} />

      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          background:
            "linear-gradient(to top, oklch(0.5 0.1 55 / 0.32), oklch(0.4 0.08 50 / 0.1) 50%, transparent)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
