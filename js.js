let temp = document.createElement("div");
let body = document.body;

function create_element(html) {
    // 用 html 代码快速创建一个 element
    temp.innerHTML = html;
    return temp.firstChild;
}

// options
body.appendChild(create_element("<div id='settings'></div>"));
let settings = document.getElementById("settings");
function new_option(name, defaultv) {
    // 创建一个设置项目
    // name：设置项目名称
    // defautlv：是否默认启用
    let option = create_element("<div class='option'>\
<div class='container'>\
<div class='" + defaultv + "' onclick=''></div>\
<span class='opvalue'>" + name + "</span></div></div>");
    settings.appendChild(option);
}
new_option("启用光标圆圈", "disabled")
document.appendChild(settings);

// 光标提示
body.appendChild(create_element("<div id='cur-circle'></div>"));
let cur = document.getElementById("cur-circle");
function show_cur(ev) {
    // 通过处理鼠标移动事件的方式来显示gu光标提示
    cur.style.left = ev.pageX - 100 + "px";
    cur.style.top = ev.pageY - 100 + "px";
}
body.onmousemove = show_cur;
