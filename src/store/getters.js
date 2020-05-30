export default {
    containsTorrent: state => hash => state.selected_torrents.includes(hash),
    getTheme: state => () => state.webuiSettings.darkTheme,
    getModalState: state => name => state.modals[name.toLowerCase()],
    getSettings: state => () => state.settings,
    getStatus: state => () => state.status,
    getTorrent: state => hash =>
        state.torrents.filter(el => el.hash === hash)[0],
    getWebuiSettings: state => () => state.webuiSettings
}
