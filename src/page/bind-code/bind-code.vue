<template>
  <div id="bind-code">
    <myHead title="二维码激活" icon="aaaa"></myHead>
    <div class="body">
      <div class="from-row">
        <mu-text-field hintText="手机号" type="tel" v-model="formData.mobile" icon="phone_iphone"/><br/>
        <mu-text-field hintText="验证码" type="text" v-model="formData.code" icon="security"/><br/>
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
  import { bindQRcode, sendLoginVerifyCode } from 'services/service'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.35) + 'px',
        id: this.$route.params.id,
        hintMessage: '手机号码格式有误', // 提示语
        message: '获取验证码',
        formData: {},
        qrCodeArr: []
      }
    },
    methods: {
      bindCode () {
        bindQRcode.bind(this)(this.formData).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'bindSuccess'
            })
          }
        })
      },
      // 获取验证码
      getCode () {
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.mobile).then(res => {
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
      },
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
    components: {
      myHead
    }
  }
</script>
<style lang="scss">
  #bind-code {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 15% 5%;
    .mu-text-field-hint.show {
      color: #ddd;
    }
    .mu-text-field-input {
      color: #e0e0e0;
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
      }
      .btn-top {
        margin-top: 22px;
      }
      .mu-raised-button-label {
        font-size: 0.4rem;
        letter-spacing: 0.3rem;
      }
      .get-code {
        position: fixed;
        top: 235px;
        right: 14%;
        z-index: 20;
        color: #35c590;
        font-size: 0.37rem;
        font-weight: 100;
      }
    }
  }
</style>
