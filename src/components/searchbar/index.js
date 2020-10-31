import SearchBar from './src/main'

/* istanbul ignore next */
SearchBar.install = function(Vue) {
  Vue.component(SearchBar.name, SearchBar)
}

export default SearchBar
