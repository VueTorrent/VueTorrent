import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type {
  ApplicationVersion,
  AppPreferences,
  Category,
  Feed,
  FeedRule as QbitFeedRule,
  SearchJob,
  SearchPlugin,
  SearchStatus,
  TorrentFile,
  TorrentProperties,
  Tracker,
  Torrent
} from '@/types/qbit/models'
import type {
  MainDataResponse,
  SearchResultsResponse,
  TorrentPeersResponse
} from '@/types/qbit/responses'
import type {
  AddTorrentPayload,
  AppPreferencesPayload,
  CreateFeedPayload,
  LoginPayload
} from '@/types/qbit/payloads'
import type { FeedRule as VtFeedRule, SortOptions } from '@/types/vuetorrent'
import type { Priority } from '@/enums/qbit'
import { useQuery } from '@tanstack/vue-query'
import { r } from 'unplugin-vue-router/dist/options-3030b9f1'
import { exec } from 'apexcharts'

type Parameters = Record<string, any>

//! General Functions

const execute = (action: string, params?: Parameters): Promise<any> => {
  const data = new URLSearchParams(params)
  return axios.post(`/api/v2/${action}?${data.toString()}`).then((r) => r.data)
}

const torrentAction = async (action: string, hashes: string[], extra?: Record<string, any>) => {
  const params = {
    hashes: hashes.length ? hashes.join('|') : 'all',
    ...extra
  }

  return execute(`torrents/${action}`, params)
}

export const useAppPreferences = () => {
  return useQuery({
    queryKey: ['appPreferences'],
    queryFn: async () => {
      return await axios.get('/api/v2/app/preferences').then((r) => r.data)
    }
  })
}

export const useTorrents = (payload: SortOptions) => {
  const params: Parameters = {
    sort: !payload.isCustomSortEnabled ? payload.sort : null,
    reverse: !payload.isCustomSortEnabled ? payload.reverse : null,
    filter: payload.filter ? payload.filter : null,
    category: payload.category !== null ? payload.category : null,
    tag: payload.tag !== null ? payload.tag : null
  }

  Object.keys(params).forEach((key) => params[key] == null && delete params[key])

  const data = new URLSearchParams(params)

  return useQuery({
    queryKey: ['torrents', payload],
    queryFn: async () => {
      return (await axios
        .get(`/api/v2/torrents/info?${data.toString()}`, { params: payload })
        .then((r) => r.data)) as Torrent[]
    }
  })
}

export const useTorrentTrackers = (hash: string) => {
  return useQuery({
    queryKey: ['torrentTrackers', hash],
    queryFn: async () => {
      return await axios
        .get(`/api/v2/torrents/trackers`, {
          params: {
            hash
          }
        })
        .then((r) => r.data)
    }
  })
}

export const useTorrentPeers = (hash: string, rid?: number) => {
  return useQuery({
    queryKey: ['torrentPeers', hash, rid],
    queryFn: async () => {
      return await axios
        .get(`/api/v2/sync/torrentPeers`, {
          params: {
            hash,
            rid
          }
        })
        .then((r) => r.data)
    }
  })
}

export const useTorrentPieceStates = (hash: string) => {
  return useQuery({
    queryKey: ['torrentPieceStates', hash],
    queryFn: async () => {
      return await axios
        .get(`/api/v2/torrents/pieceStates`, {
          params: {
            hash
          }
        })
        .then((r) => r.data)
    }
  })
}

export const useTorrentFiles = (hash: string, indexes?: number[]) => {
  return useQuery({
    queryKey: ['torrentFiles', hash, indexes],
    queryFn: async () => {
      return await axios
        .get(`/api/v2/torrents/files`, {
          params: { hash, indexes: indexes?.join('|') }
        })
        .then((r) => r.data)
    }
  })
}

export const useAvailableTags = () => {
  return useQuery({
    queryKey: ['availableTags'],
    queryFn: async () => {
      return await axios
        .get('/api/v2/torrents/tags')
        .then((res) =>
          res.data.sort((a: string, b: string) =>
            a.localeCompare(b.toLowerCase(), undefined, { sensitivity: 'base' })
          )
        )
    }
  })
}

export const useTorrentProperties = (hash: string) => {
  return useQuery({
    queryKey: ['torrentProperties', hash],
    queryFn: async () => {
      return await axios
        .get(`/api/v2/torrents/properties`, {
          params: {
            hash
          }
        })
        .then((r) => r.data)
    }
  })
}

export const setPreferences = async (payload: AppPreferencesPayload) => {
  const data = {
    json: JSON.stringify(payload)
  }

  await execute('app/setPreferences', data)
}

