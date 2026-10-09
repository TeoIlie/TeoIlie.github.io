# Personal Website

Built with [Astro](https://astro.build) and deployed on Cloudflare Pages at https://teoilie.com. The previous Angular version is tagged `angular-final`.

## Developing

Requires Node 22.12+ (pinned in `.nvmrc`). Run `nvm use` in the project folder first, or make it the default with `nvm alias default 22`.

```
npm install
npm run dev       # dev server at http://localhost:4321
npm run format    # Prettier
npm run check     # type-check .astro and .ts files
```

## Building and deploying

**Build**

```
npm run build     # outputs to docs/
npm run preview   # serve the build at http://localhost:4321 for Lighthouse testing
```

**Deploy**

By doing `git push`, Cloudflare Pages will automatically deploy the application. Deployments can be seen here:
https://dash.cloudflare.com

**Cloudflare setup**

- Build command `npm run build`, output directory `docs`
- The Node version is set with the `NODE_VERSION` environment variable, which must be at least `22.12.0` for Astro

## Project structure

```
src/
├── pages/index.astro        # the page (each file in pages/ becomes a route)
├── layouts/BaseLayout.astro # <head>, SEO/Open Graph tags, JSON-LD, theme script
├── components/              # Header, About, Projects, LegoTechnic, Socials, Icon
├── content/
│   ├── projects/*.md        # one file per coding project
│   └── lego/*.md            # one file per LEGO creation (description is the markdown body)
├── content.config.ts        # schema for the content files
├── assets/images/           # images optimized at build time (AVIF/WebP, multiple sizes)
└── styles/                  # global.scss (theme colours, shared styles), _variables.scss
public/                      # served as-is: videos, resume PDF, favicons, robots.txt
```

## Notes

**Adding a project or LEGO creation**

Copy an existing file in `src/content/projects/` or `src/content/lego/` and edit the frontmatter. `order` controls the position on the page. The build fails with a clear error if a required field is missing.

**Images**

Put the **highest resolution original** in `src/assets/images/` - no need to resize or convert. Astro generates AVIF/WebP at the sizes each layout needs, so visitors on large screens get sharp images while phones get small files.

**Icons**

Icons are Font Awesome SVGs inlined at build time, so only icons actually used are shipped: `<Icon name="solid/robot" />` or `<Icon name="brands/github" />`. Browse names at https://fontawesome.com/search?ic=free.

**Videos**

1. Create a short 4-5 sec video, 1800x1200 aspect ratio in Final Cut Pro
2. Export > Apple Devices 1080p > H.264 Multi-Pass (Better) -> output is .m4v
3. Convert to `.webm` using **Handbrake**, with custom preset **Web-WebM**, and to `.mp4` using the **Web-MP4** custom preset. Put them in `public/assets/videos/` and `public/assets/videos/webm/`
4. Run `npm run strip-audio` to remove audio tracks from both `.mp4` and `.webm` files (required for reliable autoplay on iOS)

Project videos only download and play while scrolled into view.

**Dark mode**

Theme colours are CSS custom properties in `src/styles/global.scss` (`:root` for light, `.dark-theme` for dark). A small inline script in `BaseLayout.astro` sets the theme class on `<html>` before first paint, from `localStorage` or the system preference, so there is no flash of the wrong theme.

**LEGO detail links**

Each creation opens at `#lego-<filename>`, e.g. https://teoilie.com/#lego-unimog-u5000, so builds can be linked directly and the browser back button returns to the grid.

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
