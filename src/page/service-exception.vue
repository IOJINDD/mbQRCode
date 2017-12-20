<template>
  <div id="service_exception">
    <div class="title">
      页面走丢了，宝宝正在努力找回！<br>
      <span class="phone">客服电话：<a href="tel:400-110-2123">400-110-2123</a></span>
    </div>
    <div class="imgBody">
      <img src="../assets/cry.gif" alt="">
    </div>
  </div>
</template>
<style lang="scss">
  #service_exception {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
    .imgBody {
      width: 100%;
      text-align: center;
    }
    .title {
      text-align: center;
      font-size: 0.5rem;
      line-height: 1rem;
      padding: 20% 0%;
      margin-top: 20%;
      color: #607d8b;
    }
    .phone {
      font-size: 0.43rem;
      color: #65a0bb;
    }
    a {
      color: #65a0bb;
    }
  }
</style>
