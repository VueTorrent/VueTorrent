import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'dashboard',
    path: '/',
    component: () => import('./Dashboard.vue')
  },
  {
    name: 'settings',
    path: '/settings/:tab?/:subtab?',
    component: () => import('./Settings.vue')
  },
  {
    name: 'rssArticles',
    path: '/rss',
    component: () => import('./RssArticles.vue')
  },
  {
    name: 'logs',
    path: '/logs',
    component: () => import('./Logs.vue')
  },
  {
    name: 'searchEngine',
    path: '/search',
    component: () => import('./SearchEngine.vue')
  },
  {
    name: 'torrentDetail',
    path: '/torrent/:hash/:tab?',
    component: () => import('./TorrentDetail.vue')
  },
  {
    name: 'magnetHandler',
    path: '/magnet/:url',
    component: () => import('./MagnetHandler.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('./Login.vue'),
    meta: {
      public: true // Allow access even if not logged in
    }
  }
]
