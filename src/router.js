import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Settings from './views/Settings.vue'
import TorrentDetail from './views/TorrentDetail'
import MagnetHandler from './views/MagnetHandler'
import { isAuthenticated } from './services/auth.js'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/torrent/:hash',
      name: 'torrentDetail',
      component: TorrentDetail
    },
    { path: '/download=:magnet',
      name: 'MagnetHandler',
      component: MagnetHandler,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        public: true // Allow access to even if not logged in      }
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const authenticated = isAuthenticated()

  if (!isPublic && !authenticated) {
    return next({
      path: '/login',
      // Store the full path to redirect the user to after login
      query: { redirect: to.fullPath }
    })
  }

  next()
})

export default router
