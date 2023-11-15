import { RouteRecordRaw } from 'vue-router'

// if auth is disabled all routes are public
const isPublic = import.meta.env.VITE_DISABLE_AUTH === 'true'

export const routes: RouteRecordRaw[] = [
  {
    name: 'dashboard',
    path: '/',
    component: () => import('./Dashboard.vue'),
    meta: {
      public: isPublic
    }
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('./Settings.vue'),
    meta: {
      public: isPublic
    }
  },
  {
    name: 'rssArticles',
    path: '/rss',
    component: () => import('./RssArticles.vue'),
    meta: {
      public: isPublic
    }
  },
  {
    name: 'logs',
    path: '/logs',
    component: () => import('./Logs.vue'),
    meta: {
      public: isPublic
    }
  },
  {
    name: 'searchEngine',
    path: '/search',
    component: () => import('./SearchEngine.vue'),
    meta: {
      public: isPublic
    }
  },
  {
    name: 'torrentDetail',
    path: '/torrent/:hash',
    component: () => import('./TorrentDetail.vue'),
    meta: {
      public: isPublic
    }
  },
  {
    name: 'magnetHandler',
    path: '/magnet/:url',
    component: () => import('./MagnetHandler.vue'),
    meta: {
      public: true
    }
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
