<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2020-12-13 14:18:33
-->
<template>
  <div class="w-full h-full">
    <md-anchor text="基本用法"></md-anchor>
    <md-calendar
      v-model="defaultDate"
      :mode="mode"
      :format="format"
      @choose="choose"
      :with-status="withStatus"
      :status-list="statusList"
    ></md-calendar>
    <div class="row mt-12">
      <md-list>
        <md-list-item between>
          <md-switch
            label="带入状态"
            v-model="withStatus"
            position="left"
          ></md-switch>
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
    return {
      defaultDate: new Date(),
      format: 'YYYY/MM/DD',
      mode: 1,
      withStatus: true,
      statusList: new Array(31)
        .fill(null)
        .map((item, index) => (item = index % 2))
    }
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
    choose(item, index) {
      console.log({ item, index })
      this.active = index
      this.open = false
    },
    cancel() {
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
