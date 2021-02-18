<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-09-28 13:44:24
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 14:26:39
-->
<template>
  <button
    @click="clickHandler"
    href="javascript:"
    class="mdui-btn"
    :class="classNames"
  >
    <i
      class="iconfont md-ui--left"
      :class="{ 'mdui-btn_loading': loading }"
      v-if="(loading || icon) && type !== 'text'"
      v-html="loading ? '&#xe62b;' : icon"
    ></i
    ><slot>默认按钮</slot></button
  >
</template>

<script>
import { throttle } from 'utils/comUtils.js'
export default {
  name: 'MdButton',
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
    },
    throttle: {
      type: Number,
      default: 0
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
          `mdui-btn_${this.type}`,
          `mdui-btn--${this.size}`,
          this.circle ? 'mdui-btn_circle' : '',
          this.plain ? 'mdui-btn_plain' : '',
          this.disabled ? 'mdui-btn_disabled' : ''
        ]
      } else {
        _class = [`mdui-btn_text`, this.disabled ? 'mdui-btn_disabled' : '']
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
  methods: {
    clickHandler() {
      if (this.throttle) {
        throttle(this.clickEmitter, this.throttle)()
      } else {
        this.clickEmitter()
      }
    },
    clickEmitter() {
      this.$emit('click')
    }
  }
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
@keyframes loading {
  form {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.mdui-btn {
  line-height: 1;
  display: block;
  text-align: center;
  @include color('DEFAULT');
  outline: none;
  border-radius: 6px;
  font-size: 16px;
  &.mdui-btn--default,
  &.mdui-btn--large {
    padding: 12px 24px;
    border-radius: 6px;
  }
  &.mdui-btn--medium {
    padding: 8px 16px;
    border-radius: 18px;
    font-size: 14px;
  }
  &.mdui-btn--small {
    padding: 5px 12px;
    border-radius: 14px;
    font-size: 12px;
  }
  &.mdui-btn--mini {
    font-size: 10px;
    transform: scale(0.875);
    padding: 5px 6px;
    border-radius: 14px;
  }
  &.mdui-btn_primary {
    @include background();
    border-style: solid;
    border-width: 1px;
    @include border();
    &:active {
      @include background('PRIMARY-TAP');
    }
    &.mdui-btn_plain {
      @include color();
      border-style: solid;
      border-width: 1px;
      @include border(1, 'PRIMARY');
      @include background('DEFAULT');
      &:active {
        @include color('DEFAULT');
        @include background('PRIMARY-TAP');
      }
    }
    &.mdui-btn_disabled {
      @include background('PRIMARY-DISABLED');
      cursor: not-allowed;
      &.mdui-btn_plain {
        @include color('PRIMARY', 0.4);
        border-style: solid;
        border-width: 1px;
        @include border(0.4, 'PRIMARY');
      }
    }
  }
  &.mdui-btn_submary {
    @include color('MAIN');
    border-style: solid;
    border-width: 1px;
    @include border();
    @include background('SUBMARY');
    &:active {
      @include background('SUBMARY-TAP');
    }
    &.mdui-btn_plain {
      border-style: solid;
      border-width: 1px;
      @include border(0.28, 'MAIN');
      @include background('SUBMARY');
      &:active {
        @include color('MAIN');
        @include background('SUBMARY-TAP');
      }
    }
    &.mdui-btn_disabled {
      @include background('SUBMARY-DISABLED');
      cursor: not-allowed;
      &.mdui-btn_plain {
        @include color('MAIN');
        border-style: solid;
        border-width: 1px;
        @include border(0.28, 'MAIN');
      }
    }
  }
  &.mdui-btn_default {
    @include color('MAIN');
    border-style: solid;
    border-width: 1px;
    @include border(0.28, 'MAIN');
    @include background('DEFAULT');
    &:active {
      @include background('DEFAULT-TAP');
    }
    &.mdui-btn_plain {
      border-style: solid;
      border-width: 1px;
      @include border(0.28, 'MAIN');
      @include background('DEFAULT');
      &:active {
        @include background('DEFAULT-TAP');
      }
    }
    &.mdui-btn_disabled {
      @include background('DEFAULT-DISABLED');
      cursor: not-allowed;
      &.mdui-btn_plain {
        border-style: solid;
        border-width: 1px;
        @include border();
      }
    }
  }
  &.mdui-btn_warning {
    @include background('WARNNING');
    border-style: solid;
    border-width: 1px;
    @include border();
    &:active {
      @include background('WARNNING-TAP');
    }
    &.mdui-btn_plain {
      @include color('WARNNING');
      border-style: solid;
      border-width: 1px;
      @include border();
      @include background('DEFAULT');
      &:active {
        @include color('DEFAULT');
        @include background('WARNNING-TAP');
      }
    }
    &.mdui-btn_disabled {
      @include background('WARNNING-DISABLED');
      cursor: not-allowed;
      &.mdui-btn_plain {
        @include color('DEFAULT');
        border-style: solid;
        border-width: 1px;
        @include border();
      }
    }
  }
  &.mdui-btn_text {
    @include color();
    border: none;
    padding: 12px 0px;
    background-color: inherit;
    &.mdui-btn_disabled {
      @include color('MAIN', 0.4);
      cursor: not-allowed;
    }
  }
  .md-ui--left {
    display: inline-block;
    vertical-align: baseline;
    margin-right: 4px;
  }
  .md-ui--right {
    display: inline-block;
    vertical-align: baseline;
    margin-left: 4px;
  }
  .mdui-btn_loading {
    animation: loading 2s linear infinite;
  }
}
</style>
