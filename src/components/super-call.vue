<template>
  <div id="super-call">
    <span class="btn" @click="doubleCall">
			一键呼叫
		</span>
		<!-- <span class="middle">

		</span>
    <span class="btn" @click="immediateCall">
			立即呼叫
		</span> -->
		<!-- <div class="callBg" v-if="isShow" :style="{height: height + 'px'}">
			<img src="../assets/head.svg" alt="" class="imgStyle">
			<p class="masked">请先接听来电，随后将自动拨打对方</p> <br>
			对方无法看到你的手机号，有效保护隐私
		</div> -->
  </div>
</template>
<script>
  import { callRecord, doubleCall, login } from 'services/service'
	import { checkData } from 'tools/index'
	import { MessageBox, Toast, Indicator } from 'mint-ui'

	// 匿名呼叫
	function anonymousCall (vue, codeFlag) {

		// 判断是否登录
		if (codeFlag === 1) { // 已登录
			let mobile = JSON.parse(window.localStorage.getItem('userObj')).mobilePhone
			// vue.isShow = true
			doubleCall.bind(vue)(vue.code, mobile, vue.qrKey, codeFlag).then(res => {
				if (res.code === 200) {
					// Indicator.open('呼叫中...')
					// setTimeout(() => {
					// 	Indicator.close()
					// 	vue.isShow = false
						vue.callFlag = true
					// }, 5000)
					window.location.href = 'tel:' + res.dataBody
				} else {
					// vue.isShow = false
					Toast(res.msg)
				}
			})
		} else { // 未登录
			vue.callFlag = true
			checkData([vue.mobile, vue.code], ['请您填写手机号', '请您填写验证码'], () => {
				// 登录
				login.bind(vue)({
					mobile: vue.mobile,
					code: vue.code,
					type: 'mobile'
				}).then(res => {
					if (res.code === 200) {
						window.localStorage.setItem('userObj', JSON.stringify(res.dataBody))
						doubleCall.bind(vue)(vue.code, vue.mobile, vue.qrKey, '1').then(res => {
							if (res.code === 200) {
								window.location.href = 'tel:' + res.dataBody
							} else {
								Toast(res.msg)
							}
						})
					} else {
						Toast(res.msg)
					}
				})
			})
		}
	}

  export default {
    data () {
			return {
				qrKey: this.$route.params.qrKey,
				height: document.documentElement.clientHeight,
				isShow: false, // 是否显示呼叫
				callFlag: true // 限制多次呼叫
			}
		},
		props: {
			mobile: {
				type: String
			},
			code: {
				type: String
			},
			isLogin: {
				type: Boolean
			}
		},
		methods: {

      // 立即打电话
      immediateCall () {
				// 被呼叫者的手机号
				let mobile = JSON.parse(window.localStorage.getItem('codeData')).mobile

				console.log(this.isLogin)

        // 判断是否登录,如果登录，就不需要验证码
        if (this.isLogin) {
					let fromMobile = JSON.parse(window.localStorage.getItem('userObj')).mobilePhone

          callRecord.bind(this)({
            codeFlag: 1,
            fromMobile: fromMobile,
            qrKey: this.qrKey,
            toMobile: mobile
          }).then(res => {
            if (res.code === 200) {
              window.location.href = 'tel:' + mobile
            } else {
              Toast(res.msg)
            }
          })
        } else {
          checkData([this.mobile, this.code], ['请您填写手机号', '请您填写验证码'], () => {
            callRecord.bind(this)({
              code: this.code,
              codeFlag: 0,
              fromMobile: this.mobile,
              qrKey: this.qrKey,
              toMobile: mobile
            }).then(res => {
              if (res.code === 200) {

								// 登录
								login.bind(this)({
									mobile: this.mobile,
									code: this.code,
									type: 'mobile'
								}).then(res => {
									if (res.code === 200) {
										window.location.href = 'tel:' + mobile
										window.localStorage.setItem('userObj', JSON.stringify(res.dataBody))
									}
								})

              } else {
                Toast(res.msg)
              }
            })
          })
        }
			},

      // 匿名呼叫
      doubleCall () {

				// 限制多次呼叫
				if (this.callFlag) {
					this.callFlag = false
					if (this.isLogin) {
						anonymousCall(this, 1)
					} else {
						anonymousCall(this, 0)
					}
				}
      }
		}
  }

</script>
<style lang="scss">
    #super-call {
			text-align: center;
			/*这里是重点*/
			.middle {
				display: inline-block;
				width: 50px;
			}
			.btn {
				width: 100px;
				height: 100px;
				margin-left: 30px;
				display: inline-block;
				border-radius: 50%;
				text-align: center;
				line-height: 100px;
				margin: auto;
				-webkit-animation: glow 800ms ease-out infinite alternate;
				-moz-animation: glow 800ms ease-out infinite alternate;
				-o-animation: glow 800ms ease-out infinite alternate;
				-ms-animation: glow 800ms ease-out infinite alternate;

				/*这里使用了呼吸动画*/
				animation: glow 600ms ease-out infinite alternate;
				background: #132f55;
				background: -webkit-linear-gradient(#64bbff, #132f55);
				background: -moz-linear-gradient(#64bbff, #132f55);
				background: -o-linear-gradient(#64bbff, #132f55);
				background: -ms-linear-gradient(#64bbff, #132f55);
				background: linear-gradient(#64bbff, #132f55);
				border-color: #fff;
				box-shadow: 0 0 20px rgba(0, 255, 0, .2), inset 0 0 20px rgba(0, 255, 0, .1), 0 10px 0 #000;
				color: #efe;
				font-size: 0.4rem;
				outline: none;
			}

			/*以下定义动画帧*/
			@-webkit-keyframes glow {
				0% {
					border-color: #132f56;
					box-shadow: 0 0 5px 5px rgba(100, 187, 255, .2), inset 0 0 5px 5px rgba(100, 187, 255, .1), 0 0px 0 #000;
				}
				100% {
					border-color: #0a224a;
					box-shadow: 0 0 25px 18px rgba(100, 187, 255, .6), inset 0 0 25px 18px rgba(100, 187, 255, .4), 0 0px 0 #000;
				}
			}

			@keyframes glow {
				0% {
					border-color: #132f56;
					box-shadow: 0 0 5px 5px rgba(100, 187, 255, .2), inset 0 0 5px 5px rgba(100, 187, 255, .1), 0 0px 0 #000;
				}
				100% {
					border-color: #0a224a;
					box-shadow: 0 0 25px 18px rgba(100, 187, 255, .6), inset 0 0 25px 18px rgba(100, 187, 255, .4), 0 0px 0 #000;
				}
			}
			.callBg {
				width: 100%;
				background-color: #1b1e27;
				color: #7e8188;
				z-index: 99;
				position: fixed;
				font-size: 0.4rem;
				top: 0px;
				left: 0px;
				.masked {
					font-size: 0.5rem;
					padding-bottom: 10px;
				}
				.imgStyle {
					background-color: #e2e3e6;
					margin-bottom: 1rem;
					margin-top: 1.5rem;
				}
				@media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm) {
						.masked{
								background-image: -webkit-linear-gradient(left, #7e8188, #fff 25%, #7e8188 50%, #fff 75%, #7e8188);
								-webkit-text-fill-color: transparent;
								-webkit-background-clip: text;
								-webkit-background-size: 200% 100%;
								-webkit-animation: masked-animation 2s infinite linear;
						}
				}
				@-webkit-keyframes masked-animation {
						0%  { background-position: 0 0;}
						100% { background-position: -100% 0;}
				}
			}
		}

</style>
