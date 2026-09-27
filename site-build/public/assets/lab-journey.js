(() => {
	const root = document.getElementById("lab3");
	if (!root) return;
	const zh = root.dataset.lang === "zh";
	const copy = zh ? {
		name: {"idle-mirror":"純鏡面",noticing:"注意到",guidance:"站位引導",engaged:"試穿中",paused:"追蹤中斷",queue:"第二人加入",countdown:"離開倒數",reset:"已清空"},
		story: {"idle-mirror":"小美路過一面普通鏡子。",noticing:"鏡面亮起小光點，小美停下來看。",guidance:"腳印亮起，小美站到指定位置。",engaged:"鏡中出現藍色外套，小美開始試穿。",paused:"小美的手離開感測範圍，試穿暫停。",queue:"朋友走近，鏡子仍由小美操作。",countdown:"小美離開，鏡子準備清除這次試穿。",reset:"畫面已清空，下一位可以開始。"},
		screen: {"idle-mirror":"只顯示倒影",noticing:"站到腳印上，可以試穿外套",guidance:"站在腳印上，舉起一隻手",engaged:"外套穿好了",paused:"暫停中：請把手舉回畫面",queue:"小美仍在操作；朋友請稍候",countdown:"即將清除；要繼續嗎？",reset:"只顯示倒影"},
		lesson: {"idle-mirror":"開始前是一面普通鏡子。",noticing:"小光點是鏡子的數位回應，讓人知道它能互動。",guidance:"腳印告訴小美站哪裡，鏡頭才能看見她。",engaged:"外套留在身體上，文字避開衣服。",paused:"手不見了就暫停，不能把操作交給別人。",queue:"兩人同時出現時，要說清楚誰能操作。",countdown:"人走了就清除試穿內容。",reset:"清空後回到純鏡面。"},
		edges: {"idle-mirror":[["小美靠近","noticing"]],noticing:[["小美看到提示","guidance"],["小美路過","idle-mirror"]],guidance:[["小美站好並舉手","engaged"],["小美走開","idle-mirror"]],engaged:[["手離開畫面","paused"],["朋友也靠近","queue"],["小美離開","countdown"]],paused:[["手回到畫面","engaged"],["等待逾時並清除","reset"]],queue:[["朋友等候，小美繼續","engaged"],["小美結束並清除","reset"]],countdown:[["小美回來繼續","engaged"],["倒數結束並清除","reset"]],reset:[["下一位靠近","noticing"]]},
		labels: {happens:"發生的事",mirror:"鏡面顯示",why:"為什麼這樣設計",next:"接下來會怎樣",path:"走過的狀態"}
	} : {
		name: {"idle-mirror":"plain mirror",noticing:"notice",guidance:"standing guide",engaged:"trying on",paused:"tracking paused",queue:"second person",countdown:"leaving",reset:"cleared"},
		story: {"idle-mirror":"Mei walks past an ordinary mirror.",noticing:"A small light appears on the mirror. Mei stops to look.",guidance:"Footprints light up. Mei stands in the marked spot.",engaged:"A blue jacket appears on her reflection. Mei tries it on.",paused:"Mei's hand leaves sensor range. The fitting pauses.",queue:"A friend arrives. Mei still controls the mirror.",countdown:"Mei leaves. The mirror prepares to clear the fitting.",reset:"The fitting is cleared. The next visitor can begin."},
		screen: {"idle-mirror":"Reflection only",noticing:"Stand on the footprints to try on a jacket",guidance:"Stand on the footprints and raise one hand",engaged:"Jacket on",paused:"Paused: bring your hand back into view",queue:"Mei is still in control; friend, please wait",countdown:"Clearing soon. Continue?",reset:"Reflection only"},
		lesson: {"idle-mirror":"Before anyone begins, it is an ordinary mirror.",noticing:"The light is a digital response: it shows that the mirror can respond.",guidance:"The footprints show where to stand so the camera can see Mei.",engaged:"The jacket stays on the body; text stays off the garment.",paused:"A missing hand pauses the action; control does not pass to someone else.",queue:"With two people present, show who can control the mirror.",countdown:"Clear the fitting when its user leaves.",reset:"After clearing, return to a plain mirror."},
		edges: {"idle-mirror":[["Mei approaches","noticing"]],noticing:[["Mei sees the cue","guidance"],["Mei walks past","idle-mirror"]],guidance:[["Mei stands and raises a hand","engaged"],["Mei walks away","idle-mirror"]],engaged:[["Hand leaves view","paused"],["Friend approaches","queue"],["Mei leaves","countdown"]],paused:[["Hand returns","engaged"],["Wait expires and clears","reset"]],queue:[["Friend waits; Mei continues","engaged"],["Mei finishes and clears","reset"]],countdown:[["Mei returns to continue","engaged"],["Countdown ends and clears","reset"]],reset:[["Next visitor approaches","noticing"]]},
		labels: {happens:"What happens",mirror:"Mirror shows",why:"Why this response",next:"What happens next",path:"States visited"}
	};
	const scene = root.querySelector(".lab-scene");
	const graph = root.querySelector(".lab-graph");
	const actions = root.querySelector(".lab-actions");
	const story = root.querySelector("#lab3-story");
	const screen = root.querySelector("#lab3-screen");
	const lesson = root.querySelector("#lab3-lesson");
	const trail = root.querySelector("#lab3-trail");
	const state = root.querySelector("#lab3-state");
	let current = "idle-mirror";
	const walked = [current];
	const routes = [
		["idle-mirror","noticing","guidance","engaged","countdown","reset"],
		["engaged","paused"],
		["engaged","queue"],
	];
	function graphRow(states, branch) {
		const row = document.createElement("div");
		row.className = "lab-graph-row";
		states.forEach((key, index) => {
			if (index) {
				const arrow = document.createElement("span");
				arrow.className = "lab-arrow";
				arrow.setAttribute("aria-hidden", "true");
				arrow.textContent = branch ? "↔" : "→";
				row.appendChild(arrow);
			}
			const node = document.createElement("span");
			node.className = "lab-node";
			node.textContent = copy.name[key];
			if (key === current && (!branch || key !== "engaged")) node.setAttribute("aria-current", "step");
			row.appendChild(node);
		});
		return row;
	}
	function render() {
		scene.dataset.scene = current;
		scene.setAttribute("aria-label", copy.story[current]);
		state.textContent = copy.name[current];
		story.textContent = copy.story[current];
		screen.textContent = copy.screen[current];
		lesson.textContent = copy.lesson[current];
		trail.textContent = walked.map((key) => copy.name[key]).join(" → ");
		graph.replaceChildren(...routes.map((states, index) => graphRow(states, index > 0)));
		actions.replaceChildren(...copy.edges[current].map(([event, target]) => {
			const button = document.createElement("button");
			const small = document.createElement("small");
			button.textContent = event;
			small.textContent = `→ ${copy.name[target]}`;
			button.appendChild(small);
			button.addEventListener("click", () => {
				current = target;
				walked.push(target);
				render();
				if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
					scene.animate([{opacity: 0.65, transform: "scale(0.99)"}, {opacity: 1, transform: "scale(1)"}], {duration: 250, easing: "cubic-bezier(0.4, 0, 0.2, 1)"});
				}
			});
			return button;
		}));
	}
	render();
})();
