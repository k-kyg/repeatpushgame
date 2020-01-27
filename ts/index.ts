const arrows: HTMLElement | null = document.getElementById("arrows"),
	dfjk: HTMLElement | null = document.getElementById("dfjk"),
	space: HTMLElement | null = document.getElementById("space"),
	enter: HTMLElement | null = document.getElementById("enter"),
	allkey: HTMLElement | null = document.getElementById("allkey"),
	fourkeys: HTMLElement | null = document.getElementById("fourkeys"),
	click: HTMLElement | null = document.getElementById("click");
let time: number = 10;
{
	const arr: (HTMLElement | null)[] = [arrows, dfjk, space, enter, allkey, fourkeys, click];
	arr.forEach(e => {
		e?.addEventListener("click", () => location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}&time=${time}`);
	});
}