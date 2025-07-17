import { createPinia } from 'pinia'
import { persistencePlugin } from 'pinia-persistence-plugin'

const pinia = createPinia()
pinia.use(
  persistencePlugin({
    assertStorage: () => {},
    storeKeysPrefix: 'vuetorrent',
    persistenceDefault: false,
    ensureAsyncStorageUpdateOrder: true,
    debug: import.meta.env.DEV,
  })
)

export default pinia
