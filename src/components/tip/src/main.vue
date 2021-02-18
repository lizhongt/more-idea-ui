<template>
  <transition name="fade">
    <div
      class="md-tip"
      :class="{ 'md-toolip': type === 'primary' }"
      :data-direction="direction"
      v-show="isVisible"
    >
      <i class="md-tip-indicator"></i>
      <div class="tip-content"
        ><slot></slot
        ><i @click="closeHandler" v-if="type === 'primary'" class="iconfont"
          >&#xe6f3;</i
        ></div
      ></div
    >
  </transition>
</template>

<script>
import visibleMixin from '~/mixins/visible'
export default {
  name: 'MdTip',
  mixins: [visibleMixin],
  props: {
    type: {
      type: String,
      default: 'transparent',
      validator(val) {
        return ~['transparent', 'primary'].indexOf(val)
      }
    },
    direction: {
      type: String,
      default: 'right',
      validator(val) {
        return ~['top', 'bottom', 'left', 'right'].indexOf(val)
      }
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  computed: {},
  watch: {
    isVisible(val) {
      this.$emit(val ? 'show' : 'hide')
      if (val && this.type === 'tranparent') {
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
  components: {},
  data() {
    return {
      timer: null
    }
  },
  methods: {
    closeHandler() {
      this.isVisible = false
      this.$emit('close')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.md-tip {
  display: inline-block;
  position: absolute;
  &.md-toolip {
    .tip-content {
      max-width: 240px;
      min-width: 128px;
      min-height: 32px;
      padding: 6px 30px 6px 12px;
      color: #ffffff;
      font-size: 14px;
      @include background('PRIMARY');
      position: relative;
      height: 18px;
      line-height: 18px;
      > i {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
      }
    }
    .md-tip-indicator::before {
      border-color: transparent transparent #0089ff;
    }
  }
  .tip-content {
    display: inline-block;
    box-sizing: border-box;
    min-width: 108px;
    max-width: 240px;
    min-height: 42px;
    padding: 12px 24px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #ffffff;
    font-size: 15px;
    border-radius: 6px;
    background-color: rgba(17, 17, 17, 0.7);
  }
  .md-tip-indicator {
    position: absolute;
    &::before {
      content: '';
      display: block;
      border-width: 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent rgba(74, 76, 91, 0.8);
    }
  }
  &[data-direction='top'] {
    .md-tip-indicator {
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      margin-top: -6px;
    }
  }
  &[data-direction='bottom'] {
    .md-tip-indicator {
      bottom: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      margin-bottom: -2px;
      &::before {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
  }
  &[data-direction='left'] {
    .md-tip-indicator {
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      margin-left: -8px;
      &::before {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
      }
    }
  }
  &[data-direction='right'] {
    .md-tip-indicator {
      top: 50%;
      right: 0;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      margin-right: -8px;
      &::before {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
    }
  }
}
</style>
