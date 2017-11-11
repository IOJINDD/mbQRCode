const uris = {
  sendLoginVerifyCode: '/api/common/sms-code', // 获取验证码
  bindQRcode: '/api/qr/qrcode-bind', // 绑定二维码
  doubleCall: '/api/qr/qr-double-call', // 双向回呼
  MultipartFile: '/api/common', // -基础- 上传图片
  publishNote: '/api/qr/note', // 发布留言信息
  login: '/api/qr/login', // 登录
  qrNotes: '/api/qr/notes', // 查看留言
  checkQRcode: '/api/qr/verification' // 检测用户
}

export default uris
