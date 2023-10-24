<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()

const isTextFilterActive = computed(() => dashboardStore.searchFilter?.length > 0)
const isStatusFilterActive = computed(() => dashboardStore.sortOptions.statusFilter.length > 0)
const isCategoryFilterActive = computed(() => dashboardStore.sortOptions.categoryFilter.length > 0)
const isTagFilterActive = computed(() => dashboardStore.sortOptions.tagFilter.length > 0)
const isTrackerFilterActive = computed(() => dashboardStore.sortOptions.trackerFilter.length > 0)

const filterCount = computed(
  () =>
    Number(isTextFilterActive.value) +
    Number(isStatusFilterActive.value) +
    Number(isCategoryFilterActive.value) +
    Number(isTagFilterActive.value) +
    Number(isTrackerFilterActive.value)
)
</script>

<template>
  <v-menu open-on-click open-on-hover open-delay="0" close-delay="0">
    <template v-slot:activator="{ props }">
      <v-slide-x-transition>
        <v-chip v-if="filterCount > 0" v-bind="props" class="ml-6" color="primary" variant="elevated">
          {{ t('navbar.top.active_filters.menu_label', filterCount) }}
        </v-chip>
      </v-slide-x-transition>
    </template>

    <div class="d-flex flex-column gap mt-3">
      <v-chip v-if="isTextFilterActive" variant="elevated" color="grey">
        {{ t('navbar.top.active_filters.text', { value: dashboardStore.searchFilter }) }}
      </v-chip>

      <v-chip v-if="isStatusFilterActive && dashboardStore.sortOptions.statusFilter.length === 1" variant="elevated" :color="'torrent-' + dashboardStore.sortOptions.statusFilter[0]">
        {{ t('navbar.top.active_filters.state', { value: t(`torrent.state.${dashboardStore.sortOptions.statusFilter[0]}`) }) }}
      </v-chip>
      <v-chip v-else-if="isStatusFilterActive" variant="elevated">
        {{ dashboardStore.sortOptions.statusFilter.length }} state filters active
      </v-chip>

      <v-chip v-if="isCategoryFilterActive && dashboardStore.sortOptions.categoryFilter.length === 1" variant="elevated" color="category">
        {{
          t('navbar.top.active_filters.category', {
            value: dashboardStore.sortOptions.categoryFilter[0] === '' ? t('navbar.side.filters.uncategorized') : dashboardStore.sortOptions.categoryFilter[0]
          })
        }}
      </v-chip>
      <v-chip v-else-if="isCategoryFilterActive" variant="elevated" color="category">
        {{ dashboardStore.sortOptions.categoryFilter.length }} category filters active
      </v-chip>

      <v-chip v-if="isTagFilterActive && dashboardStore.sortOptions.tagFilter.length === 1" variant="elevated" color="tag">
        {{ t('navbar.top.active_filters.tag', { value: dashboardStore.sortOptions.tagFilter[0] === null ? t('navbar.side.filters.untagged') : dashboardStore.sortOptions.tagFilter[0] }) }}
      </v-chip>
      <v-chip v-else-if="isTagFilterActive" variant="elevated" color="tag">
        {{ dashboardStore.sortOptions.tagFilter.length }} tag filters active
      </v-chip>

      <v-chip v-if="isTrackerFilterActive && dashboardStore.sortOptions.trackerFilter.length === 1" variant="elevated" color="tracker">
        {{ t('navbar.top.active_filters.tracker', { value: dashboardStore.sortOptions.trackerFilter[0] === '' ? t('navbar.side.filters.untracked') : dashboardStore.sortOptions.trackerFilter[0] }) }}
      </v-chip>
      <v-chip v-else-if="isTrackerFilterActive" variant="elevated" color="tracker">
        {{ dashboardStore.sortOptions.trackerFilter.length }} tracker filters active
      </v-chip>
    </div>
  </v-menu>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>
