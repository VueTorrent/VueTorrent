import axios from 'axios'

class Qbit {
    constructor() {
        this.axios = axios.create({
            baseURL: 'api/v2'
        })

        this.axios.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded'
    }

    execute(method, action, params){
        const data = new URLSearchParams(params)
        return this.axios[method](action, data).then(res => res.data)
    }

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
        const params = {
            rid
        }
        return this.axios.get('/sync/maindata', {
            params
        })
    }

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

    switchToOldUi() {
        const params = {
            alternative_webui_enabled: false
        }

        return this.setPreferences(params)
    }

    setTorrentFilePriority(hash, idList, priority) {
        const idListStr = idList.join('|')
        const params = {
            hash,
            id: idListStr,
            priority
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/torrents/filePrio', data)
    }

    getLogs(lastId) {
        const params = {
            last_known_id: lastId
        }

        return this.axios.get('/log/main', {
            params
        })
    }

    toggleSpeedLimitsMode() {
        return this.axios.post('/transfer/toggleSpeedLimitsMode')
    }

    getTorrents(payload) {
        let params = {
            sort: payload.sort,
            reverse: payload.reverse,
            hashes: payload.hashes ? payload.hashes.join('|') : null,
            filter: payload.filter ? payload.filter : null,
            category: payload.category !== null ? payload.category : null
        }

        //clean
        Object.keys(params).forEach(
            key => params[key] == null && delete params[key]
        )

        const data = new URLSearchParams(params)

        return this.axios.get(`/torrents/info?${data.toString()}`)
    }

    deleteTorrents(hashes, deleteFiles) {
        if(!hashes.length) return
        return this.actionTorrents('delete', hashes, { deleteFiles })
    }

    pauseTorrents(hashes) {
        return this.actionTorrents('pause', hashes)
    }

    resumeTorrents(hashes) {
        return this.actionTorrents('resume', hashes)
    }

    reannounceTorrents(hashes) {
        return this.actionTorrents('reannounce', hashes)
    }

    recheckTorrents(hashes) {
        return this.actionTorrents('recheck', hashes)
    }

    setTorrentsCategory(hashes, category) {
        return this.actionTorrents('setCategory', hashes, { category })
    }

    getTorrentTrackers(hash) {
        const params = {
            hash
        }

        return this.axios.get('/torrents/trackers', {
            params
        })
    }

    getTorrentPeers(hash, rid) {
        const params = {
            hash,
            rid
        }

        return this.axios.get('/sync/torrentPeers', {
            params
        })
    }

    editTracker(hash, origUrl, newUrl) {
        return this.actionTorrents('editTracker', [hash], { origUrl, newUrl })
    }

    setTorrentLocation(hashes, location) {
        return this.actionTorrents('setLocation', hashes, { location })
    }

    actionTorrents(action, hashes, extra) {
        const params = {
            hashes: hashes.join('|'),
            ...extra
        }
        return this.axios.post(`/torrents/${action}`, {params})
    }

    setTorrentName(hash, name) {
        const params = {
            hash,
            name
        }
        return this.axios.get('/torrents/rename', { params })
    }

    getTorrentProperties(hash) {
        const params = {
            hash
        }

        return this.axios.get('/torrents/properties', {
            params
        })
    }

    getTorrentPieceStates(hash) {
        const params = {
            hash
        }

        return this.axios.get('/torrents/pieceStates', {
            params
        })
    }

    getTorrentFiles(hash) {
        const params = {
            hash
        }

        return this.axios.get('/torrents/files', {
            params
        })
    }

    renameFile(hash, id, name) {
        const params = {
            hash,
            id,
            name
        }
        const data = new URLSearchParams(params)
        return this.axios.post('/torrents/renameFile', data)
    }

    getAvailableTags() {
        return this.axios.get('/torrents/tags')
    }

    removeTorrentTag(hash, tag) {
        const params = {
            hashes: hash,
            tags: tag
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/torrents/removeTags', data)
    }

    addTorrentTag(hash, tag) {
        const params = {
            hashes: hash,
            tags: tag
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/torrents/addTags ', data)
    }

    createTag(tag) {
        const params = {
            tags: tag
        }
        const data = new URLSearchParams(params)
        return this.axios.post('/torrents/createTags  ', data)
    }

    deleteTag(tag) {
        const params = {
            tags: tag
        }
        const data = new URLSearchParams(params)
        return this.axios.post('/torrents/deleteTags   ', data)
    }

    // Begin Categories

    getCategories() {
        return this.axios.get('/torrents/categories')
            .then(res => res.data)
    }

    deleteCategory(categories) {
        return this.categoryAction('removeCategories', {
            categories
        })
    }

    createCategory(cat) {
        return this.categoryAction('createCategory', {
            category: cat.name,
            savePath: cat.savePath
        })
    }

    setCategory(hash, cat) {
        return this.categoryAction('setCategory', {
            hashes: hash,
            category: cat
        })
    }

    editCategory(cat) {
        const params = {
            category: cat.name,
            savePath: cat.savePath
        }
        return this.categoryAction('editCategory', params)
    }
    
    categoryAction(action, params){
        const data = new URLSearchParams(params)
        return this.axios.post(`/torrents/${action}`, data)
    }

    // End Categories

    // Search
    getSearchPlugins(){
        return this.axios.get('/search/plugins')
            .then(res => res.data)
    }

    enableSearchPlugin(plugins, enable){
        const params = {
            names: plugins.join('|'),
            enable
        }
        return this.searchAction('enablePlugin', params)
    }

    startSearch(pattern, category = null) {
        const params = {
            pattern,
            plugins: 'all',
            category: category ? category : 'all'
        }
        return this.searchAction('start', params)
    }
    
    stopSearch(id){
        return this.searchAction('stop', {id})
    }

    getSearchStatus(id) {
        return this.searchAction('status', {id})
    }

    getSearchResults(id) {
        return this.searchAction('results', {
            id,
            limit: 30
        })
    }
    
    searchAction(action ,params){
        const data = new URLSearchParams(params)
        return this.axios.post(`/search/${action}`, data)
            .then(res => res.data)
    }
}

export default new Qbit()
