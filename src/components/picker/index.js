import Picker from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
Picker.install = function(Vue) {
  Vue.component(Picker.name, Picker)
  createAPI(Vue, Picker, ['cancel', 'confirm'], false)
}

export default Picker
