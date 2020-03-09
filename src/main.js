import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 全局引入vant
import '@/plugins/vant'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})