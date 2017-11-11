<template>
  <div id="openPhoto" v-if="imgPaths">
    <swipe :auto="5000" class="my-swipe" :style="{height: swipeHeight}" v-if="imgPaths">
        <swipe-item v-for="path,index in imgPaths " v-if="imgPaths.length > 0" :key="path">
          <div :style="{width: screenWidth + 'px', height: screenWidth + 'px', overflow: 'hidden', margin: 'auto'}">
            <img :src="path" alt="" width="100%" @click="previewImage(imgPaths)">
          </div>
        </swipe-item>
        <swipe-item v-if="imgPaths.length == 0" key="path" style="text-align: center;">
          <div :style="{width: screenWidth + 'px', height: screenWidth + 'px', overflow: 'hidden', margin: 'auto', marginTop: '20px'}" class="defaultImg">
            <img :src="defaultImg" alt="" width="80%">
          </div>
        </swipe-item>
    </swipe>
    <mu-dialog :open="imgDialog" dialogClass="imgBody-dialog" v-if="imgPaths">
      <section class="imgBody"  @click="closeDialog">
        <label class="num_label">{{ indexImgIn + 1 }}/{{ imgPaths.length }}</label>
      </section>
      <div id="photo-swipe"  @click="closeDialog" >
        <div v-for="path,index in imgPaths">
          <img :src="path" alt=""  width="90%" v-show="index === indexImgIn" :style="{maxHeight: screenHeight + 'px'}"/>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
  import { initWechatWebView } from '../services/sdk-config.js'
  import { Swipe, SwipeItem } from 'mint-ui'
  import defaultImg from '../assets/logo.png'
  /* eslint-disable */
  export default {
    data () {
      return {
        imgDialog: false,
        screenHeight: window.screen.height - 180,
        screenWidth: window.screen.width,
        indexImgIn: 0,
        defaultImg,
        swipeHeight: '200px'
      }
    },
    methods: {
      // 关闭图片
      closeDialog () {
        this.imgDialog = false
      },
      // 放大图片
      openPhoto (index) {
        this.indexImgIn = index
        this.imgDialog = true
        this.addTouchEvent()
      },
      // 向左划 图片
      addNum () {
        if (this.indexImgIn === this.imgPaths.length - 1) {
          this.indexImgIn = 0
        } else {
          this.indexImgIn++
        }
        console.log(this.indexImgIn)
      },
      // 向右划图片
      reduceNum () {
        if (this.indexImgIn === 0) {
          this.indexImgIn = this.imgPaths.length - 1
        } else {
          this.indexImgIn--
        }
        console.log(this.indexImgIn)
      },
      addTouchEvent () {
        setTimeout(() => {
          let nStartX, nEndX
          document.getElementById('photo-swipe').addEventListener('touchstart', (e) => {
            nStartX = e.targetTouches[0].pageX
          })
          document.getElementById('photo-swipe').addEventListener('touchend', (e) => {
            nEndX = e.changedTouches[0].pageX
            console.log(nStartX)
            if (nStartX - nEndX > 0) {
              // 从左至右
              this.addNum()
            } else if (nStartX - nEndX < 0) {
              console.log('reduceNum')
                // 从右至左
              this.reduceNum()
            } else {

            }
          })
        }, 1000)
      },
      // 查看图片
      previewImage (paths) {
        let images = []
        paths.forEach((element) => {
          images.push({
            u: element,
            t: ''
          })
        }, this)
        // 支付宝内调用查看图片
        if (global.ISALIPAY) {
          AlipayJSBridge.call('imageViewer', {
            images: images,
            init: 0
          }, function (res) {
          })
        }
        // 微信环境查看图片
        if (window.wx) {
          initWechatWebView(global.WXSDK, () => {
            wx.previewImage({
                current: paths[0], // 当前显示图片的http链接
                urls: paths // 需要预览的图片http链接列表
            })
          })
        }
      }
    },
    props: {
      imgPaths: {
        type: Array
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    updated () {
      if (this.imgPaths && this.imgPaths.length === 0) {
        this.swipeHeight = '200px'
      }
    }
  }
</script>
<style lang="scss">
  #openPhoto {
    background-color: #fff;
    .defaultImg {
      img {
        border-style: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
 .imgBody-dialog {
      width: 100%;
      height: 100%;
      background: #000;
    .mu-dialog-body {
      padding: 0px;
      text-align: center;
      max-height: 750px;
    }
    .imgBody {
      color: #fff;
      padding: 15px;
      text-align: left;
      margin-left: 5px;
    }
    .mu-dialog, .mu-dialog-body {
      width: 100%;
      height: 100%;
      background: #000;
    }
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
 }
</style>
