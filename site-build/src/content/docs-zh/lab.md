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
<svg id="lab3-scene" viewBox="0 0 560 200" role="img" aria-label="小劇場：小美與鏡面的位置關係"></svg>
<p>發生什麼事：<output id="lab3-story"></output></p>
<p><output id="lab3-lesson"></output></p>
<p>鏡子顯示：<output id="lab3-screen"></output></p>
<p>目前狀態：<output id="lab3-state"></output></p>
<div class="row" id="lab3-btns"></div>
<p>走過：<output id="lab3-trail"></output></p>
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
	const STORY = {
		"idle-mirror": "星期六下午，小美走進百貨公司，經過一面看起來很普通的鏡子。",
		noticing: "鏡面角落亮起小光點，小美餘光掃到，停了下來。",
		guidance: "地板上出現一對腳印，鏡子說：站上來。",
		engaged: "外套穿到鏡子裡的小美身上了，她轉了一圈。",
		paused: "小美的手伸出畫面，鏡子跟丟了，提交先暫停。",
		queue: "朋友阿哲也想玩，站在小美旁邊揮手。",
		countdown: "小美轉身走了，鏡子開始倒數清除。",
		reset: "鏡面乾乾淨淨，下一位請。",
	};
	const LESSON = {
		"idle-mirror": "鏡面考點：什麼都不顯示時，它就是一面鏡子——這是及格線（Scope）。",
		noticing: "鏡面考點：倒影會跟著動，不代表可以互動；要一個認得出的數位回應（Start pattern）。",
		guidance: "鏡面考點：站位同時解決三件事——鏡頭看得到、字不擋臉、手搆得到（ZONE-01）。",
		engaged: "鏡面考點：資訊躲開衣服保留區，價錢牌不准遮住外套（ZONE-01）。",
		paused: "鏡面考點：鏡子看得到你，但鏡頭看不到手——看得到、感測得到、操作得到是三件事（FLOW-01）。",
		queue: "鏡面考點：鏡子裡兩張臉，它分不出誰是主控者——主控權要顯示出來（PPL-01）。",
		countdown: "鏡面考點：你走了，照片還在——下一位是陌生人（PRIV-01）。",
		reset: "鏡面考點：重設畫面是設計出來的，不是沒清乾淨（Exit pattern）。",
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
			g += `<ellipse cx="352" cy="178" rx="11" ry="5" fill="#9a3412" opacity="0.3"/>` +
				`<ellipse cx="382" cy="178" rx="11" ry="5" fill="#9a3412" opacity="0.3"/>`;
		}
		if (q.other) g += person(q.other, "#6b5f52", 0.15);
		if (q.mei !== null && q.mei !== undefined) {
			if (q.half) {
				g += person(55, "#9a3412", 0.19) +
					`<text x="112" y="108" font-size="22" fill="#9a3412">?</text>`;
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
	const lesson = document.getElementById("lab3-lesson");
	const trail = document.getElementById("lab3-trail");
	let cur = "idle-mirror";
	const walked = ["純鏡面"];
	function render() {
		state.textContent = `${NAME[cur]} (${cur})`;
		screen.textContent = SCREEN[cur];
		story.textContent = STORY[cur];
		lesson.textContent = LESSON[cur];
		scene.innerHTML = drawScene(cur);
		trail.textContent = walked.join(" → ");
		box.innerHTML = "";
		for (const [label, to] of EDGES[cur] || []) {
			const b = document.createElement("button");
			b.innerHTML = "";
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

<p><small>人物圖示來源：Font Awesome Free（CC BY 4.0，Fonticons, Inc.）。</small></p>
