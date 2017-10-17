// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

// 请求绑定Vue原型属性上面，方便使用
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
