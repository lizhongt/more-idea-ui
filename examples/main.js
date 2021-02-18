import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moreIdeaUI from 'components'
import FastClick from 'fastclick'

/* eslint-disable */
if ('addEventListener' in document) {
  /* for iOS 10, users can now pinch-to-zoom even when a website sets user-scalable=no in the viewport. */
  document.documentElement.addEventListener(
    'touchstart',
    e => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    },
    false
  )
  /* iOS Safari - Disable double click to zoom */
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    let lastTouchEnd = 0
    document.documentElement.addEventListener(
      'touchend',
      e => {
        let now = new Date().getTime()
        if (now - lastTouchEnd < 300) {
          e.preventDefault()
        }
        lastTouchEnd = now
      },
      false
    )
  }
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      FastClick.attach(document.body)
    },
    false
  )
}
Vue.use(moreIdeaUI)

router.afterEach(to => {
  window.scrollTo(0, 0)
  if (window.top !== window) {
    if (window.top.vueRouter.history.current.path !== to.path) {
      window.top.vueRouter.replace(to.path)
    }
  }
})

/* eslint-enable */
Vue.config.productionTip = false
new Vue({
  data() {
    return {}
  },
  router,
  render: h => h(App)
}).$mount('#app')
