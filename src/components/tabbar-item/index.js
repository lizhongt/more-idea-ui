import TabbarItem from '../tabbar/src/item'

/* istanbul ignore next */
TabbarItem.install = function(Vue) {
  Vue.component(TabbarItem.name, TabbarItem)
}

export default TabbarItem
