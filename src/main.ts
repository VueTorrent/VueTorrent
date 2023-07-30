import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vue-Router
import router from '@/plugins/router'

// Vuetify
import vuetify from '@/plugins/vuetify'

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
