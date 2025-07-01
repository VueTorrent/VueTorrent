<script setup lang="ts">
import { useDialog } from '@/composables'
import { formatData } from '@/helpers'
import { useMaindataStore, useVueTorrentStore } from '@/stores'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const maindataStore = useMaindataStore()
const vueTorrentStore = useVueTorrentStore()

function close() {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" :max-width="800">
    <v-card>
      <v-card-title>{{ $t('dialogs.stats.title') }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="text-h6">{{ $t('dialogs.stats.user_statistics') }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.all_time_upload') }}</div>
            <div class="ml-2">
              {{ formatData(maindataStore.serverState?.alltime_ul ?? 0, vueTorrentStore.useBinarySize) }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.all_time_download') }}</div>
            <div class="ml-2">
              {{ formatData(maindataStore.serverState?.alltime_dl ?? 0, vueTorrentStore.useBinarySize) }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.all_time_share_ratio') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.global_ratio }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.session_waste') }}</div>
            <div class="ml-2">
              {{ formatData(maindataStore.serverState?.total_wasted_session ?? 0, vueTorrentStore.useBinarySize) }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.connected_peers') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.total_peer_connections }}</div>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row>
          <v-col cols="12">
            <div class="text-h6">{{ $t('dialogs.stats.cache_statistics') }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.read_cache_hits') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.read_cache_hits }}%</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.total_buffer_size') }}</div>
            <div class="ml-2">
              {{ formatData(maindataStore.serverState?.total_buffers_size ?? 0, vueTorrentStore.useBinarySize) }}
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row>
          <v-col cols="12">
            <div class="text-h6">{{ $t('dialogs.stats.performance_statistics') }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.write_cache_overload') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.write_cache_overload }}%</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.read_cache_overload') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.read_cache_overload }}%</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.queued_io_jobs') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.queued_io_jobs }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.average_time_in_queue') }}</div>
            <div class="ml-2">{{ maindataStore.serverState?.average_time_queue }} ms</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>{{ $t('dialogs.stats.total_queued_size') }}</div>
            <div class="ml-2">
              {{ formatData(maindataStore.serverState?.total_queued_size ?? 0, vueTorrentStore.useBinarySize) }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">
          {{ $t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
