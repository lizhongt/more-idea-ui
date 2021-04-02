import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moreIdeaUI from 'components'

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
