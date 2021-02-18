<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-12-27 09:41:18
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 14:27:05
-->
<template>
  <div class="w-full h-full page-content">
    <md-anchor>Switch + 自定义颜色</md-anchor>
    <div class="button-group p-0-16">
      <md-button class="mt-12 w-full">主要按钮</md-button>
      <md-button type="submary" class="mt-12 w-full">次要按钮</md-button>
      <md-button type="default" class="mt-12 w-full">默认按钮</md-button>
      <md-button type="warning" class="mt-12 w-full">警告按钮</md-button>
      <md-button type="text" class="mt-12">文字按钮</md-button>
    </div>
    <md-anchor>按钮不可点击</md-anchor>
    <div class="button-group p-0-16">
      <md-button disabled class="mt-12 w-full">主要按钮</md-button>
      <md-button disabled type="submary" class="mt-12 w-full"
        >次要按钮</md-button
      >
      <md-button disabled type="default" class="mt-12 w-full"
        >默认按钮</md-button
      >
      <md-button disabled type="warning" class="mt-12 w-full"
        >警告按钮</md-button
      >
      <md-button disabled type="text" class="mt-12">文字按钮</md-button>
    </div>
    <md-anchor>按钮加载中</md-anchor>
    <div class="button-group p-0-16">
      <md-button disabled :loading="true" class="mt-12 ">主要按钮</md-button>
    </div>
    <md-anchor>圆角大小</md-anchor>
    <div class="button-group p-0-16">
      <div class="fb fb-row fb-main-between fb-cross-center">
        <md-button size="large">大号按钮</md-button>
        <md-button size="medium">中号按钮</md-button>
        <md-button size="small">小号按钮</md-button>
      </div>
    </div>
    <md-anchor>朴素按钮</md-anchor>
    <div class="button-group p-0-16">
      <md-button class="mt-12" plain size="medium">主要按钮</md-button>
      <md-button type="submary" plain size="medium" class="mt-12"
        >次要按钮</md-button
      >
      <md-button type="default" plain size="medium" class="mt-12"
        >默认按钮</md-button
      >
      <md-button
        icon="&#xe693;"
        type="warning"
        plain
        size="medium"
        class="mt-12"
        >自定义图标</md-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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

<style lang="scss" scoped></style>