export const toggleSpeedLimitsMode = async () => {
  await execute('app/toggleSpeedLimitsMode')
}

export const setTorrentName = async (hash: string, name: string) => {
  return await execute('torrents/rename', { hash, name })
}

//! RSS

export const createFeed = async (payload: CreateFeedPayload) => {
  await await execute('rss/addFeed', {
    url: payload.url,
    path: payload.path
  })
}

export const setRule = async (rule: VtFeedRule) => {
  return await execute('rss/setRule', {
    ruleName: rule.name,
    ruleDef: JSON.stringify(rule)
  })
}

export const editFeed = async (itemPath: string, destPath: string) => {
  return await execute('rss/moveItem', {
    itemPath,
    destPath
  })
}

export const renameRule = async (ruleName: string, newRuleName: string) => {
  return await execute('rss/renameRule', {
    ruleName,
    newRuleName
  })
}

export const deleteRule = async (ruleName: string) => {
  return await execute('rss/removeRule', {
    ruleName
  })
}

export const deleteFeed = async (name: string) => {
  await execute('rss/removeItem', {
    path: name
  })
}

export const markAsRead = async (itemPath: string, articleId: string) => {
  await execute('rss/markAsRead', {
    itemPath,
    articleId
  })
}

export const refreshFeed = async (itemPath: string) => {
  await execute('rss/refreshItem', {
    itemPath
  })
}

export const getMatchingArticles = async (ruleName: string): Promise<Record<string, string[]>> => {
  return axios.get('/api/v2/rss/matchingArticles', { params: { ruleName } }).then((r) => r.data)
}

export const useFeeds = (withData: boolean = false) => {
  return useQuery({
    queryKey: ['feeds', withData],
    queryFn: async () => {
      return await axios
        .get('/api/v2/rss/items', {
          params: {
            withData
          }
        })
        .then((r) => r.data)
    }
  })
}

export const useFeedRules = () => {
  return useQuery({
    queryKey: ['feedRules'],
    queryFn: async () => {
      return await axios.get('/api/v2/rss/rules').then((r) => r.data)
    }
  })
}

//! Post

export const addTorrents = async (params: AddTorrentPayload, torrents: File[]) => {
  let data
  if (torrents) {
    // torrent files
    const formData = new FormData()
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        formData.append(key, value)
      }
    }

    for (const torrent of torrents) {
      formData.append('torrents', torrent)
    }

    data = formData
  } else {
    // magnet links
    data = new URLSearchParams(params as Parameters)
  }

  await execute('torrents/add', data)
}

export const setTorrentFilePriority = async (hash: string, idList: number[], priority: number) => {
  const params = {
    hash,
    id: idList.join('|'),
    priority
  }

  await execute('torrents/filePrio', params)
}

export const deleteTorrents = async (hashes: string[], deleteFiles: boolean) => {
  if (!hashes.length) return

  await torrentAction('delete', hashes, { deleteFiles })
}

export const pauseTorrents = async (hashes: string[]) => {
  await torrentAction('pause', hashes)
}

export const resumeTorrents = async (hashes: string[]) => {
  await torrentAction('resume', hashes)
}

export const forceStartTorrents = async (hashes: string[]) => {
  await torrentAction('resume', hashes, { force: true })
}

export const toggleSequentialDownload = async (hashes: string[]) => {
  await torrentAction('toggleSequentialDownload', hashes)
}

export const toggleFirstLastPiecePriority = async (hashes: string[]) => {
  await torrentAction('toggleFirstLastPiecePrio', hashes)
}

export const setDownloadLimit = async (hashes: string[], limit: number) => {
  await torrentAction('setDownloadLimit', hashes, { limit })
}

export const setUploadLimit = async (hashes: string[], limit: number) => {
  await torrentAction('setUploadLimit', hashes, { limit })
}

/**
 * @return current global download speed limit in bytes/second; this value will be zero if no limit is applied.
 */
export const getGlobalDownloadLimit = async () => {
  return useQuery({
    queryKey: ['globalDownloadLimit'],
    queryFn: async () => {
      return await axios.get('/api/v2/transfer/downloadLimit').then((r) => r.data)
    }
  })
}

/**
 * @return current global upload speed limit in bytes/second; this value will be zero if no limit is applied.
 */
export const getGlobalUploadLimit = async () => {
  return useQuery({
    queryKey: ['globalUploadLimit'],
    queryFn: async () => {
      return await axios.get('/api/v2/transfer/uploadLimit').then((r) => r.data)
    }
  })
}

/**
 * @param limit - The global download speed limit to set in bytes/second
 */
export const setGlobalDownloadLimit = async (limit: number) => {
  const data = {
    limit
  }

  await execute('transfer/setDownloadLimit', data)
}

