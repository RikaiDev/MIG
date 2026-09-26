---
title: Mirror Lab
nav: Mirror Lab
order: 14
group: Build
description: "Three no-camera demonstrations: additive light, position and depth, interaction states."
---

# Mirror Lab

Small demonstrations that serve understanding and verification. No camera needed — everything here runs on sliders and buttons.

<p class="disclaimer">Browser demos explain principles. They cannot reproduce mirror brightness, optical depth, or sensing quality, and never replace field acceptance.</p>

<span id="demo-light"></span>

## ## Demo 1 — additive light

Change the reflection background, the reflectance/transmittance split, and the screen content. Watch why black is not a mask, and how background decides legibility (OPT-01, OPT-02).

<div class="demo wide">
<div class="row">
<label>Background <input id="lab1-bg" type="range" min="0" max="100" value="25" /> <output id="lab1-bg-v">25%</output></label>
<label>Reflectance <input id="lab1-r" type="range" min="10" max="90" value="50" /> <output id="lab1-r-v">50%</output></label>
<label>Screen level <input id="lab1-s" type="range" min="0" max="100" value="80" /> <output id="lab1-s-v">80%</output></label>
</div>
<canvas id="lab1-canvas" width="640" height="220"></canvas>
<p id="lab1-verdict"></p>
</div>

<script>
(() => {
	const cv = document.getElementById("lab1-canvas");
	if (!cv) return;
	const ctx = cv.getContext("2d");
	const $ = (id) => document.getElementById(id);
	function draw() {
		const bg = +$("lab1-bg").value / 100;
		const r = +$("lab1-r").value / 100;
		const s = +$("lab1-s").value / 100;
		const t = 1 - r;
		const seen = Math.min(1, bg * r + s * t);
		$("lab1-bg-v").textContent = `${$("lab1-bg").value}%`;
		$("lab1-r-v").textContent = `${$("lab1-r").value}%`;
		$("lab1-s-v").textContent = `${$("lab1-s").value}%`;
		const g = Math.round(seen * 255);
		ctx.fillStyle = `rgb(${g},${g},${g})`;
		ctx.fillRect(0, 0, 640, 220);
		ctx.fillStyle = seen > 0.55 ? "#101413" : "#ffffff";
		ctx.font = "700 44px system-ui, sans-serif";
		ctx.fillText("20:47  72%", 60, 110);
		ctx.font = "400 22px system-ui, sans-serif";
		ctx.fillText("seen = bg × R + screen × T", 60, 160);
		const dark = seen < 0.35 || seen > 0.75;
		$("lab1-verdict").textContent = dark
			? "Verdict here: text likely legible on this background — now change the background, not the text."
			: "Verdict here: text competes with the reflection — move or reduce content (OPT-01), don't just recolor.";
	}
	for (const id of ["lab1-bg", "lab1-r", "lab1-s"]) $(id).addEventListener("input", draw);
	draw();
})();
</script>

<span id="demo-depth"></span>

## ## Demo 2 — position and depth

Switch positioning modes and drag the viewpoint. Watch why flat alignment is not mirror alignment (POS-01).

<div class="demo wide">
<div class="row">
<label><input type="radio" name="lab2-mode" value="fixed" checked /> Fixed on screen</label>
<label><input type="radio" name="lab2-mode" value="body" /> Follows body</label>
<label><input type="radio" name="lab2-mode" value="space" /> In mirror space</label>
<label>Viewpoint <input id="lab2-view" type="range" min="-40" max="40" value="0" /> <output id="lab2-view-v">0 cm</output></label>
</div>
<svg id="lab2-svg" viewBox="0 0 640 240" role="img" aria-label="Side view of screen plane, mirror plane, and marker offset"></svg>
<p id="lab2-verdict"></p>
</div>

<script>
(() => {
	const svg = document.getElementById("lab2-svg");
	if (!svg) return;
	const view = document.getElementById("lab2-view");
	function mode() {
		return document.querySelector('input[name="lab2-mode"]:checked').value;
	}
	function draw() {
		const v = +view.value;
		document.getElementById("lab2-view-v").textContent = `${v} cm`;
		const m = mode();
		const off = m === "fixed" ? 0 : m === "body" ? v * 0.6 : v * 1.8;
		const ox = 320 + v * 2;
		const mx = 320 + v * 2 + off;
		svg.innerHTML =
			`<line x1="60" y1="200" x2="580" y2="200" stroke="#45504e" stroke-width="2"/>` +
			`<rect x="120" y="60" width="400" height="10" fill="#00544c" opacity="0.85"/>` +
			`<text x="120" y="50" font-size="13" fill="#45504e">screen plane</text>` +
			`<rect x="120" y="150" width="400" height="10" fill="#45504e" opacity="0.4"/>` +
			`<text x="120" y="175" font-size="13" fill="#45504e">reflection depth</text>` +
			`<circle cx="${ox}" cy="100" r="10" fill="none" stroke="#1a1d1c" stroke-width="3"/>` +
			`<circle cx="${mx}" cy="100" r="10" fill="none" stroke="#b3261e" stroke-width="3" stroke-dasharray="5 4"/>` +
			`<text x="60" y="30" font-size="13" fill="#1a1d1c">black = where the body is seen · red dashed = where the marker lands</text>`;
		document.getElementById("lab2-verdict").textContent =
			m === "fixed"
				? "Fixed: viewpoint-independent, but never registers on a body — use for time and status only."
				: m === "body"
					? "Body-following: small drift as viewpoint moves — calibration and feedback required."
					: "Mirror-space: error grows fast with viewpoint — never claim precise registration without per-viewpoint calibration.";
	}
	view.addEventListener("input", draw);
	for (const r of document.querySelectorAll('input[name="lab2-mode"]')) r.addEventListener("change", draw);
	draw();
})();
</script>

<span id="demo-states"></span>

## ## Demo 3 — interaction states

Click through the journey including branches: tracking loss, second person, leaving (FLOW-01, PPL-01, exit pattern).

<div class="demo wide">
<p>State: <output id="lab3-state">idle-mirror</output></p>
<div class="row" id="lab3-btns"></div>
<ol id="lab3-log"></ol>
</div>

<script>
(() => {
	const box = document.getElementById("lab3-btns");
	if (!box) return;
	const EDGES = {
		"idle-mirror": [["approach", "noticing"]],
		noticing: [["show causal cue", "guidance"], ["ignore / pass by", "idle-mirror"]],
		guidance: [["reach zone, one action taught", "engaged"], ["walk away", "idle-mirror"]],
		engaged: [["tracking lost", "paused"], ["second person joins", "queue"], ["leave", "countdown"]],
		paused: [["original hand re-enters", "engaged"], ["timeout", "idle-mirror"]],
		queue: [["request confirmed", "engaged"], ["restart fresh", "guidance"]],
		countdown: [["confirm keep", "engaged"], ["timeout: cleared", "reset"]],
		reset: [["next user approaches", "noticing"]],
	};
	const state = document.getElementById("lab3-state");
	const log = document.getElementById("lab3-log");
	function render() {
		box.innerHTML = "";
		for (const [label, to] of EDGES[state.textContent] || []) {
			const b = document.createElement("button");
			b.textContent = label;
			b.addEventListener("click", () => {
				const li = document.createElement("li");
				li.textContent = `${state.textContent} → ${to} (${label})`;
				log.prepend(li);
				state.textContent = to;
				render();
			});
			box.appendChild(b);
		}
	}
	render();
})();
</script>
