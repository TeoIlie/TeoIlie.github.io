# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro 7, TypeScript, and plain CSS. Fully static output, deployed via Cloudflare Pages. Homepage sections: About, Projects, LEGO Technic grid, Contact; plus one static page per LEGO creation (`/lego/<slug>`). The previous Angular version is tagged `angular-final`.

Priorities: clean polished look, strong SEO, near-perfect Lighthouse scores on mobile and desktop, and a small codebase that's easy to work in.

## Development Commands

Requires Node >= 22.19 (`.nvmrc`). The user's nvm default may be older, so prefix shell commands with `export PATH="$HOME/.nvm/versions/node/v22.23.3/bin:$PATH"` (or `source ~/.nvm/nvm.sh && nvm use 22`). Don't name a zsh loop variable `path` - it overwrites `PATH`.

```bash
npm run dev        # Dev server at http://localhost:4321
npm run build      # Production build to docs/ (gitignored)
npm run preview    # Serve the build (use this for Lighthouse, not dev)
npx astro preview stop   # Astro 7 allows one preview server per project; stop a background one
npm run check      # astro check (type-checks .astro and .ts)
npm run format     # Prettier (with prettier-plugin-astro)
npm run prepare-videos  # Strip audio, faststart, extract posters for public/assets/videos (needs ffmpeg)
```

There are no unit tests or ESLint.

## Architecture

**Structure:**
- `src/pages/index.astro` - homepage; just `<section id="about|projects|lego|socials" class="container">` wrappers around section components
- `src/pages/lego/[slug].astro` - `getStaticPaths()` over the `lego` collection; YouTube facade, gallery
- `src/layouts/BaseLayout.astro` - `<head>` (SEO/OG tags, canonical, JSON-LD from `data/profile.ts`, `<Font>` tags with preloads, pre-paint theme script), Header, `<main>`, footer. Props: `title`, `description`, optional `image` (OG image, via `getImage`; defaults to the profile photo)
- `src/components/` - sections: `About`, `Projects`, `LegoGrid`, `Contact`, `Header`; building blocks: `Icon`, `Chips`, `LinkButton`, `SectionIntro`
- `src/content.config.ts` - Zod schemas; both collections share the `links` schema and use the markdown body as the description
- `src/content/projects/*.md`, `src/content/lego/*.md` - one file per item; `order` sets position; filename is the slug/URL
- `src/data/profile.ts` - name, email, phone, discord, socials, interests, education (single source for About, Contact, JSON-LD)
- `src/styles/global.css` - theme tokens (colours), base styles, shared classes, scroll-reveal
- `src/assets/` - `logo.svg` (uses `currentColor`, imported as a component) and `images/` (optimized at build)
- `public/` - served unprocessed: videos, resume PDF, favicons, `robots.txt`, `_headers`

**Shared CSS classes (global.css):** `.container` (1000px centred), `.section-title`, `.heading-underline` (+ `--left`), `.card`, `.card-hover`, `.visually-hidden`, `.chips`/`.chip`, `.link-button`/`.link-row`, `.icon`, `.large-emoji`. Prefer these over re-declaring the same styles in components.

