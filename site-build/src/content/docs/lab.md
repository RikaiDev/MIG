---
title: Mirror Lab
nav: Mirror Lab
order: 14
group: Build
description: "Three no-camera demonstrations: additive light, position and depth, interaction states."
---

# Mirror Lab

Each demo answers one design question. Pattern per demo: what it is, an annotated figure, when to use it, cases needing caution — then the interactive controls. No camera needed.

<p class="disclaimer">Browser demos explain principles. They cannot reproduce mirror brightness, optical depth, or sensing quality, and never replace field acceptance.</p>

<span id="demo-light"></span>

## Demo 1 — additive light

**What it is.** A mockup-time simulator for the question "will this text survive the reflection behind it" (OPT-01, OPT-02).

<figure>
<svg viewBox="0 0 640 240" role="img" aria-label="Left: mockup assumes a black card hides the face. Right: on a real mirror the bright reflection still shows through.">
<rect x="8" y="8" width="300" height="224" fill="none" stroke="#6b5f52"/>
<rect x="60" y="40" width="196" height="120" rx="6" fill="#211a13"/>
<text x="158" y="105" font-size="16" fill="#faf7f1" text-anchor="middle">20:47</text>
<text x="158" y="30" font-size="13" fill="#6b5f52" text-anchor="middle">mockup assumes: black hides</text>
<rect x="332" y="8" width="300" height="224" fill="none" stroke="#6b5f52"/>
<circle cx="482" cy="100" r="46" fill="#e8e0cf"/>
<rect x="410" y="40" width="144" height="120" rx="6" fill="#211a13" opacity="0.55"/>
<text x="482" y="105" font-size="16" fill="#faf7f1" text-anchor="middle">20:47</text>
<text x="482" y="30" font-size="13" fill="#6b5f52" text-anchor="middle">mirror reality: bright shows through</text>
<text x="482" y="200" font-size="13" fill="#9a3412" text-anchor="middle">black is not a mask</text>
</svg>
<figcaption>Left: what the mockup promises. Right: what the mirror delivers. Same black card, different physics.</figcaption>
</figure>

**Use when.** Choosing text placement, or reviewing a mockup that relies on dark panels to "clear" an area.

**Cases needing caution.** Do not use slider positions as specifications — the numbers illustrate the additive relationship, not your glass. Always re-test on the unit (checklist O1–O2).

**Steps.**

1. Set the background to your brightest expected case (white shirt, window).
2. Lower the screen level until the text just survives.
3. Flip the background dark — if the design only works on one end, move or reduce content instead of recoloring.

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

## Demo 2 — position and depth

**What it is.** A side-view answer to "the camera sees the face, so will the user see the marker on the face" (POS-01). Two viewpoints, one fixed marker, one body in mirror depth.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="Side view: two viewpoints look through one fixed screen marker and see it land on two different points of the body behind the mirror.">
<line x1="298" y1="20" x2="298" y2="280" stroke="#211a13" stroke-width="3"/>
<line x1="306" y1="20" x2="306" y2="280" stroke="#6b5f52" stroke-width="2"/>
<text x="312" y="36" font-size="15" fill="#211a13">mirror glass + screen</text>
<circle cx="302" cy="150" r="9" fill="#9a3412"/>
<text x="312" y="208" font-size="15" fill="#9a3412">marker (on screen, fixed)</text>
<circle cx="110" cy="118" r="9" fill="none" stroke="#211a13" stroke-width="3"/>
<text x="60" y="100" font-size="15" fill="#211a13">viewpoint A</text>
<circle cx="110" cy="192" r="9" fill="none" stroke="#6b5f52" stroke-width="3" stroke-dasharray="4 3"/>
<text x="60" y="222" font-size="15" fill="#6b5f52">viewpoint B (moved)</text>
<line x1="110" y1="118" x2="470" y2="177" stroke="#211a13" stroke-width="2.5"/>
<line x1="110" y1="192" x2="470" y2="114" stroke="#6b5f52" stroke-width="2.5" stroke-dasharray="8 5"/>
<circle cx="470" cy="150" r="50" fill="none" stroke="#6b5f52" stroke-width="2" stroke-dasharray="4 3"/>
<text x="470" y="240" font-size="14" fill="#6b5f52" text-anchor="middle">body, in mirror depth (virtual)</text>
<path d="M462 169 l16 16 M478 169 l-16 16" stroke="#9a3412" stroke-width="3"/>
<text x="492" y="192" font-size="15" fill="#9a3412">lands here</text>
<path d="M462 106 l16 16 M478 106 l-16 16" stroke="#9a3412" stroke-width="3"/>
<text x="492" y="122" font-size="15" fill="#9a3412">lands here after moving</text>
</svg>
<figcaption>The marker never moves. The eyes move — and the registration breaks. Flat alignment is not mirror alignment.</figcaption>
</figure>

