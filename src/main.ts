import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vue-Router
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
