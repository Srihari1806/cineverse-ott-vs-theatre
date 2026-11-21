import type { CutoutHero } from "@/data/theatre";

/**
 * Hand-authored pose silhouettes for the six cutouts.
 *
 * Real fan cutouts are flat plywood boards with the hero painted on them, lit
 * from below by tube lights — so a cut, backlit silhouette is the honest shape.
 * Each pose is built from primitives (viewBox 0 0 200 460, feet at y=452) so the
 * proportions stay consistent across all six boards.
 *
 * Drop a real cutout PNG at /public/cutouts/<hero id>.png and CutoutBoard will
 * layer it on top of this automatically.
 */

interface FigureProps {
  figure: CutoutHero["figure"];
}

export function CutoutFigure({ figure }: FigureProps) {
  return (
    <svg
      viewBox="0 0 200 460"
      preserveAspectRatio="xMidYMax meet"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        {/* Painted-board shading: cutouts are lit hot from the tube lights at
            their base and fall off toward the head. */}
        <linearGradient id={`cf-paint-${figure}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--cutout-lit)" />
          <stop offset="45%" stopColor="var(--cutout-mid)" />
          <stop offset="100%" stopColor="var(--cutout-dark)" />
        </linearGradient>
        <linearGradient id={`cf-rim-${figure}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--cutout-rim)" stopOpacity="0.95" />
          <stop offset="30%" stopColor="var(--cutout-rim)" stopOpacity="0" />
          <stop offset="72%" stopColor="var(--cutout-rim)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--cutout-rim)" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <g fill={`url(#cf-paint-${figure})`}>{POSES[figure]}</g>
      {/* Rim light hugging both edges of the board */}
      <g fill={`url(#cf-rim-${figure})`} style={{ mixBlendMode: "screen" }}>
        {POSES[figure]}
      </g>
    </svg>
  );
}

// ─── Pose definitions ─────────────────────────────────────────────────────────

const salaar = (
  <>
    {/* long hair */}
    <path d="M76 40c0-18 11-30 24-30s24 12 24 30c0 12-2 22-6 30l4 22-14-6-16 0-14 6 4-22c-4-8-6-18-6-30z" />
    {/* head */}
    <ellipse cx="100" cy="44" rx="20" ry="24" />
    {/* neck + shoulders */}
    <path d="M92 62h16v16l24 8-40 10-40-10 24-8z" />
    {/* flared long coat */}
    <path d="M100 78 62 92 40 190 26 288l30 8 8-96 4 130h64l4-130 8 96 30-8-14-98-22-98z" />
    {/* wind-caught coat tail, left */}
    <path d="M40 190 8 250l-4 54 26-16 12-52z" />
    {/* wind-caught coat tail, right */}
    <path d="M160 190l32 60 4 54-26-16-12-52z" />
    {/* wide power stance — left leg */}
    <path d="M68 330 44 430l-8 22h32l6-24 18-90z" />
    {/* right leg */}
    <path d="M132 330l24 100 8 22h-32l-6-24-18-90z" />
    {/* left arm hanging, chain in fist */}
    <path d="M62 92 44 176l-6 44 20 4 8-44 14-76z" />
    <path d="M38 218a11 11 0 1 0 22 0 11 11 0 1 0-22 0z" />
    {/* chain links dropping to the deck */}
    <path d="M46 236c8 10-6 20 2 30s-6 20 2 30 -6 20 2 30 -6 20 2 30l10-2c-8-10 6-20-2-30s6-20-2-30 6-20-2-30 6-20-2-30z" />
    {/* right arm out, fist clenched */}
    <path d="M138 92l20 78 8 42-20 6-10-46-16-72z" />
    <path d="M156 212a11 11 0 1 0 22 0 11 11 0 1 0-22 0z" />
  </>
);

const og = (
  <>
    {/* wide-brim silhouette + swept hair */}
    <path d="M58 40h84l-8-10c-6-8-18-14-34-14S70 22 64 30z" />
    <ellipse cx="100" cy="52" rx="19" ry="23" />
    {/* stubble jaw block reads as the OG beard */}
    <path d="M84 58c0 12 7 20 16 20s16-8 16-20l-4 16c-2 8-6 12-12 12s-10-4-12-12z" />
    <path d="M92 70h16v14l22 8-38 10-38-10 22-8z" />
    {/* mid-stride overcoat, flaring behind the walk */}
    <path d="M100 84 64 98 46 200l-8 84 26 6 8-84 2 92h72l2-92 8 84 26-6-8-84-18-102z" />
    {/* trailing coat tail whipped back */}
    <path d="M154 200l38 40 10 44-30-10-20-40z" />
    {/* front leg striding forward */}
    <path d="M72 328 46 420l-14 20 28 12 14-26 26-88z" />
    {/* back leg pushing off */}
    <path d="M130 328l22 88 16 22-26 14-16-26-24-88z" />
    {/* left arm swinging back */}
    <path d="M64 100 44 180l-10 40 20 8 12-42 16-78z" />
    {/* right arm bent up, cigarette at the lips */}
    <path d="M138 100l22 56-30 34-14 14 12 14 22-20 34-38-24-64z" />
    <rect x="112" y="56" width="20" height="5" rx="2.5" transform="rotate(-14 122 58)" />
  </>
);

