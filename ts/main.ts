if (navigator.userAgent.includes("Mobile")) {
	document.querySelectorAll(".play-buttons > *").forEach(e => {
		e.classList.add("active");
	});
	console.log("it is mobile device")
} else {
	document.querySelectorAll(".play-buttons > *").forEach(e => {
		e.classList.add("hover");
	});
	console.log("it is not mobile device")
}
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