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
      {{ titleCase($t('torrent.properties.uploaded')) }}
    </div>
    <div>
      {{ getDataValue(torrent.uploaded) }}
      <span class="text-caption text-grey"> {{ getDataUnit(torrent.uploaded) }} </span>
    </div>
  </VCol>
</template>
