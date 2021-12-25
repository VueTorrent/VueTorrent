import Vue from 'vue'
import App from '@/App.vue'
import '@babel/polyfill'
import 'typeface-roboto'
import 'typeface-roboto-mono'

import router from '@/router.js'
import store from '@/store/index.js'
import vuetify from './plugins/vuetify.js'
import { i18n } from './lang/index.js'
import '@/filters.js'
import '@/styles/styles.scss'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
Vue.use(Toast, {
  maxToasts: 5,
  timeout: 2000
})


Vue.config.productionTip = false

// register modals
const components = import.meta.glob('./components/Modals/**/*.vue')
Object.entries(components).forEach(([path, definition]) => { 
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  Vue.component(componentName, definition)
})


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
