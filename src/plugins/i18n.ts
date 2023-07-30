import { createI18n } from 'vue-i18n'
import {defaultLocale, fallbackLocale, messages} from '@/lang'

export default createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale,
  messages
})
