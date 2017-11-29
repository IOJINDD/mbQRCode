<!-- tab个人中心 -->
<template>
  <div id="self-center">
    <mt-cell :title="userObj.mobilePhone" class="title">
    </mt-cell>
    <mu-list-item :title="'我的二维码（' + userObj.list.length + ')'" toggleNested v-if="userObj.list">
      <mu-icon slot="left" value="grid_on"/>
      <mu-list-item slot="nested" :title="item.serial"
                    v-for="item,index in userObj.list"
                    key="item"
                    @click.native="openCode(item.serial)">
        <img src="../assets/code.svg" alt="" slot="left" width="50%">
        <span slot="right" style="font-size: 0.43rem">留言：{{ item.num }}</span>
        <mu-icon value="keyboard_arrow_right" slot="right"/>
      </mu-list-item>
    </mu-list-item>

    <div class="com_btn_style">
      <mu-raised-button label="退出登录" @click="signOut" backgroundColor="rgba(244, 64, 52, 0.86)" fullWidth/>
    </div>
    <mt-popup
    position="right"
    v-model="qrcodePop">
      <div id="qrcodePop">
        <mu-appbar title="留言详情" class="text-center">
          <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="qrcodePop = false"/>
        </mu-appbar>
        <div v-for="item, index in qrCodeArr" key="item" class="qrDetail">
          <openPhoto :imgPaths="item.imgPaths"></openPhoto>
          <mt-field label="留言电话" type="text"
                    @click.native="call(item.fromMobile)"
                  :value="item.fromMobile"
                  :disabled="true">
          </mt-field>
          <mt-field label="留言人" type="text"
                :value="item.messager"
                :disabled="true">
          </mt-field>
            <mt-field label="留言时间" type="text"
                  :value="item.msgTime | date"
                  :disabled="true">
          </mt-field>
          <mt-field label="留言内容" type="textarea" rows="4"
                  :value="item.content"
                  :disabled="true">
          </mt-field>
        </div>
      </div>
  </mt-popup>
  </div>
</template>
<script>
  // import { MessageBox, Toast } from 'mint-ui'
  import { qrNotes, userDetail } from 'services/service'
  import openPhoto from 'components/open-photo.vue'
  export default {
    data () {
      return {
        role: '', // 角色
        qrcodePop: false, // 二维码弹出框
        qrCodeArr: [], // 二维码详情
        userObj: {} // 用户信息
      }
    },
    methods: {
      // 个人用户编辑信息
      goSelfInfo () {
        this.$router.push({
          name: 'selfInfo'
        })
      },
      // 查看二维码详情
      openCode (val) {
        qrNotes.bind(this)(val).then(res => {
          if (res.code === 200) {
            this.qrCodeArr = res.dataBody.data
            this.qrcodePop = true
          }
        })
      },
      // 退出登录
      signOut () {
        window.localStorage.removeItem('userObj')
        this.$router.push({
          name: 'index'
        })
      },
      // 拨打电话
      call (val) {
        window.location.href = 'tel:' + val
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
    components: {
      openPhoto
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        if (JSON.parse(window.localStorage.getItem('userObj'))) {
          let id  = JSON.parse(window.localStorage.getItem('userObj')).id
          userDetail.bind(vm)(id).then(res => {
            vm.userObj = res.dataBody
          })

        } else {
          vm.$router.push({
            name: 'index'
          })
        }
      })
    },
    mounted () {

    }
  }
</script>
<style lang="scss">
  @import '../scss/variables.scss';
  #self-center {
    .mu-item-left, .mu-item-right {
      width: inherit;
    }
    .title {
      .mint-cell-wrapper {
        height: 120px;
        font-weight: 200;
        color: #fff;
        background-color: #35c590;
      }
    }
    .mint-cell-text {
      font-size: 0.4rem;
      font-weight: 500;
    }
    .mint-cell-value {
      color: #fff;
      font-weight: 500;
    }
    .mu-flexbox {
      background-color: #fff;
    }
    .mu-item.show-left {
      padding-left: 50px;
    }
    .flex-item {
      text-align: center;
      line-height: 0.6rem;
      padding: 15px;
      span {
        font-size: 0.5rem;
      }
      label {
        font-size: 0.35rem;
        color: #9e9e9e;
      }
    }
    .weui-cell__bd {
      font-size: 0.4rem;
    }
    .weui-cell__ft {
      font-size: 0.35rem;
    }
    .weui-cell_access .weui-cell__ft:after {
      border-color: $textColor;
    }
    .mint-popup-right {
      height: 100%;
      width: 100%;
      overflow: scroll;
    }
    .mint-popup {
      background-color: #f3f3f3;
    }
    .mint-cell-label {
      margin-top: 12px;
    }
  }
  #qrcodePop {
    .mu-appbar {
      background-color: #35c590;
    }
    .mu-appbar-title {
      font-size: 0.4rem;
    }
    .material-icons {
      color: #fff;
    }
    .qrDetail {
      background-color: #fff;
      margin: 10px;
      padding: 20px 10px;
    }
    .mint-field-core {
      background-color: #fff;
    }
  }
  .mint-toast {
    z-index: 99999;
  }
  .mint-indicator-wrapper {
    z-index: 99999;
  }
</style>
