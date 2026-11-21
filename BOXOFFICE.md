# Box-office integration

Existing curtain, theatre and pages are preserved. Source management appears in the homepage workbench and /intelligence.

## Local setup

A server-only TMDB_API_KEY was copied from the existing configured key. A random BOXOFFICE_ADMIN_TOKEN was generated in .env.local (never displayed or bundled). Restart npm run dev. Copy the token from that local file into the password field in Source management. It stays in React memory, not localStorage. Approved reports are public; imports, provider fetches, corrections, audit and pending reports require the token on every server request.

Use a dedicated admin session over HTTPS when hosted. This is a single-admin shared-secret interface, not a multi-user identity system.

## Providers (researched 21 November 2026)

1. CinemaIP https://cinemaip.ai/data-api advertises a no-card Free key and /v1/boxoffice/{cpid}, but publicly retrieved pricing did not establish boxoffice.live entitlement and Swagger response schema could not be retrieved. Adapter is deliberately disabled with an explicit status, rather than guessing a schema or making paid calls. Import attributed reports manually until the free endpoint contract and movie-ID mapping are verified.
2. Box Office History https://www.boxofficehistory.com/api documents public JSON, IMDb/TMDB lookups, domestic US/Canada figures and worldwide where present. Implemented ID lookup then movie detail fetch; exact missing numeric fields are omitted. Every imported record is pending, with unknown report date/status unless available. Review and add the genuine reporting date before approval. Historical coverage is not live Indian trade reporting. Attribution: Box Office History, from the Internet Archive's copies of Box Office Mojo. No title-only fuzzy matches.
3. API.SH https://api.sh/pricing advertises 1,000 monthly free credits. /boxofficemojo/v1/title uses IMDb id, /thenumbers/v1/movie requires its own explicit movie slug (not an inferred IMDb match). Both adapters implemented behind APISH_KEY + APISH_FREE_ONLY_CONFIRMED=true. BEFORE enabling, set a dedicated key's monthly cap at or below your remaining free allowance in the provider dashboard and no paid top-up. Our flag is an administrator attestation, not a balance API. No key/cap = disabled. 402/403/429 and network/schema failures skip gracefully; cached results don't spend new credits. Terms https://api.sh/legal/terms allow storing/displaying facts but do not transfer third-party rights. No scraping or raw API resale.
4. Manual/CSV imports have an empty downloadable template. Amounts are BASE units, not crore. All rows must validate and TMDB/IMDb matching must succeed before any record is inserted. Missing numeric values remain null; explicitly reported zero remains zero.

## Storage / deployment

Node-server preset is configured. BOXOFFICE_STORE_PATH defaults to .data/boxoffice/store.json and must reside on a durable writable volume. Atomic rename writes, serialized mutations, revision checks and append-only before/after audit entries prevent silent replacements. Cache keys are hashed so credentials are not embedded in persisted cache identifiers. Provider TTL is 24 hours; failures are not cached. This file store supports ONE Node process. Do not deploy multiple workers, ephemeral Vercel storage, or Cloudflare Workers with this backend: replace the repository with a transactional shared database first. CineVerse managed builds can force a Cloudflare preset; this persistence backend is not suitable for that target. Storage errors fail explicitly, not silently fall back to non-durable memory. Back up the store and restrict filesystem access.

## Interpretation / scenario rules

Reports remain separate across sources, dates, periods, currencies and territories. Same-source exact duplicates are ignored; revisions with changed amounts are retained. Conflicts for the same scope and report date require explicit acknowledgment before approval. Corrections preserve audit history and reset approval. There is no automatic currency conversion, summation, source averaging or producer-share inference.

Only approved worldwide INR cumulative/lifetime GROSS enters the INR crore scenario (divide by 10,000,000). Other records remain visible but cannot be applied. Net, distributor share, producer share and territorial figures are never silently substituted. Profitability still applies the user's explicit producer-share assumption and other costs/rights inputs; ROI and break-even remain scenarios, not audited actual profits. Marketing budget is synchronized with scenario marketing cost. Campaign export includes the selected collection report and financial assumptions. Changing gross manually clears source attribution.

## Verification

node scripts/test-boxoffice.mjs uses synthetic fixtures and a mocked network; it never saves collection numbers to the real store. Covers CSV quotes/newlines, malformed dates, missing/negative amounts, URL protocols, duplicate records, isolated scopes/conflicts, approval guards, authentication, cache reuse, stale updates and audit retention.

Live provider calls require working network access. Tests do not establish live provider coverage or account entitlement. No fabricated seed collections are included. Existing illustrative dashboard charts are unchanged and remain explicitly labelled as illustrative.

## Verification update — 21 November 2026

Production build PASSED with `node node_modules/vite/bin/vite.js build --configLoader native` (Node 26). npm dev/build/preview scripts now use this loader to avoid the default loader's Windows spawn EPERM failure. Financial calculations were extracted and tested for break-even, gross-to-producer-share separation, zero investment, and invalid share assumptions.

`node scripts/test-boxoffice.mjs` PASSED. No real financial data is created by those tests.

Built Node server starts and reports its listening URL. Full production HTTP smoke (`node --env-file=.env.local scripts/smoke-boxoffice.mjs`) is BLOCKED: loopback fetch returns EACCES in this environment. External provider requests were unavailable too. Browser attachment timed out. Consequently rendered UI, real API credentials and live collection retrieval are NOT certified by this verification.

Full-project TypeScript check still fails in existing arena and other legacy files. The production bundle builds, but the project must not be described as fully type-clean or fully end-to-end tested.

Resume-safe scope: film profitability scenario modelling, source-attributed collection review, CSV imports, approval/audit workflow and three-phase campaign planning. Do not claim live Indian collection coverage, production deployment, validated prediction accuracy, user adoption or measured growth outcomes.
