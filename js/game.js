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
    var count, msg, _a, e_1, optionarr, countnode;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                count = 5;
                if (!(gametype === "fourkeys")) return [3 /*break*/, 6];
                _d.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 6];
                msg = "";
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                _a = String;
                return [4 /*yield*/, selectkeys()];
            case 3:
                msg = _a.apply(void 0, [_d.sent()]);
                if (confirm(msg)) {
                    return [3 /*break*/, 6];
                }
                return [3 /*break*/, 5];
            case 4:
                e_1 = _d.sent();
                if (e_1)
                    alert(e_1);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 1];
            case 6:
                optionarr = calculateoptions(options);
                gamerender(optionarr[0], optionarr[1]);
                countnode = document.createElement("h1");
                countnode.classList.add("countdown");
                (_b = field) === null || _b === void 0 ? void 0 : _b.appendChild(countnode);
                _d.label = 7;
            case 7:
                if (!(count > 0)) return [3 /*break*/, 9];
                countnode.textContent = String(count);
                return [4 /*yield*/, sleep(1000)];
            case 8:
                _d.sent();
                --count;
                return [3 /*break*/, 7];
            case 9:
                (_c = field) === null || _c === void 0 ? void 0 : _c.removeChild(countnode);
                return [2 /*return*/];
        }
    });
}); };
var selectkeys = function () { return new Promise(function (resolve, reject) {
    var _a;
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
    (_a = field) === null || _a === void 0 ? void 0 : _a.appendChild(selectfield);
    var cursor = 0;
    var before = 0;
    window.addEventListener("keydown", function (event) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (event.keyCode) {
            case 13:
                if (((_a = selectfield.textContent) === null || _a === void 0 ? void 0 : _a.length) !== 4) {
                    (_b = field) === null || _b === void 0 ? void 0 : _b.removeChild(selectfield);
                    reject("無効です。選び直してください。");
                }
                (_c = field) === null || _c === void 0 ? void 0 : _c.removeChild(selectfield);
                resolve("\u300C" + ((_d = selectfield.textContent) === null || _d === void 0 ? void 0 : _d.split("").join(", ")) + "\u300D\u3067\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
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
                if (event.key.length !== 1 || ((_e = selectfield.textContent) === null || _e === void 0 ? void 0 : _e.includes(event.key.toLowerCase())))
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
        (_f = selectfield.querySelector("h1[data-fieldnum=\"" + before + "\"]")) === null || _f === void 0 ? void 0 : _f.setAttribute("style", "border-color: var(--txtcolor)");
        (_g = selectfield.querySelector("h1[data-fieldnum=\"" + cursor + "\"]")) === null || _g === void 0 ? void 0 : _g.setAttribute("style", "border-color: rgb(0, 191, 255)");
        before = cursor;
    });
}); };
var calculateoptions = function (options) {
    var result = Array(2);
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
            [68, 70, 74, 75];
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
            break;
        case "click":
            score = 870;
            break;
    }
    result = [time, score];
    console.log(result);
    console.log(acceptkeys);
    return [result, acceptkeys];
};
var gamerender = function (options, acceptkeys) {
    var timedisplay = document.createElement("h1");
    var timelimit;
};
var gamestart = function (option) {
    console.log("options: " + option);
    console.log("Game Start!");
};
window.addEventListener("DOMContentLoaded", function () { return console.log("gametype: " + gametype); });
window.addEventListener("load", countdown);
