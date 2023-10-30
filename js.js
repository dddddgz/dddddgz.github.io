function show_inputer(element, text) {
    // 显示打字机特效
    element.innerText = "";
    for (let subscript = 0; subscript <= text.length; subscript += 1) {
        setTimeout(function () {
            element.innerText = text.slice(0, subscript);
            if (subscript % 2 != text.length % 2) element.innerText += "|";
        }, (subscript + 1) * 70);
    }
}

function check_link() {
    // 处理链接
    let elements = document.getElementsByTagName("a");
    for (let i = 0; i < elements.length; i += 1) {
        let element = elements[i];
        element.innerText += " (" + element.getAttribute("href").split("/")[2] + ")";
    }
}
