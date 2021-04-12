<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2020-11-10 11:06:57
-->
<template>
  <div class="md-upload">
    <div class="md-upload-wrap fb fb-cross-center">
      <slot>
        <upload-file
          v-for="(file, index) in fileList"
          :key="index"
          :file="file"
          @click="fileClick(file, index)"
        ></upload-file>
        <upload-button
          :multiple="multiple"
          :accept="accept"
          v-show="fileList.length < maxCount"
        ></upload-button>
      </slot>
    </div>
  </div>
</template>

<script>
import uploadButton from './button'
import uploadFile from './file'
export default {
  name: 'MdUpload',
  components: {
    uploadButton,
    uploadFile
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    maxSize: {
      type: Number,
      default: 2 * 1024
    },
    maxCount: {
      type: Number,
      default: 10
    },
    multiple: {
      type: Boolean,
      default: false
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    compress: {
      type: [Boolean, Object]
    },
    deletable: {
      type: Boolean,
      default: true
    },
    beforeDelete: {
      type: Function
    },
    onSubmit: {
      type: Function
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
    beforeUpload(files) {
      // 文件格式不通过
      if (
        files.some(item =>
          this.accept === 'image/*'
            ? !~item.file.type.indexOf('image')
            : !~this.accept.indexOf(item.file.type)
        )
      ) {
        this.$emit('file-invalid', files)
        return []
      }

      let newFiles = []
      let fileIndex = 0
      let file = files[fileIndex]
      let filesLen = this.fileList.length
      while (file && newFiles.length < this.maxCount - filesLen) {
        newFiles.push(file)
        file = files[fileIndex++]
      }
      if (this.isOversize(newFiles)) {
        let result = this.fileFilters(files, this.maxSize)
        this.$emit('over-size', result.invalid)
        return
      }
      return files
    },
    addFiles(_files) {
      let files = this.beforeUpload(_files)
      if (!files.length) {
        return
      }
      if (typeof this.onSubmit === 'function') {
        if (typeof this.onSubmit.then === 'function') {
          this.onSubmit(files)
            .then(loadFiles => {
              this.fileList.concat(loadFiles || files)
            })
            .catch(() => {})
        } else {
          let loadFiles = this.onSubmit(files)
          this.fileList.concat(loadFiles || files)
        }
      } else {
        this.fileList.concat(files)
      }
    },
    removeFile(file, index) {
      if (typeof this.beforeDelete === 'function') {
        let result = this.beforeDelete(file, index)
        if (typeof result.then === 'function') {
          result
            .then(() => {
              let files = this.fileList.splice(index, 1)
              this.$emit('file-delete', files)
            })
            .catch(() => {})
        } else {
          if (result && typeof result === 'boolean') {
            let files = this.fileList.splice(index, 1)
            this.$emit('file-delete', files)
          }
        }
      } else {
        let files = this.fileList.splice(index, 1)
        this.$emit('file-delete', files)
      }
    },
    fileClick(file, index) {
      if (this.previewImage) {
        let urls = this.fileList.reduce((_list, file) => {
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
      this.$emit('file-click', file, index)
    },
    isOversize(files, maxSize) {
      return files.some(item => item.file && item.file.size > maxSize)
    },
    fileFilters(files, maxSize) {
      let valid = []
      let invalid = []
      files.forEach(item => {
        if (item.file && item.file.size > maxSize) {
          invalid.push(item)
        } else {
          valid.push(item)
        }
      })
      return {
        valid,
        invalid
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/flex.scss';
@import '~/assets/sass/icon.scss';
.md-upload {
  position: relative;
}
</style>
