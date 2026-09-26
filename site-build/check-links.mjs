/**
 * Link harness: every internal href in dist must resolve to a built file,
 * and every #anchor must exist in its target. Usage: bun check-links.mjs
 * (run after build).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, "dist");

let failures = 0;
const fail = (msg) => {
	failures++;
	console.log(`FAIL ${msg}`);
};

function resolveTarget(path) {
	// Directory-style URLs need a real index.html (Pages has no negotiation).
	const clean = path.replace(/\/$/, "") || "/";
	const direct = join(DIST, clean);
	if (existsSync(direct) && statSync(direct).isFile()) return direct;
	const indexed = join(DIST, clean, "index.html");
	if (existsSync(indexed)) return indexed;
	return null;
}

function pages(dir, prefix) {
	const out = [];
	for (const f of readdirSync(dir, { withFileTypes: true })) {
		if (f.isDirectory())
			out.push(...pages(join(dir, f.name), `${prefix}${f.name}/`));
		else if (f.name.endsWith(".html")) out.push(`${prefix}${f.name}`);
	}
	return out;
}

// dist is flat file-format: en pages at top, zh pages under zh/.
const files = pages(DIST, "/").map((p) => ({
	url: `/MIG${p}`,
	file: join(DIST, p),
}));

for (const { url, file } of files) {
	const html = readFileSync(file, "utf-8");
	for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
		const href = m[1];
		if (/^(https?:|mailto:|data:|#)/.test(href)) {
			if (href.startsWith("#")) {
				const id = decodeURIComponent(href.slice(1));
				if (!html.includes(`id="${id}"`)) fail(`${url}: missing anchor #${id}`);
			}
			continue;
		}
		if (href.startsWith("/MIG/")) {
			// Base-prefixed absolute links are correct; verify target + anchor.
			const [path, hash] = href.slice(4).split("#");
			const targetFile = resolveTarget(path);
			if (!targetFile) {
				fail(`${url}: dead link → ${href}`);
			} else if (hash) {
				const targetHtml = readFileSync(targetFile, "utf-8");
				if (!targetHtml.includes(`id="${decodeURIComponent(hash)}"`)) {
					fail(`${url}: missing anchor #${hash} in ${href}`);
				}
			}
			continue;
		}
		if (href.startsWith("/")) {
			fail(`${url}: absolute internal link (breaks under base path): ${href}`);
			continue;
		}
		const dir = url.slice(0, url.lastIndexOf("/") + 1);
		const [path, hash] = href.split("#");
		const target = new URL(path || "", `https://x${dir}`).pathname.replace(
			/^\/MIG/,
			"",
		);
		const targetFile = resolveTarget(target);
		if (!targetFile) {
			fail(`${url}: dead link → ${href}`);
		} else if (hash) {
			const targetHtml = readFileSync(targetFile, "utf-8");
			if (!targetHtml.includes(`id="${decodeURIComponent(hash)}"`)) {
				fail(`${url}: missing anchor #${hash} in ${href}`);
			}
		}
	}
}

// Search indices use site-rooted hrefs consumed with the base prefix in JS.
for (const idx of ["search-en.json", "search-zh.json"]) {
	const entries = JSON.parse(readFileSync(join(DIST, "assets", idx), "utf-8"));
	for (const e of entries) {
		const [path, hash] = e.href.split("#");
		const targetFile = join(DIST, path);
		if (!existsSync(targetFile)) {
			fail(`${idx}: dead href → ${e.href}`);
		} else if (hash) {
			const targetHtml = readFileSync(targetFile, "utf-8");
			if (!targetHtml.includes(`id="${decodeURIComponent(hash)}"`)) {
				fail(`${idx}: missing anchor #${hash} in ${e.href}`);
			}
		}
	}
}

console.log(failures ? `\n${failures} violation(s)` : "link harness: PASS");
process.exit(failures ? 1 : 0);
