<template>
  <div class="w-full h-full p-12-0">
    <div class="list-group mb-12">
      <md-anchor text="纯文字单行"></md-anchor>
      <md-list arrow>
        <md-list-item title="主标题文字">
          <span
            slot="more"
            style="vertical-align: middle; font-size: 17px;color: rgba(17,31,44,0.4);"
            >详细信息</span
          >
        </md-list-item>
        <md-list-item title="主标题文字"></md-list-item>
      </md-list>
      <md-anchor text="纯文字双行"></md-anchor>
      <md-list :textline="2" arrow>
        <md-list-item title="主标题文字" sub-title="副标题文字"></md-list-item>
      </md-list>
      <md-anchor text="纯文字三行"></md-anchor>
      <md-list :textline="3" arrow>
        <md-list-item
          title="主标题文字"
          sub-title="副标题文字"
          third-title="副标题文字"
        ></md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped></style>
