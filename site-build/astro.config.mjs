import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { remarkMig, rehypeMig } from "./src/plugins/mig-transforms.mjs";

export default defineConfig({
	site: "https://rikaidev.github.io",
	base: "/MIG",
	output: "static",
	build: { format: "file" },
	markdown: {
		processor: unified({
			gfm: true,
			remarkPlugins: [remarkMig],
			rehypePlugins: [rehypeMig],
		}),
	},
});
