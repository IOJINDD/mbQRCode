<!-- 二维码留言 -->
<template>
  <div id="code-note">
    <myHead :title="title"
            leftIcon="chevron_left">

    </myHead>
    <div class="body">
      <mu-flexbox align="flex-start">
        <mu-flexbox-item grow="2" class="noteIcon">
          <mu-icon value="chat" :size=24 color="#9e9e9e"/>
        </mu-flexbox-item>
        <mu-flexbox-item grow="14">
          <div class="note">
            <mu-text-field hintText="写点什么给捡到的人呗~" multiLine :rows="10" :rowsMax="20" v-model="note"/><br/>
          </div>
        </mu-flexbox-item>
      </mu-flexbox>
      <div class="btn-top">
        <mu-flexbox>
          <mu-flexbox-item>
            <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                              label="保存信息"
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
  import myHead from 'components/my-head'
  import { saveInfo } from 'services/service'
  import { Toast } from 'mint-ui'

  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        title: '', //标题
        note: '', // 留言
        id: this.$route.query.id,
        userObj: {}
      }
    },
    methods: {
      // 保存信息
      saveInfo () {
        this.userObj.eqrCodes[this.id].note = this.note
        saveInfo.bind(this)(this.userObj).then(res => {
          if (res.code === 200) {
            Toast('保存成功')
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
        console.log(vm.userObj.eqrCodes)
        console.log(to.query.id)
        vm.title = vm.userObj.eqrCodes[to.query.id].serial
        vm.note = vm.userObj.eqrCodes[to.query.id].note
      })
    }
  }
</script>
<style lang="scss">
  #code-note {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
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
        margin-bottom: 15px;
        overflow: scroll;
        line-height: 0.4rem;
      }
      .btn-top {
        text-align: center;
        padding: 10px 10px;
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
