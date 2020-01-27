"use strict";
var _a, _b;
var arrows = document.getElementById("arrows"), dfjk = document.getElementById("dfjk"), space = document.getElementById("space"), enter = document.getElementById("enter"), allkey = document.getElementById("allkey"), fourkeys = document.getElementById("fourkeys"), click = document.getElementById("click"), settingfield = document.getElementById("settingfield"), setting = document.getElementById("setopt"), closebutton = document.getElementById("closebutton");
var option = "none";
{
    var arr = [arrows, dfjk, space, enter, allkey, fourkeys, click];
    arr.forEach(function (e) {
        var _a;
        (_a = e) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { var _a; return location.href = "./game.html?gametype=" + encodeURIComponent((_a = e) === null || _a === void 0 ? void 0 : _a.id) + "&option=" + option; });
    });
}
(_a = setting) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    settingfield.style.display = "block";
});
(_b = closebutton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    settingfield.style.display = "none";
});
