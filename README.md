# Mohammad Asim — Portfolio

Next.js 14 + Tailwind CSS portfolio, styled around a terminal / receipt-printer
theme (fits the POS and desktop-software work).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Push this folder to a GitHub repo and import it on [vercel.com](https://vercel.com) —
zero config needed, it's a standard Next.js app.

## Content to edit

- `components/Hero.tsx` — name, tagline, intro text
- `components/Skills.tsx` — the `CATEGORIES` array
- `components/Experience.tsx` — the `ROLES` array
- `components/Projects.tsx` — the `PROJECTS` array (add new projects here as you ship them)
- `components/Contact.tsx` — email / phone

## Fonts

The build uses system font stacks (`ui-monospace` / `Manrope` fallback chain) so it
builds without network access. If you want the exact JetBrains Mono + Manrope
webfonts, swap in `next/font/google` in `app/layout.tsx` once you're deploying
somewhere with internet access (e.g. Vercel) — it works fine there:

```tsx
import { JetBrains_Mono, Manrope } from "next/font/google";
```
