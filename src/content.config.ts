import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		cover: z.object({
			src: z.string(),
			alt: z.string(),
			width: z.number().int().positive(),
			height: z.number().int().positive(),
			fit: z.enum(['cover', 'contain']).default('cover'),
		}),
	}),
});

export const collections = { writing };
