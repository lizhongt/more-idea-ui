<template>
  <div class="w-full h-full">
    <md-anchor>纯文字单行</md-anchor>
    <div class="list-group p-0-16">
      <div class="inline-block mr-8">
        <md-badge content="1" color="warning" circle></md-badge>
      </div>
      <div class="inline-block mr-8">
        <md-badge content="99+" color="warning"></md-badge>
      </div>
      <div class="inline-block mr-8">
        <md-badge content="NEW" color="warning"></md-badge>
      </div>
      <div class="inline-block mr-8">
        <md-badge color="transparent">
          <span slot="content" style="font-size: 20px; color: red;">©</span>
        </md-badge>
      </div>
    </div>
    <md-anchor>在列表中使用</md-anchor>
    <div class="list-group">
      <md-list arrow>
        <md-list-item arrow title="主标题文字">
          <template slot="more">
            <span
              style="vertical-align: middle; font-size: 17px;color: rgba(17,31,44,0.4);margin-right: 4px;"
              >详细信息</span
            >
            <md-badge content="1" color="warning" circle></md-badge>
          </template>
        </md-list-item>
        <md-list-item title="主标题文字">
          <template slot="more">
            <span
              style="vertical-align: middle; font-size: 17px;color: rgba(17,31,44,0.4);margin-right: 4px;"
              >详细信息</span
            >
            <md-badge :size="6" color="warning" circle></md-badge>
          </template>
        </md-list-item>
        <md-list-item title="主标题文字">
          <div slot="more" class="relative">
            <div
              style="width: 36px;height: 36px;background: rgba(17,31,44,0.28);border-radius: 4px;"
            ></div>
            <md-badge
              style="position: absolute;top: -2px;right: 18px;"
              :size="6"
              color="warning"
              circle
            ></md-badge>
          </div>
        </md-list-item>
        <md-list-item title="主标题文字">
          <div slot="more" class="relative">
            <div
              style="width: 36px;height: 36px;background: rgba(17,31,44,0.28);border-radius: 4px;"
            ></div>
            <md-badge
              style="position: absolute;top: -6px;right: 12px;"
              content="6"
              color="warning"
              circle
            ></md-badge>
          </div>
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
  methods: {}
}
</script>

<style lang="scss" scoped></style>
