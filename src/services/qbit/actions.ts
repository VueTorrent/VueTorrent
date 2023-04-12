import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from './index'

export const execute = async (action: string, params?: Record<string, any>) => {
  const data = new URLSearchParams(params)

  return await useAxios(action, { params: data }, axiosInstance)
}

export const torrentAction = async (
  action: string,
  hashes: string[],
  extra?: Record<string, any>
) => {
  const params = {
    hashes: hashes.length ? hashes.join('|') : 'all',
    ...extra
  }

  return execute(`/torrents/${action}`, params)
}
