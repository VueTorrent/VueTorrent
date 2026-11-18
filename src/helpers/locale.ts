import { Locales } from '@/locales'

/**
 * BCP 47 tags which don't match a VueTorrent locale as-is.
 * Keys are lowercased, values are the locales they resolve to.
 */
const localeOverrides: Record<string, Locales> = {
  // Chinese: the script matters more than the region, and VueTorrent uses script tags
  zh: Locales.ZH_HANS,
  'zh-cn': Locales.ZH_HANS,
  'zh-my': Locales.ZH_HANS,
  'zh-sg': Locales.ZH_HANS,
  'zh-hans': Locales.ZH_HANS,
  'zh-hk': Locales.ZH_HANT,
  'zh-mo': Locales.ZH_HANT,
  'zh-tw': Locales.ZH_HANT,
  'zh-hant': Locales.ZH_HANT,
  // Portuguese: Brazilian Portuguese is the only variant available
  pt: Locales.PT_BR,
  'pt-pt': Locales.PT_BR,
  // Romanian is usually tagged with its region
  ro: Locales.RO_RO,
  'ro-md': Locales.RO_RO,
}

/**
 * Find the closest VueTorrent locale for a single BCP 47 language tag.
 *
 * The lookup is done in the following order, for each candidate of the tag:
 * 1. Exact match with a VueTorrent locale, case-insensitive (`pt-BR`, `zh-Hant`...)
 * 2. Known overrides for variants which don't exist in VueTorrent (`zh-CN`, `pt-PT`...)
 * 3. Language subtag only, matched against the locale's language (`fr-CA` -> `fr`)
 *
 * @returns the matching locale, or `undefined` if the tag doesn't match any locale
 */
export function getLocaleFromLanguageTag(languageTag: string): Locales | undefined {
  const tag = languageTag.trim().toLowerCase().replace('_', '-')
  if (!tag) return undefined

  const [language, ...subtags] = tag.split('-')
  // The first subtag can be a script (`zh-Hant-TW`) or a region (`fr-CA`), both are worth trying
  const candidates = subtags.length > 0 ? [tag, `${language}-${subtags[0]}`, language] : [tag]

  for (const candidate of candidates) {
    const locale = Object.values(Locales).find(value => value.toLowerCase() === candidate)
    if (locale) return locale

    const override = localeOverrides[candidate]
    if (override) return override
  }

  return undefined
}

/**
 * Find the best VueTorrent locale for a list of BCP 47 language tags, ordered by preference.
 * The first matching tag wins so the user's preferred language has precedence.
 *
 * @returns the matching locale, or `undefined` if none of the tags match a locale
 */
export function getPreferredLocale(languageTags: readonly string[]): Locales | undefined {
  for (const languageTag of languageTags) {
    const locale = getLocaleFromLanguageTag(languageTag)
    if (locale) return locale
  }

  return undefined
}

/**
 * Get the language tags accepted by the browser, ordered by preference.
 */
export function getBrowserLanguageTags(): string[] {
  if (typeof navigator === 'undefined') return []

  return navigator.languages?.length ? [...navigator.languages] : [navigator.language].filter(Boolean)
}

/**
 * Get the VueTorrent locale matching the browser's preferred languages.
 *
 * @returns the matching locale, or `undefined` if the browser language isn't supported
 */
export function getBrowserLocale(): Locales | undefined {
  return getPreferredLocale(getBrowserLanguageTags())
}
