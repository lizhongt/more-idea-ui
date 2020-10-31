<template>
  <div class="fly-checkbox-container" :class="computedContanierClass">
    <label
      class="fly-checkbox-wrap fb fb-cross-center"
      :class="computedWrapClass"
    >
      <input type="checkbox" :disabled="disabled" v-model="checkValue" />
      <span
        class="fly-checkbox-icon"
        :class="{ 'fly-no-border': computedIconSlot }"
      >
        <slot name="icon"
          ><i
            class="iconfont default-icon"
            :style="computedStyles"
            v-html="circle ? '&#xe66e;' : '&#xe6ca;'"
          ></i
        ></slot>
      </span>
      <slot
        ><span class="fly-checkbox-label" v-if="label">{{ label }} </span></slot
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'FlyCheckbox',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'follow',
      validator(val) {
        return ~['follow', 'left', 'right'].indexOf(val)
      }
    },
    circle: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkValue: this.value
    }
  },
  computed: {
    computedContanierClass() {
      return [
        this.position === 'left' ? `fly-checkbox-${this.position}` : '',
        this.circle ? 'fly-checkbox-circle' : ''
      ]
    },
    computedWrapClass() {
      return {
        'fly-checked': this.checkValue,
        'fb-main-between': this.position !== 'follow',
        'fly-disabled': this.disabled
      }
    },
    computedStyles() {
      if (this.color && this.checkValue) {
        return {
          color: this.color
        }
      }
      return {}
    },
    computedIconSlot() {
      return !!this.$slots.icon
    }
  },
  watch: {
    checkValue(val) {
      this.$emit('input', val)
    },
    value() {
      this.checkValue = this.value
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getStyles() {
      if (this.size && this.circle) {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`
        }
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.fly-checkbox-container {
  width: 100%;
  .fly-checkbox-wrap {
    position: relative;
    > input {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .fly-checkbox-label {
      margin-left: 8px;
      line-height: 20px;
      color: rgba($color-MAIN, 1);
    }
    .fly-checkbox-icon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      color: rgba($color-MAIN, 0.4);
      border: 1px solid rgba($color-MAIN, 0.4);
      border-radius: 4px;
      -webkit-transition-duration: 0.2s;
      transition-duration: 0.2s;
      -webkit-transition-property: color, border-color, background-color;
      transition-property: color, border-color, background-color;
      &.fly-no-border {
        border: 1px solid transparent;
      }
      i.default-icon {
        position: absolute;
        top: 0;
        left: 0;
        color: transparent;
        transform: scale(0.4);
        transition: all 0.2s;
      }
    }
    &.fly-checked {
      cursor: not-allowed;
      .fly-checkbox-icon {
        border: 1px solid transparent;
        i.default-icon {
          color: rgba($color-PRIMARY, 1);
          transform: scale(1.1);
        }
      }
      &.fly-disabled {
        .fly-checkbox-icon {
          i.default-icon {
            color: $color-PRIMARY-DISABLED;
          }
        }
      }
    }
    &.fly-disabled {
      .fly-checkbox-label {
        color: rgba($color-MAIN, 0.4);
      }
      .fly-checkbox-icon {
        i.default-icon {
          color: transparent;
        }
      }
    }
  }
  &.fly-checkbox-left {
    .fly-checkbox-label {
      margin-left: 0px;
    }
    .fly-checkbox-icon {
      position: absolute;
      right: 0;
    }
  }
  &.fly-checkbox-circle {
    .fly-checkbox-icon {
      border-radius: 50%;
    }
  }
}
</style>
