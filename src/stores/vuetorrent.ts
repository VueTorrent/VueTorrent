import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {useI18n} from 'vue-i18n'
import {Theme} from '@/plugins/vuetify.ts'
import {useTheme} from 'vuetify'

export const useVueTorrentStore = defineStore('vuetorrent', () => {
  const language = ref('en')
  const darkMode = ref(false)

  const i18n = useI18n()
  const theme = useTheme()

  watch(language, setLanguage)
  watch(darkMode, updateTheme)

  function setLanguage(newLang: string) {
    i18n.locale.value = newLang
  }

  function updateTheme() {
    theme.global.name.value = darkMode.value ? Theme.DARK : Theme.LIGHT
  }

  return { darkMode, language, setLanguage, updateTheme }
})