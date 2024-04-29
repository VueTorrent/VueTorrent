<script setup lang="ts">
import dayjs from '@/plugins/dayjs'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'
import { DurationUnitType } from 'dayjs/plugin/duration'

const props = defineProps<{ torrent: Torrent; unit: DurationUnitType; value: (t: Torrent) => number }>()

const val = computed(() => props.value(props.torrent))
const formattedDuration = computed(() => {
  const duration = dayjs.duration(val.value, props.unit)

  const durationValues = [duration.years(), duration.months(), duration.days(), duration.hours(), duration.minutes(), duration.seconds()]
  const durationLabels = ['Y', 'M', 'd', 'h', 'm', 's']

  let flag = false
  return durationValues
    .map((value, index) => {
      if (flag || value) {
        flag = true
        return `${value}${durationLabels[index]}`
      }
    })
    .filter(value => value)
    .join(' ')
})
</script>

<template>
  <td v-if="val > 0">
    {{ formattedDuration }}
  </td>
  <td v-else>{{ $t('common.NA') }}</td>
</template>
