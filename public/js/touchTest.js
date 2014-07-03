/**
 * Created by steven on 14-7-4.
 */

$('body').on('swipeUp swipeDown touchmove ', 'div.pages', function(e){
    if(e.type !== 'touchmove'){
        //console.log(arguments);
        var d = fns.willShowAndHide(e.type, $(this).index());
        console.log(d);
        console.log('swipeUp');
    }
})


var fns = {

    pages : 2,
    /**
     * @getPageHeight function
     * 获取指定page的top
     * index：第几个
     * isToUP : 是否向上
     * isShow : 是否要显示
     */
    getPageHeight : function(index, isToUp, isShow){
        var m = isToUp ? -1 : 1;
        if(index<2){
            return isShow ? 0 : (winc.height*m);
        }else{
            if(isShow){
                return (0+(this.sHeight));
            }else{
                return (winc.height-this.sHeight)*m;
            }

        }

    },

    /**
     * @getWillShow function
     * 获取将要显示的
     * turn : 向上或者向下
     * index : 当前touch对象
     */
    willShowAndHide : function(turn, index){
        if(turn === 'swipeUp'){
            if(index === this.pages) return '';//最后一个没有可向上的对象
            return [index+1, index];
        }else if(turn === 'swipeDown'){
            if(index === 0) return '';//第一个没有可以向下的
            return [index-1, index];
        }
    },

    /**
     *  getTouchTrunXandY function
     *	取得当前touch方向
     *
     */
    getTouchTrunXandY : function(event, data){
        var turnX = 'left', turnY = 'top';
        if(data.x > 0) turnX = 'right';

        if(data.y > 0) turnY = 'down';

        return [turnX, turnY];
    }

}