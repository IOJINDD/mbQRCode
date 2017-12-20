// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable  */
import Vue from 'vue'
import App from './App'
// import vueg from 'vueg'
import router from './router'
import MintUI from 'mint-ui'
import MuseUI from 'muse-ui'
import vueg from 'vueg'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import 'muse-ui/dist/muse-ui.css'
import 'vueg/css/transition-min.css'
import {
  Indicator,
  Toast
} from 'mint-ui'
import 'scss/index.scss'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(MintUI)
Vue.use(MuseUI)
Vue.use(vueg, router)

router.beforeEach((to, from, next) => {
  if (to.meta) {
    window.document.title = to.meta.title || '招领台'
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
  if (response.data.code != '200' && response.data.code != '500' && response.data.msg) {
    Toast(response.data.msg)
  }

  if (response.data.code == '500' || response.data.code == '502' || response.data.code == '504') {
    window.location = '/#/serviceException'
  }
  MintUI.Indicator.close()
  return response
}, function (err) {
  return Promise.reject(err)
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

if (window.localStorage.getItem('userObj')) {
  global.mobilePhone = JSON.parse(window.localStorage.getItem('userObj')).mobilePhone
  console.log(global.mobilePhone)
}

// 获取手机型号
var ua = navigator.userAgent
if (ua.match(/iPhone|iPod/i) != null) {
  global.userAgent =  'iPhone'
} else if (ua.match(/Android/i) != null) {
  global.userAgent =  'Android'
} else if (ua.match(/iPad/i) != null) {

}


  Date.prototype.format = function (format) {
    var o = {
      'M+': this.getMonth() + 1, //month
      'd+': this.getDate(), //day
      'h+': this.getHours(), //hour
      'm+': this.getMinutes(), //minute
      's+': this.getSeconds(), //second
      'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
      'S': this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp('(' + k + ')').test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return format
  }
