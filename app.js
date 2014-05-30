
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
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.logger());
// 一个简单的 logger
// 开发环境
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
    global._debug = true;//测试状态
    global._local = true;//本地开发
}
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


global.qqlist = [
    {115445725 : ''},
    {165543416 : ''},
    {122459853 :''},
    {175525897 :''}

];


// 生产环境
if ('production' === app.get('env')) {
    global._debug = false;//测试状态
    global._local = false;//本地开发
};
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

var myroute = require('./routes/myroute').routefn;
myroute.globalRoute(app);

/*
app.listen(app.get('port'),'dev.caryous.com', function(){
    console.log('Express server listening on port ' + app.get('port'));
});
*/
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});