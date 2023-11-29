import { routes } from '@/pages'
import { useAuthStore } from '@/stores'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
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
