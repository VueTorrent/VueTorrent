import Torrent from '../models/torrent'
import Status from '../models/Status'
import qbit from '../services/qbit'
import { getHostName } from '../helpers'

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

    // torrent speed in title
    if (state.webuiSettings.showSpeedInTitle) {
      // eslint-disable-next-line max-len
      document.title = `[D: ${state.status.dlspeed}/s, U: ${state.status.upspeed}/s] VueTorrent`
    }

    // torrents
    state.torrents = []
    for (const [key, value] of Object.entries(data)) {
      state.torrents.push(new Torrent({ hash: key, ...value }))
    }
  },
  FETCH_SETTINGS: async state => {
    const { data } = await qbit.getAppPreferences()
    state.settings = data
  },
  UPDATE_SORT_OPTIONS: (state, payload) => {
    state.sort_options.sort = payload.name ? payload.name : state.sort_options.sort
    state.sort_options.reverse = payload.reverse ? payload.reverse : state.sort_options.reverse
    state.sort_options.hashes = payload.hashes ? payload.hashes : state.sort_options.hashes
    state.sort_options.filter = payload.filter ? payload.filter : state.sort_options.filter
    state.sort_options.category =
            payload.category !== null ? payload.category : null
    state.sort_options.tracker =
            payload.tracker !== null ? payload.tracker : null
  },
  FETCH_CATEGORIES: async state => state.categories = await qbit.getCategories(),
  FETCH_SEARCH_PLUGINS: async state => state.searchPlugins = await qbit.getSearchPlugins(),
  SET_CURRENT_ITEM_COUNT: (state, count) => (state.filteredTorrentsCount = count)
}
