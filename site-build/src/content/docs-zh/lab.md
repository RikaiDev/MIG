---
title: Mirror Lab
nav: Mirror Lab
order: 14
group: 實作
description: 用三個免攝影機互動，看懂鏡面上的光、位置與使用流程。
---

# Mirror Lab

用三個小實驗看懂互動鏡。每次先做一件事，再看鏡面如何改變。

## 示範一：為什麼亮背景會吃掉文字？

<span id="demo-light"></span>

先按「明亮窗邊」，把螢幕調暗，再調亮。觀察右邊的時間何時被倒影淹沒。

<div class="demo wide mirror-lab" id="lab1" data-lang="zh">
<div class="lab-task"><span class="lab-kicker">你的任務</span><strong>讓右邊的時間保持清楚可讀。</strong></div>
<div class="lab-control-group" role="group" aria-label="選擇環境亮度">
<button type="button" data-light="bright" aria-pressed="true">明亮窗邊</button>
<button type="button" data-light="dim" aria-pressed="false">較暗室內</button>
</div>
<canvas id="lab1-canvas" width="640" height="220" role="img" aria-label="左邊只有倒影，右邊加入螢幕文字；結果在下方說明">左邊只有倒影；右邊加入螢幕文字。</canvas>
<label class="lab-slider">調整螢幕亮度 <input id="lab1-screen" type="range" min="0" max="100" value="65" /> <output id="lab1-screen-value">65%</output></label>
<p id="lab1-result" class="lab-result" aria-live="polite">右邊的文字與亮倒影競爭。試著調低螢幕亮度。</p>
<details class="lab-more"><summary>想知道為什麼？調整鏡面反射率</summary>
<p>鏡面會反射環境光，也會透出螢幕光。黑色像素不會遮住倒影。</p>
<label class="lab-slider">鏡面反射率 <input id="lab1-reflectance" type="range" min="10" max="90" value="50" /> <output id="lab1-reflectance-value">50%</output></label>
</details>
</div>

設計時先用最亮的預期背景檢查文字位置。滑桿只用來看光相加的關係；真正亮度要在鏡面上量測（OPT-01、OPT-02）。

## 示範二：你移動時，亮點跟得上嗎？

<span id="demo-depth"></span>

先選「固定在螢幕上」，再按「往右一步」。看倒影和星星是否仍在一起。

<div class="demo wide mirror-lab" id="lab2" data-lang="zh">
<div class="lab-task"><span class="lab-kicker">你的任務</span><strong>找出哪一種亮點會跟著倒影走。</strong></div>
<div class="lab-control-group" role="group" aria-label="你的站位">
<button type="button" data-position="left" aria-pressed="false">往左一步</button>
<button type="button" data-position="center" aria-pressed="true">站在中間</button>
<button type="button" data-position="right" aria-pressed="false">往右一步</button>
</div>
<svg id="lab2-svg" viewBox="0 0 640 300" role="img" aria-label="倒影與螢幕星星的位置比較"></svg>
<p class="lab-key">圓臉是倒影；星星是螢幕畫出的記號。</p>
<div class="lab-control-group" role="group" aria-label="亮點如何定位">
<button type="button" data-mode="fixed" aria-pressed="true">固定在螢幕上</button>
<button type="button" data-mode="body" aria-pressed="false">跟著身體走</button>
<button type="button" data-mode="space" aria-pressed="false">放在鏡中空間</button>
</div>
<p id="lab2-result" class="lab-result" aria-live="polite">現在站在中間，兩者剛好重疊。按「往右一步」看看。</p>
<button type="button" id="lab2-power" class="lab-secondary" aria-pressed="false">關掉螢幕，看看還剩什麼</button>
</div>

這是位置關係示意，不是貼合精度測試。要宣稱貼合，須在實際設備與不同觀看位置量測（POS-01）。

## 示範三：鏡子怎麼帶小美完成試穿？

<span id="demo-states"></span>

你來替鏡子做決定。先帶小美完成第一次試穿，再試三種突發情況。

<div class="demo wide mirror-lab" id="lab3" data-lang="zh">
<div class="lab-task"><span class="lab-kicker">你的任務</span><strong id="lab3-prompt">先讓小美發現這面鏡子。</strong></div>
<div class="lab-journey">
<figure>
<div class="lab-scene" data-scene="idle-mirror" role="img" aria-label="小美走近一面普通鏡子"></div>
<figcaption id="lab3-caption">小美走過一面普通鏡子。</figcaption>
</figure>
<div class="lab-story">
<p class="lab-step" id="lab3-step">第 1 步／3 步</p>
<h3 id="lab3-state" aria-live="polite">純鏡面</h3>
<p class="lab-screen"><span>鏡面顯示</span><output id="lab3-screen">只有倒影</output></p>
<p id="lab3-lesson" class="lab-result">還沒有人開始操作，鏡面保持安靜。</p>
<div class="lab-actions" id="lab3-actions"><button type="button">讓小美靠近</button></div>
<button type="button" id="lab3-back" class="lab-secondary" hidden>回上一幕</button>
</div>
</div>
<details class="lab-more"><summary>查看完整狀態路線</summary><p id="lab3-map">純鏡面 → 注意到 → 站位引導 → 試穿中；試穿中可能暫停、遇到第二人，或因離開而清空。</p></details>
</div>

觀察每一次「人做了什麼 → 鏡面如何回應」。所有支線都要能恢復或清空，不能讓下一位接上小美的試穿（FLOW-01、PPL-01、PRIV-01）。

<script src="/MIG/assets/lab.js"></script>
