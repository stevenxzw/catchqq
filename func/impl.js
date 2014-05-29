/**
 * Created by Administrator on 14-3-23.
 * 功能实现类
 */

(function(){
    var mongo = require('./mongo-skin.js').skin,
        cutil = require('./../func/cutil').util,
        _debug = global._debug,
        qqlist = global.qqlist;
    exports.Impl = {
        //分配uid
        getUin : function(req, res){
            var v = qqlist.shift();

            qqlist.push(v);

            res.json(200, {rst:v});
        },


        //取访问者QQ
        getqq : function(req, res){
            res.json(200, {rst:'1'});
        },

        //保存并setcookie
        saveHavd : function(req, res){
            var params = cutil.getHttpRequestParams(req);
            console.log('params--------------');
            console.log(params);
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
