import { createApp } from 'vue'
import '@/styles/styles.scss'
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
import pinia from '@/plugins/pinia'

// Font
import '@fontsource/roboto'

const app = createApp(App)

app.config.performance = true

app.use(router).use(vuetify).use(i18n).use(Vue3Toastify, options).use(pinia).mount('#app')
