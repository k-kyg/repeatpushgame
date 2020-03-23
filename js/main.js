"use strict";
const isMobile = document.getElementById("ismobile");
if (navigator.userAgent.includes("Mobile")) {
    document.querySelectorAll(".buttons > *, play-buttons > *").forEach(e => {
        e.classList.add("active");
    });
    isMobile.value = "true";
    console.log("It is mobile device");
}
else {
    document.querySelectorAll(".buttons > *, .play-buttons > *").forEach(e => {
        e.classList.add("hover");
    });
    isMobile.value = "false";
    console.log("It is not mobile device");
}
const logo = document.querySelector(".logo");
logo === null || logo === void 0 ? void 0 : logo.addEventListener("click", () => location.href = "index.html");
