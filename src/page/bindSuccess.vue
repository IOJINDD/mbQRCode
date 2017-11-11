<template>
  <div id="pay">
    <div class="ul_style">
      <ul>
        <li>
          <p class="logo"><img src="../assets/chosed.svg" alt=""></p>
        </li>
        <li>绑定成功</li>
        <li class="li4">您可以去个人主页进行信息的修改</li>
        <li><div @click="goback" class="goOn com_btn_style">返回主页</div></li>
      </ul>
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
      goback () {
        this.$router.go(-1)
      }
    }
  }

</script>
<style>
  .ul_style ul li {
    text-align: center;
  }

  .ul_style ul li:nth-child(1) {
    padding-top: 30px;
  }

  .ul_style ul li:nth-child(2) {
    font-size: 0.5rem;
    padding-top: 20px;
  }

  .ul_style ul .li4 {
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
    background-color: #009a61;
    padding-top: 6px;
  }

  .goOn {
    border-radius: 4px;
    background-color: #009a61;
    font-size: 0.4rem;
    color: #fff;
    padding: 12px;
  }

</style>
