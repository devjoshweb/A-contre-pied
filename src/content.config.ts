import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    section: z.enum(['Sport', 'Politique', 'Société']),
    date: z.coerce.date(),
    author: z.string().default('Yenael Fort'),
    chapo: z.string().default(''),
    image: z.string().optional(),
  }),
});

export const collections = { articles };
