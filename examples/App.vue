<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-07 20:28:13
-->
<template>
  <div id="app">
    <div class="md-app-con h-full fb fb-col">
      <div class="md-head-bar relative">
        <i
          v-show="$route.path !== '/'"
          @click="$router.back()"
          class="backbutton iconfont"
          >&#xe6c5;</i
        >
        <h1>md-ui</h1>
      </div>
      <div class="item-flex-1 dashboar-view scroll">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '../src/assets/css/reset.css';
@import '~/assets/sass/flex.scss';
@import '~/assets/sass/common.scss';
@import '~/assets/sass/icon.scss';
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
html,
body,
#app {
  height: 100%;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  background: #f2f2f2;
  * {
    box-sizing: border-box;
  }
  .md-head-bar {
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ffffff;
    box-shadow: 0 2px 1px #e9eaea;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 10;
    .backbutton {
      position: absolute;
      left: 16px;
      cursor: pointer;
    }
  }
  .dashboar-view {
    height: 0px;
  }
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.scroll {
  overflow: auto;
}
.inline-block {
  display: inline-block;
}
</style>
