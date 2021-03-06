
/**
 * Module dependencies.
 */

//设置全局变量
//global._debug = true;//测试状态
//global._local = true;//本地开发



var express = require('express');
var http = require('http');
var path = require('path');




var app = express();

var hbs = require('hbs');
// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.logger());
// 一个简单的 logger

if (process.env.PORT) {//生产环境
    global._debug = false;
    global._local = false;
}else{// 开发环境
    app.use(express.errorHandler());
    global._debug = true;//测试状态
    global._local = true;//本地开发
}

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


global.qqlist = [
    {135413973 : ''},
    {135414390 : ''},
    {115447173 :''},
    {155447775 :''},

    {115445725 : ''},
    {165543416 : ''},
    {122459853 :''},
    {175525897 :''}
        /*
    {'135413973':''},
    {'135414390':''},
    {'115447173':''},
    {'155447775':''},
    {'195465761':''} */
   // '135413973', '135414390', '115447173', '155447775', '145253456', '195465761'
];

//console.log('开发环境：'+app.get('env'));

app.set('title', 'catchQQ');

app.use(express.cookieParser('123'));
app.use(express.session({maxAge:10000, secret: "andylau" }));


app.engine('html', hbs.__express);
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static('public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'));
global.io = io;
/*
io.set('transports', [
    'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
]);
*/

     io.sockets.on('connection', function (socket) {
         socket.on('getenv', function(){

             socket.emit('sendenv', {
                env:app.get('env'),
                port : process.env.PORT,
                 setting : app.settings
             });

         });

     });

/**
 * redis

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
        client.quit();
    });
});

 */
var myroute = require('./routes/myroute').routefn;
myroute.globalRoute(app);

/*
app.listen(app.get('port'),'dev.caryous.com', function(){
    console.log('Express server listening on port ' + app.get('port'));
});
*/


//app.listen(app.get('port'), function(){
//    console.log('Express server listening on port ' + app.get('port'));
//});

