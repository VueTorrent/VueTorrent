<script setup lang="ts">
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
import { titleCase } from '@/utils/textFormatting'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.download_limit')) }}
    </div>
    <div>
      {{ getDataValue(torrent.dl_limit, 1) }}
      <span class="text-caption text-grey"> {{ getDataUnit(torrent.dl_limit) }}/s </span>
    </div>
  </VCol>
</template>
