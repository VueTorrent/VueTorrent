import { ref } from 'vue'
import { defineStore } from 'pinia'
import { qbit } from '@/services'

export const useAppStore = defineStore('app', () => {
  const version = ref('unknown')
  const isAuthenticated = ref(false)

  async function fetchVersion() {
    version.value = await qbit.getAppVersion()
  }

  async function updateAuthStatus() {
    isAuthenticated.value = await qbit.getAuthenticationStatus()
  }

  return { isAuthenticated, version, fetchVersion, updateAuthStatus }
})