<template>
  <div class="md-radio-container" :class="computedContanierClass">
    <label class="md-radio-wrap fb fb-cross-center" :class="computedWrapClass">
      <input
        type="radio"
        :disabled="disabled"
        v-model="checkValue"
        :value="name"
      />
      <span
        class="md-radio-icon"
        :class="{ 'md-no-default': computedIconSlot }"
      >
        <slot name="icon"
          ><i class="iconfont default-icon" :style="computedStyles"
            >&#xe6cc;</i
          ></slot
        >
      </span>
      <slot
        ><span class="md-radio-label" v-if="label">{{ label }} </span></slot
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'MdRadio',
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
      checkValue: this.radioGroup.value
    }
  },
  computed: {
    computedContanierClass() {
      return [
        this.position === 'left' ? `md-radio-${this.position}` : '',
        this.circle ? 'md-radio-circle' : '',
        this.radioGroup.horizontal ? 'md-horizental' : ''
      ]
    },
    computedWrapClass() {
      return {
        'md-checked': this.checkValue === this.name,
        'fb-main-between': this.position === 'right',
        'fb-main-end': this.position === 'left',
        'md-disabled': this.disabled
      }
    },
    computedStyles() {
      if (this.color && this.name === this.radioGroup.value) {
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
.md-radio-container {
  width: 100%;
  border-width: 0 0px 1px;
  border-style: solid;
  @include border();
  &.md-horizental {
    width: auto;
    border-bottom: none;
    .md-radio-wrap {
      background: none;
      height: auto;
      padding: 0 12px 8px 0;
    }
  }
  .md-radio-wrap {
    background-color: #ffffff;
    position: relative;
    height: 56px;
    padding: 0 16px;
    > input {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .md-radio-label {
      margin-left: 8px;
      line-height: 20px;
      @include color('MAIN');
    }
    .md-radio-icon {
      position: relative;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      @include color('MAIN', 0.4);
      border-width: 1px;
      border-style: solid;
      @include border();
      border-radius: 50%;
      -webkit-transition-duration: 0.2s;
      transition-duration: 0.2s;
      -webkit-transition-property: color, border-color, background-color;
      transition-property: color, border-color, background-color;
      &.md-no-default {
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
    &.md-checked {
      cursor: not-allowed;
      .md-radio-icon {
        border: 1px solid transparent;
        i.default-icon {
          @include color('PRIMARY');
          transform: scale(1.1);
        }
      }
      &.md-disabled {
        .md-radio-icon {
          i.default-icon {
            @include color('PRIMARY-DISABLED');
          }
        }
      }
    }
    &.md-disabled {
      .md-radio-label {
        @include color('MAIN', 0.4);
      }
      .md-radio-icon {
        i.default-icon {
          color: transparent;
        }
      }
    }
  }
  &.md-radio-left {
    .md-radio-wrap {
    }
    .md-radio-label {
      margin-left: 0px;
      position: absolute;
      left: 16px;
    }
  }
}
</style>
