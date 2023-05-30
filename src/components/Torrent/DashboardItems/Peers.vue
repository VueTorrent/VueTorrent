<script setup lang="ts">
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue } from '@/utils/dataParse'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ $t('torrent.properties.peers') }}
    </div>
    <div>
      {{ torrent.num_leechs }}
      <span class="text-caption text-grey">{{ torrent.available_peers }}</span>
    </div>
  </VCol>
</template>
