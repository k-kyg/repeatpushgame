const url: URL = new URL(location.href);
const urlParam: URLSearchParams = url.searchParams;
const gametype: string | null = urlParam.get("gametype");
const timelimit: number | null = Number(urlParam.get("time"));
const field: HTMLElement | null = document.getElementById("gamefield");
const sleep = (x: number) => new Promise(r => setTimeout(r, x));
const countdown = async () => {
	let count: number = 5;
	if (gametype === "fourkeys") await selectkeys();
	const countnode: HTMLHeadingElement = document.createElement("h1");
	countnode.classList.add("countdown");
	field?.appendChild(countnode);
	while (count > 0) {
		countnode.textContent = String(count);
		await sleep(1000);
		--count;
	}
	field?.removeChild(countnode);
	gamerender(timelimit);
}
const selectkeys = () => new Promise(resolve => {
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
	const count: Generator<number, never, undefined> = (function* () {
		while (true) {
			yield* [0, 1, 2, 3];
		}
	})();
	window.addEventListener("keydown", event => {
		switch (event.keyCode) {
			case 13:
				resolve();
				break;
			default:
				if (event.key.length !== 1) break;
				selectfield.querySelector(`h1[data-fieldnum="${count.next().value}"]`)!.textContent = event.key.toLowerCase();
				break;
		}
	});
});
const gamerender = (timelimit: number = 10) => {
	console.log("Game Start!");
}
window.addEventListener("DOMContentLoaded", () => console.log(`gametype: ${gametype}`));
window.addEventListener("load", countdown);