const rangasthalam = (
  <>
    {/* unruly village hair */}
    <path d="M78 40c2-18 10-28 22-28s20 10 22 28c1 10-2 16-6 20l-32 0c-4-4-7-10-6-20z" />
    <ellipse cx="100" cy="48" rx="19" ry="22" />
    {/* moustache */}
    <path d="M88 56h24l-4 6H92z" />
    <path d="M92 66h16v14l20 8-36 10-36-10 20-8z" />
    {/* bare torso with the shirt open */}
    <path d="M100 82 68 96 54 172l-6 62 24 6 8-62 2 66h44l2-66 8 62 24-6-6-62-14-76z" />
    {/* towel slung over the left shoulder */}
    <path d="M70 92 52 150l-6 62 16 4 8-62 14-56z" opacity="0.92" />
    {/* folded lungi — the Chitti Babu tell */}
    <path d="M62 236h76l14 84-52 10-52-10z" />
    {/* bare left leg */}
    <path d="M78 322 62 424l-8 20h30l4-22 14-92z" />
    {/* bare right leg */}
    <path d="M122 322l16 102 8 20h-30l-4-22-14-92z" />
    {/* left arm down at the side */}
    <path d="M66 96 48 172l-6 42 20 4 8-44 14-70z" />
    {/* right arm folded up, palm cupped behind the ear */}
    <path d="M134 96l26 44-6 40-24 6-6-22 16-6 4-24-20-30z" />
    <path d="M124 44c14-6 24 0 26 10s-6 18-16 18l-4-12 6-4c-2-6-6-8-12-6z" />
  </>
);

const pushpa = (
  <>
    <g transform="rotate(-11 100 96)">
      {/* half-tied hair */}
      <path d="M78 42c0-18 10-30 22-30s22 12 22 30c0 10-2 18-6 24l-32 0c-4-6-6-14-6-24z" />
      <path d="M118 24c12-2 18 6 16 16-1 8-6 12-12 12z" />
      <ellipse cx="100" cy="50" rx="19" ry="23" />
      {/* full beard */}
      <path d="M81 54c0 20 8 32 19 32s19-12 19-32l-5 22c-3 12-8 18-14 18s-11-6-14-18z" />
    </g>
    <path d="M92 76h16v12l22 8-38 10-38-10 22-8z" />
    {/* open shirt over bare chest */}
    <path d="M100 82 66 96 52 180l-6 66 26 6 8-66 2 70h36l2-70 8 66 26-6-6-66-14-84z" />
    {/* lungi */}
    <path d="M60 246h80l12 82-52 10-52-10z" />
    <path d="M78 330 62 428l-8 22h30l4-24 14-88z" />
    <path d="M122 330l16 98 8 22h-30l-4-24-14-88z" />
    {/* left arm loose at the side */}
    <path d="M64 98 46 178l-6 44 20 4 8-46 14-74z" />
    {/* right arm folded across, knuckles propping up the chin */}
    <path d="M140 100l18 46-14 34-40 14-8-18 34-14 6-18-14-34z" />
    <path d="M96 82c10-6 20-2 22 6s-4 16-14 16-14-6-14-12z" transform="rotate(-11 100 96)" />
  </>
);

const devara = (
  <>
    {/* wet hair pushed back */}
    <path d="M79 42c0-18 9-28 21-28s21 10 21 28c0 10-2 16-5 20H84c-3-4-5-10-5-20z" />
    <ellipse cx="100" cy="48" rx="19" ry="23" />
    {/* heavy trapezius into wide shoulders */}
    <path d="M92 66h16v12l34 14-42 12-42-12 34-14z" />
    {/* muscular torso, lats flared */}
    <path d="M100 78 58 96 40 178l-4 64 28 8 10-70 2 84h48l2-84 10 70 28-8-4-64-18-82z" />
    {/* dhoti, hitched for a fight */}
    <path d="M56 250h88l10 70-54 12-54-12z" />
    <path d="M76 332 58 428l-10 22h32l6-24 18-84z" />
    <path d="M124 332l18 96 10 22h-32l-6-24-18-84z" />
    {/* left arm thrown wide */}
    <path d="M58 96 22 148 2 202l20 12 22-52 34-44z" />
    <path d="M2 202a13 13 0 1 0 26 0 13 13 0 1 0-26 0z" />
    {/* right arm thrown wide, gripping the spear */}
    <path d="M142 96l36 52 20 54-20 12-22-52-34-44z" />
    <path d="M172 202a13 13 0 1 0 26 0 13 13 0 1 0-26 0z" />
    {/* spear shaft + head */}
    <rect x="182" y="40" width="6" height="400" rx="3" />
    <path d="M185 8l12 34h-24z" />
  </>
);

const pokiri = (
  <>
    {/* clean side-part */}
    <path d="M80 40c0-16 9-26 20-26s20 10 20 26c0 8-2 14-5 18H85c-3-4-5-10-5-18z" />
    <ellipse cx="100" cy="46" rx="18" ry="22" />
    {/* popped collar */}
    <path d="M92 64h16v14l26 10-34 12-34-12 26-10z" />
    {/* tailored jacket, slight contrapposto */}
    <path d="M100 80 68 94 56 178l-6 62 24 6 8-62 2 68h40l2-68 8 62 24-6-6-62-12-84z" />
    {/* jacket vent */}
    <path d="M96 178h8l-2 74h-4z" opacity="0.55" />
    {/* trousers, weight on the front leg */}
    <path d="M74 244 62 356l-6 74-8 20h30l4-22 12-72 6-56z" />
    <path d="M126 244l12 112 6 74 8 20h-30l-4-22-12-72-6-56z" />
    {/* left hand buried in the pocket */}
    <path d="M66 96 50 168l-4 32 22 10 6-38 14-66z" />
    {/* right arm bent, cigarette held at the mouth */}
    <path d="M136 96l20 52-26 32-16 12 10 16 24-18 32-38-22-60z" />
    <rect x="110" y="52" width="22" height="5" rx="2.5" transform="rotate(-16 121 54)" />
  </>
);

const POSES: Record<CutoutHero["figure"], React.ReactNode> = {
  salaar,
  og,
  rangasthalam,
  pushpa,
  devara,
  pokiri,
};
