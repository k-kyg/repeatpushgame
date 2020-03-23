var _a;
const arrows = document.getElementById("arrows"), dfjk = document.getElementById("dfjk"), space = document.getElementById("space"), enter = document.getElementById("enter"), allkey = document.getElementById("allkey"), fourkeys = document.getElementById("fourkeys"), click = document.getElementById("click"), settingfield = document.getElementById("settingfield"), setting = document.getElementById("setopt"), help = document.getElementById("help"), helpfield = document.getElementById("helpfield"), rankingbtn = document.getElementById("rankbtn"), funcbtns = document.getElementById("funcbtns"), closehelpbtn = document.getElementById("closehelpbtn"), closesettingbtn = document.getElementById("closesettingbtn"), startconfirmfield = document.getElementById("startconfirmfield");
let option = (_a = document.getElementById("settingfield")) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`input[type="checkbox"]:checked`);
{
    const arr = [arrows, dfjk, space, enter, allkey, fourkeys, click];
    arr.forEach(e => {
        e === null || e === void 0 ? void 0 : e.addEventListener("click", () => {
            var _a;
            let optionstr = "";
            option = (_a = document.getElementById("settingfield")) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`input[type="checkbox"]:checked`);
            option === null || option === void 0 ? void 0 : option.forEach(e => {
                optionstr += `${e.id},`;
            });
            optionstr = [...new Set(optionstr.split(","))].join(",").replace(/,$/, "");
            startconfirm(e === null || e === void 0 ? void 0 : e.id, optionstr);
            // if (optionstr) if (!confirm(`オプション「${optionstr.split(",").join("、")}」がついています。\nスタートしてもよろしいですか？`)) return;
            // location.href = `./game.html?gametype=${encodeURIComponent(e?.id)}&option=${encodeURIComponent(optionstr.replace(/,$/, "") || "none")}`
        });
    });
}
const startconfirm = (gametypestr, optionstr) => {
    const gametype = document.getElementById("gametype");
    const option = document.getElementById("option");
    const okbtn = document.getElementById("ok");
    const nobtn = document.getElementById("no");
    startconfirmfield === null || startconfirmfield === void 0 ? void 0 : startconfirmfield.classList.add("active");
    startconfirmfield.style.zIndex = "2";
    startconfirmfield.style.visibility = "visible";
    switch (gametypestr) {
        case "arrows":
            gametype.textContent = "上下左右キー";
            break;
        case "dfjk":
            gametype.textContent = "dfjk";
            break;
        case "space":
            gametype.textContent = "スペースキー";
            break;
        case "enter":
            gametype.textContent = "エンターキー";
            break;
        case "allkey":
            gametype.textContent = "全てのキー";
            break;
        case "fourkeys":
            gametype.textContent = "お好きな4キー";
            break;
        case "click":
            gametype.textContent = "マウスクリック";
            break;
    }
    option.textContent = optionstr.split(",").join("、") || "none";
    okbtn === null || okbtn === void 0 ? void 0 : okbtn.addEventListener("click", e => location.href = `./game.html?gametype=${encodeURIComponent(gametypestr)}&option=${encodeURIComponent(optionstr.replace(/,$/, "") || "none")}`);
    nobtn === null || nobtn === void 0 ? void 0 : nobtn.addEventListener("click", e => {
        startconfirmfield === null || startconfirmfield === void 0 ? void 0 : startconfirmfield.classList.remove("active");
        setTimeout(() => startconfirmfield.style.zIndex = "unset", 0);
        setTimeout(() => startconfirmfield.style.visibility = "hidden", 0);
    });
};
// window.addEventListener("keydown", (event) => console.log(event?.keyCode))
setting === null || setting === void 0 ? void 0 : setting.addEventListener("click", () => {
    settingfield.style.zIndex = "2";
    funcbtns.style.visibility = "hidden";
    settingfield === null || settingfield === void 0 ? void 0 : settingfield.classList.add("active");
});
closesettingbtn === null || closesettingbtn === void 0 ? void 0 : closesettingbtn.addEventListener("click", () => {
    setTimeout(() => settingfield.style.zIndex = "unset", 1000);
    setTimeout(() => funcbtns.style.visibility = "visible", 1000);
    settingfield === null || settingfield === void 0 ? void 0 : settingfield.classList.remove("active");
});
help === null || help === void 0 ? void 0 : help.addEventListener("click", () => {
    helpfield.style.zIndex = "2";
    funcbtns.style.visibility = "hidden";
    helpfield === null || helpfield === void 0 ? void 0 : helpfield.classList.add("active");
});
closehelpbtn === null || closehelpbtn === void 0 ? void 0 : closehelpbtn.addEventListener("click", () => {
    setTimeout(() => helpfield.style.zIndex = "unset", 1000);
    setTimeout(() => funcbtns.style.visibility = "visible", 1000);
    helpfield === null || helpfield === void 0 ? void 0 : helpfield.classList.remove("active");
});
rankingbtn === null || rankingbtn === void 0 ? void 0 : rankingbtn.addEventListener("click", () => {
    alert("Coming soon.");
});
