import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios, { AxiosResponse } from 'axios'
import type IProvider from './IProvider'
import type { FilePriority } from '@/constants/qbit'
import { DirectoryContentMode, LogType, PieceState } from '@/constants/qbit'
import type {
  ApplicationVersion,
  AppPreferences,
  BuildInfo,
  Category,
  Cookie,
  Feed,
  FeedRule,
  Log,
  QbitTorrent,
  SearchJob,
  SearchPlugin,
  SearchStatus,
  SSLParameters,
  TorrentCreatorParams,
  TorrentCreatorTask,
  TorrentFile,
  TorrentProperties,
  Tracker,
} from '@/types/qbit/models'
import { NetworkInterface } from '@/types/qbit/models/AppPreferences'
import type { AddTorrentPayload, AppPreferencesPayload, CreateFeedPayload, GetTorrentPayload, LoginPayload } from '@/types/qbit/payloads'
import type { MaindataResponse, SearchResultsResponse, TorrentPeersResponse } from '@/types/qbit/responses'

type Parameters = Record<string, any>

export default class QBitProvider implements IProvider {
  private static _instance: QBitProvider
  private axios: AxiosInstance

  private constructor() {
    this.axios = axios.create({
      baseURL: 'api/v2',
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
   * @param config - Config object to pass to the axios handler
   * @example this.post('/auth/login', { username: 'admin', password: 'adminadmin' })
   */
  private async post(route: string, params?: Parameters, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const data = new URLSearchParams(params)
    return this.axios.post(route, data, config)
  }

  /// AppController ///

  async getBuildInfo(): Promise<BuildInfo | undefined> {
    return this.axios
      .get('/app/buildInfo')
      .then(res => res.data)
      .catch(() => undefined)
  }

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
      json: JSON.stringify(params),
    }

    return this.post('/app/setPreferences', data).then(res => res.data)
  }

  async shutdownApp(): Promise<boolean> {
    return this.post('/app/shutdown').then(
      () => true,
      () => false
    )
  }

  async getNetworkInterfaces(): Promise<NetworkInterface[]> {
    return this.axios.get('/app/networkInterfaceList').then(r => r.data)
  }

  async getAddresses(iface: string = ''): Promise<string[]> {
    const params = {
      iface,
    }

    return this.axios.get('/app/networkInterfaceAddressList', { params }).then(r => r.data)
  }

  async sendTestEmail(): Promise<void> {
    await this.post('/app/sendTestEmail')
  }

  async getDirectoryContent(dirPath: string, mode?: DirectoryContentMode): Promise<string[] | null> {
    return this.post('/app/getDirectoryContent', { dirPath, mode }, { validateStatus: code => code < 500 }).then(res => (res.status === 200 ? res.data : null))
  }

  async getCookies(): Promise<Cookie[]> {
    return this.axios.get('/app/cookies').then(r => r.data)
  }

  async setCookies(cookies: Cookie[]): Promise<void> {
    await this.post('/app/setCookies', { cookies: JSON.stringify(cookies) })
  }

  /// AuthController ///

  async login(params: LoginPayload): Promise<AxiosResponse<string, string>> {
    return this.post('/auth/login', params, { validateStatus: () => true })
  }

  async logout(): Promise<void> {
    await this.post('/auth/logout')
  }

  /// LogController ///

  async getLogs(afterId?: number, logsToInclude?: LogType): Promise<Log[]> {
    const includeFilter = logsToInclude ?? LogType.ALL

    const filterMaskInfo = (includeFilter & LogType.INFO) as LogType
    const filterMaskNormal = (includeFilter & LogType.NORMAL) as LogType
    const filterMaskWarning = (includeFilter & LogType.WARNING) as LogType
    const filterMaskCritical = (includeFilter & LogType.CRITICAL) as LogType

    const params = {
      last_known_id: afterId,
      info: filterMaskInfo === LogType.INFO,
      normal: filterMaskNormal === LogType.NORMAL,
      warning: filterMaskWarning === LogType.WARNING,
      critical: filterMaskCritical === LogType.CRITICAL,
    }

    return this.axios.get('/log/main', { params }).then(r => r.data)
  }

  /// RssController ///

  async createFeed(payload: CreateFeedPayload): Promise<void> {
    await this.post('/rss/addFeed', {
      url: payload.url,
      path: payload.name,
    })
  }

  async setRule(ruleName: string, ruleDef: FeedRule): Promise<void> {
    await this.post('/rss/setRule', {
      ruleName,
      ruleDef: JSON.stringify(ruleDef),
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
            ...ruleBody,
          }

          if (!Object.hasOwn(rule, 'torrentParams')) {
            rule.torrentParams = {
              save_path: ruleBody.savePath,
              category: ruleBody.assignedCategory,
              stopped: ruleBody.addPaused,
              content_layout: ruleBody.torrentContentLayout,
            }
          }

          rules.push(rule)
        }
        return rules
      })
  }

  async renameFeed(oldName: string, newName: string): Promise<void> {
    await this.post('/rss/moveItem', {
      itemPath: oldName,
      destPath: newName,
    })
  }

  async setFeedUrl(path: string, url: string): Promise<void> {
    await this.post('/rss/setFeedURL', { path, url })
  }

  async renameRule(ruleName: string, newRuleName: string): Promise<void> {
    await this.post('/rss/renameRule', {
      ruleName,
      newRuleName,
    })
  }

  async deleteRule(ruleName: string): Promise<void> {
    await this.post('rss/removeRule', { ruleName })
  }

  async deleteFeed(name: string): Promise<void> {
    await this.post('rss/removeItem', {
      path: name,
    })
  }

  async markAsRead(itemPath: string, articleId?: string): Promise<void> {
    const params: Record<string, string> = { itemPath }
    if (articleId) {
      params['articleId'] = articleId
    }
    await this.post('rss/markAsRead', params)
  }

  async refreshFeed(itemPath: string): Promise<void> {
    await this.post('rss/refreshItem', {
      itemPath,
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
      plugins: plugins.join('|'),
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
      id: id !== undefined ? id : 0,
    }).then(res => res.data)
  }

  async getSearchResults(id: number, offset?: number, limit?: number): Promise<SearchResultsResponse> {
    return this.post('/search/results', {
      id,
      limit,
      offset,
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
    await this.post('/search/uninstallPlugin', { names: names.join('|') })
  }

  async enableSearchPlugin(names: string[], enable: boolean): Promise<void> {
    const params = {
      names: names.join('|'),
      enable,
    }

    await this.post('/search/enablePlugin', params)
  }

  async updateSearchPlugins(): Promise<void> {
    await this.post('/search/updatePlugins')
  }

  async downloadTorrentWithSearchPlugin(torrentUrl: string, pluginName: string): Promise<void> {
    await this.post('/search/downloadTorrent', { torrentUrl, pluginName })
  }

  /// SyncController ///

  async getMaindata(rid?: number): Promise<MaindataResponse> {
    return this.axios.get('/sync/maindata', { params: { rid } }).then(res => res.data)
  }

  async syncTorrentPeers(hash: string, rid?: number): Promise<TorrentPeersResponse> {
    return this.axios
      .get('/sync/torrentPeers', {
        params: { hash, rid },
      })
      .then(r => r.data)
  }

  /// TorrentCreatorController //

  async addTorrentCreatorTask(taskParams: TorrentCreatorParams): Promise<string> {
    if (taskParams.trackers) {
      taskParams.trackers = taskParams.trackers.trim().replaceAll('\n', '|')
    }
    if (taskParams.urlSeeds) {
      taskParams.urlSeeds = taskParams.urlSeeds.trim().replaceAll('\n', '|')
    }

    return this.post('/torrentcreator/addTask', taskParams)
      .then(res => res.data)
      .then(data => data.taskID)
  }

  async getTorrentCreatorStatus(taskID?: string): Promise<TorrentCreatorTask[]> {
    return this.axios.get('/torrentcreator/status', { params: { taskID } }).then(res => res.data)
  }

  async getTorrentCreatorOutput(taskID: string): Promise<Blob> {
    return this.axios
      .get('/torrentcreator/torrentFile', {
        params: { taskID },
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/x-bittorrent',
        },
      })
      .then(res => new Blob([res.data], { type: 'application/x-bittorrent' }))
  }

  async deleteTorrentCreatorTask(taskID: string): Promise<boolean> {
    return this.post('/torrentcreator/deleteTask', { taskID })
      .then(() => true)
      .catch(() => false)
  }

  /// TorrentsController ///

  async getTorrents(payload?: GetTorrentPayload): Promise<QbitTorrent[]> {
    return this.axios.get('/torrents/info', { params: payload }).then(r => r.data)
  }

  async getTorrentTrackers(hash: string): Promise<Tracker[]> {
    return this.axios
      .get('/torrents/trackers', {
        params: { hash },
      })
      .then(r => r.data)
  }

  async setTorrentName(hash: string, name: string): Promise<void> {
    await this.post('/torrents/rename', { hash, name })
  }

  async getTorrentPieceStates(hash: string): Promise<PieceState[]> {
    return this.axios
      .get('/torrents/pieceStates', {
        params: { hash },
      })
      .then(res => res.data)
  }

  async getTorrentFiles(hash: string, indexes?: number[]): Promise<TorrentFile[]> {
    return this.axios
      .get('/torrents/files', {
        params: { hash, indexes: indexes?.join('|') },
      })
      .then(res => res.data)
      .then(
        (files: TorrentFile[]) =>
          files.some(file => file.index === undefined)
            ? files.map((file: TorrentFile, index: number) => ({
                ...file,
                index,
              }))
            : files
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
        params: { hash },
      })
      .then(res => res.data)
  }

  async addTorrents(torrents: File[], urls: string, params?: AddTorrentPayload): Promise<void> {
    let data
    if (torrents) {
      // torrent files
      const formData = new FormData()
      for (const [key, value] of Object.entries(params || {})) {
        if (value !== undefined) {
          formData.set(key, String(value))
        }
      }

      for (const torrent of torrents) {
        formData.append('torrents', torrent)
      }

      data = formData
    } else {
      // magnet links
      data = new URLSearchParams((params || {}) as Parameters)
    }

    if (urls) {
      data.set('urls', urls)
    }

    return this.axios.post('/torrents/add', data)
  }

  async setTorrentFilePriority(hash: string, idList: number[], priority: FilePriority): Promise<void> {
    const params = {
      hash,
      id: idList.join('|'),
      priority,
    }

    return this.post('/torrents/filePrio', params).then(res => res.data)
  }

  async deleteTorrents(hashes: string[], deleteFiles: boolean): Promise<void> {
    return this.post(`/torrents/delete`, {
      hashes: hashes.join('|'),
      deleteFiles,
    }).then(res => res.data)
  }

  async pauseTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/pause`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async pauseAllTorrents(): Promise<void> {
    return this.post(`/torrents/pause`, {
      hashes: 'all',
    }).then(res => res.data)
  }

  async stopTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/stop`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async stopAllTorrents(): Promise<void> {
    return this.post(`/torrents/stop`, {
      hashes: 'all',
    }).then(res => res.data)
  }

  async resumeTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/resume`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async resumeAllTorrents(): Promise<void> {
    return this.post(`/torrents/resume`, {
      hashes: 'all',
    }).then(res => res.data)
  }

  async startTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/start`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async startAllTorrents(): Promise<void> {
    return this.post(`/torrents/start`, {
      hashes: 'all',
    }).then(res => res.data)
  }

  async forceStartTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/setForceStart`, {
      hashes: hashes.join('|'),
      value: true,
    }).then(res => res.data)
  }

  async toggleSequentialDownload(hashes: string[]): Promise<void> {
    return this.post(`/torrents/toggleSequentialDownload`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async toggleFirstLastPiecePriority(hashes: string[]): Promise<void> {
    return this.post(`/torrents/toggleFirstLastPiecePrio`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async setSuperSeeding(hashes: string[], value: boolean): Promise<void> {
    return this.post(`/torrents/setSuperSeeding`, {
      hashes: hashes.join('|'),
      value,
    }).then(res => res.data)
  }

  async setAutoTMM(hashes: string[], enable: boolean): Promise<void> {
    return this.post(`/torrents/setAutoManagement`, {
      hashes: hashes.join('|'),
      enable,
    }).then(res => res.data)
  }

  async setDownloadLimit(hashes: string[], limit: number): Promise<void> {
    return this.post(`/torrents/setDownloadLimit`, {
      hashes: hashes.join('|'),
      limit,
    }).then(res => res.data)
  }

  async setUploadLimit(hashes: string[], limit: number): Promise<void> {
    return this.post(`/torrents/setUploadLimit`, {
      hashes: hashes.join('|'),
      limit,
    }).then(res => res.data)
  }

  async getTorrentsCount(): Promise<number> {
    return this.axios.get('/torrents/count').then(res => res.data)
  }

  async setShareLimit(hashes: string[], ratioLimit: number, seedingTimeLimit: number, inactiveSeedingTimeLimit: number): Promise<void> {
    return this.post(`/torrents/setShareLimits`, {
      hashes: hashes.join('|'),
      ratioLimit,
      seedingTimeLimit,
      inactiveSeedingTimeLimit,
    }).then(res => res.data)
  }

  async reannounceTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/reannounce`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async recheckTorrents(hashes: string[]): Promise<void> {
    return this.post(`/torrents/recheck`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async setTorrentDownloadPath(hashes: string[], path: string): Promise<void> {
    const params = {
      id: hashes.length ? hashes.join('|') : 'all',
      path,
    }

    return this.post(`/torrents/setDownloadPath`, params).then(res => res.data)
  }

  async setTorrentSavePath(hashes: string[], path: string): Promise<void> {
    const params = {
      id: hashes.length ? hashes.join('|') : 'all',
      path,
    }

    return this.post(`/torrents/setSavePath`, params).then(res => res.data)
  }

  async addTorrentTrackers(hash: string, trackers: string): Promise<void> {
    const params = {
      hash,
      urls: trackers,
    }

    return this.post(`/torrents/addTrackers`, params).then(res => res.data)
  }

  async editTorrentTracker(hash: string, origUrl: string, newUrl: string): Promise<void> {
    const params = {
      hash,
      origUrl,
      newUrl,
    }

    return this.post(`/torrents/editTracker`, params).then(res => res.data)
  }

  async removeTorrentTrackers(hash: string, trackers: string[]): Promise<void> {
    const params = {
      hash,
      urls: trackers.map(encodeURIComponent).join('|'),
    }

    return this.post(`/torrents/removeTrackers`, params).then(res => res.data)
  }

  async addTorrentPeers(hashes: string[], peers: string[]): Promise<void> {
    return this.post(`/torrents/addPeers`, {
      hashes: hashes.join('|'),
      peers: peers.join('|'),
    }).then(res => res.data)
  }

  async renameFile(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath,
    }

    return this.post('/torrents/renameFile', params).then(res => res.data)
  }

  async renameFolder(hash: string, oldPath: string, newPath: string): Promise<void> {
    const params = {
      hash,
      oldPath,
      newPath,
    }

    return this.post('/torrents/renameFolder', params).then(res => res.data)
  }

  async setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'): Promise<void> {
    return this.post(`/torrents/${priority}`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async addTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    return this.post(`/torrents/addTags`, {
      hashes: hashes.join('|'),
      tags: tags.join(','),
    }).then(res => res.data)
  }

  async removeTorrentTag(hashes: string[], tags: string[]): Promise<void> {
    return this.post(`/torrents/removeTags`, {
      hashes: hashes.join('|'),
      tags: tags.join(','),
    }).then(res => res.data)
  }

  async removeTorrentAllTags(hashes: string[]): Promise<void> {
    return this.post(`/torrents/removeTags`, {
      hashes: hashes.join('|'),
    }).then(res => res.data)
  }

  async createTag(tags: string[]): Promise<void> {
    return this.post('/torrents/createTags', {
      tags: tags.join(','),
    }).then(res => res.data)
  }

  async deleteTags(tags: string[]): Promise<void> {
    return this.post('/torrents/deleteTags', {
      tags: tags.join(','),
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
      categories: categories.join('\n'),
    }).then(res => res.data)
  }

  async createCategory(cat: Category): Promise<void> {
    return this.post('/torrents/createCategory', {
      category: cat.name,
      savePath: cat.savePath,
      downloadPath: cat.downloadPath,
      downloadPathEnabled: cat.downloadPathEnabled && cat.downloadPath !== '',
    }).then(res => res.data)
  }

  async setCategory(hashes: string[], category: string): Promise<void> {
    return this.post('/torrents/setCategory', {
      hashes: hashes.join('|'),
      category,
    }).then(res => res.data)
  }

  async editCategory(cat: Category): Promise<void> {
    const params = {
      category: cat.name,
      savePath: cat.savePath,
      downloadPath: cat.downloadPath,
      downloadPathEnabled: cat.downloadPathEnabled && cat.downloadPath !== '',
    }

    return this.post('/torrents/editCategory', params).then(res => res.data)
  }

  async exportTorrent(hash: string): Promise<Blob> {
    return this.axios
      .get('/torrents/export', {
        params: { hash },
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/x-bittorrent',
        },
      })
      .then(res => new Blob([res.data], { type: 'application/x-bittorrent' }))
  }

  async SSLParameters(hash: string): Promise<SSLParameters> {
    return this.axios.get('/torrents/SSLParameters', { params: { hash } }).then(res => res.data)
  }

  async setSSLParameters(hash: string, params: SSLParameters): Promise<boolean> {
    return this.post('/torrents/setSSLParameters', {
      hash,
      ssl_certificate: params.ssl_certificate,
      ssl_private_key: params.ssl_private_key,
      ssl_dh_params: params.ssl_dh_params,
    })
      .then(() => true)
      .catch(() => false)
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
      limit,
    }).then(res => res.data)
  }

  async setGlobalUploadLimit(limit: number): Promise<void> {
    const data = {
      limit,
    }

    return this.post('/transfer/setUploadLimit', data).then(res => res.data)
  }

  async banPeers(peers: string[]): Promise<void> {
    const params = {
      peers: peers.join('|'),
    }

    return this.post('/transfer/banPeers', params).then(res => res.data)
  }
}
