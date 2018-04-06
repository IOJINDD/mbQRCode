<!-- 呼叫车主 -->
<template>
  <div id="call-carer">
    <div class="body">
      <div class="mobileBody">
        <mu-text-field hintText="请输入您的手机号码" v-model="ownMobile" type="tel" @input="inputMobile"/><br/>
        <span class="subTitle">
          通话由虚拟号码转接，双方看到的是虚拟号码而非真实号码
        </span>
      </div>
      <div v-if="!isLimit">
        <superCall :ownMobile="ownMobile"
                   :isLogin="isLogin"
                   :code="code" >

        </superCall>
      </div>
      <mu-flexbox>
        <mu-flexbox-item class="left" @click.native="goSms">
          短信通知
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <div class="center" @click="goCenter">
            个人中心>>
          </div>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <service>

    </service>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { sendLoginVerifyCode, login } from 'services/service'
  import superCall from 'components/super-call'
  import service from 'components/service'

  export default {
    data () {
      return {
        ownMobile: '', // 本机号码
        code: '', // 验证码
        qrKey: this.$route.params.qrKey,
        isInvalid: true, // 手机号是否正确
        height: '2rem',
        position: {},
        isLogin: false, // 判断是否登录
        hintMessage: '手机号码格式有误', // 提示语
        message: '获取验证码'
      }
    },
    props: {
      isLimit: {
        type: Boolean,
        default () {
          return false
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
            }
          })
        } else {
          Toast(this.hintMessage)
        }
      },
      // 跳转个人中心
      goCenter () {
        if (window.localStorage.getItem('userObj')) {
          this.$router.push({
            name: 'index'
          })
        } else {
          this.$router.push({
            name: 'login'
          })
        }
      },
      // 监听输入框的值
      inputMobile (val) {

      },
      // 跳转短信通知界面
      goSms () {
        this.$router.push({
          name: 'smsReminding',
          params: {
            qrKey: this.qrKey
          }
        })
      }
    },
    mounted () {
      if (window.localStorage.getItem('ownMobile')) {
        this.ownMobile = window.localStorage.getItem('ownMobile')
      }
    },
    components: {
      superCall,
      service
    }
  }
</script>
<style lang="scss">
  #call-carer {
    .body {
      .center {
        text-align: right;
        padding-top: 40px;
      }
      .left {
        padding-top: 40px;
        font-size: 0.4rem;
      }
      .mobileBody {
        /* line-height: 2rem; */
        /* padding-top: 10px; */
        padding-top: 0.5rem;
        text-align: center;
        border: 2px solid #fff;
        background: rgba(255, 255, 255, 0.18);
        margin-bottom: 1rem;
        .mu-text-field-hint {
          color: rgba(255, 255, 255, 0.4)
        }
        .mu-text-field-input {
          font-size: 0.5rem;
        }
        .mu-text-field {
          width: 11em;
          margin-bottom: 0px;
        }
        .mu-text-field-line {
          background-color: #bdbdbd;
        }
        .subTitle {
          display: inline-block;
          padding-bottom: 10px;
          font-size: 0.3rem;
          color: #d9d9d9;
          line-height: 0.5rem;
        }
        input {
          color: #fff;
          text-align: center;
        }
      }
    }
  }
</style>
