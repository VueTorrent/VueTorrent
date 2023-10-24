<script lang="ts" setup>
import { TorrentState } from '@/constants/qbit'
import { useDashboardStore } from '@/stores/dashboard'
import { useMaindataStore } from '@/stores/maindata'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const vueTorrentStore = useVueTorrentStore()

const statuses = computed(() => Object.values(TorrentState).map(state => (
  { title: t(`torrent.state.${ state }`), value: state }
)))
const categories = computed(() => [
  { title: t('navbar.side.filters.uncategorized'), value: '' },
  ...maindataStore.categories.map(c => ({ title: c.name, value: c.name }))
])
const tags = computed(() => [
  { title: t('navbar.side.filters.untagged'), value: null },
  ...maindataStore.tags.map(tag => ({ title: tag, value: tag }))
])
const trackers = computed(() => [
  { title: t('navbar.side.filters.untracked'), value: '' },
  ...maindataStore.trackers.map(tracker => ({ title: tracker, value: tracker }))
])

function selectAllStatuses() {
  dashboardStore.sortOptions.statusFilter = []
}

function selectAllCategories() {
  dashboardStore.sortOptions.categoryFilter = []
}

function selectAllTags() {
  dashboardStore.sortOptions.tagFilter = []
}

function selectAllTrackers() {
  dashboardStore.sortOptions.trackerFilter = []
}
</script>

<template>
  <v-list class="pb-0">
    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-normal text-caption">
        {{ t('navbar.side.filters.state') }}
      </v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.statusFilter" :items="statuses" bg-color="secondary"
                class="text-accent pt-1" density="compact" hide-details multiple variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllStatuses" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && dashboardStore.sortOptions.statusFilter.length === 1"
                class="text-accent">{{ t(`torrent.state.${ item.props.value }`) }}</span>
          <span v-else-if="index === 0" class="text-accent">{{
              t('navbar.side.filters.selectedState', dashboardStore.sortOptions.statusFilter.length)
            }}</span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.category') }}
      </v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.categoryFilter" :items="categories" bg-color="secondary"
                class="text-accent pt-1" density="compact" hide-details multiple variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllCategories" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && dashboardStore.sortOptions.categoryFilter.length === 1"
                class="text-accent">{{ item.props.title }}</span>
          <span v-else-if="index === 0" class="text-accent">{{
              t('navbar.side.filters.selectedCategory', dashboardStore.sortOptions.categoryFilter.length)
            }}</span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.tag') }}
      </v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.tagFilter" :items="tags" bg-color="secondary"
                class="text-accent pt-1" density="compact" hide-details multiple variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllTags" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && dashboardStore.sortOptions.tagFilter.length === 1"
                class="text-accent">{{ item.props.title }}</span>
          <span v-else-if="index === 0" class="text-accent">{{
              t('navbar.side.filters.selectedTag', dashboardStore.sortOptions.tagFilter.length)
            }}</span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item v-if="vueTorrentStore.showTrackerFilter"
                 :class="{ 'px-0': true, 'pb-3': vueTorrentStore.showTrackerFilter }">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.tracker') }}
      </v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.trackerFilter" :items="trackers" bg-color="secondary"
                class="text-accent pt-1" density="compact" hide-details multiple variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllTrackers" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && dashboardStore.sortOptions.trackerFilter.length === 1"
                class="text-accent">{{ item.props.title }}</span>
          <span v-else-if="index === 0" class="text-accent">{{
              t('navbar.side.filters.selectedTracker', dashboardStore.sortOptions.trackerFilter.length)
            }}</span>
        </template>
      </v-select>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
