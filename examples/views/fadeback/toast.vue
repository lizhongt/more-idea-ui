<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-18 09:45:10
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-15 16:53:49
-->
<template>
  <div class="w-full h-full p-12-0 p-0-16">
    <md-button @click="visible = true" class="mt-12 w-full"
      >注册组件调用</md-button
    >
    <md-toast v-model="visible" content="弹框内容"> </md-toast>
    <md-button @click="text" class="mt-12 w-full">文字提示</md-button>
    <md-button @click="loading" class="mt-12 w-full">加载提示</md-button>
    <md-button @click="success" class="mt-12 w-full">成功提示</md-button>
    <md-button @click="fail" class="mt-12 w-full">失败提示</md-button>
    <md-button @click="zdy" class="mt-12 w-full">自定义图标</md-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      visible: false
    }
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
    text() {
      this.$Toast({
        content: '纯文本'
      }).show()
    },
    loading() {
      this.$Toast({
        type: 'loading',
        content: '加载中'
      }).show()
    },
    success() {
      this.$Toast({
        type: 'success',
        content: '超长成功提示可能换行'
      }).show()
    },
    fail() {
      this.$Toast({
        type: 'fail',
        content: '操作失败',
        onHide() {
          console.log('回调')
        }
      }).show()
    },
    zdy() {
      this.$Toast(
        {
          type: 'success',
          content: '自定义图标'
        },
        createElement => {
          return [
            createElement('div', {
              class: ['zdy-icon'],
              slot: 'icon'
            })
          ]
        }
      ).show()
    }
  }
}
</script>

<style lang="scss">
.zdy-icon {
  width: 48px;
  height: 48px;
  @include background('PRIMARY');
  color: #fff;
}
</style>
