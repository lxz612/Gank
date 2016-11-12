<template>
	<my-nav></my-nav>
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
			murls:[],
			page:1,
			scroll:true
		}
	},
	route:{
		data(transition){
			console.log('start...');
			this.getMeizis();
			//滚动监听
			$(window).on('scroll', () => {
			    this.getScrollMeizi();
			});
		}
	},
	methods:{
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
					_self.$nextTick(function(){
						utils.waterfall();
					});
				}
			});
		},
		getScrollMeizi(){
			if(this.scroll){
			    let differ=$(document).height()-$(window).height();
			    if($(window).scrollTop()>=differ-10){
		        this.scroll = false;
		        this.page++;
		        this.getMeizis();
			    }
			}
		}
	},
	components:{
		'myNav':require('../components/nav.vue')//顶部导航栏
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