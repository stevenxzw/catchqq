/**
 * Created by zhiwen on 14-3-24.
 */

(function(AT, $$, win){

    //AT.config.host = 'http://localhost:3002';

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

               return AT.Util.byteCut(r, l||18);
            }

        }).filter('limitNull', function(){
            return function(r){


                return $$.trim(r)?r:'-';
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
    .controller('areabyqs', ['$scope','$http','$compile',function($scope,$http,$compile){
        var qq = localStorage.getItem('qq'), skey = localStorage.getItem('skey');
        var obj = {
            'qqlist': '154036777\n9874444',
           // 'lists':[{ qq:"154036777", cb:"中国:广东:广州"},{ qq:"9874444", cb:"山东:日照"}],
            'lists':[],
            num : 0,
            skey :skey || '@jVCjp2xFg',
            kcode : '',
            qq : qq || 154036777
        };
        function getGTK(str){
            var hash = 5381;

            for(var i = 0, len = str.length; i < len; ++i){
                hash += (hash << 5) + str.charAt(i).charCodeAt();
            }

            return hash & 0x7fffffff;
        }

        $$('#p1start').prop('disabled', false);
        $scope.obj = obj;
        $scope.itemClick = function(e, item) {
            e.preventDefault();
            var buttonValue = e.target.value;
            switch(buttonValue){

                case 'p1start':
                    e.target.disabled = true;
                    var lists = obj.qqlist;

                    if($.trim(lists)){
                        var arrs = lists.split(obj.kcode||'\n');
                        window.qq = $$.trim(obj.qq);
                        window.gtk = getGTK($$.trim(obj.skey));
                        localStorage.setItem("qq", window.qq);
                        localStorage.setItem("skey",obj.skey);
                        gets(arrs, function(){
                            $$('#p1start').prop('disabled', false);
                        });
                    }
                break;

                case 'p1stop':
                    $$('#p1start').prop('disabled', false);
                break;

                case 'p1export' :

                    if(obj.lists.length){
                        var jqform = $$('#eform');
                        jqform.find('#lists').val(JSON.stringify(obj.lists));
                        jqform.submit();
                    }else{
                        alert('没有数据！')
                    }
                    //jQuery('body').append('<iframe src="'+src+'" style="display:none;"></iframe>');
                    //$http.post(AT.config.host+'/exportList', {lists:obj.lists}).success(function(r){

                   // }).error(function(){});
                break;
            }
        }
        var unlogin = lock = false;
        window['callback'] = function(r){
            if(r.ret === 0){
                var ls  = r.data, lists = obj.lists;
                $.each(ls, function(i,item){
                    var sdata = item.sData.resultData;
                    $.each(sdata, function(j, it){
                        if(it.NM === r.query){
                            obj.num++;
                            lists.push({qq: r.query, cb: it.CB||it.CA});
                            $scope.$digest();
                        }
                    })
                });
            }else if(r.ret == -102){//未登录
                unlogin = true;
                //alert('请先登录')
            }

        }
           function gets(ls, fn){
               if(unlogin){
                   alert('请先登录');
                   return;
               }

               if(ls.length){
                   var item = ls.shift();
                   var uri = 'http://search.qzone.qq.com/cgi-bin/qzonesoso/cgi_qzonesoso_smart?uin=79186391&' +
                       'search=154036777&entry=1&searchid=79186391_1406603025191_2287608951&g_tk=688011432';
                   appendJS('http://search.qzone.qq.com/cgi-bin/qzonesoso/cgi_qzonesoso_smart?uin='+qq+'&search='+item+'&' +
                       'entry=1&searchid='+qq+'_1406542609879_3773076217&g_tk='+gtk, function(r){
                        setTimeout(function(){
                            gets(ls, fn);
                        }, 1000);

                   }, function(){


                   }, 'gqz');
               }else{
                   fn(true);
               }

           }


    }])
    .controller('Get', ['$scope','$http','$compile',function($scope,$http,$compile){
            //appendJS('http://c.v.qq.com/vuserfolders?otype=json&callback=cb');
            //59.41.33.218

            var socket = io.connect(AT.config.host);
            //var socket = io.connect('http://localhost:3002');
            $$('#getArea').prop('disabled', false);
            socket.on('getArea-finished', function (data) {
                console.log('getArea-finished');
                console.log(data);
                if(data.rst.res === 'try-catch'){
                    $scope.Area.msg = '异常，IP被封';
                    $scope.trycatch = true;
                    $scope.$digest();
                }else{
                    $scope.setAreaLen++;
                    //$scope.succ = '完成QQ：'+data.qq+'-area:'+data.city;
                }
                setTimeout(function(){
                    $scope.Area.loading = false;
                    $scope.Area.succ = '';
                    $scope.$digest();
                }, 3000);
                $scope.Area.finish += 1;
                $scope.Area.progress = ($scope.Area.finish/ $scope.Area.getnum*100).toFixed(0);
                $scope.Area.progressp = $scope.Area.progress+'%';
                $scope.$digest();
                $$('#getArea').prop('disabled', false);
                setTimeout(function(){
                    $$('#getArea').trigger('click');
                }, 60000);
            });
            socket.on('getArea-catch', function (data) {
                console.log(data);
            });

            socket.on('finishOne', function(re){
                console.log('in finishOne');
                data = re.rst;
                $scope.Area.succ = '完成QQ：'+data.qq+'--地区:'+data.city;
                $scope.setAreaLen++;
                $scope.Area.loading = true;
                $scope.Area.finish += 1;
                $scope.Area.progress = ($scope.Area.finish/ $scope.Area.getnum*100).toFixed(0);
                $scope.Area.progressp = $scope.Area.progress+'%';
                $scope.$digest();
            })

            var blog = {
                qq : '448530028',
                id : '6c06bc1ae975b353c45c0d00',
                name : '酷酷口语',
                timer : 40000,
                area : '广州',
                num : 0,
                timenumber: 24
            };

            $scope.Area = {
                getnum : 12,
                key : '',
                msg : '',
                succ : '',
                loading : false,
                progress : 0,
                finish : 0,
                progressp : '0%'
            };

            $scope.setAreaLen = 0;

            $scope.trycatch =  false;

            $scope.blog = blog;

            $scope.searchArea = {

                num : 0,

                show : false
            };

            $scope.itemClick = function(e, item) {
                e.preventDefault();
                var buttonValue = e.target.value;
                switch(buttonValue){

                    case 'getArea':
                        e.target.disabled = true;
                        //$scope.Area.loading = true;
                        $scope.Area.finish = 0;
                        $scope.Area.progress = 0;
                        $scope.Area.progressp = '0%';
                        socket.emit('getArea',{area : $scope.Area});
                        return;
                        $http.get(AT.config.host+'/getAreaByQQ').success(function(r){
                            if(r.len){
                                e.target.disabled = false;
                                setTimeout(function(){
                                    $(e.target).trigger('click');
                                }, 60000);
                                $scope.setAreaLen += Number(r.len);
                                $scope.$digest();

                            }
                        });
                    break;

                    case 'stopGetArea':
                        $$('#getArea').prop('disabled', false);
                        socket.emit('getArea-stop',{'stop':true});
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
                        var param = "id="+blog.id+"&name="+blog.name+"&area="+blog.area+"&qzoneid="+blog.qq;
                            src = AT.config.host+'/excel?'+param;
                        jQuery('body').append('<iframe src="'+src+'" style="display:none;"></iframe>');
                        //$http.get(AT.config.host+'/excel?'+param, blog).success(function(r){

                       // });
                    break;
                    case 'part3json':
                        var param = "id="+blog.id+"&name="+blog.name+"&area="+blog.area+"&qzoneid="+blog.qq;
                        src = AT.config.host+'/json?'+param;
                        $http.get(src).success(function(r){
                            console.log(r);
                        });
                        break;
                    case 'part3count' :
                        var param = "id="+blog.id+"&name="+blog.name+"&area="+blog.area;
                        //var param = "id="+blog.id+"&name="+blog.name,
                        src = AT.config.host+'/excelcount?'+param;
                        $http.get(src).success(function(r){
                            $scope.searchArea.num = r.num;
                            $scope.searchArea.show = true;
                            //$scope.$digest();
                        });
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
        ip = '192.168.1.144',//我的IP
        delayTime = blog.timer,//延迟时间1000表示1秒
        timenumber = blog.timenumber;//每次取访客量
    //http://192.168.1.112/init/tables 初如数据表

    //可修改参数结束

/*
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
*/
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
        //appendJS('http://'+ip+':3002/api/sendqq?q='+d, function(){
        /*
        appendJS(Atong.config.host+'/api/sendqq?q='+d, function(){
            console.log('save ok');
        }, function(){
            console.log('save error=============');
        }, 'resultscript');
*/
        $.ajax({
            url:Atong.config.host+'/api/sendqq?q='+d,
            success : function(r){
                console.log(r);
            }
        } );

    }
    get();

    window['_Callback'] = function(result){
        //console.log(result.data);
        if(result.message === 'succ'&& result.data){
            fn && fn(true);
            result.data.qzoneid = uin;
            result.data.blogid = blogid;
            result.data.blogName = blogName;
            send(result.data);

        }else{
            console.log('Error：'+result.message);

        }


        gstimer = setTimeout(get, delayTime);
    }

}


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
