"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a;
var arrows = document.getElementById("arrows"), dfjk = document.getElementById("dfjk"), space = document.getElementById("space"), enter = document.getElementById("enter"), allkey = document.getElementById("allkey"), fourkeys = document.getElementById("fourkeys"), click = document.getElementById("click"), settingfield = document.getElementById("settingfield"), setting = document.getElementById("setopt"), help = document.getElementById("help"), helpfield = document.getElementById("helpfield"), rankingbtn = document.getElementById("rankbtn"), funcbtns = document.getElementById("funcbtns"), closehelpbtn = document.getElementById("closehelpbtn"), closesettingbtn = document.getElementById("closesettingbtn");
var option = (_a = document.getElementById("settingfield")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("input[type=\"checkbox\"]:checked");
{
    var arr = [arrows, dfjk, space, enter, allkey, fourkeys, click];
    arr.forEach(function (e) {
        e === null || e === void 0 ? void 0 : e.addEventListener("click", function () {
            var _a;
            var optionstr = "";
            option = (_a = document.getElementById("settingfield")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("input[type=\"checkbox\"]:checked");
            option === null || option === void 0 ? void 0 : option.forEach(function (e) {
                optionstr += e.id + ",";
            });
            if (optionstr)
                if (!confirm("\u30AA\u30D7\u30B7\u30E7\u30F3\u300C" + (optionstr = __spread(new Set(optionstr.split(","))).join(",").replace(/,$/, "")).split(",").join("、") + "\u300D\u304C\u3064\u3044\u3066\u3044\u307E\u3059\u3002\n\u30B9\u30BF\u30FC\u30C8\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))
                    return;
            location.href = "./game.html?gametype=" + encodeURIComponent(e === null || e === void 0 ? void 0 : e.id) + "&option=" + encodeURIComponent(optionstr.replace(/,$/, "") || "none");
        });
    });
}
// window.addEventListener("keydown", (event) => console.log(event?.keyCode))
setting === null || setting === void 0 ? void 0 : setting.addEventListener("click", function () {
    settingfield.style.zIndex = "2";
    funcbtns.style.visibility = "hidden";
    settingfield === null || settingfield === void 0 ? void 0 : settingfield.classList.add("active");
});
closesettingbtn === null || closesettingbtn === void 0 ? void 0 : closesettingbtn.addEventListener("click", function () {
    setTimeout(function () { return settingfield.style.zIndex = "unset"; }, 1000);
    setTimeout(function () { return funcbtns.style.visibility = "visible"; }, 1000);
    settingfield === null || settingfield === void 0 ? void 0 : settingfield.classList.remove("active");
});
help === null || help === void 0 ? void 0 : help.addEventListener("click", function () {
    helpfield.style.zIndex = "2";
    funcbtns.style.visibility = "hidden";
    helpfield === null || helpfield === void 0 ? void 0 : helpfield.classList.add("active");
});
closehelpbtn === null || closehelpbtn === void 0 ? void 0 : closehelpbtn.addEventListener("click", function () {
    setTimeout(function () { return helpfield.style.zIndex = "unset"; }, 1000);
    setTimeout(function () { return funcbtns.style.visibility = "visible"; }, 1000);
    helpfield === null || helpfield === void 0 ? void 0 : helpfield.classList.remove("active");
});
rankingbtn === null || rankingbtn === void 0 ? void 0 : rankingbtn.addEventListener("click", function () {
    alert("Coming soon.");
});
