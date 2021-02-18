<template>
  <transition name="fade">
    <popup :mask="false" center v-show="isVisible">
      <div
        class="md-toast-container fb fb-cross-center fb-main-center"
        :class="`md-toast__${type}`"
      >
        <div class="md-toast-wrapper">
          <div
            class="md-toast-icon"
            v-if="$slots.icon || computedIcon || type === 'loading'"
          >
            <slot name="icon">
              <div class="loading" v-if="type === 'loading' && !icon"></div>
              <i class="iconfont" v-else v-html="computedIcon"></i>
            </slot>
          </div>
          <div class="md-toast-content">
            <slot name="content">
              <p v-html="content" v-if="content"></p>
            </slot>
          </div>
        </div>
      </div>
    </popup>
  </transition>
</template>

<script>
import Popup from '../../popup'
import visibleMixin from '~/mixins/visible'
export default {
  name: 'MdToast',
  mixins: [visibleMixin],
  props: {
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return ~['text', 'success', 'fail', 'loading'].indexOf(val)
      }
    },
    content: String,
    icon: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    computedIcon() {
      return this.icon
        ? this.icon
        : ~['fail', 'success'].indexOf(this.type)
        ? this.icon
          ? this.icon
          : this.type === 'fail'
          ? '&#xe6fb;'
          : this.type === 'success'
          ? '&#xe6fa;'
          : ''
        : ''
    }
  },
  watch: {
    isVisible(val) {
      if (val) {
        if (this.duration) {
          this.timer = setTimeout(() => {
            this.isVisible = false
          }, this.duration)
        }
      } else {
        this.timer && clearTimeout(this.timer)
      }
    }
  },
  components: { Popup },
  data() {
    return {
      timer: null
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.md-toast-container {
  max-width: 280px;
  min-width: 120px;
  min-height: 34px;
  padding: 8px;
  background-color: rgba(17, 17, 17, 0.7);
  border-radius: 6px;
  text-align: center;
  overflow: auto;
  white-space: pre-wrap;
  color: #ffffff;
  &.md-toast__text {
    .md-toast-wrapper {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      flex-direction: row;
      .iconfont {
        margin-right: 6px;
      }
    }
  }
  &.md-toast__loading,
  &.md-toast__fail,
  &.md-toast__success {
    min-width: 120px;
    min-height: 120px;
    max-width: 120px;
    .md-toast-wrapper {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      flex-direction: column;
      .iconfont {
        font-size: 42px;
        margin-right: 6px;
      }
      .md-toast-content {
        margin-top: 14px;
      }
    }
  }
  &.md-toast__loading {
    .loading {
      width: 42px;
      height: 42px;
      border: 6px solid #ffffff;
      border-bottom: transparent 6px solid;
      border-radius: 50%;
      animation: load 1.1s infinite linear;
      -webkit-animation: load 1.1s infinite linear;
      -moz-animation: load 1.1s infinite linear;
      -o-animation: load 1.1s infinite linear;
    }
    @keyframes load {
      from {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes load {
      from {
        -webkit-transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @-moz-keyframes load {
      from {
        -moz-transform: rotate(0deg);
      }
      to {
        -moz-transform: rotate(360deg);
      }
    }
    @-o-keyframes load {
      from {
        -o-transform: rotate(0deg);
      }
      to {
        -o-transform: rotate(360deg);
      }
    }
  }
  * {
    box-sizing: border-box;
  }
  .md-toast-content {
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    text-align: center;
  }
}
</style>
