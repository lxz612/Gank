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
		<p>纯@妹子</p>
		<p>关于GankApp</p>
		<p>意见反馈</p>
	</div>
	<!-- 遮罩层 -->
	<div class="overlay" v-on:click="hiddenCon" v-on:touchmove="hiddenCon"></div>
</div>
</template>
<script>
export default {  
	replace:true,
	data(){
		return{
			appName:'GankAppBeta'
		} 
	},
	methods:{
		showCon(){
			$('.overlay').css('display','block');
			$('.con').addClass('show');
		},
		hiddenCon(){
			$('.overlay').css('display','none');
			$('.con').removeClass('show');
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
	width: 200px;
	background: #fff;
	border-radius: 4px;
	position: fixed;
	top: 10px;
	right: 5px;
	display: none;
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

.show{
	display: block;
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
</style>