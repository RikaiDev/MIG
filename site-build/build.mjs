/**
 * Build the MIG static site from docs/*.md. Bun + marked only.
 * Usage: bun site-build/build.mjs (or `bun run build` inside site-build/)
 * Output: site/ (gitignored; deployed by .github/workflows/pages.yml).
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const OUT = join(ROOT, "site");
const BUILD = join(ROOT, "site-build");

const PAGES = [
	["index", "Overview"],
	["principles", "Principles"],
	["interaction-methods", "Interaction methods"],
	["foundations/color", "Color"],
	["foundations/typography", "Typography"],
	["foundations/layout-grid", "Layout grid"],
	["foundations/iconography", "Iconography"],
	["foundations/motion", "Motion"],
	["components", "Components"],
	["mirror-hardware", "Mirror hardware"],
	["ai-interaction", "AI interaction"],
	["accessibility", "Accessibility"],
	["checklists", "Checklists"],
	["validation", "Validation"],
	["glossary", "Glossary"],
	["changelog", "Changelog"],
];

const HERO = `<section class="hero">
<p class="eyebrow">RikaiDev · Design Guidelines</p>
<h1>Mirror Interface<br><em>Guidelines</em></h1>
<p class="lede">Design rules for interactive half-mirror ambient displays —
surfaces that are simultaneously a mirror, an optical measurement instrument,
and a touch/voice interface.</p>
<div class="hero-chips">
<span class="chip borrowed">borrowed — restates HIG / Material / WCAG</span>
<span class="chip derived">derived — established principle, mirror analogy</span>
<span class="chip proposed">proposed — no precedent, needs validation</span>
</div>
</section>`;

marked.setOptions({ gfm: true, breaks: false });

function checklistBoxes(html) {
	return html.replace(
		/<li>\[ \] (.*?)<\/li>/g,
		'<li class="task"><label><input type="checkbox" data-task> <span>$1</span></label></li>'
	);
}

const DEMOS = join(BUILD, "demos");
function injectDemos(html) {
	// :::demo-id blocks are replaced by hand-authored live demos.
	return html.replace(/<p>:::([a-z0-9-]+)<\/p>/g, (_, id) => {
		const file = join(DEMOS, `${id}.html`);
		if (!existsSync(file)) return `<p class="demo-missing">demo:${id} missing</p>`;
		return `<div class="demo" data-demo="${id}">${readFileSync(file, "utf-8")}</div>`;
	});
}

function stripTags(html) {
	return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const template = readFileSync(join(BUILD, "template.html"), "utf-8");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "assets"), { recursive: true });
copyFileSync(join(BUILD, "styles.css"), join(OUT, "assets", "styles.css"));
copyFileSync(join(BUILD, "app.js"), join(OUT, "assets", "app.js"));

const navlinks = () =>
	PAGES.map(([slug, title]) => `<a href="{rel}${slug}.html">${title}</a>`).join("");
void navlinks;

function sidenav(active) {
	const groups = new Map([["", []]]);
	for (const [slug, title] of PAGES) {
		const group = slug.startsWith("foundations/") ? "Foundations" : "";
		if (!groups.has(group)) groups.set(group, []);
		groups.get(group).push([slug, title]);
	}
	const out = [];
	for (const [group, items] of groups) {
		if (group) out.push(`<p class="nav-group">${group}</p>`);
		for (const [slug, title] of items) {
			const cls = slug === active ? "active" : "";
			const current = slug === active ? ' aria-current="page"' : "";
			out.push(`<a class="${cls}"${current} href="{rel}${slug}.html">${title}</a>`);
		}
	}
	return out.join("");
}

const indexEntries = [];
for (const [slug, title] of PAGES) {
	const src = readFileSync(join(DOCS, `${slug}.md`), "utf-8");
	const content = injectDemos(checklistBoxes(marked.parse(src)));
	const text = stripTags(content);
	const depth = slug.split("/").length - 1;
	const rel = "../".repeat(depth);
	const hero = slug === "index" ? HERO : "";
	const page = template
		.split("{{title}}").join(title)
		.split("{{rel}}").join(rel)
		.split("{{sidenav}}").join(sidenav(slug).split("{rel}").join(rel))
		.split("{{hero}}").join(hero)
		.split("{{content}}").join(content);
	const target = join(OUT, `${slug}.html`);
	mkdirSync(dirname(target), { recursive: true });
	writeFileSync(target, page);
	indexEntries.push({ slug, title, text: text.slice(0, 4000) });
}
writeFileSync(
	join(OUT, "assets", "search-index.json"),
	JSON.stringify(indexEntries)
);
console.log(`built ${PAGES.length} pages -> ${OUT}`);
