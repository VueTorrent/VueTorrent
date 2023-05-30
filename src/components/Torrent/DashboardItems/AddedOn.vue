<script setup lang="ts">
import dayjs from 'dayjs'
import type { Torrent } from '@/types/qbit/models'
import { titleCase } from '@/utils/textFormatting'
import { useWebUISettingsStore } from '@/stores/settings'

defineProps<{
  torrent: Torrent
}>()

const settings = useWebUISettingsStore()
</script>

<template>
  <v-col cols="6" sm="2">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.added_on')) }}
    </div>
    <div>{{ dayjs(torrent.added_on * 1000).format(settings.webUISettings.dateFormat) }}</div>
  </v-col>
</template>
