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

**See it first.** The mirror carries two kinds of light at once: the reflection of the room and letters lit by the screen. Move the three sliders to see when the reflection overwhelms the letters (OPT-01, OPT-02).

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
<p class="lab-hint">Left: reflection only. Right: screen text added to the same reflection. A black screen cannot erase it.</p>
<canvas id="lab1-canvas" width="640" height="220" role="img" aria-label="Left shows reflection only; right adds glowing screen text. The result is described below."></canvas>
<p id="lab1-verdict" class="lab-verdict" aria-live="polite"></p>
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
		const reflection = bg * r;
		const screenLight = s * t;
		$("lab1-bg-v").textContent = `${$("lab1-bg").value}%`;
		$("lab1-r-v").textContent = `${$("lab1-r").value}%`;
		$("lab1-s-v").textContent = `${$("lab1-s").value}%`;
		ctx.clearRect(0, 0, 640, 220);
		function panel(x, lit) {
			const shade = Math.round(23 + reflection * 160);
			ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
			ctx.fillRect(x, 0, 312, 220);
			ctx.fillStyle = `rgb(${Math.min(255, shade + 38)},${Math.min(255, shade + 38)},${Math.min(255, shade + 38)})`;
			ctx.beginPath();
			ctx.arc(x + 156, 96, 30, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillRect(x + 106, 130, 100, 90);
			ctx.fillStyle = "#211a13";
			ctx.fillRect(x, 0, 312, 34);
			ctx.fillStyle = "#ffffff";
			ctx.font = "600 15px system-ui, sans-serif";
			ctx.fillText(lit ? "Screen text added" : "Reflection only", x + 16, 25);
			if (lit) {
				ctx.globalAlpha = Math.max(0.02, screenLight);
				ctx.font = "700 38px system-ui, sans-serif";
				ctx.fillText("20:47", x + 92, 116);
				ctx.globalAlpha = 1;
			}
		}
		panel(0, false);
		panel(328, true);
		$("lab1-verdict").textContent = screenLight < reflection * 0.7 + 0.12
			? "The letters are faint beside the reflection. Increase screen light or move the text to a darker area."
			: "The letters stand out here. Now try a brighter background.";
	}
	for (const id of ["lab1-bg", "lab1-r", "lab1-s"]) $(id).addEventListener("input", draw);
	draw();
})();
</script>

<span id="demo-depth"></span>

## Demo 2 — position and depth

**See it first.** Move left and right: your reflection follows. Whether the bright mark drawn by the screen follows depends on where it is anchored (POS-01). Turn off the screen: the mark disappears, but the reflection stays.



**Use when.** Deciding between fixed, body-following, and mirror-space positioning — or reviewing a design that claims "precise face registration".

**Cases needing caution.** The offset shown below is illustrative. Measure alignment at each viewpoint on the actual unit.

**Steps.**

1. Switch the screen off first: is your face still there? (Yes — that is the half-mirror.)
2. Switch it on, pretend you are Mei, and drag to walk left and right.
3. Watch whether the light follows the nose; switch the three ways to play.

<div class="demo wide">
<div class="row">
<label><input type="radio" name="lab2-mode" value="fixed" checked /> Fixed on screen</label>
<label><input type="radio" name="lab2-mode" value="body" /> Follows body</label>
<label><input type="radio" name="lab2-mode" value="space" /> In mirror space</label>
<label>Viewpoint <input id="lab2-view" type="range" min="-40" max="40" value="0" /> <output id="lab2-view-v">0 cm</output></label>
<label><input type="radio" name="lab2-power" value="on" checked /> Screen on</label>
<label><input type="radio" name="lab2-power" value="off" /> Screen off</label>
</div>
<p class="lab-hint">Round face = your reflection; star = a mark drawn by the screen. Move the viewpoint, then switch among three placements to compare where the star goes.</p>
<svg id="lab2-svg" viewBox="0 0 640 300" role="img" aria-label="Dark-glass magic mirror: face stays with the screen off; drag to walk left and right, watch whether the light follows the nose"></svg>
<p id="lab2-verdict" class="lab-verdict" aria-live="polite"></p>
</div>

