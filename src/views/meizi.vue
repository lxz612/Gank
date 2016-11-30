<template>
	<nav-detail v-bind:isshow="isshow"></nav-detail>
	<div class="main">
		<waterfall
			:align="align"
      :line-gap="150"
      :min-line-gap="150"
      :max-line-gap="200"
      :single-max-width="200"
      :watch="murls">
			<waterfall-slot
	          v-for="item in murls"
	          :width="item.width"
	          :height="item.height"
	          :order="$index"
	          track-by="$index">
	      <div class="box" :index="item.index">
	      	<a v-bind:href="item.url"><img v-bind:src="item.url"></a>
					<span v-text="item.date"></span>
	      </div>
	    </waterfall-slot>
		</waterfall>
	</div>
</template>
<script>
	var utils =require('../utils');
	var Waterfall = require('vue-waterfall')

	module.exports={
		data:function(){
			return {
				align:'center',
				murls:[],            //图片URL数组集合
				page:1,              //页数
				scroll:true,         //是否正在滚动
				isshow:true,         //是否显示导航栏
				lastKnowScrollTop:0, //上一次滚动的位置
        offset:280,          //偏移量
        tolerance:10         //容差
			}
		},
		route:{
			data(transition){
				var _self=this;

				//首次获取妹子图
				_self.getMeizis();

				//滚动监听
				$(window).on('scroll', function(){
				    _self.getScrollMeizi();
				    _self.controlHide();
				});
			}
		},
		methods:{
			//获取妹子数据
			getMeizis(){
				var _self=this;
				//获取妹子图。示例API：http://gank.io/api/data/福利/10/1
				var url="https://gank.io/api/data/福利/10/"+_self.page;
				$.get(url,function(d){
					if(d.results&&!d.error){
            d.results.forEach(function(item,index){
            	var murl={};
            	murl.date=item.desc;
							murl.url=item.url;
							murl.index=parseInt(index)+((_self.page-1)*10);
							console.log('murl.index',murl.index);

							var newURL=murl.url;
							var img = new Image();
							img.src=newURL;

							//判断是否有缓存
							if (img.complete) {
								console.log('complete---------');
								murl.width=img.width;
								murl.height=img.height;
								_self.murls.push(murl);
							}else{
								img.onload=function(){
									console.log('onload---------');
									murl.width=img.width;
									murl.height=img.height;
									_self.murls.push(murl);
								}
							}
            })					
						_self.scroll=true;
					}
				});
			},
			//滚动获取妹子数据
			getScrollMeizi(){
				if(this.scroll){
				    var differ=$(document).height()-$(window).height();
				    if($(window).scrollTop()>=differ-10){
			        this.scroll = false;
			        this.page++;
			        this.getMeizis();
				    }
				}
			},
			//导航栏显隐控制
			controlHide(){
			  var curScrollTop=$(window).scrollTop();//当前滚动位置
			  if(curScrollTop<=this.offset){
			    this.isshow=true;
			  }else{
			    var curTolerance=Math.abs(this.lastKnowScrollTop-curScrollTop);
			    if(curScrollTop<this.lastKnowScrollTop&&curTolerance>this.tolerance){
			      this.isshow=true;
			    }else if(curScrollTop>this.lastKnowScrollTop&&curTolerance>this.tolerance){
			      this.isshow=false;
			    }
			    this.lastKnowScrollTop=curScrollTop;
			  }
			}
		},
		components:{
			'navDetail':require('../components/nav-detail.vue'),//顶部导航栏
			'waterfall':Waterfall.waterfall,
			'waterfall-slot': Waterfall.waterfallSlot
		}
	}
</script>
<style scoped>
	.main{
		margin-top: 60px;
		position: relative;
	}
	.box{
		position: absolute;
		top: 5px;
		left: 5px;
		right: 5px;
		bottom: 5px;
		font-size: 1.2em;
		color: rgb(0,158,107);
	}
	.box img{
		width:100%;
		height: auto;
	}
	.box span{
		display: inline-block;
		position: absolute;
		bottom: 0;
		left: 0;
		margin-left: 5px;
		margin-bottom:5px;
		width: 100%;
		color:#fff;
		font-size: 20px;
		z-index: 3;
	}
</style>