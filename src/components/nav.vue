<template>
<!-- 顶部导航栏 -->
<div class="nav">
	<span class="appName" v-text="appName"></span>
</div>
</template>
<script>
export default {  
	replace:true,
	data(){
		return{
			appName:'GankAppBeta'
		} 
	}
}
</script>
<style>
.nav{
	height:70px;
	background: rgb(143,75,46);
	line-height: 70px;
}
.appName{
	color: #fff;
	font-size: 20px;
	margin-left: 15px;
}

</style>