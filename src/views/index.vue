<template>
    <!-- 全局header -->
    <my-nav></my-nav>
    <section id="page">
        <div v-for="gank in ganks" v-if="gank.results|isObject">
            <!-- 每日妹子图 -->
            <div class="girl_img">
                <a v-bind:href="gank.girl_url"><img v-bind:src="gank.girl_url"></a><!-- url -->
                <span v-text="gank.date"></span><!-- 日期 -->
            </div>
            <!-- 每日干货 -->
            <div class="gank" v-for="(type,items) in gank.results" v-if="type!=='福利'">
                <!-- 干货类型 -->
                <p v-text="type"></p>
                <!-- 每种类型的干货集 -->
                <ul>
                    <li v-for="item in items" v-link="{path:'/detail'}">
                        <a v-text="item.desc"></a><!-- 标题 -->
                        <span class="author" v-if="item.who">(via. {{item.who}})</span><!-- 作者 -->
                        <span class="author" v-else>(via. null})</span><!-- 作者为null -->
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
    import utils from '../utils'

    export default {
        data(){
            return {
                ganks:[],//几天干货数组
                day:new Date(),//待获取干货的日期
                scroll:true,//是否允许滚动加载数据
            }
        },
        route:{
            //data钩子函数.当数据发生变化时调用
            data (transition){
                if(sessionStorage.ganks && sessionStorage.day){
                    this.ganks = JSON.parse(sessionStorage.ganks);
                    this.day =new Date(JSON.parse(sessionStorage.day));
                    this.$nextTick(()=> $(window).scrollTop(sessionStorage.scrollTop));
                }else{
                    this.getGank();
                }
                //滚动加载
                $(window).on('scroll', () => {
                    this.getScrollData();
                });
            },
            //钩子函数.禁用组件
            deactivate (transition){
                //移除滚动监听事件
                $(window).off('scroll');
                console.log('oofoeoofea');
                if (transition.to.name === "detail") {
                    sessionStorage.scrollTop = $(window).scrollTop();
                    sessionStorage.ganks = JSON.stringify(this.ganks);
                    sessionStorage.day = JSON.stringify(this.day);
                }else{
                    sessionStorage.removeItem("ganks");
                    sessionStorage.removeItem("day");
                }
                transition.next();
            }
        },
        methods:{
            //获取最新的干货数据(无配图)。实例：http://gank.io/api/day/2016/11/04
            getGank(){
                var _self=this;//因为es5语法中，回调函数内的this指针为null，所以要先用个变量存储当前的this

                var day=utils.dateFmt(_self.day);//格式化后的今日日期
                console.log(day);
                var requrl='http://gank.io/api/day/'+day;
                $.get(requrl,function(d){
                    
                    if(d && !isNullObject(d.results) &&!d.error){//获取今日干货资源
                        //说明
                        // gank:{//某日干货
                        //     girl_url:'',//妹子图片地址
                        //     date:''//日期
                        //     results:''//内容
                        // }
                        var gank={};
                        gank.date=day;
                        gank.results=d.results;

                        Object.keys(d.results).forEach(function(category){//获取今日妹子图
                            if(category=='福利'){
                                console.log(d.results[category]);
                                for(let item in d.results[category]){
                                    console.log('girl_url',d.results[category][item].url);
                                    gank.girl_url=d.results[category][item].url;
                                }
                            }
                        });
                        _self.ganks.push(gank);
                        _self.scroll = true;
                    }else{
                        _self.day.setDate(_self.day.getDate()-1);
                        _self.getGank();
                    }
                });
            },
            //滚动加载干货数据
            getScrollData(){
                if(this.scroll){
                    //原理：当“文档滚动距离>=文档总高度-窗口高度”时，进行加载。
                    //但实际上文档滚动距离会出现偏差，即不会等于或大于后者的差值（可以观察下面两个log打印的值）。这时就要略微再减少一点差值，才能有作用。
                    let differ=$(document).height()-$(window).height();
                    // console.log('$(window).scrollTop()',$(window).scrollTop());
                    // console.log('differ',differ);
                    if($(window).scrollTop()>=differ-10){
                        this.scroll = false;
                        this.day.setDate(this.day.getDate()-1);
                        this.getGank();
                    }
                }
            }
        },
        components:{
            'myNav':require('../components/nav.vue')//顶部导航栏
        }
    }
    function isNullObject(obj){  
        for(var p in obj){  
            if(obj.hasOwnProperty(p)){  
                return false;  //有自有属性或方法，返回false  
            }  
        }  
        return true;  //没有自有属性或方法，返回true，该对象是空对象  
    }  
</script>
<style type="text/css">
    body,img{
        margin: 0;
        padding: 0;
    }

    #page{
        padding-top: 70px;
    }

    /*妹子图片*/
    /*容器*/
    .girl_img{
        width: 100%;
        height: 0;
        padding-bottom: 50%;
        overflow: hidden;
        position: relative;
    }

    /*图片*/
    .girl_img img{
        width: 100%;
        -webkit-transform: translateY(-25%);  
        -ms-transform: translateY(-25%);  
        -moz-transform: translateY(-25%);
    }
    /*日期*/
    .girl_img span{
        color: #fff;
        font-size: 24px;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .gank p{
        padding-left: 10px;
        font-size: 28px;
        color: #000;
    }
    .gank ul{
        padding:0;
        list-style: none;
    }
    .gank li{
        margin: 20px 10px;
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
</style>

