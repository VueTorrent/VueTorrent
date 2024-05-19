<script setup lang="ts">
import { getColorFromName } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    torrent: Torrent
    value: (t: Torrent) => string[]
    emptyValueKey: string
    color: (t: Torrent) => string
    enableHashColor?: boolean
  }>(),
  {
    enableHashColor: false
  }
)

const { hideChipIfUnset, enableHashColors } = storeToRefs(useVueTorrentStore())

const val = computed(() => props.value(props.torrent))
const emptyValue = computed(() => val.value.length < 1 || val.value[0] === '')
const shouldShowChip = computed(() => !(hideChipIfUnset.value && emptyValue.value))
const useRandomColor = computed(() => enableHashColors.value && props.enableHashColor)
</script>

<template>
  <td>
    <div class="d-flex flex-row flex-gap" v-if="shouldShowChip">
      <v-chip v-if="emptyValue" :color="color(torrent)" variant="flat" size="small">
        {{ $t(emptyValueKey) }}
      </v-chip>
      <v-chip v-else v-for="v in val" :color="useRandomColor ? getColorFromName(v) : color(torrent)" variant="flat" size="small">
        {{ v }}
      </v-chip>
    </div>
  </td>
</template>
