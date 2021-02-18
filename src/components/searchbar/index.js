import Searchbar from './src/main'

/* istanbul ignore next */
Searchbar.install = function(Vue) {
  Vue.component(Searchbar.name, Searchbar)
}

export default Searchbar
