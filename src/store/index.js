import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const vuexPersist = new VuexPersist({
  key: 'vuetorrent',
  storage: window.localStorage,
  reducer: state => ({
    sort_options: state.sort_options,
    webuiSettings: state.webuiSettings,
    authenticated: state.authenticated
  })
})

Vue.use(Vuex)

const propertiesTemplate = [
  { name: 'Size', active: true },
  { name: 'Progress', active: true },
  { name: 'Download', active: true },
  { name: 'Upload', active: true },
  { name: 'Downloaded', active: true },
  { name: 'Directory', active: false },
  { name: 'Uploaded', active: true },
  { name: 'ETA', active: true },
  { name: 'Peers', active: true },
  { name: 'Seeds', active: true },
  { name: 'Status', active: true },
  { name: 'Ratio', active: true },
  { name: 'Category', active: true },
  { name: 'Tags', active: true },
  { name: 'AddedOn', active: true },
  { name: 'Availability', active: true },
  { name: 'LastActivity', active: false },
  { name: 'CompletedOn', active: false },
  { name: 'GlobalSpeed', active: false },
  { name: 'GlobalVolume', active: false }
]

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    version: 0,
    intervals: [],
    rss: {
      feeds: [],
      rules: []
    },
    status: {
      status: '',
      downloaded: '',
      uploaded: '',
      dlspeed: '',
      upspeed: '',
      freeDiskSpace: '',
      altSpeed: '',
      dlspeedRaw: '',
      upspeedRaw: '',
      tags: ''
    },
    upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    torrents: [],
    selected_torrents: [],
    authenticated: false,
    sort_options: {
      isCustomSortEnabled: false,
      sort: 'priority',
      reverse: false,
      hashes: [],
      filter: null,
      category: null,
      tag: null,
      tracker: null
    },
    rid: 0,
    pasteUrl: null,
    modals: [],
    settings: {},
    webuiSettings: {
      lang: 'en',
      darkTheme: false,
      showFreeSpace: true,
      showSpeedGraph: true,
      showSessionStat: true,
      showAlltimeStat: true,
      showCurrentSpeed: true,
      showTrackerFilter: false,
      showSpeedInTitle: false,
      deleteWithFiles: false,
      title: 'Default',
      rightDrawer: false,
      topPagination: false,
      paginationSize: 15,
      dateFormat: 'DD/MM/YYYY, HH:mm:ss',
      openSideBarOnStart: true,
      busyTorrentProperties: JSON.parse(JSON.stringify(propertiesTemplate)),
      doneTorrentProperties: JSON.parse(JSON.stringify(propertiesTemplate))
    },
    categories: [],
    trackers: [],
    tags: [],
    filteredTorrentsCount: 0,
    latestSelectedTorrent: null,
    selectMode: false,
    searchPlugins: [],
    dashboard: {
      currentPage: 1,
      searchFilter: ''
    }
  },
  actions: {
    ...actions
  },
  getters: {
    ...getters
  },
  mutations: {
    ...mutations
  }
})
