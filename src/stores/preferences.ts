import { ref } from 'vue'
import { defineStore } from 'pinia'
import AppPreferences from '@/types/qbit/models/AppPreferences.ts'
import { qbit } from '@/services'

export const usePreferenceStore = defineStore('preferences', () => {
  const preferences = ref<AppPreferences | null>(null)

  async function fetchPreferences() {
    preferences.value = await qbit.getAppPreferences()
  }

  async function setPreferences() {
    await qbit.setPreferences(preferences.value!)
  }

  return { preferences, fetchPreferences, setPreferences }
})