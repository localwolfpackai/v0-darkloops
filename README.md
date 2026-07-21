# DarkLoops Components

A dark-themed **component & motion lab** for Lupo Studios — a living showcase of custom UI
primitives, type, color, and effect experiments. Built in [v0.app](https://v0.app), deployed on Vercel.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lupostudios/v0-darkloops)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/gwXJCrz4WRz)

## What's in here

Custom components live in `components/` (shadcn/radix primitives in `components/ui/`):

- **Brand primitives** — `lupo-button`, `lupo-card`, `lupo-chip`, `logo`
- **Showcases** — `component-showcase`, `typography-showcase`, `effect-showcase`, `color-palette`
- **Creative surfaces** — `hero-section`, `ai-zone`, `creative-space`, `prompt-library`, `blueprint-tile`, `agent-note`
- **Chrome** — `navigation`, `section-header`, `theme-provider`

Design reference snapshots (including the hero before/after) live in [`design/`](design/).

## Stack

Next.js 14 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/radix · next-themes · Vercel Analytics.

## Develop

```bash
pnpm install
pnpm dev     # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## v0 sync

This repo stays in sync with its [v0.app](https://v0.app/chat/gwXJCrz4WRz) project — changes deployed
from v0 are pushed here automatically, and Vercel deploys the latest. Edit in v0 for synced changes;
edit here directly for anything v0 doesn't manage (like this README and the `design/` folder).
