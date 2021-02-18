<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-18 09:45:10
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-07 20:19:33
-->
<template>
  <div class="w-full h-full p-12-0 p-0-16">
    <md-button @click="open = true" class="mt-12 w-full">基本用法</md-button>
    <md-button @click="openMultiPicker" class="mt-12 w-full"
      >多列用法</md-button
    >
    <md-button @click="openMultiPicker2" class="mt-12 w-full"
      >设置头部</md-button
    >
    <md-picker
      v-model="open"
      :columns="column1"
      :default-active="defaultActive"
      @confirm="confirm"
      @cancel="cancel"
    >
    </md-picker>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      open: false,
      column1: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      column2: [
        {
          options: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          defaultActive: 0
        },
        {
          options: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期天'
          ],
          defaultActive: 0
        }
      ],
      defaultActive: 0
    }
  },
  computed: {
    computedAutoPlay: {
      set(val) {
        this.options.autoplay = val
      },
      get() {
        return !!this.options.autoplay
      }
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
    openMultiPicker() {
      let _that = this
      this.$Picker({
        $props: {
          value: this.open,
          columns: this.column2
        },
        $events: {
          cancel() {
            _that.cancel()
          },
          confirm(index, value) {
            _that.confirm(index, value)
          }
        }
      }).show()
    },
    openMultiPicker2() {
      let _that = this
      this.$Picker({
        $props: {
          value: this.open,
          columns: this.column1,
          defaultActive: this.defaultActive,
          title: '标题'
        },
        $events: {
          cancel() {
            _that.cancel()
          },
          confirm(index, value) {
            _that.confirm(index, value)
          }
        }
      }).show()
    },
    cancel() {
      this.$Toast({
        content: `取消`
      }).show()
    },
    confirm(index, value) {
      this.$Dialog({
        content: `index--> ${index}, value--> ${JSON.stringify(value)}`,
        icon: '&#xe666;'
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe-item b {
  display: block;
  font-weight: bold;
  color: #14ade5;
  font-size: 20px;
  text-align: center;
  padding: 100px 10px;
  margin: 0 10px 10px 10px;
  box-shadow: 0 1px #ebebeb;
  background: #fff;
  border-radius: 3px;
  border: 1px solid;
  border-color: #e5e5e5 #d3d3d3 #b9c1c6;
}
</style>
