/**
 * Created by zhiwen on 14-3-27.
 */

(function(AT, $$, win){
    var tplRegIf = /\[\?(!?)\.([\w_$]+?)(\.[\w_$]+)?\?([\S\s]*?)\?\]/g,
        tplReg   = /\{(\.?[\w_|$]+)(\.[\w_$]+)?\}/g;
    var Tpl = {

        // 模板html缓存
        tpls:{},

        //修改器
        //用于parse时，
        modifiers : {
            //XSS过滤
            escape : function(v) {
                return Util.escapeHtml(v);
            }
        },

        /**
         * 键查找过程：模板 --> 对象 --> 模板
         * @param {String} htmls 模板字符串
         * @param {Object} map 值键对
         */
        parse : function(htmls, map){
            if(!map)
                map = {};
            if(htmls.charAt(0) !== '<'){
                var tmp = T.tpls[htmls];
                if(tmp)
                    htmls = tmp;
            }

            // [?test?<img src="{src}">],当test置值时应用内容部份
            // example : [?right?output value {right}?]the left
            htmls = htmls.replace(tplRegIf, function(s, s0, s1, s2 , s3){
                var v = map[s1];
                if(s2 && s2.charAt(0) === '.' && v){
                    v = v[s2.substr(1)];
                }
                if(s0 === '!')
                    return !v ? s3:'';

                return !v ? '' : s3;
            });
            var self = this;
            return htmls.replace(tplReg, function(s, k , k1){
                var v, modfs, k_str, key;
                // "." 字符
                if (k.charCodeAt(0) === 46)  {
                    k_str = k.substr(1);
                    modfs = k_str.split('|');
                    key = modfs.shift();
                    v = map[key];
                } else {
                    //内嵌模板
                    v = T.tpls[k];
                }

                if(v === undefined || v === null)
                    return '';

                if(k1 && k1.charAt(0) === '.' && k.charAt(0) === '.') v = v[k1.substr(1)];

                if(v === undefined || v === null)
                    return '';

                //检查是否有修改器
                if (modfs && modfs.length) {
                    var fn;
                    $.each(modfs, function(i, f){
                        fn = this.modifiers[f];
                        if (!fn) return;
                        v = fn(v);
                    });

                } else {
                    // html text
                    if(v.toString().charAt(0) === '<') {
                        return self.parse(v, map);
                    }

                    // key of Tpl?
                    if(this[v])
                        return self.parse(this[v], map);
                }

                return v;
            })
        },

        forNode : function(htmls, map){
            if(map)
                htmls = this.parse(htmls, map);
            return $(htmls).get(0);
        },
        /**
         *  根据模板名称获得模板字符串。
         * @param {String} templateName
         * @return {String}
         */
        get : function(type){
            var tpl = this[type];
            return $.isArray(tpl) ? tpl.join(''): tpl;
        },
        /**
         * 注册HTML模板
         * @param {Object} htmlTemplateMap
         */
        reg : function(map){
            $.extend(this.tpls, map);
        },

        'modal' : ['<div class="modal fade" id="{.id}">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
            '<h4 class="modal-title">{.title}</h4>',
            '</div>',
            '<div class="modal-body">',
            '{.content}',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
            '<button type="button" class="btn btn-primary">Save changes</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'].join(''),

        'carsByType' : ['<div class="list-group-item insert" id="i-{.key}">{.carslist}',
            '</div>'].join(''),

        'pager' : ['<ul class="pagination" id="pager"><li class="disabled"><a href="#" class="active">&laquo;</a></li></ul>'].join(''),

        'editUserInfo' : ['<form role="form" class="form-inline">',
            '<div class="form-group">',
            '<label  for="exampleInputEmail2">Email address</label>',
            '<input type="text" class="form-control" id="uid" value="{.uid}" placeholder="Enter email">',
            '</div>',
            '<div class="form-group">',
            '<label for="exampleInputPassword2">likename</label>',
            '<input type="password" class="form-control" value="{.likename}" id="likename" placeholder="likename">',
            '</div>',
            '<div class="form-group">',
            '<label  for="exampleInputEmail2">Email role</label>',
            '<input type="email" class="form-control" value="{.role}" id="role" placeholder="Enter role">',
            '</div>',
            '<div class="form-group">',
            '<label  for="exampleInputPassword2">Password</label>',
            '<input type="password" value="{.pwd}" class="form-control" id="exampleInputPassword2" placeholder="Password">',
            '</div>',
            '<div class="form-group">',
            '<button type="submit" class="btn btn-default">Submit</button>',
            '</div>',
            '</form>'].join('')


    }

    AT['Tpl'] = Tpl;

})(Atong, jQuery, window);
