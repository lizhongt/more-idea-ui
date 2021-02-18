<template>
  <div class="md-swipe" :style="computedStyle">
    <div
      class="md-swipe-wrap fb"
      :class="{ 'fb-col': !options.horizontal }"
      ref="swipe"
    >
      <slot></slot>
    </div>
    <div
      v-if="showIndicators"
      class="md-swipe-indicators fb"
      :class="{ 'is-vertival fb-col': !options.horizontal }"
    >
      <slot name="indicators">
        <i
          class="iconfont swipe-indicator"
          v-for="item in dots"
          :key="item"
          :class="{ active: item - 1 === active }"
          >&#xe67d;</i
        >
      </slot>
    </div>
  </div>
</template>
<script>
import Swipe from '~/plugins/swipe'
export default {
  name: 'MdSwiper',
  props: {
    options: {
      // 开始滚动位置
      startSlide: { type: Number, default: 0 },
      // 滚动速度
      speed: { type: Number, default: 400 },
      // 自动轮播时间
      autoplay: { type: [Boolean, Number], default: false },
      // 是否无限循环
      loop: { type: Boolean, default: true },
      // 是否禁止页面滚动
      disableScroll: { type: Boolean, default: false },
      // 阻止冒泡
      stopPropagation: { type: Boolean, default: false },
      // 模式
      horizontal: { type: Boolean, default: true }
    },
    showIndicators: { type: Boolean, default: false }
  },
  data() {
    return {
      swipe: undefined,
      active: this.$options.startSlide,
      height: null
    }
  },
  computed: {
    dots() {
      return this.$slots.default.length
    },
    computedStyle() {
      return this.options.horizontal
        ? null
        : {
            height: `${this.height}px`
          }
    }
  },
  mounted() {
    if (!this.options.horizontal) {
      this.height = this.$refs.swipe.children[0].getBoundingClientRect().height
    }
    this.$nextTick(() => {
      this.init()
    })
  },
  destroyed() {},
  methods: {
    init() {
      let _that = this
      this.swipe = new Swipe(
        this.$refs.swipe,
        Object.assign({}, this.options, {
          change(index) {
            _that.slideChange(index)
          }
        })
      )
    },
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
    slideTo(index, duration = this.speed) {
      this.swipe.slideTo(index, duration)
    },
    resize() {
      setTimeout(this.swipe.resize, 0)
    },
    slideChange(index) {
      this.active = index
      this.$emit('change', index)
    },
    destroy() {
      this.swipe.destroy()
    },
    stop() {
      this.swipe.stop()
    },
    start() {
      this.swipe.start()
    },
    refresh() {
      this.$nextTick(() => {
        this.swipe.refresh(this.$refs.swipe)
      })
    },
    reset() {
      this.swipe.reset(this.$refs.swipe)
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.md-swipe {
  overflow: hidden;
  position: relative;
  width: 100%;
  -webkit-user-select: none;
  user-select: none;
  .md-swipe-wrap {
    position: relative;
    height: 100%;
  }
  .md-swipe-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(0) scale(0.5);
    transform: translateX(-50%) translateY(0) scale(0.5);
    font-size: 12px;
    &.is-vertival {
      bottom: 50%;
      left: 20px;
      transform: translateX(0) translateY(50%) scale(0.5);
      -webkit-transform: translateX(0) translateY(50%) scale(0.5);
      .swipe-indicator {
        margin-bottom: 12px;
      }
    }
    .swipe-indicator {
      color: #ebedf0;
      margin-right: 12px;
      &:last-child {
        margin: 0;
      }
      &.active {
        @include color('PRIMARY');
      }
    }
  }
}
</style>
