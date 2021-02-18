import Field from './src/main'

/* istanbul ignore next */
Field.install = function(Vue) {
  Vue.component(Field.name, Field)
}

export default Field
