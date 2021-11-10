import Ranking from "./ranking.js";
// debugger;
class GameField extends HTMLElement {
	constructor() {
		super();
	}
}
customElements.define("game-field", GameField, { extends: "div" });
const url: URL = new URL(location.href);
const urlParam: URLSearchParams = url.searchParams;
const gametype: string | null = urlParam.get("gametype");
const options: string[] | undefined = urlParam.get("option")?.split(",");
let field: HTMLElement | null = document.getElementById("gamefield");
const inputs: string[] = Array(4);
const sleep = (x: number) => new Promise(r => setTimeout(r, x));
let selectKeyID: number;
interface IOption {
	time: number;
	score: number;
	acceptkeys: string[];
}
interface IResult {
	score: number;
	count: number;
	gametype: string | null;
	options: string[] | undefined;
}
interface IResultRecord extends IResult {
	date: Date;
}
const countdown = async () => {
	let count: number = 5;
	if (gametype === "fourkeys") {
		while (true) {
			let msg: string = "";
			try {
				msg = String(await selectkeys(selectKeyID = Symbol()));
				if (confirm(msg)) break;
				else inputs.fill("");
			} catch (e) {
				if (e) alert(e);
				inputs.fill("");
			}
		}
		selectKeyID = 0;
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
const selectkeys = (ID: number) => new Promise((resolve, reject) => {
	const keyselector = (event: KeyboardEvent) => {
		if (ID === selectKeyID) {
			console.log(`cursor: ${cursor}`);
			switch (event.code) {
				case "Enter":
					if (selectfield.textContent?.length !== 4) {
						field?.removeChild(selectfield);
						reject("無効です。選び直してください。");
					}
					field?.removeChild(selectfield);
					resolve(`「${selectfield.textContent?.split("").join(", ")}」でよろしいですか？`);
					break;
				case "Space": break;
				case "ArrowLeft":
					if (cursor > 0) --cursor;
					break;
				case "ArrowRight":
					if (cursor < 3) ++cursor;
					break;
				case "Backspace":
					selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)!.textContent = "";
					delete inputs[cursor];
					if (cursor > 0) --cursor;
					break;
				default:
					if (event.metaKey || event.altKey || event.shiftKey || event.ctrlKey) break;
					if (event.key.length !== 1 || selectfield.textContent?.includes(event.key.toLowerCase())) break;
					selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)!.textContent = event.key.toLowerCase();
					inputs[cursor] = event.code;
					if (cursor < 3 && !inputs[cursor + 1]) ++cursor;
					break;
			}
			console.log(`selected keys: ${inputs}`);
			console.log(Array(20).fill("-").join(""));
			selectfield.querySelector(`h1[data-fieldnum="${before}"]`)?.setAttribute("style", "border-color: var(--txtcolor)");
			selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)?.setAttribute("style", "border-color: rgb(0, 191, 255)");
			before = cursor;
		}
	}
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
	window.addEventListener("keydown", keyselector);
});
const calculateoptions = (options: string[] | undefined) => {
	let time: number = 10;
	let score: number = 360;
	let acceptkeys: string[] | undefined = Array();
	switch (gametype) {
		case "arrows":
			score = 360;
			acceptkeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
			break;
		case "dfjk":
			score = 360;
			acceptkeys = ["KeyD", "KeyF", "KeyJ", "KeyK"];
			break;
		case "space":
			score = 900;
			acceptkeys = ["Space"];
			break;
		case "enter":
			score = 900;
			acceptkeys = ["Enter"];
			break;
		case "allkey":
			score = 180;
			break;
		case "fourkeys":
			score = 360;
			acceptkeys = inputs;
			break;
		case "click":
			score = 870;
			break;
	}
	if (options?.includes("2x")) score *= 2;
	if (options?.includes("4x")) {
		score *= 4;
		time *= 0.4;
		time = thth.floor(time);
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
	return result;
}
function* gamerender(option: IOption) {
	const timernode: HTMLHeadingElement = document.createElement("h1"),
		timetitlespan: HTMLSpanElement = document.createElement("span"),
		time: HTMLSpanElement = document.createElement("span");
	const counternode: HTMLHeadingElement = document.createElement("h1"),
		countertitlespan: HTMLSpanElement = document.createElement("span"),
		counter: HTMLSpanElement = document.createElement("span");
	const br: HTMLBRElement = document.createElement("br");
	const discription: HTMLHeadingElement = document.createElement("h2");
	let timelimit: number = option.time;
	timetitlespan.textContent = "TimeLimit: ";
	time.textContent = String(timelimit);
	countertitlespan.textContent = "連打数: ";
	counter.textContent = "0";
	discription.textContent = `${gametype === "click" ? "画面をクリックし" : "キーボードを連打し"}てください`;
	time.id = "timer"
	counter.id = "counter";
	timernode.appendChild(timetitlespan);
	timernode.appendChild(time);
	counternode.appendChild(countertitlespan);
	counternode.appendChild(counter);
	yield;
	field?.appendChild(discription);
	field?.appendChild(br);
	field?.appendChild(timernode);
	field?.appendChild(counternode);
	if (gametype === "click") field?.classList.add("gametypeclick");
	yield;
}
const gamestart = async (option: IOption) => {
	const timernode: HTMLSpanElement | null = document.getElementById("timer");
	const countnode: HTMLSpanElement | null = document.getElementById("counter");
	let limit: number = option.time;
	let score: number = 0;
	let count: number = 0;
	console.log(`options: ${options}`);
	console.log("Game Start!");
	if (gametype === "click") field?.addEventListener("click", () => {
		++count;
		countnode!.textContent = String(count);
	});
	else if (gametype === "allkey") window.addEventListener("keyup", () => {
		++count;
		countnode!.textContent = String(count);
	}, true);
	else {
		window.addEventListener("keyup", event => {
			if (option.acceptkeys.includes(event.code)) {
				++count;
				countnode!.textContent = String(count);
			}
		}, true);
	}
	while (true) {
		await sleep(1000);
		--limit;
		timernode!.textContent = String(limit);
		if (limit <= 0) break;
	}
	let _count = count;
	if (options?.includes("2x")) _count /= 2;
	if (options?.includes("+5")) Math.round(_count = _count * 0.4);
	score = _count * option.score;
	score += (_count - _count % 100) / 100 * 10;
	const result: IResult = {
		count: count,
		score: parseInt(String(score)),
		gametype: gametype,
		options: options
	}
	field?.remove();
	showresult(option, result);
}
const restart = () => {
	field = document.createElement("div");
	field.id = "gamefield";
	field.classList.add("field");
	document.getElementsByTagName("body")[0].appendChild(field);
	countdown();
}
const showresult = (option: IOption, result: IResult) => {
	const field: HTMLDivElement = document.createElement("div");
	const isMobile: HTMLInputElement = <HTMLInputElement>document.getElementById("ismobile");
	const record: IResultRecord = new Ranking(result);
	console.log(record);
	field.id = "gamefield";
	field.classList.add("field");
	document.getElementsByTagName("body")[0].appendChild(field);
	const resulttable: HTMLTableElement = document.createElement("table");
	const tabletitlerow: HTMLTableRowElement = document.createElement("tr"),
		tabletitle: HTMLTableCellElement = document.createElement("th");
	const gametyperow: HTMLTableRowElement = document.createElement("tr"),
		gametypetitle: HTMLTableCellElement = document.createElement("td"),
		gametypedata: HTMLTableCellElement = document.createElement("td");
	const timerow: HTMLTableRowElement = document.createElement("tr"),
		timetitle: HTMLTableCellElement = document.createElement("td"),
		timedata: HTMLTableCellElement = document.createElement("td");
	const scorerow: HTMLTableRowElement = document.createElement("tr"),
		scoretitle: HTMLTableCellElement = document.createElement("td"),
		scoredata: HTMLTableCellElement = document.createElement("td");
	const countrow: HTMLTableRowElement = document.createElement("tr"),
		counttitle: HTMLTableCellElement = document.createElement("td"),
		countdata: HTMLTableCellElement = document.createElement("td");
	const optionsrow: HTMLTableRowElement = document.createElement("tr"),
		optionstitle: HTMLTableCellElement = document.createElement("td"),
		optiondata: HTMLTableCellElement = document.createElement("td");
	const buttons: HTMLDivElement = document.createElement("div");
	const restartbutton: HTMLDivElement = document.createElement("div"),
		restartbuttontext: HTMLAnchorElement = document.createElement("a");
	const topbutton: HTMLDivElement = document.createElement("div"),
		topbuttontext: HTMLAnchorElement = document.createElement("a");
	restartbuttontext.setAttribute("href", "javascript:void(0)");
	topbuttontext.setAttribute("href", "javascript:void(0)");
	restartbutton.appendChild(restartbuttontext);
	topbutton.appendChild(topbuttontext);
	buttons.appendChild(restartbutton);
	buttons.appendChild(topbutton);
	buttons.classList.add("resultbuttons");
	restartbutton.classList.add("button");
	topbutton.classList.add("button");
	if (isMobile.value === "false") {
		restartbutton.classList.add("hover");
		topbutton.classList.add("hover");
	} else if (isMobile.value === "true") {
		restartbutton.classList.add("active");
		topbutton.classList.add("active");
	}
	restartbutton.addEventListener("click", () => {
		inputs.fill("");
		field.remove();
		restart();
	});
	topbutton.addEventListener("click", () => location.href = "index.html");
	tabletitle.textContent = "結果";
	gametypetitle.textContent = "ゲームタイプ";
	timetitle.textContent = "制限時間";
	scoretitle.textContent = "スコア";
	counttitle.textContent = "打数";
	optionstitle.textContent = "オプション";
	restartbuttontext.textContent = "リスタート";
	topbuttontext.textContent = "トップへ戻る";
	switch (gametype) {
		case "arrows":
			gametypedata.textContent = "上下左右キー";
			break;
		case "dfjk":
			gametypedata.textContent = "dfjk";
			break;
		case "space":
			gametypedata.textContent = "スペースキー";
			break;
		case "enter":
			gametypedata.textContent = "エンターキー";
			break;
		case "allkey":
			gametypedata.textContent = "全てのキー";
			break;
		case "fourkeys":
			gametypedata.textContent = "お好きな4キー";
			break;
		case "click":
			gametypedata.textContent = "マウスクリック";
			break;
	}
	timedata.textContent = String(option.time);
	scoredata.textContent = String(result.score);
	countdata.textContent = String(result.count);
	optiondata.textContent = String(result.options?.join(", ").replace(/,\s$/, ""));
	resulttable.id = "resulttable"
	resulttable.classList.add("table");
	tabletitle.setAttribute("colspan", "2");
	tabletitlerow.appendChild(tabletitle);
	gametyperow.appendChild(gametypetitle);
	gametyperow.appendChild(gametypedata);
	timerow.appendChild(timetitle);
	timerow.appendChild(timedata);
	scorerow.appendChild(scoretitle);
	scorerow.appendChild(scoredata);
	countrow.appendChild(counttitle);
	countrow.appendChild(countdata);
	optionsrow.appendChild(optionstitle);
	optionsrow.appendChild(optiondata);
	resulttable.appendChild(tabletitlerow);
	resulttable.appendChild(gametyperow);
	resulttable.appendChild(timerow);
	resulttable.appendChild(scorerow);
	resulttable.appendChild(countrow);
	resulttable.appendChild(optionsrow);
	field.appendChild(resulttable);
	field.appendChild(buttons);
}
window.addEventListener("DOMContentLoaded", () => console.log(`gametype: ${gametype}`));
window.addEventListener("load", () => countdown());