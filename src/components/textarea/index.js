import TextArea from './src/main'

/* istanbul ignore next */
TextArea.install = function(Vue) {
  Vue.component(TextArea.name, TextArea)
}

export default TextArea
