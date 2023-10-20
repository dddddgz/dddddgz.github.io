function show_inputer(element) {
    // 显示打字机特效
    let text = element.innerText;
    element.innerText = "";
    for (let subscript = 1; subscript <= text.length; subscript += 1) {
        setTimeout(function () { element.innerText = text.slice(0, subscript) }, subscript * 60);
    }
}