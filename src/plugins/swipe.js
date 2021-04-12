/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2020-11-11 09:54:42
 */
import { isMobile, throttle } from 'utils/comUtils'

const MIN_DISTANCE = 10
export default function Swipe($container, options) {
  ;('use strict')
  // 如果没有根元素 直接返回
  if (!$container) {
    return
  }
  if ($container.children.length < 2) {
    return
  }
  const rect = $container.getBoundingClientRect()
  let _default = {
    // 循环
    loop: false,
    // 自动轮播
    autoplay: 0,
    // 过度时间
    speed: 400,
    // 滚动下标
    startSlide: 0,
    // 抵抗的滑动距离 大于该值 才会真正执行滑动 默认处理为容器的一半
    resistance: 0,
    // 禁止滚动
    disableScroll: false,
    // 阻止冒泡
    stopPropagation: false,
    // 横向滚动
    horizontal: true,
    width: 0,
    height: 0,
    change: null
  }
  let config = Object.assign({}, _default, options || {})
  if (
    ~['[object Number]', '[object Number]'].indexOf(
      Object.prototype.toString(config.autoplay)
    )
  ) {
    config.autoplay = 3000
  }
  let data = {
    // 实例的宽度
    computedWidth: config.width || rect.width,
    // 实例的高度
    computedHeight: config.height || rect.height,
    size: config.horizontal
      ? config.width || rect.width
      : config.height || rect.height,
    // 元素整体偏移值 和offsetX,offsetY无关 后2者是单次滑动的距离
    offset: 0,
    // 当前swipe下标
    active: config.startSlide,
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
    // 自动轮播定时器
    autoplayTimer: null,
    // 开始滑动时 手指的坐标
    startX: 0,
    startY: 0,
    // 每次横向滑动的距离的绝对值
    offsetX: 0,
    // 每次纵向滑动的距离的绝对值
    offsetY: 0,
    // 滑动方向
    direction: ''
  }
  // 定义方法
  let events = {
    start: function(e) {
      if (config.disableScroll) {
        return
      }
      data.swiping = true
      // 开始滑动就取出定时器
      utils.stopAutoplay()
      // 重置滑动的相关参数
      utils.resetTouches()
      // 矫正下标
      utils.correctPosition()
      // 记录开始滑动的横坐标和纵坐标
      data.startX = isMobile ? e.touches[0].clientX : e.clientX
      data.startY = isMobile ? e.touches[0].clientY : e.clientY
    },
    move: function(e) {
      if (
        (isMobile && e.touches.length > 1) ||
        (e.scale && e.scale !== 1) ||
        !data.swiping
      )
        return
      if (config.disableScroll) return
      // 阻止滑动的默认行为
      data.swiping && e.preventDefault()
      // 阻止冒泡
      config.stopPropagation && e.stopPropagation()
      const touch = isMobile ? e.touches[0] : e
      // 获取横向滑动的值
      data.deltaX = touch.clientX - data.startX
      // 获取纵向滑动的值
      data.deltaY = touch.clientY - data.startY
      // 取绝对值 无论超哪个方向滑动都要触发滑动事件
      data.offsetX = Math.abs(data.deltaX)
      data.offsetY = Math.abs(data.deltaY)
      // 获取实际方向的滑动距离
      data.delta = config.horizontal ? data.deltaX : data.deltaY
      // 获取滑动的方向
      data.direction =
        data.direction || utils.getDirection(data.offsetX, data.offsetY)
      // 判断实际移动的方向和预期的方向是否一致
      if (data.direction === (config.horizontal ? 'horizontal' : 'vertical')) {
        // 根据相关参数 开始执行容器的滑动样式设置 如果滑动的实际距离大于容器的宽度/高度 就按照容器的宽度/高度
        utils.moveTo({
          offset: Math.min(Math.max(data.delta, -data.size), data.size)
        })
      }
    },
    end: function() {
      if (config.disableScroll || !data.swiping) {
        return
      }
      // 设置为不在滑动中
      data.swiping = false
      // 判断实际移动的方向和预期的方向是否一致 是否滑动了一定距离
      const isValidSwipe =
        data.delta &&
        (config.horizontal
          ? data.direction === 'horizontal'
          : data.direction === 'vertical') &&
        Math.abs(data.delta) > (config.resistance || data.size / 3)
      if (isValidSwipe) {
        let offsetAbs = config.horizontal ? data.offsetX : data.offsetY
        utils.moveTo({
          step: config.lool
            ? offsetAbs > 0
              ? data.delta > 0
                ? -1
                : 1
              : 0
            : -Math[data.delta > 0 ? 'ceil' : 'floor'](data.delta / data.size)
        })
      } else if (data.delta) {
        utils.moveTo({ step: 0 })
      }
      utils.autoplay()
    },
    slideTo: function(index, speed = data.speed) {
      data.swiping = true
      utils.stopAutoplay()
      utils.resetTouches()
      utils.correctPosition()
      setTimeout(() => {
        data.swiping = false
        utils.moveTo({
          speed,
          step: (index % data.slides) - data.active
        })
        utils.autoplay()
      }, 30)
    },
    resize: function() {
      throttle(utils.setup)()
    },
    prev() {
      let target = data.active - 1
      if (data.active === 0) {
        if (config.loop) {
          data.swiping = true
          utils.resetTouches()
          utils.correctPosition()
          setTimeout(() => {
            $container.style.transitionDuration = `${config.speed}ms`
            data.swiping = false
            utils.moveTo({
              step: -1
            })
          }, 30)
          return false
        } else {
          target = data.slides - 1
        }
      }
      events.slideTo(target)
    },
    next() {
      let target = data.active + 1
      if (data.active === data.slides - 1) {
        if (config.loop) {
          data.swiping = true
          utils.resetTouches()
          utils.correctPosition()
          setTimeout(() => {
            $container.style.transitionDuration = `${config.speed}ms`
            data.swiping = false
            utils.moveTo({
              step: 1
            })
          }, 30)
          return false
        } else {
          target = 0
        }
      }
      events.slideTo(target)
    }
  }

  const utils = {
    setup: function(active = data.active) {
      // 初始化先清除定时器
      utils.stopAutoplay()
      utils.bindEvents()
      // 如果可滑动的
      data.offset = active * data.size
      // 计算第一个的样式
      let _width = data.slides * data.size
      if (config.loop) {
        // 拷贝首尾元素
        let _lastChild = $container.firstChild.cloneNode(true)
        let _firstChild = $container.lastChild.cloneNode(true)
        $container.insertBefore(_firstChild, $container.firstChild)
        $container.appendChild(_lastChild)
        _width = (data.slides + 2) * data.size
        data.offset = (active + 1) * data.size
      }
      if (!config.horizontal) {
        $container.parentElement.style.height = `${data.size}px`
      }
      // 重置所有的子元素
      $container.children.forEach(slide => {
        slide.style[config.horizontal ? 'width' : 'height'] = `${data.size}px`
      })
      if (config.autoplay) {
        utils.autoplay()
      }
      // 根元素设置过度时间 延时是为了防止初始化时指定下标出现动画
      $container.style.transform = `translate${
        config.horizontal ? 'X' : 'Y'
      }(${-data.offset}px)`
      $container.style[config.horizontal ? 'width' : 'height'] = `${_width}px`
      setTimeout(() => {
        $container.style.transitionDuration = `${
          data.swiping ? 0 : config.speed
        }ms`
      }, 50)
    },
    autoplay: function() {
      if (config.autoplay && data.slides > 1) {
        utils.stopAutoplay()
        data.autoplayTimer = setTimeout(() => {
          data.swiping = true
          utils.resetTouches()
          utils.correctPosition()
          setTimeout(() => {
            $container.style.transitionDuration = `${config.speed}ms`
            data.swiping = false
            utils.moveTo({
              step: config.loop
                ? 1
                : data.active === data.slides - 1
                ? -data.active
                : 1
            })
            utils.autoplay()
          }, 30)
        }, config.autoplay)
      }
    },
    stopAutoplay: function() {
      clearTimeout(data.autoplayTimer)
      data.autoplayTimer = null
    },
    bindEvents: function() {
      window.addEventListener('resize', events.resize, false)
      if (isMobile) {
        $container.addEventListener('touchstart', events.start, false)
        $container.addEventListener('touchmove', events.move, false)
        $container.addEventListener('touchend', events.end, false)
      } else {
        $container.addEventListener('mousedown', events.start, false)
        $container.addEventListener('mousemove', events.move, false)
        $container.addEventListener('mouseup', events.end, false)
      }
    },
    removeEvents: function() {
      utils.stopAutoplay()
      // 移除绑定在根元素上的所有事件
      // remove current event listeners
      if (isMobile) {
        $container.removeEventListener('touchstart', events.start, false)
        $container.removeEventListener('touchmove', events.move, false)
        $container.removeEventListener('touchend', events.end, false)
      } else {
        $container.removeEventListener('mousedown', events.start, false)
        $container.removeEventListener('mousemove', events.move, false)
        $container.removeEventListener('mouseup', events.end, false)
      }
      window.removeEventListener('resize', events.resize, false)
    },
    resetTouches: function() {
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
    moveTo: function({
      offset = 0,
      step = 0,
      speed = config.speed,
      change = true
    } = {}) {
      console.log(`step--> ${step}`)
      // pace原来矫正额外情况 如果通过prev或者next或者slideTo方法进行的滑动
      let isFirst = data.active === 0
      let isLast = data.active === data.slides - 1
      // 如果是不循环 且到达了第一个和最后一个就不做滑动动作 如果是第一个往左滑 offset会大于0 最后一个往右滑 offset会小于0
      const outofBounds =
        !config.loop &&
        ((isFirst && (offset > 0 || step < 0)) ||
          (isLast && (offset < 0 || step > 0)))
      if (outofBounds) {
        return
      }
      if (
        step &&
        data.active + step >= -1 &&
        data.active + step <= data.slides
      ) {
        data.active += step
        if (change) {
          config.change &&
            typeof config.change === 'function' &&
            config.change((data.active + data.slides) % data.slides)
        }
        data.offset = Math.round(offset - data.active * data.size)
      }
      // 容器设置滑动距离
      $container.style.transform = `translate${
        config.horizontal ? 'X' : 'Y'
      }(${Math.round(
        offset - (data.active + (config.loop ? 1 : 0)) * data.size
      )}px)`
      $container.style.transitionDuration = `${!data.swiping ? speed : 0}ms`
    },
    correctPosition: function() {
      if (config.loop) {
        $container.style.transitionDuration = `${
          !data.swiping ? config.speed : 0
        }ms`
        // 开启下标矫正
        if (data.active <= -1) {
          data.active = data.slides - 1
        }
        if (data.active >= data.slides) {
          data.active = 0
        }
        $container.style.transform = `translate${
          config.horizontal ? 'X' : 'Y'
        }(${Math.round(-(data.active + 1) * data.size)}px)`
      }
    },
    refresh: function() {
      utils.removeEvents()
      if (config.loop) {
        let first = $container.childNodes[0]
        let last = $container.childNodes[data.slides + 1]
        // 循环模式下 要把第一个和原来轮播数量+1的copy节点去除
        $container.removeChild(last)
        $container.removeChild(first)
      }
      data.slides = $container.childNodes.length
      utils.setup(config.startSlide)
    },
    reset() {
      $container.children.forEach(slide => {
        slide.style[config.horizontal ? 'width' : 'height'] = `${data.size}px`
      })
      let _lastChild = $container.childNodes[1].cloneNode(true)
      let _firstChild = $container.childNodes[
        $container.childNodes.length - 1
      ].cloneNode(true)
      $container.replaceChild(_firstChild, $container.firstChild)
      $container.replaceChild(_lastChild, $container.lastChild)
    }
  }

  // 执行setup
  utils.setup()
  // 暴露方法和事件
  return {
    slideTo: events.slideTo,
    prev: events.prev,
    next: events.next,
    start: utils.autoplay,
    stop: utils.stopAutoplay,
    getPositon: function() {
      return data.active
    },
    resize: utils.resize,
    destroy: utils.removeEvents,
    refresh: utils.refresh,
    reset: utils.reset
  }
}
