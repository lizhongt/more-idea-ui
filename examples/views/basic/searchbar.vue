<template>
  <div class="w-full h-full">
    <div class="searchbar-group">
      <md-anchor>搜索框</md-anchor>
      <md-searchbar v-model="model1"></md-searchbar>
    </div>
    <div class="searchbar-group">
      <md-anchor>输入中</md-anchor>
      <md-searchbar v-model="model2"></md-searchbar>
    </div>
    <div class="searchbar-group">
      <md-anchor>搜索框+取消</md-anchor>
      <md-searchbar v-model="model1" :with-button="true"></md-searchbar>
    </div>
    <div class="searchbar-group">
      <md-anchor>搜索框+返回</md-anchor>
      <md-searchbar
        v-model="model1"
        @back="close"
        :with-back="true"
      ></md-searchbar>
    </div>
    <div class="searchbar-group">
      <md-anchor>搜索框+返回+取消</md-anchor>
      <md-searchbar
        v-model="model1"
        :with-button="true"
        :with-back="true"
      ></md-searchbar>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      model1: '',
      model2: '李中涛'
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
    close() {
      alert('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
