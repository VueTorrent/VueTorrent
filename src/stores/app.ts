import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { compareVersions } from '@/helpers'
import qbit from '@/services/qbit'
import { isAuthenticationError } from '@/services/qbit/errors'
import { BuildInfo } from '@/types/qbit/models'

export const useAppStore = defineStore('app', () => {
  const isAuthenticated = ref(false)
  const version = ref('0.0.0')
  const webApiVersion = ref('0.0.0')
  const buildInfo = ref<BuildInfo>()

  const usesQbit5 = computed(() => isFeatureAvailable('5'))
  const usesLibtorrent1 = computed(() => compareVersions(buildInfo.value?.libtorrent ?? '0', '2') < 0)
  const usesLibtorrent2 = computed(() => compareVersions(buildInfo.value?.libtorrent ?? '0', '2') >= 0)
  const usesLibtorrent21 = computed(() => compareVersions(buildInfo.value?.libtorrent ?? '0', '2.1.0') >= 0)

  async function fetchAuthStatus() {
    try {
      const ver = await qbit.getVersion()
      await setAuthStatus(true, ver)
      return true
    } catch (error) {
      if (!isAuthenticationError(error)) throw error
      await setAuthStatus(false)
      return false
    }
  }

  async function setAuthStatus(val: boolean, ver?: string) {
    isAuthenticated.value = val

    if (val) {
      version.value = ver || (await qbit.getVersion())
      webApiVersion.value = await qbit.getWebAPIVersion().catch(() => '0.0.0')
      buildInfo.value = await qbit.getBuildInfo()
    } else {
      version.value = '0.0.0'
      webApiVersion.value = '0.0.0'
      buildInfo.value = undefined
    }
  }

  function isFeatureAvailable(required_version?: string) {
    if (!required_version) return true
    return version.value >= required_version
  }

  function isWebApiVersionAtLeast(required_version: string) {
    return compareVersions(webApiVersion.value, required_version) >= 0
  }

  async function login(username: string, password: string) {
    const response = await qbit.login({ username, password })
    await setAuthStatus(response.status < 300 && response.status >= 200)
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
    webApiVersion,
    buildInfo,
    usesQbit5,
    usesLibtorrent1,
    usesLibtorrent2,
    usesLibtorrent21,
    fetchAuthStatus,
    setAuthStatus,
    isFeatureAvailable,
    isWebApiVersionAtLeast,
    shutdownQbit,
    sendTestEmail,
    login,
    logout,
    toggleAlternativeMode,
    $reset: async () => {
      buildInfo.value = undefined
      version.value = '0.0.0'
      webApiVersion.value = '0.0.0'
      await logout()
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
