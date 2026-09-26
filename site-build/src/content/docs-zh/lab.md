---
title: Mirror Lab
nav: Mirror Lab
order: 14
group: 實作
description: 三個免攝影機示範：光線疊加、位置與深度、互動狀態。
---

# Mirror Lab

每個示範回答一個設計問題。固定格式：它是什麼、標註圖、何時用、注意案例——最後才是互動操作。不用攝影機也能學完。

<p class="disclaimer">瀏覽器示範用來說明原理，不能重現鏡面亮度、光學深度或感測品質，也不能替代現場驗收。</p>

## 示範一：光線疊加

<span id="demo-light"></span>

**它是什麼。** 回答「這段文字在倒影後面活不活得下來」的打稿期模擬器（OPT-01、OPT-02）。

<figure>
<svg viewBox="0 0 640 240" role="img" aria-label="左：設計稿以為黑卡能蓋住臉。右：真實鏡面中明亮倒影依然穿透。">
<rect x="8" y="8" width="300" height="224" fill="none" stroke="#6b5f52"/>
<rect x="60" y="40" width="196" height="120" rx="6" fill="#211a13"/>
<text x="158" y="105" font-size="16" fill="#faf7f1" text-anchor="middle">20:47</text>
<text x="158" y="30" font-size="13" fill="#6b5f52" text-anchor="middle">設計稿以為：黑色能蓋</text>
<rect x="332" y="8" width="300" height="224" fill="none" stroke="#6b5f52"/>
<circle cx="482" cy="100" r="46" fill="#e8e0cf"/>
<rect x="410" y="40" width="144" height="120" rx="6" fill="#211a13" opacity="0.55"/>
<text x="482" y="105" font-size="16" fill="#faf7f1" text-anchor="middle">20:47</text>
<text x="482" y="30" font-size="13" fill="#6b5f52" text-anchor="middle">鏡面現實：亮的穿透出來</text>
<text x="482" y="200" font-size="13" fill="#9a3412" text-anchor="middle">黑底不是遮罩</text>
</svg>
<figcaption>左：設計稿的承諾。右：鏡面的交付。同一張黑卡，不同的物理。</figcaption>
</figure>

**何時用。** 決定文字位置，或審查一份靠深色面板「清版面」的設計稿。

**注意案例。** 滑桿數值不是規格——它說明相加關係，不代表你的玻璃。務必在機器上重測（檢查清單 O1–O2）。

**操作步驟。**

1. 背景先設最亮的預期情況（白衣、窗戶）。
2. 螢幕亮度往下調到文字剛好活著。
3. 切深色背景——如果設計只在一端成立，移動或減少內容，不要只換顏色。

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

## 示範二：位置與深度

<span id="demo-depth"></span>

**它是什麼。** 側視圖回答「攝影機抓到臉，使用者就會看到標記貼在臉上嗎」（POS-01）。兩個視點、一個固定標記、一個鏡中身體。

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="側視圖：兩個視點透過同一個固定螢幕標記，看到它落在鏡後身體的兩個不同位置。">
<line x1="298" y1="20" x2="298" y2="280" stroke="#211a13" stroke-width="3"/>
<line x1="306" y1="20" x2="306" y2="280" stroke="#6b5f52" stroke-width="2"/>
<text x="312" y="36" font-size="15" fill="#211a13">鏡面（玻璃＋螢幕）</text>
<circle cx="302" cy="150" r="9" fill="#9a3412"/>
<text x="312" y="208" font-size="15" fill="#9a3412">標記（在螢幕上，不動）</text>
<circle cx="110" cy="118" r="9" fill="none" stroke="#211a13" stroke-width="3"/>
<text x="52" y="100" font-size="15" fill="#211a13">視點 A</text>
<circle cx="110" cy="192" r="9" fill="none" stroke="#6b5f52" stroke-width="3" stroke-dasharray="4 3"/>
<text x="22" y="222" font-size="15" fill="#6b5f52">視點 B（移動後）</text>
<line x1="110" y1="118" x2="470" y2="177" stroke="#211a13" stroke-width="2.5"/>
<line x1="110" y1="192" x2="470" y2="114" stroke="#6b5f52" stroke-width="2.5" stroke-dasharray="8 5"/>
<circle cx="470" cy="150" r="50" fill="none" stroke="#6b5f52" stroke-width="2" stroke-dasharray="4 3"/>
<text x="470" y="240" font-size="14" fill="#6b5f52" text-anchor="middle">身體，在鏡面深度裡（虛擬）</text>
<path d="M462 169 l16 16 M478 169 l-16 16" stroke="#9a3412" stroke-width="3"/>
<text x="492" y="192" font-size="15" fill="#9a3412">貼在這裡</text>
<path d="M462 106 l16 16 M478 106 l-16 16" stroke="#9a3412" stroke-width="3"/>
<text x="492" y="122" font-size="15" fill="#9a3412">移動後貼在這裡</text>
</svg>
<figcaption>標記沒動，眼睛動了，貼合就破了。平面對齊不等於鏡中對齊。</figcaption>
</figure>

**何時用。** 在固定、跟隨身體、鏡中空間三種定位之間選，或審查一份宣稱「精準貼臉」的設計。

**注意案例。** 下面的漂移曲線是示意，不是校準數據。沒有逐視點實測，不得出貨任何貼合宣稱。

**操作步驟。**

1. 選一種定位模式。
2. 拖動視點 ±40 公分，看紅色標記如何離開身體。
3. 讀判讀：你的元素准用哪種模式。

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
			`<line x1="60" y1="200" x2="580" y2="200" stroke="#6b5f52" stroke-width="2"/>` +
			`<rect x="120" y="60" width="400" height="10" fill="#9a3412" opacity="0.85"/>` +
			`<text x="120" y="50" font-size="13" fill="#211a13">screen plane 螢幕平面</text>` +
			`<rect x="120" y="150" width="400" height="10" fill="#6b5f52" opacity="0.4"/>` +
			`<text x="120" y="175" font-size="13" fill="#211a13">reflection depth 倒影深度</text>` +
			`<circle cx="${ox}" cy="100" r="10" fill="none" stroke="#211a13" stroke-width="3"/>` +
			`<circle cx="${mx}" cy="100" r="10" fill="none" stroke="#9a3412" stroke-width="3" stroke-dasharray="5 4"/>` +
			`<text x="60" y="30" font-size="13" fill="#211a13">黑圈＝身體被看到的位置 · 紅虛線＝標記實際落點</text>`;
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

## 示範三：互動狀態

<span id="demo-states"></span>

**它是什麼。** 把基本流程含全部支線做成可點擊的：追蹤掉了、第二人加入、離開（FLOW-01、PPL-01、結束模式）。

**何時用。** 檢查流程設計是否叫得出每個狀態和出口——這裡點不過去的轉換，就是缺失的設計。

**注意案例。** 時間值（寬限期、倒數）是佔位符。各部署自行設定並記錄；不要拿預設值出貨。

**操作步驟。**

1. 只用給出的按鈕，從純鏡面點到已參與。
2. 逐一逼出分支：追蹤掉了、第二人加入、離開。
3. 確認每條路都結束在重設或具名恢復——沒有死路。

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
