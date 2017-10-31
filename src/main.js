// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'scss/index.scss'

Vue.config.productionTip = false
Vue.use(MintUI)

router.beforeEach((to, from, next) => {
  if (to.meta) {
    window.document.title = to.meta.title || '一号一码'
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
