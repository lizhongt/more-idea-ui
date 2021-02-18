<template>
  <div
    class="md-tab"
    :class="{
      'md-tab-active': name === rootTab.activeValue
    }"
    v-color="{
      type: 0,
      color:
        name === rootTab.activeValue
          ? rootTab.activeColor
          : rootTab.inactiveColor
    }"
    v-pose="{
      fixed: rootTab.fixed,
      selected: name === rootTab.activeValue
    }"
    @click="updateTab(name)"
    ><slot></slot
  ></div>
</template>

<script>
export default {
  name: 'MdTabbarItem',
  components: {},
  directives: {
    color: {
      bind(el, binding) {
        if (binding.value.type) {
          el.style.backgroundColor = binding.value.color
        } else {
          el.style.color = binding.value.color
        }
      },
      update(el, binding) {
        if (binding.value.type) {
          el.style.backgroundColor = binding.value.color
        } else {
          el.style.color = binding.value.color
        }
      }
    },
    pose: {
      update(el, binding) {
        var index = [].indexOf.call(
          el.parentNode.querySelectorAll(el.tagName),
          el
        )
        //确保选择的按钮能够完全展示
        if (!binding.value.fixed && binding.value.selected) {
          let _translateX = 0
          let _scrollWidth = el.parentElement.scrollWidth
          let _fullWidth = el.parentElement.clientWidth
          let _tabWidth = el.clientWidth
          if (!index) {
            _translateX = 0
          } else if (index === el.parentElement.children.length - 2) {
            _translateX =
              _scrollWidth > _fullWidth ? _scrollWidth - _fullWidth : 0
          } else {
            // 判断当前选中的下一个tab是否全部可见
            if (el.offsetLeft + _tabWidth > _fullWidth) {
              _translateX = el.offsetLeft + _tabWidth - _fullWidth + _tabWidth
            }
          }
          el.parentElement.scrollTo(_translateX, 0)
        }
      }
    }
  },
  props: {
    name: {
      type: [String, Number],
      required: false
    }
  },
  inject: ['rootTab'],
  data() {
    return {}
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
    updateTab(value) {
      this.rootTab.activeValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
.md-tab {
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-decoration: none;
  border: none;
  outline: none;
  color: inherit;
  position: relative;
  line-height: normal;
  -webkit-transition: all 0.45s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 0.45s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  @include color('MAIN', 0.56);
  text-align: center;
  flex: 1;
  padding: 14px 6px;
  font-size: 15px;
  font-weight: 400;
  &.md-tab-active {
    @include color('MAIN');
  }
}
</style>
