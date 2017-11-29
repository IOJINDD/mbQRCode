<template>
  <div id="self-info">
    <div class="head">
      <h1>个人信息</h1>
      <h3>
        {{ userObj.mobilePhone }}
      </h3>
    </div>
    <div class="body" :style="{ height: bodyHeight }">
      <mu-text-field hintText="姓名" type="text" icon="person"/><br/>
      <mu-select-field v-model="game1" icon="people_outline" hintText="性别">
        <mu-menu-item value="1" title="男"/>
        <mu-menu-item value="2" title="女"/>
      </mu-select-field>
      <mu-text-field hintText="留言" multiLine :rows="3" :rowsMax="6" icon="comment"/><br/>
      <!-- <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                          color="#fff"
                          label="退出登录"
                          fullWidth
                          @click="signOut()"/>
      </div> -->
    </div>
  </div>
</template>
<script>
  import { userDetail } from 'services/service'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        userObj: {}
      }
    },
    methods: {
      // 查看留言详情
      openCode (val) {
        if (val.num > 0) {
          this.$router.push({
            name: 'noteDetail',
            params: {
              id: val.serial
            }
          })
        }
      },
      // 退出登录
      signOut () {
        window.localStorage.removeItem('userObj')
        this.$router.push({
          name: 'login'
        })
      }
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
            name: 'login'
          })
        }
      })
    }
  }
</script>
<style lang="scss">
  #self-info {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
    .head {
      background: url(../../assets/button.png) repeat center top;
      background-size: 100%;
      text-align: center;
      padding: 20px;
      h1 {
        font-size: 0.63rem;
        font-weight: 300;
      }
      h3 {
        margin-top: 10px;
        font-weight: 100;
        font-size: 0.4rem;
      }
    }
    .body {
      background-color: #fff;
      width: 100%;
      overflow: scroll;
      .mu-text-field-content {
        padding-top: 8px;
      }
      .mu-text-field-input {
        color: #888;
        font-size: 0.4rem;
      }
      .mu-dropDown-menu-text-overflow {
        color: #888;
        font-size: 0.4rem;
      }
      .material-icons {
        color: #9e9e9e;
        font-size: 0.66rem;
      }
      .mu-item-title {
        color: #787878;
        font-size: 0.34rem
      }
      .mu-item {
        padding: 0px;
        margin: 0px 20px;
        border-bottom: 1px solid #ccc;
      }
      .mu-item-right {
        right: 0px
      }
      .btn-top {
        margin: 30px;
      }
    }
  }
</style>
