"use strict";
var arrows = document.getElementById("arrows"), dfjk = document.getElementById("dfjk"), space = document.getElementById("space"), enter = document.getElementById("enter"), allkey = document.getElementById("allkey"), fourkeys = document.getElementById("fourkeys"), click = document.getElementById("click");
var time = 10;
{
    var arr = [arrows, dfjk, space, enter, allkey, fourkeys, click];
    arr.forEach(function (e) {
        var _a;
        (_a = e) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { var _a; return location.href = "./game.html?gametype=" + encodeURIComponent((_a = e) === null || _a === void 0 ? void 0 : _a.id) + "&time=" + time; });
    });
}
