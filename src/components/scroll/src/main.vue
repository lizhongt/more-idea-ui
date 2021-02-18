<template>
  <div class="md-scroll" ref="container">
    <div class="md-scroll-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import GeminiScrollbar from '~/plugins/scroll'
export default {
  name: 'MdScroll',
  props: {
    // 滚动发现
    horizontal: {
      type: Boolean,
      default: false
    },
    // 滚动显示
    autoshow: {
      type: Boolean,
      default: true
    },
    // 显示滚动条
    showBar: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {}
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    initScroll() {
      if (!this.$refs.container) {
        return
      }
      let _options = {
        autoshow: true,
        showBar: true,
        horizontal: false,
        minThumbSize: 20,
        forceGemini: false
      }
      let _that = this
      let options = Object.assign(_options, {
        autoshow: this.autoshow,
        showBar: this.showBar,
        horizontal: this.horizontal,
        minThumbSize: this.minThumbSize,
        forceGemini: this.forceGemini,
        onResize() {
          _that.$emit('resize')
        }
      })
      console.log(options)
      this.scroll = new GeminiScrollbar({
        element: this.$refs.container,
        ...options
      }).create()
    },
    updateScroll() {
      this.scroll.update()
    },
    destroyScroll() {
      this.scroll.destroy()
    }
  },
  watch: {}
}
</script>

<style lang="scss">
.gm-scrollbar-disable-selection {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* fallback for native floating scrollbars */
.gm-prevented {
  -webkit-overflow-scrolling: touch;
}
.gm-prevented > .gm-scrollbar {
  display: none;
}

/* actual gemini-scrollbar styles */
.gm-scrollbar-container {
  position: relative;
  overflow: hidden !important;
  // width: 100%;
  // height: 100%;
}

.gm-scrollbar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 3px;
}

.gm-scrollbar.-vertical {
  width: 6px;
  top: 2px;
}

.gm-scrollbar.-horizontal {
  height: 6px;
  left: 2px;
}

.gm-scrollbar .thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translate3d(0, 0, 0);
}

.gm-scrollbar .thumb:hover,
.gm-scrollbar .thumb:active {
  background-color: rgba(0, 0, 0, 0.3);
}

.gm-scrollbar.-vertical .thumb {
  width: 100%;
}

.gm-scrollbar.-horizontal .thumb {
  height: 100%;
}

.gm-scrollbar-container .gm-scroll-view {
  width: 100%;
  height: 100%;
  overflow: scroll;
  transform: translate3d(0, 0, 0);
  -webkit-overflow-scrolling: touch;
}

/* @option: autoshow */
.gm-scrollbar-container.gm-autoshow .gm-scrollbar {
  opacity: 0;
  transition: opacity 120ms ease-out;
}
.gm-scrollbar-container.gm-autoshow:hover > .gm-scrollbar,
.gm-scrollbar-container.gm-autoshow:active > .gm-scrollbar,
.gm-scrollbar-container.gm-autoshow:focus > .gm-scrollbar,
.gm-scrollbar-container.gm-autoshow.gm-mobile > .gm-scrollbar {
  opacity: 1;
  transition: opacity 340ms ease-out;
}

.gm-resize-trigger {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
  opacity: 0;
}
</style>
