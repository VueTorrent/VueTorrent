<script setup lang="ts">
import PanelBoolean from './PanelBoolean.vue'
import PanelData from './PanelData.vue'
import PanelDatetime from './PanelDatetime.vue'
import PanelDuration from './PanelDuration.vue'
import PanelLongText from './PanelLongText.vue'
import PanelSpeed from './PanelSpeed.vue'
import PanelText from './PanelText.vue'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; isActive: boolean }>()
</script>

<template>
  <v-list>
    <v-list-item>
      <v-expansion-panels>
        <PanelDatetime :torrent="torrent" />
        <PanelDuration :torrent="torrent" />
        <PanelBoolean :torrent="torrent" />
        <PanelData :torrent="torrent" />
        <PanelSpeed :torrent="torrent" />
        <PanelText :torrent="torrent" />
        <PanelLongText :torrent="torrent" />
      </v-expansion-panels>
    </v-list-item>
  </v-list>
</template>
