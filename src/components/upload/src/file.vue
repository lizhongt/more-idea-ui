<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 20:39:16
 * @LastEditors: lizt
 * @LastEditTime: 2020-11-05 14:55:08
-->
<template>
  <div class="md-upload-file" @click="clickHandler">
    <slot>
      <div class="md-upload-preview" :style="computedFileStyle">
        <img :src="file.url" :alt="file.name" class="md-upload-image" />
      </div>
      <div class="md-upload-delete">
        <i class="iconfont" @click.stop="deleteHandler">&#xe6f3;</i>
      </div>
    </slot>
  </div>
</template>

<script>
// 详细参数https://blog.csdn.net/aGreetSmile/article/details/100030301
// import lrz from 'lrz'

export default {
  name: 'MdUploadFile',
  components: {},
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fileList: this.value
    }
  },
  computed: {
    computedFileStyle() {
      const url = this.file.url || this.file.base64
      if (!url) {
        return
      }
      return {
        'background-image': `url("${url}")`
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
    clickHandler() {
      this.$emit('click', this.file)
    },
    deleteHandler() {
      this.$parent.removeFile(this.file)
    }
  }
}
</script>

<style lang="scss">
.md-upload-file {
  position: relative;
  margin: 0 8px 8px 0;
  cursor: pointer;
  .md-upload-preview {
    position: relative;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    background: #ffffff no-repeat center;
    background-size: cover;
    border-radius: 2px;
    .md-upload-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .md-upload-delete {
    position: absolute;
    z-index: 2;
    top: 0px;
    right: 0px;
    color: #ffffff;
    border-radius: 0 0 0 12px;
    width: 14px;
    height: 14px;
    @include background('MAIN', 0.56);
    .iconfont {
      position: absolute;
      top: -2px;
      right: -2px;
      display: inline-block;
      font-size: 16px;
      transform: scale(0.5);
    }
  }
}
</style>
