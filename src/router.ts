import Vue from 'vue'
import Router from 'vue-router'
import { getBaseURL } from './helpers.js'

Vue.use(Router)

const router = new Router({
  base: getBaseURL(),
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    },
    {
      path: '/rss',
      name: 'rss',
      component: () => import('./views/RssArticles.vue')
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => import('./views/Logs.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/SearchEngine.vue')
    },
    {
      path: '/torrent/:hash',
      name: 'torrentDetail',
      component: () => import('./views/TorrentDetail.vue')
    },
    {
      path: '/download=:magnet',
      name: 'MagnetHandler',
      component: () => import('./views/MagnetHandler.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        public: true // Allow access to even if not logged in      }
      }
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const authenticated = router.app.$store.state.authenticated

  if (!isPublic && !authenticated) {
    return next({
      name: 'login',
      // Store the full path to redirect the user to after login
      query: { redirect: to.fullPath }
    })
  }

  next()
})

export default router
