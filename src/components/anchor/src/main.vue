<template>
  <h2 class="md-anchor"
    ><slot>{{ text }}</slot></h2
  >
</template>

<script>
import visibleMixin from '~/mixins/visible'
export default {
  name: 'MdAnchor',
  mixins: [visibleMixin],
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data() {
    return {}
  },
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.md-anchor {
  padding: 12px 16px;
  line-height: 1;
  font-size: 14px;
  @include color('MAIN', 0.4);
}
</style>
