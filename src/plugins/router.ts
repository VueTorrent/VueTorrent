import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/pages'


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
