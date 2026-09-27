---
title: Mirror Lab
nav: Mirror Lab
order: 14
group: Build
description: Three no-camera interactions explain mirror light, placement, and the visitor journey.
---

# Mirror Lab

Explore interactive mirrors through three small experiments. Do one thing, then watch how the mirror changes.

<span id="demo-light"></span>

## Demo 1 — why does a bright background hide text?

Choose “Bright window,” lower screen brightness, then raise it again. Watch when the time on the right gets lost in the reflection.

<div class="demo wide mirror-lab" id="lab1" data-lang="en">
<div class="lab-task"><span class="lab-kicker">Your task</span><strong>Keep the time on the right easy to read.</strong></div>
<div class="lab-control-group" role="group" aria-label="Choose room brightness">
<button type="button" data-light="bright" aria-pressed="true">Bright window</button>
<button type="button" data-light="dim" aria-pressed="false">Dim room</button>
</div>
<canvas id="lab1-canvas" width="640" height="220" role="img" aria-label="Left shows reflection only; right adds screen text. The result is described below.">Left shows reflection only; right adds screen text.</canvas>
<label class="lab-slider">Adjust screen brightness <input id="lab1-screen" type="range" min="0" max="100" value="65" /> <output id="lab1-screen-value">65%</output></label>
<p id="lab1-result" class="lab-result" aria-live="polite">The letters compete with the bright reflection. Try lowering screen brightness.</p>
<details class="lab-more"><summary>Why does this happen? Adjust reflectance</summary>
<p>The mirror reflects room light and transmits screen light. Black pixels cannot cover the reflection.</p>
<label class="lab-slider">Mirror reflectance <input id="lab1-reflectance" type="range" min="10" max="90" value="50" /> <output id="lab1-reflectance-value">50%</output></label>
</details>
</div>

Check text placement against the brightest expected background. The sliders show how light combines; measure real brightness on the mirror (OPT-01, OPT-02).

<span id="demo-depth"></span>

## Demo 2 — does the mark follow when you move?

Choose “Fixed on screen,” then press “Step right.” Watch whether the reflection and star stay together.

<div class="demo wide mirror-lab" id="lab2" data-lang="en">
<div class="lab-task"><span class="lab-kicker">Your task</span><strong>Find which mark follows the reflection.</strong></div>
<div class="lab-control-group" role="group" aria-label="Your position">
<button type="button" data-position="left" aria-pressed="false">Step left</button>
<button type="button" data-position="center" aria-pressed="true">Stand center</button>
<button type="button" data-position="right" aria-pressed="false">Step right</button>
</div>
<svg id="lab2-svg" viewBox="0 0 640 300" role="img" aria-label="Comparison of reflection and screen star positions"></svg>
<p class="lab-key">The round face is the reflection. The star is drawn by the screen.</p>
<div class="lab-control-group" role="group" aria-label="How the mark is placed">
<button type="button" data-mode="fixed" aria-pressed="true">Fixed on screen</button>
<button type="button" data-mode="body" aria-pressed="false">Follow body</button>
<button type="button" data-mode="space" aria-pressed="false">In mirror space</button>
</div>
<p id="lab2-result" class="lab-result" aria-live="polite">At the center they happen to overlap. Press “Step right” to see what changes.</p>
<button type="button" id="lab2-power" class="lab-secondary" aria-pressed="false">Turn the screen off: what remains?</button>
</div>

This illustrates spatial relationships, not registration accuracy. Measure alignment at different viewpoints on the real unit before making a precision claim (POS-01).

<span id="demo-states"></span>

## Demo 3 — how does the mirror help Mei try on a jacket?

You make the mirror’s decisions. The storyboard marks the current scene: follow the top row first, then try the changes in the lower row.

<div class="demo wide mirror-lab" id="lab3" data-lang="en">
<div class="lab-task"><span class="lab-kicker">Your task</span><strong id="lab3-prompt">Help Mei notice the mirror first.</strong></div>
<div class="lab-journey">
<div class="lab-board" id="lab3-board" role="group" aria-label="Eight scenes from Mei's fitting">
<img class="lab-board-fallback" src="/MIG/assets/mirror-journey.jpg" alt="Eight scenes: Mei approaches, tries on a jacket, loses tracking, meets a friend, leaves, and the mirror clears" />
</div>
<div class="lab-story">
<p class="lab-step" id="lab3-step">Step 1 of 3</p>
<h3 id="lab3-state" aria-live="polite">Plain mirror</h3>
<p class="lab-caption" id="lab3-caption">Mei walks past an ordinary mirror.</p>
<p class="lab-screen"><span>Mirror shows</span><output id="lab3-screen">Reflection only</output></p>
<p id="lab3-lesson" class="lab-result">No one has started yet, so the mirror stays quiet.</p>
<div class="lab-actions" id="lab3-actions"><button type="button">Let Mei approach</button></div>
<button type="button" id="lab3-back" class="lab-secondary" hidden>Previous scene</button>
</div>
</div>
</div>

At each step, watch “what the person did → how the mirror responds.” Every branch needs a way to resume or clear, so the next visitor never inherits Mei’s fitting (FLOW-01, PPL-01, PRIV-01).

<script src="/MIG/assets/lab.js"></script>
