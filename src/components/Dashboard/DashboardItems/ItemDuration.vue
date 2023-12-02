<script setup lang="ts">
import dayjs from '@/plugins/dayjs'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; title: string; value: string }>()

const formattedDuration = computed(() => {
  const duration = dayjs.duration(props.torrent[props.value], 'seconds')

  const durationValues = [
    duration.years(),
    duration.months(),
    duration.days(),
    duration.hours(),
    duration.minutes(),
    duration.seconds()
  ]
  const durationLabels = ['Y', 'M', 'd', 'h', 'm', 's']

  let flag = false
  return durationValues
  .map((value, index) => {
    if (flag || value) {
      flag = true
      return `${ value }${ durationLabels[index] }`
    }
  })
  .filter((value) => value)
  .join(' ')
})
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <div>
      <span v-if="torrent[value] > 0">
        {{ formattedDuration }}
      </span>
      <span v-else>{{ $t('dashboard.not_complete') }}</span>
    </div>
  </div>
</template>

<style scoped></style>
