<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-18 09:45:10
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-07 20:21:33
-->
<template>
  <div class="w-full h-full p-12-0 p-0-16">
    <md-button @click="visible = true" class="mt-12 w-full"
      >注册组件组件调用</md-button
    >
    <md-button @click="alert" class="mt-12 w-full">alert</md-button>
    <md-button @click="prompt" class="mt-12 w-full">Prompt</md-button>
    <md-button @click="confirm" class="mt-12 w-full">confrim</md-button>
    <md-button @click="useSlot" class="mt-12 w-full">使用slot</md-button>
    <md-dialog
      @confirm="ok"
      v-model="visible"
      title="大标题，限制在一行"
      content="弹框内容"
    >
      <div slot="icon" class="my-title-img"></div>
    </md-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      cancelButton: {
        text: '警告',
        color: 'red'
      },
      confirmBtn: {}
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
    alert() {
      let _that = this
      this.$Dialog({
        title: '使用方法调用alert',
        content: '节约时间',
        icon: '&#xe666;',
        onCancel() {
          _that.cancel()
        },
        onConfirm(index, value) {
          _that.ok(index, value)
        }
      }).show()
    },
    prompt() {
      let _that = this
      this.$Dialog({
        type: 'prompt',
        title: '使用方法调用prompt',
        content: '输入项目名称',
        prompt: {
          value: '123',
          placeholder: '输入点东西...'
        },
        $events: {
          cancel() {
            _that.cancel()
          },
          confirm(index, value) {
            _that.ok(index, value)
          }
        }
      }).show()
    },
    confirm() {
      let _that = this
      this.$Dialog({
        type: 'confirm',
        title: '使用方法调用confirm',
        content: '锄禾日当午汗滴禾下土',
        cancelBtn: this.cancelButton,
        $events: {
          cancel() {
            _that.cancel()
          },
          confirm(index, value) {
            _that.ok(index, value)
          }
        }
      }).show()
    },
    useSlot() {
      let _that = this
      this.$Dialog(
        {
          title: '使用slot传入内容和图片',
          content: '锄禾日当午汗滴禾下土',
          $events: {
            confirm() {
              _that.ok()
            }
          }
        },
        createElement => {
          return [
            createElement('div', {
              class: ['my-title-img'],
              slot: 'icon'
            })
          ]
        }
      ).show()
    },
    cancel() {
      this.$Toast({
        content: `取消`
      }).show()
    },
    ok() {
      this.$Toast({
        content: `确认`
      }).show()
    }
  }
}
</script>

<style lang="scss">
.my-title-img {
  width: 100%;
  height: 120px;
  @include background('PRIMARY');
  color: #fff;
}
</style>
