import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Which class this page belongs to. Shown as a label under the title.
				classes: z.array(z.union([z.literal(11), z.literal(12)])).optional(),
				// Extra words people may type in the search bar to find this page.
				keywords: z.array(z.string()).optional(),
				// Set to true once a teacher has checked the page for accuracy.
				reviewed: z.boolean().default(false),
			}),
		}),
	}),
};
