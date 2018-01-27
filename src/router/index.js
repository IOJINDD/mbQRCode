import Vue from 'vue'
import Router from 'vue-router'
import bindSuccess from 'page/bindSuccess'
import HelloWorld from '@/components/HelloWorld'

import serviceException from 'page/service-exception'
import login from 'page/login/login'
import noteDetail from 'page/self-center/note-detail'
import selfInfo from 'page/self-center/self-info'
import codeNote from 'page/self-center/code-note'
import codeTypeDetail from 'page/self-center/codeType-detail'
import qrCode from 'page/qrCode/qrCode'
import callOwner from 'page/qrCode/call-owner'
import leavingMessage from 'page/qrCode/leaving-message'
import smsReminding from 'page/qrCode/sms-reminding'

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
      meta: {
        keepAlive: true
      },
      component: selfInfo // 个人中心
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
      path: '/callOwner/:qrKey',
      name: 'callOwner',
      component: callOwner // 给物主打电话
    }, {
      path: '/leavingMessage/:qrKey',
      name: 'leavingMessage',
      component: leavingMessage // 给物主留言
    }, {
      path: '/selfInfo',
      name: 'selfInfo',
      meta: {
        keepAlive: true
      },
      component: selfInfo // 个人信息
    }, {
      path: '/codeTypeDetail',
      name: 'codeTypeDetail',
      // meta: {
      //   keepAlive: true
      // },
      component: codeTypeDetail // 二维码类型详情
    }, {
      path: '/codeNote',
      name: 'codeNote',
      component: codeNote // 二维码留言
    }, {
      path: '/serviceException',
      name: 'serviceException',
      component: serviceException // 服务器异常
    }, {
      path: '/smsReminding/:qrKey',
      name: 'smsReminding',
      component: smsReminding // 短信提示
    }
  ]
})
