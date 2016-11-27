<template>
	<!-- 头部导航栏 -->
	<header v-show="isshow" transition="expand">
		<!-- App名字 -->
		<span class="appName" v-text="appName"></span>
		<!-- 菜单btn -->
		<div class="menuBtn" v-on:click="showMenu">
			<div class="circle"></div>
			<div class="circle"></div>
			<div class="circle"></div>
		</div>
		<!-- 菜单项 -->
		<div class="menu" v-on:click="showMenu">
			<p v-link="{path:'/meizi'}">纯·妹子</p>
			<p v-on:click="alertAbout">关于GankApp</p>
			<p v-on:click="jumpToIssue">意见反馈</p>
		</div>
		<!-- 遮罩层 -->
		<div class="overlay" v-on:click="hideMenu" v-on:touchmove="hideMenu"></div>
		<!-- 关于 -->
		<div class="about" v-on:touchmove.stop>
			<p>
				关于GankApp<br />
				<br />
				作者&nbsp<a href="https://github.com/lxz612">问君知否</a>&nbsp&nbsp&nbsp
				项目地址&nbsp<a href="https://github.com/lxz612/GankApp">Github</a><br />
				<br />
				声明<br />
				&nbsp App所有数据来源于<a href="http://gank.io/">&nbsp干货集中营</a><br />
				&nbsp App设计风格来源于<a href="https://github.com/maoruibin/GankDaily">&nbspGankDaily</a><br />
				&nbsp App的logo来自<a href="https://github.com/dongjunkun/GanK">&nbspGank</a><br />
				<br />
				感谢 <a href="https://github.com/daimajia">@代码家</a>&nbsp<a href="https://github.com/maoruibin/GankDaily">@咕咚</a>&nbsp<a href="https://github.com/dongjunkun/GanK">@dongjunkun</a> 
			</p>
		</div>
	</header>
</template>
<script>
	module.exports={  
		props:['isshow'],
		replace:true,
		data(){
			return{
				appName:'GankApp'
			}
		},
		ready(){
			$('.menu').show();
			$(function() {
			  $(".menu p").click(function() {
			    $(this).parent().hide();
			    return false;
			  });
			});
			$('.menu').hide();
		},
		methods:{
			showMenu(){
				if($('.menu').hide()){
					$('.menu').show();
				}
				$('.overlay').show()
			},
			hideMenu(){
				$('.menu').hide();
				$('.overlay').hide();
				$('.about').hide();
			},
			jumpToIssue(){
				$('.overlay').hide();
				window.open("https://github.com/lxz612/GankApp/issues");
			},
			alertAbout(){
				$('.menu').hide();
				$('.about').show();
				$('.overlay').show();
				$('.overlay').css('background','rgba(0,0,0,0.3)');
			},
			stopBubble(e) {
				//如果提供了事件对象，则这是一个非IE浏览器
				if ( e && e.stopPropagation ){
					//因此它支持W3C的stopPropagation()方法
				  e.stopPropagation();
				}else{
				  //否则，我们需要使用IE的方式来取消事件冒泡
				  window.event.cancelBubble = true;
				}
			}
		}
	}
</script>
<style scoped>
	header{
		width: 100%;
		height:60px;
		background: rgb(143,75,46);
		line-height: 60px;

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
	.menuBtn{
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

	.menu{
		display: none;
		width: 200px;
		background: #fff;
		border-radius: 4px;
		position: fixed;
		top: 10px;
		right: 5px;
		z-index: 12;
	}
	.menu p{
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
		width: 80%;
		background: #fff;
		position:fixed;
		top:50%;
		left:50%;
		z-index: 14;
		-webkit-transform:translate(-50%,-50%);
		border-radius: 5px;
		padding: 20px;
	}

	.about h2{
		margin: 0;
		padding: 0;
	}
	.about p{
		margin: 0;
		padding: 0;
		font-size: 20px;
		line-height: 30px;
		/*padding-left: 20px;*/
	}
	.about a{
		text-decoration: none;
		color: rgb(143,75,46);
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
  	top: -70px;
  }
</style>