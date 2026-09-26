/** MIG content transforms (remark + rehype). Replaces the retired build.mjs regexes. */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { visit } from "unist-util-visit";

const DEMOS = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "demos");
const BASE = "/MIG";
const STATUSES = new Set(["borrowed", "derived", "proposed"]);

function textOf(node) {
	if (!node) return "";
	if (node.type === "text") return node.value;
	return (node.children || []).map(textOf).join("");
}

export function remarkMig() {
	return (tree) => {
		// Demo markers: `:::demo-id` paragraphs become live demo partials.
		visit(tree, "paragraph", (node, index, parent) => {
			if (node.children?.length !== 1 || node.children[0].type !== "text") return;
			const m = node.children[0].value.trim().match(/^:::([a-z0-9-]+)$/);
			if (!m || !parent || typeof index !== "number") return;
			const file = join(DEMOS, `${m[1]}.html`);
			const html = existsSync(file)
				? readFileSync(file, "utf-8")
				: `<p class="demo-missing">demo:${m[1]} missing</p>`;
			parent.children[index] = {
				type: "html",
				value: `<div class="demo" data-demo="${m[1]}">${html}</div>`,
			};
		});
		// Doc cross-refs: `foo/bar.md` code spans become site links.
		visit(tree, "inlineCode", (node, index, parent) => {
			const m = node.value.match(/^([a-z0-9/_-]+\.md)$/);
			if (!m || !parent || typeof index !== "number") return;
			const slug = m[1].replace(/\.md$/, ".html");
			const name = m[1].split("/").pop().replace(/\.md$/, "");
			parent.children[index] = {
				type: "html",
				value: `<a href="${BASE}/${slug}"><code>${name}</code></a>`,
			};
		});
	};
}

function ruleSection(id, status, titleNode, bodyNodes) {
	const slug = `rule-${id.toLowerCase()}`;
	return {
		type: "element",
		tagName: "section",
		properties: { className: ["rule"], id: slug },
		children: [
			{
				type: "element",
				tagName: "p",
				properties: { className: ["rule-eyebrow"] },
				children: [
					{
						type: "element",
						tagName: "span",
						properties: { className: ["rule-id"] },
						children: [{ type: "text", value: id }],
					},
					{
						type: "element",
						tagName: "span",
						properties: { className: ["chip", status] },
						children: [{ type: "text", value: status }],
					},
					{
						type: "element",
						tagName: "a",
						properties: {
							className: ["rule-anchor"],
							href: `#${slug}`,
							ariaLabel: `Link to rule ${id}`,
						},
						children: [{ type: "text", value: "#" }],
					},
				],
			},
			...(titleNode ? [titleNode] : []),
			{
				type: "element",
				tagName: "div",
				properties: { className: ["rule-body"] },
				children: bodyNodes,
			},
		],
	};
}

export function rehypeMig() {
	return (tree) => {
		// Rule cards from list items (all parsing + rendering here: hast survives).
		// Handles both loose lists (li > p > strong) and tight lists (li > strong).
		visit(tree, "element", (node) => {
			if (node.tagName !== "li" || !node.children) return;
			let host = node;
			let kids = node.children;
			const para = node.children.find(
				(c) => c.type === "element" && c.tagName === "p"
			);
			if (para) {
				host = para;
				kids = para.children || [];
			}
			const strong = kids[0];
			if (!strong || strong.type !== "element" || strong.tagName !== "strong") return;
			const idMatch = textOf(strong).match(/^([A-Z][A-Z0-9-_]*)\b([\s\S]*)$/);
			if (!idMatch) return;
			const afterText = kids
				.slice(1)
				.map((c) => (c.type === "text" ? c.value : ""))
				.join("");
			const inStrong = idMatch[2].match(/\(([a-z]+)/);
			const afterStrong = afterText.match(/^\s*\(([a-z]+)/);
			const status = (inStrong?.[1] ?? afterStrong?.[1] ?? "").trim();
			if (!STATUSES.has(status)) return;
			const title = inStrong ? "" : idMatch[2].trim();
			const body = kids.slice(1).map((c) => ({ ...c }));
			const head = body[0];
			if (head && head.type === "text") {
				head.value = head.value
					.replace(/^\s*\([a-z]+[^)]*\)\.?\s*/, "")
					.replace(/^\.\s*/, "");
			}
			const titleNode = title
				? {
						type: "element",
						tagName: "h3",
						properties: { className: ["rule-title"] },
						children: [{ type: "text", value: title }],
					}
				: null;
			host.children = [ruleSection(idMatch[1], status, titleNode, body)];
			node.properties = {
				...(node.properties || {}),
				className: [...(node.properties?.className || []), "rule-item"],
			};
		});
		// `## Title (MIG-C1, derived)` sections become cards.
		visit(tree, "element", (node) => {
			if (node.tagName !== "h2") return;
			const m = textOf(node).match(/^(.*?)\s*\(MIG-([A-Z0-9]+),\s*([a-z]+).*\)$/);
			if (!m || !STATUSES.has(m[3])) return;
			node.tagName = "div";
			node.properties = { className: ["mig-h2-card"] };
			node.children = [
				ruleSection(
					`MIG-${m[2]}`,
					m[3],
					{
						type: "element",
						tagName: "h2",
						properties: { className: ["rule-title"] },
						children: [{ type: "text", value: m[1].trim() }],
					},
					[]
				),
			];
		});
		// Move siblings following an h2 card into its rule body.
		visit(tree, "element", (node) => {
			if (!node.children) return;
			const out = [];
			let open = null;
			for (const child of node.children) {
				if (
					child.type === "element" &&
					child.tagName === "div" &&
					child.properties?.className?.includes("mig-h2-card")
				) {
					if (open) out.push(open.section);
					const section = child.children[0];
					open = { section, body: section.children[section.children.length - 1].children };
					out.push(child);
					continue;
				}
				if (open && child.type === "element" && /^h[12]$/.test(child.tagName)) {
					out.push(open.section);
					open = null;
					out.push(child);
					continue;
				}
				if (open) {
					open.body.push(child);
					continue;
				}
				out.push(child);
			}
			if (open) out.push(open.section);
			node.children = out.filter(Boolean);
		});
		// GFM task checkboxes: enable + hook for persistence.
		visit(tree, "element", (node) => {
			if (node.tagName !== "input" || node.properties?.type !== "checkbox") return;
			delete node.properties.disabled;
			node.properties["data-task"] = "";
		});
	};
}
