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
  <VLayout row wrap class="ma-0 pa-1">
    <VRow xs12 class="ma-1">
      <span class="subtitle-1" style="line-height: 1.3em; font-size: 0.95em !important">
        {{ torrent.name }}
      </span>
    </VRow>
    <VRow xs12 class="ma-1 mt-0 chipgap">
      <VChip small :color="'torrent-' + torrent.state" variant="flat" rounded style="height: 20px">
        {{ stateString }}
      </VChip>
      <VChip v-if="torrent.category" rounded color="upload" style="height: 20px">
        {{ torrent.category }}
      </VChip>
      <VChip
        v-for="tag in torrent.tags"
        :key="tag"
        small
        class="tags caption white--text"
        style="height: 20px"
      >
        {{ tag }}
      </VChip>
    </VRow>
    <VRow xs12 class="pa-0 ma-1 spangap">
      <span>
        <span class="downloaded">
          <span class="body-2">{{ getDataValue(torrent.downloaded) }} </span>
          <span class="grey--text caption">{{ getDataUnit(torrent.downloaded) }}</span>
        </span>
        <span class="grey--text caption">/</span>
        <span class="size">
          <span class="body-2">{{ getDataValue(torrent.size) }} </span>
          <span class="grey--text caption">{{ getDataUnit(torrent.size) }}</span>
        </span>
      </span>
      <span class="grey--text" style="margin-top: 3px">•</span>
      <span class="progress">
        <span class="body-2">{{ torrent.progress }} </span>
        <span class="grey--text caption">%</span>
      </span>
      <span class="grey--text" style="margin-top: 3px">•</span>
      <span class="ratio">
        <span class="grey--text caption">R: </span>
        <span class="body-2">{{ torrent.ratio }}</span>
      </span>
      <span class="grey--text" style="margin-top: 3px">•</span>
      <span class="uploaded">
        <span class="body-2">{{ getDataValue(torrent.uploaded) }} </span>
        <span class="grey--text caption">{{ getDataUnit(torrent.uploaded) }}</span>
      </span>
      <VSpacer />
      <span class="body-2">{{ torrent.eta }}</span>
    </VRow>
    <VRow xs12 class="ma-1">
      <v-progress-linear rounded color="upload" height="5" :value="torrent.progress" />
    </VRow>
    <VRow row xs12 class="ma-1">
      <div class="caption grey--text">
        {{ torrent.num_seeds }}/{{ torrent.available_seeds }} seeds
      </div>
      <span class="mx-1 grey--text" style="margin-top: 2px">•</span>
      <div class="caption grey--text">
        {{ torrent.num_leechs }}/{{ torrent.available_peers }} peers
      </div>
      <VSpacer />
      <div>
        <span>
          <VIcon small class="grey--text">
            {{ mdiChevronDown }}
          </VIcon>
          <span class="caption font-weight-medium grey--text"
            >{{ getDataValue(torrent.dlspeed, 1) }}
          </span>
          <span class="caption grey--text" style="font-size: 0.6em !important">
            {{ getDataUnit(torrent.dlspeed) }}/s
          </span>
        </span>
        <span v-if="torrent.upspeed">
          <VIcon small class="grey--text">
            {{ mdiChevronUp }}
          </VIcon>
          <span class="caption font-weight-medium grey--text"
            >{{ getDataValue(torrent.upspeed, 1) }}
          </span>
          <span class="caption grey--text" style="font-size: 0.6em !important">
            {{ getDataUnit(torrent.upspeed) }}/s
          </span>
        </span>
      </div>
    </VRow>
  </VLayout>
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