**Conventions:**
- Zero JS by default; interactivity is small `<script>` blocks. Don't add UI frameworks unless an island genuinely needs one. Prefer platform features (popover, `:user-invalid`, scroll-driven animations) over JS.
- Component styles are scoped plain CSS with native nesting. Use `:global(.dark-theme) .foo` (as a top-level rule, not nested `&`) to react to the theme, and `:global(...)` to style child components (e.g. `.icon`). Breakpoint is written literally as `860px`.
- Icons: `<Icon name="solid/robot" />` / `<Icon name="brands/github" />` inlines Font Awesome Free 7 SVGs from `node_modules` at build time. Pass `label` for meaningful icons; otherwise they're `aria-hidden`.
- Links/buttons in content: `links: [{ name, url, icon? }]`, rendered by `LinkButton`, which infers the icon from the URL.
- Images: high-resolution originals in `src/assets/images/`, rendered with `<Image>`/`<Picture>`. Remote images (BrickSafe gallery, YouTube thumbnails) also go through `<Image>`; their domains are allowed in `astro.config.mjs` `image.domains`. Give `widths`/`sizes` that match the real rendered width (account for padding) or Lighthouse flags oversized images.
- Astro's HTML compression strips whitespace between a line break and an inline element: write `text{' '}<a>` when a link or emoji follows text on a new line.
- Nav uses real anchors (`/#section`) so it works from sub-pages.
- Scroll reveal: add `data-reveal`; animation uses the `translate` property so it doesn't clash with hover `transform`.

**Behaviour notes:**
- Theme: `localStorage['preferred-theme']` or system preference sets `light-theme`/`dark-theme` on `<html>` before paint; the Header toggle (`role="switch"`) flips it.
- Mobile menu: `<nav popover>` + `<button popovertarget>`; desktop CSS (`min-width: 861px`) undoes popover styles so the nav sits inline. One listener hides it when a link is clicked.
- Projects: `<video data-autoplay preload="none" poster>` is played/paused by an IntersectionObserver (not observed at all under reduced motion). The mp4 and the poster (`src/assets/images/posters/<video>.jpg`, served as webp via `getImage`) are derived from the `video` field; the build fails if a poster is missing.
- LEGO pages: YouTube is a thumbnail button replaced by a `youtube-nocookie` iframe on click.
- Contact form posts to Formspree (`https://formspree.io/f/moveyaaw`) via fetch, falling back to a normal form post without JS; validation messages use `:user-invalid`.

## Build & Deployment

- `astro.config.mjs`: `site: 'https://teoilie.com'`, `outDir: './docs'`, `build.inlineStylesheets: 'always'`, `image.domains`, `@astrojs/sitemap`, `fonts` (Fonts API, Fontsource provider: Roboto → `--font-body`, Montserrat → `--font-heading`; add a weight there before using it).
- `docs/` is gitignored; Cloudflare Pages runs `npm run build` on every push and serves `docs`. Its `NODE_VERSION` env var is `22.23.3` (Production and Preview).
- `*.pages.dev` preview URLs get `x-robots-tag: noindex` and a failing Cloudflare analytics beacon, so preview Lighthouse SEO/Best Practices scores are lower than on teoilie.com.
- `public/_headers` sets immutable caching for `/_astro/*`.

## Media

- Videos: Handbrake "Web-MP4" → `public/assets/videos/`, then `npm run prepare-videos` (strips audio for iOS autoplay, applies faststart, extracts the first frame as a poster; lossless and re-runnable). MP4/H.264 only - no WebM.
- **Default video size is 720x480 (3:2, square pixels).** Fill, never letterbox or stretch: scale to cover, then centre-crop. Crop out any bars baked into the source first (`cropdetect` can miss them; check a frame), then:
  `ffmpeg -i in.mov -map 0:v:0 -an -vf "scale=720:480:force_original_aspect_ratio=increase,crop=720:480,setsar=1" -c:v libx264 -preset slow -crf 24 -profile:v main -pix_fmt yuv420p -movflags +faststart public/assets/videos/<name>.mp4`
  If the source has non-square pixels (`ffprobe` `sample_aspect_ratio` not `1:1`), its display aspect is the true shape: prepend `scale=<display w>:<display h>,setsar=1,` (e.g. pacman's original 720x480 at SAR 2:3 is really 480x480). Never just rewrite the SAR flag - that skews it.
  To replace a video's poster, delete `src/assets/images/posters/<name>.jpg` and rerun `prepare-videos`.
- LEGO card covers are currently only ~711x400 (issue #91); replacing them with full-resolution originals (same filenames) sharpens them automatically.
