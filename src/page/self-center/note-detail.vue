<!-- 留言详情 -->
<template>
  <div id="note-detail">
    <myHead title="留言详情"></myHead>
    <div class="body" :style="{ height: bodyHeight }" v-for="item,index in qrCodeArr">
      <mu-flexbox align="flex-start">
        <mu-flexbox-item grow="2">
          <span class="noter">
            {{ item.messager || '匿名' }}
          </span>
        </mu-flexbox-item>
        <mu-flexbox-item grow="9">
          <mu-flexbox>
            <mu-flexbox-item class="mobile">
              <mu-icon value="phone_forwarded" :size=30  @click="call(item)"/>
            </mu-flexbox-item>
          </mu-flexbox>
          <div class="noteBody">
            <!-- <span class="mobile">{{ item.fromMobile }}</span> <br><br> -->
            <span class="time">
              {{ item.msgTime | date}}
               <!-- <mu-icon value="phone_forwarded" :size=30  @click="call(item)"/> -->
            </span>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="image">
          <openPhoto :imgPaths="item.imgPaths"></openPhoto>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>

		<!-- <div class="callBg" v-if="isShow" :style="{height: height + 'px'}">
      <img src="../../assets/head.svg" alt="" class="imgStyle">
      <p class="masked">请先接听来电，随后将自动拨打对方</p> <br>
      对方无法看到你的手机号，有效保护隐私
    </div> -->
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import { qrNotes, noteCall } from 'services/service'
  import openPhoto from 'components/open-photo'
  import { Toast, Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.4) + 'px',
        id: this.$route.params.id,
				height: document.documentElement.clientHeight,
				isShow: false, // 是否显示呼叫
        qrCodeArr: []
      }
    },
    methods: {
      call (val) {
        // this.isShow = true
        noteCall.bind(this)(val.id).then(res => {
          if (res.code === 200) {
            // Indicator.open('呼叫中...')
            // setTimeout(() => {
            //   Indicator.close()
            //   this.isShow = false
              this.callFlag = true
            // }, 5000)
              window.location.href = 'tel:' + res.dataBody
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
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        qrNotes.bind(vm)(vm.id).then(res => {
          if (res.code === 200) {
            vm.qrCodeArr = res.dataBody.data
          }
        })
      })
    },
    components: {
      myHead,
      openPhoto
    }
  }
</script>
<style lang="scss">
  #note-detail {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
    .body {
      width: 100%;
      border: 1px solid #fff;
      padding: 0px 15px;
      .noter {
        border-radius: 50%;
        color: #fff;
        background-color: #08629f;
        font-size: 0.32rem;
        margin-top: 18px;
        width: 50px;
        height: 50px;
        letter-spacing: 0.05rem;
        text-align: center;
        line-height: 50px;
        display: inline-block;
      }
      .noteBody {
        width: 100%;
        padding-top: 25px;
        padding-bottom: 30px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        padding-left: 15%;
        padding-right: 10%;
        background: url(../../assets/note.png) no-repeat center top;
        background-size: 100%;
        color: #757575;
        .time {
          font-size: 0.34rem;
          display: inline-block;
          border-bottom: 1px solid #999;
          width: 100%;
          padding-bottom: 15px;
        }
        .content {
          line-height: 0.5rem;
          padding-top: 10px;
        }
      }
      .mobile {
        text-align: right;
        padding-top: 8px;
      }
      .image {
        padding: 20px;
      }
      .material-icons {
        color: #4e89b5;
        -webkit-animation: noteGlow 800ms ease-out infinite alternate;
      }
			/*以下定义动画帧*/
			@-webkit-keyframes noteGlow {
				0% {
					color: #fff;
				}
				100% {
					color:#08629f;
				}
			}
    }

    .callBg {
      width: 100%;
      background-color: #1b1e27;
      color: #7e8188;
      z-index: 99;
      position: fixed;
      text-align: center;
      font-size: 0.4rem;
      top: 0px;
      left: 0px;
      .masked {
        font-size: 0.5rem;
        padding-bottom: 10px;
      }
      .imgStyle {
        background-color: #e2e3e6;
        margin-bottom: 1rem;
        margin-top: 1.5rem;
      }
      @media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm) {
          .masked{
              background-image: -webkit-linear-gradient(left, #7e8188, #fff 25%, #7e8188 50%, #fff 75%, #7e8188);
              -webkit-text-fill-color: transparent;
              -webkit-background-clip: text;
              -webkit-background-size: 200% 100%;
              -webkit-animation: note-animation 2s infinite linear;
          }
      }
      @-webkit-keyframes note-animation {
          0%  { background-position: 0 0;}
          100% { background-position: -100% 0;}
      }
    }
  }
</style>
