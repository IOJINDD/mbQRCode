<!-- 呼叫物主 -->
<template>
  <div id="call-owner">
    <div class="body">
      <div class="from-row">
        <mu-text-field hintText="手机号" type="tel" v-model="mobile" icon="phone_iphone"/><br/>
        <mu-text-field hintText="验证码" type="tel" v-model="code" icon="security"/><br/>
        <span class="get-code" @click="getCode()">
          {{ message }}
        </span>
      </div>
      <superCall message="呼叫物主" @click.native="call">

      </superCall>
      <div class="goBack" @click="goBack">
        返回上级>>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { sendLoginVerifyCode, login, callRecord } from 'services/service'
  import { checkData } from 'tools/index'
  import superCall from 'components/super-call'

  let time = 0
  export default {
    data () {
      return {
        mobile: '', // 呼叫方手机号
        code: '', // 验证码
        isInvalid: true, // 手机号是否正确
        position: {},
        qrKey: this.$route.params.qrKey,
        hintMessage: '手机号码格式有误', // 提示语
        message: '获取验证码'
      }
    },
    watch: {
      // 监听手机号格式是否正确
      mobile: function (val) {
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
    methods: {
      // 获取验证码
      getCode () {
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.mobile, 'LOGIN').then(res => {
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
      // 返回上级
      goBack () {
        this.$router.go(-1)
      },
      // 打电话
      call () {
        let mobile = JSON.parse(window.localStorage.getItem('codeData')).mobile
        checkData([this.mobile, this.code], ['手机号不能为空', '验证码不能为空'], () => {
          callRecord.bind(this)({
            code: this.code,
            codeFlag: 0,
            fromMobile: this.mobile,
            qrKey: this.qrKey,
            toMobile: mobile
          }).then(res => {
            if (res.code === 200) {
              window.location.href = 'tel:' + mobile
            } else {
              Toast(res.msg)
            }
          })
        })
      }
    },
    components: {
      superCall
    }
  }
</script>
<style lang="scss">
  #call-owner {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
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
      padding-top: 10%;
      .from-row {
        margin-bottom: 100px;
        position: relative;
      }
      .mu-text-field-focus-line {
        background-color: rgb(53, 197, 144);
      }
      .mu-text-field.focus-state {
        color: rgb(53, 197, 144);
      }
      .mu-text-field {
        width: 100%;
        font-size: 0.4rem;
      }
      .mu-raised-button-label {
        font-size: 0.4rem;
        letter-spacing: 0.3rem;
      }
      .get-code {
        position: absolute;
        top: 71px;
        right: 0%;
        z-index: 20;
        color: #35c590;
        font-size: 0.37rem;
        font-weight: 100;
      }
      .goBack {
        text-align: center;
        margin-top: 80px;
      }
    }
  }
</style>
