const axios = require('axios')

class Qbit {
    constructor() {
        this._axios = axios.create({
            timeout: 1000
        })
    }

    async getAll(sort) {
        const res = await this._axios.post('/all', sort)
        return res.data
    }

    async get_sessions_stats() {
        const res = await this._axios.get('/session')
        return res.data
    }

    async pause_torrents(torrents) {
        const res = await this._axios.post('/pause', torrents)
        return res.data
    }

    async pause_all() {
        const res = await this._axios.post('/pause_all')
        return res.data
    }

    async resume_torrents(torrents) {
        const res = await this._axios.post('/resume', torrents)
        return res.data
    }

    async resume_all() {
        const res = await this._axios.post('/resume_all')
        return res.data
    }

    async add_torrent(torrent) {
        const res = await this._axios.post('/add', torrent)
        return res
    }

    async remove_torrents(torrents) {
        const res = await this._axios.post('/remove', torrents)
        return res.data
    }

    async login(credentials) {
        let timeout = false
        const res = await this._axios
            .post('/login', credentials)
            .catch(error => {
                if (error.code === 'ECONNABORTED') timeout = true
                else throw error
            })
        return timeout ? 'timeout' : res.data
    }
}

const qbit = new Qbit()

export default qbit
