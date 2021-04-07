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
    <div
      class="picture-view fb fb-center-center fb-main-center"
      :style="getOriginImg"
    >
      <span v-show="!originImg">请选择图片</span>
    </div>
    <md-anchor text="图片裁剪后"></md-anchor>
    <div
      class="picture-view fb fb-center-center fb-main-center"
      :style="getCuttedImg"
    >
      <span v-show="!cuttedImg">请选择图片</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      files: [],
      originImg: null,
      cuttedImg: null
    }
  },
  computed: {
    getOriginImg() {
      return this.originImg
        ? {
            backgroundImage: `url(${this.originImg})`
          }
        : {}
    },
    getCuttedImg() {
      return this.cuttedImg
        ? {
            backgroundImage: `url(${this.cuttedImg})`
          }
        : {}
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
    onSubmit(files) {
      let _that = this
      this.originImg = files[0].content
      let cutter = this.$Cutter({
        file: files[0].content,
        onCancel() {
          cutter.hide()
        },
        onConfirm(resp) {
          _that.cuttedImg = resp
        }
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
.picture-view {
  width: 300px;
  height: 200px;
  border: 1px solid #e6e6e6;
  margin-left: 16px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
