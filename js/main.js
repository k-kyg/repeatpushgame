"use strict";
if (navigator.userAgent.includes("Mobile")) {
    document.querySelectorAll(".play-buttons > *").forEach(function (e) {
        e.classList.add("active");
    });
    console.log("it is mobile device");
}
else {
    document.querySelectorAll(".play-buttons > *").forEach(function (e) {
        e.classList.add("hover");
    });
    console.log("it is not mobile device");
}
var arrows = document.getElementById("arrows"), dfjk = document.getElementById("dfjk"), space = document.getElementById("space"), enter = document.getElementById("enter"), allkey = document.getElementById("allkey"), click = document.getElementById("click");
{
    var arr = [arrows, dfjk, space, enter, allkey, click];
    arr.forEach(function (e) {
        var _a;
        (_a = e) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            var _a;
            location.href = "./game.html?gametype=" + encodeURIComponent((_a = e) === null || _a === void 0 ? void 0 : _a.id);
        });
    });
}
