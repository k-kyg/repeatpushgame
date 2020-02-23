"use strict";
if (navigator.userAgent.includes("Mobile")) {
    document.querySelectorAll(".play-buttons > *").forEach(function (e) {
        e.classList.add("active");
    });
    console.log("It is mobile device");
}
else {
    document.querySelectorAll(".play-buttons > *").forEach(function (e) {
        e.classList.add("hover");
    });
    console.log("It is not mobile device");
}
var logo = document.querySelector(".logo");
logo === null || logo === void 0 ? void 0 : logo.addEventListener("click", function () { return location.href = "index.html"; });
