"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var url = new URL(location.href);
var urlParam = url.searchParams;
var gametype = urlParam.get("gametype");
var options = (_a = urlParam.get("option")) === null || _a === void 0 ? void 0 : _a.split(",");
var field = document.getElementById("gamefield");
var keycodes = Array(4);
var sleep = function (x) { return new Promise(function (r) { return setTimeout(r, x); }); };
var countdown = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, msg, _a, e_1, option, render, countnode;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                count = 5;
                if (!(gametype === "fourkeys")) return [3 /*break*/, 6];
                _b.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 6];
                msg = "";
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                _a = String;
                return [4 /*yield*/, selectkeys()];
            case 3:
                msg = _a.apply(void 0, [_b.sent()]);
                if (confirm(msg))
                    return [3 /*break*/, 6];
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                if (e_1)
                    alert(e_1);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 1];
            case 6:
                option = calculateoptions(options);
                render = gamerender(option);
                render.next();
                countnode = document.createElement("h1");
                countnode.classList.add("countdown");
                field === null || field === void 0 ? void 0 : field.appendChild(countnode);
                _b.label = 7;
            case 7:
                if (!(count > 0)) return [3 /*break*/, 9];
                countnode.textContent = String(count);
                return [4 /*yield*/, sleep(1000)];
            case 8:
                _b.sent();
                --count;
                return [3 /*break*/, 7];
            case 9:
                field === null || field === void 0 ? void 0 : field.removeChild(countnode);
                render.next();
                gamestart(option);
                return [2 /*return*/];
        }
    });
}); };
var selectkeys = function () { return new Promise(function (resolve, reject) {
    var selectfield = document.createElement("div");
    selectfield.classList.add("selectfield");
    {
        var count = 0;
        while (count < 4) {
            var selectnode = document.createElement("h1");
            selectnode.setAttribute("data-fieldnum", String(count));
            selectfield.appendChild(selectnode);
            ++count;
        }
    }
    field === null || field === void 0 ? void 0 : field.appendChild(selectfield);
    var cursor = 0;
    var before = 0;
    window.addEventListener("keydown", function (event) {
        var _a, _b, _c, _d, _e;
        switch (event.keyCode) {
            case 13:
                if (((_a = selectfield.textContent) === null || _a === void 0 ? void 0 : _a.length) !== 4) {
                    field === null || field === void 0 ? void 0 : field.removeChild(selectfield);
                    reject("無効です。選び直してください。");
                }
                field === null || field === void 0 ? void 0 : field.removeChild(selectfield);
                resolve("\u300C" + ((_b = selectfield.textContent) === null || _b === void 0 ? void 0 : _b.split("").join(", ")) + "\u300D\u3067\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case 32: break;
            case 37:
                --cursor;
                break;
            case 39:
                ++cursor;
                break;
            case 8:
                selectfield.querySelector("h1[data-fieldnum=\"" + cursor + "\"]").textContent = "";
                delete keycodes[cursor];
                --cursor;
                break;
            default:
                if (event.key.length !== 1 || ((_c = selectfield.textContent) === null || _c === void 0 ? void 0 : _c.includes(event.key.toLowerCase())))
                    break;
                selectfield.querySelector("h1[data-fieldnum=\"" + cursor + "\"]").textContent = event.key.toLowerCase();
                keycodes[cursor] = event.keyCode;
                ++cursor;
                break;
        }
        if (cursor > 3)
            cursor = 0;
        else if (cursor < 0)
            cursor = 3;
        (_d = selectfield.querySelector("h1[data-fieldnum=\"" + before + "\"]")) === null || _d === void 0 ? void 0 : _d.setAttribute("style", "border-color: var(--txtcolor)");
        (_e = selectfield.querySelector("h1[data-fieldnum=\"" + cursor + "\"]")) === null || _e === void 0 ? void 0 : _e.setAttribute("style", "border-color: rgb(0, 191, 255)");
        before = cursor;
    });
}); };
var calculateoptions = function (options) {
    var time = 10;
    var score = 360;
    var acceptkeys = Array();
    switch (gametype) {
        case "arrows":
            score = 360;
            acceptkeys = [37, 38, 39, 40];
            break;
        case "dfjk":
            score = 360;
            acceptkeys = [68, 70, 74, 75];
            break;
        case "space":
            score = 900;
            acceptkeys = [32];
            break;
        case "enter":
            score = 900;
            acceptkeys = [13];
            break;
        case "allkey":
            score = 180;
            break;
        case "fourkeys":
            score = 360;
            acceptkeys = keycodes;
            break;
        case "click":
            score = 870;
            break;
    }
    if (options === null || options === void 0 ? void 0 : options.includes("2x"))
        score *= 2;
    if (options === null || options === void 0 ? void 0 : options.includes("4x")) {
        score *= 4;
        time *= 0.4;
        time = Math.floor(time);
    }
    if (options === null || options === void 0 ? void 0 : options.includes("0.5x")) {
        score *= 2;
        time *= 0.5;
    }
    if (options === null || options === void 0 ? void 0 : options.includes("+5"))
        time += 5;
    var result = {
        time: time,
        score: score,
        acceptkeys: acceptkeys
    };
    console.log(result);
    console.log(acceptkeys);
    return result;
};
function gamerender(option) {
    var timernode, timetitlespan, time, counternode, countertitlespan, counter, br, discription, timelimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timernode = document.createElement("h1"), timetitlespan = document.createElement("span"), time = document.createElement("span");
                counternode = document.createElement("h1"), countertitlespan = document.createElement("span"), counter = document.createElement("span");
                br = document.createElement("br");
                discription = document.createElement("h2");
                timelimit = option.time;
                timetitlespan.textContent = "TimeLimit: ";
                time.textContent = String(timelimit);
                countertitlespan.textContent = "連打数: ";
                counter.textContent = "0";
                discription.textContent = (gametype === "click" ? "画面をクリックし" : "キーボードを連打し") + "\u3066\u304F\u3060\u3055\u3044";
                time.id = "timer";
                counter.id = "counter";
                timernode.appendChild(timetitlespan);
                timernode.appendChild(time);
                counternode.appendChild(countertitlespan);
                counternode.appendChild(counter);
                return [4 /*yield*/];
            case 1:
                _a.sent();
                field === null || field === void 0 ? void 0 : field.appendChild(discription);
                field === null || field === void 0 ? void 0 : field.appendChild(br);
                field === null || field === void 0 ? void 0 : field.appendChild(timernode);
                field === null || field === void 0 ? void 0 : field.appendChild(counternode);
                if (gametype === "click")
                    field === null || field === void 0 ? void 0 : field.classList.add("gametypeclick");
                return [4 /*yield*/];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
var gamestart = function (option) { return __awaiter(void 0, void 0, void 0, function () {
    var timernode, countnode, limit, score, count, _count, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timernode = document.getElementById("timer");
                countnode = document.getElementById("counter");
                limit = option.time;
                score = 0;
                count = 0;
                console.log("options: " + options);
                console.log("Game Start!");
                if (gametype === "click")
                    field === null || field === void 0 ? void 0 : field.addEventListener("click", function () {
                        ++count;
                        countnode.textContent = String(count);
                    });
                else if (gametype === "allkey")
                    window.addEventListener("keyup", function () {
                        ++count;
                        countnode.textContent = String(count);
                    }, true);
                else {
                    window.addEventListener("keyup", function (event) {
                        if (option.acceptkeys.includes(event.keyCode)) {
                            ++count;
                            countnode.textContent = String(count);
                        }
                    }, true);
                }
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, sleep(1000)];
            case 2:
                _a.sent();
                --limit;
                timernode.textContent = String(limit);
                if (limit <= 0)
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                _count = count;
                if (options === null || options === void 0 ? void 0 : options.includes("2x"))
                    _count /= 2;
                if (options === null || options === void 0 ? void 0 : options.includes("+5"))
                    Math.round(_count = _count * 0.4);
                score = _count * option.score;
                score += (_count - _count % 100) / 100 * 10;
                result = {
                    count: count,
                    score: parseInt(String(score)),
                    gametype: gametype,
                    options: options
                };
                field === null || field === void 0 ? void 0 : field.remove();
                showresult(option, result);
                return [2 /*return*/];
        }
    });
}); };
var restart = function () {
    field = document.createElement("div");
    field.id = "gamefield";
    field.classList.add("field");
    document.getElementsByTagName("body")[0].appendChild(field);
    countdown();
};
var showresult = function (option, result) {
    var _a;
    var field = document.createElement("div");
    var isMobile = document.getElementById("ismobile");
    field.id = "gamefield";
    field.classList.add("field");
    document.getElementsByTagName("body")[0].appendChild(field);
    var resulttable = document.createElement("table");
    var tabletitlerow = document.createElement("tr"), tabletitle = document.createElement("th");
    var gametyperow = document.createElement("tr"), gametypetitle = document.createElement("td"), gametypedata = document.createElement("td");
    var timerow = document.createElement("tr"), timetitle = document.createElement("td"), timedata = document.createElement("td");
    var scorerow = document.createElement("tr"), scoretitle = document.createElement("td"), scoredata = document.createElement("td");
    var countrow = document.createElement("tr"), counttitle = document.createElement("td"), countdata = document.createElement("td");
    var optionsrow = document.createElement("tr"), optionstitle = document.createElement("td"), optiondata = document.createElement("td");
    var buttons = document.createElement("div");
    var restartbutton = document.createElement("div"), restartbuttontext = document.createElement("a");
    var topbutton = document.createElement("div"), topbuttontext = document.createElement("a");
    restartbuttontext.setAttribute("href", "javascript:void(0)");
    topbuttontext.setAttribute("href", "javascript:void(0)");
    restartbutton.appendChild(restartbuttontext);
    topbutton.appendChild(topbuttontext);
    buttons.appendChild(restartbutton);
    buttons.appendChild(topbutton);
    buttons.classList.add("resultbuttons");
    restartbutton.classList.add("button");
    topbutton.classList.add("button");
    if (isMobile.value === "false") {
        restartbutton.classList.add("hover");
        topbutton.classList.add("hover");
    }
    else if (isMobile.value === "true") {
        restartbutton.classList.add("active");
        topbutton.classList.add("active");
    }
    restartbutton.addEventListener("click", function () {
        field.remove();
        restart();
    });
    topbutton.addEventListener("click", function () { return location.href = "index.html"; });
    tabletitle.textContent = "結果";
    gametypetitle.textContent = "ゲームタイプ";
    timetitle.textContent = "制限時間";
    scoretitle.textContent = "スコア";
    counttitle.textContent = "打数";
    optionstitle.textContent = "オプション";
    restartbuttontext.textContent = "リスタート";
    topbuttontext.textContent = "トップへ戻る";
    switch (gametype) {
        case "arrows":
            gametypedata.textContent = "上下左右キー";
            break;
        case "dfjk":
            gametypedata.textContent = "dfjk";
            break;
        case "space":
            gametypedata.textContent = "スペースキー";
            break;
        case "enter":
            gametypedata.textContent = "エンターキー";
            break;
        case "allkey":
            gametypedata.textContent = "全てのキー";
            break;
        case "fourkeys":
            gametypedata.textContent = "お好きな4キー";
            break;
        case "click":
            gametypedata.textContent = "マウスクリック";
            break;
    }
    timedata.textContent = String(option.time);
    scoredata.textContent = String(result.score);
    countdata.textContent = String(result.count);
    optiondata.textContent = String((_a = result.options) === null || _a === void 0 ? void 0 : _a.join(", ").replace(/,\s$/, ""));
    resulttable.id = "resulttable";
    tabletitle.setAttribute("colspan", "2");
    tabletitlerow.appendChild(tabletitle);
    gametyperow.appendChild(gametypetitle);
    gametyperow.appendChild(gametypedata);
    timerow.appendChild(timetitle);
    timerow.appendChild(timedata);
    scorerow.appendChild(scoretitle);
    scorerow.appendChild(scoredata);
    countrow.appendChild(counttitle);
    countrow.appendChild(countdata);
    optionsrow.appendChild(optionstitle);
    optionsrow.appendChild(optiondata);
    resulttable.appendChild(tabletitlerow);
    resulttable.appendChild(gametyperow);
    resulttable.appendChild(timerow);
    resulttable.appendChild(scorerow);
    resulttable.appendChild(countrow);
    resulttable.appendChild(optionsrow);
    field.appendChild(resulttable);
    field.appendChild(buttons);
};
window.addEventListener("DOMContentLoaded", function () { return console.log("gametype: " + gametype); });
window.addEventListener("load", function () { return countdown(); });
