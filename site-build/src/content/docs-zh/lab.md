---
title: Mirror Lab
nav: Mirror Lab
order: 14
group: 實作
description: 三個免攝影機示範：光線疊加、位置與深度、互動狀態。
---

# Mirror Lab

小型示範，服務理解與驗證。不用攝影機也能學完：滑桿加按鈕就夠。

<p class="disclaimer">瀏覽器示範用來說明原理，不能重現鏡面亮度、光學深度或感測品質，也不能替代現場驗收。</p>

<span id="demo-light"></span>

## ## 示範一：光線疊加

改變倒影背景、反射／透射比例與顯示內容。看懂為什麼黑底不是遮罩、背景如何決定辨讀（OPT-01、OPT-02）。

<div class="demo wide">
<div class="row">
<label>背景亮度 <input id="lab1-bg" type="range" min="0" max="100" value="25" /> <output id="lab1-bg-v">25%</output></label>
<label>反射率 <input id="lab1-r" type="range" min="10" max="90" value="50" /> <output id="lab1-r-v">50%</output></label>
<label>螢幕亮度 <input id="lab1-s" type="range" min="0" max="100" value="80" /> <output id="lab1-s-v">80%</output></label>
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
		const ok = seen < 0.35 || seen > 0.75;
		$("lab1-verdict").textContent = ok
			? "此處判讀：這個背景下文字大概可讀——接著去換背景，不要只換字色。"
			: "此處判讀：文字正在跟倒影打架——移動或減少內容（OPT-01），不只換顏色。";
	}
	for (const id of ["lab1-bg", "lab1-r", "lab1-s"]) $(id).addEventListener("input", draw);
	draw();
})();
</script>

<span id="demo-depth"></span>

## ## 示範二：位置與深度

切換定位模式，拖動觀看位置。看懂為什麼平面對齊不等於鏡中對齊（POS-01）。

<div class="demo wide">
<div class="row">
<label><input type="radio" name="lab2-mode" value="fixed" checked /> 固定畫面</label>
<label><input type="radio" name="lab2-mode" value="body" /> 跟隨身體</label>
<label><input type="radio" name="lab2-mode" value="space" /> 鏡中空間</label>
<label>觀看位置 <input id="lab2-view" type="range" min="-40" max="40" value="0" /> <output id="lab2-view-v">0 公分</output></label>
</div>
<svg id="lab2-svg" viewBox="0 0 640 240" role="img" aria-label="螢幕平面、鏡面深度與標記偏移側視圖"></svg>
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
		document.getElementById("lab2-view-v").textContent = `${v} 公分`;
		const m = mode();
		const off = m === "fixed" ? 0 : m === "body" ? v * 0.6 : v * 1.8;
		const ox = 320 + v * 2;
		const mx = 320 + v * 2 + off;
		svg.innerHTML =
			`<line x1="60" y1="200" x2="580" y2="200" stroke="#45504e" stroke-width="2"/>` +
			`<rect x="120" y="60" width="400" height="10" fill="#00544c" opacity="0.85"/>` +
			`<text x="120" y="50" font-size="13" fill="#45504e">screen plane 螢幕平面</text>` +
			`<rect x="120" y="150" width="400" height="10" fill="#45504e" opacity="0.4"/>` +
			`<text x="120" y="175" font-size="13" fill="#45504e">reflection depth 倒影深度</text>` +
			`<circle cx="${ox}" cy="100" r="10" fill="none" stroke="#1a1d1c" stroke-width="3"/>` +
			`<circle cx="${mx}" cy="100" r="10" fill="none" stroke="#b3261e" stroke-width="3" stroke-dasharray="5 4"/>` +
			`<text x="60" y="30" font-size="13" fill="#1a1d1c">黑圈＝身體被看到的位置 · 紅虛線＝標記實際落點</text>`;
		document.getElementById("lab2-verdict").textContent =
			m === "fixed"
				? "固定：與視點無關，但永遠貼不到身體上——只給時間與狀態用。"
				: m === "body"
					? "跟隨身體：視點移動帶來小漂移——需要校準與回饋。"
					: "鏡中空間：誤差隨視點快速放大——沒有逐視點校準，不得宣稱精準貼合。";
	}
	view.addEventListener("input", draw);
	for (const r of document.querySelectorAll('input[name="lab2-mode"]')) r.addEventListener("change", draw);
	draw();
})();
</script>

<span id="demo-states"></span>

## ## 示範三：互動狀態

點完包含分支的歷程：追蹤掉了、第二人加入、離開（FLOW-01、PPL-01、結束模式）。

<div class="demo wide">
<p>目前狀態：<output id="lab3-state">idle-mirror</output></p>
<div class="row" id="lab3-btns"></div>
<ol id="lab3-log"></ol>
</div>

<script>
(() => {
	const box = document.getElementById("lab3-btns");
	if (!box) return;
	const EDGES = {
		"idle-mirror": [["有人靠近", "noticing"]],
		noticing: [["給出因果提示", "guidance"], ["無視／路過", "idle-mirror"]],
		guidance: [["到達站位、教會一個動作", "engaged"], ["走開", "idle-mirror"]],
		engaged: [["追蹤掉了", "paused"], ["第二人加入", "queue"], ["離開", "countdown"]],
		paused: [["原操作的手回來", "engaged"], ["逾時", "idle-mirror"]],
		queue: [["雙方確認接管", "engaged"], ["重開新工作階段", "guidance"]],
		countdown: [["確認保留", "engaged"], ["逾時：已清除", "reset"]],
		reset: [["下一位靠近", "noticing"]],
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
				li.textContent = `${state.textContent} → ${to}（${label}）`;
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
