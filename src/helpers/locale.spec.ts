import { afterEach, describe, expect, test, vi } from 'vitest'
import { getBrowserLanguageTags, getBrowserLocale, getLocaleFromLanguageTag, getPreferredLocale } from './locale'
import { Locales } from '@/locales'

describe('helpers/locale/getLocaleFromLanguageTag', () => {
  test('matches locales exactly, case-insensitively', () => {
    expect(getLocaleFromLanguageTag('en')).toBe(Locales.EN)
    expect(getLocaleFromLanguageTag('EN')).toBe(Locales.EN)
    expect(getLocaleFromLanguageTag('pt-BR')).toBe(Locales.PT_BR)
    expect(getLocaleFromLanguageTag('pt-br')).toBe(Locales.PT_BR)
    expect(getLocaleFromLanguageTag('zh-Hant')).toBe(Locales.ZH_HANT)
  })

  test('matches the language subtag when the region is not supported', () => {
    expect(getLocaleFromLanguageTag('fr-CA')).toBe(Locales.FR)
    expect(getLocaleFromLanguageTag('de-AT')).toBe(Locales.DE)
    expect(getLocaleFromLanguageTag('es-419')).toBe(Locales.ES)
    expect(getLocaleFromLanguageTag('uk-UA')).toBe(Locales.UK)
  })

  test('matches the script subtag before the language subtag', () => {
    expect(getLocaleFromLanguageTag('zh-Hant-TW')).toBe(Locales.ZH_HANT)
    expect(getLocaleFromLanguageTag('zh-Hans-SG')).toBe(Locales.ZH_HANS)
  })

  test('maps Chinese locales to the matching script', () => {
    expect(getLocaleFromLanguageTag('zh')).toBe(Locales.ZH_HANS)
    expect(getLocaleFromLanguageTag('zh-CN')).toBe(Locales.ZH_HANS)
    expect(getLocaleFromLanguageTag('zh-SG')).toBe(Locales.ZH_HANS)
    expect(getLocaleFromLanguageTag('zh-TW')).toBe(Locales.ZH_HANT)
    expect(getLocaleFromLanguageTag('zh-HK')).toBe(Locales.ZH_HANT)
  })

  test('maps Portuguese locales to Brazilian Portuguese', () => {
    expect(getLocaleFromLanguageTag('pt')).toBe(Locales.PT_BR)
    expect(getLocaleFromLanguageTag('pt-PT')).toBe(Locales.PT_BR)
  })

  test('maps Romanian locales tagged with a region', () => {
    expect(getLocaleFromLanguageTag('ro')).toBe(Locales.RO_RO)
    expect(getLocaleFromLanguageTag('ro-MD')).toBe(Locales.RO_RO)
  })

  test('accepts POSIX style tags', () => {
    expect(getLocaleFromLanguageTag('zh_CN')).toBe(Locales.ZH_HANS)
    expect(getLocaleFromLanguageTag('pt_BR')).toBe(Locales.PT_BR)
  })

  test('returns undefined for unsupported or empty tags', () => {
    expect(getLocaleFromLanguageTag('')).toBe(undefined)
    expect(getLocaleFromLanguageTag('   ')).toBe(undefined)
    expect(getLocaleFromLanguageTag('xx')).toBe(undefined)
    expect(getLocaleFromLanguageTag('en-US-x-private')).toBe(Locales.EN)
  })
})

describe('helpers/locale/getPreferredLocale', () => {
  test('returns the first supported locale', () => {
    expect(getPreferredLocale(['xx', 'zh-TW', 'en'])).toBe(Locales.ZH_HANT)
    expect(getPreferredLocale(['en-GB', 'fr'])).toBe(Locales.EN)
  })

  test('returns undefined when no locale is supported', () => {
    expect(getPreferredLocale([])).toBe(undefined)
    expect(getPreferredLocale(['xx', 'yy-ZZ'])).toBe(undefined)
  })
})

describe('helpers/locale/browser detection', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('reads the preferred languages from navigator.languages', () => {
    vi.stubGlobal('navigator', { languages: ['zh-TW', 'en-US'], language: 'en-US' })
    expect(getBrowserLanguageTags()).toEqual(['zh-TW', 'en-US'])
    expect(getBrowserLocale()).toBe(Locales.ZH_HANT)
  })

  test('falls back to navigator.language', () => {
    vi.stubGlobal('navigator', { language: 'de-DE' })
    expect(getBrowserLanguageTags()).toEqual(['de-DE'])
    expect(getBrowserLocale()).toBe(Locales.DE)
  })

  test('returns undefined without navigator', () => {
    vi.stubGlobal('navigator', undefined)
    expect(getBrowserLanguageTags()).toEqual([])
    expect(getBrowserLocale()).toBe(undefined)
  })
})
