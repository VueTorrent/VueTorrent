<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { formatTimeSec } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number }>()

const { dateFormat } = storeToRefs(useVueTorrentStore())
const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      <span v-if="val > 0">
        {{ formatTimeSec(val, dateFormat) }}
      </span>
      <span v-else>{{ $t('dashboard.not_complete') }}</span>
    </div>
  </div>
</template>
