<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { mdiCog, mdiDelete, mdiPause, mdiPlay, mdiPlus, mdiSearchWeb } from '@mdi/js'

import Tooltip from '../Core/Tooltip.vue'
import { useRouter } from 'vue-router/auto'

// composables
const { mobile } = useDisplay()
const router = useRouter()

// methods
const torrentAction = async (action: string, hashes: string[]) => {}
const pauseTorrents = async (hashes: string[]) => {}
const resumeTorrents = async (hashes: string[]) => {}

const goToSettings = () => router.push({ name: 'Settings' })
</script>

<template>
  <div class="d-flex flex-row justify-end ml-0'">
    <Tooltip :icon="mdiPlus" label="navbar.topActions.addTorrent" />
    <Tooltip :icon="mdiPlay" label="navbar.topActions.resumeSelected" />
    <Tooltip :icon="mdiPause" label="navbar.topActions.pauseSelected" />
    <Tooltip :icon="mdiDelete" label="navbar.topActions.removeSelected" />
    <Tooltip :icon="mdiSearchWeb" label="navbar.topActions.searchNew" />
    <Tooltip :icon="mdiCog" label="settings" :action="goToSettings" />
  </div>
</template>
