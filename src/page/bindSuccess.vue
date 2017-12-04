<template>
  <div id="bindSuccess">
    <div class="top">
      <img src="../assets/success.png" alt="" width="90%">
      <span class="goIndex" @click="goIndex">返回主页>></span>
    </div>
    <div class="service" @click="goShop">
      <img src="../assets/service.png" alt="" width="90%">
    </div>
  </div>
</template>
<script>
  import picture from 'assets/WechatIMG5.jpeg'
  export default {
    data () {
      return {
        picture
      }
    },
    methods: {
      goIndex () {
        this.$router.push({
          name: 'index'
        })
      },
      goShop () {
        window.location.href = 'https://h5.youzan.com/v2/showcase/homepage?alias=bt4oehte'
      }
    }
  }

</script>
<style lang="scss">
  #bindSuccess {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
    .top {
      width: 100%;
      margin: auto;
      text-align: center;
      position: relative;
      .goIndex {
        position: absolute;
        bottom: 24px;
        right: 35px;
        transform: scale(0.9);
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
