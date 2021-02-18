export default {
  model: {
    prop: 'visible',
    event: 'toggle'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  watch: {
    isVisible(newVal) {
      this.$emit('toggle', newVal)
    },
    visible: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.show()
        } else {
          this.hide()
        }
      }
    }
  },
  mounted() {},
  methods: {
    show() {
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
    }
  }
}
