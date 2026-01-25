import cs from './cs.json'
import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import hu from './hu.json'
import it from './it.json'
import ja from './ja.json'
import ko from './ko.json'
import nl from './nl.json'
import pl from './pl.json'
import pt_br from './pt-BR.json'
import ru from './ru.json'
import tr from './tr.json'
import uk from './uk.json'
import zh_hans from './zh-Hans.json'
import zh_hant from './zh-Hant.json'

type LocaleDef = { title: string; value: Locales }

export enum Locales {
  CS = 'cs',
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  HU = 'hu',
  IT = 'it',
  JA = 'ja',
  KO = 'ko',
  NL = 'nl',
  PL = 'pl',
  PT_BR = 'pt-BR',
  RU = 'ru',
  TR = 'tr',
  UK = 'uk',
  ZH_HANS = 'zh-Hans',
  ZH_HANT = 'zh-Hant',
}

export const LOCALES: LocaleDef[] = [
  { title: 'čeština', value: Locales.CS },
  { title: 'Deutsch', value: Locales.DE },
  { title: 'English', value: Locales.EN },
  { title: 'español', value: Locales.ES },
  { title: 'Français', value: Locales.FR },
  { title: 'magyar', value: Locales.HU },
  { title: 'italiano', value: Locales.IT },
  { title: '日本語', value: Locales.JA },
  { title: '한국어', value: Locales.KO },
  { title: 'Nederlands', value: Locales.NL },
  { title: 'polski', value: Locales.PL },
  { title: 'português (Brasil)', value: Locales.PT_BR },
  { title: 'Русский', value: Locales.RU },
  { title: 'Türkçe', value: Locales.TR },
  { title: 'українська', value: Locales.UK },
  { title: '简体中文', value: Locales.ZH_HANS },
  { title: '繁體中文', value: Locales.ZH_HANT },
]

export const messages: Record<Locales, any> = {
  [Locales.CS]: cs,
  [Locales.DE]: de,
  [Locales.EN]: en,
  [Locales.ES]: es,
  [Locales.FR]: fr,
  [Locales.HU]: hu,
  [Locales.IT]: it,
  [Locales.JA]: ja,
  [Locales.KO]: ko,
  [Locales.NL]: nl,
  [Locales.PL]: pl,
  [Locales.PT_BR]: pt_br,
  [Locales.RU]: ru,
  [Locales.TR]: tr,
  [Locales.UK]: uk,
  [Locales.ZH_HANS]: zh_hans,
  [Locales.ZH_HANT]: zh_hant,
}

export const defaultLocale = Locales.EN
export const fallbackLocale = Locales.EN
