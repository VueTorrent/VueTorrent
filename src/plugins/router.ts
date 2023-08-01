import {createRouter, createWebHashHistory} from 'vue-router'

import {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'dashboard',
    path: '/',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('@/pages/Settings.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      public: true // Allow access even if not logged in
    },
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})