<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-09-28 13:44:24
 * @LastEditors: lizt
 * @LastEditTime: 2020-10-09 11:21:07
-->
<template>
  <button href="javascript:" class="flyui-btn" :class="classNames">
    <i
      class="iconfont fly-ui--left flyui-btn_loading"
      v-if="(loading || icon) && type !== 'text'"
      v-html="loading ? '&#xe62b;' : icon"
    ></i
    ><slot>默认按钮</slot></button
  >
</template>

<script>
export default {
  name: 'FlyButton',
  components: {},
  props: {
    // 按钮大小 large | medium | small | mini
    size: {
      type: String,
      default: 'large'
    },
    // 是否禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 按钮类型 primary / submary / warning / default / text
    type: {
      type: String,
      default: 'primary'
    },
    // 是否圆形按钮
    circle: {
      type: Boolean,
      default: false
    },
    // 图标类名
    icon: String,
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 是否朴素按钮
    plain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    classNames() {
      let _class = []
      if (this.type !== 'text') {
        _class = [
          `flyui-btn_${this.type}`,
          `flyui-btn--${this.size}`,
          this.circle ? 'flyui-btn_circle' : '',
          this.plain ? 'flyui-btn_plain' : '',
          this.disabled ? 'flyui-btn_disabled' : ''
        ]
      } else {
        _class = [`flyui-btn_text`, this.disabled ? 'flyui-btn_disabled' : '']
      }
      return _class
    }
  },
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
  methods: {}
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes loading {
  form {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.flyui-btn {
  line-height: 1;
  display: block;
  text-align: center;
  color: $color-DEFAULT;
  outline: none;
  border-radius: 6px;
  font-size: 16px;
  &.flyui-btn--default,
  &.flyui-btn--large {
    padding: 12px 24px;
    border-radius: 6px;
  }
  &.flyui-btn--medium {
    padding: 8px 16px;
    border-radius: 18px;
  }
  &.flyui-btn--small {
    padding: 5px 12px;
    border-radius: 14px;
  }
  &.flyui-btn_primary {
    background-color: $color-PRIMARY;
    border: 1px solid $color-BORDER;
    &:active {
      background-color: $color-PRIMARY-TAP;
    }
    &.flyui-btn_plain {
      color: $color-PRIMARY;
      border: 1px solid $color-PRIMARY;
      background-color: $color-DEFAULT;
      &:active {
        color: $color-DEFAULT;
        background-color: $color-PRIMARY-TAP;
      }
    }
    &.flyui-btn_disabled {
      background-color: $color-PRIMARY-DISABLED;
      cursor: not-allowed;
      &.flyui-btn_plain {
        color: rgba($color-PRIMARY, 0.4);
        border: 1px solid rgba($color-PRIMARY, 0.4);
        background-color: $color-DEFAULT;
      }
    }
  }
  &.flyui-btn_submary {
    color: $color-MAIN;
    background-color: $color-SUBMARY;
    border: 1px solid $color-BORDER;
    &:active {
      background-color: $color-SUBMARY-TAP;
    }
    &.flyui-btn_plain {
      border: 1px solid rgba($color-MAIN, 0.28);
      background-color: $color-SUBMARY;
      &:active {
        color: $color-MAIN;
        background-color: $color-SUBMARY-TAP;
      }
    }
    &.flyui-btn_disabled {
      background-color: $color-SUBMARY-DISABLED;
      cursor: not-allowed;
      &.flyui-btn_plain {
        color: $color-MAIN;
        border: 1px solid rgba($color-MAIN, 0.28);
        background-color: $color-SUBMARY-DISABLED;
      }
    }
  }
  &.flyui-btn_default {
    color: $color-MAIN;
    background-color: $color-DEFAULT;
    border: 1px solid $color-BORDER;
    &:active {
      background-color: $color-DEFAULT-TAP;
    }
    &.flyui-btn_plain {
      border: 1px solid rgba($color-MAIN, 0.08);
      background-color: $color-DEFAULT;
      &:active {
        border: 1px solid $color-BORDER;
        background-color: $color-DEFAULT-TAP;
      }
    }
    &.flyui-btn_disabled {
      background-color: $color-DEFAULT-DISABLED;
      cursor: not-allowed;
      &.flyui-btn_plain {
        border: 1px solid $color-BORDER;
        background-color: $color-DEFAULT-DISABLED;
      }
    }
  }
  &.flyui-btn_warning {
    background-color: $color-WARNNING;
    border: 1px solid $color-BORDER;
    &:active {
      background-color: $color-WARNNING-TAP;
    }
    &.flyui-btn_plain {
      color: $color-WARNNING;
      border: 1px solid $color-WARNNING;
      background-color: $color-DEFAULT;
      &:active {
        color: $color-DEFAULT;
        border: 1px solid $color-BORDER;
        background-color: $color-WARNNING-TAP;
      }
    }
    &.flyui-btn_disabled {
      background-color: $color-WARNNING-DISABLED;
      cursor: not-allowed;
      &.flyui-btn_plain {
        color: $color-DEFAULT;
        border: 1px solid $color-BORDER;
        background-color: $color-WARNNING-DISABLED;
      }
    }
  }
  &.flyui-btn_text {
    color: $color-PRIMARY;
    border: none;
    padding: 12px 0px;
    &.flyui-btn_disabled {
      color: rgba($color-MAIN, 0.4);
      cursor: not-allowed;
    }
  }
  .fly-ui--left {
    display: inline-block;
    vertical-align: baseline;
    margin-right: 4px;
  }
  .fly-ui--right {
    display: inline-block;
    vertical-align: baseline;
    margin-left: 4px;
  }
  .flyui-btn_loading {
    animation: loading 2s linear infinite;
  }
}
</style>
