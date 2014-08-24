/**
 * Created by zhiwen on 14-7-2.
 */
var nodeExcel = require('excel-export'),
    xlsx = require('node-xlsx'),
    fs = require('fs');

exports.exportExcel = {
    header : ['QQ', 'likename','地区', '访问时间', 'blog', 'blogid'],

    toExcelMax : function(req,res,data, filename, fn){

        var splitNum = 100;

        var write = function(d){

            if(filename){
                console.log('========================');
                fs.readFile('./files/'+filename, function(err,file){
                    var conf ={};
                    conf.rows = d || [
                        ['pi', '2001-11-1', true, 3.14],
                        ["e",  '2001-11-1', false, 2.7182]
                    ];
                    var result = nodeExcel.execute(conf);
                    fs.appendFileSync('./files/'+filename, result, 'binary');
                    if(data.length){
                        write(data.splice(0,splitNum));
                    }else{

                        console.log('success');
                    }
                })
            }else{
                var conf ={};
                conf.cols = [
                    {caption:'QQ', type:'string'},
                    {caption:'likename', type:'string'},
                    {caption:'地区', type:'string'},
                    {caption:'访问时间', type:'string'},
                    {caption:'blog', type:'string'},
                    {caption:'blogid', type:'string'}
                ];
                conf.rows = d || [
                    ['pi', '2001-11-1', true, 3.14],
                    ["e",  '2001-11-1', false, 2.7182]
                ];
                filename = (filename||(+new Date))+'.xlsx';
                var result = nodeExcel.execute(conf);
                fs.writeFileSync('./files/'+filename, result, 'binary');
                if(data.length){
                    write(data.splice(0,splitNum));
                }
            }
        }

        write(data.splice(0,splitNum));

    },

    toExcel : function(req, res, data, filename, cols) {
        var conf ={};
        conf.cols = cols || [
            {caption:'QQ', type:'string'},
            {caption:'likename', type:'string'},
            {caption:'地区', type:'string'},
            {caption:'访问时间', type:'string'},
            {caption:'blog', type:'string'},
            {caption:'blogid', type:'string'}
        ];
        conf.rows = data || [
            ['pi', '2001-11-1', true, 3.14],
            ["e",  '2001-11-1', false, 2.7182]
        ];
        filename = (filename||(+new Date))+'.xlsx';
        var result = nodeExcel.execute(conf);
        fs.writeFileSync('./files/'+filename, result, 'binary');
       return;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + filename);
        res.end(result, 'binary');
    },

    toxlsx : function(data, filename, header, fn){
        if(!header) header = this.header;
        if(!filename) filename = (+new Date)+'.xls';
        data.unshift(header);
        var obj = {"worksheets":[{"data":data}]};

        console.log('-------------------------------');
        console.log(obj);

        return;
        var file = xlsx.build(obj);
        fs.writeFileSync('./files/'+filename, file, 'binary');
        fn && fn('/files/'+filename);
    }
}