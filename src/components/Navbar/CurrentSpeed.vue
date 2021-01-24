<template>
  <div v-if="status" class="mb-1">
    <div class="text-uppercase white--text caption ml-4 font-weight-medium">
      current speed
    </div>
    <v-layout row class="mx-1 mt-2">
      <SpeedCard :icon="mdiChevronDown" color="download" :value="status.dlspeed" />
      <SpeedCard :icon="mdiChevronUp" color="upload" :value="status.upspeed" />
    </v-layout>
  </div>
</template>

<script>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import SpeedCard from '@/components/Core/SpeedCard'
export default {
  name: 'CurrentSpeed',
  components: {
    SpeedCard
  },
  props: ['status'],
  data: () => ({
    mdiChevronUp,
    mdiChevronDown
  })
}
</script>
