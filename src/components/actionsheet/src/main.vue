<template>
  <transition name="fade">
    <div class="action-sheet-wrapper" v-show="open" @click="handlerToCancel">
      <div class="sheet-container">
        <div class="sheet-body">
          <div class="sheet-list fb fb-col fb-main-center">
            <div class="sheet-title item-flex-1">{{ title }}</div>
            <div class="sheet-items">
              <div
                v-for="(item, index) in actions"
                :key="`sheet-item-${index}`"
                class="sheet-item"
                @click.stop="handlerToChoose(item, index)"
                >{{ item.name }}</div
              ></div
            >
          </div>
          <slot name="button">
            <div class="button-con" @click.stop="handlerToCancel">
              {{ cancelText }}
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    open: {
      type: Boolean,
      default: true
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
      this.$emit('cancel', !this.open)
    },
    handlerToChoose(item, index) {
      this.$emit('choose', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.action-sheet-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(25, 31, 37, 0.28);
  z-index: 1;
  .sheet-container {
    position: relative;
    height: 100%;
  }
  .sheet-body {
    width: 100%;
    position: absolute;
    bottom: 0px;
    .sheet-list {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      text-align: center;
      background: #ffffff;
      margin-bottom: 8px;
    }
    .sheet-items {
      max-height: 400px;
      overflow-y: scroll;
      .sheet-item {
        height: 56px;
        line-height: 56px;
        color: $color-THIRDMARY;
        font-size: 17px;
        border-bottom: $color-BORDER;
        padding: 0 16px text;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .sheet-title {
      height: 56px;
      line-height: 56px;
      color: rgba($color-THIRDMARY, 0.56);
      font-size: 14px;
      border-bottom: $color-BORDER;
    }
  }
  .button-con {
    background: #ffffff;
    height: 56px;
    line-height: 56px;
    color: $color-THIRDMARY;
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
