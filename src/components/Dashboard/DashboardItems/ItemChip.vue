<script setup lang="ts">
import { getColorFromName } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; title: string; value: string; color: string; enableHashColor: boolean }>()

const { hideChipIfUnset, enableHashColors } = storeToRefs(useVueTorrentStore())

const values = computed(() => {
  const val = props.torrent[props.value]
  const type = typeof val

  if (type === 'string') return val.length > 0 ? [val] : []
  else if (type === 'object' /* array */) return val
})

const emptyValue = computed(() => values.value.length < 1)
const useRandomColor = computed(() => enableHashColors.value && props.enableHashColor)
</script>

<template>
  <div class="d-flex flex-column" v-if="!(hideChipIfUnset && emptyValue)">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <div class="d-flex flex-row gap">
      <v-chip v-if="!values || emptyValue" :color="color.replace('$1', torrent[value])" variant="flat" size="small">
        {{ $t(`torrent.properties.empty_${value}`) }}
      </v-chip>
      <v-chip v-else v-for="val in values" :color="useRandomColor ? getColorFromName(val) : color.replace('$1', torrent.state)" variant="flat" size="small">
        {{ val }}
      </v-chip>
    </div>
  </div>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>
