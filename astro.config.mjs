// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
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
  // Self-hosted at build time, with metric-matched fallbacks so the swap barely shifts text
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Roboto',
      cssVariable: '--font-body',
      weights: [300, 400, 500],
      styles: ['normal'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Montserrat',
      cssVariable: '--font-heading',
      weights: [500, 600],
      styles: ['normal'],
    },
  ],
});
