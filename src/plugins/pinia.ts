import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(
  createPersistedState({
    auto: false,
    key: storeKey => `vuetorrent_${storeKey}`,
    debug: import.meta.env.DEV,
  })
)

export default pinia
