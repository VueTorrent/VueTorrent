export default {
  getAppVersion: state => () => state.version,
  containsTorrent: state => hash => state.selected_torrents.includes(hash),
  getTheme: state => () => state.webuiSettings.darkTheme,
  getModalState: state => guid => state.modals.filter(m => m.guid === guid)[0],
  getSettings: state => () => state.settings,
  getStatus: state => () => state.status,
  getTorrent: state => hash => state.torrents.filter(el => el.hash === hash)[0],
  getWebuiSettings: state => () => state.webuiSettings,
  getAvailableTags: state => () => state.tags,
  getCategories: state => () => state.categories,
  getFeeds: state => () => state.rss.feeds,
  getRules: state => () => state.rss.rules,
  getModals: state => () => state.modals,
  getTorrents: state => () => state.torrents,
  getTrackers: state => () => state.trackers,
  getAuthenticated: state => () => state.authenticated,
  getTorrentCountString: state => () => {
    if (state.selected_torrents && state.selected_torrents.length) {
      return `${state.selected_torrents.length} of ${state.filteredTorrentsCount} torrents`
    }

    return `${state.filteredTorrentsCount} torrents`
  },
  getSearchPlugins: state => () => state.searchPlugins
}
