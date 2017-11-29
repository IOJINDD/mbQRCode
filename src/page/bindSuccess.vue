<template>
  <div id="pay">
    <div class="ul_style">
      <ul>
        <li>
          <p class="logo"><img src="../assets/chosed.svg" alt=""></p>
        </li>
        <li>激活成功</li>
        <li class="li4">您可以去个人主页进行信息的修改</li>
        <li><div @click="goback" class="goOn com_btn_style">返回主页</div></li>
      </ul>
      <div style="height: 50px">

      </div>
      <mu-sub-header>更多服务</mu-sub-header>
      <img :src="picture" alt="" width="100%" @click="goShop">
      <!-- <div class="goBuy">
        <mu-flat-button label="点我前去购买"
          labelPosition="before"
          color="#fff"
          backgroundColor="#35c590"
          icon="shopping_cart"
          href="https://h5.youzan.com/v2/goods/2ohq9liczaepa"/>
      </div> -->
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
      goback () {
        console.log('111')
        this.$router.push({
          name: 'selfCenter'
        })
      },
      goShop () {
        window.location.href = 'https://h5.youzan.com/v2/showcase/homepage?kdt_id=19067838&reft=1511268232826&spm=g351337578'
      }
    }
  }

</script>
<style lang="scss">
  .ul_style {
    .goBuy {
      margin: 20px;
      float: right;
    }
    .material-icons {
      color: #fff;
    }
    ul li {
      text-align: center;
    }
    ul li:nth-child(1) {
      padding-top: 30px;
    }
    ul li:nth-child(2) {
      font-size: 0.5rem;
      padding-top: 20px;
    }
    ul .li4 {
      font-size: 0.38rem;
      padding-top: 20px;
      text-align: left;
      margin-left: 20%
    }
    .logo {
      width: 50px;
      height: 50px;
      display: inline-block;
      border-radius: 50%;
      background-color: rgb(53, 197, 144);
      padding-top: 6px;
    }
    .goOn {
      border-radius: 4px;
      background-color: rgb(53, 197, 144);
      font-size: 0.4rem;
      color: #fff;
      padding: 12px;
    }
  }

</style>
