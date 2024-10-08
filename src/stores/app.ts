import qbit from '@/services/qbit'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isAuthenticated = ref(false)
  const version = ref('0.0.0')

  async function fetchAuthStatus() {
    const ver: string | false = await qbit.getVersion().catch(() => false)
    const auth_status = ver !== false
    await setAuthStatus(auth_status, ver || undefined)
    return auth_status
  }

  async function setAuthStatus(val: boolean, ver?: string) {
    if (val) {
      isAuthenticated.value = val
      version.value = ver || (await qbit.getVersion())
      return
    }

    isAuthenticated.value = val
    version.value = '0.0.0'
  }

  async function login(username: string, password: string) {
    const response = await qbit.login({ username, password })
    await setAuthStatus(response.data === 'Ok.')
    return response
  }

  async function logout() {
    await qbit.logout()
    await setAuthStatus(false)
  }

  async function toggleAlternativeMode() {
    return await qbit.toggleSpeedLimitsMode()
  }

  async function shutdownQbit() {
    return await qbit.shutdownApp()
  }

  async function sendTestEmail() {
    return await qbit.sendTestEmail()
  }

  return {
    isAuthenticated,
    version,
    fetchAuthStatus,
    setAuthStatus,
    shutdownQbit,
    sendTestEmail,
    login,
    logout,
    toggleAlternativeMode,
    $reset: async () => {
      version.value = '0.0.0'
      await logout()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
