<!-- 个人信息 -->
<template>
  <div id="self-info">
    <div class="head">
      <mu-flexbox>
        <mu-flexbox-item grow="3">
          <mu-icon value="chevron_left" :size=30 color="#fff" @click="goBack"/>
        </mu-flexbox-item>
        <mu-flexbox-item grow="7">
          <h1>个人信息</h1>
          <h3>
            {{ userObj.mobilePhone }}
          </h3>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class="body" :style="{ height: bodyHeight }">
      <mu-text-field hintText="姓名" type="text" icon="person" v-model="userObj.realName"/><br/>
      <mu-select-field v-model="userObj.sex" icon="people_outline" hintText="性别">
        <mu-menu-item value="男" title="男"/>
        <mu-menu-item value="女" title="女"/>
      </mu-select-field>
      <mu-list v-if="userObj.eqrCodes">
        <mu-list-item :toggleNested=true
                      title="我激活的二维码">
          <mu-list-item :title="'编号：' + item.serial"
                        v-for="item,index in userObj.eqrCodes"
                        key="item"
                        @click.native="goCode(index)"
                        slot="nested"
                        :open=false>
            <mu-icon value="keyboard_arrow_right" slot="right"/>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
      <!-- <mu-text-field hintText="留言" multiLine :rows="3" :rowsMax="6" icon="comment"/><br/> -->
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                          color="#fff"
                          label="保存信息"
                          fullWidth
                          @click="saveInfo()"/>
      </div>
    </div>
  </div>
</template>
<script>
  import { userDetail, saveInfo } from 'services/service'
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        userObj: {},
        sex: '' // 性别
      }
    },
    methods: {
      // 查看留言详情
      goCode (index) {
        this.$router.push({
          name: 'codeNote',
          query: {
            id: index
          }
        })
      },
      // 返回
      goBack () {
        this.$router.go(-1)
      },
      // 保存信息
      saveInfo () {
        saveInfo.bind(this)(this.userObj).then(res => {
          if (res.code === 200) {
            Toast('保存成功')
            this.$router.go(-1)
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        // 判断是否登录
        if (window.localStorage.getItem('userObj')) {
          let id  = JSON.parse(window.localStorage.getItem('userObj')).id
          userDetail.bind(vm)(id, 'codes').then(res => {
            vm.userObj = res.dataBody

            // 本地存储二维码信息
            window.localStorage.setItem('codeInfo', JSON.stringify(vm.userObj))
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
        color: #757575;
        font-size: 0.66rem;
      }
      .mu-item-title {
        color: #787878;
        font-size: 0.4rem
      }
      .mu-item {
        padding: 0px;
        margin: 0px 20px;
        border-bottom: 1px solid #ccc;
        .material-icons {
          font-size: 0.46rem;
        }
        .mu-text-field.has-icon {
          padding-left: 45px;
        }
        .mu-text-field.has-icon .mu-text-field-line {
          left: 45px;
        }
        .mu-text-field.has-icon .mu-text-field-focus-line {
          left: 45px;
        }
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
