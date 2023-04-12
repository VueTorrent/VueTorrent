import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from '@/services/qbit/actions'
import type { Category } from '@/types/vuetorrent'

export const useCategories = async () => {
  const { data, error } = await useAxios<Category[]>('/torrents/categories', axiosInstance)
  if (error) {
    throw new Error(error.value?.message)
  }
  return { data }
}

export const useAvailableTags = async () => {
  const { data, error } = await useAxios<string[]>('/torrents/tags', axiosInstance)

  if (error) {
    throw new Error(error.value?.message)
  }
  const tags = data.value?.sort((a: string, b: string) =>
    a.localeCompare(b.toLowerCase(), undefined, { sensitivity: 'base' })
  )
  return tags
}
