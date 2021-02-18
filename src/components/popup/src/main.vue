<template>
  <div
    class="md-popup"
    :class="{ 'md-pop-center': center }"
    :style="{ 'z-index': zIndex }"
    v-show="isVisible"
  >
    <div
      v-if="mask"
      class="md-popup-mask"
      @touchmove.prevent
      @click="maskClick"
    >
      <slot name="mask"></slot>
    </div>
    <div class="md-popup-container" @touchmove.prevent>
      <div class="md-popup-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="md-popup-content" v-else v-html="content"> </div>
    </div>
  </div>
</template>

<script>
import visibleMixin from '~/mixins/visible'
export default {
  name: 'MdPopup',
  mixins: [visibleMixin],
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 100
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {}
  },
  methods: {
    maskClick(e) {
      this.$emit('mask-click', e)
      this.maskClosable && this.hide()
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.md-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;
  .md-popup-mask {
    background-color: rgba(17, 17, 17, 0.7);
  }
  .md-popup-mask,
  .md-popup-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .md-popup-container {
    transform: translate(100%, 100%);
  }
  .md-popup-content {
    position: absolute;
    pointer-events: auto;
    width: 100%;
    top: 0;
    transform: translate(-100%, -100%);
  }
  &.md-pop-center {
    .md-popup-content {
      top: -50%;
      left: -50%;
      width: auto;
      max-width: 100%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
}
</style>
