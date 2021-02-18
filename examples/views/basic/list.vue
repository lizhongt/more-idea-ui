<template>
  <div class="w-full h-full">
    <div class="list-group">
      <md-anchor>纯文字单行</md-anchor>
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
      <md-anchor>纯文字双行</md-anchor>
      <md-list :textline="2" arrow>
        <md-list-item title="主标题文字" sub-title="副标题文字"></md-list-item>
      </md-list>
      <md-anchor>纯文字三行</md-anchor>
      <md-list :textline="3" arrow>
        <md-list-item
          title="主标题文字"
          sub-title="副标题文字"
          third-title="副标题文字"
        ></md-list-item>
      </md-list>
    </div>
    <div class="list-group">
      <md-anchor>图标和文字</md-anchor>
      <md-list>
        <md-list-item avator title="主标题文字">
          <div class="avator" slot="avator"
            ><i class="iconfont" style="font-size: 36px;">&#xe6c6;</i></div
          >
        </md-list-item>
        <md-list-item avator title="主标题文字">
          <div class="avator" slot="avator"
            ><i class="iconfont" style="font-size: 36px;">&#xe6c6;</i></div
          >
        </md-list-item>
      </md-list>
      <md-anchor>图标和文字</md-anchor>
      <md-list :textline="2">
        <md-list-item title="主标题文字" sub-title="副标题文字"
          ><div class="avator" slot="avator"
            ><i class="iconfont" style="font-size: 36px;">&#xe6c6;</i></div
          ></md-list-item
        >
      </md-list>
      <md-anchor>图标和文字</md-anchor>
      <md-list arrow avator :textline="3">
        <md-list-item
          title="主标题文字"
          sub-title="副标题文字"
          third-title="副标题文字"
        >
          <div class="avator" slot="avator"
            ><i class="iconfont" style="font-size: 36px;">&#xe6c6;</i></div
          >
          <span
            slot="more"
            style="vertical-align: middle; font-size: 17px;color: rgba(17,31,44,0.4);"
            >详细信息</span
          >
        </md-list-item>
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
  methods: {
    close() {
      alert('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
