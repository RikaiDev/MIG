/**
 * CSS architecture harness (KISS/DRY/SOLID/YAGNI).
 * - SOLID: tokens.css owns all literal color and :root; responsive section
 *   of site.css owns all @media.
 * - DRY: no duplicate top-level selectors per file.
 * - YAGNI: dead-selector denylist; per-file line cap stops bloat recurrence.
 * Usage: bun check-css.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const FILES = [
	join(HERE, "public", "assets", "tokens.css"),
	join(HERE, "public", "assets", "site.css"),
];
const ALLOWED_BREAKPOINTS = [
	"(max-width: 960px)",
	"(prefers-reduced-motion: reduce)",
];
const DEAD_SELECTORS = [
	".sidebar",
	".display-l",
	".nav-group",
	".status-legend",
	".rail",
];
const LINE_CAP = 500;

let failures = 0;
const fail = (msg) => {
	failures++;
	console.log(`FAIL ${msg}`);
};

for (const file of FILES) {
	const name = file.split("/").pop();
	const css = readFileSync(file, "utf-8");
	const lines = css.split("\n");
	if (lines.length > LINE_CAP)
		fail(
			`${name}: ${lines.length} lines exceeds cap ${LINE_CAP} — split the file`,
		);

	// Literal color: allowed in tokens.css only inside :root; forbidden in site.css.
	let depth = 0;
	let inRoot = false;
	lines.forEach((l, i) => {
		const t = l.trim();
		if (/^:root\s*\{/.test(t)) {
			if (name !== "tokens.css")
				fail(`${name} L${i + 1}: :root belongs in tokens.css`);
			inRoot = true;
			depth = 0;
		}
		if (inRoot) {
			depth += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
			if (depth <= 0 && !/^:root/.test(t)) inRoot = false;
		} else {
			const code = l.replace(/\/\*.*?\*\//g, "");
			const m = code.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/);
			if (m) fail(`${name} L${i + 1}: literal color outside tokens: ${m[0]}`);
		}
	});

	// No duplicate top-level selectors (@media overrides exempt).
	const seen = new Map();
	let ruleDepth = 0;
	const atStack = [];
	lines.forEach((l, i) => {
		if (/^\s*@(media|supports|container|keyframes)\b/.test(l))
			atStack.push(ruleDepth);
		const m = l.match(/^([.#:a-zA-Z[][^{}]*?)\s*\{/);
		if (m && atStack.length === 0) {
			const sel = m[1].trim();
			if (sel && !sel.startsWith("@")) {
				if (seen.has(sel))
					fail(
						`${name} L${i + 1}: duplicate selector (first L${seen.get(sel)}): ${sel}`,
					);
				else seen.set(sel, i + 1);
			}
		}
		ruleDepth += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
		while (atStack.length > 0 && ruleDepth <= atStack[atStack.length - 1])
			atStack.pop();
	});

	// Breakpoint allowlist + dead selectors.
	lines.forEach((l, i) => {
		const m = l.match(/@media\s*(\([^)]*\))/);
		if (m && !ALLOWED_BREAKPOINTS.includes(m[1]))
			fail(`${name} L${i + 1}: breakpoint not in allowlist: ${m[1]}`);
		for (const dead of DEAD_SELECTORS) {
			if (l.includes(dead)) fail(`${name} L${i + 1}: dead selector: ${dead}`);
		}
	});
}

console.log(failures ? `\n${failures} violation(s)` : "css harness: PASS");
process.exit(failures ? 1 : 0);
