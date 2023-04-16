import type { LoginPayload } from '@/types/qbit/payloads'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from '@/services/qbit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const toast = useToast()
  const i18n = useI18n()
  const router = useRouter()

  const login = async (params: LoginPayload) => {
    const payload = new URLSearchParams(params)

    await axios
      .post('/api/v2/auth/login', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        validateStatus: (status: number) => status === 200 || status === 403
      })
      .then((res) => {
        if (res.data === 'Ok.') {
          toast.success(i18n.t('toast.loginSuccess'.toString()))
          isAuthenticated.value = true
          router.push('/dashboard')
        } else {
          toast.error(i18n.t('toast.loginFailed'.toString()))
        }
      })
      .catch((err) => console.log(err))
  }

  const logout = async () => {
    useAxios('/auth/logout', { method: 'POST' }, axiosInstance)
    isAuthenticated.value = false
    router.push('/login')
  }
  const checkAuth = async () => {
    const res = await axios
      .get('/api/v2/app/version')
      .then(() => true)
      .catch(() => false)

    isAuthenticated.value = res
    return res
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})
