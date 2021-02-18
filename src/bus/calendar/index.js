import FlexCalendar from './src/main'

/* istanbul ignore next */
FlexCalendar.install = function(Vue) {
  Vue.component(FlexCalendar.name, FlexCalendar)
}

export default FlexCalendar
