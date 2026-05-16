# Pete McPherson — Portfolio Site

A fast, minimal, bold portfolio site built with **Astro** and **Tailwind CSS**, deployed to **Cloudflare Pages**.

## Tech

- [Astro](https://astro.build/) — static site generator, zero JS by default
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Fontshare](https://www.fontshare.com/) — `Khand` (headings) and `Switzer` (body)
- Single accent color: `#E10600` ("violent red")

## Local setup

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Build

```bash
npm run build      # outputs static site to ./dist
npm run preview    # preview the built site locally
```

## Deploying to Cloudflare Pages

1. Push this repo to GitHub (or GitLab).
2. In the Cloudflare dashboard go to **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select the repo and use these settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set env var `NODE_VERSION=18` (or newer)
4. Click **Save and Deploy**. Subsequent pushes to your default branch will auto-deploy.

Custom domain: configure under **Pages project → Custom domains**, then update the `site` value in `astro.config.mjs` and the sitemap URL in `public/robots.txt`.

## Structure

```
src/
  pages/         # index.astro, about.astro, projects.astro
  components/    # Header, Footer, NewsletterForm, ProjectCard
  layouts/       # Base.astro (shared shell, head, fonts)
  styles/        # globals.css (Tailwind entry)
public/          # robots.txt, favicon.svg, static assets
```

## Placeholder content

All copy is placeholder text marked with `[Placeholder]` and is ready for Pete to replace. The newsletter form is a styled frontend-only `<form>` — wire it to your provider (ConvertKit, Beehiiv, Buttondown, etc.) by setting the `action` attribute in `src/components/NewsletterForm.astro`.
