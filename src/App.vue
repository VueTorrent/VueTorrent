<script setup lang="ts">
import AddPanel from '@/components/AddPanel.vue'
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { computed, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  useAppStore,
  useAuthStore,
  useLogStore,
  useMaindataStore,
  usePreferenceStore,
  useVueTorrentStore
} from '@/stores'

import Navbar from '@/components/Navbar/Navbar.vue'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()
const appStore = useAppStore()
const logStore = useLogStore()
const maindataStore = useMaindataStore()
const preferencesStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()

const onLoginPage = computed(() => router.currentRoute.value.name === 'login')

const checkAuthentication = async () => {
  await authStore.updateAuthStatus()

  if (!authStore.isAuthenticated && !onLoginPage.value) {
    await vuetorrentStore.redirectToLogin()
  } else {
    redirectOnSuccess()
  }
}

const blockContextMenu = () => {
  document.addEventListener('contextmenu', event => {
    if (!event.target) return

    const targetNode = event.target as Element
    const nodeName = targetNode.nodeName.toLowerCase()
    const nodeType = targetNode.getAttribute('type')?.toLowerCase() ?? ''

    if (['textarea', 'a', 'img'].includes(nodeName)) return
    if (nodeName === 'input' && ['text', 'password', 'email', 'number'].includes(nodeType)) return

    event.preventDefault()
    return false
  })
}

const redirectOnSuccess = () => {
  const redirectUrl = route.query.redirect as string | undefined
  if (redirectUrl) router.push(redirectUrl)
  else if (onLoginPage.value) router.push({ name: 'dashboard' })
}

onBeforeMount(() => {
  if (vuetorrentStore.matchSystemTheme) {
    vuetorrentStore.updateSystemTheme()
  } else {
    vuetorrentStore.updateTheme()
  }
  vuetorrentStore.setLanguage(vuetorrentStore.language)
  checkAuthentication()
  blockContextMenu()
})

watch(
  () => authStore.isAuthenticated,
  async isAuthenticated => {
    if (isAuthenticated) {
      appStore.pushInterval(() => maindataStore.updateMaindata(), vuetorrentStore.refreshInterval)
      await maindataStore.updateMaindata()
      await preferencesStore.fetchPreferences()
      await logStore.fetchLogs()
    } else {
      appStore.clearIntervals()
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <v-app class="text-noselect">
    <Navbar v-if="authStore.isAuthenticated" />
    <v-main>
      <router-view />
    </v-main>
    <AddPanel />
    <AddTorrentDialog />
  </v-app>
</template>

<style scoped></style>
