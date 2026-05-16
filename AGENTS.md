# AGENTS.md

Operational guide for AI coding agents (Claude Code, Cursor, etc.) working in this repo. Humans can read it too — but the audience is an agent picking up the project cold.

## What this project is

A small, content-driven portfolio site for **Pete McPherson**. The primary conversion goal of the site is **newsletter signups**; everything else is supporting context.

Three pages, lots of whitespace, single bold red accent, no JS unless absolutely required.

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | [Astro](https://astro.build/) `^6.3` | Static output, zero JS by default |
| Styling | [Tailwind CSS](https://tailwindcss.com/) `^3.4` via `@astrojs/tailwind` | Utility-first |
| Fonts | [Fontshare](https://www.fontshare.com/) | `Khand` (headings, uppercase) + `Switzer` (body) |
| Sitemap | `@astrojs/sitemap` | Generates `sitemap-index.xml` at build |
| Hosting | Cloudflare Pages | Static output from `dist/` |

Node 18+ required.

## Commands

```bash
npm install          # install deps (use --legacy-peer-deps if you hit ERESOLVE)
npm run dev          # http://localhost:4321
npm run build        # static output to ./dist
npm run preview      # serve the built site locally
```

A successful build prints `3 page(s) built` and creates `dist/sitemap-index.xml`.

## File layout

```
pete-site/
├── astro.config.mjs        # site URL, integrations (tailwind + sitemap)
├── tailwind.config.mjs     # accent color #E10600, font families, max-width
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg         # black square + red "P" placeholder
│   └── robots.txt          # references sitemap-index.xml
└── src/
    ├── layouts/
    │   └── Base.astro      # html shell, <head>, Fontshare link, Header+Footer wrapping <slot/>
    ├── pages/
    │   ├── index.astro     # Home: hero + newsletter + secondary CTA → /projects
    │   ├── about.astro     # About: story placeholder + facts list + newsletter
    │   └── projects.astro  # Projects: 4 ProjectCards in a grid + newsletter
    ├── components/
    │   ├── Header.astro          # logo + nav, highlights active page via `path` prop
    │   ├── Footer.astro          # centered © + dynamic year
    │   ├── NewsletterForm.astro  # bold black/red signup, frontend-only <form action="#">
    │   └── ProjectCard.astro     # title + tag + description + "Learn more" link
    └── styles/
        └── globals.css     # Tailwind directives + base typography rules
```

## Design system (don't drift from this)

- **Colors:** white `#ffffff`, black `#000000`, accent `#E10600` (Tailwind: `text-accent` / `bg-accent` / `border-accent`). Use the accent **sparingly** — CTAs, links, active nav, small label kickers. Body text stays black.
- **Type:** headings use `font-display` (Khand, uppercase, bold). Body uses the default `Switzer` stack. These rules live in `src/styles/globals.css` `@layer base` — element selectors style `h1`–`h6` automatically.
- **Layout:** content max width is `max-w-content` (960px) centered with `px-6`. Sections use generous vertical padding (`py-16`–`py-24`).
- **Newsletter CTA:** the form lives on **every page** (`NewsletterForm` component, inverted black background). It's the primary action — keep it visible.

## How the layout chains together

`Base.astro` accepts `title`, `description`, and `path` props. Every page imports it and passes its current path so `Header` can highlight the active link. Example:

```astro
---
import Base from '../layouts/Base.astro';
import NewsletterForm from '../components/NewsletterForm.astro';
---
<Base title="…" description="…" path="/about">
  <section> … </section>
  <NewsletterForm />
</Base>
```

When adding a new page, follow this exact pattern (including the `path` prop) — otherwise nav highlighting breaks.

## Placeholder content convention

All user-facing copy that Pete needs to replace is marked `[Placeholder]` inline. **Do not invent biography, project names, or facts.** If you add new sections, keep them placeholder-tagged the same way so Pete can grep them later.

## Newsletter form

`NewsletterForm.astro` is **frontend-only**. The `<form action="#" method="post">` does not submit anywhere. To wire it up to a real provider (ConvertKit / Beehiiv / Buttondown / etc.), change the `action` attribute and adjust the input `name` to whatever the provider expects. Don't add a JS handler unless the provider requires it — Astro ships zero JS by default and we want to keep it that way.

## SEO

- Per-page `<title>` and `<meta description>` flow through `Base.astro` props — set them on every new page.
- `sitemap-index.xml` is generated from the `site` URL in `astro.config.mjs`. **Update that URL** before going live, and update the matching line in `public/robots.txt`.
- `favicon.svg` is a placeholder — replace before launch.

## Deployment (Cloudflare Pages)

1. Push to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Env var: `NODE_VERSION=18` (or newer)
4. Save & deploy. Pushes to the default branch auto-deploy.
5. For a custom domain, configure under **Pages project → Custom domains**, then update `site` in `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`.

## Guardrails for agents

- **Don't add JS frameworks** (React, Vue, Svelte) — Astro components are enough for a static content site.
- **Don't add client-side scripts** unless wiring up a real newsletter provider that requires it.
- **Don't add a new color** — the palette is white / black / `#E10600`. If you need contrast, use opacity (`text-black/70`, `border-black/15`).
- **Don't introduce a CSS framework** alongside Tailwind. No CSS-in-JS, no Bootstrap, no shadcn.
- **Don't replace placeholder text with invented bio content.** Leave `[Placeholder]` markers for Pete.
- **Keep the newsletter signup on every page.** It's the conversion goal.
- **Preserve mobile responsiveness.** Test with the dev server at narrow widths; existing breakpoints use `md:` (768px).
- **Run `npm run build` before declaring a task done.** A successful build with sitemap generation is the bar.

## Known gotchas

- Initial scaffold used `astro@^4.16` + `@astrojs/sitemap@^3.2`, but that sitemap version crashes at build time (`Cannot read properties of undefined (reading 'reduce')`). Fix is to upgrade to current versions — `package.json` is now pinned to `astro@^6.3` / `@astrojs/sitemap@^3.7`. If you downgrade, the build will break.
- `npm install` may emit ERESOLVE warnings between Astro and the Tailwind integration; `--legacy-peer-deps` resolves it cleanly. The lockfile reflects this.
