import { ref } from 'vue'
import { defineStore } from 'pinia'
import AppPreferences from '@/types/qbit/models/AppPreferences.ts'
import { useQbitApi } from '@/composables'

export const usePrerefenceStore = defineStore('preferences', () => {
  const preferences = ref<AppPreferences | null>(null)

  async function fetchPreferences() {
    const { data, error, getData } = useQbitApi('app/preferences')

    await getData()

    if (error.value) {
      console.error(error.value)
      return false
    } else {
      preferences.value = data.value
      return true
    }
  }

  async function setPreferences() {
    const { postData } = useQbitApi('app/setPreferences')
    await postData(preferences)
  }

  return { preferences, fetchPreferences, setPreferences }
})