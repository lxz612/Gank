<!-- 妹子 -->
<template>
	<my-nav></my-nav>
	<div class="girl-img">
		<img src="http://ww2.sinaimg.cn/large/610dc034gw1f9kjnm8uo1j20u00u0q5q.jpg">
	</div>
</template>
<script>
	export default {
		data(){
			return {
				girl_url:'',
			}
		},
		ready(){
      
    },
		route:{
			//data钩子函数
      data (transition){}
		},
    components:{
        'myNav':require('../components/nav.vue')//顶部导航栏
    }
	}
</script>
<style>
body{
	padding:0;
	margin:0;
}
.girl-img{
	margin-top: 70px;
}

.girl-img img{
	width: 100%;
}
</style>