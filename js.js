function show_typewriter(element, text) {
    // 显示打字机特效
    element.innerText = "";
    for (let subscript = 0; subscript <= text.length; subscript += 1) {
        setTimeout(function () {
            element.innerText = text.slice(0, subscript);
            if (subscript % 2 != text.length % 2) element.innerText += "|";
        }, (subscript + 1) * 70);
    }
}
