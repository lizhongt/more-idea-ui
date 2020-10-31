<template>
  <div class="fly-radio-container" :class="computedContanierClass">
    <label class="fly-radio-wrap fb fb-cross-center" :class="computedWrapClass">
      <input
        type="radio"
        :disabled="disabled"
        v-model="checkValue"
        :value="name"
      />
      <span
        class="fly-radio-icon"
        :class="{ 'fly-no-default': computedIconSlot }"
      >
        <slot name="icon"
          ><i class="iconfont default-icon" :style="computedStyles"
            >&#xe6cc;</i
          ></slot
        >
      </span>
      <slot
        ><span class="fly-radio-label" v-if="label">{{ label }} </span></slot
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'FlyRadio',
  components: {},
  inject: ['radioGroup'],
  props: {
    name: {
      type: String,
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
      checkValue: this.name
    }
  },
  computed: {
    computedContanierClass() {
      return [
        this.position === 'left' ? `fly-radio-${this.position}` : '',
        this.circle ? 'fly-radio-circle' : '',
        this.radioGroup.horizontal ? 'fly-horizental' : ''
      ]
    },
    computedWrapClass() {
      return {
        'fly-checked': this.checkValue === this.name,
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
      this.radioGroup.radioValue = val
    },
    value() {
      this.checkValue = this.value
    },
    'radioGroup.radioValue'() {
      this.checkValue = this.radioGroup.radioValue
    }
  },
  beforeCreate() {},
  created() {
    if (this.radioGroup.radioValue !== void 0) {
      this.checkValue = this.radioGroup.radioValue
    }
  },
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
.fly-radio-container {
  width: 100%;
  &.fly-horizental {
    width: auto;
    .fly-radio-wrap {
      padding: 0 12px 8px 0;
    }
  }
  .fly-radio-wrap {
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
    .fly-radio-label {
      margin-left: 8px;
      line-height: 20px;
      color: rgba($color-MAIN, 1);
    }
    .fly-radio-icon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      color: rgba($color-MAIN, 0.4);
      border: 1px solid rgba($color-MAIN, 0.4);
      border-radius: 50%;
      -webkit-transition-duration: 0.2s;
      transition-duration: 0.2s;
      -webkit-transition-property: color, border-color, background-color;
      transition-property: color, border-color, background-color;
      &.fly-no-default {
        border: 1px solid transparent;
        border-radius: none;
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
      .fly-radio-icon {
        border: 1px solid transparent;
        i.default-icon {
          color: rgba($color-PRIMARY, 1);
          transform: scale(1.1);
        }
      }
      &.fly-disabled {
        .fly-radio-icon {
          i.default-icon {
            color: $color-PRIMARY-DISABLED;
          }
        }
      }
    }
    &.fly-disabled {
      .fly-radio-label {
        color: rgba($color-MAIN, 0.4);
      }
      .fly-radio-icon {
        i.default-icon {
          color: transparent;
        }
      }
    }
  }
  &.fly-radio-left {
    .fly-radio-label {
      margin-left: 0px;
    }
    .fly-radio-icon {
      position: absolute;
      right: 0;
    }
  }
}
</style>
