'use stirct'

//工具类
//格式化日期为“yyyy/MM/dd”格式
exports.dateFmt=function(date) {
  return date.Format('yyyy/MM/dd');
};

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

//瀑布流计算呈现
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

//判断是否为无自定义属性的空对象
exports.isNullObject=function(obj) {
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      return false; //有自有属性或方法，返回false  
    }
  }
  return true; //没有自有属性或方法，返回true，该对象是空对象  
}
