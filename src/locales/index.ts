import en from './en.json'
import fr from './fr.json'
import nl from './nl.json'
import it from './it-IT.json'
import ru from './ru.json'
import zh_hans from './zh-Hans.json'
import zh_hant from './zh-Hant.json'

type LocaleDef = {
  title: string
  value: Locales
}

export enum Locales {
  EN = 'en',
  FR = 'fr',
  NL = 'nl',
  IT = 'it-IT',
  RU = 'ru',
  ZH_HANS = 'zh-Hans',
  ZH_HANT = 'zh-Hant'
}

export const LOCALES: LocaleDef[] = [
  { title: 'English', value: Locales.EN },
  { title: 'Français', value: Locales.FR },
  { title: 'Nederlands', value: Locales.NL },
  { title: 'Italian', value: Locales.IT },
  { title: 'Русский', value: Locales.RU },
  { title: '简体中文', value: Locales.ZH_HANS },
  { title: '繁體中文', value: Locales.ZH_HANT }
]

export const messages: Record<Locales, any> = {
  [Locales.EN]: en,
  [Locales.FR]: fr,
  [Locales.NL]: nl,
  [Locales.IT]: it,
  [Locales.RU]: ru,
  [Locales.ZH_HANS]: zh_hans,
  [Locales.ZH_HANT]: zh_hant
}

export const defaultLocale = Locales.EN
export const fallbackLocale = Locales.EN
