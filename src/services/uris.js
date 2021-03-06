const uris = {
  sendLoginVerifyCode: '/api/common/sms-code', // 获取验证码
  bindQRcode: '/api/qr/qrcode-bind', // 绑定二维码
  doubleCall: '/api/qr/call', // 双向回呼
  noteCall: '/api/qr/note-call', // 留言-双向回呼
  MultipartFile: '/api/common', // -基础- 上传图片
  publishNote: '/api/qr/note', // 发布留言信息
  userDetail: '/api/qr/user/detail', // 用户详情
  scanRecord: '/api/qr/scanRecord', // 保存二维码扫码情况
  callRecord: '/api/qr/call-record', // 添加二维码拨打记录
  getCallNum: '/api/qr/note-call/num', // 获取留言数量
  smsReminding: '/api/qr/sms-reminding', // 短信提醒
  login: '/api/qr/login', // 登录
  saveInfo: '/api/qr/user', // 保存
  qrNotes: '/api/qr/notes', // 查看留言
  checkQRcode: '/api/qr/verification' // 检测用户
}

export default uris
