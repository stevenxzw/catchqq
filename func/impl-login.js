/**
 * Created by steven on 14-7-19.
 * 模拟登录功能
 */

(function(){
    var mongo = require('./mongo-skin.js').skin,
        cutil = require('./../func/cutil').util,
        excelfn = require('./../func/exportExcel'),
        _debug = global._debug,
        qqlist = global.qqlist,
        timer = null,
        stopChangeArea = false;//停止获取QQ地区

    var xmlreader = require('xmlreader');
    var nodegrass = require('nodegrass');
    var mostTimer = 50, thtimer = 0;
    var https=require("https");
    var http=require("http");
    exports.ImplLogin = {

        qqmail : function(req, res){

            var querystring=require("querystring");


            var contents=querystring.stringify({
                password:"16BE007AC8DF4F87C4DD5CB6A91B54F4",
                username:"79186391"
            });
            var actions= '18-42-'+(+new Date);
            var options={
                host:"ssl.ptlogin2.qq.com",
                path:'/login?u=79186391&verifycode=!BXM&p=16BE007AC8DF4F87C4DD5CB6A91B54F4&pt_rsa=0&u1=' +
                'https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3Dloginpage%26target%3D%26account' +
                    '%3D79186391&ptredirect=1&h=1&t=1&g=1&from_ui=1&ptlang=2052&action='+actions+'&js_ver=10085&js_type=1' +
                    '&login_sig=xUeiqBATd0I46ld18*NaVnCa7GM3VoGoy6sVHtoelo67CufOp*at2q*yyWENiZRN&pt_uistyle=25&aid=522005705&daid=4',
                method:"get",
                headers:{
                    "Content-Type":"application/x-javascript; charset=utf-8",
                    "Content-Length":contents.length,
                    "Accept":"*/*",
                    "Accept-Language":"zh-CN,zh;q=0.8",
                    "Cache-Control":"no-cache; must-revalidate",
                    "Connection":"Keep-Alive",
                    "Host":"ssl.ptlogin2.qq.com",
                    'cookie':'pgv_pvid=6816909464; RK=CFNeAhIwYG; ptcz=3741e21ac003d92207a909c3a6a347e2e47f1b30f825733330aa92b4a6ca8f2f;' +
                        ' pt2gguin=o0154036777; chkuin=154036777; ptisp=ctc; uikey=b2cbe6de8e2ccb85867e0660b732dd5ec674becc52b95b8d5782a5e4fb0acbe8; verifysession=h02eefOm-5SaGQzzZ_m-kcJatTvuc7pXE6tizisms8BxXWe4MqEBt9Wcr6a_7WM1n-yaa6DiuwQYnkxdXIpUYF9jA**; confirmuin=154036777;' +
                        ' ptvfsession=32306027dbca240c7d853183284e010cb71d06b827af86e92d26c07d6e1a5972f9ade6f64eda591878af61099afe9016; ptui_loginuin=79186391',
                    "Referer":"https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=522005705&daid=4&s_url",

                    "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)"
                }
            };


            var req=https.request(options,function(res){
                res.setEncoding("utf8");
                var headers=res.headers,resData='';
                //console.log(headers);
                var cookies=headers["set-cookie"];
                ;
                //cookies.forEach(function(cookie){
                //    console.log(cookie);
                //});
                console.log(cookies);
                res.on("data",function(data){
                    resData +=data;
                    //console.log(data);
                    var cookies=headers["set-cookie"];

                    console.log('cookie------------');
                    console.log(cookies);
                    return;
                    nodegrass.get("http://"+host+"/admin/users",function(data,status,headers){

                        console.log(data);
                    }, options);
                });

                // 在数据发送完毕后触发
                res.on("end", function() {
                    // querystring.parse功能: 就是解析...比如一个object会把它解析成object
                    console.log(querystring.parse(resData));
                });
            });

            req.write(contents);
            req.end();

        },


        qqmailcheck : function(req, res){
            var fs= require('fs');

            fs.readFile('C:/Users/zhiwen/Desktop/script.txt','utf-8',function(err,data){
                if(err){
                    console.error(err);
                }else{
                    console.log(data);
                }
            });
            console.log("Ending ..");

            return;
            var querystring=require("querystring");
            var options={
                host:"search.qzone.qq.com",
                path:'/cgi-bin/qzonesoso/cgi_qzonesoso_smart?uin=79186391&search=1540111&entry=1&' +
                    'searchid=79186391_1406197096428_2599753718&g_tk=290974562',
                method:"get",
                headers:{
                    "Content-Type":"application/x-javascript; charset=utf-8",
                    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Accept-Language":"	zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3",
                    "Host":"search.qzone.qq.com",
                    'cookie':'__Q_w_s__QZN_TodoMsgCnt=1; __Q_w_s_hat_seed=1; __Q_w_s__appDataSeed=1; RK=8MNeFDIRbk; pgv_pvi=2718550016; pgv_info=ssid=s4449184160; pgv_pvid=6974641504; o_cookie=154036777; ptui_loginuin=79186391; ptisp=ctc; ptcz=56144815b01f9e204a3c0464841860c7d04502ff6297588a2744516d26992e5e; pt2gguin=o0079186391; uin=o0079186391; skey=@hyjc8YRc3; p_uin=o0079186391; p_skey=pszSqBIg5LiF*5302tJiSEwzJO0XefgXOZi3FCX67Vc_; pt4_token=Yny3I*uEwn*Kv568wXleng__; fnc=2; verifysession=h02FPrAohVi3Wt3VfqDsC5Kqg6KzTWEJCa311dNv8k-dcXc-mUD2VUU_XjzAZ14WOP6RJjwYhknn1D_7REXCiYElg**; Loading=Yes; qzspeedup=sdch; QZ_FE_WEBP_SUPPORT=1; cpu_performance_v8=6; blabla=dynamic'
                }
            };


            var req=http.request(options,function(res){
                res.setEncoding("utf8");
                var headers=res.headers,resData='';
                //console.log(headers);
                var cookies=headers["set-cookie"];
                ;
                //cookies.forEach(function(cookie){
                //    console.log(cookie);
                //});
                console.log(cookies);
                res.on("data",function(data){
                    resData +=data;
                    //console.log(data);
                    var cookies=headers["set-cookie"];

                    console.log('cookie------------');
                    console.log(cookies);
                    return;
                    nodegrass.get("http://"+host+"/admin/users",function(data,status,headers){

                        console.log(data);
                    }, options);
                });

                // 在数据发送完毕后触发
                res.on("end", function() {
                    // querystring.parse功能: 就是解析...比如一个object会把它解析成object
                    console.log('end---');
                    console.log(querystring.parse(resData));
                });
            });

            req.end();

        },

        loginqq : function(){
            var url2 = 'https://ssl.ptlogin2.qq.com/check?uin=79186391&appid=1003903&js_ver=10017&js_type=0&' +
                'login_sig=0ihp3t5ghfoonssle-98x9hy4uaqmpvu*8*odgl5vyerelcb8fk-y3ts6c3*7e8-&u1=http%3A%2F%2Fweb2.qq.com%2Floginproxy.html&' +
                'r=0.8210972726810724';

            var url = 'https://ssl.ptlogin2.qq.com/login?u=79186391&p=16BE007AC8DF4F87C4DD5CB6A91B54F4&verifycode=!BXM&webqq_type=10&remember_uin=1&' +
                'login2qq=1&aid=1003903&u1=http%3A%2F%2Fweb.qq.com%2Floginproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&h=1&' +
                'ptredirect=0&ptlang=2052&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=2-14-32487&' +
                'mibao_css=m_webqq&t=1&g=1&js_type=0&js_ver=10015&login_sig=0ihp3t5ghfoonssle-98x9hy4uaqmpvu*8*odgl5vyerelcb8fk-y3ts6c3*7e8-'
            var url2 = 'https://ssl.ptlogin2.qq.com/login?u=79186391&p=477EE3BBA9C7A642E839ACE55F32C1EE&verifycode=gads&webqq_type=10' +
                '&remember_uin=1&login2qq=1&aid=1003903&u1=http%3A%2F%2Fweb.qq.com%2Floginproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&' +
                'h=1&ptredirect=0&ptlang=2052&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=2-17-15730&mibao_css=m_webqq&' +
                't=1&g=1&js_type=0&js_ver=10031&login_sig=a27Ga1qNTG6ldZNIXhgJJrSHeBBw-OQBmso*pQURbTJcfZ9jNZM3Nk7Hb8ffP9fB';
            var options={
                host:"ssl.ptlogin2.qq.com",
                path : 'https://ssl.ptlogin2.qq.com/login?u=79186391&p=477EE3BBA9C7A642E839ACE55F32C1EE&verifycode=gads&webqq_type=10' +
                    '&remember_uin=1&login2qq=1&aid=1003903&u1=http%3A%2F%2Fweb.qq.com%2Floginproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&' +
                    'h=1&ptredirect=0&ptlang=2052&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=2-17-15730&mibao_css=m_webqq&' +
                    't=1&g=1&js_type=0&js_ver=10031&login_sig=a27Ga1qNTG6ldZNIXhgJJrSHeBBw-OQBmso*pQURbTJcfZ9jNZM3Nk7Hb8ffP9fB',
                method:"get",
                headers:{
                    "Content-Type":"application/x-javascript; charset=utf-8",
                    "Content-Length":100,
                    "Accept":"*/*",
                    "Accept-Language":"	zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3",
                    "Cache-Control":"no-cache; must-revalidate",
                    "Connection":"Keep-Alive",
                    "Host":"ssl.ptlogin2.qq.com",
                    'cookie':'pgv_pvid=6573388648; ptui_loginuin=79186391; pt2gguin=o0079186391; RK=8Knv2SqBTw; ptcz=b22d95d516f62093897260939ae8d71f04e0ecb1dc972f5554c4b99b75c0a782; o_cookie=79186391; pgv_pvi=9718161408; uikey=173cd91b1c60124273d479d36801a9fddb566f34caf42c1cd816e3977cdf412d; confirmuin=0; ptisp=ctc; verifysession=h02oI5jA2tMyj10Mfw1ffD9lNNWoIvq0khHtilDQAcamCkGHGlqzxZAtbfaOuVTmZZdpubVN5-hOwpEr5zAollrqA**; ETK=2T12-*zTuUPQ7g4a1VsFrDaGBUTL9Qo8hcsf8AurrMMvYrG08uv3HJxvkqksVYb96HkTRAqN2foLwTglQnpc0A__',
                    "Referer":"https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=522005705&daid=4&s_url",

                    "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)"
                }
            }

            var req=https.request(options,function(res){
                res.setEncoding("utf8");

                var headers=res.headers,resData='';
                //console.log(headers);
                var cookies=headers["set-cookie"];
                //cookies.forEach(function(cookie){
                //    console.log(cookie);
                //});
                console.log(cookies);
                res.on("data",function(data){
                    resData +=data;
                    //console.log(data);
                    var cookies=headers["set-cookie"];

                    console.log('cookie------------');
                    console.log(cookies);
                    return;
                    nodegrass.get("http://"+host+"/admin/users",function(data,status,headers){

                        console.log(data);
                    }, options);
                }).setCookie();

                // 在数据发送完毕后触发
                res.on("end", function() {
                    // querystring.parse功能: 就是解析...比如一个object会把它解析成object
                    console.log(resData);
                });
            });

            req.end();

        }
    }
})();
