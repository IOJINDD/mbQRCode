<!-- 二维码详情 -->
<template>
  <div id="code-note">
    <myHead :title="codeInfo.serial"
            leftIcon="chevron_left">

    </myHead>
    <div class="body" :style="{ height: bodyHeight }">
      <mu-list>
        <mu-list-item title="别称" @click.native="chooseName">
          <label for="" slot="right">{{ codeInfo.realName || '暂无别称' }}</label>
          <mu-icon value="keyboard_arrow_right" slot="right" :size="20" color="#9e9e9e"/>
        </mu-list-item>
      </mu-list>
      <mu-list v-if="codeArr.length > 0 && noteArr">
        <mu-list-item toggleNested
                      title="e码类型">
          <mu-list-item :title="item | titleFilter"
                        v-for="item,index in codeArr"
                        key="item"
                        @click.native="goCode(item)"
                        slot="nested"
                        :open=false>
            <mu-icon value="keyboard_arrow_right" slot="right"/>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import { saveInfo, getCallNum } from 'services/service'
  import { Toast, MessageBox } from 'mint-ui'

  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        codeInfo: {}, // 二维码的信息
        userObj: {}, // 用户信息
        codeArr: [], // 二维码数组
        noteArr: {}, // 留言数量
        inputErrorText: '',
        id: this.$route.query.id,
      }
    },
    methods: {
      // 保存信息
      saveInfo () {
        if (this.codeInfo.realName.length > 7) {
          Toast('昵称太长啦~')
        } else {
          this.userObj.eqrCodes[this.id] = this.codeInfo
          saveInfo.bind(this)(this.userObj).then(res => {
            if (res.code === 200) {
              Toast('保存成功')
            }
          })
        }
      },
      // 查看二维码类型信息
      goCode (val) {
        this.$router.push({
          name: 'codeTypeDetail',
          query: {
            id: this.id,
            codeType: val
          }
        })
      },
      chooseName () {
        MessageBox.prompt('e码的别称', '').then(({
          value, action
        }) => {
          if (value.length > 7) {
            Toast('别称不可大于7位哦~')
          } else {
            this.codeInfo.realName = value
            this.saveInfo()
          }
        }, err => {

        })
      },
      // 超出提示语
      handleInputOverflow (isOverflow) {
        this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
      },
    },
    components: {
      myHead
    },
    filters: {
      titleFilter: function (val) {
        switch (val) {
          case 'car':
            return '挪车码';
          case 'key':
            return '钥匙扣';
          case 'paster':
            return '贴纸';
          case 'presentTicket':
            return '赠送券';
          case 'cardCover':
            return '卡套';
          case 'card':
            return '卡片';
          case 'catDrop':
            return '宠物吊牌';
          case 'baggageTag':
            return '行李牌';
          case 'seal':
            return '印章';
          case 'normal':
            return '普通码'
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.userObj = JSON.parse(window.localStorage.getItem('codeInfo'))
        vm.codeInfo = vm.userObj.eqrCodes[to.query.id]
        if (vm.codeInfo.typeTags) {
          vm.codeArr = vm.codeInfo.typeTags.split(',')
          vm.codeArr.pop()
        } else {
          vm.codeArr = ['normal']
        }

        // setTimeout(() => {
        //   vm.noteArr =
        //   console.log(vm.noteArr)
        // }, 1000)

        // 获取留言数量
        getCallNum.bind(vm)(vm.codeInfo.serial).then(res => {
          vm.noteArr = res.dataBody
        })
        console.log(vm.noteArr)
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
        .material-icons {
          color: #fff;
          font-size: 0.5rem;
        }
      }
    }
  }
</style>
