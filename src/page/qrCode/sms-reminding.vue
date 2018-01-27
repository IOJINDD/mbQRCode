<!-- 短信通知界面 -->
<template>
  <div id="sms-reminding">
    <div>
      <div class="sms_top">
        <mu-flexbox align="flex-start">
          <mu-flexbox-item grow="2">
            <img :src="info" alt="" width="70%">
          </mu-flexbox-item>
          <mu-flexbox-item class="title" grow="10" >
            车辆信息
          </mu-flexbox-item>
        </mu-flexbox>
        <div class="content">
          <mu-flexbox style="margin-bottom: 20px">
            <mu-flexbox-item grow="1" class="number" @click.native="selectOne">
              <span>{{ firstName }}</span>
            </mu-flexbox-item>
            <mu-flexbox-item grow="11" class="lastName"  @click.native="keyboardPop = true">
              <label for="" class="subTitle">车牌号</label> <br>
              <span class="carNo">{{ lastName }}</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-select-field v-model="params.carNoColor" label="车牌颜色">
            <mu-menu-item value="蓝色车牌（蓝底白字）" title="蓝色车牌（蓝底白字）"/>
            <mu-menu-item value="黄色车牌（黄底黑字）" title="黄色车牌（黄底黑字）"/>
            <mu-menu-item value="其他车牌（军车、校车等）" title="其他车牌（军车、校车等）"/>
          </mu-select-field>
        </div>
      </div>
      <div class="sms_bottom">
        <div class="content">
          <mu-text-field label="手机号" type="tel" hintText="请输入手机号码" v-model="params.mobile" @blur="mobileBlur"/><br/>
          <mu-text-field label="验证码" type="tel" hintText="点击获取验证码" v-model="params.code"/><br/>
        </div>
      </div>
      <div class="sms_button" @click="sendMessage">
        短信提醒挪车
      </div>
      <mu-popup position="bottom" popupClass="sms-popup-bottom" :open="bottomPop" @close="close()" overlayColor="#fff" :overlayOpacity=0>
        <label v-for="item,index in names" class="box" @click="selectFirst(item)">
          {{ item }}
        </label>
      </mu-popup>
      <mu-popup position="bottom" popupClass="sms-popup-bottom" :open="keyboardPop" @close="keyboardPop = false" overlayColor="#fff" :overlayOpacity=0>
        <div class="numberBody">
          <label v-for="item,index in numbers" class="numberBox" @click="selectNumber(item)">
            {{ item }}
          </label>
        </div>
        <div class="letterBody">
          <label v-for="item,index in Letters" class="letterBox" @click="selectLetter(item)">
            {{ item }}
          </label>
        </div>
      </mu-popup>
    </div>
  </div>
</template>
<script>
  import info from 'assets/info.png'
  import { Toast } from 'mint-ui'
  import { checkData } from 'tools/index'
  import { sendLoginVerifyCode, smsReminding } from 'services/service'
  let time = 30
  export default {
    data () {
      return {
        info,
        names: ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂',
        '港', '澳', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫',
        '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '粤', '琼', '甘', '陕', '贵', '云', '川', '使', '领', '警', '学'],
        Letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '删除'],
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        firstName: '浙',
        lastName: '', // 车牌后6位
        isInvalid: true, // 是否可以发验证码
        isLogin: false,
        params: {
          qrKey: this.$route.params.qrKey, // 二维码
          carNo: '', // 车牌号
          carNoColor: '蓝色车牌（蓝底白字）', // 车牌号颜色
          code: '', // 验证码
          codeFlag: 0, // 判别是否需要验证码0，需要 1 不需要
          mobile: '', // 手机号
        },
        bottomPop: false,// 弹出框
        isNumber: false, // 软键盘初始显示
        keyboardPop: false // 自制软键盘
      }
    },
    methods: {

      // 选择车牌首位
      selectOne () {
        this.bottomPop = true
      },

      // 关闭弹出框
      close () {
        this.bottomPop = false
      },

      // 选择第一个名字
      selectFirst (val) {
        this.firstName = val
        this.bottomPop = false

        // 自制软键盘弹出
        this.keyboardPop = true
      },

      // 选择软键盘内容
      selectNumber (val) {
        if (val === '删除') {
          this.lastName = this.lastName.substring(0, this.lastName.length - 1)
        } else {
          this.lastName = this.lastName + val
        }
      },

      // 选择字母
      selectLetter (val) {
        if (val === '删除') {
          this.lastName = this.lastName.substring(0, this.lastName.length - 1)
        } else {
          this.lastName = this.lastName + val
        }
      },

      // 手机输入完毕
      mobileBlur () {
        if (this.isInvalid) {
          if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.params.mobile))) {
            Toast('手机号码格式有误')
          } else {

            // 获取验证码
            sendLoginVerifyCode.bind(this)(this.params.mobile).then(res => {
              if (res.code == 200) {
                let countDown = setInterval(() => {
                  time--
                  console.log(time)
                  if (time === 0) {
                    clearInterval(countDown)
                    this.isInvalid = true
                    time = 30
                  }
                }, 1000)
                Toast('验证码已发送,请注意查看')
                document.querySelectorAll('input')[3].focus()
                this.isInvalid = false
              } else {
                Toast(res.msg)
              }
            })
          }
        }
      },

      // 短信提醒
      sendMessage () {
        checkData([this.lastName, this.params.mobile, this.params.code], ['车牌号不能为空', '手机号不能为空', '验证码不能为空'], () => {
          if (this.lastName.length > 5) {
            this.params.carNo = this.firstName + this.lastName
            console.log(this.params)
            smsReminding.bind(this)(this.params).then(res => {
              if (res.code == 200) {
                Toast('提醒挪车成功！')
                this.$router.go(-1)
              } else {
                Toast(res.msg)
              }
            })
          } else {
            Toast('车牌号输入有误！')
          }
        })
      }
    },
    mounted () {
      // 判断是否登录
      // if (window.localStorage.getItem('userObj')) {
      //   this.isLogin = true
      //   this.params.codeFlag = 1
      //   console.log(JSON.parse(window.localStorage.getItem('userObj')))
      //   this.params.mobile = JSON.parse(window.localStorage.getItem('userObj')).mobile
      // } else {
      //   this.isLogin = false
      // }
    }
  }
