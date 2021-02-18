<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-10-22 09:45:10
 * @LastEditors: lizt
 * @LastEditTime: 2020-12-13 09:30:31
-->
<template>
  <div class="w-full h-full p-12-0">
    <md-swiper
      v-if="!refresh"
      :show-indicators="showIndicators"
      @change="slideChange"
      ref="mySwipe"
      :options="options"
    >
      <md-swiper-item v-for="(item, index) in items" :key="index">{{
        item
      }}</md-swiper-item>
    </md-swiper>

    <div class="row">
      <md-list>
        <md-list-item between>
          <md-switch
            label="是否循环"
            v-model="options.loop"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="是否禁止滚动"
            v-model="options.disableScroll"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="自动轮播"
            v-model="options.autoplay"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="横向滚动"
            v-model="options.horizontal"
            position="left"
          ></md-switch>
        </md-list-item>
        <md-list-item between>
          <md-switch
            label="指示器"
            v-model="showIndicators"
            position="left"
          ></md-switch>
        </md-list-item>
      </md-list>
      <div class="fb fb-row fb-main-center fb-cross-center mt-12">
        <md-button type="text" @click="prev()">上一页</md-button>
        <md-button class="ml-12" type="text" @click="next()">下一页</md-button>
        <md-button class="ml-12" type="text" @click="prev()">第四页</md-button>
        <md-button class="ml-12" type="text" @click="add()">加一页</md-button>
      </div>
    </div>
    <json-view :data="options" title="参数"></json-view>
  </div>
</template>

<script>
import { JsonView } from 'examples/components'
export default {
  components: {
    JsonView
  },
  props: {},
  data() {
    return {
      options: {
        // 开始滚动位置
        startSlide: 0,
        // 滚动速度
        speed: 400,
        // 自动轮播时间
        autoplay: false,
        // 是否无限循环
        loop: true,
        // 是否禁止页面滚动
        disableScroll: false,
        // 阻止冒泡
        stopPropagation: false,
        // 横向
        horizontal: true
      },
      showIndicators: false,
      items: new Array(5).fill(null).map((item, index) => (item = index + 1)),
      refresh: false
    }
  },
  computed: {},
  watch: {
    options: {
      deep: true,
      handler() {
        this.refresh = true
        this.$nextTick(() => {
          this.refresh = false
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
    prev() {
      this.$refs.mySwipe.prev()
    },
    next() {
      this.$refs.mySwipe.next()
    },
    slide() {
      this.$refs.mySwipe.slideTo(3)
    },
    slideChange(index) {
      console.log(index)
    },
    add() {
      this.items.push(this.items.length + 1)
      this.$refs.mySwipe.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe-item {
  font-weight: bold;
  color: #14ade5;
  font-size: 20px;
  text-align: center;
  padding: 100px 10px;
  margin: 0 10px 10px 10px;
  box-shadow: 0 1px #ebebeb;
  background: #fff;
  border-radius: 3px;
  border: 1px solid;
  border-color: #e5e5e5 #d3d3d3 #b9c1c6;
}
</style>
