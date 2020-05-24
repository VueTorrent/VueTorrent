import axios from 'axios'

class Qbit {
    constructor() {
        this.axios = axios.create({
            baseURL: 'api/v2'
        })

        this.axios.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded'
    }

    getAppVersion() {
        return this.axios.get('/app/version')
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

    setPreferences(params) {
        const data = new URLSearchParams({
            json: JSON.stringify(params)
        })

        return this.axios.post('/app/setPreferences', data)
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
            reverse: payload.reverse
        }
        const data = new URLSearchParams(params)
        console.log(data.toString())
        return this.axios.get(`/torrents/info?${data.toString()}`)
    }

    deleteTorrents(hashes, deleteFiles) {
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

    getRssItems() {
        const params = {
            withData: true
        }

        return this.axios.get('/rss/items', {
            params
        })
    }

    addRssFeed(url, path = '') {
        const params = {
            url,
            path
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/rss/addFeed', data)
    }

    removeRssFeed(path) {
        const params = {
            path
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/rss/removeItem', data)
    }

    refreshRssFeed(path) {
        const params = {
            itemPath: path
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/rss/refreshItem', data)
    }

    moveRssFeed(path, newPath) {
        const params = {
            itemPath: path,
            destPath: newPath
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/rss/moveItem', data)
    }

    getRssRules() {
        return this.axios.get('/rss/rules')
    }

    setRssRule(name, def) {
        const params = {
            ruleName: name,
            ruleDef: JSON.stringify(def)
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/rss/setRule', data)
    }

    removeRssRule(name) {
        const params = {
            ruleName: name
        }

        const data = new URLSearchParams(params)
        return this.axios.post('/rss/removeRule', data)
    }

    actionTorrents(action, hashes, extra) {
        const params = {
            hashes: hashes.join('|'),
            ...extra
        }
        const data = new URLSearchParams(params)
        return this.axios.post(`/torrents/${action}`, data)
    }
}

export default new Qbit()
