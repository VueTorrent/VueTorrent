import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import zh_hans from './zh-Hans.json'
import zh_hant from './zh-Hant.json'
import ru from './ru.json'

type LocaleDef = {
  title: string
  value: Locales
}

export enum Locales {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  ZH_HANS = 'zh-Hans',
  ZH_HANT = 'zh-Hant'
  RU = 'ru'
}

export const LOCALES: LocaleDef[] = [
  { title: 'English', value: Locales.EN },
  { title: 'Español', value: Locales.ES },
  { title: 'Français', value: Locales.FR },
  { title: '简体中文', value: Locales.ZH_HANS },
  { title: '繁體中文', value: Locales.ZH_HANT }
  { title: 'Русский', value: Locales.RU }
]

export const messages: Record<Locales, any> = {
  [Locales.EN]: en,
  [Locales.ES]: es,
  [Locales.FR]: fr,
  [Locales.ZH_HANS]: zh_hans,
  [Locales.ZH_HANT]: zh_hant
  [Locales.RU]: ru
}

export const defaultLocale = Locales.EN
export const fallbackLocale = Locales.EN
