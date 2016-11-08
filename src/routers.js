'use strict'

//定义路由规则
export default function(router) {
	//路由映射
	router.map({
        '/': { //启动页
            name: 'start',
            component: function(resolve) {
                require(['./views/start.vue'], resolve);
            }
        },
        '/index':{//首页
        	name: 'index',
        	component: function(resolve) {
                require(['./views/index.vue'], resolve);
            }
        },
        '/detail':{//干货详情页
            name: 'detail',
            component: function(resolve) {
                require(['./views/detail.vue'], resolve);
            }
        }
  });
}