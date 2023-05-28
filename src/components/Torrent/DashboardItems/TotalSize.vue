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
      {{ titleCase($t('torrent.properties.total_size')) }}
    </div>
    <div>
      {{ getDataValue(torrent.total_size) }}
      <span class="text-caption text-grey">
        {{ getDataUnit(torrent.total_size) }}
      </span>
    </div>
  </VCol>
</template>
