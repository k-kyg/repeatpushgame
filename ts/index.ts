const arrows: HTMLElement | null = document.getElementById("arrows"),
	dfjk: HTMLElement | null = document.getElementById("dfjk"),
	space: HTMLElement | null = document.getElementById("space"),
	enter: HTMLElement | null = document.getElementById("enter"),
	allkey: HTMLElement | null = document.getElementById("allkey"),
	fourkeys: HTMLElement | null = document.getElementById("fourkeys"),
	click: HTMLElement | null = document.getElementById("click"),
	settingfield: HTMLElement | null = document.getElementById("settingfield"),
	setting: HTMLElement | null = document.getElementById("setopt"),
	closebutton: HTMLElement | null = document.getElementById("closebutton");
let option: NodeListOf<HTMLInputElement> | undefined = document.getElementById("settingfield")?.querySelectorAll(`input[type="checkbox"]:checked`);
let optionstr: string = "";
{
	const arr: (HTMLElement | null)[] = [arrows, dfjk, space, enter, allkey, fourkeys, click];
	arr.forEach(e => {
		e?.addEventListener("click", () => {
			if (optionstr) if (!confirm(`オプション「${optionstr.replace(/,$/, "").split(",").join("、")}」がついています。\nスタートしてもよろしいですか？`)) return;
			location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}&option=${optionstr.replace(/,$/, "") || "none"}`
		});
	});
}
// window.addEventListener("keydown", (event) => console.log(event?.keyCode))
setting?.addEventListener("click", () => {
	settingfield!.style.zIndex = "2"
	setting!.style.visibility = "hidden";
	settingfield?.classList.add("active");
});
closebutton?.addEventListener("click", () => {
	setTimeout(() => settingfield!.style.zIndex = "unset", 1000)
	setTimeout(() => setting!.style.visibility = "visible", 1000);
	settingfield?.classList.remove("active");
	option = document.getElementById("settingfield")?.querySelectorAll(`input[type="checkbox"]:checked`);
	option?.forEach(e => {
		optionstr += `${e.id},`
	});
});