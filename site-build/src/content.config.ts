import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docSchema = z.object({
	title: z.string(),
	nav: z.string(),
	order: z.number(),
	group: z.string().optional(),
	description: z.string().optional(),
});

const docs = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
	schema: docSchema,
});
const docsZh = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/docs-zh" }),
	schema: docSchema,
});

export const collections = { docs, docsZh };
