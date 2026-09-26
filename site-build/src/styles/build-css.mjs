/**
 * CSS build harness: concatenates src/styles/*.css into the single
 * public/assets/styles.css that Layout.astro links. Source modules own
 * the code; the built file is an artifact — never edit it by hand.
 * Usage: bun src/styles/build-css.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
export const MANIFEST = [
	"tokens.css",
	"base.css",
	"topbar.css",
	"rail.css",
	"content.css",
	"prose.css",
	"demos.css",
	"search.css",
	"responsive.css",
];

const out = MANIFEST.map((f) =>
	readFileSync(join(DIR, f), "utf-8").replace(/\n+$/, "\n"),
).join("\n");
writeFileSync(join(DIR, "..", "..", "public", "assets", "styles.css"), out);
console.log(
	`css build: ${MANIFEST.length} modules -> public/assets/styles.css (${out.split("\n").length} lines)`,
);
