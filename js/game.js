var _a;
import Ranking from "./ranking.js";
// debugger;
class GameField extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define("game-field", GameField, { extends: "div" });
const url = new URL(location.href);
const urlParam = url.searchParams;
const gametype = urlParam.get("gametype");
const options = (_a = urlParam.get("option")) === null || _a === void 0 ? void 0 : _a.split(",");
let field = document.getElementById("gamefield");
const inputs = Array(4);
const sleep = (x) => new Promise(r => setTimeout(r, x));
let selectKeyID;
const countdown = async () => {
    let count = 5;
    if (gametype === "fourkeys") {
        while (true) {
            let msg = "";
            try {
                msg = String(await selectkeys(selectKeyID = Symbol()));
                if (confirm(msg))
                    break;
                else
                    inputs.fill("");
            }
            catch (e) {
                if (e)
                    alert(e);
                inputs.fill("");
            }
        }
        selectKeyID = 0;
    }
    let option = calculateoptions(options);
    const render = gamerender(option);
    render.next();
    const countnode = document.createElement("h1");
    countnode.classList.add("countdown");
    field === null || field === void 0 ? void 0 : field.appendChild(countnode);
    while (count > 0) {
        countnode.textContent = String(count);
        await sleep(1000);
        --count;
    }
    field === null || field === void 0 ? void 0 : field.removeChild(countnode);
    render.next();
    gamestart(option);
};
const selectkeys = (ID) => new Promise((resolve, reject) => {
    const keyselector = (event) => {
        var _a, _b, _c, _d, _e;
        if (ID === selectKeyID) {
            console.log(`ID: ${ID}\ncursor: ${cursor}`);
            switch (event.code) {
                case "Enter":
                    if (((_a = selectfield.textContent) === null || _a === void 0 ? void 0 : _a.length) !== 4) {
                        field === null || field === void 0 ? void 0 : field.removeChild(selectfield);
                        reject("無効です。選び直してください。");
                    }
                    field === null || field === void 0 ? void 0 : field.removeChild(selectfield);
                    resolve(`「${(_b = selectfield.textContent) === null || _b === void 0 ? void 0 : _b.split("").join(", ")}」でよろしいですか？`);
                    break;
                case "Space": break;
                case "ArrowLeft":
                    if (cursor > 0)
                        --cursor;
                    break;
                case "ArrowRight":
                    if (cursor < 3)
                        ++cursor;
                    break;
                case "Backspace":
                    selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`).textContent = "";
                    delete inputs[cursor];
                    if (cursor > 0)
                        --cursor;
                    break;
                default:
                    if (event.metaKey || event.altKey || event.shiftKey || event.ctrlKey)
                        break;
                    if (event.key.length !== 1 || ((_c = selectfield.textContent) === null || _c === void 0 ? void 0 : _c.includes(event.key.toLowerCase())))
                        break;
                    selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`).textContent = event.key.toLowerCase();
                    inputs[cursor] = event.code;
                    if (cursor < 3 && !inputs[cursor + 1])
                        ++cursor;
                    break;
            }
            console.log(`selected keys: ${inputs}`);
            console.log(Array(20).fill("-").join(""));
            (_d = selectfield.querySelector(`h1[data-fieldnum="${before}"]`)) === null || _d === void 0 ? void 0 : _d.setAttribute("style", "border-color: var(--txtcolor)");
            (_e = selectfield.querySelector(`h1[data-fieldnum="${cursor}"]`)) === null || _e === void 0 ? void 0 : _e.setAttribute("style", "border-color: rgb(0, 191, 255)");
            before = cursor;
        }
    };
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
    field === null || field === void 0 ? void 0 : field.appendChild(selectfield);
    let cursor = 0;
    let before = 0;
    window.addEventListener("keydown", keyselector);
});
const calculateoptions = (options) => {
    let time = 10;
    let score = 360;
    let acceptkeys = Array();
    switch (gametype) {
        case "arrows":
            score = 360;
            acceptkeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
            break;
        case "dfjk":
            score = 360;
            acceptkeys = ["KeyD", "KeyF", "KeyJ", "KeyK"];
            break;
        case "space":
            score = 900;
            acceptkeys = ["Space"];
            break;
        case "enter":
            score = 900;
            acceptkeys = ["Enter"];
            break;
        case "allkey":
            score = 180;
            break;
        case "fourkeys":
            score = 360;
            acceptkeys = inputs;
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
    let result = {
        time: time,
        score: score,
        acceptkeys: acceptkeys
    };
    console.log(result);
    return result;
};
function* gamerender(option) {
    const timernode = document.createElement("h1"), timetitlespan = document.createElement("span"), time = document.createElement("span");
    const counternode = document.createElement("h1"), countertitlespan = document.createElement("span"), counter = document.createElement("span");
    const br = document.createElement("br");
    const discription = document.createElement("h2");
    let timelimit = option.time;
    timetitlespan.textContent = "TimeLimit: ";
    time.textContent = String(timelimit);
    countertitlespan.textContent = "連打数: ";
    counter.textContent = "0";
    discription.textContent = `${gametype === "click" ? "画面をクリックし" : "キーボードを連打し"}てください`;
    time.id = "timer";
    counter.id = "counter";
    timernode.appendChild(timetitlespan);
    timernode.appendChild(time);
    counternode.appendChild(countertitlespan);
    counternode.appendChild(counter);
    yield;
    field === null || field === void 0 ? void 0 : field.appendChild(discription);
    field === null || field === void 0 ? void 0 : field.appendChild(br);
    field === null || field === void 0 ? void 0 : field.appendChild(timernode);
    field === null || field === void 0 ? void 0 : field.appendChild(counternode);
    if (gametype === "click")
        field === null || field === void 0 ? void 0 : field.classList.add("gametypeclick");
    yield;
}
const gamestart = async (option) => {
    const timernode = document.getElementById("timer");
    const countnode = document.getElementById("counter");
    let limit = option.time;
    let score = 0;
    let count = 0;
    console.log(`options: ${options}`);
    console.log("Game Start!");
    if (gametype === "click")
        field === null || field === void 0 ? void 0 : field.addEventListener("click", () => {
            ++count;
            countnode.textContent = String(count);
        });
    else if (gametype === "allkey")
        window.addEventListener("keyup", () => {
            ++count;
            countnode.textContent = String(count);
        }, true);
    else {
        window.addEventListener("keyup", event => {
            if (option.acceptkeys.includes(event.code)) {
                ++count;
                countnode.textContent = String(count);
            }
        }, true);
    }
    while (true) {
        await sleep(1000);
        --limit;
        timernode.textContent = String(limit);
        if (limit <= 0)
            break;
    }
    let _count = count;
    if (options === null || options === void 0 ? void 0 : options.includes("2x"))
        _count /= 2;
    if (options === null || options === void 0 ? void 0 : options.includes("+5"))
        Math.round(_count = _count * 0.4);
    score = _count * option.score;
    score += (_count - _count % 100) / 100 * 10;
    const result = {
        count: count,
        score: parseInt(String(score)),
        gametype: gametype,
        options: options
    };
    field === null || field === void 0 ? void 0 : field.remove();
    showresult(option, result);
};
const restart = () => {
    field = document.createElement("div");
    field.id = "gamefield";
    field.classList.add("field");
    document.getElementsByTagName("body")[0].appendChild(field);
    countdown();
};
const showresult = (option, result) => {
    var _a;
    const field = document.createElement("div");
    const isMobile = document.getElementById("ismobile");
    const record = new Ranking(result);
    console.log(record);
    field.id = "gamefield";
    field.classList.add("field");
    document.getElementsByTagName("body")[0].appendChild(field);
    const resulttable = document.createElement("table");
    const tabletitlerow = document.createElement("tr"), tabletitle = document.createElement("th");
    const gametyperow = document.createElement("tr"), gametypetitle = document.createElement("td"), gametypedata = document.createElement("td");
    const timerow = document.createElement("tr"), timetitle = document.createElement("td"), timedata = document.createElement("td");
    const scorerow = document.createElement("tr"), scoretitle = document.createElement("td"), scoredata = document.createElement("td");
    const countrow = document.createElement("tr"), counttitle = document.createElement("td"), countdata = document.createElement("td");
    const optionsrow = document.createElement("tr"), optionstitle = document.createElement("td"), optiondata = document.createElement("td");
    const buttons = document.createElement("div");
    const restartbutton = document.createElement("div"), restartbuttontext = document.createElement("a");
    const topbutton = document.createElement("div"), topbuttontext = document.createElement("a");
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
    restartbutton.addEventListener("click", () => {
        inputs.fill("");
        field.remove();
        restart();
    });
    topbutton.addEventListener("click", () => location.href = "index.html");
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
    resulttable.classList.add("table");
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
window.addEventListener("DOMContentLoaded", () => console.log(`gametype: ${gametype}`));
window.addEventListener("load", () => countdown());
