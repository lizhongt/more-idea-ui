import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('../views/basic/button.vue')
  },
  {
    path: '/tabbar',
    name: 'Tabbar',
    component: () => import('../views/basic/tabbar.vue')
  },
  {
    path: '/searchbar',
    name: 'Searchbar',
    component: () => import('../views/basic/searchbar.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/basic/list.vue')
  },
  {
    path: '/tip',
    name: 'Tip',
    component: () => import('../views/basic/tip.vue')
  },
  {
    path: '/badge',
    name: 'Badge',
    component: () => import('../views/basic/badge.vue')
  },
  {
    path: '/bar',
    name: 'Bar',
    component: () => import('../views/basic/bar.vue')
  },
  {
    path: '/anchor',
    name: 'Anchor',
    component: () => import('../views/basic/anchor.vue')
  },
  {
    path: '/checkbox',
    name: 'CheckBox',
    component: () => import('../views/form/checkbox.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import('../views/form/radio.vue')
  },
  {
    path: '/field',
    name: 'Field',
    component: () => import('../views/form/field.vue')
  },
  {
    path: '/switch',
    name: 'Switch',
    component: () => import('../views/form/switch.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/form/upload.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/form/form.vue')
  },
  {
    path: '/actionsheet',
    name: 'ActionSheet',
    component: () => import('../views/fadeback/action-sheet.vue')
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: () => import('../views/fadeback/dialog.vue')
  },
  {
    path: '/toast',
    name: 'Toast',
    component: () => import('../views/fadeback/toast.vue')
  },
  {
    path: '/swiper',
    name: 'Swiper',
    component: () => import('../views/fadeback/swiper.vue')
  },
  {
    path: '/picker',
    name: 'Picker',
    component: () => import('../views/fadeback/picker.vue')
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () => import('../views/fadeback/scroll.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/bus/calendar.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
