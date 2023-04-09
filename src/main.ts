import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import { registerPlugins } from './plugins'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

registerPlugins(app)

// app.use(createPinia())
// app.use(router)

app.mount('#app')
