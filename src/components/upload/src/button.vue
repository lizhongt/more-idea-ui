<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-05 14:43:16
 * @LastEditors: lizt
 * @LastEditTime: 2021-04-12 15:35:31
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
      ref="file"
    />
  </div>
</template>

<script>
import { readFile } from 'utils/comUtils.js'

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
    },
    resultType: {
      type: String,
      default: 'dataUrl',
      validator(val) {
        return ~['dataUrl', 'file', 'text'].indexOf(val)
      }
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
      let { files } = e.target
      files = files.length === 1 ? files[0] : [].slice.call(files)
      if (Array.isArray(files)) {
        Promise.all(files.map(file => readFile(file, this.resultType))).then(
          contents => {
            const fileList = files.map((file, index) => {
              const result = { file, status: '', message: '' }
              if (contents[index]) {
                result.content = contents[index]
              }
              return result
            })
            this.$parent.addFiles(fileList)
            setTimeout(() => {
              this.$refs.file.value = ''
            }, 50)
          }
        )
      } else {
        readFile(files, this.resultType).then(content => {
          const result = { file: files, status: '', message: '' }

          if (content) {
            result.content = content
          }
          this.$parent.addFiles([result])
          setTimeout(() => {
            this.$refs.file.value = ''
          }, 50)
        })
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
    color: #c0c0c0;
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
