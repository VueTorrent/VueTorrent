import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/pages'

import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory('import.meta.env.VITE_PACKAGE_VERSION'),
  routes
})

router.beforeResolve((to, _, next) => {
  const { isAuthenticated } = useAuthStore()
  const isPublic = to.meta.public === true

  if (!isPublic && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: location.hash.slice(1) } })
  }

  return next()
})

export default router
