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
    <div class="body" :style="{ height: bodyHeight }" id="selfInfoBody">
      <mu-list>
        <mu-list-item title="姓名" @click.native="chooseName">
          <!-- <mu-icon value="person" slot="left"/> -->
          <label for="" slot="right">{{ userObj.realName }}</label>
          <mu-icon value="keyboard_arrow_right" slot="right" :size="20" color="#9e9e9e"/>
        </mu-list-item>
        <mu-list-item title="性别">
          <select name="" id="" v-model="userObj.sex" slot="right" dir="rtl"          >
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
          <mu-icon value="keyboard_arrow_right" slot="right" :size="20" color="#9e9e9e"/>
        </mu-list-item>
      </mu-list>
      <mu-list v-if="userObj.eqrCodes">
        <mu-list-item :toggleNested=true
                      title="我激活的e码">
                      <!-- :title="item.serial + '（ ' + item.realName + ' ）' | titleFilter" -->
          <mu-list-item :title="item.realName || item.serial"
                        v-for="item,index in userObj.eqrCodes"
                        key="item"
                        @click.native="goCode(index)"
                        slot="nested"
                        :open=false>
            <!-- <span slot="right" class="span">消息：{{ item.num }}</span> -->
            <mu-icon value="keyboard_arrow_right" slot="right"/>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
    <div class="btn-top">
      <mu-raised-button backgroundColor="rgb(53, 197, 144)"
                        color="#fff"
                        label="退出登录"
                        fullWidth
                        @click="signOut()"/>
    </div>
  </div>
</template>
<script>
  import { userDetail, saveInfo } from 'services/service'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        userObj: { },
        first: true,
        ele: null, // 绑定元素
        sex: '' // 性别
      }
    },
    methods: {
      // 查看留言详情
      goCode (index) {

        // 记住滚轮的位置
        window.localStorage.setItem('selfInfoTop', this.ele.scrollTop)

        this.$router.push({
          name: 'codeNote',
          query: {
            id: index
          }
        })
      },
      // 返回
      goBack () {
        console.log(this.$router)
        this.$router.go(-1)
      },
      chooseName () {
        MessageBox.prompt('请输入姓名', '').then(({
          value, action
        }) => {
          this.userObj.realName = value
          this.saveInfo()
        }, err => {

        })
      },
      // 退出登录
      signOut () {
        window.localStorage.removeItem('userObj')
        window.localStorage.removeItem('noRemind')
        this.$router.push({
          name: 'login'
        })
      },
      // 保存信息
      saveInfo () {
        saveInfo.bind(this)(this.userObj).then(res => {
          if (res.code === 200) {
            // Toast('保存成功')
          }
        })
      }
    },
    watch: {
      'userObj.sex': function (val) {
        this.saveInfo()
      }
    },
    filters: {
      titleFilter (input, index) {
        if (input.indexOf('null') > 0) {
          return input.replace('（ null ）', '（ 不知名的e码 ~ ）')
        } else {
          return input
        }
      }
    },
    activated () {
      // 返回滚轮位置
      let obj = document.getElementById('selfInfoBody')
      if (obj) {
        obj.scrollTop = window.localStorage.getItem('selfInfoTop')
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.ele = document.getElementById('selfInfoBody')
        console.log(JSON.parse(window.localStorage.getItem('userObj')))
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
    padding: 0.5rem 5%;
    .mu-item {
      min-height: 1.2rem;
    }
    .head {
      background: url(../../assets/button.png) repeat center top;
      background-size: 100%;
      text-align: center;
      padding: 0.5rem;
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
      .mu-item-right {
        font-size: 0.36rem;
      }
      .mu-item-svg-icon {
        color: #9E9E9E;
      }
      .noName {
        color: #607d8b;
        font-weight: 900;
      }
      select {
        color: #757575;
        background-color: #fff;
        border: none;
        padding: 10px 0px;
        width: 200px;
        font-size: 0.36rem;
      }
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
        font-size: 0.36rem
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
        z-index: 99;
      }
    }
  }
</style>
