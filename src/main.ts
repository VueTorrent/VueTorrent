import { createApp } from 'vue'

import App from '@/App.vue'
import i18n from './plugins/i18n'
import router from '@/router'
import store from '@/store'
import 'typeface-roboto'
import 'typeface-roboto-mono'

import '@/filters.js'
import '@/styles/styles.scss'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(store)


import vuetify from './plugins/vuetify'
app.use(vuetify)

import { toast, config } from './plugins/toast'
app.use(toast, config)

// register modals
const components = import.meta.glob('./components/Modals/**/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  const componentName = (path.split('/').pop() as string).replace(/\.\w+$/, '')
  app.component(componentName, definition)
})

app.mount('#app')
