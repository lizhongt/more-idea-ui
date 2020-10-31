export const isMobile: boolean = (() => {
  const sUserAgent = navigator.userAgent.toLowerCase()
  const bIsMobile = /AppleWebKit.*Mobile/i.test(navigator.userAgent)
  const bIsIpad = sUserAgent.match(/ipad/i) !== null
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) !== null
  const bIsMidp = sUserAgent.match(/midp/i) !== null
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) !== null
  const bIsUc = sUserAgent.match(/ucbrowser/i) !== null
  const bIsAndroid = sUserAgent.match(/android/i) !== null
  const bIsCE = sUserAgent.match(/windows ce/i) !== null
  const bIsWM = sUserAgent.match(/windows mobile/i) !== null
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

export const IS_ANDROID: boolean =
  window.navigator.userAgent.indexOf('Android') > -1 ||
  window.navigator.userAgent.indexOf('Adr') > -1

export const IS_DING = window.navigator.userAgent.indexOf('DingTalk') > -1

/* 缓存操作 */
export const getItem = (name: string) => {
  if (window.sessionStorage) {
    const value: string = window.sessionStorage.getItem(name) || ''
    return JSON.parse(value)
  }
}

// eslint-disable-next-line
export const setItem = (name: string, value: any) => {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(name, window.JSON.stringify(value))
  }
}

export const removeItem = (name: string) => {
  if (window.sessionStorage) {
    window.sessionStorage.removeItem(name)
  }
}

/* 缓存操作 */
export const getLocalItem = (name: string) => {
  if (window.localStorage) {
    const value: string = window.localStorage.getItem(name) || ''
    return JSON.parse(value)
  }
}

// eslint-disable-next-line
export const setLocalItem = (name: string, value: any) => {
  if (window.localStorage) {
    window.localStorage.setItem(name, window.JSON.stringify(value))
  }
}

export const removeLocalItem = (name: string) => {
  if (window.localStorage) {
    window.localStorage.removeItem(name)
  }
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
export const getSearchValueByKey = (key: string): string => {
  let _value = ''
  const _search = window.location.search
  let _startIndex = _search.search(key)
  if (_startIndex !== -1) {
    _startIndex = _startIndex + key.length + 1
    const _endIndex = _search.indexOf('&', _startIndex)
    if (_endIndex !== -1) {
      _value = _search.slice(_startIndex, _endIndex)
    } else {
      _value = _search.slice(_startIndex)
    }
  }
  return _value
}

export const getTokenUrl = (): string => {
  const url = window.location.href
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
export const timeFormat = (dateObj: Date, type?: string): string => {
  const year = `${dateObj.getFullYear()}`
  const month = ('00' + (dateObj.getMonth() + 1)).slice(-2)
  const date = ('00' + dateObj.getDate()).slice(-2)
  const hours = ('00' + dateObj.getHours()).slice(-2)
  const minutes = ('00' + dateObj.getMinutes()).slice(-2)
  const seconds = ('00' + dateObj.getSeconds()).slice(-2)
  const timeString = (type || 'YYYY-MM-DD')
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
  return timeString
}

export const getDayOfWeek = (dateObj: Date): string => {
  // eslint-disable-next-line
  const _typeObj: any = {
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
export const getDateRange = (type: number) => {
  let range = []
  switch (type) {
    case 1:
      // eslint-disable-next-line no-case-declarations
      const week: any = {
        0: '周日',
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六'
      }
      range = new Array(7).fill(null).map((item, index) => {
        const date = new Date()
        date.setDate(date.getDate() - index)
        item = `${week[date.getDay()]}\n${date.getMonth() +
          1}月${date.getDate()}日`
        return item
      })
      break
    default:
      range = new Array(6).fill(null).map((item, index) => {
        const date = new Date()
        date.setMonth(date.getMonth() + 1 - index)
        date.setDate(0)
        item = `${date.getMonth() + 1}月`
        return item
      })
      break
  }
  return range.reverse()
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象
 * @param {*} cache 缓存数组
 */
const typeMap = '[object Map]'
const typeSet = '[object Set]'
const typeArray = '[object Array]'
const typeObject = '[object Object]'
// 非原始类型的 不可遍历类型  Date RegExp Function
const typeDate = '[object Date]'
const typeRegExp = '[object RegExp]'
const typeFunction = '[object Function]'

// 非原始类型的 不可遍历类型的 集合（原始类型已经被过滤了不用再考虑了）
const simpleType = [typeDate, typeRegExp, typeFunction]

// 判断是否为引用类型
const isObject = (obj = {}) => {
  if (obj === null) {
    return false
  } else {
    return typeof obj === 'function' || typeof obj === 'object'
  }
}
// 获取标准类型
const getType = (target: any) => {
  return Object.prototype.toString.call(target)
}

export const deepCopy = (obj: any, map = new WeakMap()) => {
  if (!isObject(obj)) {
    return obj
  }
  // 获取 实际类型
  const objType = getType(obj)
  // 判断是否为可遍历类型
  if (simpleType.includes(objType)) {
    switch (objType) {
      case typeDate:
        return new Date(obj)
      case typeRegExp:
        // eslint-disable-next-line
        const reg = /\w*$/
        // eslint-disable-next-line
        const result = new RegExp(obj.source, reg.exec(obj)![0])
        result.lastIndex = obj.lastIndex // lastIndex 表示每次匹配时的开始位置
        return result
      default:
        return obj
    }
  }
  // 处理循环引用
  if (map.get(obj)) {
    return map.get(obj)
  }
  let cloneTarget: any
  // 处理可遍历类型
  switch (objType) {
    case typeSet:
      // Set
      cloneTarget = new Set()
      map.set(obj, cloneTarget)
      obj.forEach((item: any) => {
        cloneTarget.add(deepCopy(item, map))
      })
      return cloneTarget
    case typeMap:
      // Map
      cloneTarget = new Map()
      map.set(obj, cloneTarget)
      obj.forEach((value: string | number, key: any) => {
        cloneTarget.set(key, deepCopy(value, map))
      })
      return cloneTarget
    case typeArray:
      // 数组
      cloneTarget = []
      map.set(obj, cloneTarget)
      obj.forEach((item: any, index: number) => {
        cloneTarget[index] = deepCopy(item, map)
      })
      return cloneTarget
    case typeObject:
      // 对象
      cloneTarget = {}
      map.set(obj, cloneTarget)
      ;[...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].forEach(
        item => {
          cloneTarget[item] = deepCopy(obj[item], map)
        }
      )
      return cloneTarget
    default:
      return obj
  }
}
