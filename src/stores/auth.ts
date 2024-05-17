import { ref } from 'vue'
import { defineStore } from 'pinia'
import qbit from '@/services/qbit'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  async function login(username: string, password: string) {
    const response = await qbit.login({ username, password })
    isAuthenticated.value = response === 'Ok.'
  }

  async function logout() {
    await qbit.logout()
    isAuthenticated.value = false
  }

  async function updateAuthStatus() {
    isAuthenticated.value = await qbit.getAuthenticationStatus()
  }

  return {
    isAuthenticated,
    login,
    logout,
    updateAuthStatus,
    $reset: async () => {
      try {
        await qbit.logout()
      } catch (e) {
      } finally {
        isAuthenticated.value = false
      }
    }
  }
})
