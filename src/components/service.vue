<template>
  <div id="service">
    <span class="codeExplain">e码</span>
    <i class="codeExplain2">——让物品说话的二维码</i>
    <span class="more" @click="goShop"> 查看更多>> </span>
    <span class="cooperation"> 合作咨询热线：<span @click="call">400-110-2123</span></span>
    <div class="service">
      <img src="../assets/service.png" alt="" width="100%" height="5%">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      // 跳转商城
      goShop () {
        window.location.href = 'https://h5.youzan.com/v2/tag/f0r9h1z2'
      },

      call () {
        window.location.href = 'tel:400-110-2123'
      }
    }
  }
</script>
<style lang="scss">
  #service {
    position: relative;
    z-index: 9;
    .service {
      margin-top: 20px;
      width: 100%;
    }
    .cooperation {
      position: absolute;
      bottom: 8px;
      padding: 8px 12px;
      color: #999;
      font-size: 0.36rem;
    }
    .codeExplain {
      position: absolute;
      background-color: #4c9aaa;
      padding: 6px 8px;
      border-radius: 60px;
      font-size: 0.35rem;
      top: 15px;
      letter-spacing: 4px;
      left: 10px;
    }
    .codeExplain2 {
      position: absolute;
      padding: 8px 12px;
      border-radius: 60px;
      font-size: 0.32rem;
      top: 13px;
      left: 48px;
      font-weight: 900;
      color: #4d4d4d;
    }
    .more {
      position: absolute;
      padding: 8px 12px;
      border-radius: 60px;
      font-size: 0.35rem;
      bottom: 8px;
      right: 0px;
      color: #9e9e9e;

       /* 背景颜色线性渐变 */
        /* 老式写法 */
        /* linear为线性渐变，也可以用下面的那种写法。left top，right top指的是渐变方向，左上到右上 */
        /* color-stop函数，第一个表示渐变的位置，0为起点，0.5为中点，1为结束点；第二个表示该点的颜色。所以本次渐变为两边灰色，中间渐白色 */
        background: -webkit-gradient(linear, left top, right top, color-stop(0, #cc9595), color-stop(.4, #cc9595), color-stop(.5, white), color-stop(.6, #cc9595), color-stop(1, #cc9595));
            /* 新式写法 */
        /* background: -webkit-linear-gradient(left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d)); */

          /* 设置为text，意思是把文本内容之外的背景给裁剪掉 */
        -webkit-background-clip: text;
        /* 设置对象中的文字填充颜色 这里设置为透明 */
        -webkit-text-fill-color: transparent;
        /* 每隔2秒调用下面的CSS3动画 infinite属性为循环执行animate */
        -webkit-animation: animate 1s infinite;
        animation-timing-function: linear;
        /* 兼容写法，要放在@keyframes前面 */
        @-webkit-keyframes animate {
            /* 背景从-100px的水平位置，移动到+100px的水平位置。如果要移动Y轴的，设置第二个数值 */
            from {background-position: -50px;}
            to {background-position: 50px;}
        }
        @keyframes animate {
            from {background-position: -50px;}
            to {background-position: 50px;}
        }
    }
  }
</style>
