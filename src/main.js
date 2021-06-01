// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
//引入bootstrap的样式文件
import './assets/bootstrap.css'
//全局引入bootstrap的图标字体
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import FastClick from 'fastclick'
//引入路由
import router from './router/index.js'
import App from './App'
//引入vuex
import store from './store/index.js'
//引入axios
import request from './ajax.js'
//全局引入elementUi
import './plugins/element.js'
//将request与vue的prototype原型绑定，用$http来使用axios
Vue.prototype.$http=request;
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
