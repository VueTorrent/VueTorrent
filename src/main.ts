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

// register modals
const components = import.meta.glob('./components/Modals/**/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  const componentName = (path.split('/').pop() as string).replace(/\.\w+$/, '')
  Vue.component(componentName, definition)
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
