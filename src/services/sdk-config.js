/* eslint-disable */

function initWechatWebView (res, fun) {
	if (wx) {
		wx.config({
				// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				debug: false,
				// 必填，公众号的唯一标识
				appId: res.dataBody.AppId,
				// 必填，生成签名的时间戳
				timestamp:res.dataBody.timestamp,
				// 必填，生成签名的随机串
				nonceStr: res.dataBody.nonceStr,
				// 必填，签名，见附录1
				signature: res.dataBody.signature,
				// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareQZone',
				'scanQRCode',
				'getLocation',
				'openLocation',
				"hideMenuItems",
				'startRecord',
				'stopRecord',
				'uploadVoice',
				'onVoiceRecordEnd',
				"playVoice",
				'hideAllNonBaseMenuItem',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage'
			]
		})
		wx.ready(function(){
				fun()
		})
		wx.error(function(res){
			console.log(res)
		})
	}
}

export {
	initWechatWebView
}
