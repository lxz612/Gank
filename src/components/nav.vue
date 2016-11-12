<template>
<!-- 顶部导航栏 -->
<div class="nav">
	<span class="appName" v-text="appName"></span>
	<div class="setting" v-on:click="showCon">
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="circle"></div>
	</div>
	<!-- 菜单 -->
	<div class="con" v-on:click="showCon">
		<p v-link="{path:'/meizi'}">纯@妹子</p>
		<p v-on:click="alertAbout">关于GankApp</p>
		<p v-on:click="jumpToIssue">意见反馈</p>
	</div>
	<!-- 遮罩层 -->
	<div class="overlay" v-on:click="hiddenCon" v-on:touchmove="hiddenCon"></div>
	<!-- About -->
	<div class="about">
		<p>关于GankApp</p>
		<p>
			GankApp，每天提供技术干货的WebApp。<br />
			本App所有数据均来自<a href="http://gank.io/">干货集中营</a><br />
			作者:lxz612<br />
			开源地址:https://github.com/lxz612/GankApp<br />
			感谢 @代码家 @咕咚
		</p>
	</div>
</div>
</template>
<script>
export default {  
	replace:true,
	data(){
		return{
			appName:'GankApp1.0'
		} 
	},
	ready(){
		$('.con').show();
		$(function() {
		  $(".con p").click(function() {
		  	console.log('hello');
		    $(this).parent().hide();
		    return false;
		  });
		});
		$('.con').hide();
	},
	methods:{
		showCon(){
			if($('.con').hide()){
				$('.con').show();
			}
			$('.overlay').show()
		},
		hiddenCon(){
			$('.con').hide();
			$('.overlay').hide();
			$('.about').hide();
		},
		jumpToIssue(){
			$('.overlay').hide();
			window.open("https://github.com/lxz612/GankApp/issues");
		},
		alertAbout(){
			$('.con').hide();
			$('.about').show();
			$('.overlay').show();
			$('.overlay').css('background','rgba(0,0,0,0.3)');
		}
	}
}
</script>
<style scoped>
.nav{
	width: 100%;
	height:70px;
	background: rgb(143,75,46);
	line-height: 70px;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}
.appName{
	color: #fff;
	font-size: 20px;
	margin-left: 15px;
}
.setting{
	width: 60px;
	height: 70px;
	float: right;
	z-index: 12;
	text-align: center;
}
.circle{
	width: 6px;
	height: 6px;
	display: inline-block;
	background: #fff;
	-moz-border-radius: 3px;
  -webkit-border-radius: 3px;
 	border-radius: 3px;
}

.con{
	display: none;
	width: 200px;
	background: #fff;
	border-radius: 4px;
	position: fixed;
	top: 10px;
	right: 5px;
	z-index: 12;
}
.con p{
	padding:0 15px 0;
	margin:0;
	height: 50px;
	line-height: 50px;
	width: 200px;
	font-size:16px;
}

.overlay{
	display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0);
}

.about{
	display: none;
	width: 380px;
	height: 400px;
	background: #fff;
	position:fixed;
	top: 50%;
	left:50%;
	z-index: 14;
	margin:-200px 0 0 -190px;
	border-radius: 5px;
}
.about p{
	margin: 0;
	padding: 0;
	line-height: 60px;
	font-size: 16px;
	padding-left: 20px;
}
</style>