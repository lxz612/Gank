webpackJsonp([2,4],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(14)
	__vue_script__ = __webpack_require__(15)
	__vue_template__ = __webpack_require__(35)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var _stringify = __webpack_require__(16);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _keys = __webpack_require__(19);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <my-nav v-bind:isshow="isshow"></my-nav>
	//   <section class="page">
	//     <div v-for="gank in ganks">
	//       <!-- 每日妹子图 -->
	//       <div class="girl_img">
	//         <a v-bind:href="gank.girl_url" v-on:click="saveGankData">
	//           <img v-bind:src="gank.girl_url">
	//         </a>
	//         <time v-text="gank.date"></time>
	//       </div>
	//       <!-- 每日干货 -->
	//       <div class="gank" v-for="(type,items) in gank.results">
	//         <!-- 干货类型 -->
	//         <h3 v-text="type"></h3>
	//         <!-- 每种类型的干货集 -->
	//         <ul>
	//           <!-- 每一条干货 -->
	//           <li v-for="item in items">
	//             <a v-text="item.desc" v-bind:href="item.url" v-on:click="saveGankData"></a>
	//             <span class="author" v-if="item.who">(via. {{item.who}})</span>
	//             <span class="author" v-else>(via. null)</span>
	//           </li>
	//         </ul>
	//       </div>
	//     </div>
	//   </section>
	//   <p class="loading">正在加载...</p>
	// </template>
	// <script>
	var utils = __webpack_require__(30);
	
	module.exports = {
		data: function data() {
			return {
				ganks: [], //多日干货数组
				day: new Date(), //待获取干货的日期
				scroll: true, //是否正在滚动
				isshow: true, //是否显示导航栏
				lastKnowScrollTop: 0, //上一次滚动的位置
				offset: 280, //偏移量
				tolerance: 10 //容差
			};
		},
		route: {
			//在组件激活后调用，即在activate之后
			data: function data(transition) {
				var _self = this;
	
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
				$(window).on('scroll', function () {
					_self.getScrollData();
					_self.controlHide();
				});
			},
			deactivate: function deactivate(transition) {
				this.saveGankData();
				transition.next();
			}
		},
		methods: {
			//获取最新的干货数据。API示例：http://gank.io/api/day/2016/11/04
			getGank: function getGank() {
				var _self = this; //es5语法中，回调函数内的this指针为null，所以要先用个变量存储当前的this
	
				var day = utils.dateFmt(_self.day); //格式化后的今日日期
				// var day=_self.day.toLocaleDateString();//日期为格式化****/**/**
				console.log('日期', day);
				var requrl = 'https://gank.io/api/day/' + day;
				$.get(requrl, function (d) {
					if (d && !utils.isNullObject(d.results) && !d.error) {
						//获取今天干货资源
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
						(0, _keys2.default)(d.results).forEach(function (category) {
							if (category == '福利') {
								for (var item in d.results[category]) {
									gank.girl_url = d.results[category][item].url;
								}
								delete d.results[category]; //删除results对象中的“福利”属性
							}
						});
						gank.date = day;
						gank.results = d.results;
	
						_self.ganks.push(gank);
						_self.scroll = true;
					} else {
						//今天没有干货，就去获取前一天的干货，以此类推
						_self.day.setDate(_self.day.getDate() - 1);
						_self.getGank();
					}
				});
			},
	
			//滚动加载干货数据
			getScrollData: function getScrollData() {
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
			saveGankData: function saveGankData() {
				//停止滚动监听
				$(window).off('scroll');
				sessionStorage.ganks = (0, _stringify2.default)(this.ganks);
				sessionStorage.day = (0, _stringify2.default)(this.day);
			},
	
			//导航栏显隐控制
			controlHide: function controlHide() {
				var curScrollTop = $(window).scrollTop(); //当前滚动位置
				if (curScrollTop <= this.offset) {
					this.isshow = true;
				} else {
					var curTolerance = Math.abs(this.lastKnowScrollTop - curScrollTop);
					if (curScrollTop < this.lastKnowScrollTop && curTolerance > this.tolerance) {
						this.isshow = true;
					} else if (curScrollTop > this.lastKnowScrollTop && curTolerance > this.tolerance) {
						this.isshow = false;
					}
					this.lastKnowScrollTop = curScrollTop;
				}
			}
		},
		components: { //注册组件
			'myNav': __webpack_require__(31) //顶部导航栏
		}
	};
	// </script>
	// <style scoped>
	//
	//   .page{
	//     padding-top: 60px;
	//   }
	//
	//   .girl_img{
	//     width: 100%;
	//     height: 0;
	//     padding-bottom: 50%;
	//     overflow: hidden;
	//     position: relative;
	//   }
	//
	//   .girl_img img{
	//     width: 100%;
	//     -webkit-transform: translateY(-25%);  
	//     -ms-transform: translateY(-25%);  
	//     -moz-transform: translateY(-25%);
	//   }
	//
	//   .girl_img time{
	//     color: #fff;
	//     font-size: 24px;
	//     position: absolute;
	//     right: 10px;
	//     bottom: 10px;
	//   }
	//
	//   .gank h3{
	//     margin-top: 10px;
	//     padding-left: 10px;
	//     font-size: 28px;
	//     color: #111;
	//   }
	//
	//   .gank ul{
	//     padding:0;
	//     list-style: none;
	//   }
	//
	//   .gank li{
	//   	margin:20px 10px;
	//   }
	//
	//   .gank li a{
	//     color:#222;
	//     font-size: 20px;
	//     text-decoration: none;
	//   }
	//
	//   .gank .author{
	//     color: #777;
	//     font-size: 16px;
	//   }
	//
	//   .loading{
	//     margin: 0;
	//     padding: 1em 0;
	//     text-align: center;
	//     background:#eee;
	//     color: #333;
	//   }
	// </style>
	//
	//
	/* generated by vue-loader */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(18);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	module.exports = __webpack_require__(18).Object.keys;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(22);
	
	__webpack_require__(24)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(25)
	  , core    = __webpack_require__(18)
	  , fails   = __webpack_require__(29);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(26)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(27)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 26 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(28);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	'use stirct';
	
	//工具类
	//格式化日期为“yyyy/MM/dd”格式
	
	exports.dateFmt = function (date) {
	  return date.Format('yyyy/MM/dd');
	};
	
	Date.prototype.Format = function (fmt) {
	  var o = {
	    "y+": this.getFullYear(),
	    "M+": this.getMonth() + 1, //月份
	    "d+": this.getDate(), //日
	    "h+": this.getHours(), //小时
	    "m+": this.getMinutes(), //分
	    "s+": this.getSeconds(), //秒
	    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	    "S+": this.getMilliseconds() //毫秒
	  };
	  for (var k in o) {
	    if (new RegExp("(" + k + ")").test(fmt)) {
	      if (k == "y+") {
	        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
	      } else if (k == "S+") {
	        var lens = RegExp.$1.length;
	        lens = lens == 1 ? 3 : lens;
	        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
	      } else {
	        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	      }
	    }
	  }
	  return fmt;
	};
	
	//判断是否为无自定义属性的空对象
	exports.isNullObject = function (obj) {
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      return false; //有自有属性或方法，返回false  
	    }
	  }
	  return true; //没有自有属性或方法，返回true，该对象是空对象  
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(32)
	__vue_script__ = __webpack_require__(33)
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	// <template>
	// 	<!-- 头部导航栏 -->
	// 	<header v-show="isshow" transition="expand">
	// 		<!-- App名字 -->
	// 		<span class="appName" v-text="appName"></span>
	// 		<!-- 菜单btn -->
	// 		<div class="menuBtn" v-on:click="showMenu">
	// 			<div class="circle"></div>
	// 			<div class="circle"></div>
	// 			<div class="circle"></div>
	// 		</div>
	// 		<!-- 菜单项 -->
	// 		<div class="menu" v-on:click="showMenu">
	// 			<p v-link="{path:'/meizi'}">纯·妹子</p>
	// 			<p v-on:click="alertAbout">关于GankApp</p>
	// 			<p v-on:click="jumpToIssue">意见反馈</p>
	// 		</div>
	// 		<!-- 遮罩层 -->
	// 		<div class="overlay" v-on:click="hideMenu" v-on:touchmove="hideMenu"></div>
	// 		<!-- 关于 -->
	// 		<div class="about" v-on:touchmove.stop>
	// 			<p>
	// 				关于GankApp<br />
	// 				<br />
	// 				作者&nbsp<a href="https://github.com/lxz612">问君知否</a>&nbsp&nbsp&nbsp
	// 				项目地址&nbsp<a href="https://github.com/lxz612/GankApp">Github</a><br />
	// 				<br />
	// 				声明<br />
	// 				&nbsp App所有数据来源于<a href="http://gank.io/">&nbsp干货集中营</a><br />
	// 				&nbsp App设计风格来源于<a href="https://github.com/maoruibin/GankDaily">&nbspGankDaily</a><br />
	// 				&nbsp App的logo来自<a href="https://github.com/dongjunkun/GanK">&nbspGank</a><br />
	// 				<br />
	// 				感谢 <a href="https://github.com/daimajia">@代码家</a>&nbsp<a href="https://github.com/maoruibin/GankDaily">@咕咚</a>&nbsp<a href="https://github.com/dongjunkun/GanK">@dongjunkun</a> 
	// 			</p>
	// 		</div>
	// 	</header>
	// </template>
	// <script>
	module.exports = {
		props: ['isshow'],
		replace: true,
		data: function data() {
			return {
				appName: 'GankApp'
			};
		},
		ready: function ready() {
			$('.menu').show();
			$(function () {
				$(".menu p").click(function () {
					$(this).parent().hide();
					return false;
				});
			});
			$('.menu').hide();
		},
	
		methods: {
			showMenu: function showMenu() {
				if ($('.menu').hide()) {
					$('.menu').show();
				}
				$('.overlay').show();
			},
			hideMenu: function hideMenu() {
				$('.menu').hide();
				$('.overlay').hide();
				$('.about').hide();
			},
			jumpToIssue: function jumpToIssue() {
				$('.overlay').hide();
				window.open("https://github.com/lxz612/GankApp/issues");
			},
			alertAbout: function alertAbout() {
				$('.menu').hide();
				$('.about').show();
				$('.overlay').show();
				$('.overlay').css('background', 'rgba(0,0,0,0.3)');
			},
			stopBubble: function stopBubble(e) {
				//如果提供了事件对象，则这是一个非IE浏览器
				if (e && e.stopPropagation) {
					//因此它支持W3C的stopPropagation()方法
					e.stopPropagation();
				} else {
					//否则，我们需要使用IE的方式来取消事件冒泡
					window.event.cancelBubble = true;
				}
			}
		}
	};
	// </script>
	// <style scoped>
	// 	header{
	// 		width: 100%;
	// 		height:60px;
	// 		background: rgb(143,75,46);
	// 		line-height: 60px;
	//
	// 		position: fixed;
	// 		top: 0;
	// 		left: 0;
	// 		z-index: 10;
	// 	}
	// 	.appName{
	// 		color: #fff;
	// 		font-size: 20px;
	// 		margin-left: 15px;
	// 	}
	// 	.menuBtn{
	// 		width: 60px;
	// 		height: 70px;
	// 		float: right;
	// 		z-index: 12;
	// 		text-align: center;
	// 	}
	// 	.circle{
	// 		width: 6px;
	// 		height: 6px;
	// 		display: inline-block;
	// 		background: #fff;
	// 		-moz-border-radius: 3px;
	// 	  -webkit-border-radius: 3px;
	// 	 	border-radius: 3px;
	// 	}
	//
	// 	.menu{
	// 		display: none;
	// 		width: 200px;
	// 		background: #fff;
	// 		border-radius: 4px;
	// 		position: fixed;
	// 		top: 10px;
	// 		right: 5px;
	// 		z-index: 12;
	// 	}
	// 	.menu p{
	// 		padding:0 15px 0;
	// 		margin:0;
	// 		height: 50px;
	// 		line-height: 50px;
	// 		width: 200px;
	// 		font-size:16px;
	// 	}
	//
	// 	.overlay{
	// 		display: none;
	// 	  position: fixed;
	// 	  top: 0;
	// 	  left: 0;
	// 	  right: 0;
	// 	  bottom: 0;
	// 	  background: rgba(0,0,0);
	// 	}
	//
	// 	.about{
	// 		display: none;
	// 		width: 80%;
	// 		background: #fff;
	// 		position:fixed;
	// 		top:50%;
	// 		left:50%;
	// 		z-index: 14;
	// 		-webkit-transform:translate(-50%,-50%);
	// 		border-radius: 5px;
	// 		padding: 20px;
	// 	}
	//
	// 	.about h2{
	// 		margin: 0;
	// 		padding: 0;
	// 	}
	// 	.about p{
	// 		margin: 0;
	// 		padding: 0;
	// 		font-size: 20px;
	// 		line-height: 30px;
	// 		/*padding-left: 20px;*/
	// 	}
	// 	.about a{
	// 		text-decoration: none;
	// 		color: rgb(143,75,46);
	// 	}
	//
	// 	/* 必需 */
	//   .expand-transition {
	//   	will-change: top;
	//     transition: top .25s ease-in-out;;
	//   }
	//
	//
	//
	//   /* .expand-enter 定义进入的开始状态 */
	//   .expand-enter{
	//   	top:-70px;
	//   }
	//
	//   /* .expand-leave 定义离开的结束状态 */
	//   .expand-leave {
	//   	top: -70px;
	//   }
	// </style>
	/* generated by vue-loader */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "\n\t<!-- 头部导航栏 -->\n\t<header v-show=\"isshow\" transition=\"expand\" _v-4344d59d=\"\">\n\t\t<!-- App名字 -->\n\t\t<span class=\"appName\" v-text=\"appName\" _v-4344d59d=\"\"></span>\n\t\t<!-- 菜单btn -->\n\t\t<div class=\"menuBtn\" v-on:click=\"showMenu\" _v-4344d59d=\"\">\n\t\t\t<div class=\"circle\" _v-4344d59d=\"\"></div>\n\t\t\t<div class=\"circle\" _v-4344d59d=\"\"></div>\n\t\t\t<div class=\"circle\" _v-4344d59d=\"\"></div>\n\t\t</div>\n\t\t<!-- 菜单项 -->\n\t\t<div class=\"menu\" v-on:click=\"showMenu\" _v-4344d59d=\"\">\n\t\t\t<p v-link=\"{path:'/meizi'}\" _v-4344d59d=\"\">纯·妹子</p>\n\t\t\t<p v-on:click=\"alertAbout\" _v-4344d59d=\"\">关于GankApp</p>\n\t\t\t<p v-on:click=\"jumpToIssue\" _v-4344d59d=\"\">意见反馈</p>\n\t\t</div>\n\t\t<!-- 遮罩层 -->\n\t\t<div class=\"overlay\" v-on:click=\"hideMenu\" v-on:touchmove=\"hideMenu\" _v-4344d59d=\"\"></div>\n\t\t<!-- 关于 -->\n\t\t<div class=\"about\" v-on:touchmove.stop=\"\" _v-4344d59d=\"\">\n\t\t\t<p _v-4344d59d=\"\">\n\t\t\t\t关于GankApp<br _v-4344d59d=\"\">\n\t\t\t\t<br _v-4344d59d=\"\">\n\t\t\t\t作者&nbsp;<a href=\"https://github.com/lxz612\" _v-4344d59d=\"\">问君知否</a>&nbsp;&nbsp;&nbsp;\n\t\t\t\t项目地址&nbsp;<a href=\"https://github.com/lxz612/GankApp\" _v-4344d59d=\"\">Github</a><br _v-4344d59d=\"\">\n\t\t\t\t<br _v-4344d59d=\"\">\n\t\t\t\t声明<br _v-4344d59d=\"\">\n\t\t\t\t&nbsp; App所有数据来源于<a href=\"http://gank.io/\" _v-4344d59d=\"\">&nbsp;干货集中营</a><br _v-4344d59d=\"\">\n\t\t\t\t&nbsp; App设计风格来源于<a href=\"https://github.com/maoruibin/GankDaily\" _v-4344d59d=\"\">&nbsp;GankDaily</a><br _v-4344d59d=\"\">\n\t\t\t\t&nbsp; App的logo来自<a href=\"https://github.com/dongjunkun/GanK\" _v-4344d59d=\"\">&nbsp;Gank</a><br _v-4344d59d=\"\">\n\t\t\t\t<br _v-4344d59d=\"\">\n\t\t\t\t感谢 <a href=\"https://github.com/daimajia\" _v-4344d59d=\"\">@代码家</a>&nbsp;<a href=\"https://github.com/maoruibin/GankDaily\" _v-4344d59d=\"\">@咕咚</a>&nbsp;<a href=\"https://github.com/dongjunkun/GanK\" _v-4344d59d=\"\">@dongjunkun</a> \n\t\t\t</p>\n\t\t</div>\n\t</header>\n";

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "\n  <my-nav v-bind:isshow=\"isshow\" _v-16ed8d54=\"\"></my-nav>\n  <section class=\"page\" _v-16ed8d54=\"\">\n    <div v-for=\"gank in ganks\" _v-16ed8d54=\"\">\n      <!-- 每日妹子图 -->\n      <div class=\"girl_img\" _v-16ed8d54=\"\">\n        <a v-bind:href=\"gank.girl_url\" v-on:click=\"saveGankData\" _v-16ed8d54=\"\">\n          <img v-bind:src=\"gank.girl_url\" _v-16ed8d54=\"\">\n        </a>\n        <time v-text=\"gank.date\" _v-16ed8d54=\"\"></time>\n      </div>\n      <!-- 每日干货 -->\n      <div class=\"gank\" v-for=\"(type,items) in gank.results\" _v-16ed8d54=\"\">\n        <!-- 干货类型 -->\n        <h3 v-text=\"type\" _v-16ed8d54=\"\"></h3>\n        <!-- 每种类型的干货集 -->\n        <ul _v-16ed8d54=\"\">\n          <!-- 每一条干货 -->\n          <li v-for=\"item in items\" _v-16ed8d54=\"\">\n            <a v-text=\"item.desc\" v-bind:href=\"item.url\" v-on:click=\"saveGankData\" _v-16ed8d54=\"\"></a>\n            <span class=\"author\" v-if=\"item.who\" _v-16ed8d54=\"\">(via. {{item.who}})</span>\n            <span class=\"author\" v-else=\"\" _v-16ed8d54=\"\">(via. null)</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </section>\n  <p class=\"loading\" _v-16ed8d54=\"\">正在加载...</p>\n";

/***/ }
]);
//# sourceMappingURL=2.build.js.map?246550972095da95fd0c