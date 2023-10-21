import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

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
import pinia from '@/plugins/pinia'

// Font
import '@fontsource/roboto'

createApp(App).use(router).use(vuetify).use(i18n).use(Vue3Toastify, options).use(pinia).mount('#app')
