<template>
  <transition name="fade-zoom">
    <popup
      :mask-closable="false"
      center
      v-show="isVisible"
      style="background-color: rgba(0, 0, 0, 1);"
    >
      <div
        class="md-cutter-container"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        v-dbclcik="{ event: toggleZoom }"
        ref="cutter"
      >
        <img class="origin-img" ref="img" v-if="file" :src="file" />
        <div class="md-cutter-box">
          <div
            ref="canvas"
            class="cutter-canvas"
            :style="{
              width: `${imgWidth}px`,
              height: `${imgHeight}px`,
              transform: `translateX(${imgOffsetLeft}px) translateY(${imgOffsetTop}px)`
            }"
          >
            <img
              v-show="file"
              :src="file"
              alt="Picture"
              class="cutter-hide"
              :style="{
                width: `${imgWidth}px`,
                height: `${imgHeight}px`
              }"
            />
          </div>
        </div>
        <div class="md-cutter-modal"></div>
        <div class="cutter-mark-area" :style="computedMarkStyle">
          <img v-show="file" :src="file" :style="computedMarkImgStyle" />
        </div>
        <div class="md-cutter-buttons fb fb-main-between">
          <slot name="buttons">
            <a
              @click="cancelHandler"
              class="md-cutter-btn md-bt__cancel"
              :class="cancelClass"
              :style="cancelStyle"
              >{{ cancelText }}</a
            >
            <a
              @click="confirmHandler"
              class="md-cutter-btn md-bt__confirm"
              :style="confirmStyle"
              :class="confirmClass"
              >{{ confirmText }}</a
            >
          </slot>
        </div>
      </div>
    </popup>
  </transition>
</template>

