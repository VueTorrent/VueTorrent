import qbit from '@/services/qbit'
import { BuildInfo } from '@/types/qbit/models'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isAuthenticated = ref(false)
  const version = ref('0.0.0')
  const buildInfo = ref<BuildInfo>()

  const usesQbit5 = computed(() => isFeatureAvailable('5'))
  const usesLibtorrent1 = computed(() => (buildInfo.value?.libtorrent ?? '') >= '1' && !usesLibtorrent2)
  const usesLibtorrent2 = computed(() => (buildInfo.value?.libtorrent ?? '') >= '2')

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
      buildInfo.value = await qbit.getBuildInfo()
      return
    }

    isAuthenticated.value = val
    version.value = '0.0.0'
    buildInfo.value = undefined
  }

  function isFeatureAvailable(required_version?: string) {
    if (!required_version) return true
    return version.value >= required_version
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
    buildInfo,
    usesQbit5,
    usesLibtorrent1,
    usesLibtorrent2,
    fetchAuthStatus,
    setAuthStatus,
    isFeatureAvailable,
    shutdownQbit,
    sendTestEmail,
    login,
    logout,
    toggleAlternativeMode,
    $reset: async () => {
      buildInfo.value = undefined
      version.value = '0.0.0'
      await logout()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
