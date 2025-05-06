import Ranking from "./ranking";
import gsap from "gsap";
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
	closesettingbtn: HTMLElement | null =
		document.getElementById("closesettingbtn"),
	startconfirmfield: HTMLElement | null =
		document.getElementById("startconfirmfield");
let option: NodeListOf<HTMLInputElement> | undefined = document
	.getElementById("settingfield")
	?.querySelectorAll(`input[type="checkbox"]:checked`);
{
	const arr: (HTMLElement | null)[] = [
		arrows,
		dfjk,
		space,
		enter,
		allkey,
		fourkeys,
		click,
	];
	arr.forEach((e) => {
		e?.addEventListener("click", () => {
			let optionstr: string = "";
			option = document
				.getElementById("settingfield")
				?.querySelectorAll(`input[type="checkbox"]:checked`);
			option?.forEach((e) => {
				optionstr += `${e.id},`;
			});
			optionstr = [...new Set(optionstr.split(","))]
				.join(",")
				.replace(/,$/, "");
			startconfirm(e?.id, optionstr);
			// if (optionstr) if (!confirm(`オプション「${optionstr.split(",").join("、")}」がついています。\nスタートしてもよろしいですか？`)) return;
			// location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}&option=${encodeURIComponent(optionstr.replace(/,$/, "") || "none")}`
		});
	});
}
const startconfirm = (gametypestr: string, optionstr: string) => {
	const gametype: HTMLTableCellElement = <HTMLTableCellElement>(
		document.getElementById("gametype")
	);
	const option: HTMLTableCellElement = <HTMLTableCellElement>(
		document.getElementById("option")
	);
	const okbtn: HTMLElement | null = document.getElementById("ok");
	const nobtn: HTMLElement | null = document.getElementById("no");
	startconfirmfield?.classList.add("active");
	readyAnimation.restart();
	startconfirmfield!.style.zIndex = "2";
	startconfirmfield!.style.visibility = "visible";
	switch (gametypestr) {
		case "arrows":
			gametype.textContent = "上下左右キー";
			break;
		case "dfjk":
			gametype.textContent = "dfjk";
			break;
		case "space":
			gametype.textContent = "スペースキー";
			break;
		case "enter":
			gametype.textContent = "エンターキー";
			break;
		case "allkey":
			gametype.textContent = "全てのキー";
			break;
		case "fourkeys":
			gametype.textContent = "お好きな4キー";
			break;
		case "click":
			gametype.textContent = "マウスクリック";
			break;
	}
	option.textContent = optionstr.split(",").join("、") || "none";
	okbtn?.addEventListener(
		"click",
		(e) =>
			(location.href = `./game.html?gametype=${encodeURIComponent(
				gametypestr
			)}&option=${encodeURIComponent(optionstr.replace(/,$/, "") || "none")}`)
	);
	nobtn?.addEventListener("click", (e) => {
		startconfirmfield?.classList.remove("active");
		readyAnimation.revert();
		onLoadAnimation.restart();
		setTimeout(() => (startconfirmfield!.style.zIndex = "unset"), 0);
		setTimeout(() => (startconfirmfield!.style.visibility = "hidden"), 0);
	});
};
// window.addEventListener("keydown", (event) => console.log(event?.keyCode))
setting?.addEventListener("click", () => {
	settingfield!.style.zIndex = "2";
	funcbtns!.style.visibility = "hidden";
	settingfield?.classList.add("active");
});
closesettingbtn?.addEventListener("click", () => {
	setTimeout(() => (settingfield!.style.zIndex = "unset"), 1000);
	setTimeout(() => (funcbtns!.style.visibility = "visible"), 1000);
	settingfield?.classList.remove("active");
});
help?.addEventListener("click", () => {
	helpfield!.style.zIndex = "2";
	funcbtns!.style.visibility = "hidden";
	helpfield?.classList.add("active");
});
closehelpbtn?.addEventListener("click", () => {
	setTimeout(() => (helpfield!.style.zIndex = "unset"), 1000);
	setTimeout(() => (funcbtns!.style.visibility = "visible"), 1000);
	helpfield?.classList.remove("active");
});
rankingbtn?.addEventListener("click", () => {
	alert("Coming soon.");
});

const loadAnimationTL = gsap.timeline();
loadAnimationTL.set(".button", {
	y: 30,
	opacity: 0,
});
const onLoadAnimation = loadAnimationTL.to(".button", {
	y: 0,
	opacity: 1,
	ease: "expo.out",
	stagger: {
		each: 0.1,
		from: "start",
	},
});
const readyAnimationTL = gsap.timeline();
readyAnimationTL.set(
	"#startconfirmfield > div > table, #startconfirmfield > div > div > *",
	{
		y: 30,
		opacity: 0,
	}
);
const readyAnimation = readyAnimationTL.to(
	"#startconfirmfield > div > table, #startconfirmfield > div > div > *",
	{
		y: 0,
		opacity: 1,
		ease: "expo.out",
		stagger: {
			each: 0.1,
			from: "start",
		},
		// paused: true,
	}
);
