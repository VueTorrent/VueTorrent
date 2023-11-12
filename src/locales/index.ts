import en from './en.json'
import fr from './fr.json'
import nl from './nl.json'
import pl from './pl.json'
import ru from './ru.json'
import zh_hans from './zh-Hans.json'
import zh_hant from './zh-Hant.json'

type LocaleDef = { title: string; value: Locales }

export enum Locales {
  EN = 'en',
  FR = 'fr',
  NL = 'nl',
  PL = 'pl',
  RU = 'ru',
  ZH_HANS = 'zh-Hans',
  ZH_HANT = 'zh-Hant',
}

export const LOCALES: LocaleDef[] = [
  { title: 'English', value: Locales.EN },
  { title: 'français', value: Locales.FR },
  { title: 'Nederlands', value: Locales.NL },
  { title: 'polski', value: Locales.PL },
  { title: 'русский', value: Locales.RU },
  { title: '简体中文', value: Locales.ZH_HANS },
  { title: '繁體中文', value: Locales.ZH_HANT },
]

export const messages: Record<Locales, any> = {
  [Locales.EN]: en,
  [Locales.FR]: fr,
  [Locales.NL]: nl,
  [Locales.PL]: pl,
  [Locales.RU]: ru,
  [Locales.ZH_HANS]: zh_hans,
  [Locales.ZH_HANT]: zh_hant,
}

export const defaultLocale = Locales.EN
export const fallbackLocale = Locales.EN
