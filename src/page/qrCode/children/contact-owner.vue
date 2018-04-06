<!-- 联系物主 -->
<template>
  <div id="contact-owner">
    <myHead title="联系物主"
            leftIcon="aaa"
            rightIcon="person_outline">

    </myHead>
    <div class="body">
      <mu-flexbox align="flex-start">
        <mu-flexbox-item grow="1" class="noteIcon">
          <mu-icon value="chat" :size=18 color="#9e9e9e"/>
        </mu-flexbox-item>
        <mu-flexbox-item grow="12">
          <pre class="note">{{ codeData.note || '如捡到此物，您可以输入您的手机号联系我，好人一生平安！' }}</pre>
        </mu-flexbox-item>
      </mu-flexbox>
      <div class="btn-top">
        <div class="mobileBody">
          <mu-text-field hintText="请输入您的手机号码" v-model="params.mobile" type="tel"/><br/>
          <span class="subTitle">
            通话由虚拟号码转接，双方看到的是虚拟号码而非真实号码
          </span>
        </div>
        <mu-flexbox :gutter=8>
          <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              icon="phone_in_talk"
                              :fullWidth=true
                              label="立即呼叫" @click="callOwner()"/>
          </mu-flexbox-item>
          <!-- <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              label="留言物主"
                              :fullWidth=true
                              icon="content_paste"
                              @click="leavingMessage()"/>
          </mu-flexbox-item> -->
        </mu-flexbox>
      </div>
    </div>
    <service>

    </service>
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import { Toast } from 'mint-ui'
  import { bindQRcode, sendLoginVerifyCode, doubleCall } from 'services/service'
  import service from 'components/service'

  let phone = '' // 上次输入的号码
  let time = 0 // 倒计时
  let xuNiPhone = '' // 虚拟号码
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.35) + 'px', // 自定义高度
				params: {
          qrKey: this.$route.params.qrKey,
          codeFlag: '1',
          mobile: '', // 本机号码
					codeType: this.$route.query.type
				},
        hintMessage: '手机号码格式有误' // 提示语
      }
    },
    methods: {
      // 跳转呼叫物主
      callOwner () {
        if (this.params.mobile) {
          if ((/^1[3|4|5|7|8]\d{9}$/.test(this.params.mobile))) {
            if (phone != this.params.mobile ) {
              doubleCall.bind(this)(this.params).then(res => {
                if (res.code == 200) {
                  time = 10 // 设定时间
                  phone = this.params.mobile // 保存手机号
                  xuNiPhone = res.dataBody // 保存虚拟号
                  window.location.href = 'tel:' + res.dataBody
                  window.localStorage.setItem('ownMobile', this.params.mobile)
                  let timeFun = setInterval(() => {
                    time--
                    if (time < 0) {
                      clearInterval(timeFun)
                    }
                  }, 1000)
                }
              })
            } else {
              if (time < 0) {
                doubleCall.bind(this)(this.params).then(res => {
                  if (res.code == 200) {
                    time = 10 // 设定时间
                    phone = this.params.mobile // 保存手机号
                    xuNiPhone = res.dataBody // 保存虚拟号
                    window.location.href = 'tel:' + res.dataBody
                    window.localStorage.setItem('ownMobile', this.params.mobile)
                    let timeFun = setInterval(() => {
                      time--
                      if (time < 0) {
                        clearInterval(timeFun)
                      }
                    }, 1000)
                  }
                })
              } else {
                window.location.href = 'tel:' + xuNiPhone
              }
            }
          } else {
            Toast('号码有误，请再检查一下')
          }
        } else {
          Toast('请填写您的手机号码')
        }
      },
      // 跳转留言物主页
      leavingMessage () {
        this.$router.push({
          name: 'leavingMessage',
          params: {
            qrKey: this.params.qrKey
          },
          query: {
            type: this.params.codeType
          }
        })
      },
      // 跳转个人中心
      goCenter () {
        this.$router.push({
          name: 'index'
        })
      }
    },
    props: {
      codeData: {
        type: Object
      }
    },
    mounted () {
      if (window.localStorage.getItem('ownMobile')) {
        this.params.mobile = window.localStorage.getItem('ownMobile')
      }
    },
    components: {
      myHead,
      service
    }
  }
</script>
<style lang="scss">
  #contact-owner {
    .body {
      background-color: #fff;
      color: #9e9e9e;
      .noteIcon {
        text-align: right;
        padding-top: 15px;
      }
      .note {
        font-size: 0.4rem;
        margin-top: 15px;
        border-left: 1px solid #ccc;
        padding-left: 4px;
        height: 80px;
        margin-bottom: 15px;
        overflow: scroll;
        line-height: 0.5rem;
      }
      .btn-top {
        text-align: center;
        /* padding: 10px 10px; */
        padding: 0.5rem 10px;
        border-top: 1px solid #ccc;
        .material-icons {
          color: #fff;
        }
      }
      .center {
        text-align: center;
        padding-bottom: 10px;
      }
      .mobileBody {
        /* line-height: 2rem; */
        margin-bottom: 10px;
        text-align: center;
        border: 2px solid #fff;
        background: rgba(255, 255, 255, 0.18);
        .mu-text-field-hint {
          color: rgba(0, 0, 0, 0.4)
        }
        .mu-text-field {
          width: 11em;
          margin-bottom: 0px;
        }
        .mu-text-field-input {
          font-size: 0.5rem;
        }
        .mu-text-field-line {
          background-color: #bdbdbd;
        }
        .subTitle {
          display: inline-block;
          padding-bottom: 10px;
          font-size: 0.3rem;
          color: #9e9e9e;
          line-height: 0.4rem;
        }
        input {
          color: #000;
          text-align: center;
        }
      }
    }
  }
</style>
