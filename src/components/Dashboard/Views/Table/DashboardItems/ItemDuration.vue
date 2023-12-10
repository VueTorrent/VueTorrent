<script setup lang="ts">
import dayjs from '@/plugins/dayjs'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; title: string; value: string }>()

const formattedDuration = computed(() => {
  const duration = dayjs.duration(props.torrent[props.value], 'seconds')

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
  <td v-if="torrent[value] > 0">
    {{ formattedDuration }}
  </td>
  <td v-else>{{ $t('dashboard.not_complete') }}</td>
</template>

<style scoped></style>
