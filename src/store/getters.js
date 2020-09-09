export default {
    containsTorrent: state => hash => state.selected_torrents.includes(hash),
    getTheme: state => () => state.webuiSettings.darkTheme,
    getModalState: state => guid =>
        state.modals.filter(m => m.guid === guid)[0],
    getSettings: state => () => state.settings,
    getStatus: state => () => state.status,
    getTorrent: state => hash =>
        state.torrents.filter(el => el.hash === hash)[0],
    getWebuiSettings: state => () => state.webuiSettings,
    getAvailableTags: state => () => state.status.tags,
    getSelectedCategory: state => () => state.selectedCategory,
    getModals: state => () => state.modals
}
