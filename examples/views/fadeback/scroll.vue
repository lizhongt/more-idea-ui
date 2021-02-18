<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-12-27 09:41:18
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-07 20:26:40
-->
<template>
  <div class="w-full h-full">
    <md-anchor text="纵向滚动"></md-anchor>
    <md-scroll class="h-full w-full" style="height: 200px;">
      <div class="list-group">
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
          <md-list-item
            title="主标题文字"
            sub-title="副标题文字"
          ></md-list-item>
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
    </md-scroll>
    <md-anchor text="横向滚动"></md-anchor>
    <md-scroll horizontal class="w-full">
      <div
        class="scroll-container p-12-0 p-0-16"
        style="width: 600px;background: #ffffff;"
        >锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。李白乘舟将欲行，忽闻岸上踏歌声。桃花潭水深千尺，不及汪伦送我情。</div
      >
    </md-scroll>
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
