// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import vueg from 'vueg'
import router from './router'
import MintUI from 'mint-ui'
import MuseUI from 'muse-ui'
import 'mint-ui/lib/style.css'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
import 'scss/index.scss'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(MintUI)
Vue.use(MuseUI)

router.beforeEach((to, from, next) => {
  if (to.meta) {
    window.document.title = to.meta.title || 'e码领先'
  }
  next()
})

// 添加一个请求拦截器
axios.interceptors.request.use(function (request) {
  MintUI.Indicator.open('加载中...')
  return request
}, function (err) {
  return Promise.reject(err)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code === '400' && response.data.msg) {
    Toast(response.data.msg)
  }
  MintUI.Indicator.close()
  return response
}, function (err) {
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

if (window.localStorage.getItem('userObj')) {
  global.mobilePhone = JSON.parse(window.localStorage.getItem('userObj')).mobilePhone
  console.log(global.mobilePhone)
}

Date.prototype.format = function(format) {
  var o = {
  'M+': this.getMonth()+1, //month
  'd+': this.getDate(), //day
  'h+': this.getHours(), //hour
  'm+': this.getMinutes(), //minute
  's+': this.getSeconds(), //second
  'q+': Math.floor((this.getMonth()+3)/3), //quarter
  'S': this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for(var k in o)
  if(new RegExp('(' + k + ')').test(format))
    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00'+ o[k]).substr(('' + o[k]).length))
    return format
}
