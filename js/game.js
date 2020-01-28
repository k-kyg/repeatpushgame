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
var _a;
const url = new URL(location.href);
const urlParam = url.searchParams;
const gametype = urlParam.get("gametype");
const options = (_a = urlParam.get("option")) === null || _a === void 0 ? void 0 : _a.split(",");
const field = document.getElementById("gamefield");
const sleep = (x) => new Promise(r => setTimeout(r, x));
const countdown = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let count = 5;
    if (gametype === "fourkeys") {
        while (true) {
            let msg = "";
            try {
                msg = String(yield selectkeys());
                if (confirm(msg)) {
                    break;
                }
            }
            catch (e) {
                if (e)
                    alert(e);
            }
        }
    }
    let optionarr = calculateoptions(options);
    gamerender(optionarr[0], optionarr[1]);
    const countnode = document.createElement("h1");
    countnode.classList.add("countdown");
    (_b = field) === null || _b === void 0 ? void 0 : _b.appendChild(countnode);
    while (count > 0) {
        countnode.textContent = String(count);
        yield sleep(1000);
        --count;
    }
    (_c = field) === null || _c === void 0 ? void 0 : _c.removeChild(countnode);
});
const selectkeys = () => new Promise((resolve, reject) => {
    var _a;
    const selectfield = document.createElement("div");
    selectfield.classList.add("selectfield");
    {
        let count = 0;
        while (count < 4) {
            const selectnode = document.createElement("h1");
            selectnode.setAttribute("data-fieldnum", String(count));
            selectfield.appendChild(selectnode);
            ++count;
        }
    }
    (_a = field) === null || _a === void 0 ? void 0 : _a.appendChild(selectfield);
    let cursor = 0;
    let before = 0;
    window.addEventListener("keydown", event => {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (event.keyCode) {
            case 13:
                if (((_a = selectfield.textContent) === null || _a === void 0 ? void 0 : _a.length) !== 4) {
                    (_b = field) === null || _b === void 0 ? void 0 : _b.removeChild(selectfield);
                    reject("無効です。選び直してください。");
                }
                (_c = field) === null || _c === void 0 ? void 0 : _c.removeChild(selectfield);
                resolve(`「${(_d = selectfield.textContent) === null || _d === void 0 ? void 0 : _d.split("").join(", ")}」でよろしいですか？`);
                break;
            case 37:
                --cursor;
                break;
            case 39:
                ++cursor;
                break;
            case 8:
                selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`).textContent = "";
                --cursor;
                break;
            default:
                if (event.key.length !== 1 || ((_e = selectfield.textContent) === null || _e === void 0 ? void 0 : _e.includes(event.key.toLowerCase())))
                    break;
                selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`).textContent = event.key.toLowerCase();
                ++cursor;
                break;
        }
        if (cursor > 3)
            cursor = 0;
        else if (cursor < 0)
            cursor = 3;
        (_f = selectfield.querySelector(`h1[data-fieldnum="${before}"]`)) === null || _f === void 0 ? void 0 : _f.setAttribute("style", "border-color: var(--txtcolor)");
        (_g = selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)) === null || _g === void 0 ? void 0 : _g.setAttribute("style", "border-color: rgb(0, 191, 255)");
        before = cursor;
    });
});
const calculateoptions = (options) => {
    let result = Array(2);
    let time = 10;
    let score = 360;
    let acceptkeys = Array();
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
const gamerender = (options, acceptkeys) => {
    const timedisplay = document.createElement("h1");
    let timelimit;
};
const gamestart = (option) => {
    console.log(`options: ${option}`);
    console.log("Game Start!");
};
window.addEventListener("DOMContentLoaded", () => console.log(`gametype: ${gametype}`));
window.addEventListener("load", countdown);
