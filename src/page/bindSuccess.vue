<template>
  <div id="bindSuccess">
    <div class="top">
      <img src="../assets/success.png" alt="" width="100%">
      <span class="goIndex" @click="goIndex">返回主页>></span>
    </div>
    <div class="service" @click="goShop">
      <img src="../assets/service.png" alt="" width="100%">
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
      position: relative;
      .goIndex {
        position: absolute;
        bottom: 24px;
        right: 19px;
      }
    }
    .service {
      width: 100%;
      margin: auto;
      margin-top: 20px;
    }
  }
</style>
