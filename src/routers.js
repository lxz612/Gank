'use strict'

export default function(router) {
	//路由映射
	router.map({
        '/': { //首页
            name: 'start',
            component: function(resolve) {
                require(['./views/start.vue'], resolve);
            }
        },
        '/index':{
        		name: 'index',
        		component: function(resolve) {
                require(['./views/index.vue'], resolve);
            }
        }
  });
}