<template>
  <div class="md-fielder" :class="{ 'is-vertical': align === 'vertical' }">
    <div
      class="md-field-wrap"
      :class="[
        type === 'textarea'
          ? 'is-textarea'
          : align === 'horizontal'
          ? 'fb fb-main-between fb-cross-center'
          : '',
        align === 'vertical' ? 'fb-col' : ''
      ]"
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
      <slot>
        <div
          class="md-field-value item-flex-1"
          ref="textarea"
          v-if="type === 'textarea'"
          :class="{ 'md-textarea-auto-height ': !this.height }"
        >
          <pre v-if="!this.height"><span></span><br/></pre>
          <textarea
            :maxlength="`${maxlength}`"
            :readonly="readOnly"
            v-model="fieldValue"
            :placeholder="placeholder"
            :style="computedHeightStyle"
          ></textarea>
          <div class="text-indicator fb fb-main-between" v-if="clearable">
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
      </slot>
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
      type: [Number, String],
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    align: {
      type: String,
      default: 'horizontal'
    }
  },
  data() {
    return {
      fieldValue: this.value
    }
  },
  computed: {
    computedStyle() {
      if (this.width) {
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
    },
    type() {
      if (this.type === 'textarea' && !this.height) {
        this.$nextTick(() => {
          this.makeExpandingArea(this.$refs.textarea)
        })
      }
    },
    height() {
      if (this.type === 'textarea' && !this.height) {
        this.$nextTick(() => {
          this.makeExpandingArea(this.$refs.textarea)
        })
      }
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
    },
    makeExpandingArea(container) {
      var area = container.getElementsByTagName('textarea')[0]
      var span = container.getElementsByTagName('span')[0]
      if (area.addEventListener) {
        area.addEventListener(
          'input',
          function() {
            span.textContent = area.value
          },
          false
        )
        span.textContent = area.value
      } else if (area.attachEvent) {
        area.attachEvent('onpropertychange', function() {
          var html = area.value.replace(/n/g, '<br/>')
          span.innerText = html
        })
        var html = area.value.replace(/n/g, '<br/>')
        span.innerText = html
      }
      if (window.VBArray && window.addEventListener) {
        //IE9
        area.attachEvent('onkeydown', function() {
          var key = window.event.keyCode
          if (key == 8 || key == 46) span.textContent = area.value
        })
        area.attachEvent('oncut', function() {
          span.textContent = area.value
        }) //处理粘贴
      }
      container.className += 'active'
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
  &.is-vertical {
    .md-field-wrap {
      min-height: 68px;
      padding-top: 10px;
      .md-field-title {
        font-size: 15px;
      }
      .md-field-value {
        padding-top: 3px;
        > input,
        textarea {
          text-align: left;
        }
        &.md-textarea-auto-height {
          > pre,
          textarea {
            padding-top: 0;
          }
          > textarea {
            padding-top: 3px;
          }
        }
      }
      .md-field-title.is-textarea {
        padding-top: 0;
      }
    }
  }
  .md-field-wrap {
    min-height: 56px;
    padding: 0 16px;
    font-size: 17px;
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
      margin-top: 3px;
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
          font-size: 17px;
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
      &.md-textarea-auto-height {
        position: relative;
        background: #fff;
        > textarea {
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          resize: none;
        }
        > textarea,
        pre {
          margin: 0;
          padding: 5px 0;
          background: transparent;
          font: 100 17px/24px Avenir, Helvetica, Arial, sans-serif;
          white-space: pre-wrap;
          word-wrap: break-word;
          @include color('MAIN', 0.7);
        }
      }
    }
  }
}
</style>
