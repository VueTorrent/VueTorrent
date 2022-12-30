import qbit from '../services/qbit'
import { DocumentTitle, Tags, Trackers, Torrents, Graph, ServerStatus } from '@/actions'
import { setLanguage } from '@/plugins/i18n'

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
      state.selected_torrents.splice(state.selected_torrents.indexOf(hash), 1)
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
  LOGOUT: async state => {
    await qbit.logout()
    state.authenticated = false
  },
  LOGIN: async (state, payload) => {
    state.authenticated = payload
  },
  updateMainData: async state => {
    const response = await qbit.getMainData(state.rid || undefined)
    state.rid = response.rid || undefined

    ServerStatus.update(response)
    Tags.update(response)
    Graph.update()

    // fetch torrent data
    const { data } = await qbit.getTorrents(state.sort_options)

    Trackers.update(data)
    Torrents.update(data)
    DocumentTitle.update()
  },
  FETCH_SETTINGS: async (state, settings) => {
    state.settings = settings
  },
  UPDATE_SORT_OPTIONS: (state, { hashes = [], filter = null, category = null, tag = null, tracker = null }) => {
    state.sort_options.hashes = hashes
    state.sort_options.filter = filter
    state.sort_options.category = category
    state.sort_options.tag = tag
    state.sort_options.tracker = tracker
  },
  FETCH_CATEGORIES: async state => (state.categories = Object.values(await qbit.getCategories())),
  FETCH_TAGS: async state => (state.tags = await qbit.getAvailableTags()),
  FETCH_FEEDS: async state => (state.rss.feeds = await qbit.getFeeds()),
  FETCH_RULES: async state => (state.rss.rules = await qbit.getRules()),
  FETCH_SEARCH_PLUGINS: async state => (state.searchPlugins = await qbit.getSearchPlugins()),
  SET_CURRENT_ITEM_COUNT: (state, count) => (state.filteredTorrentsCount = count),
  SET_LANGUAGE: async state => setLanguage(state.webuiSettings.lang)
}
