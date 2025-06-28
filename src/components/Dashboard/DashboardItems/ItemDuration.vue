<script setup lang="ts">
import { DurationUnitType } from 'dayjs/plugin/duration'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { formatDuration } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{
  torrent: Torrent
  titleKey: string
  unit: DurationUnitType
  value: (t: Torrent) => number
}>()

const { durationFormat } = storeToRefs(useVueTorrentStore())

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      <span v-if="val > 0">
        {{ formatDuration(val, props.unit, durationFormat) }}
      </span>
      <span v-else>{{ $t('common.NA') }}</span>
    </div>
  </div>
</template>
