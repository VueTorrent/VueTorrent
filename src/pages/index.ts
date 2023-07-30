import { RouteRecordRaw } from 'vue-router'
import Dashboard from './Dashboard.vue'
import Settings from './Settings.vue'

export const routes: RouteRecordRaw[] = [
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
