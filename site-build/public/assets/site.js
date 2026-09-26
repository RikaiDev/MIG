/* MIG site interactions: symptom search, mobile nav. No camera, no tracking. */
(() => {
	const cssHref =
		document.querySelector('link[rel="stylesheet"]')?.getAttribute("href") ??
		"";
	const base = cssHref.includes("/assets/") ? cssHref.split("/assets/")[0] : "";

	// Mobile nav toggle.
	const toggle = document.getElementById("nav-toggle");
	const nav = document.getElementById("sidenav");
	if (toggle && nav) {
		toggle.addEventListener("click", () => {
			const open = nav.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
	}

	// Symptom search: plain words first, no jargon required.
	const input = document.getElementById("search");
	const hits = document.getElementById("hits");
	if (!input || !hits) return;
	let index = [];
	const indexFile = input.dataset.index ?? "search-en.json";
	fetch(`${base}/assets/${indexFile}`)
		.then((r) => (r.ok ? r.json() : []))
		.then((j) => {
			index = j;
		})
		.catch(() => {});
	function close() {
		hits.hidden = true;
		hits.innerHTML = "";
	}
	input.addEventListener("input", () => {
		const q = input.value.trim();
		if (q.length < 2) {
			close();
			return;
		}
		const found = index
			.filter((e) => e.keys.some((k) => k.includes(q)))
			.slice(0, 8);
		if (found.length === 0) {
			close();
			return;
		}
		hits.innerHTML = "";
		for (const e of found) {
			const a = document.createElement("a");
			a.href = e.href.startsWith("/") ? base + e.href : e.href;
			a.setAttribute("role", "option");
			a.textContent = e.title;
			const s = document.createElement("span");
			s.className = "hit-why";
			s.textContent = e.why;
			a.appendChild(s);
			hits.appendChild(a);
		}
		hits.hidden = false;
	});
	input.addEventListener("keydown", (e) => {
		if (e.key === "Escape") close();
	});
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".searchwrap")) close();
	});
})();
