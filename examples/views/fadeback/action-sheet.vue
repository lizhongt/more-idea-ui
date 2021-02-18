<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-07 20:20:40
-->
<template>
  <div class="w-full h-full p-0-16 p-12-0">
    <md-button @click="open = true" class="w-full">基本用法</md-button>
    <md-button @click="openSheet" class="mt-12 w-full">API调用</md-button>
    <md-action-sheet
      v-model="open"
      :title="title"
      :cancel-text="cancelText"
      :actions="actions"
      @choose="choose"
      @cancel="cancel"
      :active="active"
    ></md-action-sheet>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      open: false,
      actions: [
        {
          name: '选项一',
          id: 1
        },
        {
          name: '选项二',
          id: 2
        },
        {
          name: '选项三',
          id: 3
        }
      ],
      title: '自定义标题',
      cancelText: '关闭',
      active: 0
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
      this.active = index
      this.open = false
      this.$Dialog({
        content: `index--> ${index}, value--> ${JSON.stringify(item)}`,
        icon: '&#xe666;'
      }).show()
    },
    cancel() {
      this.open = false
      this.$Toast({
        content: `取消`
      }).show()
    },
    openSheet() {
      let _that = this
      this.$ActionSheet({
        title: this.title,
        cancelText: this.cancelText,
        actions: this.actions,
        onChoose(item, index) {
          _that.choose(item, index)
        },
        onCancel() {
          _that.cancel()
        },
        active: this.active
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped></style>
