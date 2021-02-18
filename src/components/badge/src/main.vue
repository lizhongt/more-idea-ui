<template>
  <div class="md-badge-container">
    <em
      class="md-badge fb fb-cross-center fb-main-center"
      :class="[circle && 'md-badge-circle', color && `md-${color}-color`]"
      :style="getStyles()"
    >
      <slot name="content">{{ content }}</slot>
    </em>
  </div>
</template>

<script>
export default {
  name: 'MdBadge',
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
.md-badge-container {
  position: relative;
  display: inline-block;
  .md-badge {
    font-size: 12px;
    @include color('DEFAULT');
    padding: 0 6px;
    line-height: 1.5;
    font-style: normal;
    border-radius: 8px;
    overflow: hidden;
    &.md-badge-circle {
      border-radius: 50%;
      padding: 0;
      width: 18px;
      height: 18px;
      overflow: hidden;
    }
  }
  .md-submary-color {
    @include background('SUBMARY');
  }
  .md-primary-color {
    @include background();
  }
  .md-warning-color {
    @include background('WARNNING');
  }
  .md-transparent-color {
    @include background('DEFAULT', 0);
  }
}
</style>
