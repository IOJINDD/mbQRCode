<template>
  <div id="self-center">
    <div class="head">
      <h1>个人中心</h1>
      <h3>
        {{ userObj.mobilePhone }}
      </h3>
    </div>
    <div class="body" :style="{ height: bodyHeight }">
      <mu-list>
        <mu-list-item :title="'我的二维码（' + userObj.list.length + ')'" toggleNested v-if="userObj.list">
          <mu-list-item slot="nested" :title="item.serial"
                        v-for="item,index in userObj.list"
                        key="item"
                        @click.native="openCode(item.serial)">
            <span slot="right" class="span">留言：{{ item.num }}</span>
            <mu-icon value="keyboard_arrow_right" slot="right"/>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                          color="#fff"
                          label="退出登录"
                          fullWidth
                          @click="goMesLogin()"/>
      </div>
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
      openCode (id) {
        this.$router.push({
          name: 'noteDetail',
          params: {
            id: id
          }
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
            name: 'index'
          })
        }
      })
    }
  }
</script>
<style lang="scss">
  #self-center {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 15% 5%;
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
      .span {
        font-size: 0.34rem;
        color: #787878;
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
