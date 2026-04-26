import { createApp } from 'vue'
import '@fontsource/roboto'
import './styles/styles.scss'
import Vue3Toastify from 'vue3-toastify'
import App from './App.vue'
import i18n from './plugins/i18n'
import pinia from './plugins/pinia'
import router from './plugins/router'
import toastifyOptions from './plugins/toastify'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.config.performance = true

app.use(router).use(vuetify).use(i18n).use(Vue3Toastify, toastifyOptions).use(pinia).mount('#app')
