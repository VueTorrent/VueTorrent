import {ref} from 'vue'
import { defineStore } from 'pinia'
import {qbit} from '@/services'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  async function login(username: string, password: string) {
    const response = await qbit.login({username, password})
    isAuthenticated.value = response === 'Ok.'
  }

  function setAuthStatus(status: boolean) {
    isAuthenticated.value = status
  }

  async function updateAuthStatus() {
    isAuthenticated.value = await qbit.getAuthenticationStatus()
  }

  return { isAuthenticated, login, setAuthStatus, updateAuthStatus }
})