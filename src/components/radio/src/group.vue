<template>
  <div class="md-radio-group" :class="computedClass" ref="group">
    <slot>
      <md-radio
        v-for="(option, index) in options"
        :key="index"
        :label="option.label"
        :name="option.name"
        :position="position"
        :color="color"
      >
      </md-radio>
    </slot>
  </div>
</template>
<script>
import MdRadio from './main'

export default {
  name: 'MdRadioGroup',
  components: { MdRadio },
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
    },
    position: {
      type: String,
      default: 'follow',
      validator(val) {
        return ~['follow', 'left', 'right'].indexOf(val)
      }
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
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
        'fb fb-cross-center fb-wrap fb-horizontal': this.horizontal
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
  methods: {
    getStyles(name) {
      return {
        color: name === this.value ? this.activeColor : this.inactiveColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.md-radio-group {
  &.fb-horizontal {
    padding: 0 16px;
  }
}
</style>
