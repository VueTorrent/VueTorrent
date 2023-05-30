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
      {{ titleCase($t('torrent.properties.size')) }}
    </div>
    <div>
      {{ getDataValue(torrent.size) }}
      <span class="text-grey text-caption">
        {{ getDataUnit(torrent.size) }}
      </span>
    </div>
  </VCol>
</template>
