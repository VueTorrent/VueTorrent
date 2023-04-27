import { i18n } from '@/plugins/i18n'
import type { StoreState } from '@/types/vuetorrent'

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
    if (state.selected_torrents && state.selected_torrents.length) {
      if (i18n.locale === 'zh-hans' || i18n.locale === 'zh-hant') {
        return `${i18n.tc('navbar.torrentsCount', state.filteredTorrentsCount)}${i18n.t('of')} ${state.selected_torrents.length}`
      } else {
        return `${state.selected_torrents.length} ${i18n.t('of')} ${i18n.tc('navbar.torrentsCount', state.filteredTorrentsCount)}`
      }
    }
    return i18n.tc('navbar.torrentsCount', state.filteredTorrentsCount)
  },
  getSearchPlugins: (state: StoreState) => () => state.searchPlugins
}
