<template>
  <div id="service">
    <div class="service">
      <img src="../assets/service.png" alt="" width="100%" @click="goShop" height="80%">
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
        window.location.href = 'https://h5.youzan.com/v2/showcase/homepage?alias=bt4oehte'
      }
    }
  }
</script>
<style lang="scss">
  #service {
    .service {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
