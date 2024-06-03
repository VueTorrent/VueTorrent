<script setup lang="ts">
import { formatTimeSec } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { dateFormat } = storeToRefs(useVueTorrentStore())
const val = computed(() => props.value(props.torrent))
</script>

<template>
  <td v-if="val > 0" class="text-no-wrap">
    {{ formatTimeSec(val, dateFormat) }}
  </td>
  <td v-else class="text-no-wrap">{{ $t('dashboard.not_complete') }}</td>
</template>
