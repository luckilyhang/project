// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import common from './common.js'
import store from './store.js'
import 'lib-flexible'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
Vue.use(Mint);
Vue.use(common);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Mint,
  store,
  preview,
  components: {
    App
  },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requireAuth) {
    if (store.state.token) {
      alert('验证成功可以跳转')
      next();
    }else{
      alert('没有token,跳转失败，返回主页')
      next({path:'/home'})
    }


  } else {

    next()
  }

});
