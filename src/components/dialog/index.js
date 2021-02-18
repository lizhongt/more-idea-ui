import Dialog from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
Dialog.install = function(Vue) {
  Vue.component(Dialog.name, Dialog)
  createAPI(Vue, Dialog, ['confirm', 'cancel', 'close'], true)
}

export default Dialog
