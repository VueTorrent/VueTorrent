import { useQuery, useMutation } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from '@/services/qbit'
import type { QbAppPreferencesPayload } from '@/types/qbit/payloads'
import type { AppPreferences } from '@/types/qbit/models'

export const usePreferences = () => {
  return useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      const { data: preferences } = await useAxios<AppPreferences>(
        '/app/preferences',
        axiosInstance
      )
      return preferences
    }
  })
}

export const updatePreferences = (params: QbAppPreferencesPayload) => {
  const data = {
    json: JSON.stringify(params)
  }
  const payload = new URLSearchParams(data)
  return useMutation({
    mutationFn: async () => {
      return useAxios('/app/preferences', { method: 'POST', params: { payload } }, axiosInstance)
    }
  })
}
