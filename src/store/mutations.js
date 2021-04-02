import Torrent from '../models/Torrent'
import Status from '../models/Status'
import qbit from '../services/qbit'
import { getHostName } from '@/helpers'
import { DocumentTitle } from '@/actions'

export default {
  SET_APP_VERSION(state, version) {
    state.version = version
  },
  REMOVE_INTERVALS: state => {
    state.intervals.forEach(el => clearInterval(el))
  },
  ADD_MODAL(state, modal) {
    state.modals.push(modal)
  },
  DELETE_MODAL(state, guid) {
    state.modals = state.modals.filter(m => m.guid !== guid)
  },
  SET_SELECTED: (state, { type, hash, index }) => {
    if (type === 'add') {
      state.selected_torrents.push(hash)
      state.latestSelectedTorrent = state.torrents.map(t => t.hash).indexOf(hash)
    } else if (type === 'remove') {
      state.selected_torrents.splice(
        state.selected_torrents.indexOf(hash),
        1
      )
    } else if (type === 'until') {
      let from
      let until
      if (state.latestSelectedTorrent > index) {
        from = index
        until = state.latestSelectedTorrent + 1 // include latest selected
      } else {
        from = state.latestSelectedTorrent
        until = index + 1
      }
      state.selected_torrents = state.torrents.map(t => t.hash).slice(from, until)
    }
  },
  RESET_SELECTED: state => {
    state.selected_torrents = []
  },
  TOGGLE_THEME(state) {
    state.webuiSettings.darkTheme = !state.webuiSettings.darkTheme
  },
  async TOGGLE_ALARM(state) {
    state.webuiSettings.alarm = !state.webuiSettings.alarm
  },
  LOGOUT: state => {
    qbit.logout()
    state.authenticated = false
  },
  LOGIN: async (state, payload) => {
    state.authenticated = payload
  },
  updateMainData: async state => {
    const rid = state.rid ? state.rid : undefined
    const res = await qbit.getMainData(rid)

    // status
    state.status = new Status(res.data.server_state, res.data.tags)

    // graph
    state.download_data.splice(0, 1)
    state.download_data.push(state.status.dlspeedRaw)
    state.upload_data.splice(0, 1)
    state.upload_data.push(state.status.upspeedRaw)

    // torrents
    let { data } = await qbit.getTorrents(state.sort_options)

    // trackers
    if (state.webuiSettings.showTrackerFilter) { // dont calculate trackers when disabled
      state.trackers = data.map(t => t.tracker)
        .map(url => getHostName(url))
        .filter((domain, index, self) => index === self.indexOf(domain) && domain)
        .sort()

      if (state.sort_options.tracker !== null) {
        data = data.filter(d => getHostName(d.tracker) === state.sort_options.tracker)
      }
    }

    // torrents
    const lastTorrents = state.torrents
    state.torrents = data.map(t => new Torrent(t))var str = '', str2 = '', donenum = 0
    for (var i = 0; i < lastTorrents.length; i++) {
      if (lastTorrents[i].progress != 100) {
        for (var j = 0; j < state.torrents.length; j++) {
          if (lastTorrents[i].hash == state.torrents[j].hash) {
            if (state.torrents[j].progress == 100) {
              console.log('done: ' + state.torrents[j].name)
              str += state.torrents[j].name + '\n'
              if (str2.length <= 0) {
                str2 = state.torrents[j].name
              }
              donenum++
              j = state.torrents.length
            }
          }
        }
      }
    }
    if (str.length > 0) {
      if (state.webuiSettings.alarm) {
        (async function () {
          try {
            if (typeof Notification === 'undefined') {
              console.log('notification is undefined')
            } else {
              if (Notification.permission == 'granted') {
                console.log('notification success')
                const reg = await navigator.serviceWorker.getRegistration()
                const options = {
                  body: str2 + '\n' + donenum + 'torrent(s) done.',
                  icon: './img/icons/android-chrome-192x192.png',
                  vibrate: [100, 50, 100],
                  data: { dateOfArrival: Date.now(), primaryKey: 1 }
                }
                reg.showNotification('torrent downloaded', options)
              }
            }
          } catch (e) {
            console.log('notification error: ' + e)
          }
        })()
      }
      // toast here
    }

    // update document title
    DocumentTitle.updateTitle(
      state.webuiSettings.title,
      [state.status.dlspeed, state.status.upspeed],
      state.torrents ? state.torrents[0] : null
    )
  },
  FETCH_SETTINGS: async state => {
    const { data } = await qbit.getAppPreferences()
    state.settings = data
  },
  UPDATE_SORT_OPTIONS: (state, {
    hashes = [],
    filter = null,
    category = null,
    tracker = null
  }) => {
    state.sort_options.hashes = hashes
    state.sort_options.filter = filter
    state.sort_options.category = category
    state.sort_options.tracker = tracker
  },
  FETCH_CATEGORIES: async state => state.categories = Object.values(await (qbit.getCategories())),
  FETCH_SEARCH_PLUGINS: async state => state.searchPlugins = await qbit.getSearchPlugins(),
  SET_CURRENT_ITEM_COUNT: (state, count) => (state.filteredTorrentsCount = count)
}
