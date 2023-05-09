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
  text: string
  value: Locales
}

export const LOCALES: LocaleDef[] = [
  { text: 'English', value: Locales.EN },
  { text: 'Español', value: Locales.ES },
  { text: 'Français', value: Locales.FR },
  { text: 'Bahasa Indonesia', value: Locales.ID },
  { text: 'Italiano', value: Locales.IT },
  { text: '日本語', value: Locales.JA },
  { text: 'Dutch', value: Locales.NL },
  { text: 'Português', value: Locales.PT_BR },
  { text: 'Русский язык', value: Locales.RU },
  { text: 'Українська', value: Locales.UK },
  { text: 'Tiếng Việt', value: Locales.VI },
  { text: '简体中文', value: Locales.ZH_HANS },
  { text: '繁體中文', value: Locales.ZH_HANT }
]
