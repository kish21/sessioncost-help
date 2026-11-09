import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// `audience` puts an "Everyone" or "Technical" tag beside the page title (src/components/PageTitle.astro).
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: z.object({ audience: z.enum(['everyone', 'technical']).optional() }) }),
	}),
};
