<template>
  <div id="bindSuccess">
    <div class="top">
      <img src="../assets/success.png" alt="" width="90%">
      <img src="../assets/successTitle.png" alt="" class="successTitle" width="20%">
      <span class="successWenzi">激活成功</span>
      <span class="remind">1.通话由虚拟号码转接，保护个人隐私<br>2.关注公众号<span style="color:#ff9800">招领台</span>可管理个人二维码 </span>
      <span class="watch" @click="watch" v-if="ISWX">关注公众号</span>
      <span class="shu" v-if="ISWX"> | </span>
      <span class="goIndex" @click="goIndex">个人中心>></span>
    </div>
    <service>

    </service>
  </div>
</template>
<script>
  import picture from 'assets/WechatIMG5.jpeg'
  import service from 'components/service'
  export default {
    data () {
      return {
        picture,
        ISWX: false
      }
    },
    methods: {
      goIndex () {
        this.$router.push({
          name: 'index'
        })
      },
      // 关注公众号
      watch () {
        window.location = 'http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1MDcwNTUwNg==#wechat_redirect'
      },
      goShop () {
        window.location.href = 'https://h5.youzan.com/v2/showcase/homepage?alias=bt4oehte'
      }
    },
    components: {
      service
    },
    mounted () {
      setTimeout(() => {
        this.ISWX = global.ISWX
      }, 10)
    }
  }

</script>
<style lang="scss">
  #bindSuccess {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 0.5rem 5%;
    .top {
      width: 100%;
      margin: auto;
      text-align: center;
      position: relative;
      .successTitle {
        position: absolute;
        left: 50%;
        top: 1.3rem;
        transform: translate(-50%, 0);
      }
      .successWenzi {
        position: absolute;
        left: 50%;
        top: 3.5rem;
        color: #e0e0e0;
        font-size: 0.4rem;
        transform: translate(-50%, 0);
      }
      .remind {
        position: absolute;
        color: #d9d9d9;
        font-weight: 100;
        left: 50%;
        font-size: 0.36rem;
        width: 300px;
        left: 20px;
        bottom: 1.6rem;
        line-height: 0.6rem;
        /* -webkit-transform: translate(-50%, 0); */
        /* transform: translate(-50%, 0); */
      }
      .goIndex {
        position: absolute;
        bottom: 30px;
        right: 40px;
        color: #bdc5d2;
        transform: scale(1);
      }
      .watch {
        position: absolute;
        bottom: 30px;
        color: #ffff00cc;
        transform: scale(1.2);
        left: 40px;
        text-align: center;
        /* 背景颜色线性渐变 */
            /* 老式写法 */
            /* linear为线性渐变，也可以用下面的那种写法。left top，right top指的是渐变方向，左上到右上 */
            /* color-stop函数，第一个表示渐变的位置，0为起点，0.5为中点，1为结束点；第二个表示该点的颜色。所以本次渐变为两边灰色，中间渐白色 */
        background: -webkit-gradient(linear, left top, right top, color-stop(0, #ff9800), color-stop(.4, #ff9800), color-stop(.5, white), color-stop(.6, #ff9800), color-stop(1, #ff9800));
            /* 新式写法 */
        /* background: -webkit-linear-gradient(left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d)); */

          /* 设置为text，意思是把文本内容之外的背景给裁剪掉 */
        -webkit-background-clip: text;
        /* 设置对象中的文字填充颜色 这里设置为透明 */
        -webkit-text-fill-color: transparent;
        /* 每隔2秒调用下面的CSS3动画 infinite属性为循环执行animate */
        -webkit-animation: animate 1.5s infinite;
        animation-timing-function: linear;
        /* 兼容写法，要放在@keyframes前面 */
        @-webkit-keyframes animate {
            /* 背景从-100px的水平位置，移动到+100px的水平位置。如果要移动Y轴的，设置第二个数值 */
            from {background-position: 40px;}
            to {background-position: 100px;}
        }
        @keyframes animate {
            from {background-position: 40px;}
            to {background-position: 100px;}
        }
      }
    }
    .service {
      width: 100%;
      text-align: center;
      margin: auto;
      margin-top: 20px;
    }
  }
</style>
