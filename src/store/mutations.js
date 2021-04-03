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
  LOGOUT: state => {
    qbit.logout()
    state.authenticated = false
  },
  LOGIN: async (state, payload) => {
    state.authenticated = payload
  },
  updateMainData: async state => {
    const res = await qbit.getMainData(state.rid ? state.rid : undefined)
    state.rid = res.data.rid ? res.data.rid : undefined

    // status
    const newStatus = new Status(res.data.server_state)
    var prop
    if (res.data.tags_removed !== undefined) {
      for (prop = 0; prop < res.data.tags_removed.length; prop++) {
        const i = state.status.tags.indexOf(res.data.tags_removed[prop])
        if (i > -1)
          state.status.tags.splice(i, 1)
      }
    }
    if (res.data.tags !== undefined) {
      state.status.tags = state.status.tags == '' ? res.data.tags : state.status.tags.concat(res.data.tags)
    }
    if (newStatus !== undefined) {
      for (prop in state.status) {
        if (newStatus[prop]) {
          state.status[prop] = newStatus[prop]
        } else {
          switch (prop) {
            case 'dlspeed': case 'dlspeedRaw':
            case 'upspeed': case 'upspeedRaw':
              state.status[prop] = 0
              break
            default:
              break
          }
        }
      }
    }

    // graph
    state.download_data.shift()
    state.download_data.push(state.status.dlspeedRaw)
    state.upload_data.shift()
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
    state.torrents = data.map(t => new Torrent(t))

    // notification
    if (res.data.torrents !== undefined) {
      
      var donePattern = []
      for (prop in res.data.torrents)
        if (res.data.torrents[prop].progress === 1)
          donePattern.push(prop)

      if (donePattern.length > 0) {
        var descNoti = '', doneNum = 0
        for (prop in lastTorrents) {
          if (lastTorrents[prop].progress != 100) {
            if (donePattern.indexOf(lastTorrents[prop].hash) > -1) {
              console.log('done: ' + state.torrents[prop].name)
              descNoti += state.torrents[prop].name + '\n'
              doneNum++
            }
          }
        }

        if (descNoti.length > 0) {
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
                      body: (descNoti.split('\n'))[0] + '\n... ' + doneNum + 'torrents done',
                      icon: './img/icons/android-chrome-192x192.png',
                      vibrate: [100, 50, 100],
                      data: { dateOfArrival: Date.now(), primaryKey: 1 }
                    }
                    reg.showNotification('torrents download finished', options)
                  }
                }
              } catch (e) {
                console.log('notification error: ' + e)
              }
            })()
          }
          //toast here... descNoti is show all the downloaded
          //
          //
        }
      }
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
