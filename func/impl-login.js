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

            var querystring=require("querystring");


            var contents=querystring.stringify({
                password:"16BE007AC8DF4F87C4DD5CB6A91B54F4",
                username:"79186391"
            });
            var actions= '18-42-'+(+new Date);
            //https://ssl.ptlogin2.qq.com/check?regmaster=&uin=79186391&appid=522005705&js_ver=10085&js_type=1&login_sig=U-lm*
            // B3a3-4Ky4Lee3ykZwFVNrJwM5mJDorTIwVAgI5ZIummN*uBPFRSLuyHztuA&u1=https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3Dloginpage%26target%3D&r=0.19040772969733766
            var options={
                host:"ssl.ptlogin2.qq.com",
                path:'check?regmaster=&uin=79186391&appid=522005705&js_ver=10085&js_type=1&login_sig=' +
                '	xUeiqBATd0I46ld18*NaVnCa7GM3VoGoy6sVHtoelo67CufOp*at2q*yyWENiZRN&u1=https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3D' +
                'loginpage%26target%3D&r=0.6254889106123972',
                method:"get",
                headers:{
                    "Content-Type":"application/x-javascript; charset=utf-8",
                    "Content-Length":contents.length,
                    "Accept":"*/*",
                    "Accept-Language":"	zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3",
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

        }
    }
})();
