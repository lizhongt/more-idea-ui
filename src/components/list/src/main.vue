<template>
  <ul class="md-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'MdList',
  components: {},
  props: {
    textline: {
      type: Number,
      default: 1,
      required: false,
      validator(t) {
        return Object.prototype.toString.call(t) === '[object Number]'
      }
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      rootList: this
    }
  },
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

<style lang="scss" scoped>
.md-list {
  background: #ffffff;
}
</style>
