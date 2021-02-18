<template>
  <li
    class="md-list-item"
    :class="{
      'two-line': rootList.textline === 2,
      'three-line': rootList.textline === 3,
      'has-avator': avator
    }"
    @click="clickHanlder"
  >
    <div
      class="item-wrapper fb fb-cross-center"
      :class="{ 'md-justify': $slots.default }"
    >
      <!-- 支持整个slot传入 -->
      <slot>
        <slot class="a" name="avator"></slot>
        <div class="md-list-item-content item-flex-1">
          <div class="md-list-item-title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="md-list-item-subtitle" v-if="rootList.textline > 1">
            <slot name="subtitle">{{ subTitle }}</slot>
          </div>
          <div class="md-list-item-thirdtitle" v-if="rootList.textline === 3">
            <slot name="thirdtitle">{{ thirdTitle }}</slot>
          </div>
        </div>
        <div class="md-list-item-ft" v-if="rootList.arrow">
          <slot name="more"></slot>
        </div>
      </slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MdListItem',
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
  methods: {
    clickHanlder() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
@import '~/assets/sass/icon.scss';
@import '~/assets/sass/theme.scss';
.md-list-item {
  display: block;
  &:active {
    @include background('MAIN', 0.04);
  }
  &:first-child {
    > .item-wrapper:before {
      display: none;
    }
  }
  > .item-wrapper {
    min-height: 56px;
    padding: 0 16px;
    position: relative;
    &.md-justify {
      padding: 0px;
    }
    .md-list-item-content {
      text-align: left;
    }
    &::before {
      content: ' ';
      position: absolute;
      left: 16px;
      top: 0;
      right: 0;
      height: 2px;
      @include background('THIRDMARY', 0.08);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .md-list-item-title {
      line-height: 24px;
      height: 24px;
      font-size: 17px;
      @include color('MAIN');
    }
    .md-list-item-subtitle,
    .md-list-item-thirdtitle {
      line-height: 20px;
      height: 20px;
      font-size: 14px;
      @include color('MAIN', 0.4);
    }
    .avator {
      min-width: 48px;
      &.top-center {
        margin-top: -20px;
      }
    }
    .arrow {
      @include color('MAIN', 0.4);
    }
  }
  &.two-line {
    .item-wrapper {
      min-height: 68px;
    }
  }
  &.three-line {
    .item-wrapper {
      min-height: 88px;
    }
  }
  &.has-avator {
    .item-wrapper {
      min-height: 64px;
      &::before {
        left: 62px;
      }
    }
  }
  .md-list-item-ft {
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
