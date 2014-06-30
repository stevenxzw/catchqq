/**
 * Created by zhiwen on 14-6-27.
 * 使用方法：在浏览器(chrome\firefox)登录QQ空间或者QQ邮箱之类QQ第三方登录应用,在浏览器开发工具下插入以下脚本运行
 * http://http://arcane-escarpment-5810.herokuapp.com/init/tables 初如数据表
 * http://http://arcane-escarpment-5810.herokuapp.com/blogqq 查看结果
 *  http://http://arcane-escarpment-5810.herokuapp.com/getAreaByQQ 转换地区
 *
 */

(function(){
    //可修改参数
    var uin = '448530028',//qqid或者空间id
        blogid = '6c06bc1ac125aa5305030e00',//文章或者博客id
        blogName='测试',//blog名称
        ip = '192.168.1.112',//我的IP
        delayTime = 20000,//延迟时间1000表示1秒
        timenumber = 24;//每次取访客量
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

    function get(){

        appendJS('http://g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_single?uin='+uin+'&appid=311&blogid='+blogid+'&param='+blogid+'&ref=qzfeeds&beginNum=1&num='+timenumber+'&g_tk=1923002575&ptlang=2052', function(){

            console.log('------请求成功!');
            //send(r);
            setTimeout(get, delayTime);

        }, function(){
            console.log('请求失败!')
            setTimeout(get, delayTime);
        }, 'myscript')


    }

    function send(data){
        var d = JSON.stringify(data);
        appendJS('http://arcane-escarpment-5810.herokuapp.com/api/sendqq?q='+d, function(){
            console.log('save ok');

        }, function(){

            console.log('save error=============');
        });

    }
    get();

    window['_Callback'] = function(result){
        console.log(result.data);

        if(result.message === 'succ'&& result.data){
            result.data.blogid = blogid;
            result.data.blogName = blogName;
            send(result.data);

        }else{
            console.log('官方错误信息：'+result.message);

        }


        setTimeout(get, delayTime);
    }
})();
