import type { FilePriority } from '@/constants/qbit'
import { LogType, PieceState } from '@/constants/qbit'
import type {
  ApplicationVersion,
  AppPreferences,
  Category,
  Feed,
  FeedRule,
  Log,
  SearchJob,
  SearchPlugin,
  SearchStatus,
  Torrent,
  TorrentFile,
  TorrentProperties,
  Tracker
} from '@/types/qbit/models'
import { NetworkInterface } from '@/types/qbit/models/AppPreferences'
import type { AddTorrentPayload, AppPreferencesPayload, CreateFeedPayload, GetTorrentPayload, LoginPayload } from '@/types/qbit/payloads'
import type { MaindataResponse, SearchResultsResponse, TorrentPeersResponse } from '@/types/qbit/responses'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type IProvider from './IProvider'

type Parameters = Record<string, any>

export default class QBitProvider implements IProvider {
  private static _instance: QBitProvider
  private axios: AxiosInstance

  private constructor() {
    this.axios = axios.create({
      baseURL: 'api/v2'
    })

    this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new QBitProvider()
    }
    return this._instance
  }

  /// Misc ///

  /**
   * Wrapper that converts a plain JSON object and sends a POST request
   * @param route - API route to send POST request
   * @param params - Plain record to include in the POST request
   * @example this.post('/auth/login', { username: 'admin', password: 'adminadmin' })
   */
  private async post(route: string, params?: Parameters): Promise<any> {
    const data = new URLSearchParams(params)
    return this.axios.post(route, data)
  }

  /**
   * Request wrapper for TorrentController
   * @param action - Action route to call on the controller
   * @param hashes - Hash array of torrents affected by the action
   * @param extra - Additional data to pass in the request body
   */
  private async torrentAction(action: string, hashes: string[], extra?: Parameters): Promise<any> {
    const params = {
      hashes: hashes.length ? hashes.join('|') : 'all',
      ...extra
    }

    return this.post(`/torrents/${action}`, params).then(res => res.data)
  }

  /// AppController ///

  async getVersion(): Promise<ApplicationVersion> {
    return this.axios
      .get('/app/version')
      .then(res => res.data)
      .then(version => (version.includes('v') ? version.substring(1) : version))
  }

  async getPreferences(): Promise<AppPreferences> {
    return this.axios.get('/app/preferences').then(r => r.data)
  }

  async setPreferences(params: AppPreferencesPayload): Promise<void> {
    const data = {
      json: JSON.stringify(params)
    }

    return this.post('/app/setPreferences', data).then(res => res.data)
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

  /// AuthController ///

  async login(params: LoginPayload): Promise<string> {
    const payload = new URLSearchParams(params as Parameters)
    return this.axios.post('/auth/login', payload, { validateStatus: (status: number) => status === 200 || status === 403 }).then(
      res => res.data,
      err => console.log(err)
    )
  }

  async logout(): Promise<void> {
    return this.axios.post('/auth/logout')
  }

  async getAuthenticationStatus(): Promise<boolean> {
    return this.axios.get('/app/buildInfo').then(
      () => true,
      () => false
    )
  }

  /// LogController ///

  async getLogs(afterId?: number, logsToInclude?: LogType): Promise<Log[]> {
    const includeFilter = logsToInclude ?? LogType.ALL

    const params = {
      last_known_id: afterId,
      info: (includeFilter & LogType.INFO) == LogType.INFO,
      normal: (includeFilter & LogType.NORMAL) == LogType.NORMAL,
      warning: (includeFilter & LogType.WARNING) == LogType.WARNING,
      critical: (includeFilter & LogType.CRITICAL) == LogType.CRITICAL
    }

    return this.axios.get('/log/main', { params }).then(r => r.data)
  }

  /// RssController ///

  async createFeed(payload: CreateFeedPayload): Promise<void> {
    return this.post('/rss/addFeed', {
      url: payload.url,
      path: payload.name
    })
  }

  async setRule(ruleName: string, ruleDef: FeedRule): Promise<void> {
    return this.post('/rss/setRule', {
      ruleName,
      ruleDef: JSON.stringify(ruleDef)
    })
  }

  async getFeeds(withData: boolean): Promise<Feed[]> {
    return this.axios
      .get('/rss/items', { params: { withData } })
      .then(res => res.data)
      .then(payload => {
        const feeds = [] as Feed[]
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
          const ruleBody = payload[key] as Omit<FeedRule, 'name'>
          const rule = {
            name: key,
            ...ruleBody
          }

          if (!Object.hasOwn(rule, 'torrentParams')) {
            rule.torrentParams = {
              save_path: ruleBody.savePath,
              category: ruleBody.assignedCategory,
              stopped: ruleBody.addPaused,
              content_layout: ruleBody.torrentContentLayout
            }
          }

          rules.push(rule)
        }
        return rules
      })
  }

  async renameFeed(oldName: string, newName: string): Promise<void> {
    return this.post('/rss/moveItem', {
      itemPath: oldName,
      destPath: newName
    })
  }

  async setFeedUrl(path: string, url: string): Promise<void> {
    return this.post('/rss/setFeedURL', { path, url })
  }

  async renameRule(ruleName: string, newRuleName: string): Promise<void> {
    return this.post('/rss/renameRule', {
      ruleName,
      newRuleName
    })
  }

  async deleteRule(ruleName: string): Promise<void> {
    return this.post('rss/removeRule', { ruleName })
  }

  async deleteFeed(name: string): Promise<void> {
    return this.post('rss/removeItem', {
      path: name
    })
  }

  async markAsRead(itemPath: string, articleId: string): Promise<void> {
    return this.post('rss/markAsRead', {
      itemPath,
      articleId
    })
  }

  async refreshFeed(itemPath: string): Promise<void> {
    return this.post('rss/refreshItem', {
      itemPath
    })
  }

  async getMatchingArticles(ruleName: string): Promise<Record<string, string[]>> {
    return this.axios.get('/rss/matchingArticles', { params: { ruleName } }).then(r => r.data)
  }

  /// SearchController ///

  async startSearch(pattern: string, category: string, plugins: string[]): Promise<SearchJob> {
    const params = {
      pattern,
      category,
      plugins: plugins.join('|')
    }

    return this.post('/search/start', params).then(res => res.data)
  }

  async stopSearch(id: number): Promise<boolean> {
    return this.post('/search/stop', { id }).then(
      () => true,
      () => false
    )
  }

  async getSearchStatus(id?: number): Promise<SearchStatus[]> {
    return this.post('/search/status', {
      id: id !== undefined ? id : 0
    }).then(res => res.data)
  }

  async getSearchResults(id: number, offset?: number, limit?: number): Promise<SearchResultsResponse> {
    return this.post('/search/results', {
      id,
      limit,
      offset
    }).then(res => res.data)
  }

  async deleteSearchPlugin(id: number): Promise<boolean> {
    return this.post('/search/delete', { id }).then(
      () => true,
      () => false
    )
  }

  async getSearchPlugins(): Promise<SearchPlugin[]> {
    return this.axios.get('/search/plugins').then(res => res.data)
  }

  async installSearchPlugin(sources: string[]): Promise<boolean> {
    return this.post('/search/installPlugin', { sources: sources.join('|') }).then(
      () => true,
      () => false
    )
  }

  async uninstallSearchPlugin(names: string[]): Promise<void> {
    return this.post('/search/uninstallPlugin', { names: names.join('|') })
  }

  async enableSearchPlugin(names: string[], enable: boolean): Promise<void> {
    const params = {
      names: names.join('|'),
      enable
    }

    return this.post('/search/enablePlugin', params)
  }

  async updateSearchPlugins(): Promise<void> {
    return this.post('/search/updatePlugins')
  }

  /// SyncController ///

  async getMaindata(rid?: number): Promise<MaindataResponse> {
    return this.axios.get('/sync/maindata', { params: { rid } }).then(res => res.data)
  }

  async syncTorrentPeers(hash: string, rid?: number): Promise<TorrentPeersResponse> {
    return this.axios
      .get('/sync/torrentPeers', {
        params: { hash, rid }
      })
      .then(r => r.data)
  }

  /// TorrentsController ///

  async getTorrents(payload?: GetTorrentPayload): Promise<Torrent[]> {
    return this.axios.get('/torrents/info', { params: payload }).then(r => r.data)
  }

  async getTorrentTrackers(hash: string): Promise<Tracker[]> {
    return this.axios
      .get('/torrents/trackers', {
        params: { hash }
      })
      .then(r => r.data)
  }

  async setTorrentName(hash: string, name: string): Promise<void> {
    return this.post('/torrents/rename', { hash, name })
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
      .then(
        (files: TorrentFile[]) => (files.some(file => file.index === undefined) ? files.map((file: TorrentFile, index: number) => ({ ...file, index })) : files)
        /**
         * We manually add indexes to the response if they are missing to provide compatibility with older versions of qbittorent (< 4.4.0)
         * https://github.com/qbittorrent/qBittorrent/pull/14795
         *
         * We leave newer versions unaltered, as the files could be sent in different orders or be filtered
         * https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-4.1)#set-file-priority
         */
      )
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

  async addTorrents(torrents: File[], urls: string, params: AddTorrentPayload): Promise<void> {
    let data
    if (torrents) {
      // torrent files
      const formData = new FormData()
      for (const [key, value] of Object.entries(params || {})) {
        if (value !== undefined) {
          formData.set(key, value)
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
    !!urls && data.set('urls', urls)
    return this.axios.post('/torrents/add', data)
  }

  async setTorrentFilePriority(hash: string, idList: number[], priority: FilePriority): Promise<void> {
    const params = {
      hash,
      id: idList.join('|'),
      priority
    }

    return this.post('/torrents/filePrio', params).then(res => res.data)
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

  async setShareLimit(hashes: string[], ratioLimit: number, seedingTimeLimit: number, inactiveSeedingTimeLimit: number): Promise<void> {
    return this.torrentAction('setShareLimits', hashes, {
      ratioLimit,
      seedingTimeLimit,
      inactiveSeedingTimeLimit
    })
  }

  async reannounceTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('reannounce', hashes)
  }

  async recheckTorrents(hashes: string[]): Promise<void> {
    return this.torrentAction('recheck', hashes)
  }

  async setTorrentDownloadPath(hashes: string[], path: string): Promise<void> {
    const params = {
      id: hashes.length ? hashes.join('|') : 'all',
      path
    }

    return this.post(`/torrents/setDownloadPath`, params).then(res => res.data)
  }

  async setTorrentSavePath(hashes: string[], path: string): Promise<void> {
    const params = {
      id: hashes.length ? hashes.join('|') : 'all',
      path
    }

    return this.post(`/torrents/setSavePath`, params).then(res => res.data)
  }

  async addTorrentTrackers(hash: string, trackers: string): Promise<void> {
    const params = {
      hash,
      urls: trackers
    }

    return this.post(`/torrents/addTrackers`, params).then(res => res.data)
  }

  async editTorrentTracker(hash: string, origUrl: string, newUrl: string): Promise<void> {
    const params = {
      hash,
      origUrl,
      newUrl
    }

    return this.post(`/torrents/editTracker`, params).then(res => res.data)
  }

  async removeTorrentTrackers(hash: string, trackers: string[]): Promise<void> {
    const params = {
      hash,
      urls: trackers.join('|')
    }

    return this.post(`/torrents/removeTrackers`, params).then(res => res.data)
  }

  async addTorrentPeers(hashes: string[], peers: string[]): Promise<void> {
    return this.torrentAction('addPeers', hashes, { peers: peers.join('|') })
  }

  async renameFile(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath
    }

    return this.post('/torrents/renameFile', params).then(res => res.data)
  }

  async renameFolder(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath
    }

    return this.post('/torrents/renameFolder', params).then(res => res.data)
  }

  async setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'): Promise<void> {
    return this.post(`/torrents/${priority}`, {
      hashes: hashes.join('|')
    }).then(res => res.data)
  }

  async addTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    return this.torrentAction('addTags', hashes, { tags: tags.join('|') })
  }

  async removeTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    return this.torrentAction('removeTags', hashes, { tags: tags.join('|') })
  }

  async createTag(tags: string[]): Promise<void> {
    return this.post('/torrents/createTags', {
      tags: tags.join(',')
    }).then(res => res.data)
  }

  async deleteTags(tags: string[]): Promise<void> {
    return this.post('/torrents/deleteTags', {
      tags: tags.join(',')
    }).then(res => res.data)
  }

  async getCategories(): Promise<Category[]> {
    return this.axios
      .get('/torrents/categories')
      .then(res => res.data)
      .then(data => Object.values(data))
  }

  async deleteCategory(categories: string[]): Promise<void> {
    return this.post('/torrents/removeCategories', {
      categories: categories.join('\n')
    }).then(res => res.data)
  }

  async createCategory(cat: Category): Promise<void> {
    return this.post('/torrents/createCategory', {
      category: cat.name,
      savePath: cat.savePath
    }).then(res => res.data)
  }

  async setCategory(hashes: string[], category: string): Promise<void> {
    return this.torrentAction('setCategory', hashes, { category })
  }

  async editCategory(cat: Category): Promise<void> {
    const params = {
      category: cat.name,
      savePath: cat.savePath
    }

    return this.post('/torrents/editCategory', params).then(res => res.data)
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

  /// TransferController ///

  async toggleSpeedLimitsMode(): Promise<void> {
    return this.post('/transfer/toggleSpeedLimitsMode').then(res => res.data)
  }

  async getGlobalDownloadLimit(): Promise<number> {
    return this.axios.get('/transfer/downloadLimit').then(res => res.data)
  }

  async getGlobalUploadLimit(): Promise<number> {
    return this.axios.get('/transfer/uploadLimit').then(res => res.data)
  }

  async setGlobalDownloadLimit(limit: number): Promise<void> {
    return this.post('/transfer/setDownloadLimit', {
      limit
    }).then(res => res.data)
  }

  async setGlobalUploadLimit(limit: number): Promise<void> {
    const data = {
      limit
    }

    return this.post('/transfer/setUploadLimit', data).then(res => res.data)
  }

  async banPeers(peers: string[]): Promise<void> {
    const params = {
      peers: peers.join('|')
    }

    return this.post('/transfer/banPeers', params).then(res => res.data)
  }
}
