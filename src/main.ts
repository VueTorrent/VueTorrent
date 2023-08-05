import { createApp } from 'vue'
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

// Pinia
import { createPinia } from 'pinia'

createApp(App)
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(Vue3Toastify, options)
  .use(createPinia())
  .mount('#app')
