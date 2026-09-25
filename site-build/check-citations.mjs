/**
 * Citation verification harness for MIG references (Buddhist gate: Kalama).
 * Every cited claim must resolve and contain its quoted evidence.
 * Usage: bun site-build/check-citations.mjs
 * Types: text = fetch page, assert quoted strings present.
 *        crossref = DOI metadata check (title match, for paywalled papers).
 *        exists = HTTP 200 + non-empty body (PDFs without a parser).
 */
const ENTRIES = [
	{
		id: "weiser91",
		type: "exists",
		url: "https://www.csie.ntu.edu.tw/~hchu/ubicomp_course/papers/weiser_91.pdf",
	},
	{
		id: "weiser-calm-wiki",
		type: "text",
		url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&titles=calm_technology&format=json",
		mustContain: ["Dangling String", "periphery"],
	},
	{
		id: "ambientroom-1998",
		type: "exists",
		url: "https://papers.cumincad.org/data/works/att/9254.content.pdf",
	},
	{
		id: "jacob-interactions-pdf",
		type: "exists",
		url: "http://ubicomp.net/wp/wp-content/uploads/2017/10/p62-jacob.pdf",
	},
	{
		id: "octopocus-pdf",
		type: "exists",
		url: "https://www.lri.fr/~mbl/Stanford/CS477/papers/Octopocus-UIST2008.pdf",
	},
	{
		id: "octopocus3d-pdf",
		type: "exists",
		url: "http://iihm.imag.fr/publs/2016/DelamareetalAVI2016.pdf",
	},
	{
		id: "himirror-prn",
		type: "text",
		url: "https://www.prnewswire.com/news-releases/himirror-the-worlds-smartest-vanity-mirror-to-showcase-latest-innovations-at-ces-2019-300772228.html",
		mustContain: ["voice-interactive smart mirror"],
	},
	{
		id: "fitness-bbc",
		type: "text",
		url: "https://www.bbc.com/news/business-61092317",
		mustContain: ["touch-screen mirrors", "Vaha"],
	},
	{
		id: "hoober-uxmatters",
		type: "text",
		url: "https://www.uxmatters.com/mt/archives/2017/03/design-for-fingers-touch-and-people-part-1.php",
		mustContain: ["center of the screen", "75%"],
	},
	{
		id: "goffman-presentation",
		type: "text",
		url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&titles=The_Presentation_of_Self_in_Everyday_Life&format=json",
		mustContain: ["Goffman", "performance"],
	},
	{
		id: "gallup-mirror-test",
		type: "text",
		url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&titles=Mirror_test&format=json",
		mustContain: ["Gallup", "self-recognition"],
	},
	{
		id: "devicedaily-himirror-flaws",
		type: "text",
		url: "https://www.devicedaily.com/pin/the-first-smart-mirror-you-can-actually-buy-focuses-on-your-flaws/",
		mustContain: ["flaws"],
	},
	{
		id: "marky-bystanders-pdf",
		type: "exists",
		url: "http://kaikunze.de/papers/pdf/marky2020don.pdf",
	},
	{
		id: "meng-chi2023-pdf",
		type: "exists",
		url: "https://tulipslab.org/papers/meng2023chi.pdf",
	},
	{ id: "doi-jacob-tois", type: "crossref", doi: "10.1145/123078.128728", title: "eye movements" },
	{ id: "doi-jacob-chi90", type: "crossref", doi: "10.1145/97243.97246", title: "What You Look At Is What You Get" },
	{ id: "doi-octopocus", type: "crossref", doi: "10.1145/1449715.1449724", title: "OctoPocus" },
	{ id: "doi-wize-tmm", type: "crossref", doi: "10.1109/TMM.2017.2666545", title: "Mirror Mirror" },
	{ id: "doi-wize-cviu", type: "crossref", doi: "10.1016/j.cviu.2016.03.018", title: "Wize Mirror" },
	{ id: "doi-wize-wimob", type: "crossref", doi: "10.1109/wimob.2017.8115837", title: "User acceptance" },
	{ id: "doi-youmove", type: "crossref", doi: "10.1145/2501988.2502045", title: "YouMove" },
	{ id: "doi-huang-chi20", type: "crossref", doi: "10.1145/3313831.3376529", title: "Amazon vs. My Brother" },
	{ id: "doi-lau-cscw18", type: "crossref", doi: "10.1145/3274371", title: "Alexa, Are You Listening" },
	{ id: "doi-owning-sharing", type: "crossref", doi: "10.1145/3449119", title: "Owning and Sharing" },
	{ id: "doi-tangible-privacy", type: "crossref", doi: "10.1145/3555089", title: "Tangible Privacy" },
	{ id: "doi-gestuwan", type: "crossref", doi: "10.1007/978-3-319-22668-2_28", title: "Gestu-Wan" },
	{ id: "doi-octopocus-vr", type: "crossref", doi: "10.1109/tvcg.2021.3101854", title: "OctoPocus in VR" },
];

async function checkText(e) {
	const res = await fetch(e.url, {
		headers: { "User-Agent": "MIG-citation-check/0.1" },
		signal: AbortSignal.timeout(25000),
	});
	if (!res.ok) return `HTTP ${res.status}`;
	const text = await res.text();
	const missing = (e.mustContain || []).filter((q) => !text.includes(q));
	return missing.length ? `missing quotes: ${missing.join(" | ")}` : null;
}

async function checkExists(e) {
	const res = await fetch(e.url, {
		method: "GET",
		headers: { "User-Agent": "MIG-citation-check/0.1", Range: "bytes=0-0" },
		signal: AbortSignal.timeout(25000),
	});
	if (![200, 206].includes(res.status)) return `HTTP ${res.status}`;
	await res.arrayBuffer();
	return null;
}

async function checkCrossref(e) {
	const res = await fetch(
		`https://api.crossref.org/works/${encodeURIComponent(e.doi)}`,
		{ headers: { "User-Agent": "MIG-citation-check/0.1" }, signal: AbortSignal.timeout(25000) }
	);
	if (!res.ok) return `Crossref HTTP ${res.status}`;
	const title = (await res.json()).message?.title?.[0] ?? "";
	return title.toLowerCase().includes(e.title.toLowerCase())
		? null
		: `title mismatch: "${title.slice(0, 80)}"`;
}

let failures = 0;
for (const e of ENTRIES) {
	let err = null;
	try {
		err =
			e.type === "text"
				? await checkText(e)
				: e.type === "crossref"
					? await checkCrossref(e)
					: await checkExists(e);
	} catch (ex) {
		err = `fetch failed: ${String(ex).slice(0, 100)}`;
	}
	console.log(`${err ? "FAIL" : "ok  "} ${e.id}${err ? ` — ${err}` : ""}`);
	if (err) failures++;
	await new Promise((r) => setTimeout(r, 1200));
}
console.log(failures ? `\n${failures} citation(s) UNVERIFIED` : "\nall citations verified");
process.exit(failures ? 1 : 0);
