import { axiosInstance } from '@/services/qbit'
import { useAxios } from '@vueuse/integrations/useAxios'

export const toggleSpeedLimitsMode = async () => {
  useAxios('/transfer/toggleSpeedLimitsMode', { method: 'POST' }, axiosInstance)
}