/**
 * @param limit - The global upload speed limit to set in bytes/second
 */
export const setGlobalUploadLimit = async (limit: number) => {
  const data = {
    limit
  }

  await execute('transfer/setUploadLimit', data)
}

export const setShareLimit = async (
  hashes: string[],
  ratioLimit: number,
  seedingTimeLimit: number
) => {
  await torrentAction('setShareLimits', hashes, { ratioLimit, seedingTimeLimit })
}

export const reannounceTorrents = async (hashes: string[]) => {
  await torrentAction('reannounce', hashes)
}

export const recheckTorrents = async (hashes: string[]) => {
  await torrentAction('recheck', hashes)
}

export const setTorrentLocation = async (hashes: string[], location: string) => {
  await torrentAction('setLocation', hashes, { location })
}

export const addTorrentTracker = async (hash: string, trackers: string) => {
  const params = {
    hash,
    urls: trackers
  }

  await execute('torrents/addTrackers', params)
}

export const addTorrentPeers = async (hashes: string[], peers: string[]) => {
  await torrentAction('addPeers', hashes, { peers: peers.join('|') })
}

export const banPeers = async (peers: string[]) => {
  const params = {
    peers: peers.join('|')
  }

  await execute('torrents/banPeers', params)
}

export const renameFile = async (hash: string, oldPath: string, newPath: string) => {
  const params = {
    hash,
    oldPath,
    newPath
  }

  await execute('torrents/renameFile', params)
}

export const renameFolder = async (hash: string, oldPath: string, newPath: string) => {
  const params = {
    hash,
    oldPath,
    newPath
  }

  await execute('torrents/renameFolder', params)
}

export const setTorrentPriority = async (
  hashes: string[],
  priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'
) => {
  await execute(`torrents/${priority}`, { hashes: hashes.join('|') })
}

//! Tags

export const removeTorrentTags = async (hashes: string[], tags: string[]) => {
  await torrentAction('removeTags', hashes, { tags: tags.join('|') })
}

export const addTorrentTags = async (hashes: string[], tags: string[]) => {
  await torrentAction('addTags', hashes, { tags: tags.join('|') })
}

export const createTag = async (tags: string[]) => {
  await execute('torrents/createTags', {
    tags: tags.join(',')
  })
}

//! Categories

export const useCategories = async () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await axios
        .get('/api/v2/torrents/categories')
        .then((r) => r.data)
        .then((data) => Object.values(data))
    }
  })
}

export const deleteCategory = async (categories: string[]) => {
  await execute('torrents/removeCategories', {
    categories: categories.join(',')
  })
}

export const createCategory = async (category: Category) => {
  await execute('torrents/createCategory', {
    category: category.name,
    savePath: category.savePath
  })
}

export const setCategory = async (hashes: string[], category: string) => {
  await torrentAction('setCategory', hashes, { category })
}

export const editCategory = async (category: Category) => {
  const params = {
    category: category.name,
    savePath: category.savePath
  }

  await execute('torrents/editCategory', params)
}

export const exportTorrent = async (hash: string) => {
  await axios
    .get('/api/v2/torrents/export', {
      params: { hash },
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/x-bittorrent'
      }
    })
    .then((res) => new Blob([res.data], { type: 'application/x-bittorrent' }))
}

//! Search

export const useSearchPlugins = async () => {
  return useQuery({
    queryKey: ['searchPlugins'],
    queryFn: async () => {
      return await axios.get('/api/v2/search/plugins').then((r) => r.data)
    }
  })
}

export const updateSearchPlugins = async () => {
  await execute('search/updatePlugins')
}

export const enableSearchPlugin = async (pluginNames: string[], enable: boolean) => {
  const params = {
    names: pluginNames.join('|'),
    enable
  }

  await execute('search/enablePlugin', params)
}

export const startSearch = async (pattern: string, plugins: string[]): Promise<SearchJob> => {
  const params = {
    pattern,
    plugins: plugins.length ? plugins.join('|') : 'enabled',
    category: 'all'
  }

  return await execute('search/start', params)
}

export const stopSearch = async (id: number) => {
  await execute('search/stop', { id })
}

export const getSearchStatus = async (id?: number): Promise<SearchStatus[]> => {
  const params = id !== undefined ? { id } : undefined

  return await execute('search/status', params)
}

export const getSearchResults = async (
  id: number,
  limit?: number,
  offset?: number
): Promise<SearchResultsResponse> => {
  return await execute('search/results', { id, limit, offset })
}

export const shutdownApp = async (): Promise<boolean> => {
  return await axios
    .post('/api/v2/app/shutdown')
    .then(() => true)
    .catch(() => false)
}
