export enum Locales {
  EN = 'en',
  // ES = 'es',
  FR = 'fr',
  // ID = 'id',
  // IT = 'it',
  // JA = 'ja',
  // NL = 'nl',
  // PT_BR = 'pt-br',
  // RU = 'ru',
  // UK = 'ua',
  // VI = 'vi',
  // ZH_HANS = 'zh-hans',
  // ZH_HANT = 'zh-hant'
}

type LocaleDef = {
  title: string
  value: Locales
}

export const LOCALES: LocaleDef[] = [
  { title: 'English', value: Locales.EN },
  // { title: 'Español', value: Locales.ES },
  { title: 'Français', value: Locales.FR },
  // { title: 'Bahasa Indonesia', value: Locales.ID },
  // { title: 'Italiano', value: Locales.IT },
  // { title: '日本語', value: Locales.JA },
  // { title: 'Dutch', value: Locales.NL },
  // { title: 'Português', value: Locales.PT_BR },
  // { title: 'Русский язык', value: Locales.RU },
  // { title: 'Українська', value: Locales.UK },
  // { title: 'Tiếng Việt', value: Locales.VI },
  // { title: '简体中文', value: Locales.ZH_HANS },
  // { title: '繁體中文', value: Locales.ZH_HANT }
]