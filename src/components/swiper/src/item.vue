<template>
  <div class="swipe-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MdSwiperItem',
  components: {},
  props: {},
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
.swipe-item {
  width: 100%;
  position: relative;
  cursor: grab;
}
</style>
