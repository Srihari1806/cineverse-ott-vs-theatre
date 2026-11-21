# 🎬 CineVerse — Entertainment Intelligence OS & Decision Cockpit

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://cinephile-theatre.vercel.app)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.170-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Two Screens. One Story.**  
> CineVerse is an end-to-end entertainment intelligence platform designed to bridge theatrical exhibition economics with OTT streaming distribution. Built for producers, film distributors, analysts, and marketing strategists, it unifies predictive decision engines, financial modeling, audience analytics, and full Go-To-Market (GTM) execution frameworks into one integrated cockpit.

---

## 🌟 Live Deployment

- **Production URL:** [https://cinephile-theatre.vercel.app](https://cinephile-theatre.vercel.app)
- **Local Development:** `http://localhost:3000`

---

## 🚀 Key Modules & Capabilities

### 1. 🎯 Strategy Lab (Producer's Decision Cockpit)
- **Greenlight Simulator:** Multi-variable decision engine scoring commercial viability across Star Power tiers, budget categories, genre benchmarks, and director track records.
- **Release Chess (Clash Planner):** Models festival release windows (Sankranti, Diwali, Eid) versus solo windows, calculating screen cannibalization and box office upside.
- **Window Wars Simulator:** Simulates theatrical holdover duration (4-week vs 8-week windows) against OTT acquisition price premiums and streaming decay curves.
- **Screen Economics Engine:** Compares Single-Screen mass occupancy vs. Multiplex Average Ticket Price (ATP) dynamics, distributor shares, and territory recovery splits.

### 2. 📊 Box Office Intelligence & Financial Modeling
- **P&A & Break-Even Calculator:** Real-time financial calculations modeling production, distribution, and marketing costs against theatrical distributor share and ancillary rights (Digital, Satellite, Audio, Overseas).
- **Decay & Multiplier Curves:** Real-time tracking of FDFS (First Day First Show) opening day momentum versus weekend word-of-mouth multipliers.
- **Source Verification & Audit Trails:** Multi-source reconciliation (TMDB, IMDb, API.SH, manual CSV imports) with automated conflict detection and cryptographically audited review records.

### 3. 📣 Campaign War Room (6-Phase GTM Strategy)
- **Structured Rollout Roadmaps:**
  1. *Concept Reveal & Casting Hype*
  2. *First Look & Teaser Velocity*
  3. *Musical Launch & Mass Promos*
  4. *Trailer & Mega Pre-Release Events*
  5. *Release Day (FDFS) Surge & Word-of-Mouth*
  6. *Post-Theatrical Long-Tail & OTT Debut*
- **Budget Allocation Simulator:** Marketing Mix Modeling (MMM) across Digital, Influencer, Outdoor Hoardings, Television/Print, and Grassroots Ground Events with projected ROI metrics.

### 4. 🌐 StreamHub & Film Universe
- **Cross-Platform OTT Aggregator:** Unified catalog indexing streaming availability across Netflix, Prime Video, Aha, Disney+ Hotstar, and Zee5.
- **What-To-Watch Interactive Quiz:** Preference-driven recommendation engine tailoring recommendations based on mood, genre, runtime, and platform availability.

### 5. 🎭 Banisa 3D VR Theatre & Community Wall
- **Interactive 3D Plaza Experience:** Canvas and Three.js-powered 3D virtual cinema facade with real-time lighting, interactive star cutouts, and marquee banner animations.
- **Fandom Dynamics:** Real-time sentiment gauge (buzz index), meme creator studio, and community fan-war analytics.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS, Radix UI Primitives, Lucide Icons, Recharts.
- **Routing & SSR:** TanStack Router (`@tanstack/react-router`) with full file-based routing and SSR hydration.
- **3D & Creative Tech:** Three.js and HTML5 Canvas scene management with custom texture loaders and particle systems.
- **Server & APIs:** TanStack Start, Nitro server preset (Node.js & Vercel Serverless Build Output API v3), reverse proxy for TMDB API, and Zod data validation.

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Srihari1806/cineverse-ott-vs-theatre.git

# Navigate into the project directory
cd cineverse-ott-vs-theatre

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
# Build production client and server bundles
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```text
├── public/                 # Static assets, posters, cutout textures, robots.txt
├── src/
│   ├── assets/             # Brand logos, auditorium backdrops, illustrations
│   ├── components/
│   │   ├── arena/          # Interactive lobby, cheering controls, cutouts
│   │   ├── banisa3d/       # Three.js 3D theatre facade, plaza, camera director
│   │   ├── boxoffice/      # Financial models, source reconciliation manager
│   │   ├── cineverse/      # Grand curtain reveal, navigation, dashboards
│   │   ├── streamhub/      # Calendar matrices, search directory, quiz
│   │   ├── tfi/            # Fandom meters, meme studio, social pipelines
│   │   └── ui/             # Radix-based accessible UI design system
│   ├── data/               # Analytical data models, KPIs, filmography sets
│   ├── lib/
│   │   ├── boxoffice/      # Finance equations, Zod validation schemas
│   │   └── tmdb.ts         # TMDB client & proxy utilities
│   ├── routes/             # TanStack file-based routes
│   │   ├── index.tsx       # Landing workbench & executive dashboard
│   │   ├── intelligence.tsx# Box office decay & market intelligence lab
│   │   ├── strategy.tsx    # Producer's Greenlight & Release Chess tools
│   │   ├── campaign.tsx    # 6-phase GTM campaign war room
│   │   ├── streamhub.tsx   # OTT streaming aggregator & release matrix
│   │   └── fandomony.tsx   # Fandom analytics & meme creation engine
│   └── router.tsx          # TanStack router configuration
├── vite.config.ts          # Vite & Nitro server configuration
└── package.json            # Project manifest & script declarations
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
