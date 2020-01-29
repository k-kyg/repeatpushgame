"use strict";
var _a;
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
(_a = logo) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return location.href = "index.html"; });
