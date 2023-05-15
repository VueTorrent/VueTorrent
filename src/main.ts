import { createApp, type DefineComponent } from 'vue'
import { registerPlugins } from './plugins'

import '@/styles/styles.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
registerPlugins(app)

// Register modal components globally
const components = import.meta.glob('./components/Modals/**/*.vue', { eager: true })
Object.entries(components).forEach(([path, definition]) => {
  const componentName = (path.split('/').pop() as string).replace(/\.\w+$/, '')
  app.component(componentName, (definition as DefineComponent).default)
})

app.use(router)
app.mount('#app')
