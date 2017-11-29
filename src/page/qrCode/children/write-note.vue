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
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)" label="提交" fullWidth @click="puslishInfo()"/>
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
        let toasts = ['内容不能为空', '手机号不能为空', '验证码不能为空']
        checkData(params, toasts, () => {

          // 保存扫码信息
          saveCode(this)
          publishNote.bind(this)(this.writeData).then(res => {
            getCheckCode(res, () => {
              Toast('留言成功')
              this.$router.go(-1)
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
    components: {
      getCode,
      uploadImg
    }
  }
</script>
