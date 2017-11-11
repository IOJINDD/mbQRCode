import urls from './uris.js'

/**
 * @param {string} params - 解析的数据
 */
function _DataToFormdata (params) {
  let formData = new FormData()
  for (let name in params) {
    formData.append(name, params[name])
  }
  return formData
}

/**
 * 获取验证码
 * @param {String} mobilePhone - 手机号码
 * @param {String} type - 验证码类别
 */
function sendLoginVerifyCode (mobilePhone) {
  return this.$http.get(urls.sendLoginVerifyCode + '?mobile=' + mobilePhone)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 检测二维码是否被绑定
 * @param {*} qrkey  - 二维码的key值
 */
function checkQRcode (qrkey) {
  return this.$http.get(urls.checkQRcode + '?qrKey=' + qrkey)
  .then((resp) => {
    return resp.data
  })
}

/**
 * @param {*} params - 图片文件
 * @param {*} type - 发布物品类别
 * @param {*} pickOrLose - 招领（PICK）/失物(LOSE)
 */
function MultipartFile (params, type) {
  return this.$http.post(urls.MultipartFile + '/' + type + '/image', params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 绑定用户信息
 * @param {*} data
 */
function bindQRcode (data) {
  return this.$http.post(urls.bindQRcode, data)
  .then((resp) => {
    return resp.data
  })
}

/**
 * 双向呼叫
 * @param {*} code - 验证码
 * @param {*} phone - 主叫号码
 * @param {*} qrKey - 二维码id
 */
function doubleCall (code, phone, qrKey) {
  return this.$http.get(urls.doubleCall + '?code=' + code + '&qrKey='+ qrKey + '&mobile=' + phone)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 发布留言信息
 * @param {*} params - 所需参数
 */
function publishNote (params) {
  return this.$http.post(urls.publishNote, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 用户登录
 * @param {*} params
 */
function login (params) {
  return this.$http.post(urls.login, params)
  .then((resp) => {
    return resp.data
  })
}

/**
 * 查看留言
 * @param {*} qrCode
 */
function qrNotes (qrCode) {
  return this.$http.get(urls.qrNotes + '?pageNo=1&pageSize=1000&qrCode=' + qrCode)
  .then((resp) => {
    return resp.data
  })
}

export {
  sendLoginVerifyCode,
  checkQRcode,
  bindQRcode,
  doubleCall,
  publishNote,
  MultipartFile,
  login,
  qrNotes
}
