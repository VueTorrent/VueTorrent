const api = require('qbittorrent-api-v2')
const dotenv = require('dotenv')
const Torrent = require('./models/torrent.class.js')
const Stat = require('./models/stat.class.js')

dotenv.config()

const connection = api.connect(process.env.QBIT_HOST, process.env.QBIT_USER, process.env.QBIT_PASS)


class Qbit {
  async get_all(prop) {
    try {
    const res = await (await connection).torrents('all', null, prop.name, String(prop.reverse), '20', null, null)
    const torrents = []
        res.forEach((el) => {
          const t = new Torrent(el)
          torrents.push(t)
        })
    return torrents
    } catch (err) {
      return `something went wrong:${err}`
    }
  }

  async get_session_stats() {
    try {
    const res = await (await connection).transferInfo()
    return new Stat(res)
    } catch (err) {
      return `something went wrong:${err}`
    }
  }

  async pause_torrents(torrents) {
    let _torrents = ''
    torrents.forEach((el) => {
      _torrents += `${el}|`
    })
    try {
      return await (await connection).pauseTorrents(_torrents)
      } catch (err) {
        return `something went wrong:${err}`
      }
  }

  async pause_all() {
    try {
      return await (await connection).pauseTorrents('all')
      } catch (err) {
        return `something went wrong:${err}`
      }
  }

  async resume_torrents(torrents) {
    let _torrents = ''
    torrents.forEach((el) => {
      _torrents += `${el}|`
    })
    console.log(_torrents)
    try {
      return await (await connection).resumeTorrents(_torrents)
      } catch (err) {
        return `something went wrong:${err}`
      }
  }

  async resume_all() {
    try {
      return await (await connection).resumeTorrents('all')
      } catch (err) {
        return `something went wrong:${err}`
      }
  }

  async remove_torrents(torrents) {
    let _torrents = ''
    torrents.forEach((el) => {
      _torrents += `${el}|`
    })
    console.log(_torrents)
    try {
      return await (await connection).deleteTorrents(_torrents, 'true')
      } catch (err) {
        return `something went wrong:${err}`
      }
  }

  async add(torrent) {
    return new Promise((resolve, reject) => {
      connection.add(torrent.path, null, null, (err, res) => {
        resolve(res)
        reject(err)
      })
    })
  }
}

const qbit = new Qbit()

module.exports = qbit
