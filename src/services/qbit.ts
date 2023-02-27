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
import type { MainDataResponse, SearchResultsResponse, TorrentPeersResponse } from '@/types/qbit/responses'
import type { AddTorrentPayload, AppPreferencesPayload, CreateFeedPayload, LoginPayload } from '@/types/qbit/payloads'
import type { SortOptions } from '@/types/vuetorrent'
import type { FeedRule as VtFeedRule } from '@/types/vuetorrent/rss'
import type { Priority } from '@/enums/qbit'

type Parameters = Record<string, any>

export class QBitApi {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'api/v2'
    })

    this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  async execute(action: string, params?: Parameters): Promise<any> {
    const data = new URLSearchParams(params)
    return this.axios.post(action, data).then(res => res.data)
  }

  /** Begin General functions * */
  async getAppVersion(): Promise<ApplicationVersion> {
    return this.axios
      .get('/app/version')
      .then(res => res.data)
      .then(version => (version.includes('v') ? version.substring(1) : version))
  }

  async login(params: LoginPayload): Promise<string> {
    const payload = new URLSearchParams(params)
    const res = await this.axios
      .post('/auth/login', payload, {
        validateStatus: (status: number) => status === 200 || status === 403
      })
      .catch(err => console.log(err))

    return res?.data
  }

  async getAuthenticationStatus(): Promise<boolean> {
    return this.axios
      .get('/app/version')
      .then(() => true)
      .catch(() => false)
  }

  async logout(): Promise<void> {
    await this.axios.post('/auth/logout')
  }

  async getAppPreferences(): Promise<AppPreferences> {
    return this.axios.get('/app/preferences').then(r => r.data)
  }

  async setPreferences(params: AppPreferencesPayload): Promise<void> {
    const data = {
      json: JSON.stringify(params)
    }

    await this.execute('/app/setPreferences', data)
  }

  async getMainData(rid?: number): Promise<MainDataResponse> {
    return this.axios.get('/sync/maindata', { params: { rid } }).then(res => res.data)
  }

  async toggleSpeedLimitsMode(): Promise<void> {
    await this.execute('/transfer/toggleSpeedLimitsMode')
  }

  async getTorrents(payload: SortOptions): Promise<Torrent[]> {
    const params: Parameters = {
      sort: !payload.isCustomSortEnabled ? payload.sort : null,
      reverse: !payload.isCustomSortEnabled ? payload.reverse : null,
      filter: payload.filter ? payload.filter : null,
      category: payload.category !== null ? payload.category : null,
      tag: payload.tag !== null ? payload.tag : null
    }

    // clean
    Object.keys(params).forEach(key => params[key] == null && delete params[key])

    const data = new URLSearchParams(params)

    return this.axios.get(`/torrents/info?${data.toString()}`).then(r => r.data)
  }

  async getTorrentTrackers(hash: string): Promise<Tracker[]> {
    return this.axios
      .get('/torrents/trackers', {
        params: { hash }
      })
      .then(r => r.data)
  }

  async getTorrentPeers(hash: string, rid?: number): Promise<TorrentPeersResponse> {
    return this.axios.get('/sync/torrentPeers', {
      params: { hash, rid }
    })
      .then(r => r.data)
  }

  async setTorrentName(hash: string, name: string): Promise<void> {
    await this.execute('/torrents/rename', { hash, name })
  }

  async getTorrentPieceStates(hash: string): Promise<number[]> {
    return this.axios
      .get('/torrents/pieceStates', {
        params: { hash }
      })
      .then(res => res.data)
  }

  async getTorrentFiles(hash: string, indexes?: number[]): Promise<TorrentFile[]> {
    return this.axios
      .get('/torrents/files', {
        params: { hash, indexes: indexes?.join('|') }
      })
      .then(res => res.data)
  }

  async getAvailableTags(): Promise<string[]> {
    return this.axios.get('/torrents/tags').then(res => res.data)
  }

  async getTorrentProperties(hash: string): Promise<TorrentProperties> {
    return this.axios
      .get('/torrents/properties', {
        params: { hash }
      })
      .then(res => res.data)
  }

  // RSS

  async createFeed(payload: CreateFeedPayload): Promise<void> {
    await this.execute('/rss/addFeed', {
      url: payload.url,
      path: payload.name
    })
  }

  async createRule(rule: VtFeedRule) {
    return this.execute('/rss/setRule', {
      ruleName: rule.name,
      ruleDef: JSON.stringify(rule, ['enabled', 'mustContain', 'mustNotContain', 'useRegex', 'affectedFeeds'])
    })
  }

  async getFeeds(withData: boolean = false): Promise<Record<string, Feed>> {
    return this.axios.get('/rss/items', { params: { withData } }).then(res => res.data)
  }

  async getRules(): Promise<Record<string, QbitFeedRule>> {
    return this.axios.get('/rss/rules').then(res => res.data)
  }

  async editFeed(itemPath: string, destPath: string): Promise<void> {
    await this.execute('/rss/moveItem', {
      itemPath,
      destPath
    })
  }

  async renameRule(ruleName: string, newRuleName: string): Promise<void> {
    await this.execute('/rss/renameRule', {
      ruleName,
      newRuleName
    })
  }

  async deleteRule(ruleName: string): Promise<void> {
    await this.execute('rss/removeRule', {
      ruleName
    })
  }

  async deleteFeed(name: string): Promise<void> {
    await this.execute('rss/removeItem', {
      path: name
    })
  }

  async markAsRead(itemPath: string, articleId: string) {
    await this.execute('rss/markAsRead', {
      itemPath,
      articleId
    })
  }

  // Post

  async addTorrents(params: AddTorrentPayload, torrents: File[]): Promise<void> {
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

    await this.axios.post('/torrents/add', data)
  }

  async setTorrentFilePriority(hash: string, idList: number[], priority: Priority): Promise<void> {
    const params = {
      hash,
      id: idList.join('|'),
      priority
    }

    await this.execute('/torrents/filePrio', params)
  }

  async deleteTorrents(hashes: string[], deleteFiles: boolean): Promise<void> {
    if (!hashes.length) return

    await this.torrentAction('delete', hashes, { deleteFiles })
  }

  async pauseTorrents(hashes: string[]): Promise<void> {
    await this.torrentAction('pause', hashes)
  }

  async resumeTorrents(hashes: string[]): Promise<void> {
    await this.torrentAction('resume', hashes)
  }

  async forceStartTorrents(hashes: string[]): Promise<void> {
    await this.torrentAction('setForceStart', hashes, { value: true })
  }

  async toggleSequentialDownload(hashes: string[]): Promise<void> {
    await this.torrentAction('toggleSequentialDownload', hashes)
  }

  async toggleFirstLastPiecePriority(hashes: string[]): Promise<void> {
    await this.torrentAction('toggleFirstLastPiecePrio', hashes)
  }

  async setAutoTMM(hashes: string[], enable: boolean): Promise<void> {
    await this.torrentAction('setAutoManagement', hashes, { enable })
  }

  async setDownloadLimit(hashes: string[], limit: number): Promise<void> {
    await this.torrentAction('setDownloadLimit', hashes, { limit })
  }

  async setUploadLimit(hashes: string[], limit: number): Promise<void> {
    await this.torrentAction('setUploadLimit', hashes, { limit })
  }

  /**
   * @return current global download speed limit in bytes/second; this value will be zero if no limit is applied.
   */
  async getGlobalDownloadLimit(): Promise<number> {
    return this.axios.get('/transfer/downloadLimit').then(res => res.data)
  }

  /**
   * @return current global upload speed limit in bytes/second; this value will be zero if no limit is applied.
   */
  async getGlobalUploadLimit(): Promise<number> {
    return this.axios.get('/transfer/uploadLimit').then(res => res.data)
  }

  /**
   * @param limit - The global download speed limit to set in bytes/second
   */
  async setGlobalDownloadLimit(limit: number): Promise<void> {
    const data = {
      limit
    }

    await this.execute('/transfer/setDownloadLimit', data)
  }

  /**
   * @param limit - The global upload speed limit to set in bytes/second
   */
  async setGlobalUploadLimit(limit: number): Promise<void> {
    const data = {
      limit
    }

    await this.execute('/transfer/setUploadLimit', data)
  }

  async setShareLimit(hashes: string[], ratioLimit: number, seedingTimeLimit: number): Promise<void> {
    await this.torrentAction('setShareLimits', hashes, {
      ratioLimit,
      seedingTimeLimit
    })
  }

  async reannounceTorrents(hashes: string[]): Promise<void> {
    await this.torrentAction('reannounce', hashes)
  }

  async recheckTorrents(hashes: string[]): Promise<void> {
    await this.torrentAction('recheck', hashes)
  }

  async setTorrentLocation(hashes: string[], location: string): Promise<void> {
    await this.torrentAction('setLocation', hashes, { location })
  }

  async addTorrentTrackers(hash: string, trackers: string): Promise<void> {
    const params = {
      hash,
      urls: trackers
    }

    await this.execute(`/torrents/addTrackers`, params)
  }

  async removeTorrentTrackers(hash: string, trackers: string[]): Promise<void> {
    await this.torrentAction('removeTrackers', [hash], { urls: trackers.join('|') })
  }

  async addTorrentPeers(hashes: string[], peers: string[]): Promise<void> {
    await this.torrentAction('addPeers', hashes, { peers: peers.join('|') })
  }

  async banPeers(peers: string[]): Promise<void> {
    const params = {
      peers: peers.join('|')
    }

    await this.execute('/transfer/banPeers', params)
  }

  async torrentAction(action: string, hashes: string[], extra?: Record<string, any>): Promise<any> {
    const params = {
      hashes: hashes.length ? hashes.join('|') : 'all',
      ...extra
    }

    return this.execute(`/torrents/${action}`, params)
  }

  async renameFile(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath
    }

    await this.execute('/torrents/renameFile', params)
  }

  async renameFolder(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath
    }

    await this.execute('/torrents/renameFolder', params)
  }

  /** Torrent Priority **/
  async setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'): Promise<void> {
    await this.execute(`/torrents/${priority}`, {
      hashes: hashes.join('|')
    })
  }

  /** Begin Torrent Tags **/
  async removeTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    await this.torrentAction('removeTags', hashes, { tags: tags.join('|') })
  }

  async addTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    await this.torrentAction('addTags', hashes, { tags: tags.join('|') })
  }

  async createTag(tags: string[]): Promise<void> {
    await this.execute('/torrents/createTags', {
      tags: tags.join(',')
    })
  }

  async deleteTag(tags: string[]): Promise<void> {
    await this.execute('/torrents/deleteTags', {
      tags: tags.join(',')
    })
  }

  /** Begin Categories **/
  async getCategories(): Promise<Category[]> {
    return this.axios
      .get('/torrents/categories')
      .then(res => res.data)
      .then(data => Object.values(data))
  }

  async deleteCategory(categories: string[]): Promise<void> {
    await this.execute('/torrents/removeCategories', {
      categories: categories.join('\n')
    })
  }

  async createCategory(cat: Category): Promise<void> {
    await this.execute('/torrents/createCategory', {
      category: cat.name,
      savePath: cat.savePath
    })
  }

  async setCategory(hashes: string[], category: string): Promise<void> {
    await this.torrentAction('setCategory', hashes, { category })
  }

  async editCategory(cat: Category): Promise<void> {
    const params = {
      category: cat.name,
      savePath: cat.savePath
    }

    await this.execute('/torrents/editCategory', params)
  }

  async exportTorrent(hash: string): Promise<Blob> {
    return this.axios
      .get('/torrents/export', {
        params: { hash },
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/x-bittorrent'
        }
      })
      .then(res => new Blob([res.data], { type: 'application/x-bittorrent' }))
  }

  /** Search **/
  async getSearchPlugins(): Promise<SearchPlugin[]> {
    return this.axios.get('/search/plugins').then(res => res.data)
  }

  async updateSearchPlugins(): Promise<void> {
    await this.execute('/search/updatePlugins')
  }

  async enableSearchPlugin(pluginNames: string[], enable: boolean): Promise<void> {
    const params = {
      names: pluginNames.join('|'),
      enable
    }

    await this.execute('/search/enablePlugin', params)
  }

  async startSearch(pattern: string, plugins: string[]): Promise<SearchJob> {
    const params = {
      pattern,
      plugins: plugins.length ? plugins.join('|') : 'enabled',
      category: 'all'
    }

    return this.execute('/search/start', params)
  }

  async stopSearch(id: number): Promise<void> {
    await this.execute('/search/stop', { id })
  }

  async getSearchStatus(id?: number): Promise<SearchStatus[]> {
    const params = id !== undefined ? { id } : undefined
    return this.execute('/search/status', params)
  }

  async getSearchResults(id: number, limit?: number, offset?: number): Promise<SearchResultsResponse> {
    return this.execute('/search/results', {
      id,
      limit,
      offset
    })
  }

  async shutdownApp(): Promise<boolean> {
    return this.axios.post("/app/shutdown")
    .then(() => true)
    .catch(() => false)
  }
}

export const Qbit = new QBitApi()
export default Qbit
