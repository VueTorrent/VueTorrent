import { useAxios } from '@vueuse/integrations/useAxios'
import Axios from 'axios'

export const axiosInstance = Axios.create({
  baseURL: '/api/v2',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

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
