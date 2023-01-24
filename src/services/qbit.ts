import axios, { AxiosInstance } from 'axios'

export class QBitApi {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'api/v2'
    })

    this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  execute(method, action, params) {
    if (method === 'post') {
      const data = new URLSearchParams(params)

      return this.axios.post(action, data).then(res => res.data)
    }
  }

  /** Begin General functions * */
  getAppVersion(): Promise<string> {
    return this.axios
      .get('/app/version')
      .then(res => res.data)
      .then(version => (version.includes('v') ? version.substring(1) : version))
  }

  getApiVersion() {
    return this.axios.get('/app/webapiVersion')
  }

  async login(params) {
    const payload = new URLSearchParams(params)
    const { data } = await this.axios
      .post('/auth/login', payload, {
        validateStatus(status) {
          return status === 200 || status === 403
        }
      })
      .catch(err => console.log(err))

    return data
  }

  async getAuthenticationStatus() {
    return this.axios
      .get('/app/version')
      .then(() => true)
      .catch(() => false)
  }

  async logout() {
    this.axios.post('/auth/logout')
  }

  getGlobalTransferInfo() {
    return this.axios.get('/transfer/info')
  }

  getAppPreferences() {
    return this.axios.get('/app/preferences')
  }

  setPreferences(params) {
    const data = new URLSearchParams({
      json: JSON.stringify(params)
    })

    return this.axios.post('/app/setPreferences', data)
  }

  getMainData(rid) {
    return this.axios.get('/sync/maindata', { params: { rid } }).then(res => res.data)
  }

  switchToOldUi() {
    return this.setPreferences({
      alternative_webui_enabled: false
    })
  }

  toggleSpeedLimitsMode() {
    return this.axios.post('/transfer/toggleSpeedLimitsMode')
  }

  /** Begin Torrent functions * */

  // Get

  getLogs(lastId) {
    return this.axios.get('/log/main', {
      last_known_id: lastId
    })
  }

  getTorrents(payload) {
    const params = {
      sort: !payload.isCustomSortEnabled ? payload.sort : null,
      reverse: !payload.isCustomSortEnabled ? payload.reverse : null,
      hashes: payload.hashes.length > 0 ? payload.hashes.join('|') : null,
      filter: payload.filter ? payload.filter : null,
      category: payload.category !== null ? payload.category : null,
      tag: payload.tag !== null ? payload.tag : null
    }

    // clean
    Object.keys(params).forEach(key => params[key] == null && delete params[key])

    const data = new URLSearchParams(params)

    return this.axios.get(`/torrents/info?${data.toString()}`)
  }

  getTorrentTrackers(hash) {
    return this.axios.get('/torrents/trackers', {
      params: { hash }
    })
  }

  getTorrentPeers(hash, rid) {
    return this.axios.get('/sync/torrentPeers', {
      params: { hash, rid }
    })
  }

  setTorrentName(hash, name) {
    return this.execute('post', '/torrents/rename', { hash, name })
  }

  getTorrentPieceStates(hash) {
    return this.axios.get('/torrents/pieceStates', {
      params: { hash }
    })
  }

  getTorrentFiles(hash) {
    return this.axios.get('/torrents/files', {
      params: { hash }
    })
  }

  getAvailableTags() {
    return this.axios.get('/torrents/tags').then(res => res.data)
  }

  getTorrentProperties(hash) {
    return this.axios
      .get('/torrents/properties', {
        params: { hash }
      })
      .then(res => res.data)
  }

  // RSS

  createFeed(feed) {
    return this.execute('post', '/rss/addFeed', {
      url: feed.url,
      path: feed.url
    })
  }

  createRule(ruleName, defs) {
    return this.execute('post', '/rss/setRule', {
      ruleName: ruleName,
      ruleDef: JSON.stringify(defs)
    })
  }

  getFeeds() {
    return this.axios
      .get('/rss/items')
      .then(res => res.data)
      .then(data =>
        Object.entries(data).map(feed => {
          return { name: feed[0], ...feed[1] }
        })
      )
  }

  getRules() {
    return this.axios
      .get('/rss/rules')
      .then(res => res.data)
      .then(data =>
        Object.entries(data).map(rule => {
          return { name: rule[0], ...rule[1] }
        })
      )
  }

  deleteRule(ruleName) {
    return this.execute('post', 'rss/removeRule', {
      ruleName
    })
  }

  deleteFeed(name) {
    return this.execute('post', 'rss/removeItem', {
      path: name
    })
  }

  // Post

  addTorrents(params, torrents) {
    let data
    if (torrents) {
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
      data = new URLSearchParams(params)
    }

    return this.axios.post('/torrents/add', data)
  }

  setTorrentFilePriority(hash, idList, priority) {
    const params = {
      hash,
      id: idList.join('|'),
      priority
    }

    return this.execute('post', '/torrents/filePrio', params)
  }

  deleteTorrents(hashes, deleteFiles) {
    if (!hashes.length) return

    return this.torrentAction('delete', hashes, { deleteFiles })
  }

  pauseTorrents(hashes) {
    return this.torrentAction('pause', hashes)
  }

  resumeTorrents(hashes) {
    return this.torrentAction('resume', hashes)
  }

  forceStartTorrents(hashes) {
    return this.torrentAction('setForceStart', hashes, { value: true })
  }

  toggleSequentialDownload(hashes) {
    return this.torrentAction('toggleSequentialDownload', hashes)
  }

  toggleFirstLastPiecePriority(hashes) {
    return this.torrentAction('toggleFirstLastPiecePrio', hashes)
  }

  setAutoTMM(hashes, enable) {
    return this.torrentAction('setAutoManagement', hashes, { enable })
  }

  setDownloadLimit(hashes, limit) {
    return this.torrentAction('setDownloadLimit', hashes, { limit })
  }

  setUploadLimit(hashes, limit) {
    return this.torrentAction('setUploadLimit', hashes, { limit })
  }

  async getGlobalDownloadLimit() {
    const { data } = await this.axios.get('/transfer/downloadLimit')

    return data
  }

  async getGlobalUploadLimit() {
    const { data } = await this.axios.get('/transfer/uploadLimit')

    return data
  }

  setGlobalDownloadLimit(limit) {
    const formData = new FormData()
    formData.append('limit', limit)

    return this.axios.post('/transfer/setDownloadLimit', formData)
  }

  setGlobalUploadLimit(limit) {
    const formData = new FormData()
    formData.append('limit', limit)

    return this.axios.post('/transfer/setUploadLimit', formData)
  }

  setShareLimit(hashes, ratioLimit, seedingTimeLimit) {
    return this.torrentAction('setShareLimits', hashes, {
      ratioLimit,
      seedingTimeLimit
    })
  }

  reannounceTorrents(hashes) {
    return this.torrentAction('reannounce', hashes)
  }

  recheckTorrents(hashes) {
    return this.torrentAction('recheck', hashes)
  }

  setTorrentsCategory(hashes, category) {
    return this.torrentAction('setCategory', hashes, { category })
  }

  editTracker(hash, origUrl, newUrl) {
    return this.torrentAction('editTracker', [hash], { origUrl, newUrl })
  }

  setTorrentLocation(hashes, location) {
    return this.torrentAction('setLocation', hashes, { location })
  }

  addTorrenTrackers(hash, trackers) {
    const params = {
      hash,
      urls: trackers
    }

    return this.execute('post', '/torrents/addTrackers', params)
  }

  removeTorrentTrackers(hash, trackers) {
    const params = {
      hash,
      urls: trackers.join('|')
    }

    return this.execute('post', '/torrents/removeTrackers', params)
  }

  addTorrentPeers(hashes: Array<string>, peers: Array<string>) {
    const params = {
      hashes: hashes.join('|'),
      peers: peers.join('|')
    }

    return this.execute('post', '/torrents/addPeers', params)
  }

  banPeers(peers: Array<string>) {
    const params = {
      peers: peers.join('|')
    }

    return this.execute('post', '/transfer/banPeers', params)
  }

  torrentAction(action, hashes, extra) {
    const params = {
      hashes: hashes.length ? hashes.join('|') : 'all',
      ...extra
    }

    return this.execute('post', `/torrents/${action}`, params)
  }

  renameFile(hash, oldPath, newPath) {
    const params = {
      hash,
      oldPath,
      newPath
    }

    return this.execute('post', '/torrents/renameFile', params)
  }

  renameFolder(hash, oldPath, newPath) {
    const params = {
      hash,
      oldPath,
      newPath
    }

    return this.execute('post', '/torrents/renameFolder', params)
  }

  /** Torrent Priority **/
  setTorrentPriority(hashes, priority) {
    if (['increasePrio', 'decreasePrio', 'topPrio', 'bottomPrio'].includes(priority)) {
      return this.execute('post', `/torrents/${priority}`, {
        hashes: hashes.join('|')
      })
    }
  }

  /** Begin Torrent Tags **/
  removeTorrentTag(hashes, tag) {
    return this.execute('post', '/torrents/removeTags', {
      hashes: hashes.join('|'),
      tags: tag
    })
  }

  addTorrentTag(hashes, tag) {
    return this.execute('post', '/torrents/addTags ', {
      hashes: hashes.join('|'),
      tags: tag
    })
  }

  createTag(tag) {
    return this.execute('post', '/torrents/createTags  ', {
      tags: tag
    })
  }

  deleteTag(tag) {
    return this.execute('post', '/torrents/deleteTags', {
      tags: tag
    })
  }

  /** Begin Categories **/
  getCategories() {
    return this.axios.get('/torrents/categories').then(res => res.data)
  }

  deleteCategory(categories) {
    return this.execute('post', '/torrents/removeCategories', {
      categories
    })
  }

  createCategory(cat) {
    return this.execute('post', '/torrents/createCategory', {
      category: cat.name,
      savePath: cat.savePath
    })
  }

  setCategory(hashes, category) {
    return this.torrentAction('setCategory', hashes, { category })
  }

  editCategory(cat) {
    const params = {
      category: cat.name,
      savePath: cat.savePath
    }

    return this.execute('post', '/torrents/editCategory', params)
  }

  /** Search **/
  getSearchPlugins() {
    return this.axios.get('/search/plugins').then(res => res.data)
  }

  updateSearchPlugins() {
    return this.execute('post', '/search/updatePlugins')
  }

  enableSearchPlugin(plugins, enable) {
    const params = {
      names: plugins.join('|'),
      enable
    }

    return this.execute('post', '/search/enablePlugin', params)
  }

  startSearch(pattern, plugins) {
    const params = {
      pattern,
      plugins: Array.isArray(plugins) ? plugins.join('|') : 'all',
      category: 'all'
    }

    return this.execute('post', '/search/start', params)
  }

  stopSearch(id) {
    return this.execute('post', '/search/stop', { id })
  }

  getSearchStatus(id) {
    return this.execute('post', '/search/status', { id })
  }

  getSearchResults(id) {
    return this.execute('post', '/search/results', {
      id
    })
  }
}

export const Qbit = new QBitApi()
export default Qbit
