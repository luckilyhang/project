import Vue from 'vue'
import Router from 'vue-router'
import father from '@/components/father'
import child from '@/components/child'
import sibli from '@/components/sibli'
import directive from '@/components/directive'
import demo from '@/components/demo'
import good from '@/components/good'
import todolist from '@/components/todolist'
import goodlist from '@/components/goodlist'
import detail from '@/components/detail'
import home from '@/components/tab/home'
import tabBar from '@/components/tab/tabBar'
import list from '@/components/tab/list'
import car from '@/components/tab/car'
import photo from '@/components/tab/photo'
// import vip from '@/components/tab/vip'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'HelloWorld',
      component: father
    },
    {
      path: '/child',
      name: 'child',
      component: child
    },
    {
      path: '/sibli',
      name: 'sibli',
      component: sibli
    },
    {
      path: '/directive',
      name: 'directive',
      component: directive
    },
    {
      path: '/good',
      name: 'good',
      component: good
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: todolist
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/goodlist',
      name: 'goodlist',
      component: goodlist
    },
    {
      path: '/home',
      name: '首页',
      component: home
    },
    {
      path: '/tabBar',
      name: 'tabBar',
      component: tabBar
    },
    {
      path: '/list',
      name: '列表',
      component: list
    },
    {
      path: '/car',
      name: '购物车',
      component: car,
    },
    {
      path: '/photo',
      name: '图片',
      component: photo,
    }
   
  ],
})
