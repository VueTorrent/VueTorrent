import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@babel/polyfill'
import 'typeface-roboto'

/* eslint-disable no-unused-vars */
import filters from '@/filters'
import styles from '@/styles/styles.scss'
/* eslint-enable no-unused-vars */

import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import vuetify from './plugins/vuetify'
Vue.use(Toast, {
  maxToasts: 5,
  timeout: 2000
})

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)

import './registerServiceWorker'

Vue.config.productionTip = false

// register modals
const files = require.context('@/components/Modals', true, /\.vue$/i)
files
  .keys()
  .map(key =>
    Vue.component(key.split('/').pop().split('.')[0], files(key).default)
  )

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
