 /* eslint-disable */
 import { MessageBox, Toast } from 'mint-ui'

  function getScrollHeight () {
   var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
   if (document.body) {
     bodyScrollHeight = document.body.scrollHeight;
   }
   if (document.documentElement) {
     documentScrollHeight = document.documentElement.scrollHeight;
   }
   scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
   return scrollHeight;
 }

  function getWindowHeight () {
    var windowHeight = 0
    if (document.compatMode == 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

  function getLoginStatus () {
    let promise = new Promise((resolve, reject) => {
      if (window.localStorage.getItem('userId')) {
        resolve()
      } else {
        reject()
      }
    })
    return promise
  }

  /**
   * 校验验证码
   * @param {*} res - 传入的参数
   * @param {*} successFun -如果返回码为200的话 执行的方法
   */
  function getCheckCode (res, successFun, errorFun) {
    console.log('111')
    if (res.code === 200) {
      successFun()
    } else {
      errorFun()
    }
  }

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
   * 判断是否为空
   * @param {*} value - 判断的参数
   */
  function isEmpty (value) {
   if (value) {
     if (String(value).trim().length) {
       return false
     } else {
       return true
     }
   } else {
     return true
   }
  }

  function getPosition () {
    // let getPosi = setInterval(() => {
    //   new BMap.Geolocation().getCurrentPosition(r => {
    //     const pt = r.point
    //     new BMap.Geocoder().getLocation(pt, (rs) => {
    //       const addComp = rs.addressComponents
    //       console.log(rs)
    //       if (addComp) {
    //         global.province = addComp.province
    //         global.city = addComp.city
    //         global.area = addComp.district
    //         global.street = addComp.street
    //         global.streetNumber = addComp.streetNumber
    //         global.address = rs.address
    //         clearInterval(getPosi)
    //         return addComp
    //       }
    //     })
    //   })
    // }, 1000)
  }

  export {
    getScrollHeight,
    getWindowHeight,
    getScrollTop,
    getLoginStatus,
    checkData,
    isEmpty,
    getCheckCode,
    getPosition
  }
