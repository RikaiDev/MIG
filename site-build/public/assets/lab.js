(() => {
	const zh = document.getElementById("lab1")?.dataset.lang === "zh";
	const words = zh
		? {
				lightLeft: "只有倒影",
				lightRight: "加上螢幕文字",
				lightDimClear: "室內變暗，倒影變弱，時間更容易看清。切回明亮窗邊比較。",
				lightDimFaint: "室內雖然暗，螢幕太暗仍看不清時間。把螢幕調亮。",
				lightFaint: "文字被亮倒影淹沒了。把螢幕調亮，或把文字移到較暗的位置。",
				lightClear: "現在時間比較清楚。把螢幕調低，看看何時開始難讀。",
				scenePosition: {
					left: "小美站在鏡子左側",
					center: "小美站在鏡子中央",
					right: "小美站在鏡子右側",
				},
				powerOff: "螢幕關了，星星消失；倒影還在。",
				powerOnButton: "重新打開螢幕",
				powerOffButton: "關掉螢幕，看看還剩什麼",
				statusMove: "先移動一步",
				statusAligned: "星星與倒影對齊",
				statusApart: "星星與倒影錯開",
				statusOff: "螢幕已關閉",
				center: "站在中間時，亮點剛好和倒影重疊。往左或往右走看看。",
				fixed: "倒影移動了，星星仍留在螢幕中央。試試「跟著身體走」。",
				body: "星星跟著倒影一起移動。再切回「固定在螢幕上」比較。",
				space: "星星只移動一部分。從不同位置看，兩者會錯開。",
				step: [
					"第 1 步／3 步",
					"第 2 步／3 步",
					"第 3 步／3 步",
					"試穿完成",
					"突發情況",
					"已清空",
				],
				explored: (count) => `選一種突發情況來試試（已看 ${count}／3 種）。`,
				done: "三種情況都看過了。你可以重看其中一種，或從頭再走一次。",
				boardMain: "先走主線",
				boardChanges: "再看變化與清空",
				states: {
					"idle-mirror": {
						name: "純鏡面",
						step: 0,
						prompt: "先讓小美發現這面鏡子。",
						caption: "小美走過一面普通鏡子。",
						screen: "只有倒影",
						lesson: "還沒有人開始操作，鏡面保持安靜。",
						actions: [["讓小美靠近", "noticing"]],
					},
					noticing: {
						name: "注意到",
						step: 1,
						prompt: "小美停下來了。鏡子要怎麼告訴她可以做什麼？",
						caption: "鏡面亮起小光點，小美停下來看。",
						screen: "可以試穿外套，請站到腳印上",
						lesson: "數位提示給出下一步；倒影跟著人動本身不算提示。",
						actions: [["顯示站位腳印", "guidance"]],
					},
					guidance: {
						name: "站位引導",
						step: 2,
						prompt: "小美站到腳印上了。接下來只教一個動作。",
						caption: "腳印讓小美知道要站在哪裡。",
						screen: "站好後，舉起一隻手",
						lesson: "先讓鏡頭看見人，再教一個可完成的動作。",
						actions: [["小美舉手試穿", "engaged"]],
					},
					engaged: {
						name: "試穿中",
						step: 3,
						prompt: "",
						caption: "藍色外套出現在小美的倒影上。",
						screen: "外套穿好了",
						lesson: "外套留在身體上，文字避開衣服。接著試試意外發生時怎麼辦。",
						actions: [
							["手離開畫面", "paused"],
							["朋友也靠近", "queue"],
							["小美離開", "countdown"],
						],
					},
					paused: {
						name: "追蹤中斷",
						step: 4,
						prompt: "鏡子看不到小美的手了，這次操作該怎麼辦？",
						caption: "小美的手離開感測範圍。",
						screen: "已暫停；請把手舉回畫面",
						lesson: "暫停這次操作，不能把控制權交給旁邊的人。",
						actions: [
							["手回來，繼續試穿", "engaged"],
							["等待逾時，清空", "reset"],
						],
					},
					queue: {
						name: "第二人加入",
						step: 4,
						prompt: "朋友也站過來了，現在誰能操作？",
						caption: "朋友站在小美旁邊。",
						screen: "小美正在操作；朋友請稍候",
						lesson: "鏡面要說清楚主控者，避免朋友接管小美的試穿。",
						actions: [
							["朋友等候，小美繼續", "engaged"],
							["小美結束，清空畫面", "reset"],
						],
					},
					countdown: {
						name: "離開倒數",
						step: 4,
						prompt: "小美走了，畫面上的外套該怎麼處理？",
						caption: "小美離開鏡子，外套畫面準備清除。",
						screen: "即將清空；要繼續嗎？",
						lesson: "人離開後要有結束流程，不能把內容留給下一位。",
						actions: [
							["小美回來，繼續試穿", "engaged"],
							["倒數結束，清空畫面", "reset"],
						],
					},
					reset: {
						name: "已清空",
						step: 5,
						prompt: "鏡面已準備好給下一位。",
						caption: "鏡面恢復成沒有試穿內容的樣子。",
						screen: "只有倒影",
						lesson: "上一位的內容消失，下一位從乾淨的起點開始。",
						actions: [["從頭再看", "idle-mirror"]],
					},
				},
			}
		: {
				lightLeft: "Reflection only",
				lightRight: "Screen text added",
				lightDimClear:
					"In the dim room the reflection fades, so the time is easier to read. Switch back to the bright window to compare.",
				lightDimFaint:
					"Even in a dim room, the screen is too faint to read. Raise its brightness.",
				lightFaint:
					"The bright reflection overwhelms the letters. Increase screen light or move the text to a darker area.",
				lightClear:
					"The time is clearer now. Lower screen brightness to find when it becomes hard to read.",
				scenePosition: {
					left: "Mei stands left of the mirror center",
					center: "Mei stands at the mirror center",
					right: "Mei stands right of the mirror center",
				},
				powerOff:
					"With the screen off, the star disappears. The reflection remains.",
				powerOnButton: "Turn the screen back on",
				powerOffButton: "Turn the screen off: what remains?",
				statusMove: "Move one step",
				statusAligned: "Star stays aligned",
				statusApart: "Star and reflection separate",
				statusOff: "Screen is off",
				center:
					"At the center, the mark happens to meet the reflection. Step left or right to compare.",
				fixed:
					"The reflection moved, but the star stayed at the screen center. Try “Follow body.”",
				body: "The star moves with the reflection. Switch back to “Fixed on screen” to compare.",
				space:
					"The star moves partway. From a different viewpoint, the two no longer line up.",
				step: [
					"Step 1 of 3",
					"Step 2 of 3",
					"Step 3 of 3",
					"Fitting complete",
					"Interruption",
					"Cleared",
				],
				explored: (count) => `Try an interruption (${count} of 3 explored).`,
				done: "You have seen all three interruptions. Revisit one or start the journey again.",
				boardMain: "Follow the main route",
				boardChanges: "Then explore changes and clearing",
				states: {
					"idle-mirror": {
						name: "Plain mirror",
						step: 0,
						prompt: "Help Mei notice the mirror first.",
						caption: "Mei walks past an ordinary mirror.",
						screen: "Reflection only",
						lesson: "No one has started yet, so the mirror stays quiet.",
						actions: [["Let Mei approach", "noticing"]],
					},
					noticing: {
						name: "Notice",
						step: 1,
						prompt: "Mei has stopped. How can the mirror show what she can do?",
						caption: "A small light appears. Mei stops to look.",
						screen: "Try on a jacket: stand on the footprints",
						lesson:
							"The digital cue gives a next step. A moving reflection alone is not a cue.",
						actions: [["Show where to stand", "guidance"]],
					},
					guidance: {
						name: "Standing guide",
						step: 2,
						prompt: "Mei is on the footprints. Teach just one action.",
						caption: "The footprints show Mei where to stand.",
						screen: "Once in place, raise one hand",
						lesson:
							"Put the person in camera view, then teach one action they can finish.",
						actions: [["Mei raises a hand", "engaged"]],
					},
					engaged: {
						name: "Trying on",
						step: 3,
						prompt: "",
						caption: "The blue jacket appears on Mei's reflection.",
						screen: "Jacket on",
						lesson:
							"Keep the jacket on the body and text off the garment. Now try an interruption.",
						actions: [
							["Hand leaves view", "paused"],
							["Friend approaches", "queue"],
							["Mei leaves", "countdown"],
						],
					},
					paused: {
						name: "Tracking paused",
						step: 4,
						prompt:
							"The mirror has lost Mei's hand. What happens to this action?",
						caption: "Mei's hand leaves sensor range.",
						screen: "Paused: bring your hand back into view",
						lesson:
							"Pause this action. Do not hand control to the person nearby.",
						actions: [
							["Hand returns: continue", "engaged"],
							["Wait expires: clear", "reset"],
						],
					},
					queue: {
						name: "Second person",
						step: 4,
						prompt: "A friend joins Mei. Who can control the mirror now?",
						caption: "A friend stands beside Mei.",
						screen: "Mei is in control; friend, please wait",
						lesson:
							"Show who is in control so the friend cannot inherit Mei's fitting.",
						actions: [
							["Friend waits; Mei continues", "engaged"],
							["Mei finishes; clear", "reset"],
						],
					},
					countdown: {
						name: "Leaving",
						step: 4,
						prompt: "Mei walks away. What happens to the jacket on screen?",
						caption: "Mei leaves and the jacket is about to clear.",
						screen: "Clearing soon. Continue?",
						lesson:
							"Leaving needs an ending. Do not leave the fitting for the next visitor.",
						actions: [
							["Mei returns: continue", "engaged"],
							["Countdown ends: clear", "reset"],
						],
					},
					reset: {
						name: "Cleared",
						step: 5,
						prompt: "The mirror is ready for the next visitor.",
						caption: "The mirror is empty of fitting content.",
						screen: "Reflection only",
						lesson:
							"The previous fitting is gone. The next visitor starts clean.",
						actions: [["Start again", "idle-mirror"]],
					},
				},
			};

	const light = document.getElementById("lab1");
	const canvas = light?.querySelector("canvas");
	if (canvas) {
		const ctx = canvas.getContext("2d");
		const screen = light.querySelector("#lab1-screen");
		const reflectance = light.querySelector("#lab1-reflectance");
		let room = "bright";
		function drawLight() {
			const reflection =
				((room === "bright" ? 0.82 : 0.16) * Number(reflectance.value)) / 100;
			const screenLight =
				(Number(screen.value) / 100) * (1 - Number(reflectance.value) / 100);
			const shade = Math.round(23 + reflection * 175);
			ctx.clearRect(0, 0, 640, 220);
			for (const [x, lit] of [
				[0, false],
				[328, true],
			]) {
				ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
				ctx.fillRect(x, 0, 312, 220);
				ctx.fillStyle = `rgb(${shade + 38},${shade + 38},${shade + 38})`;
				ctx.beginPath();
				ctx.arc(x + 156, 96, 30, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillRect(x + 106, 130, 100, 90);
				ctx.fillStyle = "#211a13";
				ctx.fillRect(x, 0, 312, 34);
				ctx.fillStyle = "#ffffff";
				ctx.font = "600 15px system-ui, sans-serif";
				ctx.fillText(lit ? words.lightRight : words.lightLeft, x + 16, 24);
				if (lit) {
					ctx.globalAlpha = Math.min(1, screenLight * 2);
					ctx.font = "700 38px system-ui, sans-serif";
					ctx.fillText("20:47", x + 92, 115);
					ctx.globalAlpha = 1;
				}
			}
			light.querySelector("#lab1-screen-value").textContent =
				`${screen.value}%`;
			light.querySelector("#lab1-reflectance-value").textContent =
				`${reflectance.value}%`;
			const faint = screenLight < reflection * 0.75 + 0.1;
			light.querySelector("#lab1-result").textContent =
				room === "dim"
					? faint
						? words.lightDimFaint
						: words.lightDimClear
					: faint
						? words.lightFaint
						: words.lightClear;
		}
		light.querySelectorAll("[data-light]").forEach((button) => {
			button.addEventListener("click", () => {
				room = button.dataset.light;
				light.querySelectorAll("[data-light]").forEach((choice) => {
					choice.setAttribute("aria-pressed", String(choice === button));
				});
				drawLight();
			});
		});
		screen.addEventListener("input", drawLight);
		reflectance.addEventListener("input", drawLight);
		drawLight();
	}

	const depth = document.getElementById("lab2");
	if (depth) {
		let position = "center";
		let mode = "fixed";
		let powered = true;
		const scene = depth.querySelector("#lab2-scene");
		const power = depth.querySelector("#lab2-power");
		function drawDepth() {
			const face = position === "left" ? 43 : position === "right" ? 69.2 : 58;
			const star =
				mode === "fixed" ? 58 : mode === "body" ? face : (58 + face) / 2;
			scene.dataset.position = position;
			scene.dataset.powered = String(powered);
			scene.style.setProperty("--mark-x", `${star}%`);
			depth.querySelector("#lab2-verdict").textContent = !powered
				? words.statusOff
				: position === "center"
					? words.statusMove
					: mode === "body"
						? words.statusAligned
						: words.statusApart;
			depth.querySelector("#lab2-result").textContent = !powered
				? words.powerOff
				: position === "center"
					? words.center
					: words[mode];
			scene.setAttribute(
				"aria-label",
				`${words.scenePosition[position]}. ${depth.querySelector("#lab2-result").textContent}`,
			);
			power.textContent = `3　${powered ? words.powerOffButton : words.powerOnButton}`;
			power.setAttribute("aria-pressed", String(!powered));
		}
		for (const attribute of ["position", "mode"]) {
			depth.querySelectorAll(`[data-${attribute}]`).forEach((button) => {
				button.addEventListener("click", () => {
					if (attribute === "position") position = button.dataset.position;
					else mode = button.dataset.mode;
					depth.querySelectorAll(`[data-${attribute}]`).forEach((choice) => {
						choice.setAttribute("aria-pressed", String(choice === button));
					});
					drawDepth();
				});
			});
		}
		power.addEventListener("click", () => {
			powered = !powered;
			drawDepth();
		});
		drawDepth();
	}

	const journey = document.getElementById("lab3");
	if (!journey) return;
	const board = journey.querySelector("#lab3-board");
	const actions = journey.querySelector("#lab3-actions");
	const back = journey.querySelector("#lab3-back");
	const history = [];
	const explored = new Set();
	let current = "idle-mirror";
	for (const [label, states] of [
		[words.boardMain, ["idle-mirror", "noticing", "guidance", "engaged"]],
		[words.boardChanges, ["paused", "queue", "countdown", "reset"]],
	]) {
		const group = document.createElement("div");
		group.className = "lab-board-group";
		const title = document.createElement("p");
		title.className = "lab-board-title";
		title.textContent = label;
		const row = document.createElement("div");
		row.className = "lab-board-grid";
		for (const key of states) {
			const figure = document.createElement("figure");
			figure.className = "lab-card";
			figure.dataset.state = key;
			const image = document.createElement("div");
			image.className = "lab-frame";
			image.dataset.scene = key;
			image.setAttribute("role", "img");
			image.setAttribute("aria-label", words.states[key].caption);
			const caption = document.createElement("figcaption");
			caption.textContent = words.states[key].name;
			figure.append(image, caption);
			row.appendChild(figure);
		}
		group.append(title, row);
		board.appendChild(group);
	}
	board.querySelector(".lab-board-fallback")?.remove();
	function navigate(target) {
		history.push(current);
		if (["paused", "queue", "countdown"].includes(target)) explored.add(target);
		current = target;
		renderJourney();
	}
	function renderJourney() {
		const item = words.states[current];
		board.querySelectorAll(".lab-card").forEach((card) => {
			if (card.dataset.state === current)
				card.setAttribute("aria-current", "step");
			else card.removeAttribute("aria-current");
		});
		journey.querySelector("#lab3-caption").textContent = item.caption;
		journey.querySelector("#lab3-state").textContent = item.name;
		journey.querySelector("#lab3-step").textContent = words.step[item.step];
		journey.querySelector("#lab3-screen").textContent = item.screen;
		journey.querySelector("#lab3-lesson").textContent = item.lesson;
		journey.querySelector("#lab3-prompt").textContent =
			current === "engaged"
				? explored.size === 3
					? words.done
					: words.explored(explored.size)
				: item.prompt;
		actions.replaceChildren(
			...item.actions.map(([label, target]) => {
				const button = document.createElement("button");
				button.type = "button";
				button.textContent = label;
				if (explored.has(target) && current === "engaged")
					button.dataset.visited = "true";
				button.addEventListener("click", () => navigate(target));
				return button;
			}),
		);
		back.hidden = history.length === 0;
	}
	back.addEventListener("click", () => {
		if (history.length) {
			current = history.pop();
			renderJourney();
		}
	});
	renderJourney();
})();
