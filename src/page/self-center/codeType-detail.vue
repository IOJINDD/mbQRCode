<!-- 二维码类型详情 -->
<template>
  <div id="codeType-detail">
    <myHead :title="codeType"
            :serial="codeInfo.serial"
            :codeType="codeType"
            :num="noteArr[codeType]"
            leftIcon="chevron_left">
    </myHead>
    <div class="body" :style="{ height: bodyHeight }">
      <mu-flexbox align="flex-start">
        <mu-flexbox-item grow="2" class="subTitle">
          留言：
        </mu-flexbox-item>
        <mu-flexbox-item grow="12" class="note">
          <mu-text-field hintText="写点什么给捡到的人呗~" multiLine :rows="10" :rowsMax="20" v-model="note"/><br/>
        </mu-flexbox-item>
      </mu-flexbox>

      <div class="btn-top">
        <mu-flexbox>
          <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              label="保存留言"
                              :fullWidth=true
                              icon="content_paste"
                              @click="saveInfo()"/>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
    </div>
  </div>
</template>
<script>
  import myHead from 'components/my-head2'
  import { saveInfo, getCallNum } from 'services/service'
  import { Toast } from 'mint-ui'

  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        id: this.$route.query.id,
        codeType: this.$route.query.codeType,
        codeInfo: {}, // 二维码的信息
        note: '', // 留言信息
        noteArr: {}, // 留言数量
        userObj: {} // 用户信息
      }
    },
    methods: {
      // 保存信息
      saveInfo () {
        if (this.codeInfo.note && this.codeInfo.note.indexOf('isCodeType') > -1) {
          this.codeInfo.note = this.codeInfo.note.replace(/\n/g, '')
          console.log(this.codeInfo.note)
          let codeType = eval('(' + this.codeInfo.note.split('isCodeType')[1] + ')')
          codeType[this.codeType] = this.note
          this.codeInfo.note = 'isCodeType' + JSON.stringify(codeType)
        } else {
          this.codeInfo.note = `isCodeType{"${this.codeType}":"${this.note}"}`
        }
        this.userObj.eqrCodes[this.id] = this.codeInfo
        saveInfo.bind(this)(this.userObj).then(res => {
          if (res.code === 200) {
            console.log(res.dataBody)
            Toast('保存成功')
            // 本地存储二维码信息
            window.localStorage.setItem('codeInfo', JSON.stringify(res.dataBody))
            this.$router.go(-1)
          }
        })
      }
    },
    components: {
      myHead
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.userObj = JSON.parse(window.localStorage.getItem('codeInfo'))
        vm.codeInfo = vm.userObj.eqrCodes[to.query.id]
        vm.codeInfo.note = vm.codeInfo.note.replace(/\n/g, '')
        console.log(vm.codeInfo.note)
        // 解析留言
        if (vm.codeInfo.note && vm.codeInfo.note.indexOf('isCodeType') > -1) {
          try {
            vm.note = eval('(' + vm.codeInfo.note.split('isCodeType')[1] + ')')[to.query.codeType]
          } catch (e) {
            let str = vm.codeInfo.note.split('isCodeType')[1].split('":"')[1]
            vm.note  = str.slice(0, str.length - 2)
          }
        } else {
          vm.note = vm.codeInfo.note
        }

        // 获取留言数量
        getCallNum.bind(vm)(vm.codeInfo.serial).then(res => {
          vm.noteArr = res.dataBody
        })
      })
    }
  }
</script>
<style lang="scss">
  #codeType-detail {
    position: relative;
    z-index: 20;
    padding: 8% 5%;
    .body {
      background-color: #fff;
      width: 100%;
      overflow: scroll;
      .subTitle {
        font-size: 0.36rem;
        padding-top: 30px;
        padding-left: 15px;
        padding-right: 0px;
      }
      .note {
        padding-top: 10px;
        .mu-text-field {
          font-size: 0.36rem;
        }
      }
      .btn-top {
        margin: 30px;
        z-index: 99;
        .material-icons {
          color: #fff;
          font-size: 0.5rem;
        }
      }
    }
  }
</style>
