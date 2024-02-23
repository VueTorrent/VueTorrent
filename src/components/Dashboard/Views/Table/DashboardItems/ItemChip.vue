<script setup lang="ts">
import { getColorFromName } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; title: string; value: string; color: string; enableHashColor: boolean }>()

const vueTorrentStore = useVueTorrentStore()

const values = computed(() => {
  const val = props.torrent[props.value]
  const type = typeof val

  if (type === 'string') return val.length > 0 ? [val] : []
  else if (type === 'object' /* array */) return val
})

const emptyValue = computed(() => values.value.length < 1)
</script>

<template>
  <td>
    <div class="d-flex flex-row gap" v-if="!(vueTorrentStore.hideChipIfUnset && emptyValue)">
      <v-chip v-if="!values || emptyValue" :color="color.replace('$1', torrent[value])" variant="flat">
        {{ $t(`torrent.properties.empty_${value}`) }}
      </v-chip>
      <v-chip v-else v-for="val in values" :color="enableHashColor ? getColorFromName(val) : color.replace('$1', torrent.state)" variant="flat">
        {{ val }}
      </v-chip>
    </div>
  </td>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>
