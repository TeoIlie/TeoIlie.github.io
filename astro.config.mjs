// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://teoilie.com',
  // Cloudflare Pages serves the docs/ folder
  outDir: './docs',
  integrations: [sitemap()],
  // Remote images Astro may download and optimize at build time
  image: { domains: ['bricksafe.com', 'i.ytimg.com'] },
  // Inline CSS into the page so it doesn't block first render
  build: { inlineStylesheets: 'always' },
});
