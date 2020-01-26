const arrows: HTMLElement | null = document.getElementById("arrows"),
	dfjk: HTMLElement | null = document.getElementById("dfjk"),
	space: HTMLElement | null = document.getElementById("space"),
	enter: HTMLElement | null = document.getElementById("enter"),
	allkey: HTMLElement | null = document.getElementById("allkey"),
	click: HTMLElement | null = document.getElementById("click");
{
	const arr: (HTMLElement | null)[] = [arrows, dfjk, space, enter, allkey, click];
	arr.forEach(e => {
		e?.addEventListener("click", () => {
			location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}`;
		});
	});
}