<script>
import Popup from 'components/popup'
import visibleMixin from '~/mixins/visible'
import { isMobile } from 'utils/comUtils'
export default {
  name: 'MdCutter',
  mixins: [visibleMixin],
  props: {
    file: String,
    cancelBtn: {
      type: [String, Object],
      default: '取消'
    },
    confirmBtn: {
      type: [String, Object],
      default: '确认'
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    confirmText() {
      return (this.confirmBtn || {}).text || this.confirmBtn
    },
    cancelText() {
      return (this.cancelBtn || {}).text || this.cancelBtn
    },
    confirmClass() {
      let _type = (this.confirmBtn || {}).type
      return [_type ? `md-btn__${_type}` : '']
    },
    cancelClass() {
      let _type = (this.cancelBtn || {}).type
      return [_type ? `md-btn__${_type}` : '']
    },
    cancelStyle() {
      return (this.cancelBtn || {}).color
        ? {
            color: this.cancelBtn.color
          }
        : null
    },
    confirmStyle() {
      return (this.confirmBtn || {}).color
        ? {
            color: this.confirmBtn.color
          }
        : null
    },
    computedStyle() {
      return {
        'max-width': `${Math.round(document.body.clientHeight * 0.6)}px`
      }
    },
    markW() {
      // 左右各留16像素
      return this.width || document.body.clientWidth - 16 * 2
    },
    markH() {
      return this.height || (this.markW * 2) / 3
    },
    computedMarkImgStyle() {
      return {
        width: `${this.imgWidth}px`,
        height: `${this.imgHeight}px`,
        transform: `translateX(${this.markOffsetLeft}px) translateY(${this.markOffsetTop}px)`
      }
    },
    computedMarkStyle() {
      return {
        width: `${this.markW}px`,
        height: `${this.markH}px`,
        transform: `translateX(${(document.body.clientWidth - this.markW) /
          2}px) translateY(${-(document.body.clientHeight - this.markH) / 2}px)`
      }
    }
  },
  watch: {
    file: {
      immediate: true,
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.initZoomView()
          }, 50)
        }
      }
    },
    imgWidth(val) {
      if (val > this.$refs.img.width * 3) {
        setTimeout(() => {
          this.imgWidth = this.$refs.img.width * 3
          this.imgHeight = this.$refs.img.height * 3
        }, 50)
      }
    }
  },
  components: { Popup },
  directives: {
    dbclcik: {
      inserted($el, binding) {
        var touchtime = new Date().getTime()
        $el.dblclick = () => {
          if (new Date().getTime() - touchtime < 500) {
            binding.value.event()
          } else {
            touchtime = new Date().getTime()
          }
        }
        $el.addEventListener('click', $el.dblclick)
      },
      unbind($el) {
        $el.removeEventListener('click', $el.dblclick)
      }
    }
  },
  data() {
    return {
      imgWidth: 0,
      imgHeight: 0,
      imgOffsetLeft: 0,
      imgOffsetTop: 0,
      zoomed: false,
      // 每次横向滑动的距离
      deltaX: 0,
      // 每次纵向滑动的距离
      deltaY: 0,
      // 是否正在触摸
      touching: false,
      // 开始滑动时 手指的坐标
      startX: 0,
      startY: 0,
      lastEndX: 0,
      lastEndY: 0,
      markOffsetLeft: 0,
      markOffsetTop: 0
    }
  },
  methods: {
    cancelHandler(e) {
      this.hide()
      this.$emit('cancel', e)
    },
    confirmHandler(e) {
      this.hide()
      this.$emit('confirm', e, this.promptValue)
    },
    initZoomView() {
      this.$nextTick(() => {
        let _width = this.$refs.img.width
        let _height = this.$refs.img.height
        // 等比例进行展示 要先判断以宽高哪个为基准
        if (_width > _height) {
          // 以高度进行铺满 等比例额放大
          this.imgWidth = this.markW
          this.imgHeight = (this.imgWidth * _height) / _width
        } else {
          this.imgHeight = this.markH
          this.imgWidth = (this.imgHeight * _width) / _height
        }
        this.imgOffsetTop = (document.body.clientHeight - this.imgHeight) / 2
        this.imgOffsetLeft = 16
        this.markOffsetLeft = (this.markW - this.imgWidth) / 2
        this.markOffsetTop = (this.markH - this.imgHeight) / 2
      })
    },
    toggleZoom() {
      if (this.zoomed) {
        this.initZoomView()
        this.zoomed = false
      } else {
        // 先判断当前放大比列是否超出了1.5
        if (this.imgWidth > this.$refs.img.width * 1.5) {
          this.initZoomView()
          this.zoomed = false
        } else {
          this.imgWidth *= 1.5
          this.imgHeight *= 1.5
          // 重新设置偏移值
          this.imgOffsetLeft = (document.body.clientWidth - this.imgWidth) / 2
          this.imgOffsetTop = (document.body.clientHeight - this.imgHeight) / 2
          this.zoomed = true
          this.markOffsetLeft = (this.markW - this.imgWidth) / 2
          this.markOffsetTop = (this.markH - this.imgHeight) / 2
        }
      }
    },
    touchstart(e) {
      this.$refs.canvas.style.transitionDuration = `0ms`
      this.touching = true
      // 记录开始滑动的横坐标和纵坐标
      this.startX = isMobile ? e.touches[0].clientX : e.clientX
      this.startY = isMobile ? e.touches[0].clientY : e.clientY
    },
    touchmove(e) {
      if (
        (isMobile && e.touches.length > 1) ||
        (e.scale && e.scale !== 1) ||
        !this.touching
      )
        return
      // 阻止滑动的默认行为
      this.touching && e.preventDefault()
      const touch = isMobile ? e.touches[0] : e
      // 获取横向滑动的值
      this.deltaX = touch.clientX - this.startX - this.lastEndX
      // 获取纵向滑动的值
      this.deltaY = touch.clientY - this.startY - this.lastEndY
      this.lastEndX = touch.clientX - this.startX
      this.lastEndY = touch.clientY - this.startY
      this.imgOffsetLeft = this.imgOffsetLeft + this.deltaX
      this.imgOffsetTop = this.imgOffsetTop + this.deltaY
      // this.markOffsetLeft = this.markOffsetLeft + this.deltaX
      // this.markOffsetTop = this.markOffsetTop + this.deltaY
    },
    touchend(e) {
      console.log(e)
      this.touching = false
      this.deltaX = 0
      this.deltaY = 0
      this.lastEndX = 0
      this.lastEndY = 0
      this.correctPosition()
    },
    zoom(e) {
      let step = 50
      if (e.wheelDelta) {
        step = step * (e.wheelDelta > 0 ? 1 : -1)
      } else {
        step = step * (e.wheelDelta < 0 ? 1 : -1)
      }
      this.imgOffsetLeft += step
      this.imgOffsetTop += step
      this.markOffsetLeft += step
      this.markOffsetTop += step
    },
    addEventListener: function($container) {
      if (isMobile) {
        $container.addEventListener('touchstart', this.touchstart, false)
        $container.addEventListener('touchmove', this.touchmove, false)
        $container.addEventListener('touchend', this.touchend, false)
      } else {
        $container.addEventListener('mousedown', this.touchstart, false)
        $container.addEventListener('mousemove', this.touchmove, false)
        $container.addEventListener('mouseup', this.touchend, false)
        $container.addEventListener('mousewheel', this.zoom, false)
      }
    },
    removeEventListener: function($container) {
      // 移除绑定在根元素上的所有事件
      if (isMobile) {
        $container.removeEventListener('touchstart', this.touchstart, false)
        $container.removeEventListener('touchmove', this.touchmove, false)
        $container.removeEventListener('touchend', this.touchend, false)
      } else {
        $container.removeEventListener('mousedown', this.touchstart, false)
        $container.removeEventListener('mousemove', this.touchmove, false)
        $container.removeEventListener('mouseup', this.touchend, false)
        $container.removeEventListener('mousewheel', this.zoom, false)
      }
    },
    correctPosition() {
      // 判断横向移动是否超出边界
      if (this.imgOffsetLeft > 16) {
        this.$refs.canvas.style.transitionDuration = `300ms`
        this.markOffsetLeft = this.imgOffsetLeft = 16
      }
      if (
        -this.imgOffsetLeft + document.body.clientWidth - 16 >
        this.imgWidth
      ) {
        this.$refs.canvas.style.transitionDuration = `300ms`
        this.markOffsetLeft = this.imgOffsetLeft =
          document.body.clientWidth - this.imgWidth - 16
      }
      // 判断纵向是否超出边界
      if (this.imgOffsetTop > (document.body.clientHeight - this.markH) / 2) {
        this.$refs.canvas.style.transitionDuration = `300ms`
        this.imgOffsetTop = (document.body.clientHeight - this.markH) / 2
        this.markOffsetTop = 0
      }
      if (this.imgOffsetTop < -(document.body.clientHeight - this.markH) / 2) {
        this.$refs.canvas.style.transitionDuration = `300ms`
        this.imgOffsetTop = -(this.imgHeight - this.markH) / 2
        this.markOffsetTop = 0
      }
    }
  },
  mounted() {
    let cutter = this.$refs.cutter
    this.addEventListener(cutter)
    this.$once('hook:beforeDestroy', () => {
      this.removeEventListener(cutter)
    })
  }
}
</script>

