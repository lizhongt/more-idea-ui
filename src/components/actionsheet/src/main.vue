<template>
  <transition name="fade">
    <popup
      v-show="isVisible"
      @mask-click="handlerToCancel"
      :mask-closable="true"
    >
      <div class="sheet-container">
        <div class="sheet-list fb fb-col fb-main-center">
          <div class="sheet-title item-flex-1">{{ title }}</div>
          <div class="sheet-items">
            <div
              v-for="(item, index) in actions"
              :key="`sheet-item-${index}`"
              class="sheet-item"
              :class="{ active: active === index }"
              @click.stop="handlerToChoose(item, index)"
              >{{ item.name }}</div
            ></div
          >
        </div>
        <slot name="button">
          <div class="button-con" @click="handlerToCancel">
            {{ cancelText }}
          </div>
        </slot>
      </div>
    </popup>
  </transition>
</template>

<script>
import Popup from '../../popup'
import visibleMixin from '~/mixins/visible'
export default {
  name: 'MdActionSheet',
  components: { Popup },
  mixins: [visibleMixin],
  props: {
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: [String, Number],
      default: -1
    },
    title: {
      type: String,
      default: '请选择'
    },
    cancelText: {
      type: String,
      default: '取消'
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
    handlerToCancel() {
      this.isVisible = false
      this.$emit('cancel', this.isVisible)
    },
    handlerToChoose(item, index) {
      this.isVisible = false
      this.$emit('choose', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.sheet-container {
  text-align: center;
  .sheet-list {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    margin-bottom: 8px;
    width: 100%;
    background: #ffffff;
  }
  .sheet-items {
    max-height: 400px;
    overflow-y: scroll;
    .sheet-item {
      height: 56px;
      line-height: 56px;
      @include color('THIRDMARY');
      font-size: 17px;
      padding: 0 16px text;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-style: solid;
      border-width: 0 0px 1px 0;
      @include border(0.04);
      &:last-child {
        border-bottom: none;
      }
      &:active {
        @include background('MAIN', 0.4);
      }
      &.active {
        @include color();
      }
    }
  }
  .sheet-title {
    height: 56px;
    line-height: 56px;
    @include color('THIRDMARY', 0.56);
    font-size: 14px;
    border-style: solid;
    border-width: 0 0px 1px 0;
    @include border(0.04);
  }
  .button-con {
    background: #ffffff;
    height: 56px;
    line-height: 56px;
    @include color('THIRDMARY');
    text-align: center;
    font-size: 17px;
    font-weight: 400;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  .sheet-container {
    transition: all 0.3s ease;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  .sheet-container {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
