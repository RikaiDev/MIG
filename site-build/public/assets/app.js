/* MIG site interactions: search overlay, checklist persistence, mobile nav. */
(() => {
	// Mobile rail toggle.
	const toggle = document.getElementById("nav-toggle");
	const rail = document.getElementById("rail");
	if (toggle && rail) {
		toggle.addEventListener("click", () => {
			const open = rail.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
	}

	// Checklist persistence (per page + item index).
	const tasks = Array.prototype.slice.call(
		document.querySelectorAll("input[data-task]"),
	);
	tasks.forEach((box, i) => {
		const key = `mig-task:${location.pathname}:${i}`;
		try {
			if (localStorage.getItem(key) === "1") box.checked = true;
		} catch {}
		box.addEventListener("change", () => {
			try {
				localStorage.setItem(key, box.checked ? "1" : "0");
			} catch {}
		});
	});

	// Search overlay.
	const overlay = document.getElementById("search-overlay");
	const openBtn = document.getElementById("search-open");
	const input = document.getElementById("search-input");
	const results = document.getElementById("search-results");
	let entries = [];
	const base = (() => {
		const parts = location.pathname.split("/");
		parts.pop();
		return `${parts.join("/")}/`;
	})();

	function asset(path) {
		const css = document.querySelector('link[rel="stylesheet"]');
		if (css) return css.href.replace(/assets\/styles\.css.*$/, path);
		return base + path;
	}

	fetch(asset("assets/search-index.json"))
		.then((r) => r.json())
		.then((data) => {
			entries = data;
		})
		.catch(() => {});

	function open() {
		overlay.hidden = false;
		input.value = "";
		render("");
		setTimeout(() => {
			input.focus();
		}, 30);
	}
	function close() {
		overlay.hidden = true;
	}
	if (openBtn) openBtn.addEventListener("click", open);
	const openBtnRail = document.getElementById("search-open-rail");
	if (openBtnRail) openBtnRail.addEventListener("click", open);
	document.addEventListener("keydown", (e) => {
		if (
			e.key === "/" &&
			overlay.hidden &&
			!/INPUT|TEXTAREA/.test(document.activeElement.tagName)
		) {
			e.preventDefault();
			open();
		}
		if (e.key === "Escape" && !overlay.hidden) close();
	});
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) close();
	});

	function snippet(text, qi) {
		const i = text.toLowerCase().indexOf(qi);
		if (i < 0) return `${text.slice(0, 140)}…`;
		const s = Math.max(0, i - 60);
		return `${s > 0 ? "…" : ""}${text.slice(s, s + 160)}…`;
	}

	function render(q) {
		const qi = q.trim().toLowerCase();
		if (!qi) {
			results.innerHTML =
				'<div class="r-empty">Type to search rules, components, patterns…</div>';
			return;
		}
		const scored = entries
			.map((e) => {
				const hay = `${e.title} ${e.text}`.toLowerCase();
				let score = 0;
				qi.split(/\s+/).forEach((tok) => {
					if (e.title.toLowerCase().indexOf(tok) >= 0) score += 3;
					if (hay.indexOf(tok) >= 0) score += 1;
				});
				return { e: e, score: score };
			})
			.filter((x) => x.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 12);
		if (!scored.length) {
			results.innerHTML = '<div class="r-empty">No matches.</div>';
			return;
		}
		results.innerHTML = scored
			.map(
				(x) =>
					`<a href="${asset(`${x.e.slug}.html`)}"><div class="r-title">${x.e.title}</div><div class="r-snippet">${snippet(x.e.text, qi).replace(/</g, "&lt;")}</div></a>`,
			)
			.join("");
	}
	input.addEventListener("input", () => {
		render(input.value);
	});

	// M3 theme switch (persisted; defaults to system). Syncs topbar + rail toggles.
	const themeBtn = document.getElementById("theme-toggle");
	const themeBtnRail = document.getElementById("theme-toggle-rail");
	function setChecked(on) {
		if (themeBtn) themeBtn.setAttribute("aria-checked", on ? "true" : "false");
		if (themeBtnRail)
			themeBtnRail.setAttribute("aria-checked", on ? "true" : "false");
	}
	function applyTheme(t) {
		if (t === "light") {
			document.documentElement.dataset.theme = "light";
		} else {
			delete document.documentElement.dataset.theme;
		}
		setChecked(t !== "light");
		try {
			localStorage.setItem("mig-theme", t);
		} catch {}
	}
	function toggleTheme() {
		applyTheme(
			document.documentElement.dataset.theme === "light" ? "dark" : "light",
		);
	}
	if (themeBtn) {
		themeBtn.addEventListener("click", toggleTheme);
	}
	if (themeBtnRail) {
		themeBtnRail.addEventListener("click", toggleTheme);
	}
	if (themeBtn || themeBtnRail) {
		try {
			const stored = localStorage.getItem("mig-theme");
			if (stored === "dark" || stored === "light") applyTheme(stored);
			else setChecked(document.documentElement.dataset.theme !== "light");
		} catch {}
	}

	// Status filter chips: dim rules that don't match the active set.
	const legend = document.querySelector(".status-legend");
	if (legend) {
		const active = { borrowed: true, derived: true, proposed: true };
		const buttons = Array.prototype.slice.call(
			legend.querySelectorAll(".chip"),
		);
		buttons.forEach((btn) => {
			const kind = btn.classList.contains("borrowed")
				? "borrowed"
				: btn.classList.contains("derived")
					? "derived"
					: "proposed";
			const press = document.createElement("button");
			press.className = `${btn.className} on`;
			press.textContent = btn.textContent;
			press.setAttribute("aria-pressed", "true");
			press.setAttribute("aria-label", `Toggle ${kind} rules`);
			btn.replaceWith(press);
			press.addEventListener("click", () => {
				active[kind] = !active[kind];
				press.setAttribute("aria-pressed", active[kind] ? "true" : "false");
				press.classList.toggle("on", active[kind]);
				Array.prototype.forEach.call(
					document.querySelectorAll("section.rule"),
					(sec) => {
						const chip = sec.querySelector(".rule-eyebrow .chip");
						const show =
							!chip ||
							(chip.classList.contains("borrowed") && active.borrowed) ||
							(chip.classList.contains("derived") && active.derived) ||
							(chip.classList.contains("proposed") && active.proposed);
						sec.style.display = show ? "" : "none";
					},
				);
			});
		});
	}

	// On-this-page scroll-spy.
	const tocLinks = Array.prototype.slice.call(
		document.querySelectorAll(".toc a[href^='#']"),
	);
	if (tocLinks.length && "IntersectionObserver" in window) {
		const byId = {};
		tocLinks.forEach((a) => {
			byId[a.getAttribute("href").slice(1)] = a;
		});
		const spy = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting && byId[en.target.id]) {
						tocLinks.forEach((a) => {
							a.classList.remove("active");
						});
						byId[en.target.id].classList.add("active");
					}
				});
			},
			{ rootMargin: "-20% 0px -70% 0px" },
		);
		Object.keys(byId).forEach((id) => {
			const el = document.getElementById(id);
			if (el) spy.observe(el);
		});
	}
})();
