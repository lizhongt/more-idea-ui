<template>
  <transition name="fade-zoom">
    <popup :mask-closable="maskClosable" center v-show="isVisible">
      <div
        class="md-dialog-container"
        :class="`md-dialog__${type}`"
        :style="computedStyle"
      >
        <div class="md-dialog-wrapper">
          <slot name="icon" v-if="$slots.icon || icon">
            <div class="md-dialog-icon">
              <i class="iconfont" v-html="icon"></i>
            </div>
          </slot>
          <h2 v-if="title || $slots.title" class="md-dialog-title">
            <slot name="title">
              <b>{{ title }}</b>
            </slot>
          </h2>
          <div class="md-dialog-content">
            <slot name="content">
              <p v-html="content" v-if="content"></p>
              <div class="prompt-input" v-if="type === 'prompt'">
                <input
                  type="text"
                  v-model="promptValue"
                  :placeholder="prompt.placeholder"
                />
                <i
                  v-show="promptValue"
                  class="iconfont icon-clear"
                  @click="clearHandler"
                  >&#xe6ce;</i
                ></div
              >
            </slot>
          </div>
        </div>
        <div class="md-dialog-buttons">
          <slot name="buttons">
            <a
              @click="cancelHandler"
              class="md-dialog-btn md-bt__cancel"
              :class="cancelClass"
              :style="cancelStyle"
              v-if="type === 'confirm'"
              >{{ cancelText }}</a
            >
            <a
              @click="confirmHandler"
              class="md-dialog-btn md-bt__confirm"
              :style="confirmStyle"
              :class="confirmClass"
              >{{ confirmText }}</a
            >
          </slot>
        </div>
      </div>
    </popup>
    <!-- <div style="width: 200px;height: 100px;background:red;">123</div> -->
  </transition>
</template>

<script>
import Popup from '../../popup'
import visibleMixin from '~/mixins/visible'
export default {
  name: 'MdDialog',
  mixins: [visibleMixin],
  props: {
    type: {
      type: String,
      default: 'alert',
      validator(val) {
        return ~['alert', 'confirm', 'prompt'].indexOf(val)
      }
    },
    prompt: {
      type: Object,
      default() {
        return {
          value: '',
          placeholder: '请输入'
        }
      }
    },
    title: String,
    content: String,
    maskClosable: {
      type: Boolean,
      default: false
    },
    cancelBtn: {
      type: [String, Object],
      default: '取消'
    },
    confirmBtn: {
      type: [String, Object],
      default: '确认'
    },
    icon: {
      type: String,
      default: ''
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
    }
  },
  watch: {},
  components: { Popup },
  data() {
    return {
      promptValue: this.prompt.value
    }
  },
  methods: {
    clearHandler() {
      this.promptValue = ''
    },
    cancelHandler(e) {
      this.hide()
      this.$emit('cancel', e)
    },
    confirmHandler(e) {
      this.hide()
      this.$emit('confirm', e, this.promptValue)
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.md-dialog-container {
  width: 280px;
  background-color: #fff;
  border-radius: 6px;
  text-align: center;
  overflow: auto;
  * {
    box-sizing: border-box;
  }
  .md-dialog-wrapper {
    position: relative;
    .md-dialog-icon {
      margin-top: 24px;
      margin-bottom: -8px;
      line-height: 1;
      color: #4a4c5b;
      font-size: 36px;
    }
    .md-dialog-title {
      @include color('MAIN');
      font-size: 17px;
      line-height: 25px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0px 24px;
      margin-top: 24px;
      font-weight: 400;
    }
    .md-dialog-content {
      margin-top: 10px;
      text-align: center;
      font-size: 13px;
      line-height: 22px;
      min-height: 38px;
      @include color('MAIN', 0.56);
      padding: 0px 24px;
      margin-bottom: 24px;
      .prompt-input {
        font-size: 14px;
        background-color: #fff;
        position: relative;
        margin-top: 10px;
        input {
          text-align: left;
          font-size: 17px;
          display: block;
          width: 100%;
          min-width: 0;
          padding: 0px 32px 0px 16px;
          @include color('MAIN');
          line-height: inherit;
          background-color: inherit;
          border-radius: 22px;
          outline: none;
          border: none;
          @include background('SUBMARY');
          height: 44px;
          line-height: 44px;
        }
        .icon-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .md-dialog-buttons {
    overflow: hidden;
    width: 100%;
    border-width: 1px 0 0 0;
    border-style: solid;
    font-size: 17px;
    @include border();
    .md-dialog-btn {
      display: inline-block;
      width: 100%;
      @include color('PRIMARY');
      height: 44px;
      line-height: 44px;
      padding: 0 24px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      &.md-bt__cancel {
        @include color('MAIN', 0.56);
        border-width: 0 1px 0 0;
        border-style: solid;
        @include border();
      }
    }
  }
  &.md-dialog__confirm {
    .md-dialog-buttons {
      .md-dialog-btn {
        width: 50%;
      }
    }
  }
  &.md-dialog__prompt {
    .md-dialog-title {
      font-size: 18px;
    }
    .md-dialog-content {
      font-size: 15px;
    }
  }
}

.fade-zoom-enter-active {
  animation: dialog-fadein 0.4s;
  .md-dialog-container {
    animation: dialog-zoom 0.4s;
  }
}

@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
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
