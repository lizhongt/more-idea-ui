import Tip from './src/main'

/* istanbul ignore next */
Tip.install = function(Vue) {
  Vue.component(Tip.name, Tip)
}

export default Tip
