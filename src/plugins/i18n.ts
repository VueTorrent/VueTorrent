import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'

import { messages} from '../lang'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages
})

export function setLanguage(lang: string) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html')?.setAttribute('lang', lang)

  return lang
}

export default i18n
