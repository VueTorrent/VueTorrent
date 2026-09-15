import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useVueTorrentStore } from './vuetorrent'

vi.mock('@vueuse/core', () => ({
  useMediaQuery: () => ref(false),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    currentRoute: ref({ path: '/' }),
    push: vi.fn(),
  }),
}))

vi.mock('vuetify', () => ({
  useTheme: () => ({
    change: vi.fn(),
  }),
}))

vi.mock('@/composables', () => ({
  useI18nUtils: () => ({
    locale: ref('en'),
  }),
}))

describe('useVueTorrentStore favorite save paths', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('normalizes favorite save paths', () => {
    const store = useVueTorrentStore()

    store.setFavoriteSavePaths([' /downloads/movies ', '', '/downloads/tv', '/downloads/movies', '   '])

    expect(store.favoriteSavePaths).toEqual(['/downloads/movies', '/downloads/tv'])
  })

  it('clears favorite save paths on reset', () => {
    const store = useVueTorrentStore()
    store.setFavoriteSavePaths(['/downloads'])

    store.$reset()

    expect(store.favoriteSavePaths).toEqual([])
  })
})
