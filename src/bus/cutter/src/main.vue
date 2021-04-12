<template>
  <transition name="fade-zoom">
    <div class="md-croppie-wrapper" v-show="isVisible">
      <div class="md-croppie-wrapper">
        <div class="croppie"></div>
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
  </transition>
</template>

<script>
import visibleMixin from '~/mixins/visible'
import Croppie from 'croppie'
import 'croppie/croppie.css'
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
    },
    resultType: {
      type: String,
      default: 'base64',
      validator(val) {
        return ~['base64', 'blob', 'rawcanvas', 'canvas'].indexOf(val)
      }
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
    markW() {
      // 左右各留16像素
      return this.width || document.body.clientWidth - 16 * 2
    },
    markH() {
      return this.height || (this.markW * 2) / 3
    }
  },
  watch: {
    isVisible(val) {
      if (val) {
        if (!this.croppie) {
          this.croppie = new Croppie(document.querySelector('.croppie'), {
            showZoomer: false, //隐藏滑块
            viewport: {
              width: this.markW,
              height: this.markH
            },
            enableExif: true //纠正旋转角度
          })
        }
        setTimeout(() => {
          this.croppie.bind({
            url: this.file,
            zoom: 0.00001
          })
        }, 50)
      }
    }
  },
  components: {},
  data() {
    return {
      croppie: null
    }
  },
  methods: {
    cancelHandler(e) {
      this.hide()
      this.$emit('cancel', e)
    },
    confirmHandler() {
      this.hide()
      this.croppie
        .result({
          type: this.resultType,
          size: 'original'
        })
        .then(resp => {
          this.$emit('confirm', resp)
        })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.cutter-img {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: block;
  opacity: 0;
  pointer-events: none;
  position: absolute;
}
.md-croppie-wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 1);
}

.md-cutter-buttons {
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  z-index: 99;
  @include border();
  .md-cutter-btn {
    font-size: 18px;
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
