<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ColoredChip from '@/components/Core/ColoredChip.vue'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = withDefaults(
  defineProps<{
    torrent: Torrent
    titleKey: string
    value: (t: Torrent) => string[]
    emptyValueKey: string
    color: (t: Torrent) => string
    enableHashColor?: boolean
  }>(),
  {
    enableHashColor: false,
  }
)

const { hideChipIfUnset } = storeToRefs(useVueTorrentStore())

const val = computed(() => props.value(props.torrent))
const emptyValue = computed(() => val.value.length < 1 || val.value[0] === '')
const shouldShowChip = computed(() => !(hideChipIfUnset.value && emptyValue.value))
</script>

<template>
  <div v-if="shouldShowChip" class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div class="d-flex flex-row flex-gap-column-small">
      <ColoredChip v-if="emptyValue" :disabled="true" :default-color="color(torrent)" :value="$t(emptyValueKey)" size="small" />
      <ColoredChip v-for="v in val" v-else :key="v" :disabled="!enableHashColor" :default-color="color(torrent)" :value="v" size="small" />
    </div>
  </div>
</template>
