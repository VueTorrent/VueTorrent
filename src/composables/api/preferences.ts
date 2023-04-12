import { useQuery, useMutation } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { instance } from '@/services/qbit/actions'
import type { AppPreferencesPayload } from '@/types/qbit/payloads'

export const usePreferences = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => {
      return useAxios('app/preferences', instance)
    }
  })
}

export const updatePreferences = (params: AppPreferencesPayload) => {
  const data = {
    json: JSON.stringify(params)
  }
  const payload = new URLSearchParams(data)
  return useMutation({
    mutationFn: async () => {
      return await useAxios('app/preferences', { method: 'POST', params: { payload } }, instance)
    }
  })
}
