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

**What it is.** An interrogation-room two-way mirror: lights off on your side, they still see you. A magic mirror is the same — screen off, your face stays; the screen only adds light. (POS-01)

In a dark observation room, the people behind the glass see you the whole time, lights on or off. The mirror screen is that lamp.



**Use when.** Deciding between fixed, body-following, and mirror-space positioning — or reviewing a design that claims "precise face registration".

**Cases needing caution.** The drift curves below are illustrative, not calibration data. Never ship a registration claim without per-viewpoint measurement on the unit.

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
<p>Round face = you in the mirror (there even with the screen off); bright dot = light from the screen (gone when off).</p>
<svg id="lab2-svg" viewBox="0 0 640 300" role="img" aria-label="Dark-glass magic mirror: face stays with the screen off; drag to walk left and right, watch whether the light follows the nose"></svg>
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
			`<path d="M${nx - 18} 165 Q${nx} 180 ${nx + 18} 165" fill="none" stroke="#e8e0cf" stroke-width="3" stroke-linecap="round"/>`;
		if (power === "on") {
			parts += `<circle cx="${sx}" cy="${ny}" r="17" fill="#ffcf7d" opacity="0.25"/>` +
				`<polygon points="${STAR}" transform="translate(${sx},${ny})" fill="#ffcf7d"/>`;
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
			verdict = v !== 0 ? "Aligned! But it breaks the moment you move." : "Aligned! The light sits on the nose.";
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

<div class="demo wide">
<svg id="lab3-scene" viewBox="0 0 560 200" role="img" aria-label="Comic panel: Mei and the mirror positions"></svg>
<p>What happens: <output id="lab3-story"></output></p>
<p>Mirror shows: <output id="lab3-screen"></output></p>
<p>State: <output id="lab3-state"></output></p>
<div class="row" id="lab3-btns"></div>
<p>Walked: <output id="lab3-trail"></output></p>
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
	const NAME = {"idle-mirror": "plain mirror", noticing: "noticing", guidance: "guidance", engaged: "trying on", paused: "tracking lost", queue: "someone joins", countdown: "clearing countdown", reset: "reset"};
	const SCREEN = {
		"idle-mirror": "(a plain mirror, only you)",
		noticing: '"Hi! Step onto the footprints to try on the jacket"',
		guidance: '"One step forward, onto the footprints →"',
		engaged: '"Jacket on! Like it?"',
		paused: '"Wait — your hand left the frame, raise it back"',
		queue: '"Someone wants a turn too: queue up? or restart?"',
		countdown: '"Clearing in 10 seconds — keep it?"',
		reset: "(a clean mirror, next please)",
	};
	const STORY = {
		"idle-mirror": "Saturday afternoon: Mei walks past a mirror that looks perfectly ordinary.",
		noticing: "A small light winks in the corner; Mei catches it and stops.",
		guidance: "Footprints appear on the floor. The mirror says: step on.",
		engaged: "The jacket is on mirror-Mei now. She gives it a twirl.",
		paused: "Mei's hand leaves the frame; the mirror loses it and pauses submission.",
		queue: "Her friend Zhe wants a turn too, waving beside her.",
		countdown: "Mei turns to leave; the mirror starts clearing.",
		reset: "A clean mirror. Next, please.",
	};
	const POS = {
		"idle-mirror": { mei: 500 },
		noticing: { mei: 400 },
		guidance: { mei: 300, marks: true },
		engaged: { mei: 300, glow: true },
		paused: { mei: 60, half: true },
		queue: { mei: 300, other: 180 },
		countdown: { mei: 500, away: true },
		reset: { mei: null },
	};
	function drawScene(key) {
		const q = POS[key];
		function person(x, color, s) {
			// Figure: Font Awesome Free person-walking (CC BY 4.0, Fonticons, Inc.), flipped to face the mirror.
			return `<g transform="translate(${x},${175 + 12 * s}) scale(${-s},${s}) translate(-160,-512)" fill="${color}"><path d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l-8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"/></g>`;
		}
		let g = `<line x1="20" y1="175" x2="540" y2="175" stroke="#6b5f52" stroke-width="2"/>` +
			`<rect x="370" y="20" width="160" height="150" rx="10" fill="#141817" stroke="${q.glow ? "#ffcf7d" : "#211a13"}" stroke-width="3"/>` +
			`<polygon points="370,20 430,20 390,170 370,170" fill="#ffffff" opacity="0.06"/>`;
		if (q.marks) {
			g += `<ellipse cx="310" cy="180" rx="10" ry="5" fill="none" stroke="#9a3412" stroke-width="2"/>` +
				`<ellipse cx="340" cy="180" rx="10" ry="5" fill="none" stroke="#9a3412" stroke-width="2"/>`;
		}
		if (q.other) g += person(q.other, "#6b5f52", 0.15);
		if (q.mei !== null && q.mei !== undefined) {
			if (q.half) {
				g += person(2, "#9a3412", 0.19) +
					`<text x="44" y="106" font-size="22" fill="#9a3412">?</text>`;
			} else {
				g += person(q.mei, "#9a3412", 0.19);
			}
			if (q.away) g += `<text x="${q.mei + 28}" y="150" font-size="16" fill="#6b5f52">→ 10…</text>`;
		}
		return g;
	}
	const state = document.getElementById("lab3-state");
	const screen = document.getElementById("lab3-screen");
	const scene = document.getElementById("lab3-scene");
	const story = document.getElementById("lab3-story");
	const trail = document.getElementById("lab3-trail");
	let cur = "idle-mirror";
	const walked = ["plain mirror"];
	function render() {
		state.textContent = `${NAME[cur]} (${cur})`;
		screen.textContent = SCREEN[cur];
		story.textContent = STORY[cur];
		scene.innerHTML = drawScene(cur);
		trail.textContent = walked.join(" → ");
		box.innerHTML = "";
		for (const [label, to] of EDGES[cur] || []) {
			const b = document.createElement("button");
			const t1 = document.createElement("span");
			t1.textContent = label;
			const t2 = document.createElement("small");
			t2.textContent = ` → ${NAME[to]}`;
			b.appendChild(t1);
			b.appendChild(document.createTextNode(" "));
			b.appendChild(t2);
			b.addEventListener("click", () => {
				walked.push(NAME[to]);
				cur = to;
				render();
			});
			box.appendChild(b);
		}
	}
	render();
})();
</script>

<p><small>Figure credit: person pictogram by Font Awesome Free (CC BY 4.0, Fonticons, Inc.).</small></p>
