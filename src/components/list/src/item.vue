<template>
  <li
    class="fly-list-item"
    :class="{
      'two-line': rootList.textline === 2,
      'three-line': rootList.textline === 3,
      'has-avator': avator
    }"
  >
    <div class="item-wrapper fb fb-cross-center">
      <!-- 支持整个slot传入 -->
      <slot>
        <slot class="a" name="avator"></slot>
        <div class="fly-list-item-content item-flex-1">
          <div class="fly-list-item-title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="fly-list-item-subtitle" v-if="rootList.textline > 1">
            <slot name="subtitle">{{ subTitle }}</slot>
          </div>
          <div class="fly-list-item-thirdtitle" v-if="rootList.textline === 3">
            <slot name="thirdtitle">{{ thirdTitle }}</slot>
          </div>
        </div>
        <div class="fly-list-item-ft" v-if="rootList.arrow">
          <slot name="more"></slot>
        </div>
      </slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'FlyListItem',
  components: {},
  inject: ['rootList'],
  props: {
    avator: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    thirdTitle: {
      type: String,
      default: ''
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
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
@import '~/assets/sass/icon.scss';
.fly-list-item {
  display: block;
  &:active {
    background-color: rgba($color-MAIN, 0.04);
  }
  &:first-child {
    .item-wrapper:before {
      display: none;
    }
  }
  .item-wrapper {
    height: 56px;
    padding: 0 16px;
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.1);
      color: var(--weui-FG-3);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 16px;
      z-index: 2;
    }
    .fly-list-item-content {
      // border-bottom: 1px solid $color-BORDER;
    }
    .fly-list-item-title {
      line-height: 24px;
      height: 24px;
      font-size: 17px;
      color: $color-MAIN;
    }
    .fly-list-item-subtitle,
    .fly-list-item-thirdtitle {
      line-height: 20px;
      height: 20px;
      font-size: 14px;
      color: rgba($color-MAIN, 0.4);
    }
    .avator {
      min-width: 48px;
      &.top-center {
        margin-top: -20px;
      }
    }
    .arrow {
      color: rgba($color-MAIN, 0.4);
    }
  }
  &.two-line {
    .item-wrapper {
      height: 68px;
    }
  }
  &.three-line {
    .item-wrapper {
      height: 88px;
    }
  }
  &.has-avator {
    .item-wrapper {
      height: 64px;
      &::before {
        left: 62px;
      }
    }
  }
  .fly-list-item-ft {
    padding-right: 20px;
    position: relative;
    &:after {
      font-family: 'iconfont';
      content: '\e6c4';
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: 100%;
      mask-size: 100%;
      color: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 50%;
      font-size: 16px;
      margin-top: -7px;
      right: 0;
    }
  }
}
</style>
