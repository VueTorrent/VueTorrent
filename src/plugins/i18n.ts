import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'

import { messages } from '@/lang'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages,
  pluralizationRules: {
    ru: function (choice, choicesLength) {
      if (choice === 0) {
        return 0
      }
      const teen = choice > 10 && choice < 20
      const endsWithOne = choice % 10 === 1
      if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2
      }
      if (!teen && endsWithOne) {
        return 1
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2
      }
      return choicesLength < 4 ? 2 : 3
    }
  }
})

export function setLanguage(lang: string) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html')?.setAttribute('lang', lang)

  return lang
}

export default i18n
