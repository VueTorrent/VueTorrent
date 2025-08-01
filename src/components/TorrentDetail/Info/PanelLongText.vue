<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ColoredChip from '@/components/Core/ColoredChip.vue'
import { useTorrentDetailStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())

const values = [
  { title: 'content_path', getter: () => props.torrent.content_path },
  { title: 'download_path', getter: () => props.torrent.download_path },
  { title: 'hash', getter: () => props.torrent.hash },
  { title: 'infohash_v1', getter: () => props.torrent.infohash_v1 },
  { title: 'infohash_v2', getter: () => props.torrent.infohash_v2 },
  { title: 'magnet', getter: () => props.torrent.magnet },
  { title: 'name', getter: () => props.torrent.name },
  { title: 'save_path', getter: () => props.torrent.savePath },
  { title: 'tracker', getter: () => props.torrent.tracker },
  { title: 'comment', getter: () => properties.value?.comment },
  { title: 'created_by', getter: () => properties.value?.created_by },
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.long_text_values')">
    <v-expansion-panel-text>
      <v-list>
        <v-list-item v-for="ppt in values" :key="ppt.title" :title="$t(`torrent.properties.${ppt.title}`)">
          <div class="text-subtitle-2 opacity-70">{{ ppt.getter() || $t('common.none') }}</div>
        </v-list-item>

        <v-list-item :title="$t('torrent.properties.tags')">
          <div v-if="torrent.tags?.length" class="d-flex flex-gap-row-small flex-gap-column">
            <ColoredChip v-for="tag in torrent.tags" :key="tag" default-color="tag" :value="tag" />
          </div>
          <v-list-item-subtitle v-else>
            {{ $t('torrent.properties.empty_tags') }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
