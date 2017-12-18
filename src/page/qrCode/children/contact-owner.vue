<!-- 联系物主 -->
<template>
  <div id="contact-owner">
    <myHead title="联系物主"
            leftIcon="aaa"
            rightIcon="person_outline">

    </myHead>
    <div class="body">
      <mu-flexbox align="flex-start">
        <mu-flexbox-item grow="2" class="noteIcon">
          <mu-icon value="chat" :size=18 color="#9e9e9e"/>
        </mu-flexbox-item>
        <mu-flexbox-item grow="16">
          <div class="note">
              {{ codeData.note || '这个用户很懒，什么都没留下' }}
          </div>
        </mu-flexbox-item>
      </mu-flexbox>
      <div class="btn-top">
        <mu-flexbox :gutter=8>
          <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              icon="phone_in_talk"
                              :fullWidth=true
                              label="呼叫物主" @click="callOwner()"/>
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              label="留言物主"
                              :fullWidth=true
                              icon="content_paste"
                              @click="leavingMessage()"/>
          </mu-flexbox-item>
          <!-- <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              icon="person_outline"
                              :fullWidth=true
                              label="个人中心" @click="goCenter"/>
          </mu-flexbox-item> -->
        </mu-flexbox>
      </div>
      <!-- <div class="center" @click="goCenter">
          个人中心>>
      </div> -->
    </div>
    <service>

    </service>
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import { bindQRcode, sendLoginVerifyCode } from 'services/service'
  import service from 'components/service'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.35) + 'px',
        qrKey: this.$route.params.qrKey,
        hintMessage: '手机号码格式有误', // 提示语
        message: '获取验证码',
        formData: {},
        qrCodeArr: []
      }
    },
    methods: {
      // 跳转呼叫物主
      callOwner () {
        this.$router.push({
          name: 'callOwner',
          params: {
            qrKey: this.qrKey
          }
        })
      },
      // 跳转留言物主页
      leavingMessage () {
        this.$router.push({
          name: 'leavingMessage',
          params: {
            qrKey: this.qrKey
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
        padding-top: 10px;
      }
      .note {
        font-size: 0.35rem;
        margin-top: 10px;
        border-left: 1px solid #ccc;
        padding-left: 10px;
        height: 100px;
        margin-bottom: 15px;
        overflow: scroll;
        line-height: 0.4rem;
      }
      .btn-top {
        text-align: center;
        padding: 10px 10px;
        border-top: 1px solid #ccc;
        .material-icons {
          color: #fff;
        }
      }
      .center {
        text-align: center;
        padding-bottom: 10px;
      }
    }
  }
</style>
