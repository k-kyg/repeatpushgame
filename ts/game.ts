const url: URL = new URL(location.href);
const urlParam: URLSearchParams = url.searchParams;
const gametype: string | null = urlParam.get("gametype");
const options: string[] | undefined = urlParam.get("option")?.split(",");
const field: HTMLElement | null = document.getElementById("gamefield");
const keycodes: number[] = Array(4);
interface IOption {
	time: number;
	score: number;
	acceptkeys: number[];
}
const sleep = (x: number) => new Promise(r => setTimeout(r, x));
const countdown = async () => {
	let count: number = 5;
	if (gametype === "fourkeys") {
		while (true) {
			let msg: string = "";
			try {
				msg = String(await selectkeys());
				if (confirm(msg)) break;
			} catch (e) {
				if (e) alert(e);
			}
		}
	}
	let option: IOption = calculateoptions(options);
	const render: Generator<undefined, void, unknown> = gamerender(option);
	render.next();
	const countnode: HTMLHeadingElement = document.createElement("h1");
	countnode.classList.add("countdown");
	field?.appendChild(countnode);
	while (count > 0) {
		countnode.textContent = String(count);
		await sleep(1000);
		--count;
	}
	field?.removeChild(countnode);
	render.next();
	gamestart(option);
}
const selectkeys = () => new Promise((resolve, reject) => {
	const selectfield: HTMLDivElement = document.createElement("div");
	selectfield.classList.add("selectfield");
	{
		let count = 0;
		while (count < 4) {
			const selectnode: HTMLHeadingElement = document.createElement("h1");
			selectnode.setAttribute("data-fieldnum", String(count))
			selectfield.appendChild(selectnode);
			++count;
		}
	}
	field?.appendChild(selectfield);
	let cursor: number = 0;
	let before: number = 0;
	window.addEventListener("keydown", event => {
		switch (event.keyCode) {
			case 13:
				if (selectfield.textContent?.length !== 4) {
					field?.removeChild(selectfield);
					reject("無効です。選び直してください。");
				}
				field?.removeChild(selectfield);
				resolve(`「${selectfield.textContent?.split("").join(", ")}」でよろしいですか？`);
				break;
			case 32: break;
			case 37:
				--cursor;
				break;
			case 39:
				++cursor;
				break;
			case 8:
				selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)!.textContent = "";
				delete keycodes[cursor];
				--cursor;
				break;
			default:
				if (event.key.length !== 1 || selectfield.textContent?.includes(event.key.toLowerCase())) break;
				selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)!.textContent = event.key.toLowerCase();
				keycodes[cursor] = event.keyCode;
				++cursor;
				break;
		}
		if (cursor > 3) cursor = 0;
		else if (cursor < 0) cursor = 3;
		selectfield.querySelector(`h1[data-fieldnum="${before}"]`)?.setAttribute("style", "border-color: var(--txtcolor)");
		selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)?.setAttribute("style", "border-color: rgb(0, 191, 255)");
		before = cursor;
	});
});
const calculateoptions = (options: string[] | undefined) => {
	let time: number = 10;
	let score: number = 360;
	let acceptkeys: number[] | undefined = Array();
	switch (gametype) {
		case "arrows":
			score = 360;
			acceptkeys = [37, 38, 39, 40];
			break;
		case "dfjk":
			score = 360;
			[68, 70, 74, 75]
			break;
		case "space":
			score = 900;
			acceptkeys = [32];
			break;
		case "enter":
			score = 900;
			acceptkeys = [13];
			break;
		case "allkey":
			score = 180;
			break;
		case "fourkeys":
			score = 360;
			break;
		case "click":
			score = 870;
			break;
	}
	if (options?.includes("2x")) score *= 2;
	if (options?.includes("4x")) {
		score *= 4;
		time *= 0.4;
		time = Math.floor(time);
	}
	if (options?.includes("0.5x")) {
		score *= 2;
		time *= 0.5;
	}
	if (options?.includes("+5")) time += 5;
	let result: IOption = {
		time: time,
		score: score,
		acceptkeys: acceptkeys
	}
	console.log(result)
	console.log(acceptkeys);
	return result;
}
function* gamerender(option: IOption) {
	const timernode: HTMLHeadingElement = document.createElement("h1");
	const span: HTMLSpanElement = document.createElement("span");
	const time: HTMLSpanElement = document.createElement("span");
	const br: HTMLBRElement = document.createElement("br");
	const discription: HTMLHeadingElement = document.createElement("h2");
	let timelimit: number = option.time;
	span.textContent = "TimeLimit: ";
	time.textContent = String(timelimit);
	discription.textContent = `${gametype === "click" ? "画面をクリックし" : "キーボードを連打し"}てください`;
	time.id = "timer"
	timernode.appendChild(span);
	timernode.appendChild(time);
	yield;
	field?.appendChild(discription);
	field?.appendChild(br);
	field?.appendChild(timernode);
	yield;
}
const gamestart = (option: IOption) => {
	console.log(`options: ${options}`);
	console.log("Game Start!");
}
window.addEventListener("DOMContentLoaded", () => console.log(`gametype: ${gametype}`));
window.addEventListener("load", countdown);