import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(), description: z.string(),
    section: z.enum(['guides','blog','glossary']), slug: z.string(),
    published: z.string(), updated: z.string(),
    tags: z.array(z.string()), sources: z.array(z.url()).min(1),
    draft: z.boolean().default(false)
  })
});
export const collections = { articles };
