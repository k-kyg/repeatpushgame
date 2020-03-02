import Ranking from "./ranking.js";
interface IResult {
	score: number;
	count: number;
	gametype: string | null;
	options: string[] | undefined;
}
interface IResultRecord extends IResult {
	date: Date;
}
const arrows: HTMLElement | null = document.getElementById("arrows"),
	dfjk: HTMLElement | null = document.getElementById("dfjk"),
	space: HTMLElement | null = document.getElementById("space"),
	enter: HTMLElement | null = document.getElementById("enter"),
	allkey: HTMLElement | null = document.getElementById("allkey"),
	fourkeys: HTMLElement | null = document.getElementById("fourkeys"),
	click: HTMLElement | null = document.getElementById("click"),
	settingfield: HTMLElement | null = document.getElementById("settingfield"),
	setting: HTMLElement | null = document.getElementById("setopt"),
	help: HTMLElement | null = document.getElementById("help"),
	helpfield: HTMLElement | null = document.getElementById("helpfield"),
	rankingbtn: HTMLElement | null = document.getElementById("rankbtn"),
	funcbtns: HTMLElement | null = document.getElementById("funcbtns"),
	closehelpbtn: HTMLElement | null = document.getElementById("closehelpbtn"),
	closesettingbtn: HTMLElement | null = document.getElementById("closesettingbtn");
let option: NodeListOf<HTMLInputElement> | undefined = document.getElementById("settingfield")?.querySelectorAll(`input[type="checkbox"]:checked`);
{
	const arr: (HTMLElement | null)[] = [arrows, dfjk, space, enter, allkey, fourkeys, click];
	arr.forEach(e => {
		e?.addEventListener("click", () => {
			let optionstr: string = "";
			option = document.getElementById("settingfield")?.querySelectorAll(`input[type="checkbox"]:checked`);
			option?.forEach(e => {
				optionstr += `${e.id},`
			});
			if (optionstr) if (!confirm(`オプション「${(optionstr = [...new Set(optionstr.split(","))].join(",").replace(/,$/, "")).split(",").join("、")}」がついています。\nスタートしてもよろしいですか？`)) return;
			location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}&option=${encodeURIComponent(optionstr.replace(/,$/, "") || "none")}`
		});

	});
}
// window.addEventListener("keydown", (event) => console.log(event?.keyCode))
setting?.addEventListener("click", () => {
	settingfield!.style.zIndex = "2"
	funcbtns!.style.visibility = "hidden";
	settingfield?.classList.add("active");
});
closesettingbtn?.addEventListener("click", () => {
	setTimeout(() => settingfield!.style.zIndex = "unset", 1000)
	setTimeout(() => funcbtns!.style.visibility = "visible", 1000);
	settingfield?.classList.remove("active");
});
help?.addEventListener("click", () => {
	helpfield!.style.zIndex = "2"
	funcbtns!.style.visibility = "hidden";
	helpfield?.classList.add("active");
});
closehelpbtn?.addEventListener("click", () => {
	setTimeout(() => helpfield!.style.zIndex = "unset", 1000)
	setTimeout(() => funcbtns!.style.visibility = "visible", 1000);
	helpfield?.classList.remove("active");
});
rankingbtn?.addEventListener("click", () => {
	alert("Coming soon.");
});