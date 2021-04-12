<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-16 09:11:47
 * @LastEditors: lizt
 * @LastEditTime: 2021-04-12 17:10:42
-->
<template>
  <div class="md-picker-wrapper item-flex-1">
    <ul class="md-picker-column">
      <li
        class="md-picker-item fb fb-main-center fb-cross-center"
        v-for="(item, index) in options"
        :key="index"
        :style="computedStyle"
        @click.stop="clickHandler(index)"
        >{{ item }}</li
      >
    </ul>
  </div>
</template>

<script>
import Picker from '~/plugins/picker-core'
export default {
  name: 'picker-column',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    visibleItemCount: [Number, String],
    itemHeight: Number,
    defaultActive: Number,
    childIndex: Number
  },
  inject: ['$picker'],
  data() {
    return {
      active: false,
      $inst: null
    }
  },
  computed: {
    computedStyle() {
      return this.itemHeight
        ? {
            height: `${this.itemHeight}px`
          }
        : null
    }
  },
  watch: {},
  methods: {
    clickHandler(index) {
      this.$inst.locate(index)
    },
    onChange(_index) {
      this.$picker.selectedIndex[this.childIndex] = _index
      this.$picker.selectedValues[this.childIndex] = this.options[_index]
    }
  },
  mounted() {
    let _that = this
    this.$nextTick(() => {
      this.$inst = new Picker(this.$el.children[0], {
        change: function(index) {
          _that.onChange(index)
        }
      })
    })
  }
}
</script>

<style lang="scss">
.md-picker-wrapper {
  overflow: hidden;
  font-size: 17px;
  .md-picker-column {
    width: 100%;
    -webkit-transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
    transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
    .md-picker-item {
      @include color('MAIN');
      padding: 0 4px;
      height: 44px;
    }
  }
}
</style>
