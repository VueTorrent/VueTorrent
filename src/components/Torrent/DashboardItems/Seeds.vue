<script setup lang="ts">
import type { Torrent } from '@/types/qbit/models'
import { titleCase } from '@/utils/textFormatting'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ $t('torrent.properties.seeds') }}
    </div>
    <div>
      {{ torrent.num_seeds }}
      <span class="text-grey text-caption"> / {{ torrent.num_complete }} </span>
    </div>
  </VCol>
</template>
