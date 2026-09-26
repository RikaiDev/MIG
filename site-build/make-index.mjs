/** Post-build search index from rendered HTML. Usage: bun make-index.mjs */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("./dist/", import.meta.url).pathname;

function strip(html) {
	return html
		.replace(/<script[\s\S]*?<\/script>/g, " ")
		.replace(/<style[\s\S]*?<\/style>/g, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function titleOf(html) {
	const m = html.match(/<title>([^<]*)<\/title>/);
	return m ? m[1].replace(" — Mirror Interface Guidelines", "") : "";
}

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) {
			walk(p, out);
		} else if (name.endsWith(".html")) {
			out.push(p);
		}
	}
	return out;
}

const entries = walk(DIST)
	.filter((p) => !p.includes("/assets/"))
	.map((p) => {
		const html = readFileSync(p, "utf-8");
		const main = html.match(/<article class="prose">([\s\S]*?)<\/article>/);
		return {
			slug: p
				.slice(DIST.length)
				.replace(/\.html$/, "")
				.replace(/\/index$/, ""),
			title: titleOf(html),
			text: strip(main ? main[1] : html).slice(0, 4000),
		};
	});

writeFileSync(join(DIST, "assets", "search-index.json"), JSON.stringify(entries));
console.log(`indexed ${entries.length} pages`);
