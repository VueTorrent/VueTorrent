import { QbitStatus } from '@/constants/vuetorrent'
import { createProvider, IProvider } from '@/services/qbit'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQbitStore = defineStore('qbit', () => {
  const provider = ref<IProvider>()
  const status = ref<QbitStatus>(QbitStatus.INIT)
  const error = ref<Error>()

  async function initProvider() {
    if (provider.value || status.value === QbitStatus.LOADING) return

    status.value = QbitStatus.LOADING
    try {
      provider.value = await createProvider()
      status.value = QbitStatus.WORKING
    } catch (err) {
      status.value = QbitStatus.ERRORED
      error.value = err instanceof Error ? err : new Error(String(err))
    }
  }

  return {
    provider,
    status,
    error,
    initProvider,
  }
})
