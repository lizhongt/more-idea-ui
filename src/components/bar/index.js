import Bar from './src/main'

/* istanbul ignore next */
Bar.install = function(Vue) {
  Vue.component(Bar.name, Bar)
}

export default Bar
