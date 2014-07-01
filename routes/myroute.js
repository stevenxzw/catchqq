/**
 * Created by zhiwen on 14-3-19.
 * 路由控制器(建立在express基本上)
 */
(function(){

    var _debug = global._debug ,
        initClass = require('./../func/initFun').initClass,
        impl = require('./../func/impl').Impl,
        filter = require('./../func/filter').routerFilter,
        cutil = require('./../func/cutil').util,
        apiUser = require('./../API/user').apiUser,
        adminPage = require('./../func/adminPage').adminPage;




    var routes = {
        '/' :[false, function(req, res){
            res.render('index',{
                title:"首页"});
        }],

        '/get' : function(req, res){
            res.render('get',{
                title:"获取数据"});
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

        '/qlist' : [false, function(req, res){
            var conn = require('./../func/mongo-skin').skin;
            conn.read('qqs','', function(err,data){
                res.render('qlist',{
                    title:"qq列表",users:data});
            }, 1, 30);
        }],


        '/blogqq' : [false, function(req, res){
            var conn = require('./../func/mongo-skin').skin;
            var param = cutil.getHttpRequestParams(req);
            var ps = Number(param.ps) || 50, page = Number(param.pg);
            conn.count('blogqq', '', function(err, rel){

                var allpage = Math.ceil(rel/ps), pages = [];
                if(!page) page = 1;
                if(page > allpage) page = allpage;
                for(var i=1;i<=allpage;i++)
                    pages.push(i);
                if(rel < ps) ps = rel;
                conn.read('blogqq','', function(err,data){
                    res.render('blogqq',{
                        title:"qq列表",users:data,allPage:allpage, count:rel, pages:pages,ps:ps});
                }, page, ps);
            })

        }],

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

        /*----------------------初始化数据-------------------------*/
        '/init/tables' : [false, function(req, res){
            initClass.initTables(req, res);
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
