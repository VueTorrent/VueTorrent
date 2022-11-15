import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'typeface-roboto'
import 'typeface-roboto-mono'

import '@/filters.js'
import '@/styles/styles.scss'

import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import { toast, config } from './plugins/toast'
Vue.use(toast, config)
import './plugins/components'

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
