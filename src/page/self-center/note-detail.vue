<!-- 留言详情 -->
<template>
  <div id="note-detail">
    <myHead title="留言详情"></myHead>
    <div class="body" :style="{ height: bodyHeight }" v-for="item,index in qrCodeArr">
      <mu-flexbox align="flex-start">
        <mu-flexbox-item grow="2">
          <span class="noter">
            {{ item.messager }}
          </span>
        </mu-flexbox-item>
        <mu-flexbox-item grow="9">
          <div class="noteBody">
            <!-- <span class="mobile">{{ item.fromMobile }}</span> <br><br> -->
            <span class="time">
              {{ item.msgTime | date}}
               <mu-icon value="phone_forwarded" :size=30  @click="call(item)"/>
            </span>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="image">
          <openPhoto :imgPaths="item.imgPaths"></openPhoto>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
  </div>
</template>
<script>
  import myHead from 'components/my-head'
  import { qrNotes } from 'services/service'
  import openPhoto from 'components/open-photo'
  export default {
    data () {
      return {
        bodyHeight: window.screen.height * (1 - 0.35) + 'px',
        id: this.$route.params.id,
        qrCodeArr: []
      }
    },
    methods: {
      call (val) {
        window.location.href = 'tel:' + val.fromMobile
      }
    },
    filters: {
      date (input) {
        if ((input + '').slice(-7) === '3600000') {
          return new Date(input).format('yyyy年MM月dd日')
        } else {
          return new Date(input).format('yyyy年MM月dd日 hh:mm')
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        qrNotes.bind(vm)(vm.id).then(res => {
          if (res.code === 200) {
            vm.qrCodeArr = res.dataBody.data
          }
        })
      })
    },
    components: {
      myHead,
      openPhoto
    }
  }
</script>
<style lang="scss">
  #note-detail {
    position: relative;
    z-index: 20;
    color: #fff;
    padding: 8% 5%;
    .body {
      width: 100%;
      border: 1px solid #fff;
      padding: 0px 15px;
      .noter {
        border-radius: 50%;
        color: #fff;
        background-color: #08629f;
        font-size: 0.32rem;
        margin-top: 18px;
        width: 50px;
        height: 50px;
        letter-spacing: 0.05rem;
        text-align: center;
        line-height: 50px;
        display: inline-block;
      }
      .noteBody {
        width: 100%;
        padding-top: 65px;
        padding-bottom: 30px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        padding-left: 15%;
        padding-right: 10%;
        background: url(../../assets/note.png) no-repeat center top 40px;
        background-size: 100%;
        color: #757575;
        .mobile {
          font-size: 0.34rem;
        }
        .time {
          font-size: 0.34rem;
          display: inline-block;
          border-bottom: 1px solid #999;
          width: 100%;
          padding-bottom: 15px;
        }
        .content {
          line-height: 0.5rem;
          padding-top: 10px;
        }
      }
      .image {
        padding: 20px;
      }
      .material-icons {
        color: #b1a0ce;
      }
    }
  }
</style>
