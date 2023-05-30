<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { mdiCog, mdiDelete, mdiPause, mdiPlay, mdiPlus, mdiSearchWeb } from '@mdi/js'

import Tooltip from '../Core/Tooltip.vue'
import { useRouter } from 'vue-router/auto'
import { useModalsStore } from '@/stores/modals'

// stores
const router = useRouter()

// composables
const { mobile } = useDisplay()
const { createModal } = useModalsStore()

// methods
const torrentAction = async (action: string, hashes: string[]) => {}
const pauseTorrents = async (hashes: string[]) => {}
const resumeTorrents = async (hashes: string[]) => {}

const goToSettings = () => router.push({ name: 'Settings' })
</script>

<template>
  <div class="d-flex flex-row justify-end ml-0'">
    <Tooltip
      location="bottom"
      :icon="mdiPlus"
      label="navbar.topActions.addTorrent"
      :action="() => createModal('AddModal')"
    />
    <Tooltip location="bottom" :icon="mdiPlay" label="navbar.topActions.resumeSelected" />
    <Tooltip location="bottom" :icon="mdiPause" label="navbar.topActions.pauseSelected" />
    <Tooltip location="bottom" :icon="mdiDelete" label="navbar.topActions.removeSelected" />
    <Tooltip location="bottom" :icon="mdiSearchWeb" label="navbar.topActions.searchNew" />
    <Tooltip location="bottom" :icon="mdiCog" label="settings" :action="goToSettings" />
  </div>
</template>
