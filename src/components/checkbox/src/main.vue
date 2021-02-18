<template>
  <div class="md-checkbox-container" :class="computedContanierClass">
    <label
      class="md-checkbox-wrap fb fb-cross-center"
      :class="computedWrapClass"
    >
      <input type="checkbox" :disabled="disabled" v-model="checkValue" />
      <span
        class="md-checkbox-icon"
        :class="{ 'md-no-border': computedIconSlot }"
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
        ><span class="md-checkbox-label" v-if="label">{{ label }} </span></slot
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'MdCheckbox',
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
        this.position === 'left' ? `md-checkbox-${this.position}` : '',
        this.circle ? 'md-checkbox-circle' : ''
      ]
    },
    computedWrapClass() {
      return {
        'md-checked': this.checkValue,
        'fb-main-between': this.position !== 'follow',
        'md-disabled': this.disabled
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
.md-checkbox-container {
  width: 100%;
  padding: 0 16px;
  .md-checkbox-wrap {
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
    .md-checkbox-label {
      margin-left: 8px;
      line-height: 20px;
      @include color('MAIN');
    }
    .md-checkbox-icon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      border-width: 1px;
      border-style: solid;
      @include border();
      border-radius: 4px;
      -webkit-transition-duration: 0.2s;
      transition-duration: 0.2s;
      -webkit-transition-property: color, border-color, background-color;
      transition-property: color, border-color, background-color;
      &.md-no-border {
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
    &.md-checked {
      cursor: not-allowed;
      .md-checkbox-icon {
        border: 1px solid transparent;
        i.default-icon {
          @include color();
          transform: scale(1.1);
        }
      }
      &.md-disabled {
        .md-checkbox-icon {
          i.default-icon {
            @include color('PRIMARY-DISABLED');
          }
        }
      }
    }
    &.md-disabled {
      .md-checkbox-label {
        @include color('MAIN', 0.4);
      }
      .md-checkbox-icon {
        i.default-icon {
          color: transparent;
        }
      }
    }
  }
  &.md-checkbox-left {
    .md-checkbox-label {
      margin-left: 0px;
    }
    .md-checkbox-icon {
      position: absolute;
      right: 0;
    }
  }
  &.md-checkbox-circle {
    .md-checkbox-icon {
      border-radius: 50%;
    }
  }
}
</style>
