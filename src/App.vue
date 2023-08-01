<script setup lang="ts">
import {computed, onBeforeMount, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useTheme } from 'vuetify'

import {useAppStore, useModalStore, usePreferenceStore, useVueTorrentStore} from '@/stores'

import Navbar from '@/components/Navbar.vue'


const router = useRouter()
const route = useRoute()
const theme = useTheme()

const appStore = useAppStore()
const modalStore = useModalStore()
const preferencesStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()

const onLoginPage = computed(() => router.currentRoute.value.name === 'login')

const checkAuthentication = async () => {
  await appStore.updateAuthStatus()

  if (appStore.isAuthenticated) {
    // TODO: init intervals
    preferencesStore.fetchPreferences()
    if (onLoginPage.value) redirectOnSuccess()
    return
  }

  if (!onLoginPage.value) router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
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
  theme.global.name.value = vuetorrentStore.getThemeName()
  appStore.fetchVersion()
  vuetorrentStore.setLanguage(vuetorrentStore.language)
  checkAuthentication()
  blockContextMenu()
})

watch(
  () => appStore.isAuthenticated,
  async (isAuthenticated) => {
    if (isAuthenticated) {
      // TODO: init intervals
      preferencesStore.fetchPreferences()
    }
    else {
      //TODO: clear intervals
    }
  }
)
</script>

<template>
  <v-app>
    <component v-for="modal in modalStore.modals" :key="modal.guid" :is="modal.component" v-bind="{ guid: modal.guid, ...modal.props }" />
    <Navbar />
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
