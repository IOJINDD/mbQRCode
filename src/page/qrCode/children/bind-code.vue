<!-- 二维码激活 -->
<template>
  <div id="bind-code">
    <myHead title="二维码激活" icon="aaaa"></myHead>
    <div class="body">
      <div class="from-row">
        <mu-text-field hintText="手机号" type="tel" v-model="formData.mobile" icon="phone_iphone"/><br/>
        <mu-text-field hintText="验证码" type="tel" v-model="formData.code" icon="security"/><br/>
        <span class="get-code" @click="getCode()">
          {{ message }}
        </span>
      </div>
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)" label="激活" fullWidth @click="bindCode()"/>
      </div>
    </div>
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import { Toast } from 'mint-ui'
  import { bindQRcode, sendLoginVerifyCode, login } from 'services/service'
  let time = 0
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.35) + 'px',
        id: this.$route.params.qrKey,
        isInvalid: true,
        hintMessage: '手机号码格式有误', // 提示语
        message: '获取验证码',
        formData: {},
        qrCodeArr: []
      }
    },
    methods: {
      bindCode () {
        let codeData = JSON.parse(window.localStorage.getItem('codeData'))
        this.formData.id = codeData.id
        this.formData.qrKey = this.id
        bindQRcode.bind(this)(this.formData).then(res => {
          if (res.code === 200) {
            login.bind(this)({
              mobile: this.formData.mobile,
              code: this.formData.code,
              type: 'mobile'
            }).then(res => {
              if (res.code === 200) {
                window.localStorage.setItem('userObj', JSON.stringify(res.dataBody))
                this.$router.push({
                  name: 'bindSuccess'
                })
              } else {
                Toast(res.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCode () {
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.formData.mobile).then(res => {
            if (res.code === 200) {
              Toast(res.msg)
            }
            time = 60
            let countDown = setInterval(() => {
              this.message = '重新发送' + time
              time--
              if (time === 0) {
                clearInterval(countDown)
                this.isInvalid = false
                this.message = '获取验证码'
              }
            }, 1000)
          })
        } else {
          Toast(this.hintMessage)
        }
      }
    },
    watch: {
      'formData.mobile': function (val) {
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(val))) {
          if (time === 0) {
            this.isInvalid = true
            this.hintMessage = '手机号码格式有误'
          }
        } else {
          if (time === 0) {
            this.isInvalid = false
            this.hintMessage = '验证已发送，请稍后再试'
          }
        }
      }
    },
    filters: {
      date (input) {
        if ((input + '').slice(-7) === '3600000') {
          return new Date(input).format('yyyy年MM月dd日')
        } else {
          return new Date(input).format('yyyy年MM月dd日 hh:mm')
        }
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   next((vm) => {
    //     qrNotes.bind(vm)(vm.id).then(res => {
    //       if (res.code === 200) {
    //         vm.qrCodeArr = res.dataBody.data
    //       }
    //     })
    //   })
    // },
    components: {
      myHead
    }
  }
</script>
<style lang="scss">
  #bind-code {
    .mu-text-field-hint.show {
      color: #ddd;
    }
    .body {
      position: relative;
      z-index: 20;
      padding: 0px 10%;
      background-color: #fff;
      padding-bottom: 30px;
      .mu-text-field-focus-line {
        background-color: rgb(53, 197, 144);
      }
      .mu-text-field.focus-state {
        color: rgb(53, 197, 144);
      }
      .mu-text-field {
        width: 100%;
      }
      .from-row {
        padding-top: 48px;
        position: relative;
      }
      .btn-top {
        margin-top: 22px;
      }
      .mu-raised-button-label {
        font-size: 0.4rem;
        letter-spacing: 0.3rem;
      }
      .get-code {
        position: absolute;
        top: 120px;
        right: 1%;
        z-index: 20;
        color: #35c590;
        font-size: 0.37rem;
        font-weight: 100;
      }
    }
  }
</style>
