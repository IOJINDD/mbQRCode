<!-- 留言物主 -->
<template>
  <div id="leaving-message">
    <myHead title="给物主留言"></myHead>
    <div class="body">
      <writeNote :userId="userId"
                 :qrCode="qrCode" >

      </writeNote>
    </div>
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import writeNote from './children/write-note.vue'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.35) + 'px',
        qrCode: this.$route.params.qrKey,
        userId: 0, // user id
        qrCodeArr: []
      }
    },
    methods: {

    },
    mounted () {
      console.log(JSON.parse(window.localStorage.getItem('codeData')))
      this.userId = JSON.parse(window.localStorage.getItem('codeData')).userId
    },
    components: {
      myHead,
      writeNote
    }
  }
</script>
<style lang="scss">
  #leaving-message {
    position: relative;
    z-index: 20;
    padding: 8% 5%;
    .body {
      background-color: #fff;
      .mint-cell-text {
        color: #757575;
        font-size: 0.34rem;
      }
      .mint-field-core {
        text-align: right;
        padding-right: 10px;
        font-size: 0.34rem;
      }
      .mint-cell-value {
        textarea {
          text-align: left;
        }
      }
      .btn-top {
        margin: 50px;
        margin-top: 20px;
        padding-bottom: 40px;
        text-align: center;
      }
    }
  }
</style>
