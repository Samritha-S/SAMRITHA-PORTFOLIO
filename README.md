# Samritha S — Interactive Personal Archive & Technical Portfolio

A dual-personality interactive portfolio with a seamless, signature morph transition between the warm personal **Unfiltered View ("Mystic Amethyst")** and the composed technical **Filtered View ("Blue Noir")**, tied together with a unifying antique gold (`#C9A24B`) inlay accent.

Built with Next.js 15, React 19, TypeScript, Tailwind CSS, **KokonutUI**, **Bklit UI**, and Motion.

---

## 🏛️ Architecture & Project Structure

The project is structured as a decoupled monorepo adhering strictly to the **Critical Security Requirement (§6.2)**: the admin app is completely isolated and cannot be reached or discovered through the public site.

```text
├── apps/
│   ├── web/                     # Public Portfolio App (Next.js 15 App Router)
│   │   ├── components.json      # Configured with @kokonutui and @bklit registries
│   │   ├── src/
│   │   │   ├── app/             # Page & public API routes (/api/wall, /api/content)
│   │   │   ├── components/
│   │   │   │   ├── kokonutui/   # Button, ParticleButton, Card, FilterToggle
│   │   │   │   ├── bklit/       # AreaChart, CommitGraph (data visualizations)
│   │   │   │   ├── unfiltered/  # Hero, About, Journey, Interests, Wall of Notes
│   │   │   │   ├── filtered/    # Hero, About, Journey, Projects, Skills, CP, GitHub, Resume
│   │   │   │   └── shared/      # Navbar, Footer, Blog, Photo Gallery, Contact
│   │   │   ├── context/         # ViewContext (seamless state & localStorage sync)
│   │   │   └── lib/             # Utilities (cn, tailwind merge)
│   │
│   └── studio/                  # Private Content Management Studio (Port 3001)
│       ├── src/
│       │   └── app/page.tsx     # Journey CRUD, Wall Moderation Queue, Projects, Resume Link
│
├── package.json                 # Monorepo scripts
└── pnpm-workspace.yaml          # PNPM workspace definition
```

---

## 🚀 Quick Start

### 1. Run the Public Portfolio
```bash
pnpm dev
# or: cd apps/web && pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- Default view on first visit is **Unfiltered ("Mystic Amethyst")**.
- Click the top-right persistent control **"Filter the site"** to trigger the signature morph into the **Filtered ("Blue Noir")** technical portfolio.

### 2. Run the Private Admin Studio
```bash
pnpm dev:studio
# or: cd apps/studio && pnpm dev
```
Open **[http://localhost:3001](http://localhost:3001)** in your browser.

- **Journey Milestones Manager**: Add real personal or engineering milestones, edit entries, or delete design placeholders.
- **Wall Moderation Queue**: Review visitor comments submitted through the Wall of Notes. Approve them to go live or reject spam.
- **Projects & Prototypes**: Manage hackathons, descriptions, tags, and live demo links.
- **Resume Manager**: Update the downloadable resume PDF URL.

---

## 🎨 Design System

### 1. Dual Palettes
- **Unfiltered ("Mystic Amethyst")**:
  - `bg-base`: `#2C3436` (Weathered Pewter)
  - `bg-elevated`: `#4B3C58` (Mystic Amethyst)
  - `accent-primary`: `#91967A` (Sage Drift)
  - `accent-secondary`: `#607785` (Dusk Blue)
  - `text-primary`: `#E3DDC7` (Sand & Shell)
  - `accent-gold`: `#C9A24B` (Antique Gold Inlay)
- **Filtered ("Blue Noir")**:
  - `bg-base`: `#011627` (Blue Noir)
  - `bg-elevated`: `#303D3B` (Hawthorne Green)
  - `accent-primary`: `#795663` (Royal Scepter)
  - `accent-secondary`: `#8A9688` (Thistle)
  - `text-primary`: `#D9BCAF` (Dusky Rose)
  - `accent-gold`: `#C9A24B` (Consistent Unifying Thread)

### 2. Bespoke Micro-Interactions
- **Interests & Hobbies**:
  - *Music*: Interactive waveform scrub audio visualizer.
  - *Mint Chocolate Chip*: Interactive flavor bite tracker and scoop animation.
  - *Marvel*: Cinema lore flip card revealing favorite quotes.
  - *Walking*: Ambient step path visualizer and stride accumulator.
  - *Petting Every Dog I See*: Interactive cursor-follow tail wag and pet counter.
  - *Poetry & Writing*: Parchment flip notebook card.
  - *Travelling*: Postcards stack with interactive card focus.
- **Bklit UI Data Visualizations**:
  - Real-time development velocity area chart with smooth cubic bezier paths.
  - 24-week GitHub contribution heatmap grid and telemetry badges.

---

## 🛠️ Verification & Build Commands

```bash
# Build public web app
pnpm --filter web build

# Build admin studio
pnpm --filter studio build

# Build all apps
pnpm build
```
Both applications build with **zero TypeScript errors and zero warnings**.
