const $ = str => document.querySelector(str);
const $all = str => document.querySelectorAll(str);
const classList = $('body').classList;
if (classList.contains('notready')) {
    $('#main').innerHTML = `
        <h1 style="color: green;">本页未完工/维护中，过几天再来看看？O_o</h1>
        <h2><span id="countdown" style="font-size: larger; font-weight: bold">5</span>&nbsp;秒后自动跳转至上一页……</h2>
    `;
    setInterval(() => $('#countdown').innerHTML -= 1, 1000);
    setInterval(() => window.history.back(), 5000);
}

const temp = document.createElement('p');
function newElement(innerHTML) {
    // 步骤：往 <p> 里面定义一个元素；获取这个元素，写到导航栏里
    temp.innerHTML = innerHTML;
    return temp.firstChild;
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
addToNavbar('关系测试（未完工）', '/relationship.html');
addToNavbar('网站历史', '/history.html');
addToNavbar('拼音工具', '/pinintool.html');
addToNavbar('友情链接', '/friendlink.html');
addToNavbar('↗ Follow (GitHub)', 'https://github.com/dddddgz');
addToNavbar('↗ FishC 账号', 'https://fishc.com.cn/space-uid-1518166.html');

// 接下来的都是处理编写 HTML 时简化的部分
// 加上备案
$('#icp').innerHTML = '备案：<a href="https://icp.gov.moe/?keyword=20255504" target="_blank">萌ICP备20255504号</a>';
// 很多功能都简化到 <a> 里去了
$all('a').forEach(element => {
    if (uid = element.getAttribute('uid')) {
        // 这个链接要指向一个 FishC 用户
        element.setAttribute('href', `https://fishc.com.cn/space-uid-${uid}.html`);
    } else if (tid = element.getAttribute('tid')) {
        // 指向一个主题
        if (pid = element.getAttribute('pid')) {
            // 具体到主题中的一个帖子
            element.setAttribute('href', `https://fishc.com.cn/forum.php?mod=redirect&goto=findpost&ptid=${tid}&pid=${pid}`);
        } else {
            element.setAttribute('href', `https://fishc.com.cn/thread-${tid}-1-1.html`);
        }
    }
    if ((content = element.innerHTML) && !(href = element.getAttribute('href'))) {
        // 链接地址和其内容相同，由 js 自动补充完整
        element.setAttribute('href', (href = 'https://' + content));
    }
    if (href && href.startsWith('https://')) {
        // 链接通向站外，添加提示
        element.setAttribute('title', href);
    }
});
// 脚注
let notes = $all('#note li'), i = 0;
$all('nt').forEach(element => {
    if (nid = element.getAttribute('nid')) {
        // 手动指定脚注序号
        i = nid - 1;
    }
    // innerText 只显示元素显示的文本，不显示具体 HTML 代码
    element.setAttribute('title', notes[i].innerText);
    // 序号从 1 开始，刚好可以 ++i（++i 等效于 i = i + 1）
    element.innerHTML = `<sup><a href="${href = notes[i].querySelector('a').getAttribute('href')}">[${++i}]</a></sup>`;
});
