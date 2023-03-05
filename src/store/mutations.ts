import qbit from '../services/qbit'
import { DocumentTitle, Tags, Trackers, Torrents, Graph } from '@/actions'
import { setLanguage } from '@/plugins/i18n'
import type { ModalTemplate, StoreState } from '@/types/vuetorrent'
import Torrent from '@/models/Torrent'
import type { AppPreferences } from '@/types/qbit/models'
import { Status } from '@/models'
import router from '@/router'

export default {
  SET_APP_VERSION(state: StoreState, version: string) {
    state.version = version
  },
  REMOVE_INTERVALS: (state: StoreState) => {
    state.intervals.forEach(el => clearInterval(el))
  },
  ADD_MODAL(state: StoreState, modal: ModalTemplate) {
    state.modals.push(modal)
  },
  DELETE_MODAL(state: StoreState, guid: string) {
    state.modals = state.modals.filter(m => m.guid !== guid)
  },
  SET_SELECTED: (state: StoreState, data: { type: string; hash: string; index: number }) => {
    const { type, hash, index } = data
    if (type === 'add') {
      state.selected_torrents.push(hash)
      state.latestSelectedTorrent = state.torrents.map(t => t.hash).indexOf(hash)
    } else if (type === 'remove') {
      state.selected_torrents.splice(state.selected_torrents.indexOf(hash), 1)
    } else if (type === 'until') {
      let from, until
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
  RESET_SELECTED: (state: StoreState) => {
    state.selected_torrents = []
  },
  TOGGLE_THEME(state: StoreState) {
    state.webuiSettings.darkTheme = !state.webuiSettings.darkTheme
  },
  LOGOUT: async (state: StoreState) => {
    await qbit.logout()
    state.authenticated = false
  },
  LOGIN: async (state: StoreState, payload: boolean) => {
    state.authenticated = payload
  },
  updateMainData: async (state: StoreState) => {
    try {
      const response = await qbit.getMainData(state.rid || undefined)
      state.rid = response.rid || undefined

      state.status = new Status(response.server_state)
      Tags.update(response)
      Graph.shiftValues()

      // fetch torrent data
      state.sort_options.isCustomSortEnabled = Torrent.computedValues.indexOf(state.sort_options.sort) !== -1
      const data = await qbit.getTorrents(state.sort_options)

      Trackers.update(data)
      Torrents.update(data)
      DocumentTitle.update()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        console.error('No longer authtenticated, logging out...')
        state.authenticated = false
        router.push({ name: 'login' })
      }
    }
  },
  FETCH_SETTINGS: async (state: StoreState, settings: AppPreferences) => {
    state.settings = settings
  },
  UPDATE_SORT_OPTIONS: (state: StoreState, { filter = null, category = null, tag = null, tracker = null }) => {
    state.sort_options.filter = filter
    state.sort_options.category = category
    state.sort_options.tag = tag
    state.sort_options.tracker = tracker
  },
  FETCH_CATEGORIES: async (state: StoreState) => (state.categories = Object.values(await qbit.getCategories())),
  FETCH_TAGS: async (state: StoreState) => (state.tags = await qbit.getAvailableTags()),
  FETCH_FEEDS: async (state: StoreState) => (state.rss.feeds = Object.entries(await qbit.getFeeds(true)).map(([key, value]) => ({ name: key, ...value }))),
  FETCH_RULES: async (state: StoreState) => (state.rss.rules = Object.entries(await qbit.getRules()).map(([key, value]) => ({ name: key, ...value }))),
  FETCH_SEARCH_PLUGINS: async (state: StoreState) => (state.searchPlugins = await qbit.getSearchPlugins()),
  SET_CURRENT_ITEM_COUNT: (state: StoreState, count: number) => (state.filteredTorrentsCount = count),
  SET_LANGUAGE: async (state: StoreState) => setLanguage(state.webuiSettings.lang)
}
