<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2021-04-01 18:32:58
-->
<template>
  <div class="w-full h-full">
    <md-anchor text="选择图片"></md-anchor>
    <md-upload
      class="pl-16"
      v-model="files"
      :max-count="1"
      :on-submit="onSubmit"
    ></md-upload>
    <md-anchor text="图片裁剪前"></md-anchor>
    <div class="picture-view fb fb-center-center fb-main-center">
      <span class="">请选择图片</span>
    </div>
    <md-anchor text="图片裁剪后"></md-anchor>
    <div class="picture-view fb fb-center-center fb-main-center">
      <span class="">请选择图片</span>
    </div>
    <md-cutter
      file="https://img.yzcdn.cn/vant/apple-2.jpg"
      v-model="visible"
    ></md-cutter>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      files: [],
      visible: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    setTimeout(() => {
      this.visible = true
    }, 500)
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.picture-view {
  width: 300px;
  height: 200px;
  border: 1px solid #e6e6e6;
  margin-left: 16px;
}
</style>
