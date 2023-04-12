import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { instance } from './axiosInstance'
import type { MainDataResponse, SessionInfoResponse } from '@/types/qbit/responses'

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await useAxios<SessionInfoResponse>('/transfer/info', instance)
      if (error) {
        throw new Error(error.value?.message)
      }
      return data.value
    },
    refetchInterval: 1000,
    enabled: import.meta.env.VITE_OVERRIDE_QBITTORRENT_CREDENTIALS ? false : true
  })
}

export const useMainData = (rid?: number) => {
  return useQuery({
    queryKey: ['maindata'],
    queryFn: async () => {
      const { data, error } = await useAxios<MainDataResponse>(
        '/sync/maindata',
        {
          params: {
            rid
          }
        },
        instance
      )

      if (error) {
        throw new Error(error.value?.message)
      }

      return data.value
    },
    refetchInterval: 1000,
    enabled: import.meta.env.VITE_OVERRIDE_QBITTORRENT_CREDENTIALS ? false : true
  })
}
