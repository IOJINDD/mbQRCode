<!-- 扫码 -->
<template>
  <div id="qrCode">
    <bindCode v-if="!isBind">

    </bindCode>
    <div v-if="isBind">
      <div v-if="codeType === 'car'">
        <callCarer>

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
        checkQRcode.bind(vm)(to.params.qrKey).then(res => {
          if (res.code === 200) {
            if (res.dataBody && res.dataBody.id) {
              vm.isBind = res.dataBody.isBind
              vm.codeData = res.dataBody
              // 保存二维码信息
              window.localStorage.setItem('codeData', JSON.stringify(res.dataBody))

              if (vm.isBind) {

                // 判断什么二维码什么类型
                if (to.query.type === 'car') {
                  vm.codeType = 'car'
                  let qrKeyArr = window.localStorage.getItem('qrKeyArr')
                  // 判断是否是第一次存储
                  if (qrKeyArr) {
                    if (global.qrKeyNum > 10) {
                      Toast('今日扫码已上限！')
                    } else {
                      // 如果不是 获取之前存的数据
                      vm.qrKeyArr = window.localStorage.getItem('qrKeyArr').split(',')
                      // 判断如果不存在，存入数据
                      if (qrKeyArr.indexOf(vm.qrKey) < 0) {
                        vm.qrKeyArr.push(vm.qrKey)
                      }
                      // 存储到本地
                      window.localStorage.setItem('qrKeyArr', vm.qrKeyArr.join())
                      global.qrKeyNum = vm.qrKeyArr.length
                    }
                  } else {
                    // 如果是，新建一个
                    vm.qrKeyArr.push(vm.qrKey)
                    window.localStorage.setItem('qrKeyArr', vm.qrKeyArr.join())
                  }
                } else {
                  vm.codeType = 'other'
                }
                console.log(to.query.type)
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
