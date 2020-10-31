<template>
  <div class="fly-searchbar fb fb-col" :class="{ 'full-screen': value }">
    <div class="search-con fb fb-main-start fb-cross-center">
      <div class="back-box" @click="handlerToBack" v-if="withBack"
        ><span class="iconfont">&#xe6c5;</span></div
      >
      <div class="search-box item-flex-1 fb fb-main-start fb-cross-center">
        <i class="iconfont">&#xe66d;</i>
        <input
          ref="input"
          type="text"
          v-model="currentValue"
          :placeholder="placeholder"
          @focus="handlerFocus"
          @blur="handlerBlur"
          @input="handlerChange"
        />
        <span @click="handlerToClear" class="iconfont" v-show="value"
          >&#xe6ce;</span
        >
      </div>
      <div class="search-tool" v-if="withButton">
        <slot name="button">
          <span @click="handlerToClear">取消</span>
        </slot>
      </div>
    </div>
    <div v-show="value" class="search-rs item-flex-1">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlySearchBar',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索姓名'
    },
    withButton: {
      type: Boolean,
      default: false
    },
    withBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    if (this.value) {
      this.currentValue = this.value
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handlerToBack() {
      this.$emit('back')
    },
    handlerFocus() {
      this.$emit('focus')
    },
    handlerBlur() {
      this.$emit('blur')
    },
    handlerToClear() {
      this.currentValue = ''
      this.$refs.input.blur()
      this.handlerChange()
    },
    handlerChange() {
      this.$nextTick(() => {
        this.$emit('input', this.currentValue)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
@import '~/assets/sass/icon.scss';
.fly-searchbar {
  .search-con {
    height: 52px;
    min-height: 52px;
    padding: 0 12px;
    background: #ffffff;

    > .search-box {
      height: 36px;
      padding: 13px;
      border-radius: 99999px;
      background: rgba($color-THIRDMARY, 0.08);
      font-size: 15px;
      > i {
        margin-right: 10px;
        color: rgba($color-MAIN, 0.56);
        font-size: 14px;
      }
      > input {
        width: 100%;
        background: none;
        border: none;
        outline: none;
      }
      > span {
        color: rgba($color-MAIN, 0.4);
        margin-left: 10px;
      }
    }
    > .back-box {
      margin-right: 12px;
      > span {
        font-size: 24px;
      }
    }

    > .search-tool {
      margin-left: 12px;
      text-align: right;
      font-size: 17px;
    }
  }
  .search-rs {
    height: 0px;
    overflow: scroll;
  }
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: rgba(#191f25, 0.4) !important;
}
</style>
