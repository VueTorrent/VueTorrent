<script setup lang="ts">
import type { Torrent } from '@/models'
import { titleCase } from '@/utils/textFormatting'
import { computed } from 'vue'

const props = defineProps<{
  torrent: Torrent
}>()

const availability = computed(() => {
  if (props.torrent && props.torrent.availability !== -1) {
    return props.torrent.availability.toFixed(2)
  }
  return 'N/A'
})
</script>

<template>
  <v-col cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.availability')) }}
    </div>
    <div>
      {{ availability }}
    </div>
  </v-col>
</template>
