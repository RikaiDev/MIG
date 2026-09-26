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

**它是什麼。** 偵防室的半面鏡：燈一關，鏡子那邊還是看得到人。魔鏡一樣——螢幕關了，你的臉還在；螢幕只是往上加光。(POS-01)

黑暗的偵訊室裡，單面鏡後面的人一直看得到你，不管這邊的燈開不開。魔鏡的螢幕就是那盞燈。



**何時用。** 在固定、跟隨身體、鏡中空間三種定位之間選，或審查一份宣稱「精準貼臉」的設計。

**注意案例。** 下面的漂移曲線是示意，不是校準數據。沒有逐視點實測，不得出貨任何貼合宣稱。

**操作步驟。**

1. 先把螢幕關掉：你的臉還在不在？（在——這就是半面鏡。）
2. 打開螢幕，假裝你是小美，拖滑桿左右走。
3. 看發光記號有沒有跟著鼻子走；切三種玩法，看誰跟得上。

<div class="demo wide">
<div class="row">
<label><input type="radio" name="lab2-mode" value="fixed" checked /> 固定畫面</label>
<label><input type="radio" name="lab2-mode" value="body" /> 跟隨身體</label>
<label><input type="radio" name="lab2-mode" value="space" /> 鏡中空間</label>
<label>觀看位置 <input id="lab2-view" type="range" min="-40" max="40" value="0" /> <output id="lab2-view-v">0 公分</output></label>
<label><input type="radio" name="lab2-power" value="on" checked /> 螢幕開</label>
<label><input type="radio" name="lab2-power" value="off" /> 螢幕關</label>
</div>
<p>圓臉＝鏡子裡的你（螢幕關了也在）；亮點＝螢幕發的光（關了就沒）。</p>
<svg id="lab2-svg" viewBox="0 0 640 300" role="img" aria-label="黑玻璃魔鏡：螢幕關了臉還在，拖動滑桿假裝左右走，看發光記號有沒有跟著鼻子"></svg>
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
		document.getElementById("lab2-view-v").textContent = `${v} 公分`;
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
				parts += `<text x="${(sx + nx) / 2}" y="${ny + 58}" font-size="15" fill="#ffcf7d" text-anchor="middle">差 ${missCm} 公分</text>`;
			}
		}
		svg.innerHTML = parts;
		let verdict;
		if (power === "off") {
			verdict = "螢幕關了，發光的記號沒了——但你的臉還在。這就是偵防室半面鏡：鏡子一直在，螢幕只是往上加光。黑底遮不住任何東西（OPT-01）。";
		} else if (missCm < 5) {
			verdict = v !== 0 ? "對準了！但你一動就破功。" : "對準了！亮點貼著鼻子。";
		} else if (missCm < 20) {
			verdict = `差一點點，差 ${missCm} 公分。`;
		} else if (m === "body") {
			verdict = `差 ${missCm} 公分——亮點追著鼻子跑，只慢一點點。`;
		} else if (m === "space") {
			verdict = `差 ${missCm} 公分——它住在鏡子裡面，你站遠站近答案不一樣，不校準不能說準。`;
		} else {
			verdict = `偏了！差 ${missCm} 公分——亮點黏在螢幕上，你走開它還在原地。`;
		}
		document.getElementById("lab2-verdict").textContent = verdict;
	}
	view.addEventListener("input", draw);
	for (const r of document.querySelectorAll('input[name="lab2-mode"]')) r.addEventListener("change", draw);
	for (const r of document.querySelectorAll('input[name="lab2-power"]')) r.addEventListener("change", draw);
	draw();
})();
</script>

## 示範三：互動狀態

<span id="demo-states"></span>

**它是什麼。** 把基本流程含全部支線做成可點擊的：追蹤掉了、第二人加入、離開（FLOW-01、PPL-01、結束模式）。

主角：小美，星期六下午的百貨公司，想試一件外套。你來當這面鏡子——每次只能按給出的按鈕。

**何時用。** 檢查流程設計是否叫得出每個狀態和出口——這裡點不過去的轉換，就是缺失的設計。

**注意案例。** 時間值（寬限期、倒數）是佔位符。各部署自行設定並記錄；不要拿預設值出貨。

**操作步驟。**

1. 只用給出的按鈕，從純鏡面點到已參與。
2. 逐一逼出分支：追蹤掉了、第二人加入、離開。
3. 確認每條路都結束在重設或具名恢復——沒有死路。

<div class="demo wide">
<p>目前狀態：<output id="lab3-state"></output></p>
<p>鏡子顯示：<output id="lab3-screen"></output></p>
<div class="row" id="lab3-btns"></div>
<p>故事回顧：</p>
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
	const NAME = {"idle-mirror": "純鏡面", noticing: "注意到", guidance: "站位引導", engaged: "試穿中", paused: "追蹤掉了", queue: "有人加入", countdown: "倒數清除", reset: "重設"};
	const SCREEN = {
		"idle-mirror": "（鏡面，只照出你）",
		noticing: "「嗨！站到腳印上，就可以試穿外套」",
		guidance: "「往前一步，踩住腳印 →」",
		engaged: "「外套穿好了，喜歡嗎？」",
		paused: "「等等，你的手跑出畫面了，舉回來」",
		queue: "「有人也想玩：排隊？還是重來？」",
		countdown: "「10 秒後清除，要留著嗎？」",
		reset: "（乾淨的鏡面，下一位）",
	};
	const state = document.getElementById("lab3-state");
	const screen = document.getElementById("lab3-screen");
	const log = document.getElementById("lab3-log");
	let cur = "idle-mirror";
	function render() {
		state.textContent = `${NAME[cur]} (${cur})`;
		screen.textContent = SCREEN[cur];
		box.innerHTML = "";
		for (const [label, to] of EDGES[cur] || []) {
			const b = document.createElement("button");
			b.textContent = label;
			b.addEventListener("click", () => {
				const li = document.createElement("li");
				li.textContent = `${NAME[cur]} → ${NAME[to]}（${label}）`;
				log.prepend(li);
				cur = to;
				render();
			});
			box.appendChild(b);
		}
	}
	render();
})();
</script>
