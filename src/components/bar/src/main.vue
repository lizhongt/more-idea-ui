<template>
  <div v-if="isVisible" class="md-bar" :class="computedClass">
    <slot name="content">
      <slot name="icon"
        ><i
          class="bar-former-icon iconfont"
          v-html="type === 'info' ? '&#xe693;' : '&#xe6fb;'"
        ></i
      ></slot>
      <div class="bar-content"><slot></slot></div
      ><i
        @click="closeHandler"
        v-if="type === 'info' || closabe"
        class="bar-close-icon iconfont"
        >&#xe6f3;</i
      ></slot
    >
  </div>
</template>

<script>
export default {
  name: 'MdBar',
  props: {
    type: {
      type: String,
      default: 'info',
      validator(val) {
        return ~['info', 'warning'].indexOf(val)
      }
    },
    closabe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClass() {
      let cls = [`bar-${this.type}`]
      if (!(this.type === 'info' || this.closabe)) {
        cls.push('unclosable')
      }
      return cls
    }
  },
  watch: {},
  components: {},
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    closeHandler() {
      this.isVisible = false
      this.$emit('close')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.md-bar {
  width: 100%;
  padding: 12px 44px;
  position: relative;
  font-size: 15px;
  &.bar-info {
    @include color('PRIMARY');
    background-color: #e6f2fe;
  }
  &.bar-warning {
    @include color('WARNNING');
    background: #fdeae8;
  }
  &.unclosable {
    padding-right: 16px;
  }
  .bar-former-icon,
  .bar-close-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
  }
  .bar-close-icon {
    right: 16px;
    left: initial;
    color: rgba(17, 31, 44, 0.28);
    cursor: pointer;
  }
  .bar-content {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
