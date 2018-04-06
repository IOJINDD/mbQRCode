<template>
  <div id="app" :style="{minHeight: height + 'px'}" v-if="bgImg && advert">
    <div v-show="!isAdvert">
      <img :src="bgImg" alt="" width="100%" height="100%" class="bgImg">
      <!-- <div>  -->
      <!-- </div> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <div class="bottom" v-if="bottomShow">
        <a href="javascript:">
          <img src="./assets/police.png" alt="" width="16px" height="16px">
          浙公网安备：33010802008316号
        </a>
        <br>
        <a href="javascript:">
          ICP备案：浙ICP备17024899号-1
        </a>
      </div>
    </div>
    <div v-show="isAdvert" :style="{minHeight: height + 'px'}">
      <span class="pass" @click="passAdvert">
        跳过 <span class="time">{{ second }}</span>
      </span>
      <swipe :auto="2000" class="my-swipe" :style="{height: height + 'px'}">
        <swipe-item :style="{height: height + 'px'}">
          <div>
            <img :src="advert2" alt="" width="100%" @click="goShopping" >
          </div>
        </swipe-item>
        <swipe-item :style="{height: height + 'px'}">
          <div>
            <img :src="advert" alt="" width="100%" @click="goShopping" >
          </div>
        </swipe-item>
      </swipe>
    </div>
  </div>
</template>

<script>
import { getWindowHeight } from 'tools/index'
import clientInfo from 'lm-se-client-info'
import { Swipe, SwipeItem } from 'mint-ui'
import bgImg from 'assets/bg.png'
import advert from 'assets/advert.png'
import advert2 from 'assets/advert2.png'
import { scanRecord, checkQRcode } from './services/service.js'
function initBodyHeight () {
  let body = document.querySelector('body')
  body.style.minHeight = getWindowHeight() +'px'
}
export default {
  name: 'app',
  data () {
    return {
      qrKey: this.$route.params.qrKey,
      qrKeyArr: [],
      height: document.documentElement.clientHeight,
      bottomShow: true,
      bgImg,
      showImg: true,
      isAdvert: true, // 广告是否展示
      advert, // 广告图片
      advert2, // 广告图片
      second: 4, // 广告时间
      type: this.$route.query.type
    }
  },
  beforeCreate () {
    initBodyHeight()
  },
  methods: {
    // 跳过
    passAdvert () {
      console.log('11')
      this.isAdvert = false
    },
    // 前往商城
    goShopping () {
      // console.log('11')
      // window.location.href = 'https://h5.youzan.com/v2/tag/f0r9h1z2'
    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  mounted () {
    let infoJson = {
      createTime: new Date().getTime(), // 创建时间
      userAgent: navigator.userAgent // 手机型号
    }

    // 判断是否在微信环境里
    if (clientInfo.render.isWechatWebView) {
      global.ISWX = true
    } else {
      global.ISWX = false
    }

    // 广告时间倒计时
    let advertTime = setInterval(() => {
      this.second--
      if (this.second === 0) {
        clearInterval(advertTime)
        this.isAdvert = false
      }
    }, 1000)
    //  保存扫码信息
    setTimeout(() => {
      if (this.qrKey) {

        checkQRcode.bind(this)(this.qrKey, this.type).then(res => {
          if (res.code === 200 && res.dataBody && res.dataBody.id) {
            let activeFlag = res.dataBody.isBind ? 1 : 0
            scanRecord.bind(this)({
              qrKey: this.qrKey,
              codeType: this.type,
              activeFlag: activeFlag,
              infoJson: JSON.stringify(infoJson)
            }).then(res => {

            })
          }
        })
      }
    }, 1000)
    let client = document.documentElement.clientHeight
    window.onresize = () => {
      // window.alert()
      if (client > document.documentElement.clientHeight) {
        this.bottomShow = false
      } else {
        this.bottomShow = true
      }
    }
  }
}
</script>

<style lang="scss">
html,body{overflow:hidden;}
.mu-popup {
  background-color: #ccc;
}
.mu-menu-item-wrapper.active {
  color: #35c590;
}
#app {
  .bgImg {
    position: fixed;
    z-index: 1;
  }
  .advertImg {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
  }
  .pass {
    padding: 8px;
    border-radius: 8px;
    display: inline-block;
    letter-spacing: 1px;
    float: right;
    right: 20px;
    top: 40px;
    z-index: 10000;
    position: fixed;
    font-family: 'PingFang SC';
    background: rgba(135, 135, 135, 0.6);
    color: #fff;
    .time {
      color: red;
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    text-align: center;
    z-index: 999;
    bottom: 10px;
    a {
      color: #9e9e9e;
      display: inline-block;
      padding-top: 10px;
    }
  }
}
</style>
