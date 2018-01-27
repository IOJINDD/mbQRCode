<template>
    <div id="my-head2">
      <mu-flexbox :gutter=8>
        <mu-flexbox-item class="text-left">
          <mu-icon :value="leftIcon"
          @click="goBack"
          color="#fff"
          :size=28 />
        </mu-flexbox-item>
        <mu-flexbox-item class="title">
            {{ title | titleFilter }}
        </mu-flexbox-item>
        <mu-flexbox-item class="text-right">
          <!-- <mu-icon value="mail_outline"
          @click="openCode"
          color="#fff"
          :size=28 />
          <span class="span" v-if="num > 0">
            {{ num }}
          </span> -->
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
  </template>
  <script>
    import { Toast } from 'mint-ui'
    export default {
      data () {
        return {

        }
      },
      methods: {
        goBack () {
          this.$router.go(-1)
        },
        // 查看留言详情
        openCode () {
          if (Number(this.num) > 0) {
            this.$router.push({
              name: 'noteDetail',
              params: {
                id: this.serial
              },
              query: {
                codeType: this.codeType
              }
            })
          } else {
            Toast('暂时还没人给你留言~')
          }
        },
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
            case 'normal':
              return '普通码'
          }
        }
      },
      props: {
        title: {
          type: String
        },
        leftIcon: {
          type: String,
          default () {
            return 'chevron_left'
          }
        },
        num: {
          type: Number // 留言数量
        },
        serial: {
          type: String // 编号
        },
        codeType: {
          type: String // 二维码类型
        }
      }
    }
  </script>
  <style lang="scss">
    #my-head2 {
      background: url(../assets/button.png) repeat center top;
      background-size: 100%;
      padding: 8px 20px;
      position: relative;
      .title {
        width: 75%;
        text-align: center;
        font-size: 0.5rem;
        color: #fff;
      }
      .material-icons {
        z-index: 999;
      }
      .text-right {
        .span {
          display: inline-block;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          text-align: center;
          line-height: 15px;
          color: #fff;
          background-color: red;
          position: absolute;
          top: 5px;
          right: 7px;
        }
      }
    }
  </style>
