<template>
	<nav-detail v-bind:isshow="isshow"></nav-detail>
	<div id="main">
		<div class="box" v-for="murl in murls">
			<img v-bind:src="murl.url">
			<span v-text="murl.date"></span>
		</div>
	</div>
</template>
<script>
	import utils from '../utils';

	export default{
		data(){
			return {
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
				console.log('start...');
				this.getMeizis();
				//滚动监听
				$(window).on('scroll', () => {
				    this.getScrollMeizi();
				    this.controlHide();
				});
			}
		},
		methods:{
			//获取妹子数据
			getMeizis(){
				var _self=this;
				//获取妹子图。示例API：http://gank.io/api/data/福利/10/1
				var url="http://gank.io/api/data/福利/10/"+_self.page;
				$.get(url,function(d){
					if(d.results&&!d.error){
						for(let index in d.results){
							let murl={};
							murl.date=d.results[index].desc;
							murl.url=d.results[index].url;
							console.log('date',murl.date);
							console.log('meizi',murl.url);
							_self.murls.push(murl);
						}
						_self.scroll=true;
						
						//瀑布流效果
						_self.$nextTick(function(){
							utils.waterfall();
						});
					}
				});
			},
			//滚动获取妹子数据
			getScrollMeizi(){
				if(this.scroll){
				    let differ=$(document).height()-$(window).height();
				    if($(window).scrollTop()>=differ-10){
			        this.scroll = false;
			        this.page++;
			        this.getMeizis();
				    }
				}
			},
			//导航栏显隐控制
			controlHide(){
			  let curScrollTop=$(window).scrollTop();//当前滚动位置
			  if(curScrollTop<=this.offset){
			    this.isshow=true
			  }else{
			    let curTolerance=Math.abs(this.lastKnowScrollTop-curScrollTop);
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
			'navDetail':require('../components/nav-detail.vue')//顶部导航栏
		}
	}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	#main{
		margin-top: 70px;
		position: relative;
	}
	.box{
		float: left;
		padding: 3px;
		border:1px solid #ccc;
		border-radius: 5px;
		box-shadow:0 0 5px #ccc;
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
		width: 100%;
		margin-left: 5px;
		margin-bottom: 5px;
		color:#fff;
		font-size: 20px;
		z-index: 3;
	}
</style>