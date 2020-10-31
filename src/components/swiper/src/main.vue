<template>
  <div class="fly-swipe">
    <div class="swipe-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// 依赖插件
import Swipe from 'swipe-js-iso'
export default {
  name: 'fly-swiper',
  props: {
    options: {
      // 开始滚动位置
      startSlide: { type: Number, default: 0 },
      // 滚动速度
      speed: { type: Number, default: 400 },
      // 自动轮播时间
      auto: { type: Number, default: 3000 },
      // 是否无限循环
      continuous: { type: Boolean, default: true },
      // 是否禁止页面滚动
      disableScroll: { type: Boolean, default: false },
      // 阻止冒泡
      stopPropagation: { type: Boolean, default: false }
    }
  },
  data() {
    return {
      swipe: undefined
    }
  },
  mounted() {
    let _that = this
    this.swipe = new Swipe(
      this.$el,
      Object.assign({}, this.options, {
        callback(index, elem) {
          _that.slideChange(index, elem)
        },
        transitionEnd(index, elem) {
          _that.slideChange(index, elem)
        }
      })
    )
  },
  destroyed() {
    this.swipe.kill()
  },
  methods: {
    prev() {
      this.swipe.prev()
    },
    next() {
      this.swipe.next()
    },
    getPos() {
      return this.swipe.getPos()
    },
    getNumSlides() {
      return this.swipe.getNumSlides()
    },
    slide(index, duration = this.speed) {
      this.swipe.slide(index, duration)
    },
    resize() {
      setTimeout(this.swipe.setup, 0)
    },
    slideChange(index, elem) {
      this.$emit('slideChange', { index, elem })
    },
    transitionEnd(index, elem) {
      this.$emit('transitionEnd', { index, elem })
    }
  }
}
</script>
<style lang="scss" scoped>
.fly-swipe {
  overflow: hidden;
  visibility: hidden;
  position: relative;
  .swipe-wrap {
    overflow: hidden;
    position: relative;
  }
}
</style>
