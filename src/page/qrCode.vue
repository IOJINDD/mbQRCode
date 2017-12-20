<template>
  <div id="index">
    <mt-header :title="title">
      <mt-button icon="more"
                 slot="right"
                 @click.native="sheetVisible = true"></mt-button>
    </mt-header>
    <div v-if="showType === 'bindType'">
      <mt-field label="真实姓名"
                style="border-bottom: 1px solid #ccc;"
                placeholder="请输入真实姓名" v-model="formData.realName"></mt-field>
      <mu-list-item title="性别" @click.native="goSelectSex">
        <span slot="right" style="font-size: 0.4rem">{{ formData.sex }}</span>
        <mu-icon slot="right" value="keyboard_arrow_right"/>
      </mu-list-item>
      <getCode @code="getCode"
               @mobile="getMobile"></getCode>
      <mt-field label="留言"
                placeholder="填写留言信息"
                type="textarea" rows="4"
                v-model="formData.note"></mt-field>
      <div class="com_btn_style">
        <mt-button type="default" size="large" @click="bindCode">激活</mt-button>
      </div>
    </div>
    <div v-if="showType === 'normalType'" class="isBind">
      <form action="" @submit.prevent="submit">
        <mt-field label="留言信息"
                  type="textarea" rows="3"
                  :value="note"
                  :disabled=true @click.native="notePop = true"></mt-field>
        <!-- <getCode @code="getCode" @mobile="getMobile" label="联系物主"></getCode> -->
      </form>
      <div class="com_btn_style">
        <mt-button type="default"
                   size="normal"

                   @click="callPhonePop = true"
                    style="margin-right: 30px">呼叫物主</mt-button>
        <mt-button type="default"
                   size="normal"
                   @click="writeNotePop = true"
                   style="margin-left: 30px">给物主留言</mt-button>
      </div>
      <br>
      <div class="com_btn_style">
        <mu-raised-button backgroundColor="#35c590" @click="goCenter" label="个人中心" class="demo-raised-button" fullWidth/>
      </div>
    </div>
    <div v-if="showType === 'carType'">
      <getCode @code="getCode" @mobile="getMobile" label="手机号"></getCode>
      <div class="callCar" @click="callPhone">
        <transition name="bounce">
          <mu-icon value="call" :size=80 color="#35c590" v-if="show"/>
        </transition>
        <transition name="bounce">
          <p>呼叫车主</p>
        </transition>
      </div>
    </div>
    <mt-actionsheet :actions="actions"
                    v-model="sheetVisible">

    </mt-actionsheet>
    <!-- 性别弹出框 -->
    <mt-popup
      v-model="popupSex"
      position="bottom">
      <mt-radio v-model="sex"
                align="right"
                :options="options">

      </mt-radio>
    </mt-popup>

    <!-- 留言详情弹出框 -->
    <mt-popup
      v-model="notePop"
      popup-transition="popup-fade">
      <div class="notePop">
        留言信息：{{ note }}
      </div>
    </mt-popup>

    <!-- 呼叫物主弹出框 -->
    <mt-popup
      v-model="callPhonePop"
      position="right">
        <getCode @code="getCode" @mobile="getMobile" label="您的手机号"></getCode>
        <div class="com_btn_style">
          <mt-button type="default"
                      size="normal"
                      @click="callPhone()"
                      style="margin-right: 30px">呼叫物主</mt-button>
          <mt-button type="default"
                      size="normal"
                      @click="callPhonePop = false"
                      style="margin-left: 30px">返回上级</mt-button>
        </div>
    </mt-popup>

    <!-- 留言物主弹出框 -->
    <mt-popup
      v-model="writeNotePop"
      position="right">
      <writeNote :userId=formData.userId :qrKey="formData.qrKey" @writePop="writePop"></writeNote>
    </mt-popup>
  </div>
