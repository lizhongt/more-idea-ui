import Popup from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
Popup.install = function(Vue) {
  Vue.component(Popup.name, Popup)
  createAPI(Vue, Popup, ['mask-click'], true)
}

export default Popup
