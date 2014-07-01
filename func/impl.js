/**
 * Created by Administrator on 14-3-23.
 * 功能实现类
 */

(function(){
    var mongo = require('./mongo-skin.js').skin,
        cutil = require('./../func/cutil').util,
        _debug = global._debug,
        qqlist = global.qqlist;

    var xmlreader = require('xmlreader');
    var nodegrass = require('nodegrass');
    var mostTimer = 50, thtimer = 0;
    exports.Impl = {

        getqqByblog : function(param, res){

            var info = JSON.parse(param.q);
            if(info.list){
                this.saveBlogQQ(info.list,info.blogid,info.blogName, function(){
                    res.json(200, {save:'success'});
                });
            }else{
                res.json(200, {save:'error'});
            }
        },

        saveBlogQQ : function(lists, blogid,blogName, fn){
            if(lists.length>0){
                var item = lists.shift(), that = this;
                mongo.read('blogqq', {qq:item.uin}, function(err, r){
                    if(!err){
                        if(r.length>0){
                            //var row = r[0];
                            //mongo.update('qqs', {qq:item.uin}, {$set:{'loginTime':+new Date,'loginTimes':row['loginTimes']+1}}, function(r){
                            //    fn && fn(r);
                            //})
                            //res.json(200, )
                            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<---重复------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                            that.saveBlogQQ(lists,blogid,blogName, fn);
                        }else{
                            //that.getAreaByApi(item.uin, function(result){
                                mongo.add('blogqq', {
                                    qq :item.uin||item.qq,
                                    name : item.name,
                                    blogid : blogid,
                                    blogname:blogName,
                                    area : '',
                                    time :item.time
                                }, function(r){
                                    that.saveBlogQQ(lists,blogid,blogName, fn);
                                })
                            //})

                        }
                    }
                })
            }else{
                fn &fn();
            }
        },


        getAreaByQQ : function(param, res){
            var that = this;
                mongo.read('blogqq',{ "area":""}, function(err,data){

                    if(!err){

                        if(data.length == 0){
                            res.send('<div>没有可转换数据</div>');

                        }else{
                            console.log('data:'+data);
                            that.getAreaByQQImpl(data, function(){
                                 //res.json(200, {rst:"success"});
                                 res.send('<div>获取完成</div>');
                            });
                        }
                    }
                    //res.json(200, {rst:data});
                });

        },

        getAreaByQQMx : function(res){
            var that = this;
            mongo.read('blogqq',{ "area":"未知"}, function(err,data){
                if(!err){
                    if(data.length == 0){
                        res.send('<div>没有可转换数据</div>');

                    }else{
                        that.getAreaByQQImpl(data, function(){
                            res.send('<div>获取完成</div>');
                        });
                    }
                }
                //res.json(200, {rst:data});
            });
        },

        getAreaByApi : function(qq, fn){
            nodegrass.get("http://qq.ico.la/api/qq="+qq+"&format=xml",function(data,status,headers){
                console.log(data);
                //console.log(typeof data);
                xmlreader.read('<response>'+data+'</response>', function(errors, response){
                    if(null !== errors ){
                        console.log(errors);
                        fn && fn('');
                        return;
                    }
                    console.log(response.response);
                    if( response.response.country){
                        var country =  cutil.replaceAll(cutil.trim(response.response.country.text()), /未知/gi, ''),
                            state =  cutil.replaceAll(cutil.trim(response.response.state.text()), /未知/gi, ''),
                            city =  cutil.replaceAll(cutil.trim(response.response.city.text()), /未知/gi, '');
                        if(city || country || state){
                            if(city === ''|| city ==='未知' || city === '-'){
                                city = country+' '+state;
                            }
                        }
                    }else{

                        var city = '未知';
                    }
                    fn && fn(city);
                });
            },'utf8').on('error', function(e) {
                    console.log("Got error: " + e.message);
                    fn && fn('');
             });
        },

        getAreaByQQImpl : function(lists, fun){
            if(lists.length>0){
                var item = lists.shift(), that = this, qq = item['qq'];
                this.getAreaByApi(qq, function(city){
                    if(city){
                        mongo.update('blogqq', {qq:qq}, {$set:{'area':city}}, function(r){
                            that.getAreaByQQImpl(lists, fun);
                        })
                    }else{
                        that.getAreaByQQImpl(lists, fun);
                    }

                });
            }else{
                fun &fun();
            }
               /*
                //nodegrass.get("http://183.60.15.179/cgi-bin/user/cgi_personal_card?uin=79186391&_=1397912308807",function(data,status,headers){
                nodegrass.get("http://qq.ico.la/api/qq="+qq+"&format=xml",function(data,status,headers){
                    console.log(data);
                    //console.log(typeof data);
                    xmlreader.read('<response>'+data+'</response>', function(errors, response){
                        if(null !== errors ){
                            console.log(errors);
                            that.getAreaByQQImpl(lists, fun);
                            return;
                        }

                        if( response.response.country){
                            //var country =  cutil.trim(response.response.country.text()),
                            //     state =  cutil.trim(response.response.state.text()),
                           //     city =  cutil.trim(response.response.city.text());
                            var country =  cutil.replaceAll(cutil.trim(response.response.country.text()), /未知/gi, ''),
                                state =  cutil.replaceAll(cutil.trim(response.response.state.text()), /未知/gi, ''),
                                city =  cutil.replaceAll(cutil.trim(response.response.city.text()), /未知/gi, '');
                            if(city || country || state){
                                if(city === ''|| city ==='未知' || city === '-'){
                                    city = country+' '+state;
                                }

                            }
                        }else{

                            var city = '未知';
                        }
                        mongo.update('blogqq', {qq:qq}, {$set:{'area':city}}, function(r){
                            that.getAreaByQQImpl(lists, fun);
                        })
                    });
                },'utf8').on('error', function(e) {
                        console.log("Got error: " + e.message);
                    });
            }else{
                fun &fun();
            }
            */
        },


        //分配uid
        getUin : function(req, res){
            var v = qqlist.shift();

            qqlist.push(v);
            //this.setCookie(res, {vvv:1}, 11111111, '.qq.com');
            res.json(200, {rst:v});
        },

        toASCII : function(qq){
            var qqCode = [];
            for(var i=0;i < qq.length;i++){
                qqCode.push(qq.charCodeAt(i));
            }
            return qqCode.join(',');
        },


        //取访问者QQ
        getqq : function(req, res){
            var params = cutil.getHttpRequestParams(req), that = this;
            console.log(params);
            //params.uin = '115445725';
            if(params.uin){
                this.spiderUrl({
                    url : 'http://app.data.qq.com/?umod=user&uid='+params.uin+'&t='+(new Date().getTime())
                }, function(r){
                    if(r === ''){
                        res.json(200, {rst:''});
                        return;
                    }
                    var cheerio = require('cheerio');
                    $ = cheerio.load(r);
                    //var qqs = that.analyseQQ(params.uin,$('.list_pic_2'));
                    var imgs = $('.list_pic_2 li img'), qq = name = '';
                    if(imgs.length>0){
                        qq = that.getImgQQ(imgs.eq(0).attr('src'));
                        name = $('.list_pic_2 li a').eq(0).find('span').text();
                        that.dbcontrol(qq, name, '',function(r){
                            //that.setCookie(res, {uky:that.toASCII(qq)}, 300);
                            res.json(200, {rst:qq});
                        });
                    }else{
                    //if($('.list_pic_2 li img').length)
                        res.json(200, {rst:""});
                    }
                   // res.json(200, {rst:$('body').html()});
                });
            }else{
                res.json(200, {rst:'error'});
            }
            //res.json(200, {rst:params});


        },

        //保存并setcookie
        saveHave : function(req, res){
            var params = cutil.getHttpRequestParams(req);
            this.dbcontrol(params.quin, '', '', function(r){
                res.json(200, {rst:'succ'});
            });
        },

        saveUin : function(req, res){
            var params = cutil.getHttpRequestParams(req), that = this;
            this.dbcontrol(params.quin, '', '', function(r){
                //that.setCookie(res, {uky:that.toASCII(params.quin)}, 300);
                res.json(200, {rst:'succ'});
            });
        },



        spiderUrl : function(opt, fnSpiderData){
            thtimer++;
            if(thtimer > mostTimer){
                fnSpiderData('');
                return;
            }
            var http = require('http'), that = this;
            //opt.url = 'http://blog.whattoc.com/2013/09/19/nodejs_api_http_2/';
            //console.log('in===================================');
            //console.log('url:'+opt.url);
            http.get(opt.url, function(res) {
                var size = 0;
                var chunks = [];
                res.on('data', function(chunk){
                    size += chunk.length;
                    chunks.push(chunk);
                    //console.log('-------on data--------------');
                });

                res.on('end', function(){

                    var data = Buffer.concat(chunks, size);
                    //console.log(chunks);
                    var data = data.toString();
                    if(data == ''){
                        //console.log('end---------------------');
                        that.spiderUrl(opt, fnSpiderData);

                    }else{
                        if(data.toString().length < 1000){
                            that.spiderUrl(opt, fnSpiderData);
                        }else{
                            console.log('success++++++++++++++++++');
                            console.log(opt.url);
                            //console.log(data.toString());
                            fnSpiderData(data.toString());
                        }
                    }

                });
            }).on('error', function(e) {
                    //console.log('------error---------');
                    that.spiderUrl(opt, fnSpiderData);
            });
        },

        analyseQQ : function(uin, ul){
            var as = ul.find('a'), imgs = ul.find('img'), len = as.length;
            var uins = [], qqs = [];
            for(var i= 0;i<len;i++){
                uins.push(this.getImgQQ(imgs.eq(i).attr('href')))
                qqs.push(this.getImgQQ(imgs.eq(i).attr('src')));
            }
            var index = $.inArray(uin, uins);
            if(index>-1){
               return qqs.splice(0, index+1);
            }
            return '';
        },

        getImgQQ : function(src){
            var v = src.match(/qzone\/([0-9]*)/);
            if(v.length === 2){
                return v[1];
            }
            return '';
        },

        getAuin : function(src){
            var v =str.match(/com\/([0-9]*)/);
            if(v.length === 2){
                return v[1];
            }
            return '';
        },

        dbcontrol : function(qq, name, refer, fn){
            mongo.read('qqs', {qq:qq}, function(err, r){
                if(!err){
                    if(r.length>0){
                        var row = r[0];
                        mongo.update('qqs', {qq:qq}, {$set:{'loginTime':+new Date,'loginTimes':row['loginTimes']+1}}, function(r){
                            fn && fn(r);
                        })
                    }else{
                        mongo.add('qqs', {
                            qq :qq,
                            name : name,
                            loginTime :+new Date,
                            refer : refer ||'',
                            loginTimes : 1
                        }, function(r){
                            fn && fn(r);
                        })
                    }
                }
            })
        },




        //获取帐号权限
        getRole : function(uid, fn){
            mongo.read('users', {"uid":uid}, function(err, result){
                if(result.length){
                    fn && fn(err, result[0].role);
                }else
                    fn && fn("帐号不存在", result);
            })
        },
        /*-----------------帐号功能结束------------------*/

        /*------------------session cookie*--------------------------*/
        setSessin : function(req, user){
            req.session.user_id = user.username || user.weiboId || user.qqId;
            //req.session.user = user;
        },

        getSession : function(req, key){
            _debug && console.log(req.session.user_id)
            if(req.session.user_id && key) return req.session[key];
             return req.session.user_id || '';
        },

        getCookie : function(__req){
            // 获得客户端的Cookie
            /*
            var Cookies = {};
            req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
                var parts = Cookie.split('=');
                Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
            });
            */
            _debug && console.log(__req.cookies);
            return __req.cookies;
        },

        setCookie : function(__res, cookies, seconds, domain, httpOnly){
            seconds = seconds ? seconds*1000 : 0;
            for(var key in cookies){
                __res.cookie(key, cookies[key], {maxAge:seconds, path:domain || '/', secure:false, httpOnly:httpOnly?httpOnly:false});
            }
        },


        /*------------------session cookie*--------------------------*/


        /*------------------ user --------------------------*/

        addUser : function(user, fn){
            mongo.add('users', user, function(err, result){
                if(err){
                    _debug && console.log('add---user---error');
                    throw err;
                }
                _debug && console.log('add---user---success');
                fn && fn(result);
            });
        },

        getHasFans : function(uid, fn){
            mongo.read('user', {'uid': uid}, function(err, result){
                if(err){
                    _debug && console.log('read---fans---error');
                    throw err;
                }
                _debug && console.log('add---user---success');
                fn && fn(result);
            });
        },




        addFans : function(user, fn){


        },

        getUserList : function(page, pageSize, fn){
            mongo.read('users','', function(err, result){
                /*
                 if(err){
                 _debug && console.log('read---cartype---error');
                 throw err;
                 }*/
                fn && fn(err, result);
            }, page, pageSize)
        }
        /*------------------ user 结束--------------------------*/
    }

})()
