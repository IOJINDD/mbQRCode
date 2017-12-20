<template>
  <div id="login">
    <h1>登录</h1>
    <div class="from-row">
      <mu-text-field hintText="手机号" type="tel" v-model="mobile" icon="phone_iphone"/><br/>
      <mu-text-field hintText="验证码" type="tel" v-model="code" icon="security"/><br/>
      <span class="get-code" @click="getCode()">
        {{ message }}
      </span>
    </div>
    <div class="btn-top">
      <mu-raised-button backgroundColor="rgb(53, 197, 144)" label="登录" fullWidth @click="goMesLogin()"/>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { sendLoginVerifyCode, login } from 'services/service'
  import { checkData } from 'tools/index'

  let time = 0
  export default {
    data () {
      return {
        height: window.screen.height,
        mobile: '', // 短信登录 手机号
        code: '', // 短信登录 密码
        isInvalid: true, // 手机号是否正确
        position: {},
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
      // 切换登录方式
      handleTabChange (val) {
        this.activeTab = val
      },
      // 获取验证码
      getCode () {
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.mobile, 'LOGIN').then(res => {
            if (res.code === 200) {
              Toast('发送成功')
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
            } else {
              Toast(res.msg)
            }
          })
        } else {
          Toast(this.hintMessage)
        }
      },
      // 验证码登录
      goMesLogin () {
        checkData([this.mobile, this.code], ['请您填写手机号', '请您填写验证码'], () => {
          login.bind(this)({
            mobile: this.mobile,
            code: this.code,
            type: 'mobile'
          }).then(res => {
            if (res.code === 200) {
              Toast('登录成功')
              window.localStorage.setItem('userObj', JSON.stringify(res.dataBody))
              this.$router.push({
                name: 'index'
              })
            }
          })
        })
      }
    },
    mounted () {
      if (window.localStorage.getItem('userObj')) {
        this.$router.push({
          name: 'index'
        })
      }
    }
  }
</script>
<style lang="scss">
  #login {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 30% 8%;
    .mu-text-field-hint.show {
      color: #ddd;
    }
    .mu-text-field-input {
      color: #e0e0e0;
    }
    h1 {
      z-index: 20;
      color: #fff;
      position: relative;
      text-align: center;
      font-size: 1rem;
      letter-spacing: 1rem;
      margin-left: 1rem;
    }
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
      margin-top: 48px;
      position: relative;
    }
    .btn-top {
      margin-top: 22px;
      padding: 0px 5%;
    }
    .mu-raised-button-label {
      font-size: 0.4rem;
      letter-spacing: 0.3rem;
    }
    .get-code {
      position: absolute;
      top: 72px;
      right: 2%;
      z-index: 20;
      color: #35c590;
      font-size: 0.37rem;
      font-weight: 100;
    }
  }
</style>
