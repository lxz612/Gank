'use stirct'

//工具类
//格式化日期
var dateFmt=function(date) {
	return date.Format('yyyy/MM/dd');
}

exports.dateFmt=dateFmt;

//格式化日期
Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S+": this.getMilliseconds()             //毫秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)){
      if(k == "y+"){
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if(k=="S+"){
        var lens = RegExp.$1.length;
        lens = lens==1?3:lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
      }
      else{
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}

// exports.waterfall=function(){
//   var $boxs=$('#main .box');
//   var w=$boxs.eq(0).width();

//   var cols=Math.floor($(window).width()/w);
//   $('#main').width(w*cols).css('margin-top','70px');
//   var hArr=[];
//   $boxs.each(function(index,value){
//     var h=$boxs.eq(index).height();
//     if(index<cols){ 
//       hArr[index]=h;
//     }else{
//       var minH=Math.min.apply(null,hArr);
//       var minHIndex=$.inArray(minH,hArr);
//       $(value).css({'position':'absolute','top':minH+'px','left':minHIndex*w+'px'})
//       hArr[minHIndex]+=$boxs.eq(index).height();
//     }
//   })
// }

//瀑布流效果
exports.waterfall=function(){
  var $boxs=$('#main .box');
  var cols=2;
  var w=($('#main').width())/2;
  var hArr=[];
  $boxs.each(function(index,value){
    $boxs.eq(index).css('width',(w-10)+'px');
    var h=$boxs.eq(index).height();
    if(index<cols){
      hArr[index]=h;
    }else{
      var minH=Math.min.apply(null,hArr);
      var minHIndex=$.inArray(minH,hArr);
      $(value).css({'position':'absolute','top':minH+'px','left':minHIndex*w+'px'});
      hArr[minHIndex]+=$boxs.eq(index).height();
    }
  });
}
