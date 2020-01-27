if (navigator.userAgent.includes("Mobile")) {
	document.querySelectorAll(".play-buttons > *").forEach(e => {
		e.classList.add("active");
	});
	console.log("It is mobile device")
} else {
	document.querySelectorAll(".play-buttons > *").forEach(e => {
		e.classList.add("hover");
	});
	console.log("It is not mobile device")
}
const logo: Element | null = document.querySelector(".logo");
logo?.addEventListener("click", () => location.href = "index.html");
