import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { useTask } from 'vue-concurrency'
import qbit from '@/services/qbit'
import AppPreferences from '@/types/qbit/models/AppPreferences'
import { AppPreferencesPayload } from '@/types/qbit/payloads'

export const usePreferenceStore = defineStore(
  'preferences',
  () => {
    const task = useTask(function* () {
      yield fetchPreferences()
    }).drop()

    const preferences = ref<AppPreferences>()

    async function fetchPreferences() {
      preferences.value = await qbit.getPreferences()
    }

    async function setPreferences(newPref?: AppPreferencesPayload) {
      await qbit.setPreferences(newPref ?? preferences.value!)
    }

    return {
      preferences,
      fetchPreferences: task.perform,
      setPreferences,
      $reset: async () => {
        await task.perform()
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePreferenceStore, import.meta.hot))
}
