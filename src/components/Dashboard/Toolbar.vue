<script setup lang="ts">
import { SortOptions } from '@/constants/qbit'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { useDashboardStore, useTorrentStore } from '@/stores'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { mergeProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const torrentStore = useTorrentStore()
const { sortOptions } = storeToRefs(torrentStore)

const dashboardStore = useDashboardStore()
const { torrentCountString, isSelectionMultiple, displayMode } = storeToRefs(dashboardStore)

const torrentSortOptions = [
  { value: SortOptions.ADDED_ON, title: t('dashboard.sortBy.added_on') },
  { value: SortOptions.AMOUNT_LEFT, title: t('dashboard.sortBy.amount_left') },
  { value: SortOptions.AUTO_TMM, title: t('dashboard.sortBy.auto_tmm') },
  { value: SortOptions.AVAILABILITY, title: t('dashboard.sortBy.availability') },
  { value: SortOptions.AVG_DOWNLOAD_SPEED, title: t('dashboard.sortBy.avg_download_speed') },
  { value: SortOptions.AVG_UPLOAD_SPEED, title: t('dashboard.sortBy.avg_upload_speed') },
  { value: SortOptions.CATEGORY, title: t('dashboard.sortBy.category') },
  { value: SortOptions.COMPLETED, title: t('dashboard.sortBy.completed') },
  { value: SortOptions.COMPLETION_ON, title: t('dashboard.sortBy.completion_on') },
  { value: SortOptions.CONTENT_PATH, title: t('dashboard.sortBy.content_path') },
  { value: SortOptions.DL_LIMIT, title: t('dashboard.sortBy.dl_limit') },
  { value: SortOptions.DLSPEED, title: t('dashboard.sortBy.dlspeed') },
  { value: SortOptions.DOWNLOAD_PATH, title: t('dashboard.sortBy.download_path') },
  { value: SortOptions.DOWNLOADED, title: t('dashboard.sortBy.downloaded') },
  { value: SortOptions.DOWNLOADED_SESSION, title: t('dashboard.sortBy.downloaded_session') },
  { value: SortOptions.ETA, title: t('dashboard.sortBy.eta') },
  { value: SortOptions.F_L_PIECE_PRIO, title: t('dashboard.sortBy.f_l_piece_prio') },
  { value: SortOptions.FORCE_START, title: t('dashboard.sortBy.force_start') },
  { value: SortOptions.GLOBALSPEED, title: t('dashboard.sortBy.globalSpeed') },
  { value: SortOptions.GLOBALVOLUME, title: t('dashboard.sortBy.globalVolume') },
  { value: SortOptions.HASH, title: t('dashboard.sortBy.hash') },
  { value: SortOptions.INFOHASH_V1, title: t('dashboard.sortBy.infohash_v1') },
  { value: SortOptions.INFOHASH_V2, title: t('dashboard.sortBy.infohash_v2') },
  { value: SortOptions.LAST_ACTIVITY, title: t('dashboard.sortBy.last_activity') },
  { value: SortOptions.MAGNET_URI, title: t('dashboard.sortBy.magnet_uri') },
  { value: SortOptions.MAX_RATIO, title: t('dashboard.sortBy.max_ratio') },
  { value: SortOptions.MAX_SEEDING_TIME, title: t('dashboard.sortBy.max_seeding_time') },
  { value: SortOptions.NAME, title: t('dashboard.sortBy.name') },
  { value: SortOptions.NUM_COMPLETE, title: t('dashboard.sortBy.num_complete') },
  { value: SortOptions.NUM_INCOMPLETE, title: t('dashboard.sortBy.num_incomplete') },
  { value: SortOptions.NUM_LEECHS, title: t('dashboard.sortBy.num_leechs') },
  { value: SortOptions.NUM_SEEDS, title: t('dashboard.sortBy.num_seeds') },
  { value: SortOptions.PRIORITY, title: t('dashboard.sortBy.priority') },
  { value: SortOptions.PROGRESS, title: t('dashboard.sortBy.progress') },
  { value: SortOptions.RATIO, title: t('dashboard.sortBy.ratio') },
  { value: SortOptions.RATIO_LIMIT, title: t('dashboard.sortBy.ratio_limit') },
  { value: SortOptions.SAVE_PATH, title: t('dashboard.sortBy.save_path') },
  { value: SortOptions.SEEDING_TIME, title: t('dashboard.sortBy.seeding_time') },
  { value: SortOptions.SEEDING_TIME_LIMIT, title: t('dashboard.sortBy.seeding_time_limit') },
  { value: SortOptions.SEEN_COMPLETE, title: t('dashboard.sortBy.seen_complete') },
  { value: SortOptions.SEQ_DL, title: t('dashboard.sortBy.seq_dl') },
  { value: SortOptions.SIZE, title: t('dashboard.sortBy.size') },
  { value: SortOptions.STATE, title: t('dashboard.sortBy.state') },
  { value: SortOptions.SUPER_SEEDING, title: t('dashboard.sortBy.super_seeding') },
  { value: SortOptions.TAGS, title: t('dashboard.sortBy.tags') },
  { value: SortOptions.TIME_ACTIVE, title: t('dashboard.sortBy.time_active') },
  { value: SortOptions.TOTAL_SIZE, title: t('dashboard.sortBy.total_size') },
  { value: SortOptions.TRACKER, title: t('dashboard.sortBy.tracker') },
  { value: SortOptions.TRACKERS_COUNT, title: t('dashboard.sortBy.trackers_count') },
  { value: SortOptions.UP_LIMIT, title: t('dashboard.sortBy.up_limit') },
  { value: SortOptions.UPLOADED, title: t('dashboard.sortBy.uploaded') },
  { value: SortOptions.UPLOADED_SESSION, title: t('dashboard.sortBy.uploaded_session') },
  { value: SortOptions.UPSPEED, title: t('dashboard.sortBy.upspeed') }
].sort((a, b) => a.title.localeCompare(b.title))
torrentSortOptions.splice(0, 0, { value: SortOptions.DEFAULT, title: t('dashboard.sortBy.default') })

function resetInput() {
  torrentStore.textFilter = ''
}

const torrentTitleFilter = computed({
  get: () => torrentStore.textFilter,
  set: debounce((newValue: string | null) => {
    torrentStore.textFilter = newValue ?? ''
  }, 300)
})

function toggleSelectMode() {
  if (isSelectionMultiple.value) {
    dashboardStore.unselectAllTorrents()
  }
  isSelectionMultiple.value = !isSelectionMultiple.value
}
</script>

<template>
  <v-row class="ma-0 pa-0 mb-2">
    <v-col cols="9" md="4" order="2" order-md="1" class="ma-0 pa-0">
      <v-row class="ma-0 pa-0">
        <v-tooltip :text="t('dashboard.toggleSelectMode')" location="top">
          <template v-slot:activator="{ props }">
            <v-btn :icon="isSelectionMultiple ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" v-bind="props" variant="plain" @click="toggleSelectMode" />
          </template>
        </v-tooltip>
        <v-menu>
          <template v-slot:activator="{ props: menu }">
            <v-tooltip :text="$t('dashboard.displayMode.title')" location="top">
              <template v-slot:activator="{ props: tooltip }">
                <v-btn icon v-bind="mergeProps(menu, tooltip)" variant="plain">
                  <v-icon v-if="displayMode === DashboardDisplayMode.LIST" icon="mdi-view-list" />
                  <v-icon v-if="displayMode === DashboardDisplayMode.GRID" icon="mdi-view-grid" />
                  <v-icon v-if="displayMode === DashboardDisplayMode.TABLE" icon="mdi-table" />
                </v-btn>
              </template>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item :title="$t('dashboard.displayMode.list')" prepend-icon="mdi-view-list" @click="displayMode = DashboardDisplayMode.LIST" />
            <v-list-item :title="$t('dashboard.displayMode.grid')" prepend-icon="mdi-view-grid" @click="displayMode = DashboardDisplayMode.GRID" />
            <v-list-item :title="$t('dashboard.displayMode.table')" prepend-icon="mdi-table" @click="displayMode = DashboardDisplayMode.TABLE" />
          </v-list>
        </v-menu>
        <v-tooltip :text="t('dashboard.toggleSortOrder')" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              :icon="sortOptions.reverseOrder ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              v-bind="props"
              variant="plain"
              @click="sortOptions.reverseOrder = !sortOptions.reverseOrder" />
          </template>
        </v-tooltip>
        <div class="pa-0" style="width: 8em">
          <v-autocomplete
            v-model="sortOptions.sortBy"
            :items="torrentSortOptions"
            :label="t('dashboard.sortLabel')"
            auto-select-first
            density="compact"
            hide-details
            variant="solo-filled" />
        </div>
      </v-row>
    </v-col>
    <v-col cols="10" md="6" order="1" order-md="2" :class="$vuetify.display.smAndDown ? 'mb-4 mx-auto' : ''" class="ma-0 pa-0">
      <v-card color="transparent" max-width="300">
        <v-text-field
          id="searchInput"
          v-model="torrentTitleFilter"
          :label="t('dashboard.searchInputLabel')"
          clearable
          density="compact"
          single-line
          hide-details
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          @click:clear="resetInput()" />
      </v-card>
    </v-col>
    <v-col cols="3" md="2" order="3" class="align-center justify-center">
      <span class="text-uppercase" style="float: right; font-size: 0.8em">
        {{ torrentCountString }}
      </span>
    </v-col>
  </v-row>
</template>
