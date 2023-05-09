import { i18n } from '@/plugins/i18n'
import type { StoreState } from '@/types/vuetorrent'
import {formatSize} from '@/filters'

export default {
  getAppVersion: (state: StoreState) => () => state.version,
  containsTorrent: (state: StoreState) => (hash: string) => state.selected_torrents.includes(hash),
  isDarkMode: (state: StoreState) => () => state.webuiSettings.darkTheme,
  getTheme: (state: StoreState) => () => state.webuiSettings.darkTheme ? 'dark' : 'light',
  getModalState: (state: StoreState) => (guid: string) => state.modals.filter(m => m.guid === guid)[0],
  getSettings: (state: StoreState) => () => state.settings,
  getStatus: (state: StoreState) => () => state.status,
  getTorrent: (state: StoreState) => (hash: string) => state.torrents.filter(el => el.hash === hash)[0],
  getWebuiSettings: (state: StoreState) => () => state.webuiSettings,
  getAvailableTags: (state: StoreState) => () => state.tags,
  getCategories: (state: StoreState) => () => state.categories,
  getFeeds: (state: StoreState) => () => state.rss.feeds,
  getRules: (state: StoreState) => () => state.rss.rules,
  getModals: (state: StoreState) => () => state.modals,
  getTorrents: (state: StoreState) => () => state.torrents,
  getTrackers: (state: StoreState) => () => state.trackers,
  getAuthenticated: (state: StoreState) => () => state.authenticated,
  getTorrentCountString: (state: StoreState) => () => {
    if (state.selected_torrents.length) {
      let selectedSize = state.selected_torrents.map(hash => state.torrents.filter(el => el.hash === hash)[0])
          .map(torrent => torrent.size)
          .reduce((partialSum, newVal) => partialSum + newVal)

      return i18n.tc('dashboard.selectedTorrentsCount', state.filteredTorrentsCount)
        .replace('$0', state.selected_torrents.length.toString())
        .replace('$1', formatSize(selectedSize))
    } else {
      return i18n.tc('dashboard.torrentsCount', state.filteredTorrentsCount)
    }
  },
  getSearchPlugins: (state: StoreState) => () => state.searchPlugins
}
