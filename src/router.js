import Vue from 'vue'
import Router from 'vue-router'
import { isAuthenticated } from './services/auth.js'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
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
      path: '/torrent/:hash',
      name: 'torrentDetail',
      component: () => import('./views/TorrentDetail.vue')
    },
    { path: '/download=:magnet',
      name: 'MagnetHandler',
      component: () => import('./views/MagnetHandler.vue'),
      props: true
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
