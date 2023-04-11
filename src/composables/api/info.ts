import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations'
import { instance } from './axiosInstance'
import { SessionInfoResponse } from '@/types/qbit/responses'

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => {
      return useAxios<SessionInfoResponse>('app/session', instance)
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
        instance
      )

      return data
    }
  })
}
