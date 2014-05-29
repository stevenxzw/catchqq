/**
 * Created by zhiwen on 14-3-17.
 * 连接数据库
 */

(function(){
    var _debug = global._debug;
    if(_debug) console.log('========================conn-----------------------');
    var mongo = require('mongoskin');
    if(global._local)
        exports.db = mongo.db('mongodb://localhost/catchqq');
    else
        exports.db = mongo.db('mongodb://admin:123456@ds049898.mongolab.com:49898/catchqq');
    //mongodb://<dbuser>:<dbpassword>@ds033087.mongolab.com:33087/atong
})();
