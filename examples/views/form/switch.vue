<template>
  <div class="w-full h-full p-12-0">
    <div class="searchbar-group mb-12">
      <md-anchor>Switch</md-anchor>
      <md-list>
        <md-list-item>
          <md-switch v-model="model1">Switch: {{ model1 }}</md-switch>
        </md-list-item>
      </md-list>
    </div>
    <div class="searchbar-group mb-12">
      <md-anchor>Switch + Disabled</md-anchor>
      <md-list>
        <md-list-item>
          <md-switch disabled v-model="model2">Switch: {{ model2 }}</md-switch>
        </md-list-item>
      </md-list>
    </div>
    <div class="searchbar-group mb-12">
      <md-anchor>Switch + 自定义颜色</md-anchor>
      <md-list>
        <md-list-item>
          <md-switch v-model="model2" active-color="red" inactive-color="green"
            >Switch: {{ model2 }}</md-switch
          >
        </md-list-item>
        <md-list-item>
          <md-switch
            label="Switch"
            v-model="model2"
            active-color="red"
            inactive-color="green"
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
      model1: false,
      model2: true
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
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
</style>
