/* MIG site interactions: search overlay, checklist persistence, mobile nav. */
(function () {
	"use strict";

	// Mobile sidebar toggle.
	var toggle = document.getElementById("nav-toggle");
	var sidebar = document.getElementById("sidebar");
	if (toggle && sidebar) {
		toggle.addEventListener("click", function () {
			var open = sidebar.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
	}

	// Checklist persistence (per page + item index).
	var tasks = Array.prototype.slice.call(
		document.querySelectorAll('input[data-task]')
	);
	tasks.forEach(function (box, i) {
		var key =
			"mig-task:" + location.pathname + ":" + i;
		try {
			if (localStorage.getItem(key) === "1") box.checked = true;
		} catch (e) {}
		box.addEventListener("change", function () {
			try {
				localStorage.setItem(key, box.checked ? "1" : "0");
			} catch (e) {}
		});
	});

	// Search overlay.
	var overlay = document.getElementById("search-overlay");
	var openBtn = document.getElementById("search-open");
	var input = document.getElementById("search-input");
	var results = document.getElementById("search-results");
	var entries = [];
	var base = (function () {
		var parts = location.pathname.split("/");
		parts.pop();
		return parts.join("/") + "/";
	})();

	function asset(path) {
		var css = document.querySelector('link[rel="stylesheet"]');
		if (css) return css.href.replace(/styles\.css.*$/, path);
		return base + path;
	}

	fetch(asset("assets/search-index.json"))
		.then(function (r) {
			return r.json();
		})
		.then(function (data) {
			entries = data;
		})
		.catch(function () {});

	function open() {
		overlay.hidden = false;
		input.value = "";
		render("");
		setTimeout(function () {
			input.focus();
		}, 30);
	}
	function close() {
		overlay.hidden = true;
	}
	if (openBtn) openBtn.addEventListener("click", open);
	document.addEventListener("keydown", function (e) {
		if (e.key === "/" && overlay.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
			e.preventDefault();
			open();
		}
		if (e.key === "Escape" && !overlay.hidden) close();
	});
	overlay.addEventListener("click", function (e) {
		if (e.target === overlay) close();
	});

	function snippet(text, qi) {
		var i = text.toLowerCase().indexOf(qi);
		if (i < 0) return text.slice(0, 140) + "…";
		var s = Math.max(0, i - 60);
		return (s > 0 ? "…" : "") + text.slice(s, s + 160) + "…";
	}

	function render(q) {
		var qi = q.trim().toLowerCase();
		if (!qi) {
			results.innerHTML = '<div class="r-empty">Type to search rules, components, patterns…</div>';
			return;
		}
		var scored = entries
			.map(function (e) {
				var hay = (e.title + " " + e.text).toLowerCase();
				var score = 0;
				qi.split(/\s+/).forEach(function (tok) {
					if (e.title.toLowerCase().indexOf(tok) >= 0) score += 3;
					if (hay.indexOf(tok) >= 0) score += 1;
				});
				return { e: e, score: score };
			})
			.filter(function (x) {
				return x.score > 0;
			})
			.sort(function (a, b) {
				return b.score - a.score;
			})
			.slice(0, 12);
		if (!scored.length) {
			results.innerHTML = '<div class="r-empty">No matches.</div>';
			return;
		}
		results.innerHTML = scored
			.map(function (x) {
				return (
					'<a href="' +
					asset(x.e.slug + ".html") +
					'"><div class="r-title">' +
					x.e.title +
					'</div><div class="r-snippet">' +
					snippet(x.e.text, qi).replace(/</g, "&lt;") +
					"</div></a>"
				);
			})
			.join("");
	}
	input.addEventListener("input", function () {
		render(input.value);
	});
})();
