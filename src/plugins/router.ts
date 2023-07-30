import { createRouter, createWebHashHistory } from 'vue-router'

import { RouteRecordRaw } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import Settings from '@/pages/Settings.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})