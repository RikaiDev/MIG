import { defineConfig } from "astro/config";
import { remarkMig, rehypeMig } from "./src/plugins/mig-transforms.mjs";

export default defineConfig({
	site: "https://rikaidev.github.io",
	base: "/MIG",
	output: "static",
	build: { format: "file" },
	markdown: {
		gfm: true,
		remarkPlugins: [remarkMig],
		rehypePlugins: [rehypeMig],
	},
});
