<template>
  <div class="w-full h-full">
    <div class="mb-12">
      <md-anchor text="单独使用"></md-anchor>
      <md-field
        v-model="value1"
        :clearable="clearable"
        :required="required"
        :readOnly="readOnly"
        :maxlength="maxlength"
        label="文字"
        :type="type"
        :width="width"
        :height="height"
        :align="vertical ? 'vertical' : 'horizontal'"
        @click="chooseTrigger"
      ></md-field>
    </div>
    <div class="mb-12">
      <md-anchor text="field类型"></md-anchor>
      <md-radio-group v-model="type" :options="options" horizontal />
      <md-list>
        <md-list-item between>
          <md-switch
            label="纵向对齐"
            v-model="vertical"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="是否只读"
            v-model="readOnly"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="是否清空按钮"
            v-model="clearable"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="是否必填"
            v-model="required"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item>
          <md-field
            v-model="width"
            label="宽度"
            placeholder="请输入数字"
          ></md-field>
        </md-list-item>
        <md-list-item>
          <md-field
            v-model="height"
            label="高度"
            placeholder="请输入数字"
          ></md-field>
        </md-list-item>
        <md-list-item>
          <md-field
            :width="120"
            v-model="maxlength"
            label="最大长度"
          ></md-field>
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
      value1: 'asd',
      options: [
        { name: 'text', label: 'text' },
        { name: 'password', label: 'password' },
        { name: 'tel', label: 'tel' },
        { name: 'number', label: 'number' },
        { name: 'choose', label: 'choose' },
        { name: 'textarea', label: 'textarea' }
      ],
      type: 'text',
      readOnly: false,
      clearable: false,
      required: false,
      maxlength: 10,
      width: 80,
      height: 200,
      vertical: false
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
    chooseTrigger() {
      this.$Toast({
        content: `触发点击事件`
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
</style>
