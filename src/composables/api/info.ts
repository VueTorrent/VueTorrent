import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from './axiosInstance'
import type { SessionInfoResponse } from '@/types/qbit/responses'

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => {
      return useAxios<SessionInfoResponse>('app/session', axiosInstance)
    }
  })
}

export const useAllTimeInfo = (rid?: number) => {
  return useQuery({
    queryKey: ['alltime'],
    queryFn: () => {
      const { data } = useAxios<SessionInfoResponse>(
        `sync/maindata`,
        {
          params: {
            rid
          }
        },
        axiosInstance
      )

      return data
    }
  })
}
