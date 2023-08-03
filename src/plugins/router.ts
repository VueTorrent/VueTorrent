import {createRouter, createWebHashHistory} from 'vue-router'
import {routes} from '@/pages'

import {useAuthStore} from '@/stores'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeResolve((to, _, next) => {
  const {isAuthenticated} = useAuthStore()
  const isPublic = to.matched.some(record => record.meta.public)

  if (!isPublic && !isAuthenticated) {
    return next({name: 'login', query: {redirect: to.fullPath}})
  }

  return next()
})

export default router