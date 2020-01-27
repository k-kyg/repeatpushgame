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
		e?.addEventListener("click", () => location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}&option=${optionstr.replace(/,$/, "")}`);
	});
}
setting?.addEventListener("click", () => {
	settingfield!.style.display = "block"
});
closebutton?.addEventListener("click", () => {
	settingfield!.style.display = "none"
	option = document.getElementById("settingfield")?.querySelectorAll(`input[type="checkbox"]:checked`);
	option?.forEach(e => {
		optionstr += `${e.id},`
	});
});