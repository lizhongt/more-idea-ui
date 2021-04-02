import Cutter from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
Cutter.install = function(Vue) {
  Vue.component(Cutter.name, Cutter)
  createAPI(Vue, Cutter, ['confirm', 'cancel', 'close'], true)
}

export default Cutter
