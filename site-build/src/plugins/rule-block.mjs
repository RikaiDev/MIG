/**
 * remark plugin: ```rule fenced blocks become structured rule cards.
 * Fields (one per line, `key: value`; continuation lines append):
 * id, title, normative (must|should|may), evidence
 * (physical|direct|cross-domain|decision|hypothesis), tech
 * (optical|video|both), scope, statement, why, wrong, do, fix, impl,
 * verify, gaps, version (optional, defaults to v0.1.0).
 * Fence meta selects label language: ```rule en (default: zh).
 */
import { visit } from "unist-util-visit";

const NORMATIVE = {
	zh: { must: "必須", should: "建議", may: "可選" },
	en: { must: "must", should: "should", may: "may" },
};
const EVIDENCE = {
	zh: {
		physical: "物理限制",
		direct: "直接實證",
		"cross-domain": "相關領域推論",
		decision: "團隊決策",
		hypothesis: "待驗證假設",
	},
	en: {
		physical: "physical",
		direct: "direct evidence",
		"cross-domain": "cross-domain",
		decision: "team decision",
		hypothesis: "hypothesis",
	},
};
const TECH = {
	zh: { optical: "光學鏡面", video: "影像鏡面", both: "兩種鏡面" },
	en: { optical: "optical", video: "video", both: "both" },
};
const SECTIONS = {
	zh: [
		["scope", "適用範圍"],
		["statement", "規則"],
		["why", "原因"],
		["wrong", "錯誤範例"],
		["do", "正例"],
		["fix", "建議做法"],
		["impl", "實作注意"],
		["verify", "驗證方法"],
		["gaps", "已知缺口"],
	],
	en: [
		["scope", "Scope"],
		["statement", "Rule"],
		["why", "Rationale"],
		["wrong", "Wrong example"],
		["do", "Do instead"],
		["fix", "Fix"],
		["impl", "Implementation notes"],
		["verify", "Verify"],
		["gaps", "Known gaps"],
	],
};

function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseRule(text) {
	const fields = {};
	let current = null;
	for (const line of text.split("\n")) {
		const m = line.match(/^([a-z]+):\s*(.*)$/);
		if (m && fields[m[1]] === undefined) {
			current = m[1];
			fields[current] = m[2];
		} else if (current && line.trim() !== "") {
			fields[current] += ` ${line.trim()}`;
		}
	}
	for (const k of [
		"id",
		"title",
		"normative",
		"evidence",
		"tech",
		"statement",
	]) {
		if (!fields[k]) throw new Error(`rule block missing field: ${k}`);
	}
	if (!["must", "should", "may"].includes(fields.normative))
		throw new Error(`bad normative: ${fields.normative}`);
	if (
		!["physical", "direct", "cross-domain", "decision", "hypothesis"].includes(
			fields.evidence,
		)
	)
		throw new Error(`bad evidence: ${fields.evidence}`);
	if (!["optical", "video", "both"].includes(fields.tech))
		throw new Error(`bad tech: ${fields.tech}`);
	return fields;
}

export default function ruleBlock() {
	return (tree) => {
		visit(tree, "code", (node, index, parent) => {
			if (!parent || typeof index !== "number" || node.lang !== "rule") return;
			const lang = (node.meta ?? "").trim() === "en" ? "en" : "zh";
			const L = {
				normative: NORMATIVE[lang],
				evidence: EVIDENCE[lang],
				tech: TECH[lang],
				sections: SECTIONS[lang],
				anchor: lang === "en" ? "Link to this rule" : "連結到本條規則",
			};
			const f = parseRule(node.value);
			const slug = `rule-${f.id.toLowerCase()}`;
			const version = esc(f.version ?? "v0.1.0");
			let html = `<section class="rule" id="${slug}" aria-label="${esc(f.id)}">`;
			html += `<div class="rule-head"><span class="rule-id">${esc(f.id)}</span>`;
			html += `<span class="badge version">${version}</span>`;
			html += `<span class="badge normative-${esc(f.normative)}">${L.normative[f.normative]}</span>`;
			html += `<span class="badge evidence">${L.evidence[f.evidence]}</span>`;
			html += `<span class="badge tech">${L.tech[f.tech]}</span></div>`;
			html += `<h3 class="rule-title">${esc(f.title)}</h3>`;
			for (const [key, label] of L.sections) {
				if (!f[key]) continue;
				html += `<div class="rule-sec"><p class="rule-label">${label}</p><p>${esc(f[key])}</p></div>`;
			}
			html += `<a class="rule-anchor" href="#${slug}" aria-label="${L.anchor}">¶</a></section>`;
			parent.children[index] = { type: "html", value: html };
		});
	};
}
