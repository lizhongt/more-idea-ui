import ActionSheet from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
ActionSheet.install = function(Vue) {
  Vue.component(ActionSheet.name, ActionSheet)
  createAPI(Vue, ActionSheet, ['choose', 'cancel'], true)
}

export default ActionSheet
