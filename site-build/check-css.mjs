/**
 * CSS architecture harness (KISS/DRY/SOLID/YAGNI).
 * - SOLID: one module per concern; tokens own all literal color;
 *   responsive owns all @media; prose owns all .prose type rules.
 * - DRY: no duplicate selectors, no repeated literals.
 * - YAGNI: dead-selector denylist; per-module line cap stops
 *   the next 1xxx-line single file from recurring.
 * - Freshness: built public/assets/styles.css must equal concat(manifest).
 * Usage: bun site-build/check-css.mjs
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const MODDIR = join(HERE, "src", "styles");
const BUILT = join(HERE, "public", "assets", "styles.css");
const MANIFEST = [
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
const ALLOWED_BREAKPOINTS = [
	"(max-width: 640px)",
	"(max-width: 960px)",
	"(prefers-reduced-motion: reduce)",
];
// Verified dead 2026-09-26: zero hits in dist/*.html and src/ — never reintroduce.
const DEAD_SELECTORS = [
	".sidebar",
	".display-l",
	".nav-group",
	".status-legend",
	".sidebar-foot",
];
const LINE_CAP = 300;

let failures = 0;
const fail = (msg) => {
	failures++;
	console.log(`FAIL ${msg}`);
};

const mods = new Map(
	MANIFEST.map((f) => [f, readFileSync(join(MODDIR, f), "utf-8")]),
);

// 1. Manifest completeness: every module on disk is in the manifest and vice versa.
const onDisk = readdirSync(MODDIR).filter(
	(f) => f.endsWith(".css") && f !== "styles.css",
);
for (const f of onDisk)
	if (!MANIFEST.includes(f)) fail(`module not in build manifest: ${f}`);

// 2. Line cap per module.
for (const [f, css] of mods) {
	const n = css.split("\n").length;
	if (n > LINE_CAP)
		fail(`${f}: ${n} lines exceeds cap ${LINE_CAP} — split the module`);
}

// 3. Literal color lives in tokens.css only.
for (const [f, css] of mods) {
	if (f === "tokens.css") continue;
	css.split("\n").forEach((l, i) => {
		const code = l.replace(/\/\*.*?\*\//g, "");
		const m = code.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/);
		if (m) fail(`${f} L${i + 1}: literal color outside tokens: ${m[0]}`);
	});
}

// 4. No duplicate selectors across modules (top-level only; @media overrides exempt).
// Same-file repeats share one owner (allowed); cross-file repeats mean two
// owners for one selector (flagged). Earlier real catch: .prose h2 owned by
// both base.css and prose.css at once.
// 4a. @media lives in responsive.css only.
for (const [f, css] of mods) {
	if (f === "responsive.css") continue;
	if (/^\s*@media\b/m.test(css)) fail(`${f}: @media belongs in responsive.css`);
}
const seen = new Map();
for (const [f, css] of mods) {
	let depth = 0;
	const atStack = [];
	for (const [i, l] of css.split("\n").entries()) {
		if (/^\s*@(media|supports|container|keyframes)\b/.test(l))
			atStack.push(depth);
		const m = l.match(/^([.#:a-zA-Z[][^{}]*?)\s*\{/);
		if (m && atStack.length === 0) {
			const sel = m[1].trim();
			if (sel && !sel.startsWith("@")) {
				const key = sel;
				if (seen.has(key) && seen.get(key).split(" ")[0] !== f)
					fail(
						`${f} L${i + 1}: duplicate selector (first ${seen.get(key)}): ${sel}`,
					);
				else if (!seen.has(key)) seen.set(key, `${f} L${i + 1}`);
			}
		}
		depth += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
		while (atStack.length > 0 && depth <= atStack[atStack.length - 1])
			atStack.pop();
	}
}

// 5. Breakpoint allowlist.
for (const [f, css] of mods) {
	css.split("\n").forEach((l, i) => {
		const m = l.match(/@media\s*(\([^)]*\))/);
		if (m && !ALLOWED_BREAKPOINTS.includes(m[1]))
			fail(`${f} L${i + 1}: breakpoint not in allowlist: ${m[1]}`);
	});
}

// 6. Dead selectors stay dead.
for (const [f, css] of mods) {
	for (const dead of DEAD_SELECTORS) {
		if (css.includes(dead)) fail(`${f}: dead selector reintroduced: ${dead}`);
	}
}

// 7. Build freshness.
const concat = MANIFEST.map((f) => mods.get(f).replace(/\n+$/, "\n")).join(
	"\n",
);
const built = readFileSync(BUILT, "utf-8");
if (built !== concat)
	fail("public/assets/styles.css stale — run: bun run css:build");

console.log(failures ? `\n${failures} violation(s)` : "css harness: PASS");
process.exit(failures ? 1 : 0);
