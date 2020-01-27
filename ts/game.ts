const url: URL = new URL(location.href);
const urlParam: URLSearchParams = url.searchParams;
const gametype: string | null = urlParam.get("gametype");
const options: string | null = urlParam.get("option");
const field: HTMLElement | null = document.getElementById("gamefield");
const sleep = (x: number) => new Promise(r => setTimeout(r, x));
const countdown = async () => {
	let count: number = 5;
	if (gametype === "fourkeys") {
		while (true) {
			let msg: string = "";
			try {
				msg = String(await selectkeys());
				if (confirm(msg)) {
					break;
				}
			} catch (e) {
				if (e) alert(e);
			}
		}
	}
	const countnode: HTMLHeadingElement = document.createElement("h1");
	countnode.classList.add("countdown");
	field?.appendChild(countnode);
	while (count > 0) {
		countnode.textContent = String(count);
		await sleep(1000);
		--count;
	}
	field?.removeChild(countnode);
	gamerender(options);
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
			case 37:
				--cursor;
				break;
			case 39:
				++cursor;
				break;
			case 8:
				selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)!.textContent = "";
				--cursor;
				break;
			default:
				if (event.key.length !== 1 || selectfield.textContent?.includes(event.key.toLowerCase())) break;
				selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)!.textContent = event.key.toLowerCase();
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
const gamerender = (option: string | null) => {
	console.log("Game Start!");
}
window.addEventListener("DOMContentLoaded", () => console.log(`gametype: ${gametype}`));
window.addEventListener("load", countdown);