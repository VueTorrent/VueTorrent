import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations'
import { instance } from './axiosInstance'

export const usePreferences = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => {
      return useAxios('app/preferences', instance)
    }
  })
}
