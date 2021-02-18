<template>
  <div
    class="md-switch fb fb-cross-center"
    :class="{ 'fb-main-between': label }"
  >
    <span v-if="label" class="md-switch-label">{{ label }}</span>
    <div
      class="md-switch-wrap fb fb-cross-center"
      :class="{
        'md-switch-on': checkboxValue,
        'md-switch-disabled': disabled
      }"
      :style="computedStyles"
    >
      <input
        class="md-switch-input"
        type="checkbox"
        v-model="checkboxValue"
        :disabled="disabled"
      />
      <i class="md-switch-face"></i>
    </div>
    <span v-if="!label" class="md-switch-label"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'MdSwitch',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkboxValue: this.value
    }
  },
  computed: {
    computedStyles() {
      let styles = {}
      if (this.checkboxValue && this.activeColor) {
        styles['border-color'] = this.activeColor
        styles['background-color'] = this.activeColor
      }
      if (!this.checkboxValue && this.inactiveColor) {
        styles['border-color'] = this.inactiveColor
        styles['background-color'] = this.inactiveColor
      }
      return styles
    }
  },
  watch: {
    value(newVal) {
      this.checkboxValue = newVal
    },
    checkboxValue(newVal) {
      this.$emit('input', newVal)
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
.md-switch {
  padding: 0 16px;
  width: 100%;
  &.fb-main-between {
    .md-switch-label {
      margin-left: 0;
    }
  }
  .md-switch-wrap {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 30px;
    box-sizing: content-box;
    border: 1px solid #e4e4e4;
    border-radius: 28px;
    background-color: #e4e4e4;
    .md-switch-input {
      position: absolute;
      z-index: 99;
      width: 52px;
      height: 30px;
      opacity: 0;
    }
    .md-switch-face {
      position: absolute;
      top: 0;
      left: 1px;
      z-index: 1;
      width: 28px;
      height: 28px;
      background-color: #fff;
      border-radius: 100%;
      -webkit-transition: -webkit-transform 0.4s
        cubic-bezier(0.25, 0.1, 0.25, 1.28);
      transition: -webkit-transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28);
      transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28);
      transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28),
        -webkit-transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28);
    }
    &.md-switch-on {
      @include background('PRIMARY');
      .md-switch-face {
        left: -2px;
        transform: translateX(24px);
      }
    }
  }

  .md-switch-label {
    display: block;
    margin-left: 12px;
  }
}
</style>
