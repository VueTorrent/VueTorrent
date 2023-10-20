import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type {
  ApplicationVersion,
  AppPreferences,
  Category,
  Feed,
  FeedRule,
  Log,
  NetworkInterface,
  SearchJob,
  SearchPlugin,
  SearchStatus,
  Torrent,
  TorrentFile,
  TorrentProperties,
  Tracker
} from '@/types/qbit/models'
import type { MaindataResponse, SearchResultsResponse, TorrentPeersResponse } from '@/types/qbit/responses'
import type { AddTorrentPayload, AppPreferencesPayload, CreateFeedPayload, GetTorrentPayload, LoginPayload } from '@/types/qbit/payloads'
import type { FilePriority } from '@/constants/qbit'
import { LogType, PieceState } from '@/constants/qbit'

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
    return this.axios.post('/auth/login', payload, { validateStatus: (status: number) => status === 200 || status === 403 }).then(
      res => res.data,
      err => console.log(err)
    )
  }

  async getAuthenticationStatus(): Promise<boolean> {
    return this.axios
      .get('/app/version')
      .then(() => true)
      .catch(() => false)
  }

  async logout(): Promise<void> {
    return this.axios.post('/auth/logout')
  }

  async getAppPreferences(): Promise<AppPreferences> {
    return this.axios.get('/app/preferences').then(r => r.data)
  }

  async setPreferences(params: AppPreferencesPayload): Promise<void> {
    const data = {
      json: JSON.stringify(params)
    }

    return this.execute('/app/setPreferences', data)
  }

  async getMaindata(rid?: number): Promise<MaindataResponse> {
    return this.axios.get('/sync/maindata', { params: { rid } }).then(res => res.data)
  }

  async toggleSpeedLimitsMode(): Promise<void> {
    return this.execute('/transfer/toggleSpeedLimitsMode')
  }

  async getTorrents(payload: GetTorrentPayload): Promise<Torrent[]> {
    return this.axios.get('/torrents/info', { params: payload }).then(r => r.data)
  }

  async getTorrentTrackers(hash: string): Promise<Tracker[]> {
    return this.axios
      .get('/torrents/trackers', {
        params: { hash }
      })
      .then(r => r.data)
  }

  async getTorrentPeers(hash: string, rid?: number): Promise<TorrentPeersResponse> {
    return this.axios
      .get('/sync/torrentPeers', {
        params: { hash, rid }
      })
      .then(r => r.data)
  }

  async setTorrentName(hash: string, name: string): Promise<void> {
    return this.execute('/torrents/rename', { hash, name })
  }

  async getTorrentPieceStates(hash: string): Promise<PieceState[]> {
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
    return this.axios
      .get('/torrents/tags')
      .then(res => res.data)
      .then(tags => tags.sort((a: string, b: string) => a.localeCompare(b.toLowerCase(), undefined, { sensitivity: 'base' })))
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
    return this.execute('/rss/addFeed', {
      url: payload.url,
      path: payload.name
    })
  }

  async setRule(ruleName: string, ruleDef: FeedRule) {
    return this.execute('/rss/setRule', {
      ruleName,
      ruleDef: JSON.stringify(ruleDef)
    })
  }

  async getFeeds(withData: boolean): Promise<Feed[]> {
    return this.axios
      .get('/rss/items', { params: { withData } })
      .then(res => res.data)
      .then(payload => {
        const feeds = []
        for (const key in payload) {
          feeds.push({ name: key, ...payload[key] })
        }
        return feeds
      })
  }

  async getRules(): Promise<FeedRule[]> {
    return this.axios
      .get('/rss/rules')
      .then(res => res.data)
      .then(payload => {
        const rules: FeedRule[] = []
        for (const key in payload) {
          rules.push({ name: key, ...payload[key] })
        }
        return rules
      })
  }

  async editFeed(oldName: string, newName: string): Promise<void> {
    return this.execute('/rss/moveItem', {
      itemPath: oldName,
      destPath: newName
    })
  }

  async renameRule(ruleName: string, newRuleName: string): Promise<void> {
    return this.execute('/rss/renameRule', {
      ruleName,
      newRuleName
    })
  }

  async deleteRule(ruleName: string): Promise<void> {
    return this.execute('rss/removeRule', { ruleName })
  }

  async deleteFeed(name: string): Promise<void> {
    return this.execute('rss/removeItem', {
      path: name
    })
  }

  async markAsRead(itemPath: string, articleId: string) {
    return this.execute('rss/markAsRead', {
      itemPath,
      articleId
    })
  }

  async refreshFeed(itemPath: string) {
    return this.execute('rss/refreshItem', {
      itemPath
    })
  }

  async getMatchingArticles(ruleName: string): Promise<Record<string, string[]>> {
    return this.axios.get('/rss/matchingArticles', { params: { ruleName } }).then(r => r.data)
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

    return this.axios.post('/torrents/add', data)
  }

  async setTorrentFilePriority(hash: string, idList: number[], priority: FilePriority): Promise<void> {
    const params = {
      hash,
      id: idList.join('|'),
      priority
    }

    return this.execute('/torrents/filePrio', params)
  }

  async deleteTorrents(hashes: string[], deleteFiles: boolean): Promise<void> {
    if (!hashes.length) return

    return this.torrentAction('delete', hashes, { deleteFiles })
  }

  async pauseTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('pause', hashes)
  }

  async resumeTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('resume', hashes)
  }

  async forceStartTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('setForceStart', hashes, { value: true })
  }

  async toggleSequentialDownload(hashes: string[]): Promise<void> {
    return this.torrentAction('toggleSequentialDownload', hashes)
  }

  async toggleFirstLastPiecePriority(hashes: string[]): Promise<void> {
    return this.torrentAction('toggleFirstLastPiecePrio', hashes)
  }

  async setSuperSeeding(hashes: string[], value: boolean): Promise<void> {
    return this.torrentAction('setSuperSeeding', hashes, { value })
  }

  async setAutoTMM(hashes: string[], enable: boolean): Promise<void> {
    return this.torrentAction('setAutoManagement', hashes, { enable })
  }

  async setDownloadLimit(hashes: string[], limit: number): Promise<void> {
    return this.torrentAction('setDownloadLimit', hashes, { limit })
  }

  async setUploadLimit(hashes: string[], limit: number): Promise<void> {
    return this.torrentAction('setUploadLimit', hashes, { limit })
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

    return this.execute('/transfer/setDownloadLimit', data)
  }

  /**
   * @param limit - The global upload speed limit to set in bytes/second
   */
  async setGlobalUploadLimit(limit: number): Promise<void> {
    const data = {
      limit
    }

    return this.execute('/transfer/setUploadLimit', data)
  }

  async setShareLimit(hashes: string[], ratioLimit: number, seedingTimeLimit: number): Promise<void> {
    return this.torrentAction('setShareLimits', hashes, {
      ratioLimit,
      seedingTimeLimit
    })
  }

  async reannounceTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('reannounce', hashes)
  }

  async recheckTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('recheck', hashes)
  }

  async setTorrentLocation(hashes: string[], location: string): Promise<void> {
    return this.torrentAction('setLocation', hashes, { location })
  }

  async addTorrentTrackers(hash: string, trackers: string): Promise<void> {
    const params = {
      hash,
      urls: trackers
    }

    return this.execute(`/torrents/addTrackers`, params)
  }

  async editTorrentTracker(hash: string, origUrl: string, newUrl: string): Promise<void> {
    const params = {
      hash,
      origUrl,
      newUrl
    }

    return this.execute(`/torrents/editTracker`, params)
  }

  async removeTorrentTrackers(hash: string, trackers: string[]): Promise<void> {
    const params = {
      hash,
      urls: trackers.join('|')
    }

    return this.execute(`/torrents/removeTrackers`, params)
  }

  async addTorrentPeers(hashes: string[], peers: string[]): Promise<void> {
    return this.torrentAction('addPeers', hashes, { peers: peers.join('|') })
  }

  async banPeers(peers: string[]): Promise<void> {
    const params = {
      peers: peers.join('|')
    }

    return this.execute('/transfer/banPeers', params)
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

    return this.execute('/torrents/renameFile', params)
  }

  async renameFolder(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath
    }

    return this.execute('/torrents/renameFolder', params)
  }

  /** Torrent Priority **/
  async setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'): Promise<void> {
    return this.execute(`/torrents/${priority}`, {
      hashes: hashes.join('|')
    })
  }

  /** Begin Torrent Tags **/
  async removeTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    return this.torrentAction('removeTags', hashes, { tags: tags.join('|') })
  }

  async addTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    return this.torrentAction('addTags', hashes, { tags: tags.join('|') })
  }

  async createTag(tags: string[]): Promise<void> {
    return this.execute('/torrents/createTags', {
      tags: tags.join(',')
    })
  }

  async deleteTags(tags: string[]): Promise<void> {
    return this.execute('/torrents/deleteTags', {
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
    return this.execute('/torrents/removeCategories', {
      categories: categories.join('\n')
    })
  }

  async createCategory(cat: Category): Promise<void> {
    return this.execute('/torrents/createCategory', {
      category: cat.name,
      savePath: cat.savePath
    })
  }

  async setCategory(hashes: string[], category: string): Promise<void> {
    return this.torrentAction('setCategory', hashes, { category })
  }

  async editCategory(cat: Category): Promise<void> {
    const params = {
      category: cat.name,
      savePath: cat.savePath
    }

    return this.execute('/torrents/editCategory', params)
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
  async startSearch(pattern: string, category: string, plugins: string[]): Promise<SearchJob> {
    const params = {
      pattern,
      category,
      plugins: plugins.join('|')
    }

    return this.execute('/search/start', params)
  }

  async stopSearch(id: number): Promise<boolean> {
    return this.execute('/search/stop', { id }).then(
      () => true,
      () => false
    )
  }

  async getSearchStatus(id?: number): Promise<SearchStatus[]> {
    return this.execute('/search/status', {
      id: id !== undefined ? id : 0
    }).then(res => res.data)
  }

  async getSearchResults(id: number, offset?: number, limit?: number): Promise<SearchResultsResponse> {
    return this.execute('/search/results', {
      id,
      limit,
      offset
    })
  }

  async deleteSearchPlugin(id: number): Promise<boolean> {
    return this.execute('/search/delete', { id }).then(
      () => true,
      () => false
    )
  }

  async getSearchPlugins(): Promise<SearchPlugin[]> {
    return this.axios.get('/search/plugins').then(res => res.data)
  }

  async installSearchPlugin(sources: string[]) {
    return this.execute('/search/installPlugin', { sources: sources.join('|') }).then(
      () => true,
      () => false
    )
  }

  async uninstallSearchPlugin(names: string[]) {
    return this.execute('/search/uninstallPlugin', { names: names.join('|') })
  }

  async enableSearchPlugin(names: string[], enable: boolean): Promise<void> {
    const params = {
      names: names.join('|'),
      enable
    }

    return this.execute('/search/enablePlugin', params)
  }

  async updateSearchPlugins(): Promise<void> {
    return this.execute('/search/updatePlugins')
  }

  async shutdownApp(): Promise<boolean> {
    return this.axios.post('/app/shutdown').then(
      () => true,
      () => false
    )
  }

  async getNetworkInterfaces(): Promise<NetworkInterface[]> {
    return this.axios.get('/app/networkInterfaceList').then(r => r.data)
  }

  async getAddresses(iface: string = ''): Promise<string[]> {
    const params = {
      iface
    }

    return this.axios.get('/app/networkInterfaceAddressList', { params }).then(r => r.data)
  }

  async getLogs(afterId?: number, logsToInclude: LogType = LogType.ALL): Promise<Log[]> {
    const params = {
      last_known_id: afterId,
      info: (logsToInclude & LogType.INFO) == LogType.INFO,
      normal: (logsToInclude & LogType.NORMAL) == LogType.NORMAL,
      warning: (logsToInclude & LogType.WARNING) == LogType.WARNING,
      critical: (logsToInclude & LogType.CRITICAL) == LogType.CRITICAL
    }

    return this.axios.get('/log/main', { params }).then(r => r.data)
  }
}

export const Qbit = new QBitApi()
export default Qbit
