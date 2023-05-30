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
      {{ titleCase($t('torrent.properties.upload_limit')) }}
    </div>
    <div>
      {{ getDataValue(torrent.up_limit, 1) }}
      <span class="text-caption text-grey"> {{ getDataUnit(torrent.up_limit) }}/s </span>
    </div>
  </VCol>
</template>
