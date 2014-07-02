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
            return function(r, l){
                var len = r.length;

               return AT.Util.byteCut(r, 18||l);
            }

        }).filter('limitNull', function(){
            return function(r){


                return r?r:'-';
            }
        });

    myApp.controller('qqControl', ['$scope','$http','$compile',function($scope,$http,$compile){
        $scope.users = users;
        $scope.pages = pages;
        $scope.ps = ps;
        /*
        var info = {list:users};
        info.blogid = users[3].blogid;
        info.blogname =users[3].blogname;
        var d = JSON.stringify(info);
        appendJS('http://arcane-escarpment-5810.herokuapp.com/api/sendqq?q='+d, function(){
            console.log('save ok');

        }, function(){

            console.log('save error=============');
        });
        */





    }])
    .controller('Get', ['$scope','$http','$compile',function($scope,$http,$compile){
            //appendJS('http://c.v.qq.com/vuserfolders?otype=json&callback=cb');
            //59.41.33.218
            var blog = {
                qq : '448530028',
                id : '6c06bc1ae975b353c45c0d00',
                name : '酷酷口语',
                timer : 20000,
                area : '广州',
                num : 0,
                timenumber: 6
            };

            $scope.blog = blog;

            $scope.itemClick = function(e, item) {
                e.preventDefault();
                var buttonValue = e.target.value;
                switch(buttonValue){

                    case 'getArea':
                        e.target.disabled = true;
                        $http.get(AT.config.host+'/getAreaByQQ').success(function(r){
                           console.log('success');
                        });
                    break;

                    case 'p1start':
                        //e.target.disabled = true;
                        getQQ($scope.blog, function(re){
                            if(re){
                                $scope.blog.num++;
                                $scope.$digest();
                            }
                        });
                    break;
                    case 'p1stop':
                        var jqp  = $(e.target).parent();
                        jqp.children().eq(0).prop('disabled', false);
                        clearTimeout(gstimer);

                    break;

                    case 'part3excel':
                        var param = "id="+blog.id+"&name="+blog.name+"&area="+blog.area;
                        //var param = "id="+blog.id+"&name="+blog.name,
                            src = AT.config.host+'/excel?'+param;
                        jQuery('body').append('<iframe src="'+src+'" style="display:none;"></iframe>');
                        //$http.get(AT.config.host+'/excel?'+param, blog).success(function(r){

                       // });
                    break;
                }
                $scope.$emit('haha', function(){


                });
                //var rel = new Event({target:e.target, end:e.currentTarget});
            }

            $scope.$on('haha', function(){

                console.log('----');
            })

    }]);



})(Atong, jQuery, window);

var gstimer = null;
function getQQ(blog, fn){
    //可修改参数
    var uin = blog.qq,//qqid或者空间id
    //blogid = '6c06bc1ac125aa5305030e00',//文章或者博客id
        blogid = blog.id,
        blogName=blog.name,//blog名称
        ip = '192.168.1.188',//我的IP
        delayTime = blog.timer,//延迟时间1000表示1秒
        timenumber = blog.timenumber;//每次取访客量
    //http://192.168.1.112/init/tables 初如数据表

    //可修改参数结束


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
                    var script = document.getElementById(id);
                    document.getElementsByTagName('HEAD').item(0).removeChild(script);
                }
            };
        } else {
            oScript.onload = function() {
                window.setTimeout(success, 10);
                var script = document.getElementById(id);
                document.getElementsByTagName('HEAD').item(0).removeChild(script);
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

    function get(){
        appendJS('http://g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_single?uin='+uin+'&appid=311&blogid='+blogid+'&param='+blogid+'&ref=qzfeeds&beginNum=1&num='+timenumber+'&g_tk=1923002575&ptlang=2052', function(){

            //console.log('------请求成功!');
            //send(r);
            //setTimeout(get, delayTime);
        }, function(){
            console.log('请求失败!')
            gstimer = setTimeout(get, delayTime);
        }, 'myscript')


    }

    function send(data){
        var d = JSON.stringify(data);
        appendJS('http://'+ip+':3000/api/sendqq?q='+d, function(){
            //appendJS('http://arcane-escarpment-5810.herokuapp.com/api/sendqq?q='+d, function(){
            console.log('save ok');
        }, function(){
            console.log('save error=============');
        }, 'resultscript');

    }
    get();

    window['_Callback'] = function(result){
        //console.log(result.data);
        if(result.message === 'succ'&& result.data){
            fn && fn(true);
            result.data.blogid = blogid;
            result.data.blogName = blogName;
            send(result.data);

        }else{
            console.log('官方错误信息：'+result.message);

        }


        gstimer = setTimeout(get, delayTime);
    }

}







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
