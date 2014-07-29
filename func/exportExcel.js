/**
 * Created by zhiwen on 14-7-2.
 */
var nodeExcel = require('excel-export');
exports.exportExcel = function(req, res, data, filename, cols) {
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
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + filename);
    res.end(result, 'binary');
};
