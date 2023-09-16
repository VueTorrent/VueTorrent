import { RouteRecordRaw } from 'vue-router'
import Dashboard from './Dashboard.vue'
import Settings from './Settings.vue'
import RssArticles from './RssArticles.vue'
import Logs from './Logs.vue'
import SearchEngine from './SearchEngine.vue'
import TorrentDetail from './TorrentDetail.vue'
import Login from './Login.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings
  },
  {
    name: 'rssArticles',
    path: '/rss',
    component: RssArticles
  },
  {
    name: 'logs',
    path: '/logs',
    component: Logs
  },
  {
    name: 'searchEngine',
    path: '/search',
    component: SearchEngine
  },
  {
    name: 'torrentDetail',
    path: '/torrent/:hash',
    component: TorrentDetail
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      public: true // Allow access even if not logged in
    }
  }
]
