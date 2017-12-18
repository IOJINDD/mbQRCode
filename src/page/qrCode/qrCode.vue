<!-- 扫码 -->
<template>
  <div id="qrCode">
    <bindCode v-if="!isBind">

    </bindCode>
    <div v-if="isBind">
      <div v-if="codeType === 'car'">
        <callCarer :isLimit="isLimit">

        </callCarer>
      </div>
      <div v-if="codeType === 'other'">
        <contactOwner :codeData="codeData">

        </contactOwner>
      </div>
    </div>
  </div>
</template>
<script>
  import { checkQRcode } from 'services/service'
  import bindCode from './children/bind-code'
  import callCarer from './children/call-carer'
  import contactOwner from './children/contact-owner'
  import { Toast } from 'mint-ui'

  function saveCode (vm) {

  }

  export default {
    data () {
      return {
        isBind: true,
        qrKey: this.$route.params.qrKey,
        isLimit: false,
        qrKeyArr: [],
        codeData: {}, // 二维码信息
        codeType: 'none' // 二维码类型
      }
    },
    methods: {

    },
    watch: {

    },
    components: {
      bindCode,
      contactOwner,
      callCarer
    },
    mounted () {

    },
    beforeRouteEnter: (to, from, next) => {
      next((vm) => {
        checkQRcode.bind(vm)(to.params.qrKey, to.query.type).then(res => {
          if (res.code === 200) {
            if (res.dataBody && res.dataBody.id) {
              vm.isBind = res.dataBody.isBind
              vm.codeData = res.dataBody
              // 保存二维码信息
              window.localStorage.setItem('codeData', JSON.stringify(res.dataBody))

              let codeTime
              // 判断是否有存储扫描二维码时间
              if (!window.localStorage.getItem('setCodeTime')) {
                window.localStorage.setItem('setCodeTime', new Date().getTime())
              } else {
                // 判断是否24小时
                codeTime = window.localStorage.getItem('setCodeTime')
                let nowTime = new Date().getTime()
                if (Number(codeTime) + 60000 < nowTime) {
                  console.log(window.localStorage.getItem('setCodeTime'))
                  window.localStorage.removeItem('qrKeyArr')
                  window.localStorage.setItem('setCodeTime', new Date().getTime())
                }
              }

              if (vm.isBind) {

                // 判断二维码什么类型
                if (to.query.type === 'car') {
                  vm.codeType = 'car'
                  let qrKeyArr = window.localStorage.getItem('qrKeyArr')
                  // 判断是否是第一次存储
                  if (qrKeyArr) {
                    qrKeyArr = qrKeyArr.split(',')
                    // 删除数组空的元素
                    for (let i = 0; i < qrKeyArr.length; i++) {
                        if (qrKeyArr[i] === '' || qrKeyArr[i] === ' ') {
                            qrKeyArr.splice(i, 1)
                            i = i - 1
                        }
                    }
                    if (qrKeyArr.length > 9) {
                      vm.isLimit = true
                      Toast('今日扫码已上限！')
                    } else {
                      console.log(qrKeyArr.join().indexOf(vm.qrKey))
                      // 判断如果不存在，存入数据
                      if (qrKeyArr.join().indexOf(vm.qrKey) < 0) {
                        qrKeyArr.push(vm.qrKey)
                      }
                      // 存储到本地
                      window.localStorage.setItem('qrKeyArr', qrKeyArr.join())
                    }
                  } else {
                    // 如果是，新建一个
                    vm.qrKeyArr.push(vm.qrKey)
                    console.log(vm.qrKeyArr)
                    window.localStorage.setItem('qrKeyArr', vm.qrKeyArr.join())
                  }
                } else {
                  vm.codeType = 'other'
                }
              } else {

              }
            } else {
              Toast('无效的二维码')
            }
          }
        })
      })
    }
  }
</script>
<style lang="scss">
  #qrCode {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
  }
</style>
