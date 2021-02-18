<template>
  <div class="md-tabbar" :class="{ 'unfixed-tabbar': !fixed }">
    <div
      class="tabbar-wrapper"
      :class="fixed && 'fb fb-cross-center fb-main-center'"
      ref="tabs"
    >
      <slot></slot>
      <div
        v-show="highlightWidth"
        class="md-tab-link-highlight"
        :style="{
          width: `${highlightWidth}px`,
          transform: `translate3d(${translateX}px, 0px, 0px)`
        }"
      >
        <div class="tab-indicator fb fb-main-center">
          <span
            class="hight-block"
            v-color="{ type: 1, color: indicatorColor }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdTabbar',
  components: {},
  directives: {
    color: {},
    pose: {}
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      required: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    activeColor: {
      type: String,
      required: false
    },
    inactiveColor: {
      type: String,
      required: false
    },
    indicatorColor: {
      type: String,
      required: false
    }
  },
  provide() {
    return {
      rootTab: this
    }
  },
  data() {
    return {
      highlightWidth: 0,
      activeValue: 1
    }
  },
  computed: {
    translateX() {
      return (this.activeValue - 1) * this.highlightWidth
    }
  },
  watch: {
    activeValue(value) {
      this.$emit('update:value', value)
      this.$emit('change', value)
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.highlightWidth = this.$refs.tabs.children[0].clientWidth
    this.activeValue = this.value
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    updateTab(value) {
      this.activeValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.md-tabbar {
  overflow: hidden;
  padding: 0 16px;
  @include background('DEFAULT');
  .tabbar-wrapper {
    position: relative;
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &.unfixed-tabbar {
    box-sizing: content-box !important;
    white-space: nowrap;
    .md-tab {
      flex: none;
      box-sizing: content-box !important;
      width: 62px;
      padding: 14px 16px;
      display: inline-block;
    }
  }
  .md-tab-link-highlight {
    position: absolute;
    left: 0;
    bottom: 0;
    -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    will-change: width transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    > div {
      position: relative;
      .hight-block {
        width: 24px;
        @include background('PRIMARY');
        height: 3px;
        display: inline-block;
      }
    }
  }
  .tab-indicator {
    width: 100%;
    height: 100%;
  }
}
</style>
