import { defineConfig } from "astro/config";
import ruleBlock from "./src/plugins/rule-block.mjs";

export default defineConfig({
	site: "https://rikaidev.github.io",
	base: "/MIG",
	build: { format: "file" },
	markdown: {
		remarkPlugins: [ruleBlock],
	},
});
