# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro 7, TypeScript, and plain CSS. Fully static output, deployed via Cloudflare Pages. Homepage sections: hero + About, Experience, Projects (featured + grid), LEGO Technic grid, Contact; plus one static page per LEGO creation (`/lego/<slug>/`) and a `404`. The previous Angular version is tagged `angular-final`.

Priorities: clean polished look, strong SEO, near-perfect Lighthouse scores on mobile and desktop, and a small codebase that's easy to work in.

## Development Commands

Requires Node >= 22.19 (`.nvmrc`). The user's nvm default may be older, so prefix shell commands with `export PATH="$HOME/.nvm/versions/node/v22.23.3/bin:$PATH"` (or `source ~/.nvm/nvm.sh && nvm use 22`). Don't name a zsh loop variable `path` - it overwrites `PATH`.

```bash
npm run dev        # Dev server at http://localhost:4321
npm run build      # astro check, then production build to docs/ (gitignored)
npm run preview    # Serve the build (use this for Lighthouse, not dev)
npx astro preview stop   # Astro 7 allows one preview server per project; stop a background one
npm run check      # astro check (type-checks .astro and .ts)
npm run format     # Prettier (with prettier-plugin-astro); format:check verifies only
npm run prepare-videos  # Strip audio, faststart, extract posters for public/assets/videos (needs ffmpeg)
```

There are no unit tests or ESLint.

## Architecture

