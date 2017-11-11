<template>
  <div id="index">
    <mt-header :title="title">
      <mt-button icon="more"
                 slot="right"
                 @click.native="sheetVisible = true"></mt-button>
    </mt-header>
    <form action="" @submit.prevent="submit" v-if="!isBind">
      <mt-field label="真实姓名"
                placeholder="请输入真实姓名" v-model="formData.realName"></mt-field>
      <mt-field label="性别" placeholder="请选择性别"
                            @click.native="goSelectSex"
                            v-model="formData.sex"></mt-field>
      <getCode @code="getCode"
               @mobile="getMobile"></getCode>
      <mt-field label="留言"
                placeholder="填写留言信息"
                type="textarea" rows="4"
                v-model="formData.note"></mt-field>
      <div class="com_btn_style">
        <mt-button type="default" size="large" @click="bindCode">绑定二维码</mt-button>
      </div>
    </form>
    <div v-if="isBind" class="isBind">
      <form action="" @submit.prevent="submit">
        <mt-field label="留言信息"
                  type="textarea" rows="3"
                  :value="note"
                  :disabled=true @click.native="notePop = true"></mt-field>
        <!-- <getCode @code="getCode" @mobile="getMobile" label="联系失主"></getCode> -->
      </form>
      <div class="com_btn_style">
        <mt-button type="default"
                   size="normal"
                   @click="callPhonePop = true"
                    style="margin-right: 30px">呼叫失主</mt-button>
        <mt-button type="default"
                   size="normal"
                   @click="writeNotePop = true"
                   style="margin-left: 30px">留言失主</mt-button>
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

    <!-- 呼叫失主弹出框 -->
    <mt-popup
      v-model="callPhonePop"
      position="right">
        <getCode @code="getCode" @mobile="getMobile" label="联系失主"></getCode>
        <div class="com_btn_style">
          <mt-button type="default"
                      size="normal"
                      @click="callPhone()"
                      style="margin-right: 30px">呼叫失主</mt-button>
          <mt-button type="default"
                      size="normal"
                      @click="callPhonePop = false"
                      style="margin-left: 30px">返回上级</mt-button>
        </div>
    </mt-popup>

    <!-- 留言失主弹出框 -->
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
  export default {
    data () {
      return {
        title: '',
        actions: [],
        isBind: false,
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
        note: '', // 留言
        popupSex: false, // 性别弹出框
        notePop: false, // 留言弹出框
        callPhonePop: false, // 呼叫失主弹出框
        writeNotePop: false, // 呼叫失主弹出框
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
      // 呼叫失主
      callPhone () {
        if (this.isInvalid) {
          Toast(this.hintMessage)
        } else {
          if (this.formData.code) {
            MessageBox.confirm('请确认手机号码是否正确').then(() => {
              doubleCall.bind(this)(this.formData.code, this.formData.mobile, this.formData.qrKey).then(res => {
                if (res.code === '200') {
                  Toast('呼叫成功')
                  Indicator.open('呼叫中...')
                }
              })
            })
          } else {
            Toast('验证码不能为空')
          }
        }
      },
      // 绑定二维码
      bindCode () {
        MessageBox.confirm('确认数据填写正确吗？').then(action => {
          if (action === 'confirm') {
            console.log(this.formData)
            bindQRcode.bind(this)(this.formData).then(res => {
              if (res.code === '200') {
                this.$router.push({
                  name: 'bindSuccess'
                })
              }
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
          if (res.code === '200') {
            if (res.dataBody && res.dataBody.id) {
              vm.isBind = res.dataBody.isBind
              if (vm.isBind) {
                vm.title = '联系失主'
                vm.formData = res.dataBody
                vm.note = res.dataBody.note
              } else {
                vm.title = '二维码激活'
                vm.formData.id = res.dataBody.id
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
    .mint-button {
      font-size: 0.38rem;
    }
    .mint-button--default {
      color: #fff;
      background-color: rgba(0, 154, 97, 1);
    }
    .isBind {
      .invalid {
        background-color: #8dc194;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
      }
      .legal {
        background-color: #009a61;
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
    .mint-popup-right {
      height: 100%;
      width: 100%;
    }
    .mint-field .mint-cell-title {
      width: 5em;
    }
  }
    .mint-toast {
      z-index: 99999;
    }
    .mint-indicator-wrapper {
      z-index: 99999;
    }
</style>
