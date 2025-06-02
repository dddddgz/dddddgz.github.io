const $ = str => document.querySelector(str);
const $all = str => document.querySelectorAll(str);
const classList = $('body').classList;
if (classList.contains('notready')) {
    $('#main').innerHTML = `
        <h1 style="color: green;">本页未完工/维护中，过几天再来看看？O_o</h1>
        <h2><span id="countdown" style="font-size: larger; font-weight: bold">5</span>&nbsp;秒后自动跳转至上一页……</h2>
    `;
    const interval1 = setInterval(() => {
        if (($('#countdown').innerHTML -= 1) <= 0) {
            clearInterval(interval1);   // 不再进行倒计时
            window.history.back()
        }
    }, 1000);
}

const temp = document.createElement('p');
function newElement(innerHTML) {
    temp.innerHTML = innerHTML;         // 步骤：往 <p> 里面定义一个元素；
    return temp.firstChild;             // 获取这个元素
}

// 导航栏
const navbar = document.getElementById('navbar');
function addToNavbar(text, url) {
    // 向导航栏中添加一个链接
    navbar.appendChild(newElement(`<a href="${url}">${text}</a>`))
}
// 添加导航栏标题
navbar.appendChild(newElement('<a class="title" href="/">dddddgz 的个人网站</a>'));
addToNavbar('主页', '/');
addToNavbar('关系测试', '/relationship.html');
addToNavbar('拼音工具', '/pinintool.html');
addToNavbar('原创作品', '/zuopin.html');
addToNavbar('网站历史', '/history.html');
addToNavbar('友情链接', '/friendlink.html');
addToNavbar('↗ Follow (GitHub)', 'https://github.com/dddddgz');
addToNavbar('↗ FishC 账号', 'https://fishc.com.cn/space-uid-1518166.html');

// 接下来的都是处理编写 HTML 时简化的部分
// 加上备案
$('#icp').innerHTML = '备案：<a href="https://icp.gov.moe/?keyword=20255504">萌ICP备20255504号</a>';
// <a> 标签可以指向 FishC 论坛中的帖子、用户
$all('a').forEach(element => {
    if (uid = element.getAttribute('uid'))
        // 这个链接指向一个 FishC 用户
        element.href = `https://fishc.com.cn/space-uid-${uid}.html`;
    else if (tid = element.getAttribute('tid'))
        // 指向一个主题
        if (pid = element.pid)
            // 具体到主题中的一个帖子
            element.href = `https://fishc.com.cn/forum.php?mod=redirect&goto=findpost&ptid=${tid}&pid=${pid}`;
        else
            element.href = `https://fishc.com.cn/thread-${tid}-1-1.html`;
    if ((content = element.innerHTML) && !(href = element.href))
        element.href = 'https://' + content;    // 链接地址和其内容相同，由 js 自动补充完整
    if (element.href && element.href.startsWith('https://')) {
        element.title = href;                   // 链接通向站外，添加提示
        element.target = '_blank';              // 新标签页打开
    }
});
// 表格（html 默认的表格样式似乎并不好看）
$all('table').forEach(element => {
    element.setAttribute('cellspacing', '0');   // JavaScript 坑真多，这里为什么又不能直接 .cellspacing = 了？？？
});
// 脚注
let notes = $all('#note li'), i = 0;
$all('nt').forEach(element => {
    if (nid = element.getAttribute('nid')) {    // 不是 这里也不能直接 .nid。。。
        // 手动指定脚注序号
        i = nid - 1;
    }
    element.title = notes[i].innerText;         // innerText 只是元素显示的文本，不显示具体 HTML 代码
    // 序号从 1 开始，刚好可以 ++i（++i 等效于 i = i + 1）
    element.innerHTML = `<sup><a href="${href = notes[i].querySelector('a').href}" target="_blank">[${++i}]</a></sup>`;
});
// 复选框
$all('checkbox').forEach(element => {
    if (element.hasAttribute('checked'))
        // 能找到属性算作 true，否则 false
        element.innerHTML = '✅';
    else
        element.innerHTML = '❎';
        element.removeAttribute('checked');
    element.onclick = () => {
        element.innerHTML = element.innerHTML == '✅' ? '❎' : '✅';
        eval(element.onchange)();
    };
});