**Structure:**
- `src/data/site.ts` - `sections` list (id, nav label, eyebrow): its order drives the page order, the Header nav and the numbered eyebrows; also `siteName`
- `src/pages/index.astro` - homepage; maps `sections` to `<section id class="container">` wrappers around section components (the `content` lookup must cover every id)
- `src/pages/lego/[slug].astro` - `getStaticPaths()` over the `lego` collection; uses `YouTubeFacade` and `Gallery`
- `src/layouts/BaseLayout.astro` - `<head>` (SEO/OG tags, canonical, JSON-LD from `data/jsonld.ts`, `<Font>` tags with preloads, pre-paint theme script), Header, `<main>`, footer. Props: `title`, `description`, optional `image` (OG/Twitter image, centre-cropped to 1.91:1 at up to 1200px wide via `getImage`, never upscaled; defaults to `assets/images/og-card.png`), `imageAlt`, `type` (`og:type`: homepage `profile`, LEGO pages `article`), `jsonLd` (callback given the page's canonical URL and OG image URL; returns page-level nodes appended to the site-wide graph), `noindex` (404: `robots` noindex, no canonical)
- `src/components/` - sections: `Hero` (rendered by `About`), `About` (bio), `Experience`, `Projects`, `LegoGrid`, `Contact`, `Header`; LEGO page parts: `YouTubeFacade`, `Gallery` (grid + lightbox); building blocks: `Icon`, `Chips`, `LinkButton` (`primary` for the filled accent style), `SectionIntro` (every section heading: `id` sets the numbered eyebrow; title, intro slot, muted link row)
- `src/content.config.ts` - Zod schemas; both collections share the `links` schema and use the markdown body as the description
- `src/content/projects/*.md`, `src/content/lego/*.md` - one file per item; `order` sets position; filename is the slug/URL
- `src/data/profile.ts` - name, headline (current role only), email, phone, discord, Formspree action, socials (`hero: true` ones also show in the hero), `youtube`, hero `readouts` (key/value strip), interests, education, experience (single source for About, Experience, Contact, JSON-LD)
- `src/data/jsonld.ts` - one linked `@graph` per page: `siteJsonLd()` (Person `#person` + WebSite `#website`, on every page; job and school come from `experience[0]` / `education[0]`, `knowsAbout` includes `interests`), `homeJsonLd()` (ProfilePage + ItemList of projects), `legoJsonLd()` (CreativeWork + VideoObject + BreadcrumbList). Other nodes reference the Person by `@id` rather than repeating it
- `src/lib/content.ts` - `Link` type, `getSorted(collection)` (by `order`), `excerpt()` (meta descriptions; strips markdown syntax)
- `src/styles/global.css` - theme tokens (colours via `light-dark()`), base styles, shared classes, scroll-reveal
- `src/assets/` - `logo.svg` (uses `currentColor`, imported as a component) and `images/` (optimized at build)
- `public/` - served unprocessed: videos, resume PDF, `favicon.ico` + `apple-touch-icon.png` (root, where crawlers and iOS look) and the other icons in `assets/`, `site.webmanifest`, `robots.txt`, `_headers`
- `scripts/prepare-videos.mjs` - `npm run prepare-videos`

**Design:** tech-minimal with an instrumented/telemetry motif. Inter for text plus JetBrains Mono (500) for small readouts (eyebrows, labels, tags, dates, the hero readout strip), one electric-blue accent, hairline borders instead of shadows, left-aligned section headers with a numbered eyebrow (`01 · About`). Tokens: `--bg`, `--surface`, `--surface-2`, `--text`, `--text-muted`, `--border`, `--border-hover` (accent-tinted, for hovered surfaces), `--accent`, `--accent-hover`, `--accent-contrast`, `--error`, `--success`; all text/accent pairs pass 4.5:1 in both themes - recheck if you change them. No emoji in copy.

**Shared CSS classes (global.css):** `.container` (1080px centred), `.section-header`, `.eyebrow`, `.label` (small uppercase heading), `.card` (bordered surface), `.card-hover` (border tints toward the accent), `.mono`, `.viewfinder` (corner brackets over a media frame; they close in and turn accent on `.card-hover` hover), `.chips`/`.chip`, `.link-button` (+ `--primary`; also works on `<button>`)/`.link-row`, `.icon-button` (36px square icon link/button), `.icon`. Prefer these over re-declaring the same styles in components.

**Conventions:**
- Zero JS by default; interactivity is small `<script>` blocks. Don't add UI frameworks unless an island genuinely needs one. Prefer platform features (popover, `:user-invalid`, scroll-driven animations) over JS.
- Component styles are scoped plain CSS with native nesting. Prefer the `light-dark()` tokens; when a rule must react to the theme, use `:global(.dark-theme) .foo` (as a top-level rule, not nested `&`), and `:global(...)` to style child components (e.g. `.icon`). Breakpoint is written literally as `860px`.
- Icons: `<Icon name="solid/robot" />` / `<Icon name="brands/github" />` inlines Font Awesome Free 7 SVGs from `node_modules` at build time. Pass `label` for meaningful icons; otherwise they're `aria-hidden`.
- Links/buttons in content: `links: [{ name, url, icon?, rel? }]`, rendered by `LinkButton`, which infers the icon from the URL. External URLs and PDFs open in a new tab; site paths open in place. `rel: sponsored` marks paid links (the BuWizz sponsor); social profile links carry `rel="me"`.
- Images: high-resolution originals in `src/assets/images/`, rendered with `<Image>`/`<Picture>`. Remote images (BrickSafe gallery, YouTube thumbnails) also go through `<Image>`; their domains are allowed in `astro.config.mjs` `image.domains`. Give `widths`/`sizes` that match the real rendered width (account for padding) or Lighthouse flags oversized images.
- Astro's HTML compression strips whitespace between a line break and an inline element: write `text{' '}<a>` when a link or emoji follows text on a new line.
- Nav uses real anchors (`/#section`, built from `sections`) so it works from sub-pages.
- URLs end in a slash (`trailingSlash: 'always'`, matching the directory build): write internal page links as `/lego/<slug>/`. A missing slash 404s in dev and costs a redirect on Cloudflare.
- SEO copy: keep meta descriptions under ~155 characters (the homepage one is hand-written in `index.astro`; LEGO ones come from `excerpt()`); LEGO covers and gallery photos have descriptive alt text for image search.
- Content schema checks `youtubeId` format and that gallery URLs are on `bricksafe.com` (an `image.domains` host). LEGO entries need `uploadDate` (the YouTube publish time, for VideoObject structured data; it's in the watch page's `itemprop="uploadDate"`).
- Scroll reveal: add `data-reveal`; animation uses the `translate` property so it doesn't clash with hover `transform`. Write scroll-driven animations as `animation-*` longhands: lightningcss folds the `animation` shorthand plus `animation-timeline` into one declaration that Chrome rejects.

**Behaviour notes:**
- Hero: a decorative SVG racing line (pinned to the hero's bottom, uniformly scaled so `pathLength` animations stay exact) draws once with a dot riding it; hidden at <=860px and static under reduced motion. The homepage `main::before` draws a faint blueprint grid that fades out below the hero; `main` has `overflow-x: clip` so the line's overhang never scrolls.
- Theme: `localStorage['preferred-theme']` or system preference adds `dark-theme` to `<html>` before paint, which sets `color-scheme: dark` so every `light-dark()` token switches; the Header toggle (`role="switch"`) flips it.
- Mobile menu: `<nav popover>` + `<button popovertarget>`; desktop CSS (`min-width: 861px`) undoes popover styles so the nav sits inline. One listener hides it when a link is clicked.
- Experience: a timeline rail with one node per role; omit `end` for a current role (filled, pulsing node and "Now"). `project` links to that project card's `#project-<id>` anchor; the build fails if the project doesn't exist.
- Projects: `featured: true` in frontmatter makes a full-width card; the rest fill a 2-column grid. `<video data-autoplay preload="none" poster>` is played/paused by an IntersectionObserver (not observed at all under reduced motion). The mp4 and the poster (`src/assets/images/posters/<video>.jpg`, served as webp via `getImage`) are derived from the `video` field; the build fails if a poster is missing.
- LEGO pages: no page transitions (a title morph was tried and removed: text snapshots scale badly). YouTube is a thumbnail button replaced by a `youtube-nocookie` iframe on click. Gallery thumbnails are links to a full-size `getImage` version; JS intercepts them to open a `<dialog>` lightbox (arrows, ←/→ keys, swipe, wraps around). The thumbnail and gallery images are scaled 1.01 inside clipped frames to hide 1px black edges baked into some YouTube thumbnails and BrickSafe photos.
- Contact form posts to Formspree (`profile.formAction`) via fetch, falling back to a normal form post without JS; validation messages use `:user-invalid`.

## Build & Deployment

- `astro.config.mjs`: `site: 'https://teoilie.com'`, `outDir: './docs'`, `build.inlineStylesheets: 'always'`, `image.domains`, `trailingSlash: 'always'`, `@astrojs/sitemap` (excludes the 404; `lastmod` is the build date), `fonts` (Fonts API, Fontsource provider: Inter → `--font-sans`, weights 400-600; JetBrains Mono → `--font-mono`, weight 500, preloaded (the hero readout strip uses it); add a weight there before using it), `prefetch` (hover; only links with `data-astro-prefetch`, i.e. LEGO cards).
- `docs/` is gitignored; Cloudflare Pages runs `npm run build` on every push and serves `docs`. Its `NODE_VERSION` env var is `22.23.3` (Production and Preview).
- `*.pages.dev` preview URLs get `x-robots-tag: noindex` and a failing Cloudflare analytics beacon, so preview Lighthouse SEO/Best Practices scores are lower than on teoilie.com.
- `public/_headers` sets immutable caching for `/_astro/*` and `nosniff`, `Referrer-Policy` and `X-Frame-Options` on every page.
- Cloudflare Pages serves `docs/404.html` for unknown paths.
- Search: `teoilie.com` is verified in Google Search Console by DNS (domain name provider), so no meta tag or verification file is needed; submit `https://teoilie.com/sitemap-index.xml` there and in Bing Webmaster Tools.
- The default OG card (`src/assets/images/og-card.png`, 1200x630) was rendered once from HTML with headless Chrome: name, the hero statement, readouts, photo, racing line. It has no job title, so it doesn't go stale with a role change.

## Media

- Videos: Handbrake "Web-MP4" → `public/assets/videos/`, then `npm run prepare-videos` (strips audio for iOS autoplay, applies faststart, extracts the first frame as a poster; lossless and re-runnable). MP4/H.264 only - no WebM.
- **Default video size is 720x480 (3:2, square pixels).** Fill, never letterbox or stretch: scale to cover, then centre-crop. Crop out any bars baked into the source first (`cropdetect` can miss them; check a frame), then:
  `ffmpeg -i in.mov -map 0:v:0 -an -vf "scale=720:480:force_original_aspect_ratio=increase,crop=720:480,setsar=1" -c:v libx264 -preset slow -crf 24 -profile:v main -pix_fmt yuv420p -movflags +faststart public/assets/videos/<name>.mp4`
  If the source has non-square pixels (`ffprobe` `sample_aspect_ratio` not `1:1`), its display aspect is the true shape: prepend `scale=<display w>:<display h>,setsar=1,` (e.g. pacman's original 720x480 at SAR 2:3 is really 480x480). Never just rewrite the SAR flag - that skews it.
  To replace a video's poster, delete `src/assets/images/posters/<name>.jpg` and rerun `prepare-videos`.
- LEGO card covers are 2400px-wide JPEGs (camera originals downscaled, quality 88, to keep the repo small); `dakar.jpg`, `baja.jpg` and `tatra-8x8.jpg` are still ~711x400 (issue #91). Astro drops card `widths` above the source width (adding the source width instead), so a bigger file sharpens them automatically.
