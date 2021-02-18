<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2020-11-11 09:55:34
-->
<template>
  <div class="w-full h-full p-12-0">
    <md-upload
      v-model="files"
      :max-count="5"
      :before-delete="beforeDelete"
      :on-submit="onSubmit"
      @over-size="oversize"
      @file-click="fileClick"
      @file-delete="fileDelete"
    ></md-upload>
    <md-upload
      v-model="files"
      :on-submit="onSubmit2"
      @over-size="oversize"
      @file-click="fileClick"
    >
      <md-upload-file
        v-for="(file, index) in files"
        @click="fileClick(file, index)"
        :key="index"
        :file="file"
      >
        <div class="md-upload-preview" :style="computedFileStyle">
          <img :src="file.url" class="md-upload-image" />
        </div>
        <div class="md-upload-delete">
          <i class="iconfont" @click.stop="fileDelete(file, index)">&#xe6f3;</i>
        </div>
        <div class="md-preview-cover">
          <div class="md-preivew-name">{{ file.name }}</div>
        </div>
      </md-upload-file>
      <md-upload-button>
        <div class="md-upload-wrap fb fb-cross-center fb-main-center"
          ><i class="iconfont">&#xe68d;</i></div
        ></md-upload-button
      >
    </md-upload>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      files: [
        {
          name: 'tree.jpg',
          url: 'https://img.yzcdn.cn/vant/tree.jpg'
        },
        {
          name: 'apple-2.jpg',
          url: 'https://img.yzcdn.cn/vant/apple-2.jpg'
        },
        {
          name: 'apple-4.jpg',
          url: 'https://img.yzcdn.cn/vant/apple-4.jpg'
        }
      ]
    }
  },
  computed: {
    computedFileStyle() {
      return {}
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
    beforeDelete(file) {
      console.log(file)
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        // 此处进行逻辑判断
        resolve()
      })
    },
    onSubmit(file) {
      console.log(file)
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        // 把上传成功的url塞到files数组中
        this.files.push(this.files[0])
        // 以上可以进行上传逻辑
        this.$Toast({
          content: `文件上传成功`
        }).show()
        resolve()
      })
    },
    onSubmit2(file) {
      console.log(file)
      // 此处进行逻辑判断
      this.$Toast({
        content: `文件上传成功`
      }).show()
      // 把上传成功的url塞到files数组中
      this.files.push(this.files[0])
      return true
      // this.$Toast({
      //   content: `文件上传失败`
      // }).show()
      // return false
    },
    oversize(file) {
      console.log(file)
      this.$Toast({
        content: `文件过大`
      }).show()
    },
    fileDelete(file, index) {
      console.log(file)
      this.files.splice(index, 1)
      this.$Toast({
        content: `已删除`
      }).show()
    },
    fileClick(file, index) {
      let urls = this.files.reduce((_list, file) => {
        return _list.concat(file.url)
      }, [])
      this.$ImagePreview({
        $props: {
          images: urls,
          content: 'I am from a vue component',
          start: index
        }
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.md-preview-cover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .md-preivew-name {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    @include background('MAIN');
    opacity: 0.56;
  }
}
</style>
