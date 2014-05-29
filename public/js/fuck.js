/**
 * Created by zhiwen on 14-5-23.
 */


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
