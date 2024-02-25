import { ref } from 'vue'
import { defineStore } from 'pinia'
import AppPreferences from '@/types/qbit/models/AppPreferences'
import { qbit } from '@/services'

export const usePreferenceStore = defineStore(
  'preferences',
  () => {
    const preferences = ref<AppPreferences>()

    async function fetchPreferences() {
      preferences.value = await qbit.getPreferences()
    }

    async function setPreferences() {
      await qbit.setPreferences(preferences.value!)
    }

    return {
      preferences,
      fetchPreferences,
      setPreferences,
      $reset: async () => {
        await fetchPreferences()
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage }]
    }
  }
)
