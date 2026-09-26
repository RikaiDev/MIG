import astro from "eslint-plugin-astro";

/**
 * ESLint owns lint for *.astro only.
 * Biome owns css/mjs/js, Prettier owns astro formatting.
 * One owner per file type, no overlap.
 */
export default [
	...astro.configs.recommended,
	{
		ignores: ["dist/", "node_modules/", ".astro/"],
	},
];
