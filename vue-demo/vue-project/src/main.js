// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';
import common from './common.js'
import store from './store.js'
Vue.use(common);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Mint,
  store,
  components: { App },
  template: '<App/>'
})
