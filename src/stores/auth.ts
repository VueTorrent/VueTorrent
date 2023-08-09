import {ref} from 'vue'
import { defineStore } from 'pinia'
import {qbit} from '@/services'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  async function login(username: string, password: string) {
    const response = await qbit.login({username, password})
    setAuthStatus(response === 'Ok.')
  }

  async function logout() {
    await qbit.logout()
    setAuthStatus(false)
  }

  function setAuthStatus(status: boolean) {
    isAuthenticated.value = status
  }

  async function updateAuthStatus() {
    setAuthStatus(await qbit.getAuthenticationStatus())
  }

  return { isAuthenticated, login, logout, setAuthStatus, updateAuthStatus }
})