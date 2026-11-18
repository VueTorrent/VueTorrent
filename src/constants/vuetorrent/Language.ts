import type { Locales } from '@/locales'

/**
 * Value of the language setting, meaning the locale follows the browser language.
 */
export const AUTO_LANGUAGE = 'auto'

/**
 * Value of the language setting: either a `Locales` value or `AUTO_LANGUAGE`.
 */
export type LanguageSetting = Locales | typeof AUTO_LANGUAGE
