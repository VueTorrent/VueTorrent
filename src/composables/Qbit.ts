import { QbitStatus } from '@/constants/vuetorrent'
import { IProvider } from '@/services/qbit'
import { useQbitStore } from '@/stores'
import { storeToRefs } from 'pinia'

export async function useQbit(): Promise<IProvider> {
  const qbitStore = useQbitStore()
  const { provider, status, error } = storeToRefs(qbitStore)

  if (!provider.value && status.value !== QbitStatus.ERRORED) {
    await qbitStore.initProvider()
  }

  if (status.value === QbitStatus.ERRORED) {
    throw error.value
  }

  return provider.value!
}
