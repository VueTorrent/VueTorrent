import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { instance } from './axiosInstance'
import type { MainDataResponse, SessionInfoResponse } from '@/types/qbit/responses'

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await useAxios<SessionInfoResponse>('/transfer/info', instance)

      return data.value
    },
    refetchInterval: 1000
  })
}

export const useMainData = (rid?: number) => {
  return useQuery({
    queryKey: ['maindata'],
    queryFn: async () => {
      const { data } = await useAxios<MainDataResponse>(
        '/sync/maindata',
        {
          params: {
            rid
          }
        },
        instance
      )

      return data.value
    },
    refetchInterval: 1000
  })
}
