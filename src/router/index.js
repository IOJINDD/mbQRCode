import Vue from 'vue'
import Router from 'vue-router'
// import qrCode from 'page/qrCode'
import index from 'page/index'
import bindSuccess from 'page/bindSuccess'
// import selfCenter from 'page/self-center'
import HelloWorld from '@/components/HelloWorld'

import login from 'page/login/login'
import selfCenter from 'page/self-center/self-center'
import noteDetail from 'page/self-center/note-detail'
import bindCode from 'page/bind-code/bind-code'
import qrCode from 'page/qrCode/qrCode'
import callCarer from 'page/qrCode/call-carer'

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
    }, {
      path: '/login',
      name: 'login',
      component: login // 登录页
    }, {
      path: '/noteDetail/:id',
      name: 'noteDetail',
      component: noteDetail // 留言详情
    }, {
      path: '/noteDetail/:id',
      name: 'noteDetail',
      component: noteDetail // 留言详情
    }, {
      path: '/bindCode/:id',
      name: 'bindCode',
      component: bindCode // 绑定二维码
    }, {
      path: '/callCarer',
      name: 'callCarer',
      component: callCarer // 呼叫车主
    }
  ]
})