<style lang="scss" scoped>
.md-cutter-container {
  width: 100vw;
  height: 100vh;
  border-radius: 6px;
  text-align: center;
  overflow: auto;
  position: relative;
  .origin-img {
    display: none !important;
  }
  * {
    box-sizing: border-box;
  }
  .md-cutter-box {
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    .cutter-canvas {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      .cutter-hide {
        position: absolute;
        display: block;
        height: 100%;
        image-orientation: 0deg;
        max-height: none !important;
        max-width: none !important;
        min-height: 0 !important;
        min-width: 0 !important;
        width: 100%;
        transform: none;
      }
    }
  }
  .md-cutter-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background-color: #000;
    opacity: 0.5;
  }
  .cutter-mark-area {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .md-cutter-buttons {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    @include border();
    .md-cutter-btn {
      display: inline-block;
      width: 100%;
      @include color('DEFAULT');
      height: 44px;
      line-height: 44px;
      padding: 0 24px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      &.md-bt__cancel {
        @include color('DEFAULT');
      }
    }
  }
  &.md-cutter__confirm {
    .md-cutter-buttons {
      .md-cutter-btn {
        width: 50%;
      }
    }
  }
}

.fade-zoom-enter-active {
  animation: cutter-fadein 0.4s;
  .md-cutter-container {
    animation: cutter-zoom 0.4s;
  }
}

@keyframes cutter-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes cutter-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
