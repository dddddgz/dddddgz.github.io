let temp = document.createElement("div");
let body = document.body;

function create_element(html) {
    // 用 html 代码快速创建一个 element
    temp.innerHTML = html;
    return temp.firstChild;
}

body.appendChild(create_element("<div id='cur-circle'></div>"));
let cur = document.getElementById("cur-circle");

function show_cur(ev) {
    cur.style.left = ev.pageX - 100 + "px";
    cur.style.top = ev.pageY - 100 + "px";
}
body.onmousemove = show_cur;
