import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/icons'

// 全局引入vant
import '@/plugins/vant'

// 注册为全局组件
import VTop from './components/backToTop'
Vue.component('v-top', VTop);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 引入mock
require('./mock');

//  全局引入 过滤器
import '@/utils/filter'