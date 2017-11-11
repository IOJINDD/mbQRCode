<!-- tab个人中心 -->
<template>
  <div id="self-center">
    <mt-cell :title="'姓名:' + userObj.realName" :label="'用户名:' + userObj.username">
    </mt-cell>
    <mu-list-item :title="'我的二维码（' + userObj.qrCodes.length + ')'" toggleNested v-if="userObj.qrCodes">
      <mu-icon slot="left" value="grid_on"/>
      <mu-list-item slot="nested" :title="item"
                    v-for="item,index in userObj.qrCodes"
                    key="item"
                    @click.native="openCode(item)">
        <mu-icon slot="left" value="grade"/>
      </mu-list-item>
    </mu-list-item>

    <mt-popup
    position="right"
    v-model="qrcodePop">
      <div id="qrcodePop">
        <mu-appbar title="二维码详情" class="text-center">
          <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="qrcodePop = false"/>
        </mu-appbar>
        <div v-for="item, index in qrCodeArr" key="item" class="qrDetail">
          <openPhoto :imgPaths="item.imgPaths"></openPhoto>
          <mt-field label="留言" type="textarea" rows="4"
                  :value="item.content"
                  :disabled="true">
          </mt-field>
          <mt-field label="联系电话" type="text"
                  :value="item.fromMobile"
                  :disabled="true">
          </mt-field>
          <mt-field label="联系人" type="text"
                :value="item.messager"
                :disabled="true">
        </mt-field>
          <mt-field label="留言时间" type="text"
                :value="item.msgTime | date"
                :disabled="true">
        </mt-field>
        </div>
      </div>
  </mt-popup>
  </div>
</template>
<script>
  // import { MessageBox, Toast } from 'mint-ui'
  import { qrNotes } from 'services/service'
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
          if (res.code === '200') {
            this.qrCodeArr = res.dataBody.data
            this.qrcodePop = true
            console.log(this.qrCodeArr)
          }
        })
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
    mounted () {
      this.userObj = JSON.parse(window.localStorage.getItem('userObj'))
      console.log(JSON.parse(window.localStorage.getItem('userObj')))
    }
  }
</script>
<style lang="scss">
  @import '../scss/variables.scss';
  #self-center {
    .mint-cell:first-child .mint-cell-wrapper {
      height: 120px;
      font-weight: 200;
      color: #fff;
      background-color: #35c590;
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
  }
  .mint-toast {
    z-index: 99999;
  }
  .mint-indicator-wrapper {
    z-index: 99999;
  }
</style>
