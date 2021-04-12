<template>
  <transition name="fade">
    <popup
      v-show="isVisible"
      @mask-click="isVisible = false"
      :mask-closable="true"
    >
      <div class="md-picker-container">
        <slot name="header">
          <header class="md-picker-header fb fb-main-between">
            <div class="cancel" @click="cancelHandler">{{ cancelText }}</div>
            <div class="title">{{ title }}</div>
            <div class="confirm" @click="confirmHandler">{{ confirmText }}</div>
          </header>
        </slot>
        <div class="md-picker-wrapper">
          <div class="md-picker-content fb">
            <column
              v-for="(options, index) in computedColumns"
              :key="index"
              :item-height="itemHeight"
              :visible-item-count="visibleItemCount"
              :options="options"
              :default-active="computedDefaultIndex[index]"
              :child-index="index"
            ></column>
          </div>
          <div class="mask" style="background-size: 100% 88px;"></div>
          <div class="high-light"></div>
        </div>
      </div>
    </popup>
  </transition>
</template>

<script>
import Column from './column'
import Popup from '../../popup'
import visibleMixin from '~/mixins/visible'
export default {
  components: { Popup, Column },
  mixins: [visibleMixin],
  name: 'MdPicker',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    title: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    defaultActive: {
      type: [Array, Number],
      default: 0
    },
    showBar: {
      type: Boolean,
      default: true
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    visibleItemCount: {
      type: Number,
      default: 5
    }
  },
  computed: {
    computedColumns() {
      if (
        Object.prototype.toString.call(this.columns[0]) === '[object Object]'
      ) {
        return this.columns.reduce((_list, item) => {
          return _list.concat([item.options])
        }, [])
      }
      return [this.columns]
    },
    computedDefaultIndex() {
      if (
        Object.prototype.toString.call(this.columns[0]) === '[object Object]'
      ) {
        return this.columns.reduce((_list, item) => {
          return _list.concat(item.defaultActive)
        }, [])
      }
      return [this.defaultActive]
    }
  },
  provide() {
    return {
      $picker: this
    }
  },
  watch: {},
  data() {
    return {
      index: 0,
      selectedIndex: [],
      selectedValues: []
    }
  },
  methods: {
    cancelHandler() {
      this.isVisible = false
      this.$emit('cancel')
    },
    confirmHandler() {
      this.isVisible = false
      this.$emit('confirm', this.selectedIndex, this.selectedValues)
    }
  },
  mounted() {
    if (Object.prototype.toString.call(this.columns[0]) === '[object Object]') {
      this.columns.forEach(item => {
        this.selectedIndex.push(item.defaultActive)
        this.selectedValues.push(item.options[item.defaultActive])
      })
    } else {
      this.selectedIndex = [this.defaultActive]
      this.selectedValues = [this.columns[this.defaultActive]]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/flex.scss';
.md-picker-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .md-picker-header {
    height: 44px;
    line-height: 44px;
    border-width: 0 0px 1px 0;
    border-style: solid;
    @include border(0.12);
    font-size: 17px;
    position: relative;
    .cancel {
      @include color('PRIMARY', 1);
      padding: 0 16px;
    }
    .title {
      max-width: 50%;
      font-weight: 500;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .confirm {
      @include color('PRIMARY');
      padding: 0 16px;
    }
  }
  .md-picker-wrapper {
    height: 220px;
    position: relative;
    display: flex;
    overflow: hidden;
    .mask {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-image: -webkit-linear-gradient(
          top,
          hsla(0, 0%, 100%, 0.9),
          hsla(0, 0%, 100%, 0.4)
        ),
        -webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
      background-image: linear-gradient(
          180deg,
          hsla(0, 0%, 100%, 0.9),
          hsla(0, 0%, 100%, 0.4)
        ),
        linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
      background-repeat: no-repeat;
      background-position: top, bottom;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      pointer-events: none;
    }
    .high-light {
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 4;
      width: 100%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      pointer-events: none;
      height: 44px;
      border-width: 1px 0px;
      border-style: solid;
      @include border();
    }
    .md-picker-content {
      position: relative;
      width: 100%;
      z-index: 3;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  .md-picker-container {
    transition: all 0.3s ease;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  .md-picker-container {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
