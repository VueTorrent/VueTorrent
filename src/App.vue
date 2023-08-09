<script setup lang="ts">
import {computed, onBeforeMount, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import { useAppStore, useAuthStore, useMaindataStore, usePreferenceStore, useVueTorrentStore } from '@/stores'

import Navbar from '@/components/Navbar/Navbar.vue'


const router = useRouter()
const route = useRoute()

const appStore = useAppStore()
const authStore = useAuthStore()
const maindataStore = useMaindataStore()
const preferencesStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()

const onLoginPage = computed(() => router.currentRoute.value.name === 'login')

const checkAuthentication = async () => {
  await authStore.updateAuthStatus()

  if (authStore.isAuthenticated && onLoginPage.value) {
    redirectOnSuccess()
  }
  else if (!onLoginPage.value) {
    await vuetorrentStore.redirectToLogin()
  }
}

const blockContextMenu = () => {
  document.addEventListener('contextmenu', (event) => {
    if (!event.target) return

    const targetNode = event.target as Element
    const nodeName = targetNode.nodeName.toLowerCase()
    const nodeType = targetNode.getAttribute('type')?.toLowerCase() ?? ''

    if (['textarea', 'a'].includes(nodeName)) return
    if (nodeName === 'input' && ['text', 'password', 'email', 'number'].includes(nodeType)) return

    event.preventDefault()
    return false
  })
}

const redirectOnSuccess = () => {
  const redirectUrl = route.query.redirect as string | undefined
  if (redirectUrl) router.push(redirectUrl)
  else router.push({ name: 'dashboard' })
}

onBeforeMount(() => {
  vuetorrentStore.updateTheme()
  vuetorrentStore.setLanguage(vuetorrentStore.language)
  checkAuthentication()
  blockContextMenu()
})

watch(
  () => authStore.isAuthenticated,
  async (isAuthenticated) => {
    if (isAuthenticated) {
      appStore.pushInterval(() => maindataStore.updateMainData(), vuetorrentStore.refreshInterval)
      await maindataStore.updateMainData()
      await preferencesStore.fetchPreferences()
    }
    else {
      appStore.clearIntervals()
    }
  }
)
</script>

<template>
  <v-layout>
    <Navbar v-if="authStore.isAuthenticated" />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>
