import { Locales } from './locales'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import id from './id.json'
import it from './it.json'
import ja from './ja.json'
import nl from './nl.json'
import pt_br from './pt-br.json'
import ru from './ru.json'
import uk from './uk.json'
import vi from './vi.json'
import zh_hans from './zh-hans.json'
import zh_hant from './zh-hant.json'

export const messages: Record<Locales, any> = {
    [Locales.EN]: en,
    [Locales.ES]: es,
    [Locales.FR]: fr,
    [Locales.ID]: id,
    [Locales.IT]: it,
    [Locales.JA]: ja,
    [Locales.NL]: nl,
    [Locales.PT_BR]: pt_br,
    [Locales.RU]: ru,
    [Locales.UK]: uk,
    [Locales.VI]: vi,
    [Locales.ZH_HANS]: zh_hans,
    [Locales.ZH_HANT]: zh_hant
}

export const defaultLocale = Locales.EN
