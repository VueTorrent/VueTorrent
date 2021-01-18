<template>
  <div v-if="status">
    <div class="text-uppercase white--text caption ml-4">
      current speed
    </div>
    <v-card color="secondary" flat class="mr-2 ml-2">
      <v-layout row wrap class="pa-3 mt-1 project nav_download mx-auto">
        <v-icon color="download">
          {{ mdiChevronDown }}
        </v-icon>
        <span class="download--text title">
          {{ status.dlspeed | getDataValue(1) }}
          <span class="font-weight-light caption">
            {{ status.dlspeed | getDataUnit(1) }}/s
          </span>
        </span>
        <v-icon class="pl-5" color="upload">
          {{ mdiChevronUp }}
        </v-icon>
        <span class="upload--text title">
          {{ status.upspeed | getDataValue }}
          <span class="font-weight-light caption">
            {{ status.upspeed | getDataUnit }}/s
          </span>
        </span>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
export default {
  name: 'CurrentSpeed',
  props: ['status'],
  data: () => ({
    mdiChevronUp,
    mdiChevronDown
  })
}
</script>
