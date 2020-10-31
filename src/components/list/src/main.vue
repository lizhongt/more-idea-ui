<template>
  <ul class="fly-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'FlyList',
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
.fly-list {
  background: #ffffff;
}
</style>