<script>
(() => {
	const svg = document.getElementById("lab2-svg");
	if (!svg) return;
	const view = document.getElementById("lab2-view");
	function mode() {
		return document.querySelector('input[name="lab2-mode"]:checked').value;
	}

	const STAR = "0,-15 3.5,-4.9 14.3,-4.6 5.8,2.8 8.8,13.1 0,7 -8.8,13.1 -5.8,2.8 -14.3,-4.6 -3.5,-4.9";
	function draw() {
		const v = +view.value;
		document.getElementById("lab2-view-v").textContent = `${v} cm`;
		const m = mode();
		const power = document.querySelector('input[name="lab2-power"]:checked').value;
		const H = v * 3;
		const nx = 320 + H;
		const ny = 162;
		let sx;
		if (m === "fixed") sx = 320;
		else if (m === "body") sx = nx - Math.max(-10, Math.min(10, H * 0.15));
		else sx = 320 + H * 0.5;
		const miss = Math.abs(sx - nx);
		const missCm = m === "fixed" ? Math.abs(v) : m === "body" ? Math.round(Math.abs(v) * 0.15) : Math.round(Math.abs(v) * 0.5);
		let parts =
			`<rect x="90" y="20" width="460" height="260" rx="18" fill="#141817"/>` +
			`<polygon points="90,20 250,20 150,280 90,280" fill="#ffffff" opacity="0.05"/>` +
			`<circle cx="${nx}" cy="150" r="45" fill="#2e3532" stroke="#e8e0cf" stroke-width="2"/>` +
			`<circle cx="${nx - 16}" cy="140" r="5" fill="#e8e0cf"/>` +
			`<circle cx="${nx + 16}" cy="140" r="5" fill="#e8e0cf"/>` +
			`<path d="M${nx - 18} 165 Q${nx} 180 ${nx + 18} 165" fill="none" stroke="#e8e0cf" stroke-width="3" stroke-linecap="round"/>` +
			`<text x="${nx}" y="235" font-size="16" fill="#e8e0cf" text-anchor="middle">reflection</text>`;
		if (power === "on") {
			parts += `<circle cx="${sx}" cy="${ny}" r="17" fill="#ffcf7d" opacity="0.25"/>` +
				`<polygon points="${STAR}" transform="translate(${sx},${ny})" fill="#ffcf7d"/>` +
				`<text x="${sx}" y="72" font-size="16" fill="#ffcf7d" text-anchor="middle">screen mark</text>`;
			if (miss > 8) {
				parts += `<line x1="${sx}" y1="${ny + 38}" x2="${nx}" y2="${ny + 38}" stroke="#ffcf7d" stroke-width="2" stroke-dasharray="6 4"/>`;
				parts += `<text x="${(sx + nx) / 2}" y="${ny + 58}" font-size="15" fill="#ffcf7d" text-anchor="middle">off by ${missCm} cm</text>`;
			}
		}
		svg.innerHTML = parts;
		let verdict;
		if (power === "off") {
			verdict = "Screen off, the light dot is gone — but your face stays. That is the interrogation-room mirror: the glass is always there, the screen only adds light. Black hides nothing (OPT-01).";
		} else if (missCm < 5) {
			verdict = m === "fixed" && v === 0 ? "At the center, the fixed mark happens to meet the nose. Move sideways to see what changes." : "It looks aligned here. Move again to see whether it keeps following the nose.";
		} else if (missCm < 20) {
			verdict = `Close — off by ${missCm} cm.`;
		} else if (m === "body") {
			verdict = `Off by ${missCm} cm — the light chases the nose, just a little slow.`;
		} else if (m === "space") {
			verdict = `Off by ${missCm} cm — it lives inside the mirror; nearer or farther gives different answers. Never claim precision without calibration.`;
		} else {
			verdict = `Way off — ${missCm} cm! The light is glued to the screen; you walk away, it stays.`;
		}
		document.getElementById("lab2-verdict").textContent = verdict;
	}
	view.addEventListener("input", draw);
	for (const r of document.querySelectorAll('input[name="lab2-mode"]')) r.addEventListener("change", draw);
	for (const r of document.querySelectorAll('input[name="lab2-power"]')) r.addEventListener("change", draw);
	draw();
})();
</script>

<span id="demo-states"></span>

## Demo 3 — interaction states

**What it is.** A clickable journey through the baseline flow including every branch: tracking loss, second person, leaving (FLOW-01, PPL-01, exit pattern).

Starring: Mei, Saturday afternoon at the department store, trying on a jacket. You play the mirror — only press the buttons offered.

**Use when.** Checking whether a flow design names every state and its exit — any transition you cannot click through here is missing design.

**Cases needing caution.** Timing values (grace periods, countdowns) are placeholders. Set them per deployment and record them; do not ship these defaults.

**Steps.**

1. Click from idle-mirror to engaged using only the offered buttons.
2. Force each branch: tracking lost, second person joins, leave.
3. Confirm every path ends in reset or a named recovery — never a dead end.

<div class="demo wide" id="lab3" data-lang="en">
<div class="lab-graph" aria-label="Interaction state graph"></div>
<div class="lab-journey">
<figure>
<div class="lab-scene" data-scene="idle-mirror" role="img" aria-label="Mei walks past an ordinary mirror"></div>
<figcaption>Eight moments at the same mirror. Choose an event to see the scene and mirror response change together.</figcaption>
</figure>
<div>
<h3 id="lab3-state" aria-live="polite">Plain mirror</h3>
<p><strong>What happens: </strong><output id="lab3-story">Mei walks past an ordinary mirror.</output></p>
<p class="lab-screen"><strong>Mirror shows: </strong><output id="lab3-screen">Reflection only</output></p>
<p><strong>Why this response: </strong><output id="lab3-lesson">Before anyone begins, it is an ordinary mirror.</output></p>
<h4>What happens next?</h4>
<div class="lab-actions"></div>
</div>
</div>
<p class="lab-hint"><strong>States visited: </strong><output id="lab3-trail">Plain mirror</output></p>
</div>
<script src="/MIG/assets/lab-journey.js"></script>
