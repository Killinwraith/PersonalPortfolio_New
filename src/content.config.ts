import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* features: long-form articles, written as MDX -------------------------- */
const features = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/features' }),
  schema: z.object({
    title:        z.string(),
    deck:         z.string(),
    kicker:       z.string().default('FEATURE'),
    image:        z.string().optional(),         // /features/something.jpg under public/
    publishedAt:  z.coerce.date(),
    tags:         z.array(z.string()).default([]),
    draft:        z.boolean().default(false),
  }),
});

/* stickers: the single source of truth for the wall --------------------- */
/* edit src/content/stickers.json to add, remove, reposition stickers     */
const stickers = defineCollection({
  loader: file('./src/content/stickers.json'),
  schema: z.object({
    /* content: either text OR src (for real-image stickers) */
    text:     z.string().optional(),
    src:      z.string().optional(),
    alt:      z.string().optional(),
    /* style */
    variant:  z.enum(['paper','ink','cream','red','yellow','pink','blue','green','orange','teal','purple']).default('paper'),
    shape:    z.enum(['rect','circle','tape','peel']).default('rect'),
    font:     z.enum(['sans','mono','serif']).default('sans'),
    size:     z.enum(['sm','md','lg','xl']).default('md'),
    /* placement (percentages relative to wall) */
    x:        z.number(),
    y:        z.number(),
    rotation: z.number().default(0),
    z:        z.number().default(5),
    /* optional link to a feature page */
    href:     z.string().optional(),
  }),
});

export const collections = { features, stickers };