</template>
<script>
  import getCode from 'components/get-code'
  import writeNote from 'components/write-note'
  import { checkQRcode, bindQRcode, doubleCall, publishNote }from 'services/service'
  import { MessageBox, Toast, Indicator, Popup } from 'mint-ui'

  function saveCode (vm) {
    let infoJson = {
      createTime: new Date().getTime(), // 创建时间
      userAgent: navigator.userAgent // 手机型号
    }
  }

  export default {
    data () {
      return {
        title: '',
        actions: [],
        showType: null,
        isInvalid: true, // 手机号码是否正确
        hintMessage: '手机号码格式有误',
        formData: { // 绑定用户数据
          id: null,
          userId: null,
          realName: '',
          sex: '',
          note: '',
          qrKey: this.$route.params.qrKey
        },
        options: [{
          label: '男',
          value: '男'
        }, {
          label: '女',
          value: '女'
        }],
        sex: '',
        show: false,
        qrCodeType: this.$route.query.type, // 二维码类型
        note: '', // 留言
        loseMobile: null,
        popupSex: false, // 性别弹出框
        notePop: false, // 留言弹出框
        callPhonePop: false, // 呼叫物主弹出框
        writeNotePop: false, // 呼叫物主弹出框
        sheetVisible: false // 底部菜单弹出框
      }
    },
    methods: {
      // 打开性别选择弹窗
      goSelectSex () {
        this.popupSex = true
        this.blurFun()
      },
      // 获取验证码
      getCode (val) {
        this.formData.code = val
      },
      // 获取手机号
      getMobile (val) {
        this.formData.mobile = val
      },
      // 跳转个人中心
      goCenter () {
        this.$router.push({
          name: 'index'
        })
      },
      // 呼叫物主
      callPhone () {
        if (global.qrKeyNum > 9) {
          Toast('今日扫码已上限！')
        } else {
          if (this.isInvalid) {
            Toast(this.hintMessage)
          } else {
            if (this.formData.code && this.formData.code.length === 4) {
              MessageBox.confirm('请确认手机号码是否正确').then(() => {
                saveCode(this)
                doubleCall.bind(this)(this.formData.code, this.formData.mobile, this.formData.qrKey).then(res => {
                  if (res.code === 200) {
                    Toast('呼叫成功')
                    Indicator.open('呼叫中...')
                    setTimeout(() => {
                      Indicator.close()
                    }, 5000)
                  }
                })
              })
              // window.location.href = 'tel:' + this.loseMobile
            } else {
              Toast('验证码错误')
            }
          }
        }
      },
      // 绑定二维码
      bindCode () {
        bindQRcode.bind(this)(this.formData).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'bindSuccess'
            })
          }
        })
      },
      // 关闭留言弹出框
      writePop () {
        this.writeNotePop = false
      },
      // 关闭软键盘
      blurFun () {
        Array.from(document.querySelectorAll('.mint-field-core')).forEach((ele) => {
          ele.blur()
        }, this)
      }
    },
    watch: {
      sex: function (val) {
        this.formData.sex = val
        this.popupSex = false
      },
      'formData.mobile': function (val) {
        console.log(val)
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(val))) {
          this.isInvalid = true
        } else {
          this.isInvalid = false
        }
      }
    },
    components: {
      getCode,
      writeNote
    },
    mounted () {
      this.actions = [{
        name: '主页',
        method: () => {
          this.$router.push({
            name: 'index'
          })
        }
      }]
    },
    beforeRouteEnter: (to, from, next) => {
      next((vm) => {
        checkQRcode.bind(vm)(to.params.qrKey).then(res => {
          if (res.code === 200) {
            if (res.dataBody && res.dataBody.id) {
              vm.isBind = res.dataBody.isBind
              if (vm.isBind) {
                vm.formData = res.dataBody
                vm.loseMobile = res.dataBody.mobile
                vm.note = res.dataBody.note

                // 判断什么二维码什么类型
                if (to.query.type === 'car') {
                  vm.title = '联系车主'
                  vm.showType = 'carType'
                  setTimeout(() => {
                    vm.show = true
                  }, 200)

                  if (global.qrKeyNum > 9) {
                    Toast('今日扫码已上限！')
                  }
                } else {
                  vm.title = '联系物主'
                  vm.showType = 'normalType'
                }
                console.log(to.query.type)
              } else {
                vm.title = '二维码激活'
                vm.formData.id = res.dataBody.id
                vm.showType = 'bindType'
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
  #index {
    .callCar {
      text-align: center;
      font-size: 0.6rem;
      color: #35c590;
      width: 100px;
      margin: auto;
      margin-top: 100px;
    }
    .mint-button {
      font-size: 0.38rem;
    }
    .mint-button--default {
      color: #fff;
      background-color: rgb(53, 197, 144);
    }
    .isBind {
      .invalid {
        background-color: #8dc194;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
      }
      .legal {
        background-color: rgb(53, 197, 144);
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
      }
    }
    .notePop {
      width: 280px;
      height: 400px;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 20px;
    }
    .mint-field-core {
      text-align: right;
      padding-right: 10px;
    }
    .mint-cell-value {
      textarea {
        text-align: left;
      }
    }
    .mint-popup-right {
      height: 100%;
      width: 100%;
    }
    .mint-field .mint-cell-title {
      width: 5em;
    }
    .mu-item-title {
      font-size: 0.4rem;
    }
    .material-icons {
      color: #ccc;
    }
  }
    .mint-toast {
      z-index: 99999;
    }
    .mint-indicator-wrapper {
      z-index: 99999;
    }

    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s infinite;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      0% {
        transform: scale(1);
      }

}
</style>
