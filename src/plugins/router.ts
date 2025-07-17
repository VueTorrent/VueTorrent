import { storeToRefs } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/pages'
import { useAppStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.beforeResolve((to, _, next) => {
  const { isAuthenticated } = storeToRefs(useAppStore())
  const isPublic = to.meta.public === true

  if (!isPublic && !isAuthenticated.value) {
    return next({ name: 'login', query: { redirect: location.hash.slice(1) } })
  }

  return next()
})

export default router
