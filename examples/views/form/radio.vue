<template>
  <div class="w-full h-full p-12-0">
    <div class="mb-12">
      <md-anchor>单独使用</md-anchor>
      <md-radio-group v-model="radioValue1" horizontal>
        <md-radio name="1" label="选项1"></md-radio>
        <md-radio name="2" label="选项2"></md-radio>
        <md-radio name="3" label="选项3"></md-radio>
        <md-radio name="4" label="选项4"></md-radio>
        <md-radio name="5" label="选项5"></md-radio>
      </md-radio-group>
    </div>
    <div class="mb-12">
      <md-anchor>文字靠左</md-anchor>
      <md-radio-group v-model="radioValue3">
        <md-radio name="1" label="选项1" position="left"></md-radio>
        <md-radio name="2" label="选项2" position="left"></md-radio>
        <md-radio name="3" label="选项3" position="left"></md-radio>
        <md-radio name="4" label="选项4" position="left"></md-radio>
        <md-radio name="5" label="选项5" position="left"></md-radio>
      </md-radio-group>
    </div>
    <div class="mb-12">
      <p class="mb-12 c-191F25-40"></p>
      <md-anchor>文字靠右-自定义选中颜色</md-anchor>
      <md-radio-group
        v-model="radioValue2"
        :options="options"
        position="right"
        color="red"
      >
      </md-radio-group>
    </div>
    <div class="mb-12">
      <md-anchor>文字靠右-自定义选中颜色-自定义图标</md-anchor>
      <md-radio-group v-model="radioValue5">
        <md-radio
          v-for="opt in options"
          position="right"
          color="red"
          :name="opt.name"
          label="选项1"
          :key="opt.name"
        >
          <i
            slot="icon"
            class="iconfont"
            :style="{ color: opt.name === radioValue5 ? 'red' : 'blue' }"
            >&#xe680;</i
          >
        </md-radio>
      </md-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      radioValue1: '1',
      radioValue2: '2',
      radioValue3: '1',
      radioValue4: '2',
      radioValue5: '4',
      options: [
        { name: '1', label: '选项一' },
        { name: '2', label: '选项二' },
        { name: '3', label: '选项三' },
        { name: '4', label: '选项四' }
      ]
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
