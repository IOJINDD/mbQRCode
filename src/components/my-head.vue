<template>
  <div id="my-head">
    <mu-icon :value="icon"
             @click="goBack"
             color="#fff"
             :size=28 />
    <span class="title">
      {{ title }}
    </span>
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
      }
    },
    props: {
      title: {
        type: String
      },
      icon: {
        type: String,
        default () {
          return 'chevron_left'
        }
      }
    }
  }
</script>
<style lang="scss">
  #my-head {
    background: url(../assets/button.png) repeat center top;
    background-size: 100%;
    padding: 15px;
    position: relative;
    .title {
      display: inline-block;
      width: 78%;
      text-align: center;
      position: absolute;
      font-size: 0.43rem;
      top: 22px;
    }
  }
</style>
