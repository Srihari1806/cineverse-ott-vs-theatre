# CineVerse — Two Screens, One Story

A moviebuff-grade portfolio piece: a cinematic scroll experience that opens on a dark theatre with a red velvet curtain, parts to reveal a glowing screen, morphs that glow into an OTT/phone frame, then lands in an immersive dashboard shaped like an auditorium — where each seat/tile is a data lens (Box Office, OTT Insights, Genre, Reviews, Demographics, Marketing, Lifecycle, COVID, Business Model).

## Aesthetic thesis

- Dune/Kalki poster lighting: deep black, warm ember/amber halos, faint dust, subtle spotlight vignettes.
- Type: display serif for hero + editorial ("Instrument Serif" style) paired with a clean sans (Inter/Space Grotesk) for data/UI.
- Palette (dark only, no light mode toggle):
  - background: near-black `oklch(0.09 0.01 40)`
  - ember primary: warm gold-amber `oklch(0.78 0.16 70)`
  - crimson accent (curtain / theatre): `oklch(0.48 0.18 25)`
  - screen-glow (OTT): cool white `oklch(0.97 0.02 90)`
- Gradients: radial ember spotlight, screen-glow bloom, curtain crimson-to-black.
- Custom "CINEVERSE" wordmark with Dune-style eclipse halo (SVG, generated).

## Sections (single-page scroll)

1. **Hero — Curtain rig**
   - Full-viewport dark stage. Two SVG velvet curtain panels close at top, tasseled ropes. On load, they part with easing (transform: scaleX + skew) revealing a bright cinema screen behind. Faint projector cone + floating dust particles.
   - Eclipse "CINEVERSE" logo glowing above the proscenium. Tagline: "Two Screens. One Story."
   - CTA: "Enter the Auditorium".
   - Scroll cue.

2. **Transition — Screen morphs to phone**
   - As user scrolls, the cinema screen (wide 21:9 white bloom) scales down, corners round, bezels appear → becomes a phone / OTT interface glowing in the dark. Uses `scroll-driven` CSS or scroll-linked `useScroll` from framer-motion. Copy: "From the proscenium… to your palm." Chrome subtly shifts from theatre red to OTT dark.

3. **Auditorium Dashboard (immersive)**
   - Perspective-tilted stage backdrop image (generated: empty auditorium seats + illuminated screen, Dune lighting). Overlaid glass tiles arranged like a curved seat-row of "data lenses":
     - Box Office • OTT Insights • Audience • Genres • Reviews & Sentiment • Marketing Impact • Demographics • Content Lifecycle • Industry Comparison • COVID Impact
   - Active tile expands into a detail panel (charts) below with smooth layoutId morph. Left rail = quick nav; center = expanded panel; right rail = "Trending" leaderboard.
   - Charts (Recharts): line (Box Office trend), donut (Genre share, OTT vs Theatre split), bar (Day-wise collection, Age vs platform), gauge-style sentiment (SVG).

4. **Content lens sections** (each a full stage as user scrolls):
   - Genre Performance (mass vs niche)
   - Reviews & WOM impact (rating vs revenue scatter + Day1/Day3 drop bars)
   - Distribution — Urban vs Rural table + occupancy bars
   - Booking Behavior — heatmap grid (time × day) + funnel
   - Content Lifecycle — revenue curve theatre→OTT window
   - Marketing & Promotion — campaign vs engagement spike
   - Demographics — age × genre matrix, platform-by-age
   - COVID Impact — before/during/after multi-line
   - Business Model — OTT vs Theatre revenue comp

5. **Case Study — Pushpa 2 (mandatory)**
   Editorial magazine layout: hero still, timeline (hype → opening → reviews → OTT), pull quotes, mini-metrics.

6. **Reports** — three linkable report cards with SVG covers.

7. **Footer** — "Directed by [name] • A CineVerse production" + minimal nav.

## Technical

- TanStack Start routes:
  - `/` — full cinematic single page (all sections above).
  - `/case-study/pushpa-2` — dedicated case study route with its own head().
  - `/reports/theatres-survive`, `/reports/reviews-impact`, `/reports/covid-reshaped` — three report routes.
  - `sitemap.xml` + `robots.txt`.
- Add `framer-motion` for scroll orchestration (curtain rig, screen morph, tile layout transitions).
- Add `recharts` for charts.
- Design tokens: rewrite `src/styles.css` with dark-only ember palette, radial gradients, curtain gradient, screen-glow, ember shadow, custom fonts loaded via `<link>` in `__root.tsx` (Instrument Serif + Inter).
- Generate images (premium where text/logo, fast for backgrounds):
  - CineVerse eclipse logo (transparent PNG, Dune-style)
  - Empty auditorium hero backdrop (dark, ember-lit)
  - Curtain texture panels (left/right) or render with pure CSS/SVG — prefer SVG for interactivity.
  - Pushpa-2-style case-study still (generic "throne cinema poster" to avoid IP)
  - 3 report cover illustrations.
- All data is realistic mock JSON in `src/data/*.ts` (no backend needed).
- `__root.tsx` head(): real title/description/og for CineVerse. Leaf routes get their own head with og:image where meaningful.
- Replace placeholder `src/routes/index.tsx` with hero+full landing.

## Non-goals

- No auth, no Lovable Cloud, no database — this is a portfolio showcase with static curated data.
- No light mode toggle.
- No 3D WebGL (Three.js) — the "3D immersive" feel is achieved with CSS 3D transforms, perspective, layered SVG, and scroll-linked framer-motion, keeping build fast and deployable.

## Deliverable definition of done

- `/` loads on dark stage, curtain parts on load, hero visible with CineVerse logo + tagline + CTA.
- Scrolling smoothly morphs cinema screen → phone glow → dashboard.
- Dashboard tiles are clickable and expand a chart panel with a real animated transition.
- Every subsequent section renders with charts populated from mock data.
- Case study page + 3 report pages exist and are linked.
- No console errors, build passes, meta tags customized.
