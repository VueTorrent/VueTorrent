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
      {{ $t('torrent.properties.global_speed') }}
    </div>
    <div>
      {{ getDataValue(torrent.globalSpeed, 1) }}
      <span class="text-caption text-grey">{{ getDataUnit(torrent.globalSpeed) }}</span>
    </div>
  </VCol>
</template>
