import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Rendered by LinkButton; the icon is inferred from the URL unless given
const links = z
  .array(z.object({ name: z.string(), url: z.url(), icon: z.string().optional() }))
  .default([]);

// In both collections the markdown body is the description, and `order` sets
// the position on the page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    // Shown as a large card above the grid of other projects
    featured: z.boolean().default(false),
    // Name of the video in public/assets/videos/ (.mp4); its poster is
    // src/assets/images/posters/<video>.jpg (made by npm run prepare-videos)
    video: z.string(),
    technologies: z.array(z.string()),
    links,
  }),
});

const lego = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lego' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      buildYear: z.number(),
      cover: image(),
      youtubeId: z.string(),
      techniques: z.array(z.string()),
      links,
      gallery: z.array(z.url()).default([]),
    }),
});

export const collections = { projects, lego };
