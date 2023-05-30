<script setup lang="ts">
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue, getDomain } from '@/utils/dataParse'
import { titleCase } from '@/utils/textFormatting'
import { computed } from 'vue'

const props = defineProps<{
  torrent: Torrent
}>()

const trackerString = computed(() => {
  return getDomain(props.torrent.tracker)
})
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.tracker')) }}
    </div>
    <div>
      {{ trackerString }}
    </div>
  </VCol>
</template>
