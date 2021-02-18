import Toast from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
Toast.install = function(Vue) {
  Vue.component(Toast.name, Toast)
  createAPI(Vue, Toast, ['show', 'hide'], true)
}

export default Toast
