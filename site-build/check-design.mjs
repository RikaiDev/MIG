const tokens = await Bun.file(
	new URL("./public/assets/tokens.css", import.meta.url),
).text();

function color(name) {
	const value = tokens.match(
		new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`),
	)?.[1];
	if (!value) throw new Error(`Missing color token: ${name}`);
	return value;
}

function luminance(hex) {
	const channels = [1, 3, 5].map(
		(index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255,
	);
	const linear = channels.map((channel) =>
		channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
	);
	return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(first, second) {
	const [lighter, darker] = [
		luminance(color(first)),
		luminance(color(second)),
	].sort((a, b) => b - a);
	return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
	["body text", "ink", "paper", 4.5],
	["secondary text", "ink-2", "paper", 4.5],
	["secondary text on panels", "ink-2", "panel", 4.5],
	["links", "accent", "paper", 4.5],
	["accent buttons", "accent-ink", "accent", 4.5],
	["selected navigation", "accent", "accent-soft", 4.5],
	["raised surface", "ink", "surface", 4.5],
	["table headings", "ink", "panel", 4.5],
	["required badge", "must-ink", "must-bg", 4.5],
	["recommended badge", "should-ink", "should-bg", 4.5],
	["optional badge", "may-ink", "may-bg", 4.5],
	["scrollbar thumb", "scroll-thumb", "scroll-track", 3],
	["scrollbar hover", "scroll-thumb-hover", "scroll-track", 3],
];

let failures = 0;
for (const [label, foreground, background, minimum] of pairs) {
	const ratio = contrast(foreground, background);
	const pass = ratio >= minimum;
	if (!pass) failures += 1;
	console.log(
		`${pass ? "PASS" : "FAIL"} ${label}: ${ratio.toFixed(2)}:1 (minimum ${minimum}:1)`,
	);
}

if (failures > 0) process.exitCode = 1;
