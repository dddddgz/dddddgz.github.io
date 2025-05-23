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
addToNavbar('友情链接', '/friendlink.html');
addToNavbar('关系测试（未完工）', '/relationship.html');
addToNavbar('拼音工具', '/pinintool.html');
addToNavbar('↗ View on GitHub', 'https://github.com/dddddgz/dddddgz.github.io');
addToNavbar('↗ FishC 账号', 'https://fishc.com.cn/space-uid-1518166.html');

// 接下来的都是处理编写 HTML 时简化的部分
// 加上备案
$('#main').appendChild(newElement('<a href="https://icp.gov.moe/?keyword=20255504" target="_blank">萌ICP备20255504号</a>'));
// 使鼠标悬浮在链接上时显示链接真实地址
$all('a').forEach(element => {
    if ((href = element.getAttribute('href')) && href.startsWith('https://')) {
        // 链接通向站外，添加提示
        element.setAttribute('title', href);
    }
});
// 处理简化的链接（<fcpost>、<fcuser>）
$all('fcpost').forEach(element => {
    let url, tid = element.getAttribute('tid');
    if (pid = element.getAttribute('pid')) {
        // 指定了具体帖子，而不是仅仅一个主题
        url = `https://fishc.com.cn/forum.php?mod=redirect&goto=findpost&ptid=${tid}&pid=${pid}`;
    } else {
        url = `https://fishc.com.cn/thread-${tid}-1-1.html`;
    }
    element.setAttribute('onclick', `window.location.href = '${url}';`);
    element.setAttribute('title', `FishC 论坛的帖子（${url}）`);
});
$all('fcuser').forEach(element => {
    let url = `https://fishc.com.cn/space-uid-${element.getAttribute('uid')}.html`;
    element.setAttribute('onclick', `window.location.href = '${url}';`);
    element.setAttribute('title', `FishC 论坛的用户（${url}）`);
});
