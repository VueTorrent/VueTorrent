<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ColoredChip from '@/components/Core/ColoredChip.vue'
import { useTorrentDetailStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())

const values = computed(() => [
  { title: 'content_path', value: props.torrent.content_path },
  { title: 'download_path', value: props.torrent.download_path },
  { title: 'hash', value: props.torrent.hash },
  { title: 'infohash_v1', value: props.torrent.infohash_v1 },
  { title: 'infohash_v2', value: props.torrent.infohash_v2 },
  { title: 'magnet', value: props.torrent.magnet },
  { title: 'name', value: props.torrent.name },
  { title: 'save_path', value: props.torrent.savePath },
  { title: 'tracker', value: props.torrent.tracker },
  { title: 'comment', value: properties.value?.comment },
  { title: 'created_by', value: properties.value?.created_by },
])
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.long_text_values')">
    <v-expansion-panel-text>
      <v-list>
        <v-list-item v-for="ppt in values" :key="ppt.title" :title="$t(`torrent.properties.${ppt.title}`)">
          <div class="text-caption opacity-70">{{ ppt.value || $t('common.none') }}</div>
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
