<template>
  <div class="fly-radio-group" :class="computedClass" ref="group">
    <slot>
      <fly-radio
        v-for="(option, index) in options"
        :key="index"
        :option="option"
      >
      </fly-radio>
    </slot>
  </div>
</template>
<script>
import FlyRadio from './main'

export default {
  name: 'FlyRadioGroup',
  components: { FlyRadio },
  provide() {
    return {
      radioGroup: this
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radioValue: this.value
    }
  },
  computed: {
    computedClass() {
      return {
        'fb fb-cross-center fb-wrap': this.horizontal
      }
    }
  },
  watch: {
    radioValue(val) {
      this.$emit('input', val)
    },
    value() {
      this.radioValue = this.value
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
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.fly-radio-container {
  width: 100%;
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
