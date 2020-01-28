"use strict";
var _a, _b, _c;
var arrows = document.getElementById("arrows"), dfjk = document.getElementById("dfjk"), space = document.getElementById("space"), enter = document.getElementById("enter"), allkey = document.getElementById("allkey"), fourkeys = document.getElementById("fourkeys"), click = document.getElementById("click"), settingfield = document.getElementById("settingfield"), setting = document.getElementById("setopt"), closebutton = document.getElementById("closebutton");
var option = (_a = document.getElementById("settingfield")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("input[type=\"checkbox\"]:checked");
var optionstr = "";
{
    var arr = [arrows, dfjk, space, enter, allkey, fourkeys, click];
    arr.forEach(function (e) {
        var _a;
        (_a = e) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { var _a; return location.href = "./game.html?gametype=" + encodeURIComponent((_a = e) === null || _a === void 0 ? void 0 : _a.id) + "&option=" + (optionstr.replace(/,$/, "") || "none"); });
    });
}
(_b = setting) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var _a;
    // settingfield!.style.display = "block"
    setting.style.visibility = "hidden";
    (_a = settingfield) === null || _a === void 0 ? void 0 : _a.classList.add("active");
});
(_c = closebutton) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    var _a, _b, _c;
    // settingfield!.style.display = "none"
    setTimeout(function () { return setting.style.visibility = "visible"; }, 1000);
    (_a = settingfield) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
    option = (_b = document.getElementById("settingfield")) === null || _b === void 0 ? void 0 : _b.querySelectorAll("input[type=\"checkbox\"]:checked");
    (_c = option) === null || _c === void 0 ? void 0 : _c.forEach(function (e) {
        optionstr += e.id + ",";
    });
});
