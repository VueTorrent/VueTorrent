import { onMounted, ref } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from '@/services/qbit'
import type { Category } from '@/types/vuetorrent'
import type { AddTorrentsPayload } from '@/types/vuetorrent/payloads/AddTorrentsPayload'
import type { QbAddTorrentPayload } from '@/types/qbit/payloads'

export const useCategories = () => {
  const categories = ref<Category[]>()

  async function fetchCategories(): Promise<Category[]> {
    const { data } = await useAxios<{ [key: string]: Category }>(
      '/torrents/categories',
      axiosInstance
    )
    categories.value = Object.values(data.value as { [key: string]: Category })
    return categories.value
  }

  onMounted(() => {
    fetchCategories()
  })

  return {
    fetchCategories,
    categories
  }
}

export const useTags = () => {
  const tags = ref<string[]>()

  async function fetchTags(): Promise<string[] | undefined> {
    const { data } = await useAxios<string[]>('/torrents/tags', axiosInstance)

    tags.value = data.value?.sort((a: string, b: string) =>
      a.localeCompare(b.toLowerCase(), undefined, { sensitivity: 'base' })
    )

    return data.value
  }

  onMounted(() => {
    fetchTags()
  })

  return {
    fetchTags,
    tags
  }
}

export const useTorrents = () => {
  async function addTorrents(payload: AddTorrentsPayload): Promise<any> {
    let requestBody: FormData | URLSearchParams | null = null
    const files: File[] = payload.files

    // Map params
    const params: QbAddTorrentPayload = {
      autoTMM: payload.autoTMM,
      category: payload.category?.name,
      cookie: payload.cookie?.name,
      dlLimit: payload?.dlLimit,
      firstLastPiecePrio: payload.firstLastPiecePriority,
      paused: !payload.start,
      ratioLimit: payload?.ratioLimit,
      rename: payload?.rename,
      root_folder: payload?.rootFolder,
      savepath: payload.directory,
      seedingTimeLimit: payload?.seedingTimeLimit,
      sequentialDownload: payload.sequentialDownload,
      skip_checking: payload.skipHashChecking,
      tags: payload.tags.length ? payload.tags.join(',') : undefined,
      upLimit: payload?.upLimit,
      urls: payload.urls.length ? payload.urls : undefined
    }

    // Remove undefined values because qbit considers them as strings
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key]
      }
    })

    // Magnet links
    if (!files.length) {
      requestBody = new URLSearchParams(params)
    } else {
      requestBody = new FormData()
      for (const [key, value] of Object.entries(params)) {
        requestBody.append(key, value)
      }
      for (const file of files) {
        requestBody.append('torrents', file)
      }
    }

    const response = await useAxios(
      '/torrents/add',
      {
        method: 'POST',
        data: requestBody
      },
      axiosInstance,
      { immediate: true }
    )

    return response
  }

  return {
    addTorrents
  }
}
