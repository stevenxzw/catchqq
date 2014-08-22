/**
 * Created by zhiwen on 14-3-24.
 */

(function(AT, $$, win){

    //AT.config.host = 'http://localhost:3002';
    AT.config.host = 'http://'+location.host;
    function isLogin(){
        appendJS('http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t='+(+new Date), function(r){
            try {
                if (data0.err == '1026') {//已登录,取空间UID

                } else {
                    alert('请先登录webQQ');
                }
            } catch (e) {

            }
        }, function(){

        }, 'appUin');

    }

    function getGTK(str){
        var hash = 5381;

        for(var i = 0, len = str.length; i < len; ++i){
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        }

        return hash & 0x7fffffff;
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
        var qq = localStorage.getItem('qq'), skey = localStorage.getItem('skey'),
            timer = null, maxTime = 450;
        $scope.errmsg = false;
        isLogin();

            var obj = {
            'qqlist': '154036777\n1957719679\n9874444',
           // 'lists':[{ qq:"154036777", cb:"中国:广东:广州"},{ qq:"9874444", cb:"山东:日照"}],
            'lists':[],
            num : 0,
            msg :'本次请求数已超'+maxTime+'次，暂停读取，10分钟后恢复',
            area : '',
            ajaxTime : 0,
            skey :skey || '@jVCjp2xFg',
            kcode : '',
            qq : qq || 154036777
        };

        $$('#p1start').prop('disabled', false);
        $scope.obj = obj;
        $scope.itemClick = function(e, item) {
            e.preventDefault();
            var buttonValue = e.target.value;
            switch(buttonValue){

                case 'p1start':
                    obj.ajaxTime  = 0;
                    $scope.errmsg = false;
                    var lists = obj.qqlist;
                    $scope.$digest();
                    clearTimeout(timer);
                    if($.trim(lists)){
                        e.target.disabled = true;
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
                        jqform.find('#earea').val($$.trim(obj.area));
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
            obj.ajaxTime++;
            if(r.ret === 0 && r.message === 'succ'){
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
                //unlogin = true;
                //alert('请先登录')
            }else if(r.ret === 0 && r.message === "system ApiFrequencyContrl error, please try later."){
                unlogin = true;
                alert('请求过多帐号被封');
            }

        }
           function gets(ls, fn){
               if(unlogin){
                   //alert('请先登录');
                   return;
               }

               if(ls.length){
                   var item = ls.shift();
                   var uri = 'http://search.qzone.qq.com/cgi-bin/qzonesoso/cgi_qzonesoso_smart?uin=79186391&' +
                       'search=154036777&entry=1&searchid=79186391_1406603025191_2287608951&g_tk=688011432';
                   appendJS('http://search.qzone.qq.com/cgi-bin/qzonesoso/cgi_qzonesoso_smart?uin='+qq+'&search='+item+'&' +
                       'entry=1&searchid='+qq+'_1406542609879_3773076217&g_tk='+gtk, function(r){
                        setTimeout(function(){
                            if(obj.ajaxTime < maxTime)
                                gets(ls, fn);
                           else{
                                $scope.errmsg = true;
                                $$('#p1stop').prop('disabled', true);
                                $$('#p1start').prop('disabled', false);
                                obj.qqlist = ls.join('\n');
                                //$$('#qqs').val(ls.join('\n'));
                                $scope.$digest();
                                timer = setTimeout(function(){
                                    $$('#p1start').click();
                                    //gets(ls, fn);
                                },600000);
                            }
                        }, 1000);

                   }, function(){


                   }, 'gqz');
               }else{
                   obj.qqlist = '';
                   $scope.$digest();
                   fn(true);
               }

           }


    }])
    .controller('Get', ['$scope','$http','$compile',function($scope,$http,$compile){
            //appendJS('http://c.v.qq.com/vuserfolders?otype=json&callback=cb');
            //59.41.33.218
            isLogin();
            var socket = io.connect(AT.config.host);
            //var socket = io.connect('http://localhost:3002');
            $$('#getArea').prop('disabled', false);
            //导出xls
            socket.on('outxls', function(d){
                jQuery('body').append('<iframe src="'+d+'" style="display:none;"></iframe>');
            })
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

            var _praise = localStorage.getItem('praise'), praiseTimer = null;

            //localStorage.setItem("qq", window.qq);
            //localStorage.setItem("skey",obj.skey);
            /*---------------------------点赞QQ 功能部分------------------------------*/
            var praise = {
                qq : '',
                bqq : '732952649',//文章主空间QQ
                aid : '1408498303',//文章ID
                name : '酷酷口语',
                skey : '',
                num : 0,
                uri:'blog',
                ajaxTime : 0,
                lin: 0,
                beginQQ : 0,
                tgk : '',
                restart : 1,
                timenumber: 24
            };
            if(_praise){
                jQuery.extend(praise, JSON.parse(_praise));
            }
            function getPraise(page, beginQQ){
                if(!page){
                    page = 0;
                    beginQQ = 0;
                }
                var _page = page === 0 ? 1 : 0;
                appendJS('http://users.qzone.qq.com/cgi-bin/likes/get_like_list_app?uin='+praise.qq+'&' +
                    'unikey=http://user.qzone.qq.com/'+praise.bqq+'/'+praise.uri+'/'+praise.aid+'&begin_uin='+beginQQ+'&' +
                    'query_count=60&if_first_page='+_page+'&g_tk='+gtk, function(r){

                    return

                }, function(){


                }, 'gqz');


            }

            window['_Callback'] = function(r){
                if(r && r.data.like_uin_info){
                    var od = r.data.like_uin_info, rd = [], beginQQ = '';
                    for(var i= 0,len = od.length;i<len;i++){
                        rd.push({
                            q : od[i].fuin,
                            n :  od[i].nick,
                            gd : od[i].gender,
                            c : od[i].constellation,
                            ad :od[i].addr
                        });
                        beginQQ = od[i].fuin;
                    }
                    if(rd.length){
                        var param = "blogid="+praise.aid+"&bn="+praise.name+"&qid="+praise.bqq;
                        $http.post('http://'+location.host+'/api/sendpraise?'+param,{lists : rd } ).success(function(r){
                           if(r.errno == '0'){
                               praise.num++;
                               praise.lin += r.rst.len;
                               localStorage.setItem('praise', JSON.stringify(praise));
                               praiseTimer = setTimeout(function(){getPraise(1, beginQQ);}, 2000);
                           }else{
                                alert(r.err)
                           }
                        });
                    }else{
                        alert('没有可导入数据');
                    }
                }

            }

            /*-------------------------功能部分结束 ------------------------------------------*/

            //浏览文章QQ 功能部分
            var blog = {
                qq : '448530028',
                id : '6c06bc1ae975b353c45c0d00',
                name : '酷酷口语',
                timer : 40000,
                area : '广州',
                num : 0,
                etype : 'blogqq',
                timenumber: 24
            };

            //浏览文章QQ

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

            $scope.praise = praise;

            $scope.searchArea = {

                num : 0,

                show : false
            };

            /*-----------------------导出部分-----------------------*/

            $scope.exportObj = exportObj = {

                qq : '',

                id : '',

                name : '',

                area : '',

                etype : 'blogqq',

                show : false,

                num : 0

            };
            var _exportObj = localStorage.getItem('exportObj');
            if(_exportObj){
                $.extend(exportObj, JSON.parse(_exportObj));
                exportObj.show = false ;
            }

            /*-----------------------导出部分结束-----------------------*/


            $scope.itemClick = function(e, item) {
                e.preventDefault();
                var buttonValue = e.target.value;
                switch(buttonValue){

                    case 'p5start':
                        e.target.disabled = true;
                        window.qq = $$.trim(praise.qq);
                        window.gtk = getGTK($$.trim(praise.skey));
                        localStorage.setItem('praise', JSON.stringify(praise));
                        if(praise.restart == '0'){//先找到最后一个QQ号
                            $http.get('http://'+location.host+'/getBeginQQ?bid='+praise.aid+'&qid='+praise.bqq).success(function(r){
                                if(r.errno == '0'){
                                    if( r.rst.result.length)
                                        getPraise(1, r.rst.result[0].qq);
                                    else{
                                        praise.num = 0;
                                        praise.lin = 0;
                                        localStorage.setItem('praise', JSON.stringify(praise));
                                        getPraise(0,'');
                                    }
                                }else
                                    alert(r.err);
                            });

                        }else{
                            getPraise(praise.ajaxTime, praise.beginQQ);
                        }
                        break;

                    case 'p5stop':
                        var jqp  = $(e.target).parent();
                        jqp.children().eq(0).prop('disabled', false);
                        clearTimeout(praiseTimer);
                        praiseTimer = null;
                    break;

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

                        var param = "id="+exportObj.id+"&name="+exportObj.name+"&area="+exportObj.area+"&qzoneid="+exportObj.qq+'&etype='+exportObj.etype;
                            src = AT.config.host+'/excel?'+param;
                        //jQuery('body').append('<iframe src="'+src+'" style="display:none;"></iframe>');
                       // return;
                        $http.get(src).success(function(r){
                            $scope.exportObj.num = '请等待...';
                            $scope.exportObj.show = true;
                        });
                    break;
                    case 'part3json':
                        //socket.emit('xls-client',{});
                        var  src = AT.config.host+'/xlxs';
                        jQuery('body').append('<iframe src="'+src+'" style="display:none;"></iframe>');
                        return;
                        var param = "id="+exportObj.id+"&name="+exportObj.name+"&area="+exportObj.area+"&qzoneid="+exportObj.qq;
                        src = AT.config.host+'/json?'+param;
                        $http.get(src).success(function(r){
                            console.log(r);
                        });
                        break;
                    case 'part3count' :
                        var param = "qzoneid="+exportObj.qq+"&id="+exportObj.id+"&name="+exportObj.name+"&area="+exportObj.area+'&etype='+exportObj.etype;
                        //var param = "id="+blog.id+"&name="+blog.name,
                        src = AT.config.host+'/excelcount?'+param;
                        $http.get(src).success(function(r){
                            $scope.exportObj.num = r.num;
                            $scope.exportObj.show = true;
                            localStorage.setItem('exportObj', JSON.stringify(exportObj));
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
