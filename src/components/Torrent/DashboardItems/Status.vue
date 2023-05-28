<script setup lang="ts">
import { TorrentState } from '@/enums/qbit'
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
import { titleCase } from '@/utils/textFormatting'
import { computed } from 'vue'

const props = defineProps<{
  torrent: Torrent
}>()

const stateString = computed(() => {
  if (!props.torrent) TorrentState.UNKNOWN

  let finalState = props.torrent.state.toString()
  if (props.torrent.forced) finalState = `[F] ${finalState}`

  return finalState
})
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ $t('torrent.properties.status') }}
    </div>
    <VChip
      style="height: 1.3em"
      class="caption white--text px-2"
      :class="`torrent-${torrent.state}`"
    >
      {{ stateString }}
    </VChip>
  </VCol>
</template>
