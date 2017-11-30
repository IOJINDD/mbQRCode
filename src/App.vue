<template>
  <div id="app" :style="{minHeight: height}" v-if="bgImg">
    <img :src="bgImg" alt="" width="100%" height="100%" class="bgImg">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="bottom">
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
</template>

<script>
import { getWindowHeight } from 'tools/index'
import bgImg from 'assets/bg.png'
import { scanRecord } from './services/service.js'
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
      height: window.screen.height + 'px',
      bgImg,
      type: this.$route.query.type
    }
  },
  beforeCreate () {
    initBodyHeight()
  },
  mounted () {
    let infoJson = {
      createTime: new Date().getTime(), // 创建时间
      userAgent: navigator.userAgent // 手机型号
    }

    //  保存扫码信息
    setTimeout(() => {
      scanRecord.bind(this)({
        qrKey: this.qrKey,
        codeType: this.type,
        infoJson: JSON.stringify(infoJson)
      }).then(res => {

      })
    }, 1000)
  }
}
</script>

<style lang="scss">
#app {
  .bgImg {
    position: fixed;
    z-index: 1;
  }
  .bottom {
    position: fixed;
    width: 100%;
    text-align: center;
    z-index: 20;
    bottom: 10px;
    a {
      color: #9e9e9e;
      display: inline-block;
      padding-top: 10px;
    }
  }
}
</style>
