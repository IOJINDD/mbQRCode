<template>
  <div id="super-call">
    <span class="btn" @click="doubleCall">
			匿名呼叫
		</span>
		<span class="middle">

		</span>
    <span class="btn" @click="immediateCall">
			立即呼叫
		</span>
  </div>
</template>
<script>
  import { callRecord, doubleCall, login } from 'services/service'
	import { checkData } from 'tools/index'
	import { MessageBox, Toast, Indicator } from 'mint-ui'

	// 匿名呼叫
	function anonymousCall (vue, codeFlag) {

		// 判断是否登录
		if (codeFlag === '1') { // 已登录
			let mobile = JSON.parse(window.localStorage.getItem('userObj')).mobilePhone
			doubleCall.bind(vue)(vue.code, mobile, vue.qrKey, codeFlag).then(res => {
				if (res.code === 200) {
					Indicator.open('呼叫中...')
					setTimeout(() => {
						Indicator.close()
						vue.callFlag = true
					}, 5000)
				} else {
					Toast(res.msg)
				}
			})
		} else { // 未登录
			vue.callFlag = true
			checkData([vue.mobile, vue.code], ['请您填写手机号', '请您填写验证码'], () => {
				doubleCall.bind(vue)(vue.code, vue.mobile, vue.qrKey, codeFlag).then(res => {
					if (res.code === 200) {
						Indicator.open('呼叫中...')
						setTimeout(() => {
							Indicator.close()
							vue.callFlag = true
						}, 5000)
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
				callFlag: true
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

					console.log(window.localStorage.getItem('noRemind'))
					if (window.localStorage.getItem('noRemind') !== 'true') {
						console.log('11')
						// 判断是否登录,如果登录，就不需要验证码
						if (this.isLogin) {
							anonymousCall(this, '1')
						} else {
							anonymousCall(this, '0')
						}
					} else {
						MessageBox({
							title: '温馨提示',
							message: '稍后您将收到一个呼叫，确认后才能进行匿名呼叫哦！',
							showCancelButton: true,
							cancelButtonText: '确定',
							confirmButtonText: '不再提示'
						}).then(res => {
							if (res === 'confirm') {
								window.localStorage.setItem('noRemind', true)
							}

							// 判断是否登录,如果登录，就不需要验证码
							if (this.isLogin) {
								anonymousCall(this, '1')
							} else {
								anonymousCall(this, '0')
							}
						})
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
					box-shadow: 0 0 5px 5px rgba(100, 187, 255, .2), inset 0 0 5px 5px rgba(100, 187, 255, .1), 0 2px 0 #000;
				}
				100% {
					border-color: #0a224a;
					box-shadow: 0 0 15px 15px rgba(100, 187, 255, .6), inset 0 0 15px 15px rgba(100, 187, 255, .4), 0 15px 0 #000;
				}
			}

			@keyframes glow {
				0% {
					border-color: #132f56;
					box-shadow: 0 0 5px 5px rgba(100, 187, 255, .2), inset 0 0 5px 5px rgba(100, 187, 255, .1), 0 2px 0 #000;
				}
				100% {
					border-color: #0a224a;
					box-shadow: 0 0 15px 15px rgba(100, 187, 255, .6), inset 0 0 15px 15px rgba(100, 187, 255, .4), 0 15px 0 #000;
				}
			}
		}

</style>
