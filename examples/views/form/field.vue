<template>
  <div class="w-full h-full p-12-0">
    <div class="mb-12">
      <p class="mb-12 p-0-16 c-191F25-40">单独使用</p>
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
      ></md-field>
    </div>
    <div class="mb-12">
      <p class="mb-12 p-0-16 c-191F25-40">field类型</p>
      <md-radio-group v-model="type" :options="options" horizontal />
      <md-list>
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
      height: 200
    }
  },
  computed: {},
  watch: {
    value1() {
      console.log(this.value1)
    }
  },
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
