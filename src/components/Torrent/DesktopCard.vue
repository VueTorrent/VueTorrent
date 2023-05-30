<script setup lang="ts">
import * as Fields from './DashboardItems'
import { computed } from 'vue'
import type { Torrent } from '@/models'
import { useWebUISettingsStore } from '@/stores/settings'

const props = defineProps<{
  torrent: Torrent
}>()

// composables
const settings = useWebUISettingsStore()

// computed
const properties = computed(() => {
  if (props.torrent.progress === 100)
    settings.webUISettings.doneDesktopTorrentProperties.filter((i) => i.active)

  return settings.webUISettings.busyDesktopTorrentProperties.filter((i) => i.active)
})
</script>

<template>
  <VRow class="ma-0 px-4 py-2 ml-0 flex-gap">
    <VCol cols="12">
      <div class="text-truncate">
        {{ torrent.name }}
      </div>
    </VCol>
    <component
      :is="Fields[item.name]"
      v-for="item in properties"
      :key="item.name"
      :torrent="torrent"
    />
  </VRow>
</template>

<style scoped lang="scss">
.flex-gap {
  /* xs */
  @media (min-width: 0) {
    column-gap: 15px;
  }
  /* sm */
  @media (min-width: 600px) {
    column-gap: 10px;
  }
  /* md */
  @media (min-width: 960px) {
    column-gap: 5px;
  }
}
</style>