</script>
<style lang="scss">
  #sms-reminding {
    position: absolute;
    width: 100%;
    z-index: 20;
    color: #fff;
    padding: 0.5rem 5%;
    .mu-text-field-label {
      font-size: 0.55rem;
      font-weight: 100;
    }
    .mu-text-field-line{
      background-color: #a0a0a0;
    }
    .mu-text-field, .mu-dropDown-menu-text {
      color: #fff;
      width: 100%;
      font-weight: 100;
    }
    .mu-text-field-input {
      color: #fff;
      font-size: 0.4rem;
      font-weight: 100;
    }
    .mu-text-field-hint {
      color: #4a4a4a;
    }
    .sms_top {
      border: 2px solid #fff;
      background: rgba(255, 255, 255, 0.18);
      padding: 0.5rem 15px;
      padding-bottom: 10px;
      padding-bottom: 0px;
      .title {
        font-size: 0.6rem;
      }
      .content {
        .number {
          font-size: 0.6rem;
          text-align: center;
          padding-top: 23px;
        }
        .lastName {
          border-bottom: 1px solid #a0a0a0;
          .subTitle {
            margin: 10px 0px;
            display: inline-block;
            font-size: 0.36rem;
            color: #ddd;
          }
          .carNo {
            display: inline-block;
            font-size: 0.5rem;
            margin-bottom: 8px;
            min-height: 18px;
            letter-spacing: 0.1em;
          }
        }
      }
    }
    .sms_bottom {
      padding: 0 15px;
      .mu-text-field {
        margin-bottom: 0px;
      }
    }
    .sms_button {
      width: 100%;
      padding: 0.4rem;
      z-index: 30;
      text-align: center;
      font-size: 0.5rem;
      letter-spacing: 0.5em;
      font-weight: 100;
      border-radius: 10px;
      background: url('../../assets/button.png');
      background-size: 100%;
    }
  }
  .sms-popup-bottom {
    width: 100%;
    background-color: #ccc;
    padding-bottom: 12px;
    /* text-align: center; */
    .box {
      background-color: #fff;
      display: inline-block;
      border-radius: 2px;
      width: 9%;
      color: #000;
      padding: 9px 0px;
      margin-top: 12px;
      margin-left: 3%;
      text-align: center;
      font-size: 0.4rem;
    }
    .numberBody {
      margin: 0px 0px;
      text-align: center;
    }
    .numberBox {
      background-color: #fff;
      display: inline-block;
      border-radius: 2px;
      width: 7.5%;
      color: #000;
      padding: 15px 0px;
      margin: 0px 4px;
      margin-top: 12px;
      text-align: center;
      font-size: 0.5rem;
    }
    .letterBody {
      margin: 0px 0px;
      text-align: center;
    }
    .letterBox {
      background-color: #fff;
      display: inline-block;
      border-radius: 2px;
      color: #000;
      padding: 15px 2.5%;
      margin: 0px 1.2%;
      margin-top: 12px;
      text-align: center;
      font-size: 0.44rem;
    }
    .letterBox:nth-child(25) {
      background-color: #9e9e9e;
      color: rgba(0,0,0,.87);
      padding: 15px 7%;
    }
  }
</style>
