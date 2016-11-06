<template>
    <!-- 全局header -->
    <my-nav></my-nav>
    <div class="girl_img">
        <a v-bind:href="girl_url"><img v-bind:src="girl_url"></a>
        <span v-text="date"></span>
    </div>
    <div class="gank" v-for="(key,val) in results">
        <!-- 种类 -->
        <p v-text="key" v-if="key!=='福利'"></p>
        <!-- 干货 -->
        <ul>
            <li v-for="item in val" v-if="item.type!=='福利'">
                <span v-text="val.length>1?$index+1+'. ':''"></span><!-- 序号 -->
                <a v-else v-text="item.desc" v-bind:href="item.url"></a><!-- 标题 -->
                <i v-text="item.who"></i><!-- 作者 -->
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                results:'',//干货
                girl_url:'',//妹子图片地址
                date:'2016/11/01'
            }
        },
        route:{
            //data钩子函数.当数据发生变化时调用
            data (transition){
                this.getTodayGank();
            }
        },
        methods:{
            //获取当天干货数据(无配图)。实例：http://gank.io/api/day/2016/11/04
            getTodayGank(){
                //因为es5语法中，回调函数内的this指针为null，所以要先用个变量存储当前的this
                var _self=this;
                $.get('http://gank.io/api/day/2016/11/04',function(d){
                    //console.log(this);//null
                    if(d && !d.error){
                        //获取当天妹子图片
                        Object.keys(d.results).forEach(function(category){
                            if(category=='福利'){
                                console.log(d.results[category]);
                                for(let item in d.results[category]){
                                    console.log('girl_url',d.results[category][item].url);
                                    _self.girl_url=d.results[category][item].url;
                                }
                            }
                        });
                        //获取纯干货
                        _self.results=d.results;
                    }
                });
            }
        },
        components:{
            'myNav':require('../components/nav.vue')//顶部导航栏
        }
    }
    // alert($($('.girl_img')[0]).html());
    //图片处理 图片保持固定宽高比裁剪

</script>
<style type="text/css">
body,ul,img{
    margin: 0;
    padding: 0;
}

li{
    list-style: none;
}
/*妹子图片*/
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

.girl_img span{
    color: #fff;
    font-size: 24px;
    position: absolute;
    right: 10px;
    bottom: 10px;
}
.gank p{
    font-size: 26px;
    color: #000;
}
.gank li{
    margin: 5px 5px;
}
.gank li a{
    color:#222;
    font-size: 24px;
    text-align: justify;
}
</style>

