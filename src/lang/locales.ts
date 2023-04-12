export enum Locales {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  ID = 'id',
  IT = 'it',
  JA = 'ja',
  NL = 'nl',
  PT_BR = 'pt-br',
  RU = 'ru',
  UK = 'ua',
  VI = 'vi',
  ZH_HANS = 'zh-hans',
  ZH_HANT = 'zh-hant'
}

type LocaleDef = {
  value: Locales
  caption: string
}

export const LOCALES: LocaleDef[] = [
  { value: Locales.EN, caption: 'English' },
  { value: Locales.ES, caption: 'Español' },
  { value: Locales.FR, caption: 'Français' },
  { value: Locales.ID, caption: 'Bahasa Indonesia' },
  { value: Locales.IT, caption: 'Italiano' },
  { value: Locales.JA, caption: '日本語' },
  { value: Locales.NL, caption: 'Dutch' },
  { value: Locales.PT_BR, caption: 'Português' },
  { value: Locales.RU, caption: 'Русский язык' },
  { value: Locales.UK, caption: 'Українська' },
  { value: Locales.VI, caption: 'Tiếng Việt' },
  { value: Locales.ZH_HANS, caption: '简体中文' },
  { value: Locales.ZH_HANT, caption: '繁体中文' }
]
