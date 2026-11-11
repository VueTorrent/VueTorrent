import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useVueTorrentStore } from './vuetorrent'
import { AUTO_LANGUAGE } from '@/constants/vuetorrent'
import { Locales } from '@/locales'

const { locale } = vi.hoisted(() => ({ locale: { value: 'en' } }))

vi.mock('@/composables', () => ({
  useI18nUtils: () => ({ locale }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('vuetify', () => ({
  useTheme: () => ({ change: vi.fn() }),
}))

describe('stores/vuetorrent - language', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    locale.value = 'en'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('follows the browser language by default', () => {
    vi.stubGlobal('navigator', { languages: ['fr-FR'], language: 'fr-FR' })
    const store = useVueTorrentStore()
    expect(store.language).toBe(AUTO_LANGUAGE)

    store.setLanguage(store.language)
    expect(locale.value).toBe(Locales.FR)
  })

  test('falls back to English when the browser language is not supported', () => {
    vi.stubGlobal('navigator', { languages: ['xx-XX'], language: 'xx-XX' })
    const store = useVueTorrentStore()

    store.setLanguage(store.language)
    expect(locale.value).toBe(Locales.EN)
  })

  test('keeps the document language in sync', () => {
    vi.stubGlobal('navigator', { languages: ['ja-JP'], language: 'ja-JP' })
    const store = useVueTorrentStore()

    store.setLanguage(AUTO_LANGUAGE)
    expect(document.documentElement.lang).toBe(Locales.JA)

    store.setLanguage(Locales.ZH_HANT)
    expect(document.documentElement.lang).toBe(Locales.ZH_HANT)
  })

  test('applies the manually selected language', () => {
    vi.stubGlobal('navigator', { languages: ['fr-FR'], language: 'fr-FR' })
    const store = useVueTorrentStore()

    store.language = Locales.ZH_HANT
    store.setLanguage(store.language)
    expect(locale.value).toBe(Locales.ZH_HANT)
  })

  test('resets to the automatic language', () => {
    vi.stubGlobal('navigator', { languages: ['de-DE'], language: 'de-DE' })
    const store = useVueTorrentStore()
    store.language = Locales.JA

    store.$reset()
    expect(store.language).toBe(AUTO_LANGUAGE)

    store.setLanguage(store.language)
    expect(locale.value).toBe(Locales.DE)
  })
})
