'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
import FastClick from 'fastclick';//处理移动浏览器300ms延时问题

import routerMap from './routers';//路由映射
import filters from './filters';//各种过滤器

Vue.use(VueRouter);

//`$` will be the base `Zepto` object
//Zepto是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api.
//由webpack-zepto模块提供.这里可以直接使用的原因是zepto已经webpack.config文件中配置好了.
$.ajaxSettings.crossDomain = true;

FastClick.attach(document.body);

//实例化Vue的filter
//找出filters对象中的每一个属性，并将属性注册为Vue过滤器
//k为过滤器Id，filters[k]为过滤器函数
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

//创建一个路由器实例
var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: false,//只有在history设置为true的情况下才有用
    transitionOnLoad: false
});

//路由需要一个根组件来渲染，这里使用一个空的组件
var app = Vue.extend({});

// 定义路由规则
routerMap(router);

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(app,"#app");
