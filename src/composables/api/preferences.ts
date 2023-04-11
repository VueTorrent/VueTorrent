import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from './axiosInstance'

export const usePreferences = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => {
      return useAxios('app/preferences', axiosInstance)
    }
  })
}
