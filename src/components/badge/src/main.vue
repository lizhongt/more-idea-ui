<template>
  <div class="fly-badge-container">
    <em
      class="fly-badge fb fb-cross-center fb-main-center"
      :class="[circle && 'fly-badge-circle', color && `fly-${color}-color`]"
      :style="getStyles()"
    >
      <slot name="content">{{ content }}</slot>
    </em>
  </div>
</template>

<script>
export default {
  name: 'FlyBadge',
  components: {},
  props: {
    content: {
      type: String,
      default: ''
    },
    circle: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 18
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
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
.fly-badge-container {
  position: relative;
  display: inline-block;
  .fly-badge {
    font-size: 12px;
    color: $color-DEFAULT;
    padding: 0 6px;
    line-height: 1.5;
    font-style: normal;
    border-radius: 8px;
    overflow: hidden;
    &.fly-badge-circle {
      border-radius: 50%;
      padding: 0;
      width: 18px;
      height: 18px;
      overflow: hidden;
    }
  }
  .fly-submary-color {
    background-color: $color-SUBMARY;
  }
  .fly-primary-color {
    background-color: $color-PRIMARY;
  }
  .fly-warning-color {
    background-color: $color-WARNNING;
  }
  .fly-transparent-color {
    background: rgba($color-DEFAULT, 0);
  }
}
</style>
