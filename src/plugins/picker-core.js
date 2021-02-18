/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2020-11-11 09:54:42
 */
const MIN_DISTANCE = 15
const MAX_EXCUTE_TIME = 200
export default function Picker($container, options) {
  ;('use strict')
  // 如果没有根元素 直接返回
  if (!$container) {
    return
  }
  let config = Object.assign(
    {
      speed: 1000,
      current: 0,
      itemHeight: 44
    },
    { ...options }
  )
  let data = {
    active: config.current,
    // 每次横向滑动的距离
    deltaX: 0,
    // 每次纵向滑动的距离
    deltaY: 0,
    // 实际依赖距离
    delta: 0,
    // 子元素
    slides: $container.children.length,
    // 是否正在滚动
    swiping: false,
    // 开始滑动时 手指的坐标
    startX: 0,
    startY: 0,
    // 每次横向滑动的距离的绝对值
    offsetX: 0,
    // 每次纵向滑动的距离的绝对值
    offsetY: 0,
    offset: 0,
    // 滑动方向
    direction: '',
    startTime: -1,
    lastOffset: 0
  }
  // 定义方法
  let events = {
    start: function(e) {
      data.swiping = true
      // 重置滑动的相关参数
      utils.resetTouches()
      // 记录开始滑动的横坐标和纵坐标
      data.startX = e.touches[0].clientX
      data.startY = e.touches[0].clientY
    },
    move: function(e) {
      if (e.touches.length > 1 || (e.scale && e.scale !== 1)) return
      // 阻止滑动的默认行为
      data.swiping && e.preventDefault()
      // 阻止冒泡
      // e.stopPropagation()
      const touch = e.touches[0]
      // 获取横向滑动的值
      data.deltaX = touch.clientX - data.startX
      // 获取纵向滑动的值
      data.deltaY = touch.clientY - data.startY
      // 取绝对值 无论超哪个方向滑动都要触发滑动事件
      data.offsetX = Math.abs(data.deltaX)
      data.offsetY = Math.abs(data.deltaY)
      // 获取实际方向的滑动距离
      data.delta = data.deltaY
      // 获取滑动的方向
      data.direction =
        data.direction || utils.getDirection(data.offsetX, data.offsetY)
      let _lastTime = new Date().getTime()
      if (_lastTime - data.startTime > MAX_EXCUTE_TIME) {
        data.startTime = _lastTime
        data.lastOffset = data.offset
      }
      // 判断实际移动的方向和预期的方向是否一致
      if (data.direction === 'vertical') {
        // 根据相关参数 开始执行容器的滑动样式设置 如果滑动的实际距离大于容器的宽度/高度 就按照容器的宽度/高度
        utils.moveTo({
          offset: data.delta
        })
      }
    },
    end: function() {
      // 设置为不在滑动中
      data.swiping = false
      // 判断实际移动的方向和预期的方向是否一致 是否滑动了一定距离
      const isValidSwipe = data.delta && data.direction === 'vertical'
      if (isValidSwipe) {
        let step = 0
        let distance = data.offset - data.lastOffset
        let duration = new Date().getTime() - data.startTime
        if (duration < MAX_EXCUTE_TIME && Math.abs(distance) > MIN_DISTANCE) {
          const speed = Math.abs(distance / duration)
          distance = data.offset + (speed / 0.003) * (distance < 0 ? -1 : 1)
          step = Math.min(
            Math.max(Math.round(-distance / config.itemHeight), 0),
            data.slides - 1
          )
          utils.locate(step)
        } else {
          step = -Math[data.delta > 0 ? 'ceil' : 'floor'](
            data.delta / config.itemHeight
          )
          if (
            Math.abs(step) >
            (step > 0 ? data.slides - 1 - data.active : data.active)
          ) {
            step = step > 0 ? data.slides - 1 - data.active : -data.active
          }
          utils.moveTo({
            step,
            change: true
          })
        }
      }
    },
    resize: function() {
      utils.setup()
    }
  }

  const utils = {
    setup: function(active = data.active) {
      utils.bindEvents()
      data.offset = (2 - active) * config.itemHeight
      data.lastOffset = data.offset
      // 根元素设置过度时间 延时是为了防止初始化时指定下标出现动画
      $container.style.transform = `translateY(${data.offset}px)`
      setTimeout(() => {
        $container.style.transitionDuration = `${
          data.swiping ? 0 : config.speed
        }ms`
      }, 50)
    },
    bindEvents: function() {
      window.removeEventListener('resize', events.resize, false)
      $container.parentElement.addEventListener(
        'touchstart',
        events.start,
        false
      )
      $container.parentElement.addEventListener('touchmove', events.move, false)
      $container.parentElement.addEventListener('touchend', events.end, false)
    },
    removeEvents: function() {
      // 移除绑定在根元素上的所有事件
      // remove current event listeners
      $container.parentElement.removeEventListener(
        'touchstart',
        events.start,
        false
      )
      $container.parentElement.removeEventListener(
        'touchmove',
        events.move,
        false
      )
      $container.parentElement.removeEventListener(
        'touchend',
        events.end,
        false
      )
      window.removeEventListener('resize', events.resize, false)
    },
    resetTouches: function() {
      data.lastOffset = data.offset
      data.startTime = new Date().getTime()
      data.direction = ''
      data.deltaX = 0
      data.deltaY = 0
      data.offsetX = 0
      data.offsetY = 0
    },
    getDirection: function(x, y) {
      if (x > y && x > MIN_DISTANCE) {
        return 'horizontal'
      }
      if (y > x && y > MIN_DISTANCE) {
        return 'vertical'
      }
      return ''
    },
    moveTo: function({ offset = 0, step = 0, change = false } = {}) {
      // pace原来矫正额外情况 如果通过prev或者next或者slideTo方法进行的滑动
      let isFirst = data.active === 0
      let isLast = data.active === data.slides - 1
      // 如果是不循环 且到达了第一个和最后一个就不做滑动动作 如果是第一个往左滑 offset会大于0 最后一个往右滑 offset会小于0
      const outofBounds = (isFirst && offset > 200) || (isLast && offset < -200)
      if (outofBounds) {
        return
      }
      data.active += step
      data.offset = Math.round(offset - (data.active - 2) * config.itemHeight)
      // 容器设置滑动距离
      $container.style.transform = `translateY(${data.offset}px)`
      $container.style.transitionDuration = `${
        !data.swiping ? config.speed : 0
      }ms`
      if (
        change &&
        step &&
        data.active + step >= -1 &&
        data.active + step <= data.slides
      ) {
        config.change &&
          typeof config.change === 'function' &&
          config.change((data.active + data.slides) % data.slides)
      }
    },
    refresh: function() {
      utils.removeEvents()
      data.slides = $container.childNodes.length
      utils.setup(config.current)
    },
    locate: function(index) {
      utils.moveTo({
        step: index - data.active,
        change: true
      })
    }
  }

  // 执行setup
  utils.setup()
  // 暴露方法和事件
  return {
    getPositon: function() {
      return data.active
    },
    resize: utils.resize,
    destroy: utils.removeEvents,
    refresh: utils.refresh,
    locate: utils.locate
  }
}
