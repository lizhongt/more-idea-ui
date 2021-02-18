<template>
  <div class="md-fielder">
    <div
      class="md-field-wrap"
      :class="
        type === 'textarea'
          ? 'is-textarea'
          : 'fb fb-main-between fb-cross-center'
      "
    >
      <span class="md-required" v-if="required"
        ><i class="iconfont">&#xe6ff;</i></span
      >
      <div
        class="md-field-title"
        :class="{ 'is-textarea': type === 'textarea' }"
        :style="computedStyle"
      >
        <span>{{ label }}</span>
      </div>
      <div class="md-field-value item-flex-1" v-if="type === 'textarea'">
        <textarea
          :maxlength="`${maxlength}`"
          :readonly="readOnly"
          v-model="fieldValue"
          :placeholder="placeholder"
          :style="computedHeightStyle"
        ></textarea>
        <div class="text-indicator fb fb-main-between">
          <span
            :class="{ 'can-clear': fieldValue }"
            class="md-clear"
            @click="fieldValue = ''"
            >清空</span
          >
          <span>{{ `${fieldValue.length}/${maxlength}` }}</span>
        </div>
      </div>
      <div
        class="md-field-value item-flex-1"
        :class="{ 'md-field-choose': type === 'choose' }"
        v-else
      >
        <input
          :placeholder="placeholder"
          :type="type === 'password' ? 'password' : 'text'"
          :maxlength="`${maxlength}`"
          :readonly="type === 'choose' ? true : readOnly"
          :class="{ 'with-clear': clearable && type !== 'choose' }"
          v-model="fieldValue"
          @keydown="handleInput"
        />
        <span
          @click="fieldValue = ''"
          class="md-clearable"
          v-if="clearable && type !== 'choose'"
          ><i class="iconfont">&#xe6ce;</i></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdField',
  components: {},
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return ~[
          'text',
          'number',
          'tel',
          'choose',
          'password',
          'textarea'
        ].indexOf(val)
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入文字'
    },
    maxlength: {
      type: Number,
      default: -1
    },
    required: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: -1
    },
    height: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      fieldValue: this.value
    }
  },
  computed: {
    computedShowInput() {
      return ~['text', 'number', 'tel', 'password'].indexOf(this.type)
    },
    computedStyle() {
      if (this.width && this.computedShowInput) {
        return {
          width: `${this.width}px`
        }
      }
      return {}
    },
    computedHeightStyle() {
      if (this.height && this.type === 'textarea') {
        return {
          height: `${this.height}px`
        }
      }
      return {}
    }
  },
  watch: {
    fieldValue(newVal) {
      this.$emit('input', newVal)
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
  methods: {
    handleInput(e) {
      if (this.type === 'tel' || this.type === 'number') {
        let reg = this.type === 'tel' ? /[^\d]/g : /[^\d-]/g
        let a = e.key.replace(reg, '')
        if (!a && e.keyCode !== 8) {
          e.preventDefault()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
@import '~/assets/sass/icon.scss';
.md-fielder {
  background: #ffffff;
  width: 100%;
  .md-field-wrap {
    min-height: 56px;
    padding: 0 16px;
    font-size: 16px;
    position: relative;
    &.is-textarea {
      .md-required {
        top: 20px;
      }
      .md-field-title {
        padding-top: 16px;
      }
    }
    .md-required {
      @include color('WARNNING');
      margin-right: 8px;
      position: absolute;
      left: 0px;
    }
    .md-field-title {
      min-width: 50px;
      width: 60px;
      margin-right: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.is-textarea {
        padding-top: 16px;
      }
    }
    .md-field-value {
      position: relative;
      &.md-field-choose {
        padding-right: 20px;
        &:after {
          font-family: 'iconfont';
          content: '\e6c4';
          -webkit-mask-position: 0 0;
          mask-position: 0 0;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100%;
          mask-size: 100%;
          color: rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 50%;
          font-size: 16px;
          margin-top: -7px;
          right: 0;
        }
      }
      > input,
      textarea {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        border: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
        &.with-clear {
          padding-right: 24px;
        }
      }
      > textarea {
        text-align: left;
        padding-top: 16px;
      }
      .md-clearable {
        position: absolute;
        right: 0;
        top: 0;
        top: 50%;
        transform: translateY(-50%);
        @include color('MAIN', 0.4);
      }
      .text-indicator {
        padding-bottom: 16px;
        @include color('MAIN', 0.4);
        .can-clear {
          @include color('PRIMARY');
        }
      }
    }
  }
}
</style>
