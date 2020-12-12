import axios from 'axios'

class Qbit {
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

  getAppVersion() {
    return this.axios.get('/app/version')
      .then(res => res.data)
  }

  getApiVersion() {
    return this.axios.get('/app/webapiVersion')
  }

  async login(params) {
    const payload = new URLSearchParams(params)
    const { data } = await this.axios.post('/auth/login', payload, {
      validateStatus(status) {
        return status === 200 || status === 403
      }
    })
    
    return data
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
    return this.axios.get(
      '/sync/maindata', { params: { rid } })
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
      sort: payload.sort,
      reverse: payload.reverse,
      hashes: payload.hashes ? payload.hashes.join('|') : null,
      filter: payload.filter ? payload.filter : null,
      category: payload.category !== null ? payload.category : null
    }

    // clean
    Object.keys(params).forEach(
      key => params[key] == null && delete params[key]
    )

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
    const params = {
      hash,
      name
    }
    
    return this.axios.get('/torrents/rename', { params })
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
    return this.axios.get('/torrents/tags')
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

  getTorrentProperties(hash) {
    return this.axios.get('/torrents/properties', {
      params: { hash }
    })
  }

  torrentAction(action, hashes, extra) {
    const params = {
      hashes: hashes.join('|'),
      ...extra
    }
    
    return this.execute('post', `/torrents/${action}`, params)
  }

  renameFile(hash, id, name) {
    const params = {
      hash,
      id,
      name
    }
    
    return this.execute('post', '/torrents/renameFile', params)
  }

  /** Torrent Priority **/
  setTorrentPriority(hash, priority) {
    if (['increasePrio', 'decreasePrio', 'topPrio', 'bottomPrio'].includes(priority)) {
      return this.execute('post', `/torrents/${priority}`, {
        hashes: hash
      })
    }
  }

  /** Begin Torrent Tags **/
  removeTorrentTag(hash, tag) {
    return this.execute('post', '/torrents/removeTags', {
      hashes: hash,
      tags: tag
    })
  }

  addTorrentTag(hash, tag) {
    return this.execute('post', '/torrents/addTags ', {
      hashes: hash,
      tags: tag
    })
  }

  createTag(tag) {
    return this.execute('/torrents/createTags  ', {
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
    return this.axios.get('/torrents/categories')
      .then(res => res.data)
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

  setCategory(hash, cat) {
    return this.execute('post', '/torrents/setCategory', {
      hashes: hash,
      category: cat
    })
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
    return this.axios.get('/search/plugins')
      .then(res => res.data)
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
      id,
      limit: 50
    })
  }
}

export default new Qbit()
