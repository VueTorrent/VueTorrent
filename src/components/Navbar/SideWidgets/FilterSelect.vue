<script setup lang="ts">
import { FilterState } from '@/constants/qbit'
import { useDashboardStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const vueTorrentStore = useVueTorrentStore()

const statusOptions = [
  { title: t('navbar.side.filters.disabled'), value: FilterState.ALL },
  { title: t('constants.filterStatus.downloading'), value: FilterState.DOWNLOADING },
  { title: t('constants.filterStatus.seeding'), value: FilterState.SEEDING },
  { title: t('constants.filterStatus.completed'), value: FilterState.COMPLETED },
  { title: t('constants.filterStatus.resumed'), value: FilterState.RESUMED },
  { title: t('constants.filterStatus.paused'), value: FilterState.PAUSED },
  { title: t('constants.filterStatus.active'), value: FilterState.ACTIVE },
  { title: t('constants.filterStatus.inactive'), value: FilterState.INACTIVE },
  { title: t('constants.filterStatus.stalled'), value: FilterState.STALLED },
  { title: t('constants.filterStatus.stalled_uploading'), value: FilterState.STALLED_UPLOADING },
  { title: t('constants.filterStatus.stalled_downloading'), value: FilterState.STALLED_DOWNLOADING },
  { title: t('constants.filterStatus.checking'), value: FilterState.CHECKING },
  { title: t('constants.filterStatus.moving'), value: FilterState.MOVING },
  { title: t('constants.filterStatus.errored'), value: FilterState.ERRORED }
]

const categories = computed(() => {
  const categories = [
    { title: t('navbar.side.filters.disabled'), value: null },
    { title: t('navbar.side.filters.uncategorized'), value: '' }
  ]
  categories.push(
    ...maindataStore.categories.map(c => (
      { title: c.name, value: c.name }
    ))
  )
  return categories
})
const tags = computed(() => {
  const tags = [
    { title: t('navbar.side.filters.disabled'), value: null },
    { title: t('navbar.side.filters.untagged'), value: '' }
  ]
  tags.push(
    ...maindataStore.tags.map(tag => (
      { title: tag, value: tag }
    ))
  )
  return tags
})
const trackers = computed(() => {
  const trackers = [
    { title: t('navbar.side.filters.disabled'), value: null as string | null }
  ]
  trackers.push(
    ...maindataStore.trackers.map(tag => (
      { title: tag, value: tag }
    ))
  )
  return trackers
})
</script>

<template>
  <v-list class="pb-0">
    <v-list-item class="px-0 pb-3">
      <v-list-item-title>Status</v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.statusFilter"
                :items="statusOptions"
                class="text-accent"
                hide-details
                variant="outlined" />
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title>Category</v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.categoryFilter"
                :items="categories"
                class="text-accent"
                hide-details
                variant="outlined" />
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title>Tags</v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.tagFilter"
                :items="tags"
                class="text-accent"
                hide-details
                variant="outlined" />
    </v-list-item>

    <v-list-item :class="{'px-0': true, 'pb-3': vueTorrentStore.showTrackerFilter}"
                 v-if="vueTorrentStore.showTrackerFilter">
      <v-list-item-title>Tracker</v-list-item-title>
      <v-select v-model="dashboardStore.sortOptions.trackerFilter"
                :items="trackers"
                class="text-accent"
                hide-details
                variant="outlined" />
    </v-list-item>
  </v-list>
</template>

<style scoped>

</style>