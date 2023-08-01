import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {useI18n} from 'vue-i18n'
import {Theme} from '@/plugins/vuetify.ts'

export const useVueTorrentStore = defineStore('vuetorrent', () => {
  const language = ref('en')
  const darkMode = ref(false)

  const i18n = useI18n()

  watch(language, setLanguage)

  function setLanguage(newLang: string) {
    i18n.locale.value = newLang
  }

  function getThemeName() {
    return darkMode.value ? Theme.DARK : Theme.LIGHT
  }

  return { darkMode, language, setLanguage, getThemeName }
})