import cz from './cs-CZ.json'
import en from './en.json'
import fr from './fr.json'
import it from './it-IT.json'
import ko from './ko.json'
import nl from './nl.json'
import ru from './ru.json'
import zh_hans from './zh-Hans.json'
import zh_hant from './zh-Hant.json'

type LocaleDef = {
  title: string
  value: Locales
}

export enum Locales {
  CZ = 'cs-CZ',
  EN = 'en',
  FR = 'fr',
  IT = 'it-IT',
  KO = 'ko',
  NL = 'nl',
  RU = 'ru',
  ZH_HANS = 'zh-Hans',
  ZH_HANT = 'zh-Hant'
}

export const LOCALES: LocaleDef[] = [
  { title: 'čeština', value: Locales.CZ },
  { title: 'English', value: Locales.EN },
  { title: 'Français', value: Locales.FR },
  { title: 'Italian', value: Locales.IT },
  { title: '한국어', value: Locales.KO },
  { title: 'Nederlands', value: Locales.NL },
  { title: 'Русский', value: Locales.RU },
  { title: '简体中文', value: Locales.ZH_HANS },
  { title: '繁體中文', value: Locales.ZH_HANT }
]

export const messages: Record<Locales, any> = {
  [Locales.CZ]: cz,
  [Locales.EN]: en,
  [Locales.FR]: fr,
  [Locales.IT]: it,
  [Locales.KO]: ko,
  [Locales.NL]: nl,
  [Locales.RU]: ru,
  [Locales.ZH_HANS]: zh_hans,
  [Locales.ZH_HANT]: zh_hant
}

export const defaultLocale = Locales.EN
export const fallbackLocale = Locales.EN
