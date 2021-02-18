<template>
  <div class="mdui-json-view">
    <h3>{{ title }}</h3>
    <pre v-if="changed" v-highlightjs>
      <code ref="code" class="json" spellcheck="false">{{data}}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai.css'
// 样式文件
export default {
  directives: {
    highlightjs: {
      inserted() {
        // 遍历元素并且使用 highlight 进行处理
        const preEl = document.querySelectorAll('pre code')
        preEl.forEach(el => {
          hljs.highlightBlock(el)
        })
      }
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return { changed: true }
  },
  watch: {
    data: {
      handler() {
        this.changed = false
        this.$nextTick(() => {
          this.changed = true
        })
      },
      deep: true
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.md-json-view {
  h3 {
    margin-top: 16px;
    font-size: 16px;
  }
}
</style>
