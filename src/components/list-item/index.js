import ListItem from '../list/src/item'

/* istanbul ignore next */
ListItem.install = function(Vue) {
  Vue.component(ListItem.name, ListItem)
}

export default ListItem
