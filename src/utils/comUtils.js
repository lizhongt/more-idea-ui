// 判断当前浏览器是PC端还是移动端
// true：移动端   false：PC端
export const isMobile = (() => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsMobile = /AppleWebKit.*Mobile/i.test(navigator.userAgent)
  let bIsIpad = sUserAgent.match(/ipad/i) !== null
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) !== null
  let bIsMidp = sUserAgent.match(/midp/i) !== null
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) !== null
  let bIsUc = sUserAgent.match(/ucbrowser/i) !== null
  let bIsAndroid = sUserAgent.match(/android/i) !== null
  let bIsCE = sUserAgent.match(/windows ce/i) !== null
  let bIsWM = sUserAgent.match(/windows mobile/i) !== null
  if (
    bIsMobile ||
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return true
  } else {
    return false
  }
})()

export const IS_ANDROID =
  window.navigator.userAgent.indexOf('Android') > -1 ||
  window.navigator.userAgent.indexOf('Adr') > -1

export const IS_DING = window.navigator.userAgent.indexOf('DingTalk') > -1

/* 缓存操作 */
export const getItem = name => {
  if (window.sessionStorage) {
    let value = window.sessionStorage.getItem(name)
    return window.JSON.parse(value)
  }
  return (window.cache || {})[name]
}

export const setItem = (name, value) => {
  if (window.sessionStorage) {
    return window.sessionStorage.setItem(name, window.JSON.stringify(value))
  }
  // eslint-disable-next-line no-extra-semi
  ;(window.cache || {})[name] = value
}

export const removeItem = name => {
  if (window.sessionStorage) {
    return window.sessionStorage.removeItem(name)
  }
  // eslint-disable-next-line no-extra-semi
  ;(window.cache || {})[name] = null
}

/* 缓存操作 */
export const getLocalItem = name => {
  if (window.localStorage) {
    let value = window.localStorage.getItem(name)
    return window.JSON.parse(value)
  }
  return (window.cache || {})[name]
}

export const setLocalItem = (name, value) => {
  if (window.localStorage) {
    return window.localStorage.setItem(name, window.JSON.stringify(value))
  }
  // eslint-disable-next-line no-extra-semi
  ;(window.cache || {})[name] = value
}

export const removeLocalItem = name => {
  if (window.localStorage) {
    return window.localStorage.removeItem(name)
  }
  // eslint-disable-next-line no-extra-semi
  ;(window.cache || {})[name] = null
}

// 获取URL search对象
export const getSearchObj = () => {
  let _obj = {}
  let _search = window.location.search || ''

  if (_search) {
    _search = _search
      .substr(1)
      .replace(/&/g, '", "')
      .replace(/=/g, '": "')
    _search = JSON.parse(`{"${_search}"}`)
    _obj = _search
  }
  return _obj
}

// 获取URL searchKey的值
export const getSearchValueByKey = key => {
  let _value = ''
  let _search = window.location.search
  let _startIndex = _search.search(key)
  if (_startIndex !== -1) {
    _startIndex = _startIndex + key.length + 1
    let _endIndex = _search.indexOf('&', _startIndex)
    if (_endIndex !== -1) {
      _value = _search.slice(_startIndex, _endIndex)
    } else {
      _value = _search.slice(_startIndex)
    }
  }
  return _value
}

export const getTokenUrl = () => {
  let url = window.location.href
  let hashIndex = url.indexOf('#')
  if (hashIndex === -1) {
    hashIndex = url.length
  }
  return url.substring(0, hashIndex)
}

/**
 * 时间格式转换 YYYY-MM-DD
 * @param date 时间对象
 * @param type 返回时间格式
 */
export const timeFormat = (dateObj, type = 'YYYY-MM-DD') => {
  let year = dateObj.getFullYear()
  let month = ('00' + (dateObj.getMonth() + 1)).slice(-2)
  let date = ('00' + dateObj.getDate()).slice(-2)
  let hours = ('00' + dateObj.getHours()).slice(-2)
  let minutes = ('00' + dateObj.getMinutes()).slice(-2)
  let seconds = ('00' + dateObj.getSeconds()).slice(-2)
  let timeString = ''

  timeString = type
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
  return timeString
}

/**
 * 图像压缩
 * @param {File} imgFile 图片文件对象
 * @return {object}
 *            base64Url  Base64Url
 *            blob       Blob
 */
