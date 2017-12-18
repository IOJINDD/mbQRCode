<template>
  <div id="my-head">
    <!-- <mu-icon :value="leftIcon"
             @click="goBack"
             color="#fff"
             :size=28 />
    <span class="title">
      {{ title }}
    </span> -->
    <mu-flexbox :gutter=8>
      <mu-flexbox-item class="text-left">
        <mu-icon :value="leftIcon"
        @click="goBack"
        color="#fff"
        :size=28 />
      </mu-flexbox-item>
      <mu-flexbox-item class="title">
          {{ title }}
      </mu-flexbox-item>
      <mu-flexbox-item class="text-right">
        <mu-icon :value="rightIcon"
        @click="goCenter"
        color="#fff"
        :size=28 />
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      // 跳转个人中心
      goCenter () {
        console.log('111')
        this.$router.push({
          name: 'index'
        })
      }
    },
    props: {
      title: {
        type: String
      },
      leftIcon: {
        type: String,
        default () {
          return 'chevron_left'
        }
      },
      rightIcon: {
        type: String
      }
    }
  }
</script>
<style lang="scss">
  #my-head {
    background: url(../assets/button.png) repeat center top;
    background-size: 100%;
    padding: 8px 20px;
    position: relative;
    .title {
      width: 75%;
      text-align: center;
      font-size: 0.5rem;
      color: #fff;
    }
    .material-icons {
      z-index: 999;
    }
  }
</style>
