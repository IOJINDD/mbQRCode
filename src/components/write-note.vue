<!-- 拾取人填写留言消息 -->
<template>
  <div id="write-note">
      <mt-field label="姓名"
      placeholder="请输入您的姓名" v-model="writeData.messager"></mt-field>
      <mt-field label="留言*"
            placeholder="填写留言信息"
            type="textarea" rows="4"
            v-model="writeData.content"></mt-field>
      <!-- <mt-field label="图片"> -->
      <uploadImg @imgPaths="imgPaths"
                  ref="uploadImg">

      </uploadImg>

      <!-- </mt-field> -->
      <getCode @code="getCode"
                @mobile="getMobile"
                label="手机*"
                ref="getCode">

      </getCode>
      <div class="com_btn_style">
        <mt-button type="default"
                  size="normal"
                  @click="puslishInfo()"
                  style="margin-right: 30px">提交信息</mt-button>
        <mt-button type="default"
                  size="normal"
                  @click="writePop()"
                  style="margin-left: 30px">返回上级</mt-button>
      </div>
  </div>
</template>
<script>
  import uploadImg from 'components/upload-img'
  import getCode from 'components/get-code'
  import { Toast } from 'mint-ui'
  import { checkData, getCheckCode } from 'tools/index'
  import { publishNote, scanRecord }from 'services/service'

  function saveCode (vm) {
    let infoJson = {
      createTime: new Date().getTime(), // 创建时间
      userAgent: navigator.userAgent // 手机型号
    }
    scanRecord.bind(vm)({
      qrKey: vm.writeData.qrCode,
      area: global.area,
      city: global.city,
      street: global.street,
      province: global.province,
      codeType: vm.qrCodeType,
      infoJson: JSON.stringify(infoJson)
    }).then(res => {

    })
  }

  export default {
    data () {
      return {
        isInvalid: true, // 手机号码是否正确
        hintMessage: '手机号码格式有误',
        isLogin: false,
        writeData: {
          qrCode: this.$route.params.qrKey,
          fromSex: '', // 留言者性别
          messager: '', // 留言者姓名
          content: '', // 留言内容
          code: '', // 验证码
          fromMobile: '', // 留言者手机号
        },
        qrCodeType: this.$route.query.type, // 二维码类型
        popupSex: false // 性别弹出框
      }
    },
    methods: {
      // 获取验证码
      getCode (val) {
        this.writeData.code = val
      },
      // 获取手机号
      getMobile (val) {
        this.writeData.fromMobile = val
      },
      imgPaths (val) {
        this.writeData.imgPaths = val
      },
      // 提交留言消息
      puslishInfo () {
        this.writeData.toUser = this.userId
        let params = [this.writeData.content, this.writeData.fromMobile, this.writeData.code]
        let toasts = ['请您填写内容', '请您填写手机号', '请您填写验证码']
        checkData(params, toasts, () => {

          // 保存扫码信息
          saveCode(this)
          publishNote.bind(this)(this.writeData).then(res => {
            getCheckCode(res, () => {
              Toast('提交成功')
              this.writeData = {}
              this.$refs.getCode.init()
              this.$refs.uploadImg.init()
              this.$emit('writePop', '')
            }, () => {
              Toast(res.msg)
            })
          })
        })
      },
      // 关闭弹出框
      writePop () {
        this.$emit('writePop', '')
      },
      // 关闭软键盘
      blurFun () {
        Array.from(document.querySelectorAll('.mint-field-core')).forEach((ele) => {
          ele.blur()
        }, this)
      }
    },
    props: {
      userId: {
        type: Number
      },
      qrCode: {
        type: String
      }
    },
    watch: {
      'writeData.fromMobile': function (val) {
        console.log(val)
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(val))) {
          this.isInvalid = true
        } else {
          this.isInvalid = false
        }
      }
    },
    mounted () {
      console.log(global.mobilePhone)
      if (global.mobilePhone) {
        this.isLogin = true
      }
    },
    components: {
      getCode,
      uploadImg
    }
  }
</script>
