<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { formatDataUnit, formatDataValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number }>()

const { useBinarySize } = storeToRefs(useVueTorrentStore())
const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      {{ formatDataValue(val, useBinarySize) }}
      <span class="text-caption text-grey">
        {{ formatDataUnit(val, useBinarySize) }}
      </span>
    </div>
  </div>
</template>
