<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-05 14:43:16
 * @LastEditors: lizt
 * @LastEditTime: 2020-11-10 09:18:26
-->
<template>
  <div class="md-upload-btn">
    <slot>
      <div class="md-upload-wrap fb fb-cross-center fb-main-center"
        ><i class="iconfont">&#xe607;</i></div
      >
    </slot>
    <input
      class="md-upload-input"
      type="file"
      @change="changeHandler"
      :multiple="multiple"
      :accept="accept"
    />
  </div>
</template>

<script>
// 详细参数https://blog.csdn.net/aGreetSmile/article/details/100030301
// import lrz from 'lrz'

export default {
  name: 'MdUploadButton',
  components: {},
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: this.value
    }
  },
  computed: {},
  watch: {
    fileList(newFiles) {
      this.$emit('input', newFiles)
    }
  },
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
    changeHandler(e) {
      const fileEle = e.currentTarget
      const files = fileEle.files
      if (files) {
        this.$parent.addFiles(files)
        fileEle.value = null
      }
    }
  }
}
</script>

<style lang="scss">
.md-upload-btn {
  position: relative;
  .md-upload-wrap {
    position: relative;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    background-color: #f7f8fa;
    font-size: 24px;
  }
  .md-upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
  }
}
</style>
