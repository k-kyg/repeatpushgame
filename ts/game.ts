const url: URL = new URL(location.href);
const urlParam: URLSearchParams = url.searchParams;
const gametype: string | null = urlParam.get("gametype");
const timelimit: number | null = Number(urlParam.get("time"));
const field: HTMLElement | null = document.getElementById("gamefield");
const sleep = (x: number) => new Promise(r => setTimeout(r, x));
const countdown = () => {
	let count: number = 5;
	const countnode: HTMLHeadingElement = document.createElement("h1");
	countnode.classList.add("countdown");
	field?.appendChild(countnode);
	(async () => {
		while (count > 0) {
			countnode.textContent = String(count);
			await sleep(1000);
			--count;
		}
		gamerender(timelimit);
	})();
}
const gamerender = (timelimit: number = 10) => {
}
window.addEventListener("DOMContentLoaded", () => console.log(gametype));
window.addEventListener("load", countdown);