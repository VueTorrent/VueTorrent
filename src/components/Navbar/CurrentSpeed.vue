<template>
  <div v-if="status" class="mb-1">
    <div class="text-uppercase white--text caption ml-4 font-weight-medium">
      current speed
    </div>
    <v-card color="secondary" flat class="mr-2 ml-2">
      <v-layout row wrap class="py-3 px-1 mt-1 project mx-auto text-center">
        <v-flex xs1 class="mt-1">
          <v-icon color="download" size="16px">
            {{ mdiChevronDown }}
          </v-icon>
        </v-flex>
        <v-flex xs5>
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
        <v-flex xs1 class="mt-1">
          <v-icon
            color="upload"
            size="16px"
          >
            {{ mdiChevronUp }}
          </v-icon>
        </v-flex>
        <v-flex xs5>
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
