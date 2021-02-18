<template>
  <div class="w-full h-full p-12-0">
    <div class="mb-12">
      <p class="mb-12 c-191F25-40 p-0-16">单独使用</p>
      <md-checkbox v-model="checked" label="描述"></md-checkbox>
      <md-checkbox
        class="mt-12"
        v-model="checked"
        :circle="false"
        label="描述"
      ></md-checkbox>
    </div>
    <div class="mb-12">
      <p class="mb-12 p-0-16 c-191F25-40">在list中使用</p>
      <md-list>
        <md-list-item>
          <md-checkbox
            v-model="checked"
            position="right"
            label="靠右"
          ></md-checkbox>
        </md-list-item>
        <md-list-item>
          <md-checkbox
            v-model="checked"
            position="left"
            :circle="false"
            label="靠左"
          ></md-checkbox>
        </md-list-item>
        <md-list-item>
          <md-checkbox
            v-model="checked1"
            position="left"
            disabled
            label="禁用"
          ></md-checkbox>
        </md-list-item>
        <md-list-item>
          <md-checkbox
            v-model="checked2"
            position="left"
            color="#fb602d"
            label="自定义颜色"
          ></md-checkbox>
        </md-list-item>
        <md-list-item>
          <md-checkbox v-model="checked2" position="left" label="自定义图标">
            <i
              slot="icon"
              class="iconfont"
              :style="{ color: checked2 ? 'red' : 'blue' }"
              >&#xe680;</i
            >
          </md-checkbox>
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
      model2: true,
      checked: true,
      checked1: false,
      checked2: false
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
