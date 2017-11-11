<template>
  <div id="getCode">
    <mt-field :label="label" placeholder="请填写您的手机号" type="tel" v-model="mobile"></mt-field>
    <mt-field label="验证码" v-model="code" type="tel">
      <div :class="{'invalid': isInvalid, 'legal': !isInvalid }" @click="getCode">
        {{ message }}
      </div>
    </mt-field>
  </div>
</template>
<script>
  import { sendLoginVerifyCode } from 'services/service'
  import { Toast } from 'mint-ui'
  let time = 0
  export default {
    data () {
      return {
        code: '',
        mobile: '',
        isInvalid: true,
        hintMessage: '手机号码格式有误',
        message: '获取验证码'
      }
    },
    methods: {
      // 获取验证码
      getCode () {
        console.log(this.isInvalid)
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.mobile).then(res => {
            if (res.code === '200') {
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
    props: {
      label: {
        type: String,
        default () {
          return '手机号码'
        }
      }
    },
    watch: {
      mobile: function (val) {
        this.$emit('mobile', this.mobile)
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
      },
      code: function (val) {
        this.$emit('code', val)
      }
    }
  }
</script>
<style lang="scss">
  #getCode .legal {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 154, 97, 1);
    color: #fff;
    text-align: center;
    border-radius: 10px;
    font-size: 0.3rem;
  }
  #getCode .invalid {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: #909090;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    font-size: 0.3rem;
  }
</style>
