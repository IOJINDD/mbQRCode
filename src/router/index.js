import Vue from 'vue'
import Router from 'vue-router'
import qrCode from 'page/qrCode'
import index from 'page/index'
import bindSuccess from 'page/bindSuccess'
import selfCenter from 'page/self-center'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      redirect: '/index',
      component: HelloWorld
    }, {
      path: '/qrCode/:qrKey',
      name: 'qrCode',
      component: qrCode
    }, {
      path: '/index',
      name: 'index',
      component: index
    }, {
      path: '/selfCenter',
      name: 'selfCenter',
      component: selfCenter // 个人中心
    }, {
      path: '/bindSuccess',
      name: 'bindSuccess',
      component: bindSuccess // 绑定成功
    }
  ]
})
