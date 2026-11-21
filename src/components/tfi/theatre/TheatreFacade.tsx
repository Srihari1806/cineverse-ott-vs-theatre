/**
 * The building. A 1970s Indian single-screen: central art-deco tower carrying a
 * vertical neon light column, a deep marquee canopy over the arched entrance, ticket
 * windows in both wings, fluted pilasters, neon tube outlines and rooftop flex
 * hoardings. Drawn wide so the facade is the centrepiece — completely text-free.
 */
export function TheatreFacade() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[86%]">
      <svg
        viewBox="0 0 1600 790"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="tf-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.20 0.028 55)" />
            <stop offset="55%" stopColor="oklch(0.145 0.022 45)" />
            <stop offset="100%" stopColor="oklch(0.105 0.016 40)" />
          </linearGradient>
          <linearGradient id="tf-wall-lit" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.36 0.09 62)" />
            <stop offset="40%" stopColor="oklch(0.20 0.045 55)" />
            <stop offset="100%" stopColor="oklch(0.13 0.02 45)" />
          </linearGradient>
          <linearGradient id="tf-tower" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.13 0.02 45)" />
            <stop offset="38%" stopColor="oklch(0.26 0.05 58)" />
            <stop offset="62%" stopColor="oklch(0.23 0.045 58)" />
            <stop offset="100%" stopColor="oklch(0.11 0.018 42)" />
          </linearGradient>
          <linearGradient id="tf-canopy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.30 0.06 55)" />
            <stop offset="100%" stopColor="oklch(0.16 0.03 45)" />
          </linearGradient>
          <radialGradient id="tf-doorglow" cx="0.5" cy="1" r="0.9">
            <stop offset="0%" stopColor="oklch(0.92 0.15 78)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="oklch(0.72 0.16 65)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.4 0.12 50)" stopOpacity="0" />
          </radialGradient>
          <filter id="tf-neon" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tf-softneon" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(0 90)">
          {/* ── Outer wings ── */}
          <path d="M0 700V300h250v400z" fill="url(#tf-wall)" />
          <path d="M1600 700V300h-250v400z" fill="url(#tf-wall)" />
          {/* wing parapet */}
          <rect x="0" y="288" width="250" height="18" fill="oklch(0.24 0.04 55)" />
          <rect x="1350" y="288" width="250" height="18" fill="oklch(0.24 0.04 55)" />

          {/* ── Main block ── */}
          <path d="M230 700V180h1140v520z" fill="url(#tf-wall-lit)" />
          {/* stepped art-deco cornice */}
          <rect x="215" y="164" width="1170" height="22" fill="oklch(0.27 0.05 58)" />
          <rect x="255" y="142" width="1090" height="24" fill="oklch(0.23 0.042 55)" />
          <rect x="300" y="122" width="1000" height="22" fill="oklch(0.20 0.036 52)" />

          {/* ── Central tower ── */}
          <path d="M690 700V40h220v660z" fill="url(#tf-tower)" />
          <path d="M690 40h220l-30-32H720z" fill="oklch(0.30 0.055 58)" />
          {/* tower finial */}
          <path d="M790 8h20v-34l-10-16-10 16z" fill="oklch(0.32 0.06 60)" />
          <circle cx="800" cy="-46" r="7" fill="oklch(0.9 0.16 82)" filter="url(#tf-neon)">
            <animate
              attributeName="opacity"
              values="1;0.45;1"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* ── Fluted pilasters across the main block ── */}
          <g fill="oklch(0.235 0.04 56)">
            {[300, 420, 540, 960, 1080, 1200].map((x) => (
              <rect key={x} x={x} y="186" width="46" height="514" />
            ))}
          </g>
          <g stroke="oklch(0.30 0.05 60)" strokeWidth="2" opacity="0.7">
            {[300, 420, 540, 960, 1080, 1200].flatMap((x) =>
              [12, 23, 34].map((o) => <path key={`${x}-${o}`} d={`M${x + o} 190v508`} />),
            )}
          </g>

          {/* ── Neon outline tubes tracing the facade ── */}
          <g filter="url(#tf-neon)" fill="none" strokeLinecap="round">
            <path d="M232 186h1136" stroke="oklch(0.72 0.19 30)" strokeWidth="3.5" opacity="0.9" />
            <path
              d="M694 44v652M906 44v652"
              stroke="oklch(0.62 0.2 300)"
              strokeWidth="3"
              opacity="0.8"
            />
            <path
              d="M4 302h242M1354 302h242"
              stroke="oklch(0.7 0.18 200)"
              strokeWidth="3"
              opacity="0.75"
            />
            <path d="M258 148h1084" stroke="oklch(0.85 0.17 82)" strokeWidth="2.5" opacity="0.85">
              <animate
                attributeName="opacity"
                values="0.85;0.5;0.85"
                dur="3.4s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* ── Vertical Art-Deco Light Column on the tower (Text-Free) ── */}
          <rect
            x="742"
            y="70"
            width="116"
            height="360"
            rx="6"
            fill="oklch(0.10 0.015 40)"
            stroke="oklch(0.55 0.14 70)"
            strokeWidth="3"
          />
          {/* Glowing diamond star lattice on vertical sign */}
          <g filter="url(#tf-neon)">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i} transform={`translate(800, ${115 + i * 46})`}>
                <polygon points="0,-16 12,0 0,16 -12,0" fill="oklch(0.92 0.16 82)">
                  <animate
                    attributeName="opacity"
                    values="1;0.35;1"
                    dur={`${2.0 + (i % 3) * 0.4}s`}
                    begin={`${i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </polygon>
                <circle cx="0" cy="0" r="4" fill="oklch(0.75 0.22 30)" />
              </g>
            ))}
          </g>
          {/* Roundel Emblem */}
          <circle
            cx="800"
            cy="466"
            r="44"
            fill="oklch(0.12 0.02 40)"
            stroke="oklch(0.72 0.19 30)"
            strokeWidth="3"
            filter="url(#tf-softneon)"
          />
          <g transform="translate(800 466)" filter="url(#tf-neon)">
            <polygon
              points="0,-22 6,-8 20,-8 9,2 14,16 0,8 -14,16 -9,2 -20,-8 -6,-8"
              fill="oklch(0.92 0.16 82)"
            />
          </g>

          {/* chase bulbs framing the vertical sign */}
          <g>
            {Array.from({ length: 19 }).map((_, i) => (
              <g key={i}>
                <circle cx="732" cy={78 + i * 19} r="3.6" fill="oklch(0.95 0.13 85)">
                  <animate
                    attributeName="opacity"
                    values="1;0.15;1"
                    dur="1.2s"
                    begin={`${i * 0.06}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="868" cy={78 + i * 19} r="3.6" fill="oklch(0.95 0.13 85)">
                  <animate
                    attributeName="opacity"
                    values="1;0.15;1"
                    dur="1.2s"
                    begin={`${i * 0.06 + 0.6}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>

          {/* ── Rooftop flex hoardings on the wings (Text-Free Art) ── */}
          <g>
            <rect
              x="330"
              y="196"
              width="230"
              height="130"
              fill="oklch(0.16 0.03 45)"
              stroke="oklch(0.45 0.1 60)"
              strokeWidth="3"
            />
            <rect
              x="342"
              y="208"
              width="206"
              height="106"
              fill="oklch(0.24 0.09 28)"
              opacity="0.85"
            />
            {/* Geometric starburst graphic */}
            <g transform="translate(445 261)">
              {Array.from({ length: 12 }).map((_, k) => (
                <line
                  key={k}
                  x1="0"
                  y1="0"
                  x2={Math.cos((k * Math.PI) / 6) * 40}
                  y2={Math.sin((k * Math.PI) / 6) * 40}
                  stroke="oklch(0.9 0.16 80)"
                  strokeWidth="3"
                  filter="url(#tf-softneon)"
                />
              ))}
              <circle cx="0" cy="0" r="14" fill="oklch(0.72 0.2 30)" />
            </g>
          </g>
          <g>
            <rect
              x="1040"
              y="196"
              width="230"
              height="130"
              fill="oklch(0.16 0.03 45)"
              stroke="oklch(0.45 0.1 60)"
              strokeWidth="3"
            />
            <rect
              x="1052"
              y="208"
              width="206"
              height="106"
              fill="oklch(0.2 0.08 265)"
              opacity="0.85"
            />
            {/* Crown star emblem graphic */}
            <g transform="translate(1155 261)">
              <polygon
                points="0,-28 10,-8 30,-8 14,6 20,26 0,14 -20,26 -14,6 -30,-8 -10,-8"
                fill="oklch(0.92 0.16 85)"
                filter="url(#tf-softneon)"
              />
            </g>
          </g>

          {/* ── Marquee canopy ── */}
          <path d="M250 430h1100l40 54H210z" fill="url(#tf-canopy)" />
          <rect x="210" y="484" width="1180" height="14" fill="oklch(0.22 0.04 52)" />
          {/* canopy underside bulbs */}
          <g>
            {Array.from({ length: 39 }).map((_, i) => (
              <circle key={i} cx={236 + i * 30} cy="491" r="4.2" fill="oklch(0.96 0.12 84)">
                <animate
                  attributeName="opacity"
                  values="1;0.25;1"
                  dur="1.6s"
                  begin={`${(i % 6) * 0.22}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>

          {/* ── LED signboard under canopy (Text-Free Light Matrix) ── */}
          <rect
            x="470"
            y="502"
            width="660"
            height="46"
            rx="4"
            fill="oklch(0.07 0.01 40)"
            stroke="oklch(0.5 0.12 60)"
            strokeWidth="2"
          />
          <clipPath id="tf-ledclip">
            <rect x="474" y="506" width="652" height="38" />
          </clipPath>
          <g clipPath="url(#tf-ledclip)">
            {/* Dynamic light wave bars */}
            <g filter="url(#tf-softneon)">
              {Array.from({ length: 40 }).map((_, i) => (
                <circle
                  key={i}
                  cx={490 + i * 16}
                  cy="525"
                  r="5"
                  fill={i % 2 === 0 ? "oklch(0.86 0.19 42)" : "oklch(0.72 0.2 300)"}
                >
                  <animate
                    attributeName="cy"
                    values="515;535;515"
                    dur="1.8s"
                    begin={`${(i * 0.08) % 1.8}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="1.8s"
                    begin={`${(i * 0.08) % 1.8}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          </g>

          {/* ── Entrance arch ── */}
          <path d="M640 700V620a160 160 0 0 1 320 0v80z" fill="oklch(0.09 0.014 40)" />
          <path
            d="M640 700V620a160 160 0 0 1 320 0v80"
            fill="none"
            stroke="oklch(0.78 0.17 68)"
            strokeWidth="5"
            filter="url(#tf-neon)"
          />
          {/* warm lobby light spilling out of the doors */}
          <path d="M640 700V620a160 160 0 0 1 320 0v80z" fill="url(#tf-doorglow)" />
          {/* door mullions */}
          <g stroke="oklch(0.35 0.05 55)" strokeWidth="4" opacity="0.8">
            <path d="M720 700v-92M800 700v-116M880 700v-92" />
          </g>

          {/* ── Ticket windows in the wings ── */}
          {[360, 490, 1110, 1240].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="556"
                width="96"
                height="86"
                rx="4"
                fill="oklch(0.1 0.015 40)"
                stroke="oklch(0.42 0.08 60)"
                strokeWidth="3"
              />
              <rect
                x={x + 8}
                y="564"
                width="80"
                height="46"
                fill="oklch(0.62 0.13 72)"
                opacity="0.35"
                filter="url(#tf-softneon)"
              />
              <g stroke="oklch(0.5 0.06 60)" strokeWidth="2">
                <path
                  d={`M${x + 8} 578h80M${x + 8} 592h80M${x + 26} 564v46M${x + 52} 564v46M${x + 78} 564v46`}
                />
              </g>
            </g>
          ))}

          {/* ── Poster frames on the wings ── */}
          {[60, 1420].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="360"
                width="120"
                height="180"
                rx="3"
                fill="oklch(0.12 0.02 42)"
                stroke="oklch(0.55 0.13 68)"
                strokeWidth="3"
              />
              <rect
                x={x + 9}
                y="369"
                width="102"
                height="162"
                fill="oklch(0.26 0.1 32)"
                opacity="0.8"
              />
              <circle cx={x + 60} cy="450" r="28" fill="oklch(0.75 0.18 65)" filter="url(#tf-softneon)" />
            </g>
          ))}

          {/* ── Ground: wet tarmac reflecting the whole facade ── */}
          <rect x="0" y="672" width="1600" height="28" fill="oklch(0.075 0.012 40)" />
        </g>
      </svg>

      {/* Warm halo bleeding out of the entrance into the plaza */}
      <div
        className="absolute bottom-0 left-1/2 h-[42%] w-[46%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.85 0.16 72 / 0.35) 0%, oklch(0.7 0.15 60 / 0.14) 40%, transparent 72%)",
          filter: "blur(8px)",
          animation: "lobby-breathe 7s ease-in-out infinite",
        }}
      />
    </div>
  );
}
