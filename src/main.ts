import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vue-Router
import router from '@/plugins/router'

// Vuetify
import vuetify from '@/plugins/vuetify'

// Vue-i18n
import i18n from '@/plugins/i18n'

// Vue-Toastify
import Vue3Toastify from 'vue3-toastify'
import options from '@/plugins/toastify'

createApp(App)
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(Vue3Toastify, options)
  .mount('#app')
