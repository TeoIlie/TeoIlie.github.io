import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ url: z.url(), name: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string(),
    // Paths relative to public/
    video: z.object({ mp4: z.string(), webm: z.string() }),
    technologies: z.array(z.string()),
    githubUrl: z.url().optional(),
    paperUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    other: link.optional(),
  }),
});

const lego = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lego' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      buildYear: z.number().optional(),
      cover: image(),
      youtubeId: z.string(),
      forumUrl: z.url().optional(),
      demo: link.optional(),
      techniques: z.array(z.string()),
      gallery: z.array(z.url()).default([]),
    }),
});

export const collections = { projects, lego };
