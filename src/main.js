import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from './plugins/vuetify'
import 'typeface-roboto'
import 'typeface-roboto-mono'
import { i18n } from './lang/index'
import '@/filters.js'
import '@/styles/styles.scss'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
Vue.use(Toast, {
  maxToasts: 5,
  timeout: 2000,
  position: POSITION.BOTTOM_RIGHT
})


// register modals
// const components = import.meta.glob('./components/Modals/**/*.vue')
// Object.entries(components).forEach(([path, definition]) => { 
//   const componentName = path.split('/').pop().replace(/\.\w+$/, '')
//   Vue.component(componentName, definition)
// })


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
