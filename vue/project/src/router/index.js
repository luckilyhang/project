import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home'
import Fx from './../components/Fx'
import Mine from './../components/mine'
import Order from './../components/order'
// import Demo from './../components/demo'
import Project from './../components/project'


Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component:Home
    },
    {
      path: '/Project',
      name: '工程',
      component:Project
    },
    {
      path: '/Home',
      name: '首页',
      component:Home
    },
    {
      path: '/Fx',
      name: '发现',
      component:Fx
    },
    {
      path: '/Mine',
      name: '我的',
      component:Mine
    },
    {
      path: '/Order',
      name: '订单',
      component:Order
    },

  ]
})

