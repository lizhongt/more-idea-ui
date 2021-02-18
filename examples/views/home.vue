<template>
  <div class="md-container page_bd">
    <md-list
      v-for="(nav, index) in navList"
      :class="{ expand: nav.expand }"
      :key="nav.id"
      class="list-con mt-8"
    >
      <md-list-item @click="expandHandler(index, nav.expand)">
        <div class="w-full fb fb-col fb-cross-center">
          <div class="w-full fb fb-main-between category-desc">
            <span class="category-name">{{ nav.categoryName }}</span>
            <i class="iconfont c-111F2C-40" v-html="nav.icon"></i>
          </div>
          <md-list class="w-full category-list" arrow>
            <md-list-item
              v-for="menu in nav.subMenus"
              :key="menu.path"
              :title="menu.name"
              @click="jump(menu.path)"
              class="category-cells"
            ></md-list-item>
          </md-list>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      navList: [
        {
          id: 1,
          categoryName: '基础组件',
          expand: false,
          icon: '&#xe812;',
          subMenus: [
            {
              name: 'Button',
              path: '/button'
            },
            {
              name: 'Tabbar',
              path: '/tabbar'
            },
            {
              name: 'Searchbar',
              path: '/searchbar'
            },
            {
              name: 'List',
              path: '/list'
            },
            {
              name: 'Badge',
              path: '/badge'
            },
            {
              name: 'Anchor',
              path: '/anchor'
            },
            {
              name: 'Bar',
              path: '/bar'
            },
            {
              name: 'Tip',
              path: '/tip'
            }
          ]
        },
        {
          id: 2,
          categoryName: '表单',
          expand: false,
          icon: '&#xe654;',
          subMenus: [
            {
              name: 'CheckBox',
              path: '/checkbox'
            },
            {
              name: 'Radio',
              path: '/radio'
            },
            {
              name: 'Field',
              path: '/field'
            },
            {
              name: 'Switch',
              path: '/switch'
            },
            {
              name: 'Upload',
              path: '/upload'
            }
          ]
        },
        {
          id: 3,
          categoryName: '操作反馈',
          expand: false,
          icon: '&#xe666;',
          subMenus: [
            {
              name: 'ActionSheet',
              path: '/actionsheet'
            },
            {
              name: 'Dialog',
              path: '/dialog'
            },
            {
              name: 'Toast',
              path: '/toast'
            },
            {
              name: 'Picker',
              path: '/picker'
            },
            {
              name: 'Swiper',
              path: '/swiper'
            },
            {
              name: 'Scroll',
              path: '/scroll'
            }
          ]
        },
        {
          id: 4,
          categoryName: '业务组件',
          expand: false,
          icon: '&#xe666;',
          subMenus: [
            {
              name: 'Calendar',
              path: '/calendar'
            }
          ]
        }
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
  methods: {
    expandHandler(index, expand) {
      this.navList.map((item, idx) => {
        item.expand = idx === index ? !expand : false
        return item
      })
    },
    jump(path) {
      this.$router.push({ path })
    }
  }
}
</script>
<style lang="scss" scoped>
.page_bd {
  padding: 16px;
  .list-con {
    border-radius: 4px;
    &.expand {
      .category-list {
        height: auto;
        .category-cells {
          opacity: 1;
          -webkit-transform: translateY(0);
          transform: translateY(0);
          &:last-child {
            .category-cell {
              border-bottom: none;
            }
          }
        }
      }
    }
    .category-desc {
      padding: 20px;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
    .category-list {
      height: 0px;
      overflow: hidden;
      .category-cells {
        font-size: 17px;
        overflow: hidden;
        position: relative;
        opacity: 0;
        -webkit-transition: 0.3s;
        transition: 0.3s;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        background-color: #fff;
      }
    }
  }
}
</style>