export const miniImage = imgFile => {
  return new Promise((resolve, reject) => {
    try {
      let orientation
      // eslint-disable-next-line space-before-function-paren
      window.EXIF.getData(imgFile, function() {
        orientation = window.EXIF.getTag(this, 'Orientation')
      })
      let reader = new FileReader()
      reader.onload = () => {
        let img = new Image()
        img.src = reader.result
        img.onload = () => {
          let drawWidth = img.naturalWidth
          let drawHeight = img.naturalHeight

          let degree = 0
          let width
          let height
          // 图片大小小于1M时不进行压缩
          if (imgFile.size > 1024 * 1024) {
            let maxSide = Math.max(drawWidth, drawHeight)
            let minSide = Math.min(drawWidth, drawHeight)
            if (maxSide > 1024) {
              minSide = (minSide / maxSide) * 1024
              maxSide = 1024
              if (drawWidth > drawHeight) {
                drawWidth = maxSide
                drawHeight = minSide
              } else {
                drawWidth = minSide
                drawHeight = maxSide
              }
            }
          }
          let canvas = document.createElement('canvas')
          canvas.width = drawWidth
          width = drawWidth
          canvas.height = drawHeight
          height = drawHeight
          let context = canvas.getContext('2d')
          // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
          switch (orientation) {
            // iphone横屏拍摄，此时home键在左侧
            case 3:
              degree = 180
              drawWidth = -width
              drawHeight = -height
              break
            // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
            case 6:
              canvas.width = height
              canvas.height = width
              degree = 90
              drawWidth = width
              drawHeight = -height
              break
            // iphone竖屏拍摄，此时home键在上方
            case 8:
              canvas.width = height
              canvas.height = width
              degree = 270
              drawWidth = -width
              drawHeight = height
              break
          }
          // 使用canvas旋转校正
          context.rotate((degree * Math.PI) / 180)
          context.drawImage(img, 0, 0, drawWidth, drawHeight)
          let _base64Url = canvas.toDataURL('image/png', 0.8)
          let _blob = convertBase64UrlToBlob(_base64Url)
          resolve({
            width: drawWidth,
            height: drawHeight,
            base64Url: _base64Url,
            blob: _blob
          })
        }
      }
      reader.readAsDataURL(imgFile)
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Base64Url转Blob
 * @param {string} urlData Base64Url
 * @return Blob
 */
export const convertBase64UrlToBlob = urlData => {
  // convertBase64UrlToBlob函数是将base64编码转换为Blob
  // 去掉url的头，并转换为byte
  var bytes = window.atob(urlData.split(',')[1])
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new window.ArrayBuffer(bytes.length)
  var ia = new window.Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new window.Blob([ab], { type: 'image/png' })
}

const _getQueryString = name => {
  let _href = window.location.href
  let _searchIndex = _href.indexOf('?')
  let _hashIndex = _href.indexOf('#')
  if (_searchIndex === -1) {
    return null
  }
  /* 截取 ? 到 # 之间的参数 */
  let _search =
    _hashIndex > -1
      ? _href.substring(_searchIndex + 1, _hashIndex)
      : _href.substring(_searchIndex + 1)
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = _search.match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/* url 参数操作 */
export const getQueryString = _getQueryString

export const getCorpId = () => {
  let _corpId = _getQueryString('corpId')
  // 如果获取的企业ID携带hash值 则去除
  if (_corpId && _corpId.indexOf('#') !== -1) {
    _corpId = _corpId.substring(0, _corpId.indexOf('#'))
  }
  return _corpId
}

// base64转文件
export const dataURLtoFile = (dataurl, filename = 'file') => {
  // base64转化为file对象 方便上传
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

/**
 * 获取当前日期是一周的星期几
 */
export const getDayOfWeek = dateObj => {
  if (!(dateObj instanceof Date)) {
    throw new Error('参数dateObj不是Date实例')
  }
  let _typeObj = {
    0: '星期天',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  return _typeObj[dateObj.getDay()]
}

// 获取日期 1-最近7天 2-最近6个月
export const getDateRange = type => {
  let range = []
  switch (type) {
    case 1:
      // eslint-disable-next-line no-case-declarations
      let week = {
        0: '周日',
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六'
      }
      range = new Array(7).fill(null).map((item, index) => {
        let date = new Date()
        date.setDate(date.getDate() - index)
        item = `${week[date.getDay()]}\n${date.getMonth() +
          1}月${date.getDate()}日`
        return item
      })
      break
    default:
      range = new Array(6).fill(null).map((item, index) => {
        let date = new Date()
        date.setMonth(date.getMonth() + 1 - index)
        date.setDate(0)
        item = `${date.getMonth() + 1}月`
        return item
      })
      break
  }
  return range.reverse()
}

// 阿拉伯数转中文
export const numToCn = num => {
  var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  var unitPos = 0
  var strIns = ''
  var chnStr = ''
  var needZero = false

  if (num === 0) {
    return chnNumChar[0]
  }

  let SectionToChinese = section => {
    var chnNumChar = [
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九'
    ]
    var chnUnitChar = ['', '十', '百', '千']
    var strIns = ''
    var chnStr = ''
    var unitPos = 0
    var zero = true
    while (section > 0) {
      var v = section % 10
      if (v === 0) {
        if (!zero) {
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
    return chnStr
  }

  while (num > 0) {
    var section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = section < 1000 && section > 0
    num = Math.floor(num / 10000)
    unitPos++
  }

  return chnStr
}

// 防抖函数：调用后在一定的时间内函数不执行，过了限时执行，在限时内再次调用会重新开启定时器
export const debounce = (fn, wait = 300, immediate = true) => {
  // eslint-disable-next-line space-before-function-paren
  return function() {
    const context = this
    const execNow = immediate && !fn.timeout
    const args = arguments
    if (fn.timeout) clearTimeout(fn.timeout)
    fn.timeout = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
    execNow && fn.apply(context, args)
  }
}

// 截流函数：每一个时间限制内会执行一次 第一次可选是否立即执行 最后一次也执行
export const throttle = (fn, wait = 600, immediate = true) => {
  let startTime = Date.now()
  // eslint-disable-next-line space-before-function-paren
  return function() {
    let currentTime = Date.now()
    const context = this
    const execNow = immediate && !fn.timeout
    const args = arguments
    let diff = currentTime - startTime
    if (diff < wait) {
      if (fn.timeout) {
        return
      }
      fn.timeout = setTimeout(() => {
        fn.apply(context, args)
        startTime = Date.now()
        fn.timeout = null
      }, wait - diff)
      return
    }
    clearTimeout(fn.timeout)
    fn.timeout = null
    if (execNow) {
      startTime = Date.now()
      fn.apply(context, args)
    }
  }
}
