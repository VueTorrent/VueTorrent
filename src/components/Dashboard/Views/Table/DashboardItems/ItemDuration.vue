<script setup lang="ts">
import { DurationUnitType } from 'dayjs/plugin/duration'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { formatDuration } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; unit: DurationUnitType; value: (t: Torrent) => number }>()

const { durationFormat } = storeToRefs(useVueTorrentStore())

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <td v-if="val > 0" class="text-no-wrap">
    {{ formatDuration(val, props.unit, durationFormat) }}
  </td>
  <td v-else class="text-no-wrap">
    {{ $t('common.NA') }}
  </td>
</template>
