<script setup lang="ts">
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

withDefaults(
  defineProps<{
    icon: string
    color: string
    value: number
    active?: boolean
  }>(),
  {
    active: false,
  }
)

defineEmits<{
  click: [MouseEvent]
}>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet
    :class="{ 'flex-grow-1': true, 'cursor-pointer': !!$.vnode.props?.onClick }"
    :color="active ? 'secondary-lighten-1' : 'secondary'"
    rounded="lg"
    class="py-3"
    @click.stop="$emit('click', $event)">
    <v-row class="d-flex flex-row align-center px-3">
      <v-col cols="2" class="px-4">
        <v-icon class="" :icon="icon" :color="color" />
      </v-col>
      <v-col cols="8" class="d-flex flex-column align-center justify-center">
        <div>
          <span :class="`text-subtitle-1 font-weight-bold text-select text-${color}`">
            {{ formatSpeedValue(value, vueTorrentStore.useBitSpeed) }}
          </span>
        </div>
        <div>
          <span :class="`text-caption text-${color}`">
            {{ formatSpeedUnit(value, vueTorrentStore.useBitSpeed) }}
          </span>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>
