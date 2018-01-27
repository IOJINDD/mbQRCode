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
      <div>
        <span class="remind">注：通话由虚拟号码转接，保护个人隐私。</span>
      </div>
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)" label="激活" fullWidth @click="bindCode()"/>
      </div>
    </div>
    <p class="instruction">
      使用说明： <br>
      1. 二维码扫码激活后就能使用。<br>
      2. 若他人扫码即可电话直接联系您。 <br>
      3. 通话由虚拟号码转接，保护隐私。<br>
      4. 一个手机号可以绑定多个二维码。 <br>
      5. 关注公众号、生活号: <span style="color: #ffff00e0" @click="watch">招领台</span>，获取更多资讯！<br>
      6. 客服电话：<span @click="call">400-110-2123</span>，欢迎您来电咨询。
    </p>
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
        ISWX: false,
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
              }
            })
          }
        })
      },
      // 关注公众号
      watch () {
        window.location = 'http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1MDcwNTUwNg==#wechat_redirect'
      },
      // 获取验证码
      getCode () {
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.formData.mobile).then(res => {
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
      call () {
        window.location.href = 'tel:400-110-2123'
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
    mounted () {
      setTimeout(() => {
        this.ISWX = global.ISWX
      }, 1000)
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
      padding: 0px 5%;
      background-color: #fff;
      padding-bottom: 10px;
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
        padding-top: 0.5rem;
        position: relative;
      }
      .btn-top {
        margin-top: 32px;
      }
      .mu-raised-button-label {
        font-size: 0.4rem;
        letter-spacing: 0.3rem;
      }
      .get-code {
        position: absolute;
        top: 71%;
        right: 1%;
        z-index: 20;
        color: #35c590;
        font-size: 0.37rem;
        font-weight: 100;
      }
      .remind {
        text-align: center;
        display: inline-block;
        width: 90%;
        position: absolute;
        transform: scale(1.3);
        text-align: center;
        /* 背景颜色线性渐变 */
            /* 老式写法 */
            /* linear为线性渐变，也可以用下面的那种写法。left top，right top指的是渐变方向，左上到右上 */
            /* color-stop函数，第一个表示渐变的位置，0为起点，0.5为中点，1为结束点；第二个表示该点的颜色。所以本次渐变为两边灰色，中间渐白色 */
        background: -webkit-gradient(linear, left top, right top, color-stop(0, #ff9800), color-stop(.4, #ff9800), color-stop(.5, #ccc), color-stop(.6, #ff9800), color-stop(1, #ff9800));
            /* 新式写法 */
        /* background: -webkit-linear-gradient(left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d)); */

          /* 设置为text，意思是把文本内容之外的背景给裁剪掉 */
        -webkit-background-clip: text;
        /* 设置对象中的文字填充颜色 这里设置为透明 */
        -webkit-text-fill-color: transparent;
        /* 每隔2秒调用下面的CSS3动画 infinite属性为循环执行animate */
        -webkit-animation: animate 1.5s infinite;
        animation-timing-function: linear;
        /* 兼容写法，要放在@keyframes前面 */
        @-webkit-keyframes animate {
            /* 背景从-100px的水平位置，移动到+100px的水平位置。如果要移动Y轴的，设置第二个数值 */
            from {background-position: -120px;}
            to {background-position: 100px;}
        }
        @keyframes animate {
            from {background-position: -120px;}
            to {background-position: 100px;}
        }
      }
    }
    .instruction {
      margin-top: 0.5rem;
      line-height: 20px;
      border: 1px solid #fff;
      padding: 10px;
    }
  }
</style>
