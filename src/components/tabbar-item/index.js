import TabBarItem from '../tabbar/src/item'

/* istanbul ignore next */
TabBarItem.install = function(Vue) {
  Vue.component(TabBarItem.name, TabBarItem)
}

export default TabBarItem
