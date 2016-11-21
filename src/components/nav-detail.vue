<template>
	<!-- 详情导航页 -->
	<div class="detail_nav" v-show="isshow" transition="expand">
		<!-- 返回icon -->
		<span class="goback" v-on:click="back"></span>
		<!-- title -->
		<span class="title">妹子们</span>
	</div>
</template>
<script>
	export default{
		props:['isshow'],
		data(){
			return {

			}
		},
		methods:{
			back(){
				history.go(-1);
			}
		}
	} 
</script>
<style scoped>
	.detail_nav{
		width: 100%;
		height:70px;
		background: rgb(143,75,46);
		line-height: 70px;

		position: fixed;
		top: 0px;
		left: 0;
		z-index: 10;
	}
	.goback{
		position: absolute;
		top: 20px; 
		left: 5px;
		border: 15px solid transparent;
		border-right: 20px solid #fff;
	}
	.goback:after{
		content: '';
		position: absolute;
		top: -14.5px; 
		left: -7px;
		border: 15px solid transparent;
		border-right: 20px solid rgb(143,75,46);
	}

	.title{
		margin-left:50px;
		color:#fff;
		font-size: 20px;
	}

  /* 必需 */
  .expand-transition {
  	will-change: top;
    transition: top .25s ease-in-out;;
  }

	/* .expand-enter 定义进入的开始状态 */
  .expand-enter{
  	top:-70px;
  }
  
  /* .expand-leave 定义离开的结束状态 */
  .expand-leave {
  	top:-70px;
  }
</style>