**Use when.** Deciding between fixed, body-following, and mirror-space positioning — or reviewing a design that claims "precise face registration".

**Cases needing caution.** The drift curves below are illustrative, not calibration data. Never ship a registration claim without per-viewpoint measurement on the unit.

**Steps.**

1. Pick a positioning mode.
2. Drag the viewpoint ±40 cm and watch the red marker separate from the body.
3. Read the verdict: which mode your element is allowed to use.

<div class="demo wide">
<div class="row">
<label><input type="radio" name="lab2-mode" value="fixed" checked /> Fixed on screen</label>
<label><input type="radio" name="lab2-mode" value="body" /> Follows body</label>
<label><input type="radio" name="lab2-mode" value="space" /> In mirror space</label>
<label>Viewpoint <input id="lab2-view" type="range" min="-40" max="40" value="0" /> <output id="lab2-view-v">0 cm</output></label>
</div>
<p>Black circle = eye (viewpoint); red X = where the marker appears to land.</p>
<svg id="lab2-svg" viewBox="0 0 640 285" role="img" aria-label="Top-down view: as the eye moves sideways, the fixed marker appears to land away from the body"></svg>
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
		const ex = 320 + v * 4;
		const mx = 320;
		const my = 60;
		const bx = 320;
		const by = 170;
		const hx = ex + (mx - ex) * (95 / 185);
		const hy = by;
		let parts =
			`<line x1="120" y1="60" x2="520" y2="60" stroke="#211a13" stroke-width="3"/>` +
			`<line x1="120" y1="66" x2="520" y2="66" stroke="#6b5f52" stroke-width="2"/>` +
			`<text x="120" y="40" font-size="15" fill="#211a13">mirror + screen (top view)</text>` +
			`<circle cx="${mx}" cy="${my}" r="9" fill="#9a3412"/>` +
			`<text x="336" y="48" font-size="15" fill="#9a3412">marker (fixed)</text>` +
			`<circle cx="${bx}" cy="${by}" r="30" fill="none" stroke="#6b5f52" stroke-width="2" stroke-dasharray="4 3"/>` +
			`<text x="${bx}" y="${by + 5}" font-size="15" fill="#6b5f52" text-anchor="middle">body</text>` +
			`<circle cx="${ex}" cy="242" r="9" fill="none" stroke="#211a13" stroke-width="3"/>` +
			`<text x="${ex + (ex >= 320 ? 16 : -16)}" y="264" font-size="15" fill="#211a13" text-anchor="${ex >= 320 ? "start" : "end"}">viewpoint</text>`;
		if (m === "fixed") {
			parts += `<line x1="${ex}" y1="242" x2="${hx}" y2="${hy}" stroke="#6b5f52" stroke-width="2.5"/>`;
		} else {
			const k = m === "body" ? 0.25 : 1;
			const xx = Math.min(600, Math.max(40, bx + (hx - bx) * k));
			const yy = Math.min(250, Math.max(40, by + (hy - by) * k));
			parts += `<line x1="${ex}" y1="242" x2="${xx}" y2="${yy}" stroke="#211a13" stroke-width="2.5"/>`;
			parts += `<path d="M${xx - 8} ${yy - 8} l16 16 M${xx + 8} ${yy - 8} l-16 16" stroke="#9a3412" stroke-width="3"/>`;
		}
		svg.innerHTML = parts;
		document.getElementById("lab2-verdict").textContent =
			m === "fixed"
				? "Fixed: viewpoint-independent, but never registers on a body — use for time and status only."
				: m === "body"
					? "Body-following: tracking compensates most of the error, leaving a small residual — calibration and feedback required."
					: "Mirror-space: the full error shows — never claim precise registration without per-viewpoint calibration.";
	}
	view.addEventListener("input", draw);
	for (const r of document.querySelectorAll('input[name="lab2-mode"]')) r.addEventListener("change", draw);
	draw();
})();
</script>

<span id="demo-states"></span>

## Demo 3 — interaction states

**What it is.** A clickable journey through the baseline flow including every branch: tracking loss, second person, leaving (FLOW-01, PPL-01, exit pattern).

**Use when.** Checking whether a flow design names every state and its exit — any transition you cannot click through here is missing design.

**Cases needing caution.** Timing values (grace periods, countdowns) are placeholders. Set them per deployment and record them; do not ship these defaults.

**Steps.**

1. Click from idle-mirror to engaged using only the offered buttons.
2. Force each branch: tracking lost, second person joins, leave.
3. Confirm every path ends in reset or a named recovery — never a dead end.

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
