'use stirct'

import Vue from 'vue';
import VueRouter from 'vue-router';
import FastClick from 'fastclick';

import routerMap from './routers';

Vue.use(VueRouter);

//`$` will be the base `Zepto` object
//设置允许跨域
$.ajaxSettings.crossDomain = true;

//解决移动浏览器300ms延时问题
FastClick.attach(document.body);

//创建一个路由器实例
var router = new VueRouter({
    hashbang: true,
    history: true,//启用History
    saveScrollPosition: true,//保存滚动位置，只有在history设置为true的情况下才有用
    transitionOnLoad: false
});

//路由需要一个根组件来渲染，这里使用一个空的组件
var app = Vue.extend({});

// 定义路由规则
routerMap(router);

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(app,"#app");