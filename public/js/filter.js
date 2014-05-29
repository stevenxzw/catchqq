/**
 * Created by zhiwen on 14-5-20.
 */
(function(AT){
    var util = AT['Util'];
    angular.module('filterList', []).filter('test', function(){
        return function(v){
            return 'test-filter';
        }
    }).filter('vNull', function(){
            return function(v) {
                if(v === '') return '-';
                return v;
            };
    }).filter('toTime', function(){
            return function(v){
                return util.timeToDate(v);
            }
    });


})(Atong);