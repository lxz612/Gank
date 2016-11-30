<template>
  <my-nav v-bind:isshow="isshow"></my-nav>
  <section class="page">
    <div v-for="gank in ganks">
      <!-- 每日妹子图 -->
      <div class="girl_img">
        <a v-bind:href="gank.girl_url" v-on:click="saveGankData">
          <img v-bind:src="gank.girl_url">
        </a>
        <time v-text="gank.date"></time>
      </div>
      <!-- 每日干货 -->
      <div class="gank" v-for="(type,items) in gank.results">
        <!-- 干货类型 -->
        <h3 v-text="type"></h3>
        <!-- 每种类型的干货集 -->
        <ul>
          <!-- 每一条干货 -->
          <li v-for="item in items">
            <a v-text="item.desc" v-bind:href="item.url" v-on:click="saveGankData"></a>
            <span class="author" v-if="item.who">(via. {{item.who}})</span>
            <span class="author" v-else>(via. null)</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <p class="loading">正在加载...</p>
</template>
<script>
  var utils=require('../utils');

  module.exports={
  	data:function(){
			return {
				ganks: [],           //多日干货数组
				day: new Date(),     //待获取干货的日期
				scroll: true,        //是否正在滚动
				isshow: true,        //是否显示导航栏
        lastKnowScrollTop:0, //上一次滚动的位置
        offset:280,          //偏移量
        tolerance:10         //容差
			}
		},
		route: {
			//在组件激活后调用，即在activate之后
			data(transition) {
         var _self=this;

				//如果是从启动页过来，就清空干货和日期数据
				if (transition.from.path == '/') {
					sessionStorage.removeItem("ganks");
					sessionStorage.removeItem("day");
				}
				//如果有干货和日期的数据存储，就取出来，没有就重新加载
				if (sessionStorage.ganks && sessionStorage.day) {
					_self.ganks = JSON.parse(sessionStorage.ganks);
					_self.day = new Date(JSON.parse(sessionStorage.day));
				} else {
					_self.getGank();
				}

				//滚动监听
        $(window).on('scroll',function(){
          _self.getScrollData();
          _self.controlHide();
        });

			},
			deactivate(transition) {
				this.saveGankData();
				transition.next();
			}
		},
		methods: {
			//获取最新的干货数据。API示例：http://gank.io/api/day/2016/11/04
			getGank() {
				var _self = this; //es5语法中，回调函数内的this指针为null，所以要先用个变量存储当前的this

				var day = utils.dateFmt(_self.day); //格式化后的今日日期
        // var day=_self.day.toLocaleDateString();//日期为格式化****/**/**
				console.log('日期',day);
				var requrl = 'https://gank.io/api/day/' + day;
				$.get(requrl, function(d) {
					if (d && !utils.isNullObject(d.results) && !d.error) { //获取今天干货资源
						//----------------
						// gank对象说明
						// gank:{           //某日干货
						//     girl_url:'', //妹子图片地址
						//     date:''      //日期
						//     results:''   //内容
						// }
						//-----------------
						var gank = {};

						//获取今日妹子图并删除“福利”
						Object.keys(d.results).forEach(function(category) { 
							if (category == '福利') {
								for (var item in d.results[category]) {
									gank.girl_url = d.results[category][item].url;
								}
								delete d.results[category];//删除results对象中的“福利”属性
							}
						});
						gank.date = day;
						gank.results = d.results;

						_self.ganks.push(gank);
						_self.scroll = true;
					} else {//今天没有干货，就去获取前一天的干货，以此类推
						_self.day.setDate(_self.day.getDate() - 1);
						_self.getGank();
					}
				});
			},
			//滚动加载干货数据
			getScrollData() {
				if (this.scroll) {
					//原理：当“文档滚动距离>=文档总高度-窗口高度”时，进行加载。
					//但实际上文档滚动距离会出现偏差，即不会等于或大于后者的差值（可以观察下面两个log打印的值）。这时就要略微再减少一点差值，才能有作用。
					var differ = $(document).height() - $(window).height();
					if ($(window).scrollTop() >= differ - 10) {
						this.scroll = false;
						this.day.setDate(this.day.getDate() - 1);
						this.getGank();
					}
				}
			},
			//在sessionStorage存储干货和日期数据
			saveGankData() {
				//停止滚动监听
				$(window).off('scroll');
				sessionStorage.ganks = JSON.stringify(this.ganks);
				sessionStorage.day = JSON.stringify(this.day);
			},
      //导航栏显隐控制
      controlHide(){
        var curScrollTop=$(window).scrollTop();//当前滚动位置
        if(curScrollTop<=this.offset){
          this.isshow=true
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
		components: {//注册组件
			'myNav': require('../components/nav.vue') //顶部导航栏
		}
  }
</script>
<style scoped>

  .page{
    padding-top: 60px;
  }

  .girl_img{
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    overflow: hidden;
    position: relative;
  }
  
  .girl_img img{
    width: 100%;
    -webkit-transform: translateY(-25%);  
    -ms-transform: translateY(-25%);  
    -moz-transform: translateY(-25%);
  }

  .girl_img time{
    color: #fff;
    font-size: 24px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .gank h3{
    margin-top: 10px;
    padding-left: 10px;
    font-size: 28px;
    color: #111;
  }

  .gank ul{
    padding:0;
    list-style: none;
  }

  .gank li{
  	margin:20px 10px;
  }

  .gank li a{
    color:#222;
    font-size: 20px;
    text-decoration: none;
  }

  .gank .author{
    color: #777;
    font-size: 16px;
  }

  .loading{
    margin: 0;
    padding: 1em 0;
    text-align: center;
    background:#eee;
    color: #333;
  }
</style>

