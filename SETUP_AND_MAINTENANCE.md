# DarkLoops Component Lab: Setup & Maintenance Tasks

This document serves as a reference for setting up, maintaining, and extending this design system repository.

## 🛠 Setup & Initialization
- [ ] **Install Dependencies:** Run `pnpm install` to ensure all packages (React 19, Next 14, Tailwind v4) are correctly linked.
- [ ] **Verify Next.js Build:** Run `pnpm build` to check for TypeScript or ESLint errors (note: currently ignored in `next.config.mjs`, consider re-enabling for strict checks).
- [ ] **Run Development Server:** Execute `pnpm dev` and verify the showcase loads on `http://localhost:3000`.

## 📦 Component Maintenance
- [ ] **Adding New Primitives:** When adding a new shadcn component, use `npx shadcn-ui@latest add <component>` to ensure it aligns with `components.json`.
- [ ] **Custom Brand Components:** Place new custom components in `components/` (e.g., `components/lupo-new-widget.tsx`). Ensure they utilize CSS variables defined in `app/globals.css`.
- [ ] **Update Showcase:** If a new component is added, import and render it in `components/component-showcase.tsx` or create a new showcase section.

## 🎨 Styling & Theming
- [ ] **CSS Variable Updates:** Modify core theme variables (`--background-dark`, `--electric-primary`) in `app/globals.css` inside the `@theme inline` block for Tailwind v4 compatibility.
- [ ] **Animation Tweaks:** Add new keyframes and animation utility classes in the `@layer base` section of `globals.css`.

## 🚀 Deployment & Syncing
- [ ] **v0.app Sync:** When changes are made in v0, pull the latest commits. Merge any conflicts in custom logic carefully.
- [ ] **Vercel Checks:** Monitor the Vercel dashboard to ensure the production showcase is deploying without build errors.

## 🧹 Code Quality
- [ ] **Linting:** Run `pnpm lint` before pushing changes.
- [ ] **Dependency Updates:** Periodically run `pnpm outdated` and update core libraries (Next.js, Radix UI, Tailwind).
