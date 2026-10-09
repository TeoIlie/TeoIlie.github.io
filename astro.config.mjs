// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://teoilie.com',
  // Cloudflare Pages serves the docs/ folder
  outDir: './docs',
  integrations: [sitemap()],
  // Inline CSS into the page so it doesn't block first render
  build: { inlineStylesheets: 'always' },
});
