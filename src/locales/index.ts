import cs_cz from './cs-CZ.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import hu from './hu.json'
import it_it from './it-IT.json'
import ja_jp from './ja-JP.json'
import ko from './ko.json'
import nl from './nl.json'
import pl from './pl.json'
import ru from './ru.json'
import tr from './tr.json'
import zh_hans from './zh-Hans.json'
import zh_hant from './zh-Hant.json'

type LocaleDef = { title: string; value: Locales }

export enum Locales {
  CS_CZ = 'cs-CZ',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  HU = 'hu',
  IT_IT = 'it-IT',
  JA_JP = 'ja-JP',
  KO = 'ko',
  NL = 'nl',
  PL = 'pl',
  RU = 'ru',
  TR = 'tr',
  ZH_HANS = 'zh-Hans',
  ZH_HANT = 'zh-Hant'
}

export const LOCALES: LocaleDef[] = [
  { title: 'čeština (Česko)', value: Locales.CS_CZ },
  { title: 'English', value: Locales.EN },
  { title: 'español', value: Locales.ES },
  { title: 'Français', value: Locales.FR },
  { title: 'magyar', value: Locales.HU },
  { title: 'italiano (Italia)', value: Locales.IT_IT },
  { title: '日本語 (日本)', value: Locales.JA_JP },
  { title: '한국어', value: Locales.KO },
  { title: 'Nederlands', value: Locales.NL },
  { title: 'polski', value: Locales.PL },
  { title: 'Русский', value: Locales.RU },
  { title: 'Türkçe', value: Locales.TR },
  { title: '简体中文', value: Locales.ZH_HANS },
  { title: '繁體中文', value: Locales.ZH_HANT }
]

export const messages: Record<Locales, any> = {
  [Locales.CS_CZ]: cs_cz,
  [Locales.EN]: en,
  [Locales.ES]: es,
  [Locales.FR]: fr,
  [Locales.HU]: hu,
  [Locales.IT_IT]: it_it,
  [Locales.JA_JP]: ja_jp,
  [Locales.KO]: ko,
  [Locales.NL]: nl,
  [Locales.PL]: pl,
  [Locales.RU]: ru,
  [Locales.TR]: tr,
  [Locales.ZH_HANS]: zh_hans,
  [Locales.ZH_HANT]: zh_hant
}

export const defaultLocale = Locales.EN
export const fallbackLocale = Locales.EN
