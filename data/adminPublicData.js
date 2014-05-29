/**
 * Created by Administrator on 14-3-25.
 * 后台公共数据
 */

(function(){
    var cutil = require('./../func/cutil').util;
    exports.pd = {
        getPd : function(d){
            var cd = cutil.deepClone(commonData);
            return  cutil.extend(d||{},cutil.extend(cd,adminPublicData));
        },

        getCommonPd : function(){
            return commonData;
        }
    };

    var commonData = {
        project_name : 'Atong',

        _debug : global._debug

    };

    var adminPublicData = {
        items : [{
            cls :'',
            item : 'Home',
            uri : '/admin'
        },{             //用户列表
            cls : '',
            item : 'User',
            uri : '/admin/users'
        },{             //群组列表
            cls : '',
            item : 'Group',
            uri : '/admin/group'
        },{             //商店列表
            cls : '',
            item : 'Store',
            uri : '/admin/stores'
        },{             //个人消息列表
            cls : '',
            item : 'Message',
            uri : '/admin/message'
        },{             //群消息列表
            cls : '',
            item : 'GroupMessage',
            uri : '/admin/groupMessage'
        },{   //商品
            cls : '',
            item : 'Product',
            uri : '/admin/product'
        },{   //订单
            cls : '',
            item : 'Order',
            uri : '/admin/order'
        },{   //图片
            cls : '',
            item : 'Picture',
            uri : '/admin/picture'
        }]

    };

})()
