import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@babel/polyfill'
import vuetify from './plugins/vuetify'
import 'typeface-roboto'
import 'typeface-roboto-mono'
import { i18n } from './lang/index'

/* eslint-disable no-unused-vars */
import filters from '@/filters'
import styles from '@/styles/styles.scss'
/* eslint-enable no-unused-vars */

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
Vue.use(Toast, {
  maxToasts: 5,
  timeout: 2000
})

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
  i18n,
  render: h => h(App)
}).$mount('#app')
