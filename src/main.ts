import { createApp } from 'vue'
import './styles/styles.scss'
import Vue3Toastify from 'vue3-toastify'
import App from './App.vue'

// Vue-Router
import i18n from './plugins/i18n'
import pinia from './plugins/pinia'
import router from './plugins/router'

// Vuetify
import options from './plugins/toastify'
import vuetify from './plugins/vuetify'

// Vue-i18n

// Vue-Toastify

// Pinia

// Font
import '@fontsource/roboto'

const app = createApp(App)

app.config.performance = true

app.use(router).use(vuetify).use(i18n).use(Vue3Toastify, options).use(pinia).mount('#app')
