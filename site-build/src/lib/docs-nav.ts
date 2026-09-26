export interface DocEntry {
	id: string;
	title: string;
	nav: string;
	order: number;
	group: string;
}

const GROUPS = {
	en: ["Overview", "Guide", "Patterns", "Build"],
	zh: ["總覽", "指南", "模式", "實作"],
} as const;

export function pageUrl(base: string, lang: "en" | "zh", id: string) {
	const slug = id.replace(/\.md$/, "");
	if (slug === "index") return lang === "en" ? `${base}/` : `${base}/zh.html`;
	const prefix = lang === "en" ? `${base}/` : `${base}/zh/`;
	return `${prefix}${slug}.html`;
}

export function buildNav(
	base: string,
	lang: "en" | "zh",
	pages: DocEntry[],
	activeId: string,
) {
	const sorted = [...pages].sort((a, b) => a.order - b.order);
	const groups = GROUPS[lang]
		.map((g) => ({
			group: g,
			entries: sorted
				.filter((p) => (p.group ?? GROUPS[lang][1]) === g)
				.map((p) => ({
					href: pageUrl(base, lang, p.id),
					label: p.nav,
					current: p.id === activeId,
				})),
		}))
		.filter((g) => g.entries.length > 0);
	const idx = sorted.findIndex((p) => p.id === activeId);
	const prev = idx > 0 ? sorted[idx - 1] : null;
	const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;
	return {
		nav: groups,
		prev: prev
			? { href: pageUrl(base, lang, prev.id), label: prev.nav }
			: undefined,
		next: next
			? { href: pageUrl(base, lang, next.id), label: next.nav }
			: undefined,
	};
}

export function otherLangHref(base: string, lang: "en" | "zh", id: string) {
	return pageUrl(base, lang === "en" ? "zh" : "en", id);
}
