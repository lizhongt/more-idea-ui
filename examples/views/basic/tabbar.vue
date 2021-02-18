<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-10-11 17:38:32
 * @LastEditors: lizt
 * @LastEditTime: 2020-10-15 15:11:33
-->
<template>
  <div class="w-full h-full">
    <div class="tabbar-group">
      <md-anchor>两栏</md-anchor>
      <md-tabbar :value.sync="active1">
        <md-tabbar-item
          v-for="item in items1"
          :key="item.name"
          :name="item.name"
          >{{ item.text }}</md-tabbar-item
        >
      </md-tabbar>
    </div>
    <div class="tabbar-group">
      <md-anchor>三栏</md-anchor>
      <md-tabbar :value.sync="active2">
        <md-tabbar-item
          v-for="item in items2"
          :key="item.name"
          :name="item.name"
          >{{ item.text }}</md-tabbar-item
        >
      </md-tabbar>
    </div>
    <div class="tabbar-group">
      <md-anchor>四栏</md-anchor>
      <md-tabbar :value.sync="active3">
        <md-tabbar-item
          v-for="item in items3"
          :key="item.name"
          :name="item.name"
          >{{ item.text }}</md-tabbar-item
        >
      </md-tabbar>
    </div>
    <div class="tabbar-group">
      <md-anchor>自定义颜色</md-anchor>
      <md-tabbar
        :value.sync="active3"
        indicator-color="red"
        inactive-color="pink"
        active-color="green"
      >
        <md-tabbar-item
          v-for="item in items3"
          :key="item.name"
          :name="item.name"
          >{{ item.text }}</md-tabbar-item
        >
      </md-tabbar>
    </div>
    <div class="tabbar-group">
      <md-anchor>不固定栏目</md-anchor>
      <md-tabbar :value.sync="active4" :fixed="false">
        <md-tabbar-item
          v-for="item in items4"
          :key="item.name"
          :name="item.name"
          >{{ item.text }}</md-tabbar-item
        >
      </md-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      active1: '2',
      items1: [
        {
          text: '选项一',
          name: '1'
        },
        {
          text: '选项二',
          name: '2'
        }
      ],
      active2: 1,
      items2: [
        {
          text: '选项一',
          name: 1
        },
        {
          text: '选项二',
          name: 2
        },
        {
          text: '选项三',
          name: 3
        }
      ],
      active3: 1,
      items3: [
        {
          text: '选项一',
          name: 1
        },
        {
          text: '选项二',
          name: 2
        },
        {
          text: '选项三',
          name: 3
        },
        {
          text: '选项四',
          name: 4
        }
      ],
      active4: 4,
      items4: [
        {
          text: '选项一',
          name: 1
        },
        {
          text: '选项二',
          name: 2
        },
        {
          text: '选项三',
          name: 3
        },
        {
          text: '选项四',
          name: 4
        },
        {
          text: '选项五',
          name: 5
        },
        {
          text: '选项六',
          name: 6
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
  methods: {}
}
</script>

<style lang="scss" scoped></style>
