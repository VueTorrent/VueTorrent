<script setup lang="ts">
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number }>()

const { useBitSpeed } = storeToRefs(useVueTorrentStore())

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      {{ formatSpeedValue(val, useBitSpeed) }}
      <span class="text-caption text-grey">
        {{ formatSpeedUnit(val, useBitSpeed) }}
      </span>
    </div>
  </div>
</template>
