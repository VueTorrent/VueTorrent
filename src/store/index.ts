import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import type { StoreState, PersistentStoreState } from '@/types/vuetorrent'
import { Status } from '@/models'
import { TitleOptions, DashboardProperty } from '@/enums/vuetorrent'
import { AppPreferences } from '@/types/qbit/models'

const vuexPersist = new VuexPersist<PersistentStoreState>({
  key: 'vuetorrent',
  storage: window.localStorage,
  reducer: state => ({
    sort_options: state.sort_options,
    webuiSettings: state.webuiSettings,
    authenticated: state.authenticated
  })
})

Vue.use(Vuex)

// noinspection DuplicatedCode
const desktopPropertiesTemplate = [
  { name: DashboardProperty.SIZE, active: true },
  { name: DashboardProperty.PROGRESS, active: true },
  { name: DashboardProperty.DOWNLOAD, active: true },
  { name: DashboardProperty.UPLOAD, active: true },
  { name: DashboardProperty.DOWNLOADED, active: true },
  { name: DashboardProperty.DIRECTORY, active: false },
  { name: DashboardProperty.UPLOADED, active: true },
  { name: DashboardProperty.ETA, active: true },
  { name: DashboardProperty.PEERS, active: true },
  { name: DashboardProperty.SEEDS, active: true },
  { name: DashboardProperty.STATUS, active: true },
  { name: DashboardProperty.RATIO, active: true },
  { name: DashboardProperty.TRACKER, active: false },
  { name: DashboardProperty.CATEGORY, active: true },
  { name: DashboardProperty.TAGS, active: true },
  { name: DashboardProperty.ADDED_ON, active: true },
  { name: DashboardProperty.AVAILABILITY, active: true },
  { name: DashboardProperty.LAST_ACTIVITY, active: false },
  { name: DashboardProperty.COMPLETED_ON, active: false },
  { name: DashboardProperty.GLOBAL_SPEED, active: false },
  { name: DashboardProperty.GLOBAL_VOLUME, active: false }
]

const mobilePropertiesTemplate = [
  { name: DashboardProperty.STATUS, active: true },
  { name: DashboardProperty.TRACKER, active: true },
  { name: DashboardProperty.CATEGORY, active: true },
  { name: DashboardProperty.TAGS, active: true },
  { name: DashboardProperty.SIZE, active: true },
  { name: DashboardProperty.PROGRESS, active: true },
  { name: DashboardProperty.RATIO, active: true },
  { name: DashboardProperty.UPLOADED, active: true },
  { name: DashboardProperty.ETA, active: true },
  { name: DashboardProperty.SEEDS, active: true },
  { name: DashboardProperty.PEERS, active: true },
  { name: DashboardProperty.DOWNLOAD, active: true },
  { name: DashboardProperty.UPLOAD, active: true }
]

export default new Vuex.Store<StoreState>({
  plugins: [vuexPersist.plugin],
  state: {
    authenticated: false,
    categories: [],
    dashboard: {
      currentPage: 1,
      searchFilter: ''
    },
    download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    filteredTorrentsCount: 0,
    intervals: [],
    latestSelectedTorrent: -1,
    modals: [],
    rid: 0,
    rss: {
      feeds: [],
      rules: []
    },
    searchPlugins: [],
    selectMode: false,
    selected_torrents: [],
    settings: {} as AppPreferences,
    sort_options: {
      isCustomSortEnabled: false,
      sort: 'priority',
      reverse: false,
      filter: null,
      category: null,
      tag: null,
      tracker: null
    },
    status: {} as Status,
    tags: [],
    torrents: [],
    trackers: [],
    upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    version: '',
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
      title: TitleOptions.DEFAULT,
      rightDrawer: false,
      topPagination: false,
      paginationSize: 15,
      dateFormat: 'DD/MM/YYYY, HH:mm:ss',
      openSideBarOnStart: true,
      showShutdownButton: true,
      busyDesktopTorrentProperties: JSON.parse(JSON.stringify(desktopPropertiesTemplate)),
      doneDesktopTorrentProperties: JSON.parse(JSON.stringify(desktopPropertiesTemplate)),
      busyMobileCardProperties: JSON.parse(JSON.stringify(mobilePropertiesTemplate)),
      doneMobileCardProperties: JSON.parse(JSON.stringify(mobilePropertiesTemplate))
    }
  },
  // @ts-expect-error
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
