import { createApp, DefineComponent } from 'vue'
import '@fontsource-variable/roboto-mono'
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

const app = createApp(App)

// Register modal components globally
const components = import.meta.glob('./components/Dialogs/**/*.vue', { eager: true })
Object.entries(components).forEach(([path, definition]) => {
  const componentName = (path.split('/').pop() as string).replace(/\.vue$/, '')
  app.component(componentName, (definition as DefineComponent).default)
})

app.use(router).use(vuetify).use(i18n).use(Vue3Toastify, options).use(pinia).mount('#app')
