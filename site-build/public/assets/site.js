/* MIG site interactions: symptom search, mobile nav. No camera, no tracking. */
(() => {
	const scriptSrc = document.currentScript?.src ?? "";
	const base = scriptSrc.includes("/assets/")
		? new URL(scriptSrc).pathname.split("/assets/")[0]
		: "";

	// Mobile nav toggle.
	const toggle = document.getElementById("nav-toggle");
	const nav = document.getElementById("sidenav");
	if (toggle && nav) {
		toggle.addEventListener("click", () => {
			const open = nav.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
	}

	// Language: remember choice, keep reading position across switch,
	// honor stored choice on the front door.
	try {
		const here = location.pathname;
		const onZh = /(^|\/)zh\//.test(here);
		for (const a of document.querySelectorAll(".langswitch a[data-lang-set]")) {
			a.addEventListener("click", () => {
				try {
					localStorage.setItem("mig-lang", a.dataset.langSet);
				} catch {}
				if (location.hash) a.href += location.hash;
			});
		}
		const atRoot = /\/MIG\/?$/.test(here) || /\/MIG\/index\.html$/.test(here);
		const stored = localStorage.getItem("mig-lang");
		if (atRoot && stored === "zh" && !onZh) {
			location.replace(`${base}/zh.html${location.hash}`);
		} else if (atRoot && stored === "en" && onZh) {
			location.replace(`${base}/${location.hash}`);
		}
	} catch {}

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
