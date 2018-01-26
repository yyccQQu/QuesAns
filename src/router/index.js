import Vue from 'vue'
import Router from 'vue-router'

//可以使用路由懒加载
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/head/head'], resolve),
      redirect: '/Head/title'
    },
    {
      path: '/Head',
      component: resolve => require(['@/components/head/head'], resolve),
      children:[
//    	{
//        path: '',
//        component: resolve => require(['@/components/head/head'], resolve)
//      },
		    {
		      path: 'title',
		      name: 'title',
		      component: resolve => require(['@/components/title/title'], resolve)
		    },
        {
		      path: 'title/:num',
		      component: resolve => require(['@/components/title/title'], resolve)
		    },
		    {
		      path: 'single',
		      name: 'single',
		      component: resolve => require(['@/components/single/single'], resolve),
          meta: {keepAlive: true},
		    },
        {
          path: 'single/:num',
          component: resolve => require(['@/components/single/single'], resolve)
        },
		    {
		      path: 'Multiselect',
		      name: 'Multiselect',
		      component: resolve => require(['@/components/Multiselect/Multiselect'], resolve),
          meta: {keepAlive: true},
		    },
        {
          path: 'Multiselect/:num',
          component: resolve => require(['@/components/Multiselect/Multiselect'], resolve)
        },
		    {
		      path: 'Qaq',
		      name: 'Qaq',
		      component: resolve => require(['@/components/Qaq/Qaq'], resolve),
          meta: {keepAlive: true},
		    },
		    {
		      path: 'quesAns',
		      name: 'quesAns',
		      component: resolve => require(['@/components/quesAns/quesAns'], resolve),
          meta: {keepAlive: true},
		    },
        {
          path: 'quesAns/:num',
		      component: resolve => require(['@/components/quesAns/quesAns'], resolve)
        }


      ]
    }
  ],
  mode: 'history', //切换路径模式，变成history模式
  scrollBehavior: () => ({ y: 0 }) // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
})
