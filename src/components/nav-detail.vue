<template>
	<!-- 头部导航页 -->
	<header class="header" v-show="isshow" transition="expand">
		<!-- 返回icon -->
		<div class="nav-wrap-left">
			<a class="back" href="javascript:history.back()">
				<i class="icon-back"></i>
			</a>
		</div>
		<!-- title -->
		<div class="title">妹子们</div>
	</header>
</template>
<script>
	module.exports={
		props:['isshow'],
		data:function(){
			return {
			}
		},
		methods:{
		}
	} 
</script>
<style scoped>
	header{
		width: 100%;
		height:60px;
		line-height: 60px;
		background: rgb(143,75,46);

		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.nav-wrap-left {
	  height: 60px;
	  width: 60px;
	  line-height: 60px;
	  display: table;
	  float: left;
	}

	.nav-wrap-left a.back{
		width: 60px;
		height: 60px;
		display: table-cell;
		vertical-align: middle;
		padding: 0 10px;
		text-decoration: none;
	}

	a.back .icon-back{
		display: inline-block;
		width: 20px;
  	height: 20px;
  	position: relative;
	}
	.icon-back:before{
		content: '';
		display: block;
		position: absolute;
		left: 10px;
		top: 0;
		width: 30px;
		height: 30px;
		border-bottom: 3px solid #fff;
		border-left: 3px solid #fff;
		-webkit-transform: scaleY(0.8) rotateZ(45deg);
	  -moz-transform: scaleY(0.8) rotateZ(45deg);
	  -ms-transform: scaleY(0.8) rotateZ(45deg);
	}

	.title{
		color:#fff;
		width: 60px;
		height: 60px;
		float: left;
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