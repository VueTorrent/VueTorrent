<template>
  <div v-if="status">
    <div class="text-uppercase white--text caption ml-4 font-weight-medium">
      current speed
    </div>
    <v-card color="secondary" flat class="mr-2 ml-2">
      <v-layout row wrap class="py-3 px-1 mt-1 project mx-auto text-center">
        <v-flex xs6>
          <v-icon color="download" size="16px">
            {{ mdiChevronDown }}
          </v-icon>
          <span
            class="download--text title"
            style="font-size: 1.1em !important;"
          >
            {{ status.dlspeed | getDataValue(1) }}
            <span class="font-weight-light caption font-weight-regular">
              {{ status.dlspeed | getDataUnit(1) }}/s
            </span>
          </span>
        </v-flex>
        <v-flex xs6>
          <v-icon
            class="pl-2"
            color="upload"
            size="24px"
          >
            {{ mdiChevronUp }}
          </v-icon>
          <span
            class="upload--text title"
            style="font-size: 1.1em !important;"
          >
            {{ status.upspeed | getDataValue(1) }}
            <span class="font-weight-light caption font-weight-regular">
              {{ status.upspeed | getDataUnit }}/s
            </span>
          </span>
        </v-flex>
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
