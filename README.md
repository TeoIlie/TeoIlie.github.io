# Personal Website

Built with [Astro](https://astro.build) and deployed on Cloudflare Pages at https://teoilie.com. The previous Angular version is tagged `angular-final`.

## Developing

Requires Node 22.19+ (pinned in `.nvmrc`). Run `nvm use` in the project folder first, or make it the default with `nvm alias default 22`.

```
npm install
npm run dev       # dev server at http://localhost:4321
npm run format    # Prettier
npm run check     # type-check .astro and .ts files
```

## Building and deploying

**Build**

```
npm run build     # outputs to docs/ (not committed - Cloudflare builds it)
npm run preview   # serve the build at http://localhost:4321 for Lighthouse testing
npx astro preview stop   # stop a preview server left running in the background
```

**Deploy**

By doing `git push`, Cloudflare Pages will automatically deploy the application. Deployments can be seen here:
https://dash.cloudflare.com

**Cloudflare setup**

- Build command `npm run build`, output directory `docs`
- The Node version is set with the `NODE_VERSION` environment variable, which must be at least `22.19.0` (currently `22.23.3`)

## Project structure

```
src/
├── pages/
│   ├── index.astro          # homepage (each file in pages/ becomes a route)
│   └── lego/[slug].astro    # one page per LEGO creation, e.g. /lego/unimog-u5000
├── layouts/BaseLayout.astro # <head> + SEO tags, header, footer, theme script
├── components/              # page sections (About, Projects, LegoGrid, Contact, Header)
│                            # and small building blocks (Icon, Chips, LinkButton, SectionIntro)
├── content/
│   ├── projects/*.md        # one file per coding project
│   └── lego/*.md            # one file per LEGO creation
├── content.config.ts        # schema for the content files
├── data/profile.ts          # contact details, socials, interests, education
├── assets/                  # logo + images optimized at build time (AVIF/WebP, multiple sizes)
└── styles/global.css        # theme colours and shared styles
public/                      # served as-is: videos, resume PDF, favicons, robots.txt, _headers (caching)
```

## Notes

**Adding a project or LEGO creation**

Copy an existing file in `src/content/projects/` or `src/content/lego/`, edit the frontmatter, and write the description as the markdown body. `order` controls the position on the page; the filename becomes the LEGO page URL. The build fails with a clear error if a required field is missing.

Buttons are a `links` list - the icon is picked from the URL (GitHub, YouTube, PDF, Eurobricks, otherwise an external-link icon), or set one with `icon`:

```yaml
links:
  - name: View Code
    url: https://github.com/TeoIlie/...
  - name: Team Site
    url: https://...
    icon: solid/flag-checkered   # optional
```

Contact details, social links, interests and education live in `src/data/profile.ts`.

**Images**

Put the **highest resolution original** in `src/assets/images/` - no need to resize or convert. Astro generates AVIF/WebP at the sizes each layout needs, so visitors on large screens get sharp images while phones get small files. LEGO gallery photos stay on BrickSafe, but are downloaded and optimized the same way at build time (allowed domains are listed in `astro.config.mjs`).

**Icons**

Icons are Font Awesome SVGs inlined at build time, so only icons actually used are shipped: `<Icon name="solid/robot" />` or `<Icon name="brands/github" />`. Browse names at https://fontawesome.com/search?ic=free.

**Videos**

1. Create a short 4-5 sec video, 1800x1200 aspect ratio in Final Cut Pro
2. Export > Apple Devices 1080p > H.264 Multi-Pass (Better) -> output is .m4v
3. Convert to `.mp4` using **Handbrake** with the **Web-MP4** custom preset, and put it in `public/assets/videos/`
4. The final video should be 720x480 (3:2), filling the frame without letterboxing. `CLAUDE.md` has the ffmpeg command for scaling and cropping other sources
5. Run `npm run prepare-videos` (needs ffmpeg). It strips audio tracks (required for reliable autoplay on iOS), moves the `moov` atom to the front so playback starts sooner, and saves the first frame as a poster in `src/assets/images/posters/`. Nothing is re-encoded, so it is safe to re-run; delete a poster to regenerate it

Project videos show their poster straight away, and only download and play while near the screen. With reduced motion turned on, only the poster is shown.

**Fonts**

Roboto (body) and Montserrat (headings) are self-hosted with the Astro Fonts API, configured in `astro.config.mjs`. Only the listed weights are generated, so add a weight there before using it in CSS.

**Dark mode**

Styles are plain CSS (with native nesting), scoped per component. Theme colours are CSS custom properties in `src/styles/global.css` (`:root` for light, `.dark-theme` for dark). A small inline script in `BaseLayout.astro` sets the theme class on `<html>` before first paint, from `localStorage` or the system preference, so there is no flash of the wrong theme.

**LEGO pages**

Each creation has its own page at `/lego/<filename>`, e.g. https://teoilie.com/lego/unimog-u5000, with its own title, description and social preview image. The YouTube player only loads when the thumbnail is clicked. Clicking a gallery photo opens it full screen in a `<dialog>` lightbox (arrow buttons, ← → keys or swipe; Escape or click outside to close).

**Scroll animations**

Add `data-reveal` to an element to fade it in as it scrolls into view. It's pure CSS (scroll-driven animations); browsers without support just show the content.

**Local performance testing**

Test the production build, not the dev server:

```
npm run build
npm run preview
```

Then run Lighthouse in Chrome DevTools against http://localhost:4321.

**Sitemap**

`sitemap-index.xml` is generated automatically on every build.

**Updating dependencies automatically**

1. `npm install -g npm-check-updates`, if the tool isn't yet installed
2. `ncu` gather info about the update
3. `ncu -u` applies the changes
4. To reinstall from scratch, `rm -rf node_modules package-lock.json` to clear the dependencies, and then `npm install` to re-install
