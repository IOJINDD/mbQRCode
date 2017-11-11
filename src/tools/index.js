import { Toast } from 'mint-ui'
 /**
  *
  * @param {Array} params - 要检查的数组
  * @param {Array} toasts - 对于的提示语句
  * @param {function} callback - 执行的方法
  */
  function checkData (params, toasts, callback) {
    let flag = true
    params.forEach(function (element, index) {
      if (!element) {
        if (flag) {
          Toast(toasts[index])
        }
        flag = false
      }
    }, this)
    if (flag) {
      callback()
    }
  }

  /**
 * 校验验证码
 * @param {*} res - 传入的参数
 * @param {*} successFun -如果返回码为200的话 执行的方法
 */
function getCheckCode (res, successFun, errorFun) {
  if (res.code == '200') {
    successFun()
  } else {
    Toast(res.msg)
    errorFun()
  }
}
  export {
    checkData,
    getCheckCode
  }
