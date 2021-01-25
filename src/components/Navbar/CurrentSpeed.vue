<template>
  <div v-if="status">
    <div class="text-uppercase white--text caption ml-4 font-weight-medium">
      current speed
    </div>
    <v-row dense class="mx-1 pt-1">
      <v-col>
        <SpeedCard :icon="mdiChevronDown" color="download" :value="status.dlspeed" />
      </v-col>
      <v-col>
        <SpeedCard :icon="mdiChevronUp" color="upload" :value="status.upspeed" />
      </v-col>
    </v-row>
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
