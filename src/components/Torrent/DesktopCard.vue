<script setup lang="ts">
import { computed } from 'vue'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue } from '@/utils/dataParse'

const props = defineProps<{
  torrent: Torrent
}>()

const stateString = computed(() => {
  if (props.torrent.forced) return `[F] ${props.torrent.state}`
  return props.torrent.state
})
</script>

<template>
  <div class="ma-0 py-0 px-1">
    <VCol cols="12" class="pa-1 text-subtitle-1">
      <span style="line-height: 1.3em; font-size: 0.95em !important">
        {{ torrent.name }}
      </span>
    </VCol>
    <VCol xs12 class="pa-0 mt-0 chipgap">
      <VChip small :color="'torrent-' + torrent.state" variant="flat" rounded style="height: 20px">
        {{ stateString }}
      </VChip>
      <VChip v-if="torrent.category" rounded color="upload" style="height: 20px">
        {{ torrent.category }}
      </VChip>
      <VChip v-for="tag in torrent.tags" :key="tag" small style="height: 20px">
        {{ tag }}
      </VChip>
    </VCol>
    <VRow cols="12" class="pa-0 ma-1 spangap">
      <span>
        <span class="downloaded">
          <span class="body-2">{{ getDataValue(torrent.downloaded) }} </span>
          <span class="text-grey text-caption">{{ getDataUnit(torrent.downloaded) }}</span>
        </span>
        <span class="text-grey text-caption">/</span>
        <span class="size">
          <span class="body-2">{{ getDataValue(torrent.size) }} </span>
          <span class="text-grey text-caption">{{ getDataUnit(torrent.size) }}</span>
        </span>
      </span>
      <span class="text-grey" style="margin-top: 3px">•</span>
      <span class="progress">
        <span class="body-2">{{ torrent.progress }} </span>
        <span class="text-grey text-caption">%</span>
      </span>
      <span class="text-grey" style="margin-top: 3px">•</span>
      <span class="ratio">
        <span class="text-grey text-caption">R: </span>
        <span class="body-2">{{ torrent.ratio }}</span>
      </span>
      <span class="text-grey" style="margin-top: 3px">•</span>
      <span class="uploaded">
        <span class="body-2">{{ getDataValue(torrent.uploaded) }} </span>
        <span class="text-grey text-caption">{{ getDataUnit(torrent.uploaded) }}</span>
      </span>
      <VSpacer />
      <span class="body-2">{{ torrent.eta }}</span>
    </VRow>
    <VCol xs12 class="pa-1">
      <v-progress-linear rounded color="upload" height="5" :model-value="torrent.progress" />
    </VCol>
    <VRow cols="12" class="ma-1">
      <div class="text-text-caption text-grey">
        {{ torrent.num_seeds }}/{{ torrent.available_seeds }} seeds
      </div>
      <span class="mx-1 text-grey" style="margin-top: 2px">•</span>
      <div class="text-caption text-grey">
        {{ torrent.num_leechs }}/{{ torrent.available_peers }} peers
      </div>
      <VSpacer />
      <div>
        <span>
          <VIcon small class="text-grey">
            {{ mdiChevronDown }}
          </VIcon>
          <span class="text-caption font-weight-medium text-grey"
            >{{ getDataValue(torrent.dlspeed, 1) }}
          </span>
          <span class="text-caption text-grey" style="font-size: 0.6em !important">
            {{ getDataUnit(torrent.dlspeed) }}/s
          </span>
        </span>
        <span v-if="torrent.upspeed">
          <VIcon small class="text-grey">
            {{ mdiChevronUp }}
          </VIcon>
          <span class="text-caption font-weight-medium text-grey"
            >{{ getDataValue(torrent.upspeed, 1) }}
          </span>
          <span class="text-caption text-grey" style="font-size: 0.6em !important">
            {{ getDataUnit(torrent.upspeed) }}/s
          </span>
        </span>
      </div>
    </VRow>
  </div>
</template>

<style>
.chipgap {
  gap: 8px;
}
.spangap {
  gap: 4px;
}
.tags {
  background-color: #048b9a !important;
}
</style>
