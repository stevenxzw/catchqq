/**
 * Created by zhiwen on 14-3-19.
 */
(function(){
    var _debug = global._debug,
        mongo = require('./mongo-skin.js').skin,
        cutil = require('./cutil').util,
        tables = require('./../data/tables.js').userTable;


    exports.initClass = {

        //数据表初始化
        initTables : function(req, res, fn){
            var _self = this, times = 0, len = 0;
            for(var table in tables){
                len++;
                (function(k, v){
                    _self.initTheTable(k, v, function(){
                        times++;
                        if(times === len){
                            if(res && res.send)
                                res.send('<div>成功导入'+len+'个表</div>');
                        }
                    });
                })(table, tables[table]);
             }
        },

        //导入某一数据表
        initTheTable : function(name, value, fn){
            var _self = this;
            mongo.drop(name, function(err, result){
                if(!err || err == 'MongoError: ns not found'){
                    _self.initTable(name, value);
                    fn && fn(result);
                }else{
                    _debug && console.log('initTable-drop:'+k+'---error:'+err);
                }
            });
        },



        //删除所有数据表
        dropAllTable : function(){
            for(var table in tables)
                mongo.drop(table);
        },
        //初始化添加数据表
        initTable: function(name, value, fn){
            mongo.add(name, value, function(err, result){
                if(err){
                    _debug && console.log('initTable--add:'+name+'---error:'+err);
                    throw err;
                }
                _debug && console.log('initTable--add:'+name);
                fn && fn(result);
            });
        }


    };

})()
