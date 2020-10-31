import TabBar from './src/main'

/* istanbul ignore next */
TabBar.install = function(Vue) {
  Vue.component(TabBar.name, TabBar)
}

export default TabBar
