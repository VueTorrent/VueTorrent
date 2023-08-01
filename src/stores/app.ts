import { ref } from 'vue'
import { defineStore } from 'pinia'
import { qbit } from '@/services'

export const useAppStore = defineStore('app', () => {
  const version = ref('unknown')


  async function fetchVersion() {
    version.value = await qbit.getAppVersion()
  }

  return { version, fetchVersion }
})