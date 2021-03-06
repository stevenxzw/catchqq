/**
 * Created by zhiwen on 14-3-19.
 * 路由控制器(建立在express基本上)
 */
(function(){

    var _debug = global._debug ,
        initClass = require('./../func/initFun').initClass,
        impl = require('./../func/impl').Impl,
        loginImpl = require('./../func/impl-login').ImplLogin,
        filter = require('./../func/filter').routerFilter,
        cutil = require('./../func/cutil').util,
        apiUser = require('./../API/user').apiUser,
        adminPage = require('./../func/adminPage').adminPage,
        excelfn = require('./../func/exportExcel'),
        conn = require('./../func/mongo-skin.js').skin;


    var defaultConfig = {
        host : _debug ? 'http://localhost:3002':'http://arcane-escarpment-5810.herokuapp.com'
    };

    var io = global.io, dbclick = null, tt  = +new Date, outSocket;
    function getAreaAction(param, socket){
        console.log('socket-getArea-action');
        impl.socket_area(param.area, function(result){
            socket.emit('getArea-finished', {rst : result});
        }, function(d){
            //console.log('emit finishOne');
            socket.emit('finishOne', {rst : d});
        });
    }
    io.sockets.on('connection', function (socket) {
        socket.on('listenevent', function (data) {
            console.log(data);
            socket.emit('eventback', { e: 'eventback--next' });
        });

        //socket.emit('ingetpage');
        socket.on('getArea', function(param){
            console.log('socket-getArea');
            clearTimeout(dbclick);
            var dbclick = setTimeout(function(){getAreaAction(param, socket)}, 200);
        });

        socket.on('getArea-stop', function(param){
            console.log('getArea-stop');
            impl.stop_socket_area(function(r){


            });
        });
        outSocket = socket;
        //setTimeout(function(){outSocket.emit('outxls', 333)}, 5000);
    });

    var routes = {
        '/' :[false, function(req, res){
            res.render('index',{
                title:"首页"});
        }],

        '/get' : function(req, res){
            res.render('get',cutil.extend({
                title:"获取数据"}, defaultConfig));
        },

        '/api/getUin' : [false, function(req, res){ //分配uid
            impl.getUin(req, res);
        }],

        '/api/getqq' : [false, function(req, res){ //取访问者QQ
            impl.getqq(req, res);
        }],
        '/api/saveHave' : [false, function(req, res){ //保存并setcookie
            impl.saveHave(req, res);
        }],
        '/api/saveUin' : [false, function(req, res){ //保存只有QQ号
            impl.saveUin(req, res);
        }],

        '/api/sendqq' : [false, function(req, res){//QQ空间blog访客QQ
            var param = cutil.getHttpRequestParams(req);
            impl.getqqByblog(param, res);
            //res.json(200, {save:'success'});
        }],

        '/api/sendpraise' : [false, function(req, res){//QQ空间blog访客QQ
            var param = cutil.getHttpRequestParams(req), lists = param.lists;
            //if(lists){
            //    lists = JSON.parse(lists);
           // }
            impl.savePraise(lists, [], param.blogid, param.bn ,param.qid, res);
            //res.json(200, {save:'success'});
        }],

        '/qlist' : [false, function(req, res){
            conn.read('qqs','', function(err,data){
                res.render('qlist',{
                    title:"qq列表",users:data});
            }, 1, 30);
        }],

        '/exportOutqq' : function(req, res){
            var param = cutil.getHttpRequestParams(req), cparam = {};
            var pagesize = Number(param.pagesize) || 100, page = Number(param.page||1);
            if(param.addTime){
                cparam['addTime'] = {};
                cparam['addTime']['$gt'] = Number(param.addTime);
            }
            if(param._id != 'undefined'){
                //cparam['_id'] = param._id;
            }
            conn.read('blogqq',cparam, function(err,data){
                if(!err){
                    res.json(200, {res : data});
                }else{
                    res.json(200, {res : 'error'});
                }
            }, page, pagesize);
        },

        '/blogqq' : [false, function(req, res){
            var param = cutil.getHttpRequestParams(req);
            var ps = Number(param.ps) || 100, page = Number(param.pg);
            conn.count('blogqq', '', function(err, rel){
                var allpage = Math.ceil(rel/ps), pages = [];
                if(!page) page = 1;
                if(page > allpage) page = allpage;
                for(var i=1;i<=allpage;i++)
                    pages.push(i);
                if(rel < ps) ps = rel;
                var p  = {};
                p['addTime'] = {$ne:''};
                conn.read('blogqq',p, function(err,data){
                    res.render('blogqq',{
                        title:"qq列表",users:data,allPage:allpage, count:rel, pages:pages,ps:ps,
                        prePage : page-1 < 1 ?1:page-1,
                        page:page, nextPage: page+1 > allpage ? allpage : page+1});
                }, page, ps);
            })

        }],

        '/praise' : [false, function(req, res){
            var conn = require('./../func/mongo-skin').skin;
            var param = cutil.getHttpRequestParams(req);
            var ps = Number(param.ps) || 100, page = Number(param.pg);
            conn.count('praise', '', function(err, rel){
                var allpage = Math.ceil(rel/ps), pages = [];
                if(!page) page = 1;
                if(page > allpage) page = allpage;
                for(var i=1;i<=allpage;i++)
                    pages.push(i);
                if(rel < ps) ps = rel;
                var p  = {};
                p['addTime'] = {$ne:''};
                conn.read('praise',p, function(err,data){
                    res.render('praise',{
                        title:"qq列表",users:data,allPage:allpage, count:rel, pages:pages,ps:ps,
                        prePage : page-1 < 1 ?1:page-1,
                        page:page, nextPage: page+1 > allpage ? allpage : page+1});
                }, page, ps);
            })
        }],

        '/getBeginQQ' : function(req, res){
            var param = cutil.getHttpRequestParams(req);
            if(param.bid && param.qid){
                conn.findLast('praise', {blogid:param.bid, qzoneid:param.qid}, function(err, r){
                    if(!err){
                        res.json(200, {errno:0, err:'', rst:{result : r}});
                    }else{
                        res.json(200, {errno:1, err:'error', rst:''});
                    }
                })
            }else{
                res.json(200, {errno:1, err:'bid和qid不能为空', rst:''});
            }
        },

        '/infoByQQ' : function(req, res){
            var param = cutil.getHttpRequestParams(req);
            if(param.qq){
                conn.read('blogqq', {qq:Number(param.qq)}, function(err, r){
                    if(!err){
                        res.json(200, {result : r});
                    }
                })
            }else{
                res.send('请输入QQ号');
            }
        },

        '/addTohero' : function(list){
            conn.count('blogqq', '', function(err, rel){
                conn.read('blogqq','', function(err,data){

                }, 1, rel);
            })
        },

        '/getAreaByQQ': function(req, res){
            var param = cutil.getHttpRequestParams(req);
            impl.getAreaByQQ(param, res);
        },

        '/getAreaByQQImpl': function(req, res){
            var param = cutil.getHttpRequestParams(req);
            impl.getAreaByQQImpl([{id:154036777}], res);
        },

        '/getAreaByQQMx': function(req, res){
            impl.getAreaByQQMx( res);
        },

        '/excel' : function(req, res){
            var param = cutil.getHttpRequestParams(req),
                startTime = +new Date;

            impl.toExcel(param,function(fileSrc){
                console.log('耗时:'+((+new Date) - startTime));
                outSocket.emit('outxls', fileSrc);

            }, req, res);
            res.json(200, cutil.result(0, '', '请等待'));
        },

        '/exportList' : function(req, res){
            var param = cutil.getHttpRequestParams(req),
                lists = param.lists, area = param.earea;
            if(lists){
                lists = JSON.parse(lists);
                var data = [], cols = [
                    {caption:'QQ', type:'string'},
                    {caption:'地区', type:'string'}
                ];
                for(var i= 0,l=lists.length;i<l;i++){
                    if(area === '' || (lists[i].cb.indexOf(area)>-1))
                        data.push([lists[i].qq, lists[i].cb]);
                }
                if(l > 5000){
                    excelfn.exportExcel.toExcelMax(req, res, data, '', function(fileSrc){
                        outSocket.emit('outxls', fileSrc);
                    });
                }else{
                    excelfn.exportExcel.toxlsx(data,'','', function(fileSrc){
                        outSocket.emit('outxls', fileSrc);
                    });
                }

            }else{
                res.send('没有数据!');
            }

            console.log(param);
            //xcelfn.exportExcel(req, res, data, filename);
            //impl.toExcel( req, res, param);

        },

        '/json' : function(req, res){
            var param = cutil.getHttpRequestParams(req);
            impl.ToJson( req, res, param);

        },

        '/excelcount' : function(req, res){
            var param = cutil.getHttpRequestParams(req);
            var blogid  = param.id, blogname = param.name, area = param.area, qzoneid = param.qzoneid, des = {};
            if(blogid) des['blogid'] = blogid;
            if(qzoneid) des['qzoneid'] = qzoneid;
            if(blogname) des['blogname'] = blogname;

            if(area){
                if(area !== '全部')
                    des['area'] = eval("/"+area+"/");
            }
            var filename = param.filename;
            conn.count(param.etype || 'blogqq', des, function(err, r){
                if(!err){
                    res.json(200, {num : r});
                }
            })
        },

        '/countnull' : function(req, res){
            conn.count('blogqq', {area : ''}, function(err, rel){
                res.send('地区为空的QQ有：'+rel);
                //res.json(200, {num : rel});
            });
        },
        '/getMax' : function(req, res){
            var param = cutil.getHttpRequestParams(req);
            if(param.t){
                conn.count('blogqq', {addTime :{$gt:Number(param.t)}}, function(err, rel){
                    res.send('大于'+param.t+'的记录数：'+rel);
                });
            }else
                res.send('查询大于某时间的记录数，请带t参数如：t=1405003687393');

        },

        '/setAddTime' : function(req, res){
            var param = cutil.getHttpRequestParams(req), t = param.t || 1404903687393, page = param.p||1, times = 0;

                        function setTime(){
                            if(times < 30000){
                                conn.update('blogqq', {'addTime' :null},{$set:{'addTime':t}}, function(rel){
                                    if(times<30000){
                                        times++;
                                        console.log('完成：'+times);
                                        setTime();

                                    }else{

                                        res.send('已完成:'+times);
                                    }
                                });
                            }else
                                res.send(200, '已没有空addTime');
                        }
            setTime();

        },

        '/addTimenull' : function(req, res){
            conn.count('blogqq', {'addTime' :null}, function(err,rel){
                res.send('没有addTime:'+rel);
            });
        },

        '/countArea' : function(req, res){
            conn.count('blogqq', {area: {$ne: ""}}, function(err, rel){
                res.send('有地区QQ有：'+rel);
            });
        },

        '/login163' : function(req, res){
                impl.login163();
        },

        '/loginQQmail' : function(req, res){

            loginImpl.qqmail(req, res);
        },

        '/qqmailCheck' : function(req, res){

            loginImpl.qqmailcheck(req, res);
        },

        '/sleep' : function(req, res){
            var param = cutil.getHttpRequestParams(req);
            var s = param.s;
            if(!s){
                s = 10;
            }
            var st = parseInt(s);
            var start=new Date().getTime();
            while(true) if(new Date().getTime()-start>st) break;
            //res.send('sleep:'+s);
            console.log('sleep:'+s);
            var t = param.t || 10000;
            setTimeout(function(){
                res.send('timeout:'+t);
                console.log('timeout:+'+t);
            }, t)

        },

        '/thread' : function(req, res){
            var Promise = require('bluebird');
            var fs = require("fs");

            var romis = require('romis');
            var client = romis.createClient({
                host: 'localhost',
                port: 6379
            });
            var redis = require("node-redis"),
                client = redis.createClient();

            client.on("error", function (err) {
                console.log("Error " + err);
            });

            client.hset("hash key", "hashtest 1", "some value", redis.print);
            client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
            client.hkeys("hash key", function (err, replies) {
                console.log(replies.length + " replies:");
                replies.forEach(function (reply, i) {
                    console.log("    " + i + ": " + reply);
                });
                client.quit();
            });

            return;

            Promise.all([
                    client.hset("hash key","hastest 1", "some value"),
                    client.hset(["hash key", "hashtest 2", "some other value"]),
                    client.get('key'), client.get('mystring key'), client.hkeys("hash key")]).then(function(r){
                res.send(arguments);
            });
           // res.send('t');
            return;
            Promise.promisifyAll(fs);
            Promise.reduce(["./index.html", "./package.json"], function(total, fileName) {
                console.log(fileName);
                return fs.readFileAsync(fileName, "utf8").then(function(contents) {
                    console.log(contents);
                    return total + parseInt(contents, 10);
                });
            }, 0).then(function(total) {
                   console.log(total);
                });

            return;
            Promise.delay(500).then(function() {

                return [fs.readFileAsync("./index.html"),
                    fs.readFileAsync("./package.json")] ;
            }).then(function(file1text, file2text) {

                    console.log(file1text.toString());
                    try{
                        if(text1 != file1text){

                        }
                    }catch(e){
                        console.log('catch');
                    }
                });
             return;


            return;
            //var t = require('E:/gitspace/catchqq/node_modules/then-redis/node_modules/hiredis/build/hiredis.node');
            var romis = require('romis');

            var client = romis.createClient({
                host: 'localhost',
                port: 6379
            });
            var log = console.log.bind(console);
            var error = console.error.bind(console);
            console.log(client);
            Promise.all([client.get('key'), client.get('mystring key'), client.hkeys("hash key")]).then(function(r){
                res.send(arguments);
            });

            return;
            Promise.all([
                    client.set("mystring key","string val")
                    //client.hset("hash key","hastest 1", "some value"),
                    //client.hset(["hash key", "hashtest 2", "some other value"]),
                    //client.hkeys("hash key")
                ]).then(function(results){
                    res.send(results);
                    console.log(results);
                   // return results.pop(); // Return keys inside `hash key`
                })
                .then(log) // Log resulting keys
                .catch(error);
            return;
            var redis = require('then-redis');
            return;
            var db = redis.createClient({
                host: 'localhost',
                port: 6379
            });
            db.set('my-key', 1);
            db.get('my-key').then(function (value) {
                console.log(value);
                res.send(111);
                //assert.strictEqual(value, 6);
            });
            res.send(22222222);
            return;
            //var threads_a_gogo= require('threads_a_gogo');
            var redis = require("node-redis");
            var client = redis.createClient(6379);

            client.set('key', 'val', function(err, reply) {
                if (err) {
                    console.log(err);
                    return;
                }
                client.get('key', function(err, reply) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(reply.toString());
                    res.send(reply.toString());
                    client.quit();
                });
            });
        },

        '/gcf' : function(){
            var gcf = require('./../func/gcf');

            var changed = gcf.get('./func/',function(item){

                if(item.match(/^node_modules|^\./)){
                    //console.log('return false');
                    return false;
                }
                return true;
            });

            console.log(changed); // [];

        },

        '/qzone' : function(req, res){
            res.render('areabyqs',{
                title:"查找QQ地区"});
        },

        //下载文件s
        '/files/*' : function(req, res){
            var url = req.originalUrl;
            res.download('.'+url);
        },

        '/addqq' : function(req, res){
            var items  = [];
            for(var i=10000;i<40000;i++){
                items.push({
                    qq : 1+i,
                    name : 'test_'+i,
                    blogid : '6c06bc1a6d9fba5348bc0e00',
                    blogname : 'test',
                    qzoneid : '448530028',
                    addTime : '',
                    area : '',
                    time : ''
                });
            }

            conn.add('praise', items, function(r){
                res.send('success');
            });


            //var fs = require('fs');

        },

        /*----------------------初始化数据-------------------------*/
        '/init/tables' : [false, function(req, res){
            initClass.initTables(req, res);
        }],

        '/init/addTable' : [false, function(req, res){

            var param = cutil.getHttpRequestParams(req);
            if(!param.t){
                res.send('请选择要添加的数据表!');
            }else{
                tables = require('./../data/tables.js').userTable;
                if(tables[param.t]){
                    initClass.initTable(param.t, tables[param.t], function(r){

                        console.log(r);
                    });

                }else{
                    res.send('没有可添加的数据表!');
                }


            }

        }],


        /*----------------------初始化数据结束-------------------------*/

        /*--------------------------API---------------------------*/


        /*-------------------------------------登录后台路由结束-------------------------------------*/

        '/admin' : [true, function(req, res){
            //adminPage.getQQfriend();
            //adminPage.getQQFanke('873206974', '@LTyQIp6Lb');
            //adminPage.getQQFanke('154036777', '@k483NM36B');
            _debug && console.log(req.session.user_id);
            var data = adminPage.index(req, res);
            var blogEngine = require('./../data/blog');
            res.render('admin/index',cutil.extend({
                layout: 'adminLayout',
                action : 'admin/index', title:"管理后台", entries:blogEngine.getBlogEntries(), doc:"---"},data));
        }],

        '/detail' : [true, function(req, res){
            var conn = require('./../func/mongo-skin').skin;
            conn.read('cartype','', function(err,data){
                if(_debug) console.log(data);
            });
            //console.log('**********************');
            //console.log(res.locals.email);
            res.render('detail',{
                layout : 'templateLayout',
                title:"详细内容"});
        }]




    }

    var fn = {

        getUri : function(eapp){
            return eapp.route;
        },

        globalRoute : function(eapp){
            /*
            //统一过滤器
            eapp.get('/admin/?:action', filter, function(req, res, next){
                next();
            });
            */
            var isFilter = true;
            for(var rot in routes){
                var item =  routes[rot], type = cutil.getType(item);
                if(isFilter && type === 'array' && item.length && item[0] === true){
                    eapp.get(rot, filter.authorize, item[1]);
                    eapp.post(rot, filter.authorize, item[1]);
                }else{
                    eapp.get(rot, type === 'array' ? item[1] : item);
                    eapp.post(rot, type === 'array' ? item[1] : item);
                }
            }
        },

        templateRouter : function(app){

            app.get('')
        }


    }

    exports.routefn = fn;
    //initClass.initTables();
    //initClass.importCars();
    //初始化数据
    //initClass.initUsers();
    //initClass.importCarTypes();
    /*
    var http = require('http'),
        op = {
            host: '127.0.0.1',
            port: 8087,
            method: 'GET',
            path: 'http://api.car.bitauto.com/CarInfo/MasterBrandToSerialNew.aspx?type=2&pid=2&rt=serial&serias=m&key=serial_2_2_m&include=1'
        }
    var req = http.request(op, function (res) {
        res.on('data', function (chunk) {
            console.log('BODY:' + chunk);
        });
    });
    req.on('error', function (e) {
        console.log('Error got: ' + e.message);
    });
    req.end();
    */


})()
