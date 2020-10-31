import Tips from './src/main'

/* istanbul ignore next */
Tips.install = function(Vue) {
  Vue.component(Tips.name, Tips)
}

export default